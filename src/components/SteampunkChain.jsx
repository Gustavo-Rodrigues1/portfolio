import React, { useId } from 'react';

/**
 * SteampunkChain
 * Corrente mecânica industrial de elos metálicos forjados:
 * - Elos de lado (perfil) desenhados POR CIMA dos elos de frente, dando o efeito de encaixe 3D real
 * - Sombra projetada do elo lateral sobre o elo frontal
 * - Elos ultra-compactos e entrelaçados
 * - 100% pointer-events-none e aceleração por hardware
 */
export const SteampunkChain = ({
  direction = "up", // "up" | "down"
  angle = 0,        // Ângulo em graus (ex: -15, 20, -30)
  speed = "normal", // "normal" | "slow"
  width = 28,       // Largura dos elos em px
  opacity = 0.25,   // Opacidade (ex: 0.15, 0.25, 0.35)
  className = "",
  style = {},
}) => {
  const rawId = useId();
  const id = rawId.replace(/[^a-zA-Z0-9]/g, '');

  const animClass =
    direction === "up"
      ? speed === "slow"
        ? "animate-chain-up-slow"
        : "animate-chain-up"
      : speed === "slow"
      ? "animate-chain-down-slow"
      : "animate-chain-down";

  const patternId = `sp-chain-pattern-${id}`;
  const gradMetalId = `sp-chain-metal-${id}`;
  const gradSideId = `sp-chain-side-${id}`;
  const shadowId = `sp-chain-shadow-${id}`;

  return (
    <div
      aria-hidden="true"
      style={{
        ...style,
        width: `${width}px`,
        transform: `rotate(${angle}deg)`,
        transformOrigin: '50% 50%',
        opacity,
      }}
      className={`absolute top-[-25%] bottom-[-25%] pointer-events-none select-none overflow-hidden z-0 ${className}`}
    >
      {/* Faixa móvel em loop infinito contínuo */}
      <div
        className={`absolute inset-x-0 ${animClass}`}
        style={{
          top: '-28px',
          bottom: '-28px',
          willChange: 'transform',
        }}
      >
        <svg
          className="w-full h-full"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradiente Metálico do Elo Frontal (Aço / Latão de Fundo) */}
            <linearGradient id={gradMetalId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#30200e" />
              <stop offset="25%" stopColor="#7a5a22" />
              <stop offset="48%" stopColor="#f2cb68" />
              <stop offset="70%" stopColor="#9e7425" />
              <stop offset="100%" stopColor="#241708" />
            </linearGradient>

            {/* Gradiente do Elo Lateral (Mais Destaque, Fica por Cima) */}
            <linearGradient id={gradSideId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#241606" />
              <stop offset="25%" stopColor="#85611f" />
              <stop offset="50%" stopColor="#ffde7d" />
              <stop offset="75%" stopColor="#a37626" />
              <stop offset="100%" stopColor="#1a0f03" />
            </linearGradient>

            {/* Sombra projetada do Elo Lateral SOBRE o Elo Frontal (Profundidade 3D) */}
            <filter id={shadowId} x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="1.5" stdDeviation="1.2" floodColor="#000000" floodOpacity="0.95" />
            </filter>

            {/* Padrão do Elo de Metal Ultra-Compacto (Largura: 32px, Altura: 28px) */}
            <pattern
              id={patternId}
              width="32"
              height="28"
              patternUnits="userSpaceOnUse"
            >
              <g>
                {/* ══════════════════════════════════════════════════════ */}
                {/* 1. ELO FRONTAL (Desenhado PRIMEIRO, na camada de trás) */}
                {/* ══════════════════════════════════════════════════════ */}
                <path
                  d="
                    M 16 0
                    C 22.5 0, 27.5 4, 27.5 9.5
                    L 27.5 10.5
                    C 27.5 16, 22.5 20, 16 20
                    C 9.5 20, 4.5 16, 4.5 10.5
                    L 4.5 9.5
                    C 4.5 4, 9.5 0, 16 0 Z
                    M 16 5
                    C 12.5 5, 10 7, 10 9.5
                    L 10 10.5
                    C 10 13, 12.5 15, 16 15
                    C 19.5 15, 22 13, 22 10.5
                    L 22 9.5
                    C 22 7, 19.5 5, 16 5 Z
                  "
                  fill={`url(#${gradMetalId})`}
                  stroke="#3a250b"
                  strokeWidth="0.85"
                  fillRule="evenodd"
                />

                {/* Reflexo chanfrado de luz no elo frontal */}
                <path
                  d="M 7 11 L 7 9.5 C 7 5.5, 11 2, 16 2 C 21 2, 25 5.5, 25 9.5"
                  fill="none"
                  stroke="#fffae0"
                  strokeWidth="0.75"
                  opacity="0.65"
                  strokeLinecap="round"
                />

                {/* ══════════════════════════════════════════════════════════ */}
                {/* 2. ELO LATERAL (Desenhado SEGUNDO, POR CIMA do elo frontal) */}
                {/* Dá a impressão imediata de encaixe e abraçamento 3D        */}
                {/* ══════════════════════════════════════════════════════════ */}
                <g filter={`url(#${shadowId})`}>
                  {/* Elo lateral principal (abraça a parte inferior do elo frontal) */}
                  <rect
                    x="11"
                    y="14"
                    width="10"
                    height="19"
                    rx="5"
                    ry="5"
                    fill={`url(#${gradSideId})`}
                    stroke="#1a1004"
                    strokeWidth="0.9"
                  />

                  {/* Clone para emenda perfeita no topo (abraça a parte superior do elo frontal) */}
                  <rect
                    x="11"
                    y="-14"
                    width="10"
                    height="19"
                    rx="5"
                    ry="5"
                    fill={`url(#${gradSideId})`}
                    stroke="#1a1004"
                    strokeWidth="0.9"
                  />

                  {/* Linha de brilho metálico cilíndrico no topo do elo lateral */}
                  <line
                    x1="16"
                    y1="15"
                    x2="16"
                    y2="28"
                    stroke="#fff8d6"
                    strokeWidth="0.9"
                    opacity="0.85"
                  />
                  <line
                    x1="16"
                    y1="0"
                    x2="16"
                    y2="4"
                    stroke="#fff8d6"
                    strokeWidth="0.9"
                    opacity="0.85"
                  />
                </g>
              </g>
            </pattern>
          </defs>

          {/* Aplicação contínua do padrão */}
          <rect width="100%" height="100%" fill={`url(#${patternId})`} />
        </svg>
      </div>
    </div>
  );
};
