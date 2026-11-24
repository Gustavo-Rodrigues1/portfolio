import React, { useState, useRef, useCallback, useEffect } from 'react';

// Conjunto de caracteres mecânicos/termoiônicos/glitch para o efeito de distorção
const GLITCH_GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~§¢µ';

/**
 * GlitchText — Efeito de "bug" / distorção nas letras com duração finita.
 * 
 * Ao passar o mouse, a animação é acionada por um tempo determinado (~650ms),
 * distorcendo os caracteres e aplicando fatias de glitch visual antes de se estabilizar.
 */
export const GlitchText = ({
  text,
  className = '',
  as: Component = 'span',
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);
  const isRunningRef = useRef(false);
  const animFrameRef = useRef(null);
  const lastTimeRef = useRef(0);

  // Sincroniza caso a prop text mude externamente
  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  const triggerGlitch = useCallback(() => {
    // Se a animação temporária já estiver rodando, deixa o ciclo concluir
    if (isRunningRef.current) return;

    isRunningRef.current = true;
    setIsGlitching(true);
    let frame = 0;
    const totalFrames = 18; // ~650ms de distorção antes de estabilizar

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    const animate = (time) => {
      // Amostragem a cada ~36ms para um glitch nítido e estético
      if (time - lastTimeRef.current >= 36) {
        lastTimeRef.current = time;
        frame++;

        const progress = frame / totalFrames;
        const charsSolved = Math.floor(progress * text.length);

        setDisplayText(
          text
            .split('')
            .map((char, i) => {
              if (char === ' ') return ' ';
              if (i < charsSolved) return text[i];
              // 65% de chance de trocar por um caractere de ruído
              if (Math.random() < 0.65) {
                return GLITCH_GLYPHS[Math.floor(Math.random() * GLITCH_GLYPHS.length)];
              }
              return char;
            })
            .join('')
        );
      }

      if (frame < totalFrames) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Conclui o efeito e estabiliza 100% no texto normal
        setDisplayText(text);
        setIsGlitching(false);
        isRunningRef.current = false;
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  }, [text]);

  // Limpeza de animação ao desmontar componente
  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <Component
      onMouseEnter={triggerGlitch}
      data-text={displayText}
      className={`glitch-text-wrapper ${isGlitching ? 'glitch-active' : ''} ${className}`}
    >
      {displayText}
    </Component>
  );
};
