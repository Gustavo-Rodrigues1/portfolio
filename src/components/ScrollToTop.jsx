import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const heroEl = document.getElementById('hero');
          if (heroEl) {
            // Torna visível assim que descer da seção início
            const heroThreshold = heroEl.offsetTop + heroEl.offsetHeight * 0.6;
            setIsVisible(window.scrollY > heroThreshold);
          } else {
            setIsVisible(window.scrollY > 350);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={`fixed bottom-6 left-6 sm:bottom-8 sm:left-8 z-40 transition-all duration-300 ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
      }`}
    >
      <button
        type="button"
        onClick={scrollToTop}
        title="Voltar ao início"
        aria-label="Voltar à seção de início"
        className="group relative w-12 h-12 sm:w-13 sm:h-13 rounded-full btn-steampunk border border-brass-light/80 hover:border-amber-300 shadow-[0_6px_20px_rgba(0,0,0,0.85)] hover:shadow-[0_0_24px_rgba(255,185,75,0.45)] flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer overflow-hidden select-none"
      >
        {/* Reflexo metálico cintilante no hover */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 overflow-hidden rounded-full">
          <div className="w-[140%] h-[240%] -top-[70%] absolute metallic-sheen-layer animate-metallic-sheen" />
        </div>

        {/* Anel mecânico interno de latão escuro (estilo escotilha steampunk) */}
        <div className="relative z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-brass-dark/70 bg-[#16100a]/90 flex items-center justify-center shadow-inner group-hover:border-amber-400/80 transition-colors duration-300">
          <ArrowUp className="w-5 h-5 text-brass-light group-hover:text-amber-300 group-hover:-translate-y-0.5 transition-all duration-300 drop-shadow-[0_0_8px_rgba(255,190,91,0.6)]" />
        </div>
      </button>
    </div>
  );
};
