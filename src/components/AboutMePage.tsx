import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowLeft from "lucide-react/dist/esm/icons/arrow-left";
import Sparkle from "lucide-react/dist/esm/icons/sparkle";
import GraduationCap from "lucide-react/dist/esm/icons/graduation-cap";
import Briefcase from "lucide-react/dist/esm/icons/briefcase";
import Send from "lucide-react/dist/esm/icons/send";
import Award from "lucide-react/dist/esm/icons/award";
import CheckCircle2 from "lucide-react/dist/esm/icons/check-circle-2";
import ExternalLink from "lucide-react/dist/esm/icons/external-link";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";
import Cpu from "lucide-react/dist/esm/icons/cpu";
import Monitor from "lucide-react/dist/esm/icons/monitor";
import Database from "lucide-react/dist/esm/icons/database";
import Layers from "lucide-react/dist/esm/icons/layers";
import Heart from "lucide-react/dist/esm/icons/heart";
import Menu from "lucide-react/dist/esm/icons/menu";
import X from "lucide-react/dist/esm/icons/x";
import { m, AnimatePresence } from "motion/react";
import CtaFooter from "./CtaFooter";
import EngineTechFooter from "./EngineTechFooter";
import { getOptimizedImageUrl, getOptimizedSrcSet } from "../utils/image";

export default function AboutMePage({ onBack }: { onBack: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    setIsMobileDevice(window.innerWidth < 768 || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top or specific section on mount
  useEffect(() => {
    if (location.search.includes("contact")) {
      setTimeout(() => {
        const el = document.getElementById("contact-section");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location]);

  const handleNavToHomeSection = (sectionId: string) => {
    navigate("/", { state: { scrollTo: sectionId } });
  };

  return (
    <div className="min-h-screen bg-[#171717] text-white flex flex-col font-sans overflow-x-hidden relative" id="about-me-page-container">
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-[#111111]/98 backdrop-blur-lg flex flex-col justify-between p-8"
            id="mobile-nav-panel-about"
          >
            {/* Header inside mobile menu */}
            <div className="flex items-center justify-between w-full">
              <span className="brand !text-[15px] uppercase tracking-wider text-white">Vadim Semenov</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 -mr-2 bg-transparent border-none text-white/80 hover:text-white cursor-pointer"
                type="button"
                aria-label="Закрыть меню"
                id="close-mobile-menu-btn-about"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            {/* Navigation Links centered */}
            <div className="flex flex-col gap-6 my-auto text-center" id="mobile-menu-links-about">
              <a
                href="#/about"
                className="text-2xl font-bold tracking-widest text-white/90 hover:text-white transition-colors uppercase py-2"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                id="mobile-link-about-page"
              >
                Обо мне
              </a>
              <a
                href="/projects"
                className="text-2xl font-bold tracking-widest text-white/90 hover:text-white transition-colors uppercase py-2"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  navigate("/projects");
                }}
                id="mobile-link-projects-page"
              >
                Кейсы
              </a>
              <a
                href="#services"
                className="text-2xl font-bold tracking-widest text-white/90 hover:text-white transition-colors uppercase py-2"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  handleNavToHomeSection("services");
                }}
                id="mobile-link-services-page"
              >
                Услуги
              </a>
            </div>

            {/* Footer info inside menu */}
            <div className="flex flex-col items-center gap-6 w-full pb-6" id="mobile-menu-footer-about">
              <div className="flex items-center gap-4" id="mobile-menu-socials-about">
                <a href="https://vk.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors" aria-label="VK" id="mobile-social-vk-about">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.684 0H8.31675C1.59375 0 0 1.59375 0 8.31675V15.684C0 22.407 1.59375 24.0007 8.31675 24.0007H15.684C22.407 24.0007 24.0007 22.407 24.0007 15.684V8.31675C24.0007 1.59375 22.3912 0 15.684 0ZM19.3755 17.121H17.6332C16.9732 17.121 16.77 16.5975 15.5827 15.3945C14.5515 14.3947 14.0947 14.262 13.8405 14.262C13.4812 14.262 13.3792 14.3633 13.3792 14.856V16.4303C13.3792 16.8525 13.2465 17.106 12.129 17.106C10.281 17.106 8.2305 15.9885 6.79275 13.9065C4.6245 10.8555 4.03125 8.57025 4.03125 8.09775C4.03125 7.8435 4.1325 7.60575 4.62075 7.60575H6.36675C6.8085 7.60575 6.9765 7.809 7.14825 8.2815C8.0115 10.7738 9.44925 12.957 10.0425 12.957C10.2615 12.957 10.3628 12.8558 10.3628 12.297V9.723C10.296 8.53575 9.67125 8.43375 9.67125 8.01225C9.67125 7.809 9.83925 7.60575 10.1085 7.60575H12.8542C13.2255 7.60575 13.362 7.809 13.362 8.24625V11.7188C13.362 12.0938 13.53 12.2265 13.6312 12.2265C13.8502 12.2265 14.0377 12.0938 14.4435 11.6873C15.6975 10.281 16.596 8.11275 16.596 8.11275C16.713 7.8585 16.9163 7.62075 17.358 7.62075H19.104C19.6275 7.62075 19.7445 7.89 19.6275 8.265C19.4085 9.2805 17.2717 12.2963 17.2717 12.2963C17.088 12.6007 17.0175 12.7335 17.2717 13.0732C17.4592 13.3275 18.069 13.8548 18.4748 14.3273C19.221 15.1748 19.7948 15.8857 19.9478 16.3778C20.1195 16.866 19.866 17.1203 19.3732 17.1203L19.3755 17.121Z" fill="#0076FE"/>
                  </svg>
                </a>
                <a href="https://t.me/username" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors" aria-label="Telegram" id="mobile-social-tg-about">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C5.376 0 0 5.376 0 12C0 18.624 5.376 24 12 24C18.624 24 24 18.624 24 12C24 5.376 18.624 0 12 0ZM17.568 8.16C17.388 10.056 16.608 14.664 16.212 16.788C16.044 17.688 15.708 17.988 15.396 18.024C14.7 18.084 14.172 17.568 13.5 17.124C12.444 16.428 11.844 15.996 10.824 15.324C9.636 14.544 10.404 14.112 11.088 13.416C11.268 13.236 14.34 10.44 14.4 10.188C14.4083 10.1498 14.4072 10.1102 14.3968 10.0726C14.3863 10.0349 14.3668 10.0004 14.34 9.972C14.268 9.912 14.172 9.936 14.088 9.948C13.98 9.972 12.3 11.088 9.024 13.296C8.544 13.62 8.112 13.788 7.728 13.776C7.296 13.764 6.48 13.536 5.868 13.332C5.112 13.092 4.524 12.54 4.596 12.324 4.896 12.108 5.46 11.88C8.964 10.356 11.292 9.348 12.456 8.868C15.792 7.476 16.476 7.236 16.932 7.236C17.028 7.236 17.256 7.26 17.4 7.38C17.52 7.476 17.556 7.608 17.568 7.704C17.556 7.776 17.58 7.992 17.568 8.16Z" fill="#0E84BF"/>
                  </svg>
                </a>
              </div>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/projects");
                }}
                className="w-full max-w-[280px] h-12 bg-[var(--blue)] hover:bg-[#0055aa] rounded-full font-bold text-sm tracking-wide text-white uppercase flex items-center justify-center gap-2 cursor-pointer"
                type="button"
                id="mobile-menu-action-btn-about"
              >
                <Briefcase className="w-5 h-5 text-current" />
                <span>Все проекты</span>
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Sticky Fixed Header on Scroll */}
      <AnimatePresence>
        {isScrolled && (
          <m.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 z-50 bg-[#171717]/90 backdrop-blur-md border-b border-white/[0.05] py-3.5 px-[18px] md:px-[32px] flex items-center justify-between"
            id="site-header-sticky-about"
          >
            <a className="brand !text-[14px] xs:!text-[17px] md:!text-[22px] cursor-pointer" aria-label="Vadim Semenov" id="brand-link-sticky-about" onClick={(e) => { e.preventDefault(); onBack(); }}>
              Vadim Semenov
            </a>

            <nav className="navigation hidden md:flex items-center gap-6" aria-label="Основная навигация" id="site-navigation-sticky-about">
              <a href="/about" id="nav-about-sticky-about" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Обо мне</a>
              <a href="/projects" id="nav-projects-sticky-about" onClick={(e) => { e.preventDefault(); navigate("/projects"); }}>Кейсы</a>
              <a href="#services" id="nav-services-sticky-about" onClick={(e) => { e.preventDefault(); handleNavToHomeSection("services"); }}>Услуги</a>
            </nav>

            <div className="flex items-center gap-3" id="header-actions-sticky-about">
              <div className="hidden md:flex items-center gap-3" id="sticky-socials-desktop-about">
                <a className="social-button shrink-0" href="https://vk.com" target="_blank" rel="noopener noreferrer" aria-label="VK" id="social-vk-sticky-about">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.684 0H8.31675C1.59375 0 0 1.59375 0 8.31675V15.684C0 22.407 1.59375 24.0007 8.31675 24.0007H15.684C22.407 24.0007 24.0007 22.407 24.0007 15.684V8.31675C24.0007 1.59375 22.3912 0 15.684 0ZM19.3755 17.121H17.6332C16.9732 17.121 16.77 16.5975 15.5827 15.3945C14.5515 14.3947 14.0947 14.262 13.8405 14.262C13.4812 14.262 13.3792 14.3633 13.3792 14.856V16.4303C13.3792 16.8525 13.2465 17.106 12.129 17.106C10.281 17.106 8.2305 15.9885 6.79275 13.9065C4.6245 10.8555 4.03125 8.57025 4.03125 8.09775C4.03125 7.8435 4.1325 7.60575 4.62075 7.60575H6.36675C6.8085 7.60575 6.9765 7.809 7.14825 8.2815C8.0115 10.7738 9.44925 12.957 10.0425 12.957C10.2615 12.957 10.3628 12.8558 10.3628 12.297V9.723C10.296 8.53575 9.67125 8.43375 9.67125 8.01225C9.67125 7.809 9.83925 7.60575 10.1085 7.60575H12.8542C13.2255 7.60575 13.362 7.809 13.362 8.24625V11.7188C13.362 12.0938 13.53 12.2265 13.6312 12.2265C13.8502 12.2265 14.0377 12.0938 14.4435 11.6873C15.6975 10.281 16.596 8.11275 16.596 8.11275C16.713 7.8585 16.9163 7.62075 17.358 7.62075H19.104C19.6275 7.62075 19.7445 7.89 19.6275 8.265C19.4085 9.2805 17.2717 12.2963 17.2717 12.2963C17.088 12.6007 17.0175 12.7335 17.2717 13.0732C17.4592 13.3275 18.069 13.8548 18.4748 14.3273C19.221 15.1748 19.7948 15.8857 19.9478 16.3778C20.1195 16.866 19.866 17.1203 19.3732 17.1203L19.3755 17.121Z" fill="#0076FE"/>
                   </svg>
                 </a>
                 <a className="social-button shrink-0" href="https://t.me/username" target="_blank" rel="noopener noreferrer" aria-label="Telegram" id="social-tg-sticky-about">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M12 0C5.376 0 0 5.376 0 12C0 18.624 5.376 24 12 24C18.624 24 24 18.624 24 12C24 5.376 18.624 0 12 0ZM17.568 8.16C17.388 10.056 16.608 14.664 16.212 16.788C16.044 17.688 15.708 17.988 15.396 18.024C14.7 18.084 14.172 17.568 13.5 17.124C12.444 16.428 11.844 15.996 10.824 15.324C9.636 14.544 10.404 14.112 11.088 13.416C11.268 13.236 14.34 10.44 14.4 10.188C14.4083 10.1498 14.4072 10.1102 14.3968 10.0726C14.3863 10.0349 14.3668 10.0004 14.34 9.972C14.268 9.912 14.172 9.936 14.088 9.948C13.98 9.972 12.3 11.088 9.024 13.296C8.544 13.62 8.112 13.788 7.728 13.776C7.296 13.764 6.48 13.536 5.868 13.332C5.112 13.092 4.524 12.96 4.572 12.54C4.596 12.324 4.896 12.108 5.46 11.88C8.964 10.356 11.292 9.348 12.456 8.868C15.792 7.476 16.476 7.236 16.932 7.236C17.028 7.236 17.256 7.26 17.4 7.38C17.52 7.476 17.556 7.608 17.568 7.704C17.556 7.776 17.58 7.992 17.568 8.16ZM12 4C14.2 4 16 5.8 16 8C16 10.2 14.2 12 12 12C9.8 12 8 10.2 8 8C8 5.8 9.8 4 12 4Z" fill="#0E84BF"/>
                   </svg>
                 </a>
               </div>
               <button
                 onClick={() => {
                   const el = document.getElementById("contact-section");
                   if (el) {
                     el.scrollIntoView({ behavior: "smooth" });
                   }
                 }}
                 className="collab-button cursor-pointer font-medium inline-flex"
                 id="collab-btn-sticky-about"
                 type="button"
               >
                 <span>Сотрудничать</span>
               </button>

               {/* Burger Menu Trigger */}
               <button
                 onClick={() => setIsMobileMenuOpen(true)}
                 className="p-2 ml-1 md:hidden bg-transparent border-none text-white/95 hover:text-white outline-none focus:outline-none cursor-pointer"
                 type="button"
                 aria-label="Открыть меню"
                 id="open-mobile-menu-sticky-about"
               >
                 <Menu className="w-7 h-7" />
               </button>
             </div>
            </m.header>
         )}
       </AnimatePresence>

       {/* Sticky/Fixed Header matching the main page exactly */}
       <header className="site-header" id="site-header">
        <a className="brand md:!text-[22px] cursor-pointer" onClick={(e) => { e.preventDefault(); onBack(); }} aria-label="Vadim Semenov" id="brand-link-about">
          Vadim Semenov
        </a>

        <nav className="navigation animate-fade-in" aria-label="Основная навигация" id="site-navigation-about">
          <a href="/about" id="nav-about-page" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Обо мне</a>
          <a href="/projects" id="nav-projects-page" onClick={(e) => { e.preventDefault(); navigate("/projects"); }}>Кейсы</a>
          <a href="#services" id="nav-services-page" onClick={(e) => { e.preventDefault(); handleNavToHomeSection("services"); }}>Услуги</a>
        </nav>

        <div className="header-actions" id="header-actions-container-about">
          <div className="flex items-center gap-3" id="standard-socials-desktop-about">
            <a className="social-button" href="https://vk.com" target="_blank" rel="noopener noreferrer" aria-label="VK" id="social-vk-about">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/VK_Compact_Logo_%282021-present%29.svg/512px-VK_Compact_Logo_%282021-present%29.svg.png" alt="VK" referrerPolicy="no-referrer" />
            </a>
            <a className="social-button" href="https://t.me/username" target="_blank" rel="noopener noreferrer" aria-label="Telegram" id="social-tg-about">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/512px-Telegram_logo.svg.png" alt="Telegram" referrerPolicy="no-referrer" />
            </a>
          </div>
          <button 
            onClick={() => {
              const el = document.getElementById("contact-section");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              }
            }} 
            className="collab-button cursor-pointer font-medium inline-flex" 
            id="collab-btn-about"
            type="button"
          >
            <span>Сотрудничать</span>
          </button>

          {/* Burger Menu Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 ml-1 md:hidden bg-transparent border-none text-white/95 hover:text-white outline-none focus:outline-none cursor-pointer"
            type="button"
            aria-label="Открыть меню"
            id="open-mobile-menu-about"
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </header>

      {/* Hero Screen mimicking main page hero */}
      <section className="hero" aria-label="About me hero" id="aboutme-hero">
        <div className="hero__background select-none pointer-events-auto">
          <video 
            className="w-full h-full object-cover pointer-events-none relative z-10" 
            autoPlay 
            muted 
            loop 
            playsInline 
            aria-hidden="true" 
            id="aboutme-hero-bg-video" 
            disablePictureInPicture
            disableRemotePlayback
            controlsList="nodownload nofullscreen noremoteplayback"
            tabIndex={-1}
            poster="https://res.cloudinary.com/dasip9jjs/video/upload/f_auto,q_auto,so_0/v1781713491/hero-background_s7zboc.jpg"
            {...({ fetchPriority: "high" } as any)}
          >
            <source src="https://res.cloudinary.com/dasip9jjs/video/upload/f_mp4,vc_h265/v1781713491/hero-background_s7zboc.mp4" type="video/mp4; codecs=hevc" />
            <source src="https://res.cloudinary.com/dasip9jjs/video/upload/f_webm,vc_vp9/v1781713491/hero-background_s7zboc.webm" type="video/webm; codecs=vp9" />
          </video>
          <div className="video-blocker-overlay z-30" />
        </div>

        <h1 className="hero__title" id="about-me-main-title">
          <span className="sr-only">ОБО МНЕ</span>
          
          {/* Mobile view: 2 lines centered elegantly and scaled like the main page */}
          <span className="md:hidden flex flex-col gap-1 w-full whitespace-normal" aria-hidden="true">
            <svg className="w-full h-auto overflow-visible select-none" viewBox="0 0 212 100" style={{ display: 'block' }}>
              <text
                x="50%"
                y="82"
                textAnchor="middle"
                fill="currentColor"
                fontSize="100"
                fontFamily='"Oswald", Impact, sans-serif'
                fontWeight="700"
                letterSpacing="0.02em"
              >
                ОБО
              </text>
            </svg>
            <svg className="w-full h-auto overflow-visible select-none" viewBox="0 0 212 100" style={{ display: 'block' }}>
              <text
                x="50%"
                y="82"
                textAnchor="middle"
                fill="currentColor"
                fontSize="100"
                fontFamily='"Oswald", Impact, sans-serif'
                fontWeight="700"
                letterSpacing="0.02em"
              >
                МНЕ
              </text>
            </svg>
          </span>

          {/* Desktop view: 1 line centered elegantly and scaled like the main page */}
          <span className="hidden md:block w-full" aria-hidden="true">
            <svg className="w-full h-auto overflow-visible select-none" viewBox="0 0 390 100" style={{ display: 'block' }}>
              <text
                x="50%"
                y="82"
                textAnchor="middle"
                fill="currentColor"
                fontSize="100"
                fontFamily='"Oswald", Impact, sans-serif'
                fontWeight="700"
                letterSpacing="0.02em"
              >
                ОБО МНЕ
              </text>
            </svg>
          </span>
        </h1>

        {/* Outer content zone container to force the picture to occupy 90% of content zone width */}
        <div className="absolute inset-x-0 bottom-0 top-0 flex justify-center pointer-events-none z-20">
          <div className="w-full max-w-7xl px-[18px] md:px-[32px] relative h-full flex items-end justify-between pb-8 md:pb-12">
            {/* Left Column Inscription */}
            <div className="hidden md:flex flex-col gap-1.5 max-w-[280px] lg:max-w-[320px] text-left select-none z-20">
              <p className="text-xs lg:text-sm text-white/70 font-light leading-relaxed m-0">
                Веб-дизайн, интерфейсы (UX/UI), креативное направление и разработка интерактивного контента для сильных брендов.
              </p>
            </div>

            {/* Centered portrait image */}
            <img
              src={getOptimizedImageUrl("https://res.cloudinary.com/dasip9jjs/image/upload/v1782304775/2-Photoroom_1_ohpxdy.png", 1000)}
              srcSet={getOptimizedSrcSet("https://res.cloudinary.com/dasip9jjs/image/upload/v1782304775/2-Photoroom_1_ohpxdy.png", [480, 800, 1000, 1400])}
              sizes="(max-width: 768px) 100vw, 80vw"
              alt="Vadim Semenov"
              aria-hidden="true"
              id="aboutme-hero-portrait"
              referrerPolicy="no-referrer"
              loading="eager"
              {...({ fetchPriority: "high" } as any)}
            />

            {/* Right Column Inscription */}
            <div className="hidden md:flex flex-col gap-1.5 max-w-[280px] lg:max-w-[320px] text-right items-end select-none z-20">
              <p className="text-xs lg:text-sm text-white/70 font-light leading-relaxed m-0">
                Базируюсь в Санкт-Петербурге, сотрудничаю по всему миру. Создаю лаконичный и функциональный дизайн с вниманием к деталям.
              </p>
            </div>

            {/* Mobile View Bottom Inscription (same texts as desktop, aligned to the left edge) */}
            <div className="md:hidden flex flex-col gap-3 items-start text-left w-full px-4 select-none z-20">
              <p className="text-xs text-white/70 font-light leading-relaxed m-0 max-w-[280px]">
                Веб-дизайн, интерфейсы (UX/UI), креативное направление и разработка интерактивного контента для сильных брендов.
              </p>
              <p className="text-xs text-white/70 font-light leading-relaxed m-0 max-w-[280px]">
                Базируюсь в Санкт-Петербурге, сотрудничаю по всему миру. Создаю лаконичный и функциональный дизайн с вниманием к деталям.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections: Bento Grid Showcase / Story */}
      <section className="px-[18px] md:px-[32px] py-20 max-w-7xl mx-auto w-full relative z-30" id="about-details-sec">
        
        {/* Intro Pitch block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-24 items-start">
          
          {/* Left Column: Title and Portrait video */}
          <div className="lg:col-span-5 flex flex-col gap-6 w-full">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-none my-0">
              Обо мне
            </h2>
            <div className="w-full rounded-[32px] overflow-hidden aspect-square bg-neutral-900 relative" id="aboutme-block-portrait-container">
              <img
                src={getOptimizedImageUrl("https://res.cloudinary.com/dasip9jjs/image/upload/v1782231052/photo_2025-08-29_19-45-44_jmkrhu.jpg", 1000)}
                srcSet={getOptimizedSrcSet("https://res.cloudinary.com/dasip9jjs/image/upload/v1782231052/photo_2025-08-29_19-45-44_jmkrhu.jpg", [480, 800, 1000])}
                sizes="(max-width: 1024px) 100vw, 600px"
                alt="Вадим"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                id="aboutme-block-portrait-image"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Bio details and Skill/Edu grids */}
          <div className="lg:col-span-7 flex flex-col gap-6 w-full">
            <div className="flex items-center">
              <span className="bg-[#0066cc] text-white px-[24px] py-[16px] rounded-[16px] text-sm font-bold tracking-wide">
                Привет!
              </span>
            </div>

            <p className="text-white/95 text-sm sm:text-base leading-relaxed font-normal w-full">
              Я выпускник направления «ИТ-технологии создания цифрового контента», специализируюсь на веб-дизайне и контент-дизайне. Мой опыт в равной степени объединяет проектирование цифровых интерфейсов (UX/UI, Tilda, WordPress, HTML/CSS) и разработку выразительного визуального контента, рекламных креативов и брендинга для бизнеса. Умею создавать продукты под ключ — от исследований аудитории до финального графического и интерактивного воплощения.
            </p>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light w-full">
              В работе я ориентируюсь на бизнес-цели и пользовательский опыт, уделяя одинаковое внимание как юзабилити и структуре сайтов, так и эстетике контентного наполнения. Умею находить эффективные решения для роста брендов, разрабатывая целостный визуальный стиль. Интересуюсь проектами, приносящими реальную пользу аудитории, и не рассматриваю сферы гэмблинга, оружия или табачной продукции.
            </p>

            {/* Adapted 3-column subgrid */}
            <div className="grid grid-cols-1 md:grid-cols-[120px_220px_1fr] gap-6 pt-8 border-t border-white/[0.05] mt-4 w-full">
              <div className="w-full md:max-w-[120px]">
                <h4 className="text-[16px] font-bold text-white uppercase tracking-wider mb-3">Навыки</h4>
                <ul className="space-y-1.5 text-[14px] text-white/50 p-0 m-0 list-none font-light w-full">
                  <li>Figma</li>
                  <li>Adobe Photoshop</li>
                  <li>Нейросети</li>
                  <li>HTML</li>
                  <li>CSS</li>
                  <li>JS</li>
                </ul>
              </div>

              <div className="w-full">
                <h4 className="text-[16px] font-bold text-white uppercase tracking-wider mb-3">Образование</h4>
                <p className="text-[14px] text-white/50 leading-relaxed font-light">
                  СПбГУПТД «ИТ-технологии создания цифрового контента»
                </p>
              </div>

              <div className="w-full">
                <h4 className="text-[16px] font-bold text-white uppercase tracking-wider mb-3">Работал со сферами</h4>
                <div className="flex flex-wrap gap-2 w-full">
                  {["Строительство", "Продукты", "Кофе", "Красота и уход", "Онлайн-курсы"].map((item, index) => (
                    <span 
                      key={index} 
                      className="bg-white/[0.04] text-white/80 border border-white/[0.05] px-3 py-[12px] rounded-[16px] text-[12px] font-medium transition-colors hover:bg-white/[0.08] hover:text-white"
                      style={{ borderStyle: 'none' }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bento Board: Career and Education */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20" id="about-bento-grid">
          
          {/* Card 1: Education (СПбГУПТД) with Red Diploma */}
          <div className="lg:col-span-1 bg-[#262626] border-none p-6 rounded-[28px] flex flex-col justify-between relative overflow-hidden" id="bento-edu-card">
            <div>
              <h3 className="text-xl font-bold text-white mt-1.5 mb-4">СПбГУПТД</h3>
              
              <div className="space-y-4">
                <div className="border-l-2 border-[#0066cc] pl-4">
                  <p className="text-[16px] font-semibold text-white/90">ИТ-технологии создания digital контента</p>
                  <p className="text-[14px] leading-[18px] text-white/40">Санкт-Петербургский государственный университет промышленных технологий и дизайна</p>
                </div>
                
                {/* Subtle highlight for Red Diploma */}
                <div className="border-none bg-[#303030] p-4 rounded-xl mt-3" id="about-red-diploma-box">
                  <span className="text-[14px] font-bold text-red-500 uppercase tracking-wider">Красный диплом</span>
                  <p className="text-white/60 text-[14px] leading-relaxed mt-1">
                    Окончил университет с отличием. Получил сильную фундаментальную базу по композиции, типографике и визуальным коммуникациям.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Career History Timeline */}
          <div className="lg:col-span-2 bg-[#262626] border-none p-6 rounded-[28px] flex flex-col justify-between overflow-hidden group" id="bento-career-card">
            <div>
              <h3 className="text-xl font-bold text-white mt-1.5 mb-6">Профессиональный путь</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                {/* Timeline item 1 */}
                <div className="relative pl-5 border-l-2 border-[#2d2d2d] hover:border-blue-500 transition-colors py-1">
                  <div className="absolute -left-[5px] top-2.5 w-2 h-2 rounded-full bg-[#0066cc]" />
                  <span className="text-[14px] text-[#3b9eff] bg-[#0066cc]/10 px-[8px] py-[8px] rounded-[8px] font-semibold">2025 &mdash; 2026</span>
                  <h4 className="text-[16px] font-bold text-white mt-3">Контент-дизайнер</h4>
                  <p className="text-[14px] text-white/60 font-semibold mt-0.5">Лавка24Линия</p>
                  <p className="text-[14px] leading-[18px] text-white/40 mt-2">
                    Разработка брендинга компании, контента для социальных сетей, создание рекламных креативов, промо-материалов и графических интерфейсных элементов. Оформление идентичности бренда.
                  </p>
                </div>

                {/* Timeline item 2 */}
                <div className="relative pl-5 border-l-2 border-[#2d2d2d] hover:border-[#0066cc] transition-colors py-1">
                  <div className="absolute -left-[5px] top-2.5 w-2 h-2 rounded-full bg-[#0066cc]" />
                  <span className="text-[14px] text-white/50 bg-white/5 px-[8px] py-[8px] rounded-[8px] font-semibold">2022 &mdash; 2026</span>
                  <h4 className="text-[16px] font-bold text-white mt-3">СПбГУПТД</h4>
                  <p className="text-[14px] text-white/60 font-semibold mt-0.5">ИТ-технологии создания цифрового контента</p>
                  <p className="text-[14px] leading-[18px] text-white/40 mt-2">
                    Получение профессионального академического образования, проектирование веб-интерфейсов и мобильных приложений, проработка юзабилити-тестирований и прототипов в Figma.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* Contact Links Hub "Maximum Employer Interest" */}
        <div id="contact-section" className="bg-[#262626] rounded-[32px] border-none p-8 md:p-12 relative overflow-hidden mb-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-5 flex flex-col gap-4">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white my-0 leading-tight">
                Готовы обсудить интересную вакансию или крутой проект?
              </h3>
              <p className="text-xs sm:text-sm text-white/50 leading-relaxed m-0 max-w-md">
                Я всегда открыт для интересных задач, продуктовых команд, стартапов и новых вызовов в качестве веб-дизайнера или фронтенд-разработчика. Напишите мне в удобный мессенджер!
              </p>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="flex flex-col gap-4 w-full">
                
                {/* Telegram Contact Card */}
                <a 
                  href="https://t.me/LegiumProf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#303030] hover:bg-[#383838] border-none hover:border-[#0e84bf]/30 p-5 rounded-2xl flex items-center justify-between transition-all group w-full"
                  id="about-contact-tg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center shrink-0">
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0C5.376 0 0 5.376 0 12C0 18.624 5.376 24 12 24C18.624 24 24 18.624 24 12C24 5.376 18.624 0 12 0ZM17.568 8.16C17.388 10.056 16.608 14.664 16.212 16.788C16.044 17.688 15.708 17.988 15.396 18.024C14.7 18.084 14.172 17.568 13.5 17.124C12.444 16.428 11.844 15.996 10.824 15.324C9.636 14.544 10.404 14.112 11.088 13.416C11.268 13.236 14.34 10.44 14.4 10.188C14.4083 10.1498 14.4072 10.1102 14.3968 10.0726C14.3863 10.0349 14.3668 10.0004 14.34 9.972C14.268 9.912 14.172 9.936 14.088 9.948C13.98 9.972 12.3 11.088 9.024 13.296C8.544 13.62 8.112 13.788 7.728 13.776C7.296 13.764 6.48 13.536 5.868 13.332C5.112 13.092 4.524 12.54 4.572 12.54C4.596 12.324 4.896 12.108 5.46 11.88C8.964 10.356 11.292 9.348 12.456 8.868C15.792 7.476 16.476 7.236 16.932 7.236C17.028 7.236 17.256 7.26 17.4 7.38C17.52 7.476 17.556 7.608 17.568 7.704C17.556 7.776 17.58 7.992 17.568 8.16Z" fill="#0E84BF"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[16px] font-bold text-white my-0">Telegram</h4>
                      <p className="text-[14px] text-white/40 mt-0.5 font-mono">@LegiumProf</p>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-white/20 group-hover:text-[#0e84bf] transition-colors" />
                </a>

                {/* VK Contact Card */}
                <a 
                  href="https://vk.com/semyonoffvadick" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#303030] hover:bg-[#383838] border-none hover:border-[#0066cc]/30 p-5 rounded-2xl flex items-center justify-between transition-all group w-full"
                  id="about-contact-vk"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center shrink-0">
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M15.684 0H8.31675C1.59375 0 0 1.59375 0 8.31675V15.684C0 22.407 1.59375 24.0007 8.31675 24.0007H15.684C22.407 24.0007 24.0007 22.407 24.0007 15.684V8.31675C24.0007 1.59375 22.3912 0 15.684 0ZM19.3755 17.121H17.6332C16.9732 17.121 16.77 16.5975 15.5827 15.3945C14.5515 14.3947 14.0947 14.262 13.8405 14.262C13.4812 14.262 13.3792 14.3633 13.3792 14.856V16.4303C13.3792 16.8525 13.2465 17.106 12.129 17.106C10.281 17.106 8.2305 15.9885 6.79275 13.9065C4.6245 10.8555 4.03125 8.57025 4.03125 8.09775C4.03125 7.8435 4.1325 7.60575 4.62075 7.60575H6.36675C6.8085 7.60575 6.9765 7.809 7.14825 8.2815C8.0115 10.7738 9.44925 12.957 10.0425 12.957C10.2615 12.957 10.3628 12.8558 10.3628 12.297V9.723C10.296 8.53575 9.67125 8.43375 9.67125 8.01225C9.67125 7.809 9.83925 7.60575 10.1085 7.60575H12.8542C13.2255 7.60575 13.362 7.809 13.362 8.24625V11.7188C13.362 12.0938 13.53 12.2265 13.6312 12.2265C13.8502 12.2265 14.0377 12.0938 14.4435 11.6873C15.6975 10.281 16.596 8.11275 16.596 8.11275C16.713 7.8585 16.9163 7.62075 17.358 7.62075H19.104C19.6275 7.62075 19.7445 7.89 19.6275 8.265C19.4085 9.2805 17.2717 12.2963 17.2717 12.2963C17.088 12.6007 17.0175 12.7335 17.2717 13.0732C17.4592 13.3275 18.069 13.8548 18.4748 14.3273C19.221 15.1748 19.7948 15.8857 19.9478 16.3778C20.1195 16.866 19.866 17.1203 19.3732 17.1203L19.3755 17.121Z" fill="#0076FE"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[16px] font-bold text-white my-0">ВКонтакте</h4>
                      <p className="text-[14px] text-white/40 mt-0.5 font-mono">semyonoffvadick</p>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-white/20 group-hover:text-[#3b9eff] transition-colors" />
                </a>

                {/* Email Contact Card */}
                <a 
                  href="mailto:semyonoffvadick@yandex.ru" 
                  className="bg-[#303030] hover:bg-[#383838] border-none hover:border-emerald-500/30 p-5 rounded-2xl flex items-center justify-between transition-all group w-full"
                  id="about-contact-mail"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 text-emerald-400 flex items-center justify-center shrink-0">
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z" fill="currentColor"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[16px] font-bold text-white my-0">Почта</h4>
                      <p className="text-[14px] text-white/40 mt-0.5 font-mono">semyonoffvadick@yandex.ru</p>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-white/20 group-hover:text-emerald-400 transition-colors" />
                </a>

              </div>

              {/* Work values footer inside contacts */}
              <div className="bg-[#252525] border-none p-4 rounded-2xl flex items-center gap-3.5 mt-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <p className="text-xs text-white/70 m-0">
                  <span className="font-bold text-white">Текущий статус:</span> Открыт к предложениям по работе, сотрудничеству и проектной загрузке.
                </p>
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* Reusable Premium Footer Components (matches homepage) */}
      <CtaFooter />
      <EngineTechFooter />
    </div>
  );
}
