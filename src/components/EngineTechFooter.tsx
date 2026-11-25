import React, { useState } from "react";
import Send from "lucide-react/dist/esm/icons/send";
import X from "lucide-react/dist/esm/icons/x";

export default function EngineTechFooter() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-12 mt-4" id="enginetech-site-footer">
      <div className="bg-[#262626] rounded-[24px] px-6 sm:px-8 md:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 shadow-xl relative overflow-hidden" id="footer-main-container">
        {/* Left: Brand/Logo */}
        <div className="text-white text-base sm:text-lg font-bold tracking-tight" id="footer-logo">
          Vadim Semenov
        </div>

        {/* Center: Privacy Policy */}
        <div className="text-center" id="footer-privacy-col">
          <button
            type="button"
            onClick={() => setIsPrivacyOpen(true)}
            className="text-white/50 hover:text-white/80 transition-colors text-xs sm:text-sm font-medium bg-transparent border-none cursor-pointer"
            id="footer-privacy-btn"
          >
            Политика конфиденциальности
          </button>
        </div>

        {/* Right: Social icons styled exactly like the header */}
        <div className="flex items-center gap-3" id="footer-socials">
          {/* VK */}
          <a
            href="https://vk.com/semyonoffvadick"
            target="_blank"
            rel="noopener noreferrer"
            className="social-button !flex shrink-0"
            id="footer-social-vk"
            title="ВКонтакте"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.073 2H8.938C3.332 2 2 3.333 2 8.927V15.063C2 20.667 3.323 22 8.927 22H15.063C20.667 22 22 20.677 22 15.073V8.938C22 3.332 20.677 2 15.073 2ZM18.146 16.27H16.687C16.135 16.27 15.969 15.823 14.979 14.833C14.115 14 13.75 13.896 13.531 13.896C13.229 13.896 13.146 13.979 13.146 14.396V15.708C13.146 16.063 13.031 16.271 12.104 16.271C11.2045 16.2099 10.3323 15.9363 9.5591 15.4727C8.78588 15.0091 8.13366 14.3686 7.656 13.604C6.52235 12.1945 5.73403 10.5394 5.354 8.771C5.354 8.552 5.437 8.354 5.854 8.354H7.313C7.688 8.354 7.823 8.521 7.969 8.906C8.677 10.99 9.885 12.802 10.375 12.802C10.563 12.802 10.645 12.719 10.645 12.25V10.104C10.583 9.125 10.063 9.042 10.063 8.688C10.0697 8.59463 10.1125 8.50753 10.1823 8.44518C10.2521 8.38283 10.3435 8.354H12.729C13.042 8.354 13.146 8.51 13.146 8.885V11.781C13.146 12.094 13.281 12.198 13.375 12.198C13.563 12.198 13.708 12.094 14.052 11.75C14.7909 10.8489 15.3945 9.84507 15.844 8.77C15.8902 8.64105 15.9772 8.53068 16.0918 8.45562C16.2064 8.38055 16.3423 8.34488 16.479 8.354H17.938C18.375 8.354 18.468 8.573 18.375 8.885C17.8445 10.0734 17.1881 11.2016 16.417 12.25C16.26 12.49 16.197 12.615 16.417 12.896C16.562 13.115 17.073 13.542 17.417 13.948C17.9167 14.4468 18.3318 15.0237 18.646 15.656C18.771 16.062 18.562 16.27 18.146 16.27Z" fill="#0077FF"/>
            </svg>
          </a>

          {/* Telegram */}
          <a
            href="https://t.me/LegiumProf"
            target="_blank"
            rel="noopener noreferrer"
            className="social-button !flex shrink-0"
            id="footer-social-tg"
            title="Telegram"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.376 0 0 5.376 0 12C0 18.624 5.376 24 12 24C18.624 24 24 18.624 24 12C24 5.376 18.624 0 12 0ZM17.568 8.16C17.388 10.056 16.608 14.664 16.212 16.788C16.044 17.688 15.708 17.988 15.396 18.024C14.7 18.084 14.172 17.568 13.5 17.124C12.444 16.428 11.844 15.996 10.824 15.324C9.636 14.544 10.404 14.112 11.088 13.416C11.268 13.236 14.34 10.44 14.4 10.188C14.4083 10.1498 14.4072 10.1102 14.3968 10.0726C14.3863 10.0349 14.3668 10.0004 14.34 9.972C14.268 9.912 14.172 9.936 14.088 9.948C13.98 9.972 12.3 11.088 9.024 13.296C8.544 13.62 8.112 13.788 7.728 13.776C7.296 13.764 6.48 13.536 5.868 13.332C5.112 13.092 4.524 12.54 4.596 12.324 4.896 12.108 5.46 11.88C8.964 10.356 11.292 9.348 12.456 8.868C15.792 7.476 16.476 7.236 16.932 7.236C17.028 7.236 17.256 7.26 17.4 7.38C17.52 7.476 17.556 7.608 17.568 7.704C17.556 7.776 17.58 7.992 17.568 8.16Z" fill="#0E84BF"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {isPrivacyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" id="privacy-modal-overlay">
          <div className="bg-[#1f1f1f] border border-white/5 rounded-3xl p-6 md:p-8 max-w-2xl w-full relative max-h-[85vh] overflow-y-auto" id="privacy-modal">
            <button
              type="button"
              onClick={() => setIsPrivacyOpen(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
              id="privacy-close-btn"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-bold text-white mb-4">Политика конфиденциальности</h3>
            <div className="space-y-4 text-sm text-white/70 leading-relaxed font-light">
              <p>
                Ваша конфиденциальность очень важна для нас. Настоящая Политика конфиденциальности объясняет, как собирается, используется и защищается информация при использовании данного портфолио.
              </p>
              <p className="font-semibold text-white mt-4">1. Сбор информации</p>
              <p>
                Этот сайт является статическим портфолио. Мы не собираем персональные данные автоматически, за исключением стандартных логов веб-сервера (IP-адрес, тип браузера, время посещения), которые используются исключительно для технических целей и обеспечения стабильной работы сайта.
              </p>
              <p className="font-semibold text-white mt-4">2. Использование данных</p>
              <p>
                Любая информация, отправленная вами добровольно (например, при переходе по внешним ссылкам для связи в Telegram, VK или по почте), используется исключительно для связи с вами по вашему запросу и не передается третьим лицам.
              </p>
              <p className="font-semibold text-white mt-4">3. Файлы cookie</p>
              <p>
                Сайт может использовать минимальные файлы cookie для сохранения настроек интерфейса (например, состояния просмотра) и оптимизации работы. Вы можете отключить cookie в настройках своего браузера.
              </p>
              <p className="font-semibold text-white mt-4">4. Изменения политики</p>
              <p>
                Мы оставляем за собой право обновлять эту политику в любое время. Изменения вступают в силу с момента их публикации на этой странице.
              </p>
              <p className="text-xs text-white/40 mt-6 pt-4 border-t border-white/5">
                Последнее обновление: Июнь 2026 г.
              </p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
