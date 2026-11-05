import React, { useId } from 'react';

/**
 * SteampunkPortholeFrame
 * Moldura industrial de Escotilha Submarina & Astrolábio Vitoriano:
 * - Proporções compactas e calibradas para não colidir com as engrenagens orbitais
 * - Aro de latão chanfrado com acabamento metálico em relevo
 * - 12 parafusos/rebites industriais sextavados
 * - Anel graduado de astrolábio com marcações angulares de 10° em 10°
 * - Vidro cristalino com reflexo óptico curvo convexo
 */
export const SteampunkPortholeFrame = ({
  children,
  className = "",
  sizeClassName = "w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-[295px] lg:h-[295px]",
}) => {
  const rawId = useId();
  const id = rawId.replace(/[^a-zA-Z0-9]/g, '');

  // 12 Parafusos/Rebites em torno do aro (a cada 30 graus no raio R=187)
  const bolts = Array.from({ length: 12 }).map((_, i) => {
    const angleRad = (i * 30 * Math.PI) / 180;
    return {
      x: 200 + 187 * Math.cos(angleRad),
      y: 200 + 187 * Math.sin(angleRad),
      angle: i * 30,
    };
  });

  // 36 Marcações de Astrolábio (a cada 10 graus)
  const astrolabeTicks = Array.from({ length: 36 }).map((_, i) => {
    const deg = i * 10;
    const rad = (deg * Math.PI) / 180;
    const isCardinal = deg % 90 === 0;
    const isMajor = deg % 30 === 0;
    const len = isCardinal ? 7 : isMajor ? 5 : 3;
    const rOuter = 177;
    const rInner = rOuter - len;

    return {
      x1: 200 + rOuter * Math.cos(rad),
      y1: 200 + rOuter * Math.sin(rad),
      x2: 200 + rInner * Math.cos(rad),
      y2: 200 + rInner * Math.sin(rad),
      isCardinal,
      isMajor,
    };
  });

  return (
    <div
      className={`relative flex items-center justify-center ${sizeClassName} ${className} group/porthole`}
    >
      {/* 1. Brilho Térmico / Vapor de Fundo Suave */}
      <div className="absolute inset-[-10%] rounded-full bg-gradient-to-tr from-steamAmber-dim/25 via-brass/15 to-copper/25 blur-xl pointer-events-none group-hover/porthole:from-steamAmber-glow/35 transition-all duration-700" />

      {/* 2. Conteúdo Central (A Foto e o Overlay de Upload) */}
      {/* Abertura óptica de 82% do diâmetro */}
      <div className="relative w-[82%] h-[82%] rounded-full overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.9),0_0_25px_rgba(0,0,0,0.95)] z-10 flex items-center justify-center">
        {children}

        {/* Reflexo de Vidro de Cristal Curvo (Lente Convexa sobre a Foto) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full pointer-events-none z-20 overflow-hidden"
        >
          {/* Brilho diagonal superior suave */}
          <div className="absolute -top-[10%] -left-[10%] w-[80%] h-[50%] rounded-full bg-gradient-to-b from-white/20 via-white/5 to-transparent rotate-[-35deg] pointer-events-none blur-[1px]" />

          {/* Reflexo de borda óptica */}
          <div className="absolute inset-0 rounded-full border border-white/10 shadow-[inset_0_0_12px_rgba(255,220,150,0.15)] pointer-events-none" />
        </div>
      </div>

      {/* 3. MOLDURA DE ESCOTILHA & ASTROLÁBIO EM VETOR SVG */}
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible drop-shadow-[0_8px_20px_rgba(0,0,0,0.95)]"
        aria-hidden="true"
      >
        <defs>
          {/* Gradiente Cônico do Aro Principal de Latão Usinado */}
          <radialGradient id={`ph-brass-rim-${id}`} cx="45%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fff8db" />
            <stop offset="25%" stopColor="#e5ba55" />
            <stop offset="65%" stopColor="#9e7225" />
            <stop offset="90%" stopColor="#54390e" />
            <stop offset="100%" stopColor="#291804" />
          </radialGradient>

          {/* Gradiente da Pista de Graduação do Astrolábio */}
          <radialGradient id={`ph-astrolabe-track-${id}`} cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="#1a120a" />
            <stop offset="85%" stopColor="#2c1d10" />
            <stop offset="100%" stopColor="#140d06" />
          </radialGradient>

          {/* Gradiente dos Parafusos / Rebites Industriais */}
          <radialGradient id={`ph-bolt-${id}`} cx="35%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#ffe7a3" />
            <stop offset="65%" stopColor="#c79430" />
            <stop offset="100%" stopColor="#3d2707" />
          </radialGradient>

          {/* Sombra de Profundidade dos Rebites */}
          <filter id={`ph-shadow-${id}`} x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="1.2" stdDeviation="1.2" floodColor="#000000" floodOpacity="0.9" />
          </filter>
        </defs>

        {/* ══════════════════════════════════════════════════════════ */}
        {/* ARO EXTERNO DE LATÃO / ESCOTILHA (Raio R=178 a R=196)       */}
        {/* ══════════════════════════════════════════════════════════ */}
        {/* Flange externa */}
        <circle
          cx="200"
          cy="200"
          r="196"
          fill="none"
          stroke="#ffe7a3"
          strokeWidth="1"
          opacity="0.8"
        />

        {/* Anel do chanfro metálico */}
        <circle
          cx="200"
          cy="200"
          r="187"
          fill="none"
          stroke={`url(#ph-brass-rim-${id})`}
          strokeWidth="18"
          className="transition-all duration-500 group-hover/porthole:stroke-brass-light"
        />

        {/* Borda dourada interna do aro */}
        <circle
          cx="200"
          cy="200"
          r="178"
          fill="none"
          stroke="#4d340e"
          strokeWidth="1.2"
        />

        {/* ══════════════════════════════════════════════════════════ */}
        {/* ANEL GRADUADO DO ASTROLÁBIO (Raio R=164 a R=178)           */}
        {/* ══════════════════════════════════════════════════════════ */}
        {/* Pista escura de latão oxidado sob as marcações */}
        <circle
          cx="200"
          cy="200"
          r="171"
          fill="none"
          stroke={`url(#ph-astrolabe-track-${id})`}
          strokeWidth="14"
        />

        {/* Borda interna gravada */}
        <circle
          cx="200"
          cy="200"
          r="164"
          fill="none"
          stroke="#f0c660"
          strokeWidth="1"
          opacity="0.75"
        />

        {/* Traços de Graduação Angular do Astrolábio (36 marcações) */}
        <g className="transition-all duration-700">
          {astrolabeTicks.map((tick, i) => (
            <line
              key={i}
              x1={tick.x1}
              y1={tick.y1}
              x2={tick.x2}
              y2={tick.y2}
              stroke={
                tick.isCardinal
                  ? "#ffe596"
                  : tick.isMajor
                  ? "#f0c25a"
                  : "#ab7e2c"
              }
              strokeWidth={tick.isCardinal ? "1.6" : tick.isMajor ? "1.1" : "0.7"}
              strokeLinecap="round"
            />
          ))}
        </g>

        {/* Letras dos 4 Pontos Cardeais (N, S, E, W) */}
        <text x="200" y="171" textAnchor="middle" fill="#ffe596" fontSize="6.5" fontFamily="Cinzel, serif" fontWeight="bold">N</text>
        <text x="200" y="236" textAnchor="middle" fill="#ffe596" fontSize="6.5" fontFamily="Cinzel, serif" fontWeight="bold">S</text>
        <text x="233" y="202.5" textAnchor="middle" fill="#ffe596" fontSize="6.5" fontFamily="Cinzel, serif" fontWeight="bold">E</text>
        <text x="167" y="202.5" textAnchor="middle" fill="#ffe596" fontSize="6.5" fontFamily="Cinzel, serif" fontWeight="bold">W</text>

        {/* ══════════════════════════════════════════════════════════ */}
        {/* 12 PARAFUSOS / REBITES INDUSTRIAIS SEXTAVADOS              */}
        {/* ══════════════════════════════════════════════════════════ */}
        <g filter={`url(#ph-shadow-${id})`}>
          {bolts.map((bolt, i) => (
            <g key={i}>
              {/* Arruela de assentamento de latão escuro */}
              <circle
                cx={bolt.x}
                cy={bolt.y}
                r="4.8"
                fill="#38240b"
                stroke="#1c1104"
                strokeWidth="0.7"
              />
              {/* Cabeça do parafuso usinado */}
              <circle
                cx={bolt.x}
                cy={bolt.y}
                r="3.4"
                fill={`url(#ph-bolt-${id})`}
                stroke="#54370d"
                strokeWidth="0.5"
              />
              {/* Fenda mecânica */}
              <line
                x1={bolt.x - 2}
                y1={bolt.y}
                x2={bolt.x + 2}
                y2={bolt.y}
                stroke="#241606"
                strokeWidth="0.7"
                transform={`rotate(${bolt.angle + 45} ${bolt.x} ${bolt.y})`}
              />
              {/* Ponto de brilho especular */}
              <circle
                cx={bolt.x - 1}
                cy={bolt.y - 1}
                r="0.8"
                fill="#ffffff"
                opacity="0.85"
              />
            </g>
          ))}
        </g>

        {/* Borda final de acabamento do chanfro interno */}
        <circle
          cx="200"
          cy="200"
          r="163"
          fill="none"
          stroke="#170e04"
          strokeWidth="2"
        />
        <circle
          cx="200"
          cy="200"
          r="162"
          fill="none"
          stroke="#ffe7a3"
          strokeWidth="0.8"
          opacity="0.85"
        />
      </svg>
    </div>
  );
};
