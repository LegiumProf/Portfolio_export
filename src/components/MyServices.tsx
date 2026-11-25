import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sparkle from "lucide-react/dist/esm/icons/sparkle";
import Plus from "lucide-react/dist/esm/icons/plus";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import { m, AnimatePresence } from "motion/react";
import { getOptimizedImageUrl, getOptimizedSrcSet } from "../utils/image";

// Custom SVG Icons
const SiteDesignIcon = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M6.44 2H17.55C21.11 2 22 2.89 22 6.44V12.77C22 16.33 21.11 17.21 17.56 17.21H6.44C2.89 17.22 2 16.33 2 12.78V6.44C2 2.89 2.89 2 6.44 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 17.2197V21.9997" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 13H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.5 22H16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const UIUXIcon = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M13.01 2.92031L18.91 5.54031C20.61 6.29031 20.61 7.53031 18.91 8.28031L13.01 10.9003C12.34 11.2003 11.24 11.2003 10.57 10.9003L4.67002 8.28031C2.97002 7.53031 2.97002 6.29031 4.67002 5.54031L10.57 2.92031C11.24 2.62031 12.34 2.62031 13.01 2.92031Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 11C3 11.84 3.63 12.81 4.4 13.15L11.19 16.17C11.71 16.4 12.3 16.4 12.81 16.17L19.6 13.15C20.37 12.81 21 11.84 21 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 16C3 16.93 3.55 17.77 4.4 18.15L11.19 21.17C11.71 21.4 12.3 21.4 12.81 21.17L19.6 18.15C20.45 17.77 21 16.93 21 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PrototypingIcon = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M7 8H4C2.9 8 2 7.1 2 6V4C2 2.9 2.9 2 4 2H7C8.1 2 9 2.9 9 4V6C9 7.1 8.1 8 7 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20.8 7H17.2C16.54 7 16 6.45999 16 5.79999V4.20001C16 3.54001 16.54 3 17.2 3H20.8C21.46 3 22 3.54001 22 4.20001V5.79999C22 6.45999 21.46 7 20.8 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20.8 14.5H17.2C16.54 14.5 16 13.96 16 13.3V11.7C16 11.04 16.54 10.5 17.2 10.5H20.8C21.46 10.5 22 11.04 22 11.7V13.3C22 13.96 21.46 14.5 20.8 14.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 5H16" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12.5 5V18C12.5 19.1 13.4 20 14.5 20H16" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12.5 12.5H16" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20.8 22H17.2C16.54 22 16 21.46 16 20.8V19.2C16 18.54 16.54 18 17.2 18H20.8C21.46 18 22 18.54 22 19.2V20.8C22 21.46 21.46 22 20.8 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BrandingIcon = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M21.81 3.93988C20.27 7.77988 16.41 12.9999 13.18 15.5899L11.21 17.1699C10.96 17.3499 10.71 17.5099 10.43 17.6199C10.43 17.4399 10.42 17.2399 10.39 17.0499C10.28 16.2099 9.90002 15.4299 9.23002 14.7599C8.55002 14.0799 7.72002 13.6799 6.87002 13.5699C6.67002 13.5599 6.47002 13.5399 6.27002 13.5599C6.38002 13.2499 6.55002 12.9599 6.76002 12.7199L8.32002 10.7499C10.9 7.51988 16.14 3.63988 19.97 2.10988C20.56 1.88988 21.13 2.04988 21.49 2.41988C21.87 2.78988 22.05 3.35988 21.81 3.93988Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.43 17.6198C10.43 18.7198 10.01 19.7698 9.22003 20.5698C8.61003 21.1798 7.78003 21.5998 6.79003 21.7298L4.33003 21.9998C2.99003 22.1498 1.84003 21.0098 2.00003 19.6498L2.27003 17.1898C2.51003 14.9998 4.34003 13.5998 6.28003 13.5598C6.48003 13.5498 6.69003 13.5598 6.88003 13.5698C7.73003 13.6798 8.56003 14.0698 9.24003 14.7598C9.91003 15.4298 10.29 16.2098 10.4 17.0498C10.41 17.2398 10.43 17.4298 10.43 17.6198Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14.24 14.4702C14.24 11.8602 12.12 9.74023 9.51001 9.74023" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ContentDesignIcon = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M13.2601 3.60022 L5.0501 12.2902 C4.7401 12.6202 4.4401 13.2702 4.3801 13.7202 L4.0101 16.9602 C3.8801 18.1302 4.7201 18.9302 5.8801 18.7302 L9.1001 18.1802 C9.5501 18.1002 10.1801 17.7702 10.4901 17.4302 L18.7001 8.74022 C20.1201 7.24022 20.7601 5.53022 18.5501 3.44022 C16.3501 1.37022 14.6801 2.10022 13.2601 3.60022 Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11.8899 5.0498C12.3199 7.8098 14.5599 9.9198 17.3399 10.1998" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 22H21" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DevelopmentIcon = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M9.00002 13C8.34002 13.33 7.79002 13.82 7.38002 14.43C7.15002 14.78 7.15002 15.22 7.38002 15.57C7.79002 16.18 8.34002 16.67 9.00002 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.21 13C15.87 13.33 16.42 13.82 16.83 14.43C17.06 14.78 17.06 15.22 16.83 15.57C16.42 16.18 15.87 16.67 15.21 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.22998 8.01 L21.45 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  description: string;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function MyServices() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [preloadedUrls, setPreloadedUrls] = useState<Record<string, boolean>>({});

  const handlePreload = (url: string) => {
    const optimizedUrl = getOptimizedImageUrl(url, 800);
    if (!preloadedUrls[optimizedUrl]) {
      const img = new Image();
      img.src = optimizedUrl;
      setPreloadedUrls(prev => {
        if (prev[optimizedUrl]) return prev;
        return { ...prev, [optimizedUrl]: true };
      });
    }
  };

  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const preloadFirstFew = () => {
      // Preload first image on idle
      const opt1 = getOptimizedImageUrl("https://res.cloudinary.com/dasip9jjs/image/upload/v1782379966/Service_1_kafcpj.png", 800);
      const img1 = new Image();
      img1.src = opt1;
      setPreloadedUrls(prev => ({ ...prev, [opt1]: true }));
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (typeof window !== "undefined") {
          if ("requestIdleCallback" in window) {
            window.requestIdleCallback(() => preloadFirstFew());
          } else {
            setTimeout(preloadFirstFew, 500);
          }
        }
        observer.disconnect();
      }
    }, { rootMargin: "300px" });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services: ServiceItem[] = [
    {
      id: "site-design",
      title: "Дизайн сайтов и лендингов",
      subtitle: "Создание продающих интерфейсов для веба",
      tags: ["UX/UI", "Web-design", "Figma", "Лендинги", "Аналитика"],
      description: "Профессиональный веб-дизайн сайтов любой сложности: от лаконичных промо-страниц и конверсионных лендингов до крупных корпоративных порталов. Создаю эстетичные, современные и структурированные интерфейсы с упором на конверсию, удобство пользователя и визуальное соответствие вашему бренду.",
      image: "https://res.cloudinary.com/dasip9jjs/image/upload/v1782379966/Service_1_kafcpj.png",
      icon: SiteDesignIcon
    },
    {
      id: "ui-ux-design",
      title: "UI/UX-дизайн интерфейсов",
      subtitle: "Проектирование сложных цифровых продуктов",
      tags: ["Интерфейсы", "iOS & Android", "Дизайн-системы", "Figma", "CJM"],
      description: "Разработка удобных, функциональных и интуитивно понятных интерфейсов для веб-сервисов, CRM-систем, SaaS-платформ и мобильных приложений. Каждый элемент проектируется на основе пользовательских сценариев, что гарантирует высокую вовлеченность, удержание пользователей and решение конкретных бизнес-задач.",
      image: "https://res.cloudinary.com/dasip9jjs/image/upload/v1782379966/Service_2_w5t0tw.png",
      icon: UIUXIcon
    },
    {
      id: "prototyping-ux",
      title: "Прототипирование и проектирование пользовательского опыта",
      subtitle: "Проектирование логики и структуры до начала отрисовки",
      tags: ["Интерактивные прототипы", "CJM", "Тестирование", "Логика продукта", "UX-исследования"],
      description: "Создание подробной архитектуры цифрового продукта, варфреймов и кликабельных прототипов. Прорабатываем и тестируем логику переходов, пользовательские пути и информационную иерархию. Это позволяет на раннем этапе выявить и устранить все барьеры, сэкономив ресурсы при разработке.",
      image: "https://res.cloudinary.com/dasip9jjs/image/upload/v1782379966/Service_3_sxwtlc.png",
      icon: PrototypingIcon
    },
    {
      id: "branding-identity",
      title: "Брендинг и визуальная айдентика",
      subtitle: "Разработка сильного характера вашего бренда",
      tags: ["Фирменный стиль", "Логотипы", "Брендбуки", "Айдентика", "Визуальная стратегия"],
      description: "Комплексная разработка уникального визуального образа компании. Создаю сильные концепции, которые выделяют вас среди конкурентов: от логотипа и цветовой палитры до полиграфии, упаковки, мерча и полноценного руководства по стилю (брендбука). Помогаю вашему бренду говорить на одном визуальном языке со своей аудиторией.",
      image: "https://res.cloudinary.com/dasip9jjs/image/upload/v1782379966/Service_4_rqbuxh.png",
      icon: BrandingIcon
    },
    {
      id: "content-design",
      title: "Контент-дизайн и оформление коммуникаций",
      subtitle: "Оформление вашего бизнеса в digital-среде",
      tags: ["Social Media", "Презентации", "Рекламные креативы", "Маркетинг-кит", "Личный бренд"],
      description: "Профессиональный дизайн медиа-контента для социальных сетей (ВКонтакте, Telegram), рекламных баннеров, продающих презентаций и питч-деков для инвесторов. Помогаю грамотно упаковать сложные данные, смыслы и продукты в простую, понятную и визуально привлекательную форму.",
      image: "https://res.cloudinary.com/dasip9jjs/image/upload/v1782379966/Service_5_ikze6x.png",
      icon: ContentDesignIcon
    },
    {
      id: "coding-development",
      title: "Вёрстка и реализация дизайна",
      subtitle: "Оживление макетов и запуск в сеть",
      tags: ["HTML/CSS/JS", "React & Tailwind", "Адаптивность", "Анимации", "Оптимизация скорости"],
      description: "Качественный перенос дизайн-макетов в идеальный интерактивный код. Проектирую чистую, адаптивную вёрстку с плавными анимациями, быстрой скоростью загрузки и полной кроссбраузерной оптимизацией. Ваш дизайн будет выглядеть безупречно и работать молниеносно на любых современных устройствах.",
      image: "https://res.cloudinary.com/dasip9jjs/image/upload/v1782379966/Service_6_fxlhru.png",
      icon: DevelopmentIcon
    }
  ];

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="bg-[#171717] text-white px-[18px] md:px-[32px] py-16 md:py-24 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-radial-at-t from-[#202020] via-transparent to-transparent opacity-40 pointer-events-none" />

      {/* Header Container */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 md:mb-16 relative z-10" id="services-header-box">
        <m.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <h2 className="text-3xl sm:text-4xl md:text-[46px] font-bold tracking-tight font-sans text-white flex items-center gap-3">
            <span>Услуги</span>
          </h2>
        </m.div>

        <m.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-white/50 text-sm md:text-base max-w-sm md:text-right font-normal leading-relaxed"
        >
          Создаю продуманные решения, которые работают на ваш бизнес — от идеи до запуска
        </m.p>
      </div>

      {/* Accordion Stack Container */}
      <div className="max-w-7xl mx-auto space-y-4 relative z-10" id="services-accordion-stack">
        {services.map((service, index) => {
          const isOpen = openIndex === index;
          const IconComponent = service.icon;

          return (
            <m.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`rounded-[24px] overflow-hidden transition-all duration-300 border border-transparent group hover:border-[#0066cc]/40 ${
                isOpen 
                  ? "bg-[#292929] shadow-2xl" 
                  : "bg-white/[0.04] hover:bg-white/[0.08]"
              }`}
              id={`service-card-${service.id}`}
            >
              {/* Card Title Row Trigger */}
              <button
                onClick={() => toggleIndex(index)}
                onMouseEnter={() => handlePreload(service.image)}
                onFocus={() => handlePreload(service.image)}
                className="w-full text-left px-6 py-6 md:py-8 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#292929] rounded-[24px]"
                type="button"
                aria-expanded={isOpen}
                aria-controls={`service-content-${service.id}`}
                id={`service-trigger-${service.id}`}
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  {/* Service Accent Icon */}
                  <div className={`p-3 rounded-xl transition-all ${
                    isOpen 
                      ? "bg-[#1f1f1f] text-white" 
                      : "bg-white/5 text-white/50"
                  }`}>
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>

                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white transition-colors">
                    {service.title}
                  </h3>
                </div>

                {/* Animated Trigger Button */}
                <div className="relative shrink-0">
                  <m.div
                    animate={{ 
                      rotate: isOpen ? 45 : 0 
                    }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-none cursor-pointer text-white hover:scale-105 active:scale-95 transition-colors duration-200 ${
                      isOpen 
                        ? "bg-[#0066cc]" 
                        : "bg-white/5 group-hover:bg-[#0066cc]"
                    }`}
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </m.div>
                </div>
              </button>

              {/* Collapsible Content Area */}
              <m.div
                id={`service-content-${service.id}`}
                className="overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: isOpen ? "auto" : 0, 
                  opacity: isOpen ? 1 : 0 
                }}
                transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
              >
                <div className="border-t border-white/5 px-6 pb-0 pt-6 md:pt-8" id={`service-expanded-box-${service.id}`}>
                  <div className="flex flex-col lg:flex-row gap-8 items-stretch lg:items-end justify-between pb-0">
                    {/* Details & Tags On the Left */}
                    <div className="flex-1 space-y-6 pb-6 lg:pb-8">
                      {/* Inner Tags row */}
                      <div className="flex flex-wrap gap-2" id={`service-tags-scroll-${service.id}`}>
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-white/5 text-white/80 font-sans text-xs px-3 py-3 rounded-[16px] border-none uppercase tracking-wider text-[10px] font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Prose description text */}
                      <p className="text-white/70 text-sm md:text-base leading-relaxed font-normal">
                        {service.description}
                      </p>

                      {/* Discuss active service trigger button */}
                      <div className="pt-2">
                        <button
                          onClick={() => {
                            navigate("/about?scroll=contact");
                          }}
                          className="group inline-flex items-center gap-2 text-[#3b9eff] hover:text-white font-semibold text-sm transition-colors cursor-pointer"
                          type="button"
                          id={`discuss-service-btn-${service.id}`}
                        >
                          <span>Обсудить задачу</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                        </button>
                      </div>
                    </div>

                    {/* Creative High Quality Mockup On the Right */}
                    <div 
                      className="rounded-t-2xl rounded-b-none overflow-hidden bg-transparent relative w-full lg:w-[515px] lg:h-[280px] aspect-[515/280] mx-auto lg:mx-0 shrink-0 flex items-center justify-center" 
                      id={`service-mockup-${service.id}`}
                    >
                      {isOpen || preloadedUrls[getOptimizedImageUrl(service.image, 800)] ? (
                        <img
                          src={getOptimizedImageUrl(service.image, 800)}
                          srcSet={getOptimizedSrcSet(service.image, [480, 800, 1000])}
                          sizes="(max-width: 1024px) 100vw, 515px"
                          alt={service.title}
                          className="w-full h-full object-contain transition-opacity duration-300"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-white/[0.02] rounded-2xl animate-pulse flex items-center justify-center">
                          <div className="w-8 h-8 border-2 border-white/10 border-t-[#0066cc] rounded-full animate-spin" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </m.div>
            </m.div>
          );
        })}
      </div>
    </section>
  );
}

