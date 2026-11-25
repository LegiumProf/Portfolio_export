import React, { useState, useEffect } from "react";
import { getOptimizedVideoUrl } from "../utils/image";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import Sparkle from "lucide-react/dist/esm/icons/sparkle";
import Palette from "lucide-react/dist/esm/icons/palette";
import PenTool from "lucide-react/dist/esm/icons/pen-tool";
import Layers from "lucide-react/dist/esm/icons/layers";
import Type from "lucide-react/dist/esm/icons/type";
import Aperture from "lucide-react/dist/esm/icons/aperture";
import Chrome from "lucide-react/dist/esm/icons/chrome";
import Camera from "lucide-react/dist/esm/icons/camera";
import Brush from "lucide-react/dist/esm/icons/brush";
import Box from "lucide-react/dist/esm/icons/box";
import Wand2 from "lucide-react/dist/esm/icons/wand-2";
import Figma from "lucide-react/dist/esm/icons/figma";
import Framer from "lucide-react/dist/esm/icons/framer";
import Check from "lucide-react/dist/esm/icons/check";
import Copy from "lucide-react/dist/esm/icons/copy";
import Mail from "lucide-react/dist/esm/icons/mail";
import Send from "lucide-react/dist/esm/icons/send";
import X from "lucide-react/dist/esm/icons/x";
import { m, AnimatePresence } from "motion/react";

// Icon mapper helper
const getDevIcon = (name: string) => {
  switch (name) {
    case "Figma": return <Figma className="w-5 h-5 text-white/90" strokeWidth={1.5} />;
    case "Framer": return <Framer className="w-5 h-5 text-white/90" strokeWidth={1.5} />;
    case "Palette": return <Palette className="w-5 h-5 text-white/90" strokeWidth={1.5} />;
    case "PenTool": return <PenTool className="w-5 h-5 text-white/90" strokeWidth={1.5} />;
    case "Layers": return <Layers className="w-5 h-5 text-white/90" strokeWidth={1.5} />;
    case "Type": return <Type className="w-5 h-5 text-white/90" strokeWidth={1.5} />;
    case "Aperture": return <Aperture className="w-5 h-5 text-white/90" strokeWidth={1.5} />;
    case "Chrome": return <Chrome className="w-5 h-5 text-white/90" strokeWidth={1.5} />;
    case "Camera": return <Camera className="w-5 h-5 text-white/90" strokeWidth={1.5} />;
    case "Brush": return <Brush className="w-5 h-5 text-white/90" strokeWidth={1.5} />;
    case "Box": return <Box className="w-5 h-5 text-white/90" strokeWidth={1.5} />;
    case "Wand2": return <Wand2 className="w-5 h-5 text-white/90" strokeWidth={1.5} />;
    default: return <Sparkle className="w-5 h-5 text-white/90" strokeWidth={1.5} />;
  }
};

export default function MaxReedPortfolio() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent));
  }, []);

  // Form State
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setToastMessage(`Скопировано: ${text}`);
    setTimeout(() => {
      setCopiedField(null);
      setToastMessage(null);
    }, 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setShowModal(false);
      setToastMessage("Заявка на проект успешно отправлена!");
      setFormName("");
      setFormEmail("");
      setFormMessage("");
      setTimeout(() => setToastMessage(null), 3000);
    }, 1500);
  };

  // Marquee item arrays
  const row1Icons = ["Figma", "Framer", "Palette", "PenTool", "Layers", "Type", "Aperture", "Chrome"];
  const row2Icons = ["Camera", "Brush", "Box", "Wand2", "Figma", "Framer", "Type", "Layers"];

  return (
    <section 
      id="max-reed-portfolio" 
      className="bg-[#171717] text-white font-sans antialiased relative flex flex-col gap-10 md:gap-12 px-[18px] md:px-[32px] py-12 md:py-16 overflow-x-hidden box-border"
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <m.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-[#161616] border border-white/10 text-white px-5 py-3 rounded-xl flex items-center gap-3 shadow-2xl backdrop-blur-xl"
            id="toast-notification"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-medium tracking-wide">{toastMessage}</span>
          </m.div>
        )}
      </AnimatePresence>

      {/* Header Container */}
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8 lg:mb-6" id="max-header-section">
        <div className="max-w-3xl" id="max-header-text">
          <m.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[28px] sm:text-3xl md:text-4xl lg:text-[44px] leading-[1.15] font-normal tracking-tight text-white mb-4"
            id="max-title"
          >
            Привет, меня зовут Вадим!
          </m.h2>
          <m.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-sm md:text-[15px] leading-[1.6] text-white/60"
            id="max-description"
          >
            Я UX/UI и веб-дизайнер, создаю интерфейсы цифровых продуктов и занимаюсь контент-дизайном — от постов для соцсетей до визуального оформления брендов. Работаю с полным циклом: от идеи и дизайна до вёрстки (HTML, CSS, JavaScript) и запуска готового продукта.
          </m.p>
        </div>

        <m.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="self-start lg:self-center"
          id="max-action-container"
        >
          <button 
            type="button"
            onClick={() => setShowModal(true)}
            className="collab-button group"
            id="max-cta-btn"
          >
            <span>Давайте сотрудничать</span>
          </button>
        </m.div>
      </div>

      {/* Grid Container */}
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-7xl mx-auto w-full" 
        id="max-bento-grid"
      >
        {/* Column 1 - Background card */}
        <m.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-3xl bg-black relative overflow-hidden flex flex-col justify-between pt-6 pb-0 px-0 aspect-[4/5] lg:aspect-auto lg:h-full border-none group transition-all isolate"
          style={{ isolation: "isolate" }}
          id="max-card-background"
        >
          {/* Background video */}
          <div className="absolute inset-0 select-none rounded-3xl overflow-hidden" style={{ isolation: "isolate" }}>
            <video 
              className="absolute inset-0 w-full h-full object-cover opacity-[0.55] mix-blend-screen pointer-events-none transition-transform duration-700 relative z-10 rounded-3xl" 
              autoPlay 
              loop 
              muted 
              playsInline 
              aria-hidden="true"
              id="video-background"
              disablePictureInPicture
              disableRemotePlayback
              controlsList="nodownload nofullscreen noremoteplayback"
              tabIndex={-1}
              poster="https://res.cloudinary.com/dasip9jjs/video/upload/f_auto,q_auto,so_0/v1782550365/0619_1_scrc9e.jpg"
            >
              <source src={getOptimizedVideoUrl("https://res.cloudinary.com/dasip9jjs/video/upload/v1782550365/0619_1_scrc9e.mp4", isMobile)} type="video/mp4" />
            </video>
            <div className="video-blocker-overlay z-30" />
          </div>

          {/* Top Label */}
          <div className="relative z-10 w-full flex justify-center items-center gap-2" id="bg-badge">
            <Sparkle className="h-3 w-3 text-white/70 animate-pulse" strokeWidth={1.5} />
            <span className="uppercase tracking-[0.22em] text-[16px] text-white/70 font-semibold">
              БЭКГРАУНД
            </span>
            <Sparkle className="h-3 w-3 text-white/70 animate-pulse" strokeWidth={1.5} />
          </div>

          {/* Bottom Career Timeline */}
          <div className="relative z-10 w-full bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-8 px-4 pb-4 rounded-b-xl" id="career-timeline-container">
            <h3 className="text-[16px] uppercase tracking-[0.15em] text-white/40 mb-3 font-semibold px-1">Путь в карьере</h3>
            <div className="flex flex-col gap-3.5" id="timeline-list">
              {/* Item 2 */}
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-2.5 text-xs sm:text-sm text-white/90 group/row hover:bg-white/5 p-1 rounded transition-all" id="timeline-row-2">
                <span className="font-mono text-white/50 text-[12px] text-left">2025-2026</span>
                <span className="font-medium text-white text-center px-1">Бренд-дизайнер</span>
                <span className="text-white/40 text-right text-[12px]" title="Создание брендинга, оформление соцсетей, разработка сайта">Лавка24Линия</span>
              </div>
              {/* Item 3 */}
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-2.5 text-xs sm:text-sm text-white/90 group/row hover:bg-white/5 p-1 rounded transition-all" id="timeline-row-3">
                <span className="font-mono text-white/50 text-[12px] text-left">2022-2026</span>
                <span className="font-medium text-white leading-tight text-center px-1">Обучение медиа<br />& веб-дизайну</span>
                <span className="text-white/40 text-right text-[12px]">СПбГУПТД</span>
              </div>
            </div>
          </div>
        </m.div>

        {/* Column 2 - Stacked rows */}
        <div className="grid grid-rows-[auto_1fr] gap-4 md:gap-5 lg:h-full" id="max-column-2">
          {/* Top - Client Voice card */}
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-3xl bg-[#292929] p-5 md:p-6 noise-overlay relative overflow-hidden flex flex-col justify-between border border-white/[0.04] hover:border-white/[0.08] lg:aspect-auto"
            id="max-card-client-voice"
          >
            <div className="relative z-10" id="client-content">
              {/* Top Row */}
              <div className="flex justify-start items-center gap-1.5 mb-5" id="client-badge">
                <Sparkle className="h-3 w-3 text-white/80 animate-pulse" strokeWidth={1.5} />
                <span className="uppercase tracking-[0.2em] text-[14px] text-white/80 font-bold">
                  ОТЗЫВЫ КЛИЕНТОВ
                </span>
                <Sparkle className="h-3 w-3 text-white/80 animate-pulse" strokeWidth={1.5} />
              </div>

              {/* Quote */}
              <p className="text-[13px] sm:text-[13.5px] leading-[1.65] text-white/85 italic mb-6 select-text" id="client-quote">
                «Вадим полностью обновил визуальный образ нашего бренда. Новый стиль помог сделать подачу продукции более привлекательной и заметной для клиентов. Работа была организована чётко и без лишних сложностей, а результат превзошёл наши ожидания».
              </p>
            </div>

            {/* Attribution */}
            <div className="relative z-10 border-t border-white/10 pt-3 flex items-center justify-between" id="client-attribution">
              <p className="text-xs text-white/90">
                <strong className="text-white font-semibold">Кирилл Шахматов</strong>
                <span className="text-white/50">, владелец &mdash; Лавка24Линия</span>
              </p>
            </div>
          </m.div>

          {/* Bottom - 10M+ card */}
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-2xl bg-black relative overflow-hidden p-6 flex flex-col justify-between border-none group transition-all aspect-[4/3] lg:aspect-auto lg:h-full isolate"
            style={{ isolation: "isolate" }}
            id="max-card-metrics"
          >
            {/* Background video */}
            <div className="absolute inset-0 select-none rounded-2xl overflow-hidden" style={{ isolation: "isolate" }}>
              <video 
                className="absolute inset-0 w-full h-full object-cover opacity-[0.45] mix-blend-screen pointer-events-none transition-transform duration-700 relative z-10 rounded-2xl" 
                autoPlay 
                loop 
                muted 
                playsInline 
                aria-hidden="true"
                id="metrics-video"
                disablePictureInPicture
                disableRemotePlayback
                controlsList="nodownload nofullscreen noremoteplayback"
                tabIndex={-1}
                poster="https://res.cloudinary.com/dasip9jjs/video/upload/f_auto,q_auto,so_0/v1782550374/0619_2_urz7ev.jpg"
              >
                <source src={getOptimizedVideoUrl("https://res.cloudinary.com/dasip9jjs/video/upload/v1782550374/0619_2_urz7ev.mp4", isMobile)} type="video/mp4" />
              </video>
              <div className="video-blocker-overlay z-30" />
            </div>

            {/* Empty top slot to push layout downward */}
            <div className="relative z-10 w-full flex justify-between items-center" id="metrics-header-row">
              <span className="uppercase tracking-[0.18em] text-[14px] text-white/40 font-semibold">Индекс показателей</span>
            </div>

            {/* Centered huge text */}
            <div className="relative z-10 text-center my-auto py-2" id="metrics-body">
              <span 
                className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-light tracking-tight text-white select-all block drop-shadow-lg"
                style={{ textShadow: "0 0 30px rgba(255,255,255,0.08)" }}
                id="metric-number"
              >
                15+
              </span>
            </div>

            {/* Bottom Caption */}
            <div className="relative z-10 text-center" id="metrics-caption">
              <p className="text-xs sm:text-sm text-white/85 tracking-wide bg-black/40 py-1.5 px-3 rounded-full inline-block backdrop-blur-sm">
                Завершённых проектов
              </p>
            </div>
          </m.div>
        </div>

        {/* Column 3 - Stacked */}
        <div className="grid grid-rows-[1fr_auto] gap-4 md:gap-5 lg:h-full" id="max-column-3">
          {/* Top - Daily Software card */}
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="rounded-3xl bg-black relative overflow-hidden p-5 md:p-6 flex flex-col justify-between border-none group aspect-[4/3] lg:aspect-auto lg:h-full isolate"
            style={{ isolation: "isolate" }}
            id="max-card-software"
          >
            {/* Background video */}
            <div className="absolute inset-0 select-none rounded-3xl overflow-hidden" style={{ isolation: "isolate" }}>
              <video 
                className="absolute inset-0 w-full h-full object-cover opacity-[0.35] mix-blend-screen pointer-events-none transition-transform duration-700 relative z-10 rounded-3xl" 
                autoPlay 
                loop 
                muted 
                playsInline 
                aria-hidden="true"
                id="software-video-bg"
                disablePictureInPicture
                disableRemotePlayback
                controlsList="nodownload nofullscreen noremoteplayback"
                tabIndex={-1}
                poster="https://res.cloudinary.com/dasip9jjs/video/upload/f_auto,q_auto,so_0/v1782550384/0619_3_w2ykn4.jpg"
              >
                <source src={getOptimizedVideoUrl("https://res.cloudinary.com/dasip9jjs/video/upload/v1782550384/0619_3_w2ykn4.mp4", isMobile)} type="video/mp4" />
              </video>
              <div className="video-blocker-overlay z-30" />
            </div>

            {/* Top Row Label */}
            <div className="relative z-10 w-full flex justify-between items-center mb-6" id="software-header">
              <span className="uppercase tracking-[0.2em] text-[16px] text-white/70 font-semibold">
                ЕЖЕДНЕВНЫЙ СОФТ
              </span>
              <div className="px-[12px] py-[8px] rounded-[12px] bg-white/10 text-[12px] font-mono text-white/80">СТЕК</div>
            </div>

            {/* Marquee rows */}
            <div className="relative z-10 flex flex-col gap-3 py-4 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]" id="software-marquees">
              
              {/* Row 1 - Left direction */}
              <div className="flex gap-3 w-max" id="marquee-r1">
                <div className="flex gap-3 animate-marquee-left">
                  {row1Icons.map((icon, idx) => (
                    <div 
                      key={`r1-orig-${idx}`} 
                      className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-xl liquid-glass flex items-center justify-center transition-all cursor-default group/tile"
                      title={icon}
                    >
                      {getDevIcon(icon)}
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 animate-marquee-left" aria-hidden="true">
                  {row1Icons.map((icon, idx) => (
                    <div 
                      key={`r1-dup-${idx}`} 
                      className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-xl liquid-glass flex items-center justify-center transition-all cursor-default group/tile"
                      title={icon}
                    >
                      {getDevIcon(icon)}
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 2 - Right direction */}
              <div className="flex gap-3 w-max" id="marquee-r2">
                <div className="flex gap-3 animate-marquee-right">
                  {row2Icons.map((icon, idx) => (
                    <div 
                      key={`r2-orig-${idx}`} 
                      className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-xl liquid-glass flex items-center justify-center transition-all cursor-default group/tile"
                      title={icon}
                    >
                      {getDevIcon(icon)}
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 animate-marquee-right" aria-hidden="true">
                  {row2Icons.map((icon, idx) => (
                    <div 
                      key={`r2-dup-${idx}`} 
                      className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-xl liquid-glass flex items-center justify-center transition-all cursor-default group/tile"
                      title={icon}
                    >
                      {getDevIcon(icon)}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="relative z-10 text-left pt-2" id="software-caption">
              <span className="text-[10px] text-white/40 tracking-wider">ДИЗАЙН И РАЗРАБОТКА</span>
            </div>
          </m.div>

          {/* Bottom - Reach Me card */}
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="rounded-3xl bg-[#292929] p-5 md:p-6 noise-overlay relative overflow-hidden flex flex-col justify-between border border-white/[0.04] hover:border-white/[0.08] lg:aspect-auto"
            id="max-card-reach-me"
          >
            {/* Top section with title and button */}
            <div className="relative z-10 flex justify-between items-start mb-6" id="reach-header">
              <div>
                <span className="uppercase tracking-[0.2em] text-[16px] text-white/80 font-bold block mb-1">
                  СВЯЗАТЬСЯ
                </span>
                <span className="text-[12px] text-white/50">Доступен для интересных проектов</span>
              </div>
              
              <button 
                type="button"
                onClick={() => handleCopy("semyonoffvadick@yandex.ru", "email")}
                className="h-9 w-9 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all cursor-pointer active:scale-90"
                title="Скопировать почту в буфер обмена"
                id="btn-copy-arrow"
              >
                <ArrowUpRight className="h-4.5 w-4.5 text-white" strokeWidth={2} />
              </button>
            </div>

            {/* Email and Phone with nice copy items */}
            <div className="relative z-10 flex flex-col gap-3" id="reach-contact-details">
              
              {/* Email */}
              <div 
                onClick={() => handleCopy("semyonoffvadick@yandex.ru", "email")}
                className="group/contact flex items-center justify-between p-2.5 rounded-xl bg-[#343434] hover:bg-[#343434]/80 transition-all cursor-pointer"
                id="contact-email-row"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-white/5 rounded-lg flex items-center justify-center group-hover/contact:bg-white/10 transition-colors">
                    <Mail className="h-4 w-4 text-white/70" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/40 uppercase tracking-widest leading-none mb-0.5">ПОЧТА</span>
                    <span className="text-sm font-mono text-white/90 font-medium group-hover/contact:text-white transition-colors">semyonoffvadick@yandex.ru</span>
                  </div>
                </div>
                <div className="opacity-0 group-hover/contact:opacity-100 transition-opacity pr-1">
                  {copiedField === "email" ? (
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 text-white/40" />
                  )}
                </div>
              </div>

              {/* VK / Telegram items */}
              <a 
                href="https://vk.com/semyonoffvadick" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group/contact flex items-center justify-between p-2.5 rounded-xl bg-[#343434] hover:bg-[#343434]/80 transition-all cursor-pointer no-underline"
                id="contact-vk-row"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-white/5 rounded-lg flex items-center justify-center group-hover/contact:bg-white/10 transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.684 0H8.31675C1.59375 0 0 1.59375 0 8.31675V15.684C0 22.407 1.59375 24.0007 8.31675 24.0007H15.684C22.407 24.0007 24.0007 22.407 24.0007 15.684V8.31675C24.0007 1.59375 22.3912 0 15.684 0ZM19.3755 17.121H17.6332C16.9732 17.121 16.77 16.5975 15.5827 15.3945C14.5515 14.3947 14.0947 14.262 13.8405 14.262C13.4812 14.262 13.3792 14.3633 13.3792 14.856V16.4303C13.3792 16.8525 13.2465 17.106 12.129 17.106C10.281 17.106 8.2305 15.9885 6.79275 13.9065C4.6245 10.8555 4.03125 8.57025 4.03125 8.09775C4.03125 7.8435 4.1325 7.60575 4.62075 7.60575H6.36675C6.8085 7.60575 6.9765 7.809 7.14825 8.2815C8.0115 10.7738 9.44925 12.957 10.0425 12.957C10.2615 12.957 10.3628 12.8558 10.3628 12.297V9.723C10.296 8.53575 9.67125 8.43375 9.67125 8.01225C9.67125 7.809 9.83925 7.60575 10.1085 7.60575H12.8542C13.2255 7.60575 13.362 7.809 13.362 8.24625V11.7188C13.362 12.0938 13.53 12.2265 13.6312 12.2265C13.8502 12.2265 14.0377 12.0938 14.4435 11.6873C15.6975 10.281 16.596 8.11275 16.596 8.11275C16.713 7.8585 16.9163 7.62075 17.358 7.62075H19.104C19.6275 7.62075 19.7445 7.89 19.6275 8.265C19.4085 9.2805 17.2717 12.2963 17.2717 12.2963C17.088 12.6007 17.0175 12.7335 17.2717 13.0732C17.4592 13.3275 18.069 13.8548 18.4748 14.3273C19.221 15.1748 19.7948 15.8857 19.9478 16.3778C20.1195 16.866 19.866 17.1203 19.3732 17.1203 L19.3755 17.121 Z" fill="#0066cc"/>
                    </svg>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-white/40 uppercase tracking-widest leading-none mb-0.5">ВКОНТАКТЕ</span>
                    <span className="text-sm font-mono text-white/90 font-medium group-hover/contact:text-white transition-colors">vk.com/semyonoffvadick</span>
                  </div>
                </div>
                <div className="opacity-0 group-hover/contact:opacity-100 transition-opacity pr-1">
                  <ArrowUpRight className="h-3.5 w-3.5 text-white/40" />
                </div>
              </a>

              <a 
                href="https://t.me/LegiumProf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group/contact flex items-center justify-between p-2.5 rounded-xl bg-[#343434] hover:bg-[#343434]/80 transition-all cursor-pointer no-underline"
                id="contact-tg-row"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-white/5 rounded-lg flex items-center justify-center group-hover/contact:bg-white/10 transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0C5.376 0 0 5.376 0 12C0 18.624 5.376 24 12 24C18.624 24 24 18.624 24 12C24 5.376 18.624 0 12 0ZM17.568 8.16C17.388 10.056 16.608 14.664 16.212 16.788C16.044 17.688 15.708 17.988 15.396 18.024C14.7 18.084 14.172 17.568 13.5 17.124C12.444 16.428 11.844 15.996 10.824 15.324C9.636 14.544 10.404 14.112 11.088 13.416C11.268 13.236 14.34 10.44 14.4 10.188C14.4083 10.1498 14.4072 10.1102 14.3968 10.0726C14.3863 10.0349 14.3668 10.0004 14.34 9.972C14.268 9.912 14.172 9.936 14.088 9.948C13.98 9.972 12.3 11.088 9.024 13.296C8.544 13.62 8.112 13.788 7.728 13.776C7.296 13.776 6.48 13.536 5.868 13.332C5.112 13.092 4.524 12.96 4.572 12.54C4.596 12.324 4.896 12.108 5.46 11.88C8.964 10.356 11.292 9.348 12.456 8.868C15.792 7.476 16.476 7.236 16.932 7.236C17.028 7.236 17.256 7.26 17.4 7.38C17.52 7.476 17.556 7.608 17.568 7.704C17.556 7.776 17.58 7.992 17.568 8.16Z" fill="#0E84BF"/>
                    </svg>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-white/40 uppercase tracking-widest leading-none mb-0.5">TELEGRAM</span>
                    <span className="text-sm font-mono text-white/90 font-medium group-hover/contact:text-white transition-colors">t.me/LegiumProf</span>
                  </div>
                </div>
                <div className="opacity-0 group-hover/contact:opacity-100 transition-opacity pr-1">
                  <ArrowUpRight className="h-3.5 w-3.5 text-white/40" />
                </div>
              </a>

            </div>
          </m.div>
        </div>
      </div>



      {/* Let's Team Up Modal Dialog */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="cta-modal-overlay">
            {/* Backdrop */}
            <m.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <m.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-[#121212] border border-white/10 rounded-2xl p-6 md:p-8 w-full max-w-lg relative z-10 shadow-2xl overflow-hidden noise-overlay"
              id="cta-modal-body"
            >
              {/* Close Button */}
              <button 
                type="button"
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 p-1.5 rounded-full transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkle className="h-4 w-4 text-emerald-400 animate-spin-slow" />
                  <span className="uppercase text-[11px] font-mono tracking-[0.25em] text-emerald-400 font-semibold">СОТРУДНИЧЕСТВО</span>
                </div>
                <h3 className="text-2xl font-normal tracking-tight text-white mb-2">Давайте создадим что-то прекрасное</h3>
                <p className="text-sm text-white/60 mb-6">Расскажите подробнее о вашем проекте, бренде или задачах.</p>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono tracking-wider text-white/50 uppercase mb-1.5">Ваше имя</label>
                    <input 
                      type="text" 
                      required 
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Александр" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono tracking-wider text-white/50 uppercase mb-1.5">Ваш Email</label>
                    <input 
                      type="email" 
                      required 
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="alexander@example.com" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono tracking-wider text-white/50 uppercase mb-1.5">Сообщение / Задача</label>
                    <textarea 
                      rows={3}
                      required 
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="Например, нужен редизайн бренда и запуск нового лендинга..." 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={formSubmitted}
                    className="w-full bg-white text-black hover:bg-white/90 active:scale-[0.98] transition-all py-3.5 px-4 rounded-xl text-sm font-medium tracking-wide flex items-center justify-center gap-2 mt-2 disabled:opacity-50 cursor-pointer"
                  >
                    {formSubmitted ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                        <span>Отправка сообщения...</span>
                      </>
                    ) : (
                      <>
                        <span>Отправить предложение</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
