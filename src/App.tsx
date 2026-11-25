/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, lazy, Suspense, useMemo, useCallback } from "react";
import Sparkle from "lucide-react/dist/esm/icons/sparkle";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down";
import Briefcase from "lucide-react/dist/esm/icons/briefcase";
import Menu from "lucide-react/dist/esm/icons/menu";
import X from "lucide-react/dist/esm/icons/x";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import { LazyMotion, m, AnimatePresence } from "motion/react";
import { Routes, Route, useNavigate, useParams, useLocation } from "react-router-dom";

// Dynamic import for motion features to keep them out of initial bundle
const loadFeatures = () => import("motion/react").then(res => res.domAnimation);

const AboutMePage = lazy(() => import("./components/AboutMePage"));
const AllProjectsPage = lazy(() => import("./components/AllProjectsPage"));
const ProjectPage = lazy(() => import("./components/ProjectPage"));

// Lazy load sections
const MaxReedPortfolio = lazy(() => import("./components/MaxReedPortfolio"));
const MyProjects = lazy(() => import("./components/MyProjects"));
const MyServices = lazy(() => import("./components/MyServices"));
const EngineTechFooter = lazy(() => import("./components/EngineTechFooter"));
const CtaFooter = lazy(() => import("./components/CtaFooter"));

function ProjectPageWrapper() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [projectInfo, setProjectInfo] = useState<any>(null);

  useEffect(() => {
    if (!projectId) return;
    const loadProject = async () => {
      try {
        const projectDataRaw = (await import("./data/project_pages.json")).default;
        if (projectDataRaw[projectId as keyof typeof projectDataRaw]) {
          setProjectInfo(projectDataRaw[projectId as keyof typeof projectDataRaw]);
        } else {
          navigate("/");
        }
      } catch (e) {
        console.error("Failed to load project:", e);
        navigate("/");
      }
    };
    loadProject();
  }, [projectId, navigate]);

  if (!projectId) return null;

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#171717]" />}>
      {projectInfo ? (
        <ProjectPage 
          key={projectId}
          id={projectId} 
          projectInfo={projectInfo} 
          onBack={() => navigate("/")} 
        />
      ) : (
        <div className="min-h-screen bg-[#171717]" />
      )}
    </Suspense>
  );
}

function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [isIPhone, setIsIPhone] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && (location.state as any).scrollTo) {
      const targetId = (location.state as any).scrollTo;
      navigate(location.pathname, { replace: true, state: {} });
      
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    } else {
      const params = new URLSearchParams(location.search);
      const scrollTarget = params.get("scroll");
      if (scrollTarget) {
        setTimeout(() => {
          const el = document.getElementById(scrollTarget);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 150);
      }
    }
  }, [location, navigate]);

  useEffect(() => {
    setIsMobileDevice(window.innerWidth < 768 || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent));
    setIsIPhone(/iPhone|iPad|iPod/i.test(navigator.userAgent));
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

  const scrollToProjects = useCallback(() => {
    const el = document.getElementById("my-projects-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const scrollToServices = useCallback(() => {
    const el = document.getElementById("services");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <LazyMotion features={loadFeatures}>
      <div className="relative w-full h-auto bg-[#171717]" id="app-root-container">
        {/* Mobile Menu Overlay */}
        <AnimatePresence mode="wait">
          {isMobileMenuOpen && (
            <m.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="fixed inset-0 z-[100] bg-[#111111]/98 backdrop-blur-lg flex flex-col justify-between p-8"
              id="mobile-nav-panel"
            >
            {/* Header inside mobile menu */}
            <div className="flex items-center justify-between w-full">
              <span className="brand !text-[15px] uppercase tracking-wider text-white">Vadim Semenov</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 -mr-2 bg-transparent border-none text-white/80 hover:text-white cursor-pointer"
                type="button"
                aria-label="Закрыть меню"
                id="close-mobile-menu-btn"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            {/* Navigation Links centered */}
            <div className="flex flex-col gap-6 my-auto text-center" id="mobile-menu-links">
              <a
                href="/about"
                className="text-2xl font-bold tracking-widest text-white/90 hover:text-white transition-colors uppercase py-2"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  navigate("/about");
                }}
                id="mobile-link-about"
              >
                Обо мне
              </a>
              <a
                href="#projects"
                className="text-2xl font-bold tracking-widest text-white/90 hover:text-white transition-colors uppercase py-2"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  scrollToProjects();
                }}
                id="mobile-link-projects"
              >
                Кейсы
              </a>
              <a
                href="#services"
                className="text-2xl font-bold tracking-widest text-white/90 hover:text-white transition-colors uppercase py-2"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  scrollToServices();
                }}
                id="mobile-link-services"
              >
                Услуги
              </a>
            </div>

            {/* Footer info inside menu (Social and quick contact button) */}
            <div className="flex flex-col items-center gap-6 w-full pb-6" id="mobile-menu-footer">
              <div className="flex items-center gap-4" id="mobile-menu-socials">
                <a href="https://vk.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors" aria-label="VK" id="mobile-social-vk">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.684 0H8.31675C1.59375 0 0 1.59375 0 8.31675V15.684C0 22.407 1.59375 24.0007 8.31675 24.0007H15.684C22.407 24.0007 24.0007 22.407 24.0007 15.684V8.31675C24.0007 1.59375 22.3912 0 15.684 0ZM19.3755 17.121H17.6332C16.9732 17.121 16.77 16.5975 15.5827 15.3945C14.5515 14.3947 14.0947 14.262 13.8405 14.262C13.4812 14.262 13.3792 14.3633 13.3792 14.856V16.4303C13.3792 16.8525 13.2465 17.106 12.129 17.106C10.281 17.106 8.2305 15.9885 6.79275 13.9065C4.6245 10.8555 4.03125 8.57025 4.03125 8.09775C4.03125 7.8435 4.1325 7.60575 4.62075 7.60575H6.36675C6.8085 7.60575 6.9765 7.809 7.14825 8.2815C8.0115 10.7738 9.44925 12.957 10.0425 12.957C10.2615 12.957 10.3628 12.8558 10.3628 12.297V9.723C10.296 8.53575 9.67125 8.43375 9.67125 8.01225C9.67125 7.809 9.83925 7.60575 10.1085 7.60575H12.8542C13.2255 7.60575 13.362 7.809 13.362 8.24625V11.7188C13.362 12.0938 13.53 12.2265 13.6312 12.2265C13.8502 12.2265 14.0377 12.0938 14.4435 11.6873C15.6975 10.281 16.596 8.11275 16.596 8.11275C16.713 7.8585 16.9163 7.62075 17.358 7.62075H19.104C19.6275 7.62075 19.7445 7.89 19.6275 8.265C19.4085 9.2805 17.2717 12.2963 17.2717 12.2963C17.088 12.6007 17.0175 12.7335 17.2717 13.0732C17.4592 13.3275 18.069 13.8548 18.4748 14.3273C19.221 15.1748 19.7948 15.8857 19.9478 16.3778C20.1195 16.866 19.866 17.1203 19.3732 17.1203 L19.3755 17.121 Z" fill="#0076FE"/>
                  </svg>
                </a>
                <a href="https://t.me/username" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors" aria-label="Telegram" id="mobile-social-tg">
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
                className="w-full max-w-[280px] h-12 bg-[#0066cc] hover:bg-[#005bb5] rounded-full font-bold text-sm tracking-wide text-white uppercase flex items-center justify-center gap-2 cursor-pointer"
                type="button"
                id="mobile-menu-action-btn"
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
              id="site-header-sticky"
            >
              <a className="brand !text-[14px] xs:!text-[17px] md:!text-[22px] cursor-pointer" href="#" aria-label="Vadim Semenov" id="brand-link-sticky" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                Vadim Semenov
              </a>

              <nav className="navigation hidden md:flex items-center gap-6" aria-label="Основная навигация" id="site-navigation-sticky">
                <a href="/about" id="nav-about-sticky" onClick={(e) => { e.preventDefault(); navigate("/about"); }}>Обо мне</a>
                <a href="/projects" id="nav-projects-sticky" onClick={(e) => { e.preventDefault(); navigate("/projects"); }}>Кейсы</a>
                <a href="#services" id="nav-services-sticky" onClick={(e) => { e.preventDefault(); scrollToServices(); }}>Услуги</a>
              </nav>

              <div className="flex items-center gap-3" id="header-actions-sticky">
                <div className="hidden md:flex items-center gap-3" id="sticky-socials-desktop">
                  <a className="social-button shrink-0" href="https://vk.com" target="_blank" rel="noopener noreferrer" aria-label="VK" id="social-vk-sticky">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.073 2H8.938C3.332 2 2 3.333 2 8.927V15.063C2 20.667 3.323 22 8.927 22H15.063C20.667 22 22 20.677 22 15.073V8.938C22 3.332 20.677 2 15.073 2ZM18.146 16.27H16.687C16.135 16.27 15.969 15.823 14.979 14.833C14.115 14 13.75 13.896 13.531 13.896C13.229 13.896 13.146 13.979 13.146 14.396V15.708C13.146 16.063 13.031 16.271 12.104 16.271C11.2045 16.2099 10.3323 15.9363 9.5591 15.4727C8.78588 15.0091 8.13366 14.3686 7.656 13.604C6.52235 12.1945 5.73403 10.5394 5.354 8.771C5.354 8.552 5.437 8.354 5.854 8.354H7.313C7.688 8.354 7.823 8.521 7.969 8.906C8.677 10.99 9.885 12.802 10.375 12.802C10.563 12.802 10.645 12.719 10.645 12.25V10.104C10.583 9.125 10.063 9.042 10.063 8.688C10.0697 8.59463 10.1125 8.50753 10.1823 8.44518C10.2521 8.38283 10.3435 8.35012 10.437 8.354H12.729C13.042 8.354 13.146 8.51 13.146 8.885V11.781C13.146 12.094 13.281 12.198 13.375 12.198C13.563 12.198 13.708 12.094 14.052 11.75C14.7909 10.8489 15.3945 9.84507 15.844 8.77C15.8902 8.64105 15.9772 8.53068 16.0918 8.45562C16.2064 8.38055 16.3423 8.34488 16.479 8.354H17.938C18.375 8.354 18.468 8.573 18.375 8.885C17.8445 10.0734 17.1881 11.2016 16.417 12.25C16.26 12.49 16.197 12.615 16.417 12.896C16.562 13.115 17.073 13.542 17.417 13.948C17.9167 14.4468 18.3318 15.0237 18.646 15.656C18.771 16.062 18.562 16.27 18.146 16.27Z" fill="#0077FF"/>
                    </svg>
                  </a>
                  <a className="social-button shrink-0" href="https://t.me/username" target="_blank" rel="noopener noreferrer" aria-label="Telegram" id="social-tg-sticky">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0C5.376 0 0 5.376 0 12C0 18.624 5.376 24 12 24C18.624 24 24 18.624 24 12C24 5.376 18.624 0 12 0ZM17.568 8.16C17.388 10.056 16.608 14.664 16.212 16.788C16.044 17.688 15.708 17.988 15.396 18.024C14.7 18.084 14.172 17.568 13.5 17.124C12.444 16.428 11.844 15.996 10.824 15.324C9.636 14.544 10.404 14.112 11.088 13.416C11.268 13.236 14.34 10.44 14.4 10.188C14.4083 10.1498 14.4072 10.1102 14.3968 10.0726C14.3863 10.0349 14.3668 10.0004 14.34 9.972C14.268 9.912 14.172 9.936 14.088 9.948C13.98 9.972 12.3 11.088 9.024 13.296C8.544 13.62 8.112 13.788 7.728 13.776C7.296 13.764 6.48 13.536 5.868 13.332C5.112 13.092 4.524 12.96 4.572 12.54C4.596 12.324 4.896 12.108 5.46 11.88C8.964 10.356 11.292 9.348 12.456 8.868C15.792 7.476 16.476 7.236 16.932 7.236C17.028 7.236 17.256 7.26 17.4 7.38C17.52 7.476 17.556 7.608 17.568 7.704C17.556 7.776 17.58 7.992 17.568 8.16Z" fill="#0E84BF"/>
                    </svg>
                  </a>
                </div>
                <button
                  onClick={() => {
                    navigate("/about?scroll=contact");
                  }}
                  className="collab-button !h-10 !px-4 !text-xs !font-bold inline-flex cursor-pointer"
                  id="collab-btn-sticky"
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
                  id="open-mobile-menu-sticky"
                >
                  <Menu className="w-7 h-7" />
                </button>
              </div>
            </m.header>
          )}
        </AnimatePresence>

        {/* SECTION 1: Vadim Semenov (Hero Screen) */}
        <main className="hero" aria-label="Vadim Semenov portfolio hero" id="portfolio-hero">
          <div className="hero__background select-none pointer-events-auto">
            <video 
              className="w-full h-full object-cover pointer-events-none relative z-10" 
              autoPlay 
              muted 
              loop 
              playsInline 
              aria-hidden="true" 
              id="hero-bg-video" 
              disablePictureInPicture
              disableRemotePlayback
              controlsList="nodownload nofullscreen noremoteplayback"
              tabIndex={-1}
              poster="https://res.cloudinary.com/dasip9jjs/video/upload/f_auto,q_auto,so_0/v1781713491/hero-background_s7zboc.jpg"
              {...{ fetchPriority: "high" }}
            >
              <source src="https://res.cloudinary.com/dasip9jjs/video/upload/f_mp4,vc_h265/v1781713491/hero-background_s7zboc.mp4" type="video/mp4; codecs=hevc" />
              <source src="https://res.cloudinary.com/dasip9jjs/video/upload/f_webm,vc_vp9/v1781713491/hero-background_s7zboc.webm" type="video/webm; codecs=vp9" />
            </video>
            <div className="video-blocker-overlay z-30" />
          </div>
          <p className="hero__name-shadow" aria-hidden="true" id="name-shadow">Вадим</p>
          <h1 className="hero__title" id="page-title">
            <span className="sr-only">ДИЗАЙН ВЛИЯНИЯ</span>
            
            {/* Mobile view: 2 lines, each taking 100% of content width with natural spacing */}
            <span className="md:hidden flex flex-col gap-1 w-full whitespace-normal" aria-hidden="true">
              <svg className="w-full h-auto overflow-visible select-none" viewBox="0 0 360 100" style={{ display: 'block' }}>
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
                  ДИЗАЙН
                </text>
              </svg>
              <svg className="w-full h-auto overflow-visible select-none" viewBox="0 0 420 100" style={{ display: 'block' }}>
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
                  ВЛИЯНИЯ
                </text>
              </svg>
            </span>

            {/* Desktop view: 1 line, taking 100% of content width with natural spacing */}
            <span className="hidden md:block w-full" aria-hidden="true">
              <svg className="w-full h-auto overflow-visible select-none" viewBox="0 0 840 100" style={{ display: 'block' }}>
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
                  ДИЗАЙН ВЛИЯНИЯ
                </text>
              </svg>
            </span>
          </h1>
          <video
            className="hero__portrait object-cover pointer-events-none"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            id="hero-portrait"
            disablePictureInPicture
            disableRemotePlayback
            controlsList="nodownload nofullscreen noremoteplayback"
            tabIndex={-1}
            poster="https://res.cloudinary.com/dasip9jjs/image/upload/f_auto,q_auto/v1782557176/videoframe_0_1_ysrtxg.png"
            {...({ fetchPriority: "high" } as any)}
          >
            <source src="https://res.cloudinary.com/dasip9jjs/video/upload/q_auto/v1782647286/Timeline_1_1_yz0gim.mov" type="video/quicktime" />
            <source src="https://res.cloudinary.com/dasip9jjs/video/upload/f_webm,vc_vp9,q_auto/v1782553355/0621_1_1_u2b2pk.webm" type="video/webm; codecs=vp9" />
          </video>

          <header className="site-header" id="site-header">
            <a className="brand md:!text-[22px]" href="#" aria-label="Vadim Semenov" id="brand-link">Vadim Semenov</a>

            <nav className="navigation animate-fade-in" aria-label="Основная навигация" id="site-navigation">
              <a href="/about" id="nav-about" onClick={(e) => { e.preventDefault(); navigate("/about"); }}>Обо мне</a>
              <a href="/projects" id="nav-projects" onClick={(e) => { e.preventDefault(); navigate("/projects"); }}>Кейсы</a>
              <a href="#services" id="nav-services" onClick={(e) => { e.preventDefault(); scrollToServices(); }}>Услуги</a>
            </nav>

            <div className="header-actions" id="header-actions-container">
              <div className="flex items-center gap-3" id="standard-socials-desktop">
                <a className="social-button" href="https://vk.com" target="_blank" rel="noopener noreferrer" aria-label="VK" id="social-vk">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.073 2H8.938C3.332 2 2 3.333 2 8.927V15.063C2 20.667 3.323 22 8.927 22H15.063C20.667 22 22 20.677 22 15.073V8.938C22 3.332 20.677 2 15.073 2ZM18.146 16.27H16.687C16.135 16.27 15.969 15.823 14.979 14.833C14.115 14 13.75 13.896 13.531 13.896C13.229 13.896 13.146 13.979 13.146 14.396V15.708C13.146 16.063 13.031 16.271 12.104 16.271C11.2045 16.2099 10.3323 15.9363 9.5591 15.4727C8.78588 15.0091 8.13366 14.3686 7.656 13.604C6.52235 12.1945 5.73403 10.5394 5.354 8.771C5.354 8.552 5.437 8.354 5.854 8.354H7.313C7.688 8.354 7.823 8.521 7.969 8.906C8.677 10.99 9.885 12.802 10.375 12.802C10.563 12.802 10.645 12.719 10.645 12.25V10.104C10.583 9.125 10.063 9.042 10.063 8.688C10.0697 8.59463 10.1125 8.50753 10.1823 8.44518C10.2521 8.38283 10.3435 8.35012 10.437 8.354H12.729C13.042 8.354 13.146 8.51 13.146 8.885V11.781C13.146 12.094 13.281 12.198 13.375 12.198C13.563 12.198 13.708 12.094 14.052 11.75C14.7909 10.8489 15.3945 9.84507 15.844 8.77C15.8902 8.64105 15.9772 8.53068 16.0918 8.45562C16.2064 8.38055 16.3423 8.34488 16.479 8.354H17.938C18.375 8.354 18.468 8.573 18.375 8.885C17.8445 10.0734 17.1881 11.2016 16.417 12.25C16.26 12.49 16.197 12.615 16.417 12.896C16.562 13.115 17.073 13.542 17.417 13.948C17.9167 14.4468 18.3318 15.0237 18.646 15.656C18.771 16.062 18.562 16.27 18.146 16.27Z" fill="#0077FF"/>
                  </svg>
                </a>
                <a className="social-button" href="https://t.me/username" target="_blank" rel="noopener noreferrer" aria-label="Telegram" id="social-tg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C5.376 0 0 5.376 0 12C0 18.624 5.376 24 12 24C18.624 24 24 18.624 24 12C24 5.376 18.624 0 12 0ZM17.568 8.16C17.388 10.056 16.608 14.664 16.212 16.788C16.044 17.688 15.708 17.988 15.396 18.024C14.7 18.084 14.172 17.568 13.5 17.124C12.444 16.428 11.844 15.996 10.824 15.324C9.636 14.544 10.404 14.112 11.088 13.416C11.268 13.236 14.34 10.44 14.4 10.188C14.4083 10.1498 14.4072 10.1102 14.3968 10.0726C14.3863 10.0349 14.3668 10.0004 14.34 9.972C14.268 9.912 14.172 9.936 14.088 9.948C13.98 9.972 12.3 11.088 9.024 13.296C8.544 13.62 8.112 13.788 7.728 13.776C7.296 13.764 6.48 13.536 5.868 13.332C5.112 13.092 4.524 12.96 4.572 12.54C4.596 12.324 4.896 12.108 5.46 11.88C8.964 10.356 11.292 9.348 12.456 8.868C15.792 7.476 16.476 7.236 16.932 7.236C17.028 7.236 17.256 7.26 17.4 7.38C17.52 7.476 17.556 7.608 17.568 7.704C17.556 7.776 17.58 7.992 17.568 8.16Z" fill="#0E84BF"/>
                  </svg>
                </a>
              </div>
              <button 
                onClick={() => {
                  navigate("/about?scroll=contact");
                }} 
                className="collab-button cursor-pointer font-medium inline-flex" 
                id="collab-btn"
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
                id="open-mobile-menu"
              >
                <Menu className="w-7 h-7" />
              </button>
            </div>
          </header>

          <div className="hero__content-container">
            <p className="hero__aside" id="hero-aside-text">// Там, где дизайн становится преимуществом</p>

            <div className="hero__intro" id="hero-intro-text">
              <p className="max-w-[450px]">Вадим — веб-дизайнер и контент-дизайнер, разрабатывающий интерфейсы, брендинг и визуальные коммуникации для бизнеса.</p>

              {/* Scroll Down Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button 
                  type="button"
                  onClick={scrollToProjects}
                  className="collab-button"
                  id="scroll-to-projects-btn"
                >
                  <span>СМОТРЕТЬ МОИ ПРОЕКТЫ</span>
                  <ChevronDown className="w-5 h-5 text-current" />
                </button>
              </div>
            </div>
          </div>
        </main>

        <Suspense fallback={<div className="h-96 bg-[#171717]" />}>
          {/* SECTION 2: Max Reed (Detailed Bento Features grid) */}
          <MaxReedPortfolio />

          {/* SECTION 3: My Projects grid (from local Database JSON) */}
          <MyProjects />

          {/* SECTION 4: Services list accordion with premium interactive animation */}
          <MyServices />

          {/* SECTION 5: Cinematic Liquid Glass CTA Section */}
          <CtaFooter />

          {/* SECTION 6: Aerospace EngineTech Corporate Site Footer */}
          <EngineTechFooter />
        </Suspense>
      </div>
    </LazyMotion>
  );
}

export default function App() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={
        <LazyMotion features={loadFeatures}>
          <Suspense fallback={<div className="min-h-screen bg-[#171717]" />}>
            <AboutMePage onBack={() => navigate("/")} />
          </Suspense>
        </LazyMotion>
      } />
      <Route path="/projects" element={
        <LazyMotion features={loadFeatures}>
          <Suspense fallback={<div className="min-h-screen bg-[#171717]" />}>
            <AllProjectsPage onBack={() => navigate("/")} />
          </Suspense>
        </LazyMotion>
      } />
      <Route path="/project/:projectId" element={
        <LazyMotion features={loadFeatures}>
          <ProjectPageWrapper />
        </LazyMotion>
      } />
    </Routes>
  );
}
