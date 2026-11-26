import React, { useState, useEffect } from 'react';

const TERMINAL_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+-/<>[]';

function generateRandomSequence(minLength, maxLength) {
  const length =
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  let result = '';
  for (let i = 0; i < length; i++) {
    result += TERMINAL_CHARS[Math.floor(Math.random() * TERMINAL_CHARS.length)];
  }
  return result;
}

/**
 * TerminalTyping — Efeito contínuo de terminal com cursor underline (_)
 * digitando poucos caracteres/símbolos aleatórios, apagando e recomeçando.
 */
export const TerminalTyping = ({
  minLength = 4,
  maxLength = 6,
  typeSpeed = 120,
  eraseSpeed = 75,
  pauseAfterType = 850,
  pauseAfterErase = 350,
  className = '',
  style = {},
}) => {
  const [target, setTarget] = useState(() =>
    generateRandomSequence(minLength, maxLength)
  );
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState('typing'); // 'typing' | 'pausing' | 'erasing' | 'waiting'

  useEffect(() => {
    let timeoutId;

    if (phase === 'typing') {
      if (displayed.length < target.length) {
        timeoutId = setTimeout(() => {
          setDisplayed(target.slice(0, displayed.length + 1));
        }, typeSpeed);
      } else {
        setPhase('pausing');
      }
    } else if (phase === 'pausing') {
      timeoutId = setTimeout(() => {
        setPhase('erasing');
      }, pauseAfterType);
    } else if (phase === 'erasing') {
      if (displayed.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, eraseSpeed);
      } else {
        setPhase('waiting');
      }
    } else if (phase === 'waiting') {
      timeoutId = setTimeout(() => {
        setTarget(generateRandomSequence(minLength, maxLength));
        setPhase('typing');
      }, pauseAfterErase);
    }

    return () => clearTimeout(timeoutId);
  }, [
    phase,
    displayed,
    target,
    minLength,
    maxLength,
    typeSpeed,
    eraseSpeed,
    pauseAfterType,
    pauseAfterErase,
  ]);

  return (
    <span className={`inline-flex items-center ${className}`} style={style}>
      <span>{displayed}</span>
      <span className="animate-pulse font-black">_</span>
    </span>
  );
};
