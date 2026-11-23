import React, { useState, useEffect, useRef } from 'react';
import { SteampunkGear } from './SteampunkGear';
import { profileData } from '../data/profile';

/**
 * SteampunkLoadingScreen — Válvulas Nixie Termoiônicas & Barra de Fluido com Bolhas
 * 
 * Atualizações conforme solicitação:
 * 1. Fileira superior de 7 Válvulas Nixie de vidro brilhando 'L O A D I N G'.
 * 2. Barra de carregamento com cantos curvados (cápsula / rounded-full) e preenchimento
 *    idêntico ao tubo da Navbar: fluido líquido dourado/âmbar sob pressão, reflexo vítreo,
 *    varredura cintilante e bolhas dinâmicas transparentes que viajam da esquerda para a direita.
 * 3. Cabos elétricos curvados pendurados sob a barra.
 * 4. Conjunto mecânico inferior com 5 engrenagens de tamanhos e cores diferentes girando
 *    (latão dourado, cobre, ferro escuro, bronze rústico e aço prateado).
 */
export const SteampunkLoadingScreen = ({ minDuration = 2200, onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Aquecendo cátodos das válvulas...');
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // ── Bolhas dinâmicas no líquido da barra (mesma lógica da Navbar) ──
  const [bubbles, setBubbles] = useState([]);
  const bubbleIdRef = useRef(0);

  const NIXIE_LETTERS = ['L', 'O', 'A', 'D', 'I', 'N', 'G'];

  // Geração contínua de bolhas dentro da coluna de fluido líquido
  useEffect(() => {
    let spawnTimer;

    const spawnBubble = () => {
      const id = ++bubbleIdRef.current;
      const size = 3 + Math.random() * 4;           // 3–7 px
      const topPct = 15 + Math.random() * 60;       // 15–75% da altura da barra
      const duration = 2200 + Math.random() * 2200; // 2.2–4.4 s para cruzar

      setBubbles((prev) => [...prev.slice(-12), { id, size, topPct, duration }]);

      // Remove a bolha após cruzar a extensão
      setTimeout(() => {
        setBubbles((prev) => prev.filter((b) => b.id !== id));
      }, duration + 200);

      spawnTimer = setTimeout(spawnBubble, 300 + Math.random() * 400);
    };

    spawnTimer = setTimeout(spawnBubble, 200);
    return () => clearTimeout(spawnTimer);
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    let animFrame;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / minDuration) * 100));

      setProgress(pct);

      if (pct < 20) {
        setStatusText('Injetando gás neon nas válvulas de vácuo...');
      } else if (pct < 45) {
        setStatusText('Sincronizando transmissão mecânica das engrenagens...');
      } else if (pct < 75) {
        setStatusText('Carregando barramento de dados e componentes...');
      } else if (pct < 95) {
        setStatusText('Pressurizando cilindros e equalizando tensão...');
      } else {
        setStatusText('SISTEMA CONCLUÍDO • INICIANDO INTERFACE');
      }

      if (pct < 100) {
        animFrame = requestAnimationFrame(updateProgress);
      } else {
        // Aguarda carregar fontes e transição suave de saída
        Promise.all([
          document.fonts ? document.fonts.ready : Promise.resolve(),
          new Promise((r) => setTimeout(r, 250)),
        ]).then(() => {
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
              setIsDone(true);
              if (onLoaded) onLoaded();
            }, 650);
          }, 350);
        });
      }
    };

    animFrame = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animFrame);
  }, [minDuration, onLoaded]);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#070605] select-none overflow-hidden transition-all duration-700 ease-out ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      aria-label="Carregando sistema steampunk"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin="0"
      aria-valuemax="100"
    >
      {/* Vinheta e Atmosfera de Oficina Steampunk */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(255, 140, 25, 0.08) 0%, transparent 60%),
            radial-gradient(circle at 50% 10%, rgba(212, 168, 83, 0.05) 0%, transparent 50%),
            linear-gradient(180deg, rgba(12, 10, 8, 0.6) 0%, rgba(6, 5, 4, 0.98) 100%)
          `,
        }}
      />

      {/* Rótulo Superior Estilo Placa de Patente / Fita de Marcação */}
      <div className="absolute top-6 left-6 hidden sm:flex flex-col">
        <span className="font-schematic text-[11px] tracking-widest text-[#d4a853] uppercase font-bold drop-shadow">
          STEAMPUNK LOADING SYSTEM
        </span>
        <span className="font-schematic text-[9px] tracking-wider text-[#7a5e38] uppercase">
          CALIBRAÇÃO TERMOIÔNICA V-1889 • 4K
        </span>
      </div>

      <div className="relative z-10 w-full max-w-xl px-4 flex flex-col items-center">
        
        {/* ══════════════════════════════════════════════════════════════════
            1. VÁLVULAS NIXIE COM AS LETRAS 'L O A D I N G' (NIXIE TUBES)
           ══════════════════════════════════════════════════════════════════ */}
        <div className="flex items-end justify-center gap-1.5 sm:gap-2.5 md:gap-3 mb-1">
          {NIXIE_LETTERS.map((letter, index) => {
            // Cada válvula reage com o progresso
            const letterThreshold = ((index + 1) / NIXIE_LETTERS.length) * 90;
            const isLit = progress >= letterThreshold * 0.35;

            return (
              <div
                key={`nixie_${index}`}
                className="flex flex-col items-center group"
              >
                {/* Bulbo de Vidro da Válvula Nixie */}
                <div
                  className="relative w-8 h-16 sm:w-12 sm:h-24 md:w-14 md:h-28 rounded-t-full bg-gradient-to-b from-[#18130e]/70 via-[#120e0a]/90 to-[#0c0906] border border-[#523d24]/80 overflow-hidden flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,255,255,0.25)]"
                  style={{
                    boxShadow: isLit
                      ? '0 0 25px rgba(255, 130, 20, 0.35), inset 0 0 15px rgba(255, 110, 0, 0.25), 0 8px 24px rgba(0,0,0,0.9)'
                      : '0 4px 12px rgba(0,0,0,0.9)',
                  }}
                >
                  {/* Reflexo de Luz Curvo na Borda Esquerda do Vidro */}
                  <div className="absolute top-2 left-1 bottom-3 w-1 rounded-full bg-gradient-to-b from-white/35 via-white/10 to-transparent pointer-events-none" />

                  {/* Malha Metálica Anódica Interna (Wire Mesh Grid) */}
                  <div
                    className="absolute inset-1.5 sm:inset-2 rounded-t-full opacity-30 pointer-events-none"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(245, 180, 80, 0.25) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(245, 180, 80, 0.25) 1px, transparent 1px)
                      `,
                      backgroundSize: '3px 3px',
                    }}
                  />

                  {/* Filamento Cátodo Incandescente com a Letra em Neon Âmbar */}
                  <span
                    className={`font-schematic text-xl sm:text-3xl md:text-4xl font-bold select-none transition-all duration-300 relative z-10 ${
                      isLit
                        ? 'text-[#ffe8a8] scale-100'
                        : 'text-[#5a3a1f] scale-95 opacity-40'
                    }`}
                    style={{
                      textShadow: isLit
                        ? '0 0 4px #ffffff, 0 0 10px #ffbe5b, 0 0 20px #ff8c00, 0 0 35px #ff4500'
                        : 'none',
                    }}
                  >
                    {letter}
                  </span>

                  {/* Resplendor e Halo de Gás Neon Aquecido */}
                  {isLit && (
                    <div
                      className="absolute inset-0 rounded-t-full pointer-events-none animate-pulse"
                      style={{
                        background: 'radial-gradient(circle at 50% 55%, rgba(255, 140, 20, 0.3) 0%, transparent 70%)',
                        animationDuration: `${1.8 + (index % 3) * 0.4}s`,
                      }}
                    />
                  )}
                </div>

                {/* Base e Soquete de Latão/Ferro da Válvula */}
                <div className="w-9 sm:w-14 md:w-16 h-2 sm:h-3 bg-gradient-to-r from-[#21170d] via-[#5c401f] to-[#1a1209] rounded-t-sm border-t border-x border-[#8f6730]/90 shadow-sm relative flex items-center justify-between px-1">
                  <div className="w-1 h-1 rounded-full bg-[#f1d289] opacity-80" />
                  <div className="w-1 h-1 rounded-full bg-[#f1d289] opacity-80" />
                </div>
              </div>
            );
          })}
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            2. BARRA DE CARREGAMENTO COM CANTOS CURVADOS & LÍQUIDO COM BOLHAS
               (Seguindo a mesma lógica da barra de fluido da Navbar)
           ══════════════════════════════════════════════════════════════════ */}
        <div className="w-full relative">
          
          {/* Container exclusivo da Barra de 20px (onde o vapor se origina exatamente nos 4 cantos) */}
          <div className="relative w-full h-[20px]">
            
            {/* Tubo de vidro com cantos totalmente curvados (rounded-full) e acabamento de latão */}
            <div
              className="w-full h-full relative rounded-full overflow-hidden p-[2px]"
              style={{
                background: 'linear-gradient(180deg, #100b06 0%, #1e140a 50%, #0d0804 100%)',
                border: '1.5px solid rgba(212, 168, 83, 0.85)',
                boxShadow: '0 4px 14px rgba(0,0,0,0.9), inset 0 2px 5px rgba(0,0,0,0.95), 0 0 12px rgba(198,156,77,0.3)',
              }}
            >
              {/* Coluna de fluido líquido brilhante dourado/âmbar com cantos curvados */}
              <div
                className="h-full rounded-full relative overflow-hidden transition-all duration-150 ease-out"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #7c4812 0%, #c88927 25%, #fde28e 55%, #ffa534 85%, #fff2b8 100%)',
                  boxShadow: '0 0 16px rgba(255, 175, 45, 0.95), 0 0 8px rgba(255, 235, 150, 0.8), inset 0 1px 2px rgba(255,255,255,0.7)',
                  willChange: 'width',
                }}
              >
                {/* Reflexo vítreo superior do líquido */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-full"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.18) 45%, transparent 55%, rgba(0,0,0,0.25) 100%)',
                  }}
                />

                {/* Varredura cintilante contínua do líquido */}
                <div
                  className="absolute inset-y-0 w-28 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
                    animation: 'liquid-shimmer-sweep 2.8s ease-in-out infinite',
                  }}
                />

                {/* Bolhas dinâmicas transparentes que percorrem a barra da esquerda para a direita */}
                {bubbles.map((b) => (
                  <div
                    key={b.id}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      width: `${b.size}px`,
                      height: `${b.size}px`,
                      top: `${b.topPct}%`,
                      left: 0,
                      background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.1) 60%, transparent 100%)',
                      border: '0.8px solid rgba(255,255,255,0.45)',
                      boxShadow: '0 0 4px rgba(255,255,255,0.5), inset 0 0 2px rgba(255,255,255,0.3)',
                      animation: `bubble-flow-right ${b.duration}ms linear forwards`,
                    }}
                  />
                ))}
              </div>

              {/* Rebites / Terminais de Latão nas Extremidades da Barra */}
              <div
                className="absolute rounded-full pointer-events-none z-30"
                style={{
                  left: '2px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '6px',
                  height: '6px',
                  background: 'radial-gradient(circle at 35% 35%, #f5d47e, #b88628 60%, #4a3410 100%)',
                  border: '1px solid #d4a74a',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.9)',
                }}
              />
              <div
                className="absolute rounded-full pointer-events-none z-30"
                style={{
                  right: '2px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '6px',
                  height: '6px',
                  background: 'radial-gradient(circle at 35% 35%, #f5d47e, #b88628 60%, #4a3410 100%)',
                  border: '1px solid #d4a74a',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.9)',
                }}
              />

              {/* Divisórias de latão/aço entre cada letra (7 segmentos correspondentes a 'L O A D I N G') */}
              <div className="absolute inset-0 pointer-events-none z-20 flex items-center">
                {[1, 2, 3, 4, 5, 6].map((idx) => {
                  const leftPct = (idx / 7) * 100;
                  return (
                    <div
                      key={`divider_${idx}`}
                      className="absolute top-0 bottom-0 flex flex-col items-center justify-between"
                      style={{
                        left: `${leftPct}%`,
                        transform: 'translateX(-50%)',
                      }}
                    >
                      {/* Rebite superior da divisória */}
                      <div className="w-1.5 h-1.5 rounded-full bg-[#f5d47e] border border-[#4a3410] shadow-sm -mt-0.5" />
                      {/* Barra vertical divisória de latão escovado */}
                      <div
                        className="w-[2.5px] flex-1"
                        style={{
                          background: 'linear-gradient(180deg, #d4a853 0%, #3d2914 45%, #180f08 80%, #d4a853 100%)',
                          boxShadow: '0 0 3px rgba(0,0,0,0.9), 0 0 1px rgba(255,215,120,0.4)',
                        }}
                      />
                      {/* Rebite inferior da divisória */}
                      <div className="w-1.5 h-1.5 rounded-full bg-[#f5d47e] border border-[#4a3410] shadow-sm -mb-0.5" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Cabos Elétricos Curvados Pendurados Embaixo da Barra (como na foto de referência) */}
          <div className="w-full h-8 relative -mt-0.5 pointer-events-none">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 500 36"
              preserveAspectRatio="none"
            >
              <defs>
                <filter id="cable-shadow" x="-5%" y="-10%" width="110%" height="150%">
                  <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.8" />
                </filter>
              </defs>

              {/* Cabo 1: laço amplo na esquerda */}
              <path
                d="M 50,0 C 70,30 140,32 170,0"
                fill="none"
                stroke="#181410"
                strokeWidth="2.8"
                filter="url(#cable-shadow)"
              />
              <path
                d="M 50,0 C 70,30 140,32 170,0"
                fill="none"
                stroke="#33271b"
                strokeWidth="1.6"
              />

              {/* Cabo 2: laço profundo central */}
              <path
                d="M 120,0 C 160,38 240,40 280,0"
                fill="none"
                stroke="#120e0b"
                strokeWidth="2.8"
                filter="url(#cable-shadow)"
              />
              <path
                d="M 120,0 C 160,38 240,40 280,0"
                fill="none"
                stroke="#423120"
                strokeWidth="1.6"
              />

              {/* Cabo 3: laço médio na direita */}
              <path
                d="M 250,0 C 290,28 380,30 420,0"
                fill="none"
                stroke="#181410"
                strokeWidth="2.8"
                filter="url(#cable-shadow)"
              />
              <path
                d="M 250,0 C 290,28 380,30 420,0"
                fill="none"
                stroke="#38291a"
                strokeWidth="1.6"
              />

              {/* Conectores metálicos onde os cabos se fixam */}
              {[50, 120, 170, 250, 280, 420].map((cx, i) => (
                <rect
                  key={`pin_${i}`}
                  x={cx - 2.5}
                  y="0"
                  width="5"
                  height="4"
                  fill="#c69c4d"
                  stroke="#573e1c"
                  strokeWidth="0.8"
                />
              ))}
            </svg>
          </div>

          {/* Pequena Tela CRT de Fósforo Verde Indicadora de Porcentagem (com Jatos de Vapor nas 4 Diagonais) */}
          <div className="relative mt-3 sm:mt-4 mb-2 z-30 flex justify-center">
            <div
              className="relative px-3.5 py-1 sm:px-4.5 sm:py-1 rounded-sm flex items-center border border-[#523d24] shadow-[0_4px_16px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(212,168,83,0.35)]"
              style={{
                background: 'linear-gradient(180deg, #241c14 0%, #15100a 60%, #0d0a06 100%)',
              }}
            >
              {/* Parafusos nos cantos da moldura da tela */}
              <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-[#c69c4d] border border-[#3b2914] shadow-sm" />
              <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#c69c4d] border border-[#3b2914] shadow-sm" />
              <div className="absolute bottom-1 left-1 w-1.5 h-1.5 rounded-full bg-[#c69c4d] border border-[#3b2914] shadow-sm" />
              <div className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-[#c69c4d] border border-[#3b2914] shadow-sm" />

              {/* Visor de Vidro com Fósforo Verde e Linhas de Varredura */}
              <div
                className="relative px-3 py-0.5 rounded-[2px] bg-[#021307] border border-emerald-600/90 overflow-hidden flex items-center gap-2 shadow-[inset_0_0_10px_rgba(34,197,94,0.5),0_0_12px_rgba(34,197,94,0.25)]"
                style={{
                  backgroundImage: 'linear-gradient(rgba(34, 197, 94, 0.12) 1px, transparent 1px)',
                  backgroundSize: '100% 3px',
                }}
              >
                {/* Indicador LED verde pulsante */}
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#22c55e]" />

                {/* Porcentagem em Fósforo Verde Neon */}
                <span
                  className="font-schematic text-sm sm:text-base font-black text-emerald-400 tracking-wider tabular-nums select-none"
                  style={{
                    textShadow: '0 0 2px #bbf7d0, 0 0 8px #22c55e, 0 0 16px rgba(34, 197, 94, 0.95)',
                  }}
                >
                  {progress}%
                </span>

                {/* Reflexo Vítreo Superior do Monitor */}
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
              </div>


            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            3. CONJUNTO DE 5 ENGRENAGENS DE TAMANHOS E CORES DIFERENTES
               "e embaixo da barra coloque a 5 engragenagens de tamanhos e
               coress diferentes girando"
           ══════════════════════════════════════════════════════════════════ */}
        <div className="w-full flex flex-col items-center mt-2 sm:mt-3">
          
          {/* Trem de Engrenagens Interligadas */}
          <div className="relative flex items-center justify-center -space-x-3 sm:-space-x-5 md:-space-x-6 py-2">
            
            {/* Engrenagem 1: LATÃO (Média/Grande - 80px, 12 dentes, Horário) */}
            <div className="relative z-10 transform hover:scale-105 transition-transform">
              <SteampunkGear
                size={80}
                teeth={12}
                color="brass"
                speed="spin-slow"
                className="drop-shadow-[0_8px_20px_rgba(0,0,0,0.9)]"
              />
            </div>

            {/* Engrenagem 2: COBRE (Pequena - 54px, 8 dentes, Anti-horário) */}
            <div className="relative z-20 transform hover:scale-105 transition-transform -mt-2">
              <SteampunkGear
                size={54}
                teeth={8}
                color="copper"
                speed="spin-reverse-slow"
                className="drop-shadow-[0_8px_20px_rgba(0,0,0,0.9)]"
              />
            </div>

            {/* Engrenagem 3: FERRO ESCURO (A Maior - 108px, 16 dentes, Horário) */}
            <div className="relative z-30 transform hover:scale-105 transition-transform">
              <SteampunkGear
                size={108}
                teeth={16}
                color="iron"
                speed="spin-medium"
                className="drop-shadow-[0_10px_25px_rgba(0,0,0,0.95)]"
              />
            </div>

            {/* Engrenagem 4: BRONZE RÚSTICO (A Menor - 46px, 8 dentes, Anti-horário) */}
            <div className="relative z-20 transform hover:scale-105 transition-transform mt-3">
              <SteampunkGear
                size={46}
                teeth={8}
                color="bronze"
                speed="spin-reverse-slow"
                className="drop-shadow-[0_8px_20px_rgba(0,0,0,0.9)]"
              />
            </div>

            {/* Engrenagem 5: AÇO PRATEADO (Média - 72px, 10 dentes, Horário) */}
            <div className="relative z-10 transform hover:scale-105 transition-transform">
              <SteampunkGear
                size={72}
                teeth={10}
                color="silver"
                speed="spin-slow"
                className="drop-shadow-[0_8px_20px_rgba(0,0,0,0.9)]"
              />
            </div>
          </div>

          {/* Telemetria e Diagnóstico Steampunk */}
          <div className="mt-3 flex flex-col items-center text-center">
            {/* Mensagem de Diagnóstico */}
            <p className="font-schematic text-[11px] sm:text-xs text-[#b8a082] italic tracking-wide">
              {statusText}
            </p>

            {/* Assinatura do Titular */}
            <p className="font-cinzel text-[10px] sm:text-[11px] text-[#705533] uppercase tracking-widest mt-2 font-semibold">
              {profileData.personal.name} • UFS
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
