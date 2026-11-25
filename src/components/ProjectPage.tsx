import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ArrowLeft from "lucide-react/dist/esm/icons/arrow-left";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import Home from "lucide-react/dist/esm/icons/home";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import Send from "lucide-react/dist/esm/icons/send";
import Globe from "lucide-react/dist/esm/icons/globe";
import ExternalLink from "lucide-react/dist/esm/icons/external-link";
import { m, AnimatePresence } from "motion/react";
import { getOptimizedImageUrl, getOptimizedVideoUrl } from "../utils/image";
import EngineTechFooter from "./EngineTechFooter";
import projectsData from "../data/project_pages.json";

// Helper to generate a highly compressed poster frame for any Cloudinary video dynamically
function getCloudinaryVideoPoster(url: string, width: number = 800): string | undefined {
  if (!url || !url.includes("cloudinary.com") || !url.includes("/video/upload/")) {
    return undefined;
  }
  const parts = url.split("/video/upload/");
  if (parts.length === 2) {
    const pathSuffix = parts[1];
    // Replace the format extension (e.g. .mp4, .mov, etc.) with .jpg
    const cleanSuffix = pathSuffix.replace(/\.(mp4|webm|ogg|mov|avi|wmv)$/i, ".jpg");
    return `${parts[0]}/video/upload/q_auto,f_auto,w_${width},c_scale/${cleanSuffix}`;
  }
  return undefined;
}

// Highly optimized Video component that only preloads and plays when entering the viewport
function LazyAutoplayVideo({ src, alt, className = "w-full h-full object-cover select-none pointer-events-none relative z-10", onLoadedData }: { src: string; alt?: string; className?: string; onLoadedData?: () => void }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent));
  }, []);

  const optimizedSrc = getOptimizedVideoUrl(src, isMobile);
  const posterUrl = getCloudinaryVideoPoster(src, isMobile ? 500 : 800);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { 
        rootMargin: isMobile ? "150px 0px" : "300px 0px", // Pre-buffers video much earlier before scroll entry
        threshold: 0.01 
      }
    );

    observer.observe(video);
    return () => {
      observer.unobserve(video);
    };
  }, [isMobile]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isIntersecting) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Autoplay was prevented by browser security settings:", error);
        });
      }
    } else {
      video.pause();
    }
  }, [isIntersecting]);

  return (
    <video
      ref={videoRef}
      src={isMobile ? optimizedSrc : (isIntersecting ? optimizedSrc : undefined)}
      loop
      muted
      playsInline
      controls={false}
      preload={isMobile ? "metadata" : "none"} // Ultra-fast metadata preload for mobile
      poster={posterUrl} // Renders an instant static preview frame instantly on page load
      disablePictureInPicture
      disableRemotePlayback
      controlsList="nodownload nofullscreen noremoteplayback"
      tabIndex={-1}
      className={className}
      style={{ pointerEvents: "none" }}
      aria-label={alt || "Интерактивное видео"}
      onLoadedMetadata={onLoadedData}
      onLoadedData={onLoadedData}
    />
  );
}

function MediaItem({ item, isDouble, aspect, onClick }: { item: BlockItem; isDouble: boolean; aspect?: string; onClick: (url: string) => void }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleLoad = () => setLoaded(true);

  useEffect(() => {
    if (imgRef.current?.complete) {
      handleLoad();
    }
  }, [item.url]);

  // Determine aspect ratio class if single
  const getAspectRatioClass = (format: string | undefined) => {
    if (format === "16/9") return "aspect-video";
    if (format === "9/16") return "aspect-[9/16]";
    if (format === "4/3") return "aspect-[4/3]";
    if (format === "3/4") return "aspect-[3/4]";
    if (format === "3/1") return "aspect-[3/1]";
    if (format === "square" || format === "1/1") return "aspect-square";
    return ""; // No forced aspect by default for single items, to preserve natural height
  };

  const aspectClass = isDouble ? "h-full" : getAspectRatioClass(aspect);

  return (
    <div className={`relative w-full flex items-center justify-center transition-all duration-300 ${aspectClass} ${!loaded && !aspectClass ? 'min-h-[30vh] sm:min-h-[50vh]' : ''}`}>
      {/* Loading Skeleton */}
      {!loaded && (
        <div className="absolute inset-0 bg-white/5 animate-pulse flex items-center justify-center z-0">
          <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" />
        </div>
      )}

      {item.mediaType === "video" ? (
        <LazyAutoplayVideo 
          src={item.url} 
          alt={item.alt} 
          onLoadedData={handleLoad}
          className={`w-full ${aspectClass ? 'h-full object-cover' : 'h-auto block'} select-none pointer-events-none relative z-10 transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      ) : (
        <img
          ref={imgRef}
          src={getOptimizedImageUrl(item.url, isDouble ? 600 : 1200)}
          alt={item.alt || "Case media visual"}
          onLoad={handleLoad}
          className={`w-full ${aspectClass ? 'h-full object-cover' : 'h-auto block'} select-none relative z-10 transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      )}
      <div 
        className={`video-blocker-overlay absolute inset-0 z-30 ${item.mediaType === 'video' ? 'bg-transparent pointer-events-auto' : 'pointer-events-auto cursor-zoom-in'}`}
        onClick={item.mediaType === 'video' ? undefined : () => onClick(item.url)} 
      />
    </div>
  );
}

interface BlockItem {
  mediaType: string;
  url: string;
  alt?: string;
}

interface ProjectBlock {
  type: string;
  title?: string;
  text?: string;
  layout?: string;
  items?: BlockItem[];
  aspectRatio?: string;
}

interface ProjectPageProps {
  key?: string;
  id: string;
  projectInfo: {
    title: string;
    titleColor: string;
    pageBackgroundColor: string;
    backgroundColor: string;
    heroImage: string;
    imageAlt: string;
    tags: string[];
    industry: string;
    workType: string;
    clientDescription: string;
    taskDescription: string;
    blocks?: ProjectBlock[];
    firstTagColor?: string;
    hideTitle?: boolean;
    links?: {
      vk?: string;
      tg?: string;
      website?: string;
    };
  };
  onBack: () => void;
}

export default function ProjectPage({ id, projectInfo, onBack }: ProjectPageProps) {
  const navigate = useNavigate();
  // Ensure we scroll to top when mounting or changing projects
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setHeroLoaded(false);
  }, [id]);

  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const [heroLoaded, setHeroLoaded] = useState(false);
  const heroImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (heroImgRef.current?.complete) {
      setHeroLoaded(true);
    }
  }, [heroImgRef.current?.src, id]);

  // Find previous and next project keys
  const projectKeys = projectsData ? Object.keys(projectsData) : [];
  const currentIndex = projectKeys.indexOf(id);
  const prevIndex = currentIndex > 0 ? currentIndex - 1 : projectKeys.length - 1;
  const nextIndex = currentIndex < projectKeys.length - 1 ? currentIndex + 1 : 0;

  const prevProjectId = projectKeys[prevIndex];
  const nextProjectId = projectKeys[nextIndex];

  const prevProject = projectsData ? projectsData[prevProjectId as keyof typeof projectsData] : null;
  const nextProject = projectsData ? projectsData[nextProjectId as keyof typeof projectsData] : null;

  const handleNavigateProject = (projId: string) => {
    navigate(`/project/${encodeURIComponent(projId)}`);
  };

  const {
    title,
    titleColor,
    backgroundColor,
    heroImage,
    imageAlt,
    tags,
    industry,
    workType,
    clientDescription,
    taskDescription,
    blocks = [],
    firstTagColor,
    hideTitle,
    links
  } = projectInfo;

  return (
    <div 
      className="min-h-screen text-white font-sans transition-colors duration-500 overflow-x-hidden relative bg-[#171717]"
      id={`project-page-${id}`}
    >
      {/* Subtle overlay texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />

      {/* HERO SECTION - Background is the brand color, acting as solid padding bounding around image card */}
      <section 
        className="relative w-full h-auto md:h-screen md:min-h-[550px] md:max-h-[1080px] p-0 md:p-8 bg-transparent md:bg-[var(--brand-bg)]"
        style={{ '--brand-bg': backgroundColor } as React.CSSProperties}
        id={`project-hero-container-${id}`}
      >
        <div 
          className="w-full h-auto md:h-full rounded-none md:rounded-[24px] overflow-hidden relative group"
          id={`project-hero-card-${id}`}
        >
          {/* Loading Skeleton */}
          {!heroLoaded && (
            <div className="absolute inset-0 bg-white/5 animate-pulse flex items-center justify-center z-0">
              <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" />
            </div>
          )}

          {/* Main Hero Image */}
          <img 
            ref={heroImgRef}
            key={heroImage}
            src={getOptimizedImageUrl(heroImage, 1200)} 
            alt={imageAlt || title}
            onLoad={() => setHeroLoaded(true)}
            className={`w-full aspect-video md:aspect-auto md:h-full object-cover select-none pointer-events-none relative z-10 transition-opacity duration-500 ${heroLoaded ? "opacity-100" : "opacity-0"}`}
            referrerPolicy="no-referrer"
            {...{ fetchPriority: "high" }}
            decoding="async"
          />

          {/* Top Left Title on Image - Desktop only */}
          {title && title.trim() !== "" && !hideTitle && (
            <div className="hidden md:block absolute top-12 left-12 z-10 pointer-events-none select-none">
              <h2 
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight"
                style={{ color: titleColor || "#ffffff" }}
              >
                {title}
              </h2>
            </div>
          )}

          {/* Bottom Left Tags Row on Image - Desktop only */}
          <div className="hidden md:flex absolute bottom-12 left-12 z-10 flex-wrap gap-2.5 max-w-[85%] select-none pointer-events-none">
            {tags.map((tag, tIdx) => {
              const isFirst = tIdx === 0;
              const customColor = isFirst && firstTagColor;
              return (
                <span 
                  key={tag} 
                  className={customColor ? "text-white font-sans text-xs sm:text-sm font-semibold py-2 px-4 rounded-full tracking-wide" : "bg-white text-black font-sans text-xs sm:text-sm font-semibold py-2 px-4 rounded-full tracking-wide"}
                  style={customColor ? { backgroundColor: customColor } : undefined}
                >
                  {tag}
                </span>
              );
            })}
          </div>

          {/* Prevent extension overlay interfaces and click events - Desktop only */}
          <div 
            className="hidden md:block video-blocker-overlay bg-transparent absolute inset-0 pointer-events-auto cursor-zoom-in z-20"
            onClick={() => setLightboxImage(heroImage)}
          />
        </div>

        {/* Mobile View Title and Tags Row under the Image */}
        <div className="md:hidden w-full px-6 py-6 flex flex-col gap-4 select-none pointer-events-none relative z-20">
          {title && title.trim() !== "" && !hideTitle && (
            <h2 
              className="text-2xl font-black tracking-tight"
              style={{ color: titleColor || "#ffffff" }}
            >
              {title}
            </h2>
          )}
          
          <div className="flex flex-wrap gap-2 max-w-full">
            {tags.map((tag, tIdx) => {
              const isFirst = tIdx === 0;
              const customColor = isFirst && firstTagColor;
              return (
                <span 
                  key={tag} 
                  className={customColor ? "text-white font-sans text-xs font-semibold py-1.5 px-3 rounded-full tracking-wide" : "bg-white text-black font-sans text-xs font-semibold py-1.5 px-3 rounded-full tracking-wide"}
                  style={customColor ? { backgroundColor: customColor } : undefined}
                >
                  {tag}
                </span>
              );
            })}
          </div>
        </div>

        {/* Mobile zoom trigger overlay zone directly on top of the image */}
        <div 
          className="md:hidden absolute inset-x-0 top-0 aspect-video pointer-events-auto cursor-zoom-in z-30"
          onClick={() => setLightboxImage(heroImage)}
        />
      </section>

      {/* TEXTUAL BACK & NAVIGATION ROW UNDER THE PHOTO */}
      <div 
        className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between gap-4 border-b border-white/10"
        id="project-navigation-row"
      >
        <div className="flex items-center gap-6" id="project-nav-buttons">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 bg-transparent border-none text-white/70 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer outline-none focus:outline-none p-0"
            type="button"
            id="project-navigation-back-only"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Назад</span>
          </button>

          <button
            onClick={onBack}
            className="group flex items-center gap-2 bg-transparent border-none text-white/70 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer outline-none focus:outline-none p-0"
            type="button"
            id="project-navigation-to-home"
          >
            <Home className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>На главную</span>
          </button>
        </div>

        {/* Next and Prev Project Buttons on the right side of the row */}
        <div className="flex items-center gap-4" id="project-navigation-top-arrows">
          <button
            onClick={() => handleNavigateProject(prevProjectId)}
            className="group flex items-center gap-1.5 bg-transparent border-none text-white/70 hover:text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer outline-none focus:outline-none p-0"
            type="button"
            title={`Предыдущий: ${prevProject?.title || ""}`}
            id="nav-top-prev"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Предыдущий</span>
          </button>

          <span className="text-white/25 hidden sm:inline px-1">|</span>

          <button
            onClick={() => handleNavigateProject(nextProjectId)}
            className="group flex items-center gap-1.5 bg-transparent border-none text-white/70 hover:text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer outline-none focus:outline-none p-0"
            type="button"
            title={`Следующий: ${nextProject?.title || ""}`}
            id="nav-top-next"
          >
            <span className="hidden sm:inline">Следующий</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* TYPOGRAPHIC DETAILS SECTION - NO PLATES, CLEAN TEXT */}
      <main 
        className="max-w-7xl mx-auto py-16 sm:py-24 px-8 space-y-16 sm:space-y-24"
        id={`project-details-content-${id}`}
      >
        {/* Core Project Details Grid */}
        <m.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          
          {/* LEFT SIDE: Project Name (Large), Industry and Work Type stacked */}
          <div className="lg:col-span-5 flex flex-col justify-start space-y-12" id="project-left-specs">
            <div>
              <span className="text-white/60 font-mono text-xs uppercase tracking-widest block mb-3">
                ПРОДУКТ
              </span>
              <h1 className="text-[36px] md:text-[48px] font-black tracking-tight leading-none text-white my-0">
                {title}
              </h1>
            </div>

            <div className="space-y-8 border-t border-white/10 pt-8">
              <div>
                <span className="text-white/40 font-mono text-xs uppercase tracking-widest block mb-2">
                  Отрасль бизнеса
                </span>
                <p className="text-white text-xl sm:text-2xl font-bold tracking-tight">
                  {industry}
                </p>
              </div>

              <div>
                <span className="text-white/40 font-mono text-xs uppercase tracking-widest block mb-2">
                  Тип работы
                </span>
                <p className="text-white text-xl sm:text-2xl font-bold tracking-tight">
                  {workType}
                </p>
              </div>

              {links && (links.vk || links.tg || links.website) && (
                <div className="pt-6 border-t border-white/10 space-y-4" id="project-links-container">
                  <span className="text-white/40 font-mono text-xs uppercase tracking-widest block mb-1">
                    Ссылки проекта
                  </span>
                  <div className="flex flex-col gap-3" id="project-links-list">
                    {links.vk && (
                      <a
                        href={links.vk}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-between gap-3 bg-white/5 hover:bg-white/10 text-white font-medium py-3 px-4 rounded-xl border border-white/5 hover:border-white/15 transition-all group w-full max-w-sm cursor-pointer text-sm"
                        id="link-vk"
                      >
                        <span className="flex items-center gap-2.5">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                            <path d="M15.684 0H8.31675C1.59375 0 0 1.59375 0 8.31675V15.684C0 22.407 1.59375 24.0007 8.31675 24.0007H15.684C22.407 24.0007 24.0007 22.407 24.0007 15.684V8.31675C24.0007 1.59375 22.3912 0 15.684 0ZM19.3755 17.121H17.6332C16.9732 17.121 16.77 16.5975 15.5827 15.3945C14.5515 14.3947 14.0947 14.262 13.8405 14.262C13.4812 14.262 13.3792 14.3633 13.3792 14.856V16.4303C13.3792 16.8525 13.2465 17.106 12.129 17.106C10.281 17.106 8.2305 15.9885 6.79275 13.9065C4.6245 10.8555 4.03125 8.57025 4.03125 8.09775C4.03125 7.8435 4.1325 7.60575 4.62075 7.60575H6.36675C6.8085 7.60575 6.9765 7.809 7.14825 8.2815C8.0115 10.7738 9.44925 12.957 10.0425 12.957C10.2615 12.957 10.3628 12.8558 10.3628 12.297V9.723C10.296 8.53575 9.67125 8.43375 9.67125 8.01225C9.67125 7.809 9.83925 7.60575 10.1085 7.60575H12.8542C13.2255 7.60575 13.362 7.809 13.362 8.24625V11.7188C13.362 12.0938 13.53 12.2265 13.6312 12.2265C13.8502 12.2265 14.0377 12.0938 14.4435 11.6873C15.6975 10.281 16.596 8.11275 16.596 8.11275C16.713 7.8585 16.9163 7.62075 17.358 7.62075H19.104C19.6275 7.62075 19.7445 7.89 19.6275 8.265C19.4085 9.2805 17.2717 12.2963 17.2717 12.2963C17.088 12.6007 17.0175 12.7335 17.2717 13.0732C17.4592 13.3275 18.069 13.8548 18.4748 14.3273C19.221 15.1748 19.7948 15.8857 19.9478 16.3778C20.1195 16.866 19.866 17.1203 19.3732 17.1203 L19.3755 17.121 Z" fill="#0066cc"/>
                          </svg>
                          <span>ВК проекта</span>
                        </span>
                        <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </a>
                    )}
                    {links.tg && (
                      <a
                        href={links.tg}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-between gap-3 bg-white/5 hover:bg-white/10 text-white font-medium py-3 px-4 rounded-xl border border-white/5 hover:border-white/15 transition-all group w-full max-w-sm cursor-pointer text-sm"
                        id="link-tg"
                      >
                        <span className="flex items-center gap-2.5">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                            <path d="M12 0C5.376 0 0 5.376 0 12C0 18.624 5.376 24 12 24C18.624 24 24 18.624 24 12C24 5.376 18.624 0 12 0ZM17.568 8.16C17.388 10.056 16.608 14.664 16.212 16.788C16.044 17.688 15.708 17.988 15.396 18.024C14.7 18.084 14.172 17.568 13.5 17.124C12.444 16.428 11.844 15.996 10.824 15.324C9.636 14.544 10.404 14.112 11.088 13.416C11.268 13.236 14.34 10.44 14.4 10.188C14.4083 10.1498 14.4072 10.1102 14.3968 10.0726C14.3863 10.0349 14.3668 10.0004 14.34 9.972C14.268 9.912 14.172 9.936 14.088 9.948C13.98 9.972 12.3 11.088 9.024 13.296C8.544 13.62 8.112 13.788 7.728 13.776C7.296 13.764 6.48 13.536 5.868 13.332C5.112 13.092 4.524 12.96 4.572 12.54C4.596 12.324 4.896 12.108 5.46 11.88C8.964 10.356 11.292 9.348 12.456 8.868C15.792 7.476 16.476 7.236 16.932 7.236C17.028 7.236 17.256 7.26 17.4 7.38C17.52 7.476 17.556 7.608 17.568 7.704C17.556 7.776 17.58 7.992 17.568 8.16Z" fill="#0E84BF"/>
                          </svg>
                          <span>ТГ проекта</span>
                        </span>
                        <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </a>
                    )}
                    {links.website && (
                      <a
                        href={links.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-between gap-3 bg-white/5 hover:bg-white/10 text-white font-medium py-3 px-4 rounded-xl border border-white/5 hover:border-white/15 transition-all group w-full max-w-sm cursor-pointer text-sm"
                        id="link-website"
                      >
                        <span className="flex items-center gap-2.5">
                          <Globe className="w-4 h-4 text-[#10b981]" />
                          <span>Сайт проекта</span>
                        </span>
                        <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE: Client contexts, Objectives and Mission without layouts/containers */}
          <div className="lg:col-span-7 flex flex-col justify-start space-y-12" id="project-right-essays">
            
            {/* Context Section */}
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mb-4 uppercase">
                О КЛИЕНТЕ И КОНЦЕПЦИИ
              </h3>
              <p className="text-white/90 text-base sm:text-lg leading-relaxed font-body">
                {clientDescription}
              </p>
            </div>

            {/* Objective Section */}
            <div className="border-t border-white/10 pt-8">
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mb-4 uppercase">
                ПОСТАВЛЕННАЯ ЗАДАЧА
              </h3>
              <p className="text-white/90 text-base sm:text-lg leading-relaxed font-body">
                {taskDescription}
              </p>
            </div>

          </div>

        </m.div>

        {/* DYNAMIC CASE STUDY FLOW BLOCKS - Custom configured in JSON */}
        {blocks.length > 0 && (
          <div className="space-y-16 sm:space-y-24 border-t border-white/10 pt-16 sm:pt-24" id="project-blocks-container">
            {blocks.map((block, index) => {
              if (block.type === "text") {
                return (
                  <m.div 
                    key={index} 
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start"
                    id={`block-text-${index}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  >
                    <div className="lg:col-span-5">
                      {block.title && (
                        <h2 className="text-2xl font-extrabold tracking-tight text-white mb-0 uppercase leading-snug">
                          {block.title}
                        </h2>
                      )}
                    </div>
                    <div className="lg:col-span-7">
                      {block.text && (
                        <p className="text-white/90 text-base sm:text-lg leading-relaxed font-body m-0">
                          {block.text}
                        </p>
                      )}
                    </div>
                  </m.div>
                );
              }

              if (block.type === "media" && block.items && block.items.length > 0) {
                const isDouble = block.layout === "double" && block.items.length >= 2;
                const aspect = block.aspectRatio;
                
                const getAspectRatioClass = (aspectVal: string | undefined, doubleMode: boolean) => {
                  if (!aspectVal) return doubleMode ? "aspect-square" : "aspect-[2/1]";
                  const format = aspectVal.replace(":", "/");
                  if (format === "9/16") return "aspect-[9/16]";
                  if (format === "3/4") return "aspect-[3/4]";
                  if (format === "4/3") return "aspect-[4/3]";
                  if (format === "16/9") return "aspect-[16/9]";
                  if (format === "3/1") return "aspect-[3/1]";
                  if (format === "square" || format === "1/1") return "aspect-square";
                  return doubleMode ? "aspect-square" : "aspect-[2/1]";
                };

                return (
                  <m.div 
                    key={index}
                    className={`grid ${isDouble ? "grid-cols-1 md:grid-cols-2 gap-8" : "grid-cols-1"} w-full`}
                    id={`block-media-${index}`}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    {block.items.slice(0, isDouble ? 2 : 1).map((item, itemIdx) => (
                      <div 
                        key={itemIdx} 
                        className={`relative rounded-[12px] md:rounded-[24px] overflow-hidden bg-neutral-900 w-full ${
                          isDouble ? getAspectRatioClass(aspect, isDouble) : "h-auto"
                        }`}
                      >
                        <MediaItem item={item} isDouble={isDouble} aspect={aspect} onClick={setLightboxImage} />
                      </div>
                    ))}
                  </m.div>
                );
              }

              return null;
            })}
          </div>
        )}

        {/* Next / Previous Project Navigation Widget */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-b border-white/10 py-12 my-12" id="project-footer-navigation">
          {/* Previous case link */}
          {prevProject && (
            <button
              onClick={() => handleNavigateProject(prevProjectId)}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              className="group flex flex-col items-start gap-2 p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] hover:border-white/10 transition-all text-left cursor-pointer outline-none focus:outline-none"
              id="prev-project-card"
            >
              <span className="text-white/40 font-mono text-xs uppercase tracking-widest flex items-center gap-1.5">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> Предыдущий проект
              </span>
              <span 
                className="text-white text-lg sm:text-xl font-bold font-sans transition-colors duration-300 line-clamp-1"
                style={{ color: hoverPrev ? (prevProject.backgroundColor || "#E86A33") : "#ffffff" }}
              >
                {prevProject.title}
              </span>
            </button>
          )}

          {/* Next case link */}
          {nextProject && (
            <button
              onClick={() => handleNavigateProject(nextProjectId)}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              className="group flex flex-col items-end gap-2 p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] hover:border-white/10 transition-all text-right cursor-pointer outline-none focus:outline-none"
              id="next-project-card"
            >
              <span className="text-white/40 font-mono text-xs uppercase tracking-widest flex items-center gap-1.5 justify-end">
                Следующий проект <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span 
                className="text-white text-lg sm:text-xl font-bold font-sans transition-colors duration-300 line-clamp-1"
                style={{ color: hoverNext ? (nextProject.backgroundColor || "#E86A33") : "#ffffff" }}
              >
                {nextProject.title}
              </span>
            </button>
          )}
        </div>

        {/* Dynamic Back-to-List button at the absolute bottom of page details */}
        <div className="flex justify-start pt-12">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 bg-transparent border-none text-white/70 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer outline-none focus:outline-none p-0"
            type="button"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1.5 transition-transform" />
            <span>Вернуться в галерею работ</span>
          </button>
        </div>
      </main>

      <EngineTechFooter />

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8 cursor-zoom-out"
            onClick={() => setLightboxImage(null)}
          >
            <img
              src={getOptimizedImageUrl(lightboxImage, 1920)}
              alt="Enlarged view"
              className="max-w-full max-h-full object-contain select-none"
              referrerPolicy="no-referrer"
            />
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
