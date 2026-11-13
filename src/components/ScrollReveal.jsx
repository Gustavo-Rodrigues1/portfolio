import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

/**
 * Componente ScrollReveal para transições fluidas entre seções
 * ao subir e descer a página (bi-direcional).
 */
export const ScrollReveal = ({
  children,
  className = '',
  style = {},
  variant = 'slide', // 'slide' | 'fade' | 'scale' | 'left' | 'right'
  direction = 'auto', // 'auto' (acompanha scroll) | 'up' | 'down' | 'left' | 'right'
  distance = 32,
  delay = 0,
  duration = 750,
  threshold = 0.12,
  rootMargin = '-30px 0px -30px 0px',
  initialVisible = false,
  reAnimate = true,
  as: Component = 'div',
  ...rest
}) => {
  const { ref, isVisible, exitSide } = useScrollReveal({
    threshold,
    rootMargin,
    initialVisible,
    reAnimate,
  });

  // Determina o deslocamento inicial quando invisível
  const getTransformHidden = () => {
    if (variant === 'fade') {
      return 'none';
    }

    if (variant === 'left') {
      return `translateX(-${distance}px)`;
    }

    if (variant === 'right') {
      return `translateX(${distance}px)`;
    }

    if (variant === 'scale') {
      const yOffset = direction === 'auto'
        ? (exitSide === 'top' ? -Math.round(distance / 2) : Math.round(distance / 2))
        : (direction === 'up' ? -Math.round(distance / 2) : Math.round(distance / 2));
      return `translate3d(0, ${yOffset}px, 0) scale(0.96)`;
    }

    // Padrão: 'slide'
    if (direction === 'auto') {
      // Se saiu por cima, ao retornar desce suavemente (-distance -> 0)
      // Se saiu por baixo, ao retornar sobe suavemente (+distance -> 0)
      const y = exitSide === 'top' ? -distance : distance;
      return `translate3d(0, ${y}px, 0)`;
    }

    if (direction === 'up') return `translate3d(0, -${distance}px, 0)`;
    if (direction === 'down') return `translate3d(0, ${distance}px, 0)`;
    if (direction === 'left') return `translate3d(-${distance}px, 0, 0)`;
    if (direction === 'right') return `translate3d(${distance}px, 0, 0)`;

    return `translate3d(0, ${distance}px, 0)`;
  };

  const currentTransform = isVisible
    ? 'translate3d(0, 0, 0) scale(1)'
    : getTransformHidden();

  const revealStyle = {
    ...style,
    opacity: isVisible ? 1 : 0,
    transform: currentTransform,
    filter: isVisible ? 'blur(0px)' : 'blur(2px)',
    transition: [
      `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      `filter ${duration}ms ease-out ${delay}ms`,
    ].join(', '),
    willChange: isVisible ? 'auto' : 'opacity, transform, filter',
  };

  return (
    <Component
      ref={ref}
      className={className}
      style={revealStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

