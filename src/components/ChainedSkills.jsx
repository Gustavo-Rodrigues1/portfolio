import React, { useRef, useEffect, useState, useCallback } from 'react';
import { OfficialToolLogo } from './SkillInsignia';

/**
 * ChainedSkills — 16 correntes mecânicas independentes refinadas.
 *
 * Correções desta versão:
 * 1. Fade superior restaurado com precisão: camada de correntes isolada com
 *    gradiente vertical suave, fazendo as correntes surgirem do escuro do topo.
 * 2. Corrigido bug de elo "entrando e saindo do símbolo":
 *    - O comprimento da corrente agora termina estritamente no topo da medalha (len - MEDAL_R - 3px).
 *    - O número de elos (n) é fixo e pré-calculado por corrente, impedindo que elos
 *      sejam criados/destruídos ou pisquem/invadam o medalhão durante o balanço.
 *    - Adicionada pequena argola de suspensão no topo de cada medalha para fixação mecânica perfeita.
 * 3. As medalhas e tooltips ficam em camada 100% livre de máscaras, eliminando qualquer corte lateral.
 */

const GRAVITY    = 1600;
const DAMPING    = 0.015;
const MEDAL_R    = 19;
const HOVER_DIST = 60;
const HOVER_IMP  = 0.07;
const DRAG_LERP  = 0.38;
const PITCH      = 10.5; // Espaçamento fino e delicado dos elos

const tools = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'python',     name: 'Python' },
  { id: 'django',     name: 'Django' },
  { id: 'react',      name: 'React.js' },
  { id: 'tailwind',   name: 'Tailwind CSS' },
  { id: 'htmlcss',    name: 'HTML5 & CSS3' },
  { id: 'sql',        name: 'SQL & PostgreSQL' },
  { id: 'git',        name: 'Git' },
  { id: 'github',     name: 'GitHub' },
  { id: 'docker',     name: 'Docker' },
  { id: 'powerbi',    name: 'Power BI' },
  { id: 'excel',      name: 'Microsoft Excel' },
  { id: 'figma',      name: 'Figma' },
  { id: 'suporte',    name: 'Suporte de TI & Hardware' },
  { id: 'redes',      name: 'Redes & Infraestrutura' },
];

const LENGTHS = [
  165, // JavaScript
  235, // TypeScript
  115, // Python
  205, // Django
  150, // React.js
  260, // Tailwind CSS
  105, // HTML5 & CSS3
  195, // PostgreSQL
  135, // Git
  225, // GitHub
  110, // Docker
  180, // Power BI
  215, // MS Excel
  130, // Figma
  250, // Suporte TI
  145, // Redes
];

export const ChainedSkills = () => {
  const uid          = React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const containerRef = useRef(null);
  const pendulaRef   = useRef([]);
  const mouseRef     = useRef({ x: -9999, y: -9999 });
  const dragRef      = useRef(null);
  const rafRef       = useRef(null);
  const dtRef        = useRef(null);

  const [tick, setTick]         = useState(0);
  const [hoveredId, setHovered] = useState(null);
  const [isGrabbing, setGrab]   = useState(false);
  const [cw, setCw]             = useState(768);
  const [ch, setCh]             = useState(330);

  // ── Inicialização & ResizeObserver ─────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const initOrUpdate = () => {
      const w = el.offsetWidth || 768;
      setCw(w);
      const margin = 28;
      const availableW = Math.max(100, w - margin * 2);

      if (pendulaRef.current.length === 0) {
        pendulaRef.current = tools.map((tool, i) => {
          const len = LENGTHS[i % LENGTHS.length];
          const chainSpan = len - (MEDAL_R + 3);
          // Número fixo de elos para evitar flickering durante oscilação
          const nLinks = Math.max(2, Math.round(chainSpan / PITCH));
          const ax = margin + (availableW * i) / (tools.length - 1);
          return {
            tool,
            ax,
            ay: 0,
            len,
            chainSpan,
            nLinks,
            ang: (Math.random() - 0.5) * 0.12,
            vel: (Math.random() - 0.5) * 0.02,
            grabbed: false,
          };
        });
      } else {
        pendulaRef.current.forEach((p, i) => {
          p.ax = margin + (availableW * i) / (tools.length - 1);
        });
      }

      const maxLen = Math.max(...LENGTHS);
      setCh(maxLen + MEDAL_R * 2 + 45);
      setTick(t => t + 1);
    };

    initOrUpdate();

    const ro = new ResizeObserver(() => {
      initOrUpdate();
    });
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  // ── Loop de Física Suave ───────────────────────────────
  useEffect(() => {
    const step = (ts) => {
      if (!dtRef.current) { dtRef.current = ts; rafRef.current = requestAnimationFrame(step); return; }
      const dt = Math.min((ts - dtRef.current) / 1000, 0.04);
      dtRef.current = ts;
      const { x: mx, y: my } = mouseRef.current;

      pendulaRef.current.forEach((p) => {
        if (p.grabbed) return;
        const acc = -(GRAVITY / p.len) * Math.sin(p.ang);
        p.vel = (p.vel + acc * dt) * (1 - DAMPING);
        p.ang += p.vel * dt;
        p.ang = Math.max(-0.68, Math.min(0.68, p.ang));

        if (dragRef.current === null) {
          const sx = p.ax + p.len * Math.sin(p.ang);
          const sy = p.ay + p.len * Math.cos(p.ang);
          const d  = Math.hypot(sx - mx, sy - my);
          if (d < HOVER_DIST) {
            const push = (mx < sx ? 1 : -1) * HOVER_IMP * (1 - d / HOVER_DIST);
            p.vel += push * dt * 8;
          }
        }
      });

      const di = dragRef.current;
      if (di !== null && pendulaRef.current[di]) {
        const p      = pendulaRef.current[di];
        const target = Math.atan2(mx - p.ax, my - p.ay);
        const clampedTarget = Math.max(-0.72, Math.min(0.72, target));
        const prev   = p.ang;
        p.ang += (clampedTarget - prev) * DRAG_LERP;
        p.vel  = (p.ang - prev) / (dt || 0.016) * 0.25;
      }

      setTick(t => t + 1);
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // ── Helpers ───────────────────────────────────────────
  const getXY = useCallback((e) => {
    const r = containerRef.current?.getBoundingClientRect();
    return r ? { x: e.clientX - r.left, y: e.clientY - r.top } : { x: 0, y: 0 };
  }, []);

  const tipOf = (p) => ({
    x: p.ax + p.len * Math.sin(p.ang),
    y: p.ay + p.len * Math.cos(p.ang),
  });

  const onMove = useCallback((e) => {
    const { x, y } = getXY(e);
    mouseRef.current = { x, y };
    let found = null;
    pendulaRef.current.forEach(p => {
      const { x: sx, y: sy } = tipOf(p);
      if (Math.hypot(sx - x, sy - y) < MEDAL_R + 8) found = p.tool.id;
    });
    setHovered(found);
  }, [getXY]);

  const onDown = useCallback((e) => {
    const { x, y } = getXY(e);
    pendulaRef.current.forEach((p, i) => {
      const { x: sx, y: sy } = tipOf(p);
      if (Math.hypot(sx - x, sy - y) < MEDAL_R + 12) {
        dragRef.current = i;
        p.grabbed = true;
        setGrab(true);
        e.preventDefault();
      }
    });
  }, [getXY]);

  const onUp = useCallback(() => {
    if (dragRef.current !== null) {
      pendulaRef.current[dragRef.current].grabbed = false;
      dragRef.current = null;
    }
    setGrab(false);
  }, []);

  // ── Render dos elos (termina estritamente na borda da medalha) ──
  const buildLinks = (p) => {
    // Ponto final da corrente: ancorado no topo da medalha (fora do corpo do símbolo)
    const attachDist = p.len - (MEDAL_R + 2);
    const endX = p.ax + attachDist * Math.sin(p.ang);
    const endY = p.ay + attachDist * Math.cos(p.ang);

    const dx = endX - p.ax;
    const dy = endY - p.ay;
    const ang = Math.atan2(dy, dx) * 180 / Math.PI - 90;
    const n = p.nLinks || Math.max(2, Math.round(attachDist / PITCH));
    const out = [];

    for (let j = 0; j < n; j++) {
      const t  = (j + 0.5) / n;
      const lx = p.ax + dx * t;
      const ly = p.ay + dy * t;

      if (j % 2 === 0) {
        // Elo frontal fino
        out.push(
          <g key={j} transform={`translate(${lx},${ly}) rotate(${ang})`}>
            <path
              d="M 0 -7.2 C 4.6 -7.2, 8.2 -4.2, 8.2 0 C 8.2 4.2, 4.6 7.2, 0 7.2
                 C -4.6 7.2, -8.2 4.2, -8.2 0 C -8.2 -4.2, -4.6 -7.2, 0 -7.2 Z
                 M 0 -3.4 C 2.4 -3.4, 4.2 -1.8, 4.2 0 C 4.2 1.8, 2.4 3.4, 0 3.4
                 C -2.4 3.4, -4.2 1.8, -4.2 0 C -4.2 -1.8, -2.4 -3.4, 0 -3.4 Z"
              fill={`url(#${uid}gm)`} stroke="#3a250b" strokeWidth="0.6" fillRule="evenodd"
            />
            <path d="M -6.4 -0.8 C -6.4 -4, -3.2 -6.2, 0 -6.2"
              fill="none" stroke="#fffae0" strokeWidth="0.5" opacity="0.6" strokeLinecap="round" />
          </g>
        );
      } else {
        // Elo lateral fino
        out.push(
          <g key={j} transform={`translate(${lx},${ly}) rotate(${ang})`} filter={`url(#${uid}fs)`}>
            <rect x="-2.8" y="-6.8" width="5.6" height="13.6" rx="2.8" ry="2.8"
              fill={`url(#${uid}gs)`} stroke="#1a1004" strokeWidth="0.65" />
            <line x1="0" y1="-5.2" x2="0" y2="5.2"
              stroke="#fff8d6" strokeWidth="0.55" opacity="0.8" />
          </g>
        );
      }
    }
    return out;
  };

  const pends = pendulaRef.current;

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none overflow-visible"
      style={{
        height: ch,
        cursor: isGrabbing ? 'grabbing' : (hoveredId ? 'grab' : 'default'),
      }}
      onMouseMove={onMove}
      onMouseDown={onDown}
      onMouseUp={onUp}
      onMouseLeave={() => { mouseRef.current = { x: -9999, y: -9999 }; setHovered(null); onUp(); }}
    >
      {/* ═════════════════════════════════════════════════════════════════
          CAMADA 1: CORRENTES DE FUNDO COM FADE-IN SUPERIOR
          A máscara CSS fica estritamente nesta div isolada.
          Faz as correntes surgirem gradualmente do topo sem afetar nada lateral.
         ═════════════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-x-[-120px] top-0 bottom-0 pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 30px, black 85px)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 30px, black 85px)',
        }}
      >
        <svg className="w-full h-full overflow-visible" aria-hidden="true">
          <defs>
            <linearGradient id={`${uid}gm`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#30200e" />
              <stop offset="25%"  stopColor="#7a5a22" />
              <stop offset="48%"  stopColor="#f2cb68" />
              <stop offset="70%"  stopColor="#9e7425" />
              <stop offset="100%" stopColor="#241708" />
            </linearGradient>
            <linearGradient id={`${uid}gs`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#241606" />
              <stop offset="25%"  stopColor="#85611f" />
              <stop offset="50%"  stopColor="#ffde7d" />
              <stop offset="75%"  stopColor="#a37626" />
              <stop offset="100%" stopColor="#1a0f03" />
            </linearGradient>
            <filter id={`${uid}fs`} x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="1.2" stdDeviation="0.9" floodColor="#000000" floodOpacity="0.95" />
            </filter>
          </defs>

          {/* Elos com opacidade de background (desenha dentro da div com margem estendida) */}
          <g opacity="0.30" transform="translate(120, 0)">
            {pends.map((p, i) => (
              <g key={`ch_${i}`}>{buildLinks(p)}</g>
            ))}
          </g>
        </svg>
      </div>

      {/* ═════════════════════════════════════════════════════════════════
          CAMADA 2: MEDALHAS METÁLICAS COM ARGOLA DE ENCAIXE
          100% livres de máscara, corte ou interferência visual.
         ═════════════════════════════════════════════════════════════════ */}
      <svg className="absolute inset-0 w-full overflow-visible pointer-events-none" style={{ height: ch }} aria-hidden="true">
        <defs>
          <radialGradient id={`${uid}gmd`} cx="35%" cy="32%" r="68%">
            <stop offset="0%"   stopColor="#2e1f0e" />
            <stop offset="60%"  stopColor="#15100a" />
            <stop offset="100%" stopColor="#07040200" />
          </radialGradient>
          <filter id={`${uid}fg`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {pends.map((p, i) => {
          const { x: sx, y: sy } = tipOf(p);
          const isHov  = hoveredId === p.tool.id;
          const isGrab = p.grabbed;

          // Argola de suspensão no topo da medalha (conecta o medalhão ao último elo)
          const ringDist = MEDAL_R + 2.5;
          const rx = sx - ringDist * Math.sin(p.ang);
          const ry = sy - ringDist * Math.cos(p.ang);
          const angDeg = p.ang * 180 / Math.PI;

          return (
            <g key={`md_${i}`}>
              {/* Argola de latão mecânica */}
              <g transform={`translate(${rx}, ${ry}) rotate(${-angDeg})`}>
                <ellipse cx="0" cy="0" rx="3.5" ry="4.5" fill="none" stroke="#d4a853" strokeWidth="1.2" />
                <ellipse cx="0" cy="0" rx="1.8" ry="2.6" fill="#0f0a06" />
              </g>

              {/* Aro externo reforçado */}
              <circle cx={sx} cy={sy} r={MEDAL_R + 4.5}
                fill="#1c1208"
                stroke={isGrab ? '#fbbf24' : isHov ? '#f6d995' : '#c49b40'}
                strokeWidth={isGrab ? 2.2 : isHov ? 1.8 : 1.4}
              />
              {/* Disco interno */}
              <circle cx={sx} cy={sy} r={MEDAL_R}
                fill={`url(#${uid}gmd)`} stroke="#6b4c16" strokeWidth="0.75" />
              {/* Friso técnico tracejado */}
              <circle cx={sx} cy={sy} r={MEDAL_R - 4.5}
                fill="none" stroke="#d4a85328" strokeWidth="0.9" strokeDasharray="2 3" />
              {/* Ponto especular */}
              <circle cx={sx - 5} cy={sy - 5} r={3.5} fill="white" opacity="0.065" />
              {/* Glow térmico no hover */}
              {isHov && (
                <circle cx={sx} cy={sy} r={MEDAL_R + 5.5}
                  fill="none" stroke="#fbbf24" strokeWidth="1.4" opacity="0.5"
                  filter={`url(#${uid}fg)`} />
              )}
            </g>
          );
        })}
      </svg>

      {/* ═════════════════════════════════════════════════════════════════
          CAMADA 3: ÍCONES OFICIAIS & TOOLTIPS
          Posicionados de forma inteligente para nunca vazar das laterais.
         ═════════════════════════════════════════════════════════════════ */}
      {pends.map((p, i) => {
        const { x: sx, y: sy } = tipOf(p);
        const isHov  = hoveredId === p.tool.id;
        const isGrab = p.grabbed;

        const isRightEdge = p.ax > cw * 0.72;
        const isLeftEdge  = p.ax < cw * 0.28;
        const tooltipTransform = isRightEdge
          ? 'translateX(-85%)'
          : isLeftEdge
          ? 'translateX(-15%)'
          : 'translateX(-50%)';

        return (
          <div
            key={`ic_${i}`}
            className="absolute pointer-events-none flex flex-col items-center"
            style={{ left: sx, top: sy, transform: 'translate(-50%,-50%)', zIndex: isHov ? 40 : 20 }}
          >
            {isHov && (
              <div
                className="absolute bottom-full mb-3 flex flex-col items-center whitespace-nowrap z-50"
                style={{ transform: tooltipTransform }}
              >
                <div className="
                  flex items-center gap-2 px-3 py-1.5 rounded-lg
                  bg-[#1a1008]/95 backdrop-blur-sm
                  border border-amber-400/60
                  shadow-[0_0_18px_rgba(255,157,46,0.5),0_4px_14px_rgba(0,0,0,0.7)]
                ">
                  <div className="drop-shadow-[0_0_6px_rgba(255,180,60,0.9)]">
                    <OfficialToolLogo id={p.tool.id} className="w-4 h-4" />
                  </div>
                  <span className="font-schematic text-xs font-semibold text-amber-200 tracking-wide">
                    {p.tool.name}
                  </span>
                </div>
                <div className="w-px h-2.5 bg-gradient-to-b from-amber-400/60 to-transparent" />
              </div>
            )}
            <div className={`
              flex items-center justify-center rounded-full transition-transform duration-150
              ${isHov  ? 'scale-120 drop-shadow-[0_0_10px_rgba(255,180,60,0.9)]' : ''}
              ${isGrab ? 'scale-110 drop-shadow-[0_0_14px_rgba(251,191,36,0.85)]' : ''}
            `}>
              <OfficialToolLogo
                id={p.tool.id}
                className={`transition-all duration-150 ${isHov || isGrab ? 'w-[22px] h-[22px]' : 'w-4 h-4'}`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
