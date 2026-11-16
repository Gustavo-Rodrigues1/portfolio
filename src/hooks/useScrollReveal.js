import { useState, useEffect, useRef } from 'react';

/**
 * Hook para detectar entrada e saída no viewport com reconhecimento
 * da direção de rolagem (subindo ou descendo).
 *
 * @param {Object} options
 * @param {number} options.threshold - Percentual do elemento visível para disparar (padrão: 0.12)
 * @param {string} options.rootMargin - Margem de detecção do viewport (padrão: '-30px 0px -30px 0px')
 * @param {boolean} options.reAnimate - Se deve re-animar ao subir e descer (padrão: true)
 * @param {boolean} options.initialVisible - Visibilidade inicial (para elementos no topo/Hero)
 */
export const useScrollReveal = ({
  threshold = 0.12,
  rootMargin = '-30px 0px -30px 0px',
  reAnimate = true,
  initialVisible = false,
} = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(() => {
    if (initialVisible) return true;
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return true;
    }
    return false;
  });
  const [scrollDirection, setScrollDirection] = useState('down');
  const [exitSide, setExitSide] = useState('bottom'); // 'top' (passou direto para baixo) ou 'bottom' (subiu além dele)
  const lastScrollY = useRef(0);

  // Monitora a direção do scroll
  useEffect(() => {
    lastScrollY.current = window.scrollY || window.pageYOffset || 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY || window.pageYOffset || 0;
      const diff = currentScrollY - lastScrollY.current;

      if (Math.abs(diff) > 3) {
        setScrollDirection(diff > 0 ? 'down' : 'up');
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Observador de interseção com o viewport
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Determina por qual lado o elemento saiu do viewport
          const rect = entry.boundingClientRect;
          if (rect.bottom < 0 || rect.top < 0) {
            setExitSide('top'); // O elemento saiu por cima (usuário desceu além dele)
          } else {
            setExitSide('bottom'); // O elemento saiu por baixo (usuário subiu antes dele)
          }

          if (reAnimate) {
            setIsVisible(false);
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, reAnimate]);

  return { ref, isVisible, scrollDirection, exitSide };
};

