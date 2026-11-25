import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import { getOptimizedVideoUrl } from "../utils/image";

const CtaFooter = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const rawUrl = "https://res.cloudinary.com/dasip9jjs/video/upload/v1782471489/0626_uhykty.mp4";
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const src = getOptimizedVideoUrl(rawUrl, isMobile);

    const loadVideo = () => {
      video.src = src;
      video.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.log("Video Play prevented:", e));
    };

    // Trigger preload 800px before reaching viewport for instant playback
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadVideo();
        observer.disconnect();
      }
    }, { rootMargin: "800px" });

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 px-6 md:px-16 lg:px-24 text-center overflow-hidden bg-[#171717] text-white font-body" 
      id="cta-footer-section"
    >
      {/* Background HLS Video */}
      <div className="absolute inset-0 select-none z-0">
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="none"
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload nofullscreen noremoteplayback"
          tabIndex={-1}
          onPlaying={() => setIsPlaying(true)}
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none relative z-10 transition-opacity duration-1000 ${
            isPlaying ? "opacity-60" : "opacity-35"
          }`}
          id="cta-background-video"
          poster="https://res.cloudinary.com/dasip9jjs/video/upload/f_auto,q_auto,so_0/v1782471489/0626_uhykty.jpg"
        />
        <div className="video-blocker-overlay z-30" />
      </div>

      {/* Top fade */}
      <div
        className="absolute top-0 left-0 right-0 z-[1] pointer-events-none"
        style={{ height: '200px', background: 'linear-gradient(to bottom, #171717, transparent)' }}
        id="cta-top-fade-overlay"
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[1] pointer-events-none"
        style={{ height: '200px', background: 'linear-gradient(to top, #171717, transparent)' }}
        id="cta-bottom-fade-overlay"
      />

      {/* Content */}
      <div className="relative z-10" id="cta-content-wrapper">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white tracking-tight leading-[1.1] max-w-4xl mx-auto mb-6" id="cta-main-title">
          Давайте сделаем ваш проект следующим
        </h2>
        <p className="text-white/60 font-body font-light text-sm md:text-base max-w-2xl mx-auto mb-8" id="cta-subtext">
          Я создаю интерфейсы, сайты и контент, которые выглядят современно и помогают бизнесу расти.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4" id="cta-button-row">
          <button 
            type="button"
            onClick={() => {
              navigate("/projects");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="bg-[#292929] hover:bg-[#333333] text-white rounded-full px-8 py-3.5 text-sm font-semibold flex items-center justify-center gap-2 transition-all font-body cursor-pointer border-none shadow-md active:scale-95 w-full sm:w-auto" 
            id="cta-btn-book"
          >
            <span>Смотреть проекты</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
          <a 
            href="https://t.me/LegiumProf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0066cc] hover:bg-[#0055aa] text-white rounded-full px-8 py-3.5 text-sm font-semibold flex items-center justify-center gap-2 transition-all font-body cursor-pointer border-none shadow-lg active:scale-95 w-full sm:w-auto no-underline" 
            id="cta-btn-pricing"
          >
            <span>Обсудить проект</span>
            <ArrowUpRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CtaFooter;
