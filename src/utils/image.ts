/**
 * URL Optimization utility for Cloudinary and Unsplash images.
 * Automatically injects optimal delivery parameters (compression, modern formats, max dimension constraints).
 */
export function getOptimizedImageUrl(url: string, targetWidth: number = 1200): string {
  if (!url) return "";

  // 1. Optimize Cloudinary URLs
  if (url.includes("cloudinary.com") && url.includes("/image/upload/")) {
    const parts = url.split("/image/upload/");
    if (parts.length === 2) {
      const pathSuffix = parts[1];
      
      // Determine if custom flags are already present
      // Usually version headers start with "v" followed by digits (e.g. v17819...)
      const hasPreExistingTransformations = !pathSuffix.startsWith("v") && pathSuffix.match(/^[a-z0-9_,]/i);

      if (!hasPreExistingTransformations) {
        // Safe, lossless scale limiting + auto format & quality optimization
        return `${parts[0]}/image/upload/q_auto,f_auto,w_${targetWidth},c_limit/${pathSuffix}`;
      } else {
        // Already contains some directives. Make sure format and quality auto is injected,
        // and optionally refine width constraints without breaking user rules.
        const cleanSuffix = pathSuffix.replace(/^(q_auto,f_auto|f_auto,q_auto|q_auto|f_auto)\/?/, "");
        return `${parts[0]}/image/upload/q_auto,f_auto,w_${targetWidth},c_limit/${cleanSuffix}`;
      }
    }
  }

  // 2. Optimize Unsplash URLs
  if (url.includes("images.unsplash.com")) {
    try {
      const urlObj = new URL(url);
      urlObj.searchParams.set("auto", "format");
      urlObj.searchParams.set("q", "80");
      urlObj.searchParams.set("w", targetWidth.toString());
      urlObj.searchParams.set("fit", "max");
      return urlObj.toString();
    } catch {
      return url;
    }
  }

  return url;
}

/**
 * Generates a standard srcset string for Cloudinary or Unsplash images.
 */
export function getOptimizedSrcSet(url: string, widths: number[] = [480, 800, 1200, 1600, 2000]): string {
  if (!url) return "";
  return widths
    .map(w => `${getOptimizedImageUrl(url, w)} ${w}w`)
    .join(", ");
}

/**
 * URL Optimization utility for Cloudinary videos.
 * Injects high-performance delivery parameters (q_auto, vc_h264) to drastically reduce bandwidth.
 */
export function getOptimizedVideoUrl(url: string, isMobile: boolean = false): string {
  if (!url) return "";

  if (url.includes("cloudinary.com") && url.includes("/video/upload/")) {
    const parts = url.split("/video/upload/");
    if (parts.length === 2) {
      const pathSuffix = parts[1];
      
      // Determine if custom flags are already present
      const hasPreExistingTransformations = !pathSuffix.startsWith("v") && pathSuffix.match(/^[a-z0-9_,/]/i);

      const quality = isMobile ? "q_auto:eco,vc_h264" : "q_auto,vc_h264";

      if (!hasPreExistingTransformations) {
        return `${parts[0]}/video/upload/${quality}/${pathSuffix}`;
      } else {
        // Clean out existing quality/format transforms if any, to prevent conflicts
        const cleanSuffix = pathSuffix.replace(/^([a-z0-9_,]+)\//i, (match, p1) => {
          // If the first folder starts with 'v' followed by digits, it's a version number, keep it.
          if (p1.startsWith("v") && /^\d+$/.test(p1.slice(1))) {
            return match;
          }
          // Otherwise, it's custom transformations, replace/override quality parameters
          return "";
        });
        return `${parts[0]}/video/upload/${quality}/${cleanSuffix}`;
      }
    }
  }

  return url;
}

