import React from 'react';

/**
 * Cartola Steampunk fiel ao modelo original:
 * Feltro escuro, faixa vermelha, óculos duplos de latão com engrenagem decorativa.
 *
 * Arquitetura de Movimento:
 * - Wrapper externo: ancorado na posição exata sobre a letra G.
 * - Elemento interno: livre para executar o salto acrobático contínuo e suave no ar.
 * - Suporta onAnimationEnd para transição perfeita de estados sem sumiço.
 */
export const SteampunkTopHat = ({
  className = '',
  style = {},
  onClick,
  onAnimationEnd,
}) => (
  <div
    className="absolute pointer-events-none"
    style={{
      bottom: '68%',
      left: '-0.04em',
      width: '0.9em',
      height: 'auto',
      zIndex: 20,
      transform: 'rotate(-10deg)',
      transformOrigin: 'bottom center',
    }}
    aria-hidden="true"
  >
    <button
      type="button"
      onClick={onClick}
      onAnimationEnd={onAnimationEnd}
      title="Clique na cartola para vê-la dar um salto mortal no ar!"
      className={`pointer-events-auto cursor-pointer block w-full h-full bg-transparent border-none p-0 outline-none select-none ${className}`}
      style={{
        transformOrigin: '50% 60%',
        ...style,
      }}
      aria-label="Cartola Steampunk Interativa"
    >
      <svg
        viewBox="0 0 140 95"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_8px_28px_rgba(0,0,0,0.95)] hover:drop-shadow-[0_12px_32px_rgba(255,157,46,0.6)] transition-shadow duration-300"
      >
        <defs>
          <linearGradient id="hat-crown" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#141618" />
            <stop offset="10%" stopColor="#22272a" />
            <stop offset="48%" stopColor="#2c3135" />
            <stop offset="88%" stopColor="#22272a" />
            <stop offset="100%" stopColor="#141618" />
          </linearGradient>
          <linearGradient id="hat-brim" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2c3135" />
            <stop offset="100%" stopColor="#161819" />
          </linearGradient>
          <radialGradient id="hat-gl" cx="32%" cy="32%" r="62%">
            <stop offset="0%" stopColor="#d4eef8" stopOpacity="0.80" />
            <stop offset="45%" stopColor="#7ab4cc" stopOpacity="0.60" />
            <stop offset="100%" stopColor="#1a4a5e" stopOpacity="0.88" />
          </radialGradient>
          <radialGradient id="hat-gr" cx="32%" cy="32%" r="62%">
            <stop offset="0%" stopColor="#c8e8f4" stopOpacity="0.72" />
            <stop offset="45%" stopColor="#68a8c0" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#16404e" stopOpacity="0.88" />
          </radialGradient>
        </defs>

        <ellipse cx="70" cy="81" rx="66" ry="7" fill="#060708" opacity="0.55" />
        <ellipse cx="70" cy="78" rx="66" ry="8" fill="#161819" />
        <ellipse cx="70" cy="73" rx="66" ry="8" fill="url(#hat-brim)" stroke="#0e1012" strokeWidth="0.8" />
        <path d="M 4 73 Q 2 68 8 64" stroke="#0e1012" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 136 73 Q 138 68 132 64" stroke="#0e1012" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 36 73 L 36 12 Q 36 4 70 4 Q 104 4 104 12 L 104 73 Z" fill="url(#hat-crown)" />
        <ellipse cx="70" cy="9" rx="34" ry="6.5" fill="#2c3135" />
        <ellipse cx="70" cy="8" rx="30" ry="4.5" fill="#343b3f" opacity="0.7" />
        <rect x="36" y="12" width="9" height="61" fill="#060708" opacity="0.30" />
        <rect x="95" y="12" width="9" height="61" fill="#060708" opacity="0.18" />
        <rect x="38" y="14" width="5" height="54" rx="2.5" fill="white" opacity="0.035" />
        <rect x="36" y="57" width="68" height="16" fill="#9a1818" />
        <rect x="36" y="57" width="68" height="6" fill="#cc2828" />
        <rect x="36" y="63" width="68" height="3" fill="#7a0f0f" />
        <rect x="36" y="66" width="68" height="7" fill="#8c1616" />
        <rect x="24" y="61" width="92" height="7" rx="3.5" fill="#4a2e10" opacity="0.92" />
        <rect x="24" y="62" width="92" height="2" rx="1" fill="#6a4218" opacity="0.6" />

        {/* Óculos esquerdo */}
        <circle cx="56" cy="65" r="14" fill="#c8901c" />
        <circle cx="56" cy="65" r="14" fill="none" stroke="#f0c840" strokeWidth="2" />
        <circle cx="56" cy="65" r="11.2" fill="#7e4418" />
        <circle cx="56" cy="65" r="9" fill="#b07818" />
        <circle cx="56" cy="65" r="9" fill="none" stroke="#e8b830" strokeWidth="1.2" />
        <circle cx="56" cy="65" r="7.2" fill="url(#hat-gl)" />
        <ellipse cx="52.5" cy="61.5" rx="2.4" ry="1.4" fill="white" opacity="0.5" transform="rotate(-30 52.5 61.5)" />
        <circle cx="56" cy="52" r="1.7" fill="#f0c840" stroke="#a07018" strokeWidth="0.6" />
        <circle cx="56" cy="78" r="1.7" fill="#f0c840" stroke="#a07018" strokeWidth="0.6" />
        <circle cx="43" cy="65" r="1.7" fill="#f0c840" stroke="#a07018" strokeWidth="0.6" />
        <circle cx="69" cy="65" r="1.7" fill="#f0c840" stroke="#a07018" strokeWidth="0.6" />
        <circle cx="46" cy="72" r="4" fill="#c8901c" stroke="#f0c840" strokeWidth="0.8" />
        <circle cx="46" cy="72" r="2.2" fill="#141618" />

        {/* Óculos direito */}
        <circle cx="86" cy="65" r="12" fill="#b07818" />
        <circle cx="86" cy="65" r="12" fill="none" stroke="#d8a828" strokeWidth="1.8" />
        <circle cx="86" cy="65" r="9.5" fill="#6a3a14" />
        <circle cx="86" cy="65" r="7.6" fill="#9a6810" />
        <circle cx="86" cy="65" r="7.6" fill="none" stroke="#d8a828" strokeWidth="1" />
        <circle cx="86" cy="65" r="6" fill="url(#hh-gr)" />
        <ellipse cx="83" cy="62" rx="2" ry="1.2" fill="white" opacity="0.42" transform="rotate(-30 83 62)" />
        <circle cx="86" cy="54" r="1.4" fill="#d8a828" stroke="#906010" strokeWidth="0.5" />
        <circle cx="86" cy="76" r="1.4" fill="#d8a828" stroke="#906010" strokeWidth="0.5" />
        <circle cx="75" cy="65" r="1.4" fill="#d8a828" stroke="#906010" strokeWidth="0.5" />
        <circle cx="97" cy="65" r="1.4" fill="#d8a828" stroke="#906010" strokeWidth="0.5" />
      </svg>
    </button>
  </div>
);
