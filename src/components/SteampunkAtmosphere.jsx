import React, { useEffect, useRef } from 'react';

/**
 * SteampunkAtmosphere
 * Camada de atmosfera de fundo com:
 * 1. Brasas & Faíscas Incandescentes (Floating Embers) subindo suavemente como em uma fornalha industrial
 * 2. Plumas de Vapor Sutis e Translúcidas (Soft Steam Clouds) flutuando pelo ambiente
 * 
 * - Renderizado em Canvas 2D acelerado por GPU
 * - 100% pointer-events-none (não interfere com cliques ou seleções)
 * - Pausa automaticamente quando a aba fica inativa (economiza bateria e CPU)
 * - Opacidade calibrada para realçar a estética vitoriana sem prejudicar a legibilidade
 */
export const SteampunkAtmosphere = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Respeita acessibilidade de movimento reduzido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animId;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // ==========================================
    // 1. FAÍSCAS / BRASAS INCANDESCENTES (Embers)
    // ==========================================
    const emberCount = Math.min(Math.floor((width * height) / 32000), 38);
    const embers = [];

    const emberColors = [
      { r: 255, g: 218, b: 120 }, // Dourado claro / Latão
      { r: 255, g: 157, b: 46 },  // Âmbar incandescente
      { r: 244, g: 130, b: 50 },  // Cobre aquecido
      { r: 255, g: 240, b: 180 }, // Brilho quase branco
    ];

    const createEmber = (initialY = null) => {
      const color = emberColors[Math.floor(Math.random() * emberColors.length)];
      return {
        x: Math.random() * width,
        y: initialY !== null ? initialY : height + Math.random() * 40,
        radius: Math.random() * 1.5 + 0.6,
        color,
        vy: -(Math.random() * 0.55 + 0.25), // Sobe suavemente
        vxAmplitude: Math.random() * 0.45 + 0.15,
        vxFrequency: Math.random() * 0.02 + 0.008,
        seed: Math.random() * 1000,
        alpha: Math.random() * 0.65 + 0.25,
        baseAlpha: Math.random() * 0.65 + 0.25,
        flickerSpeed: Math.random() * 0.04 + 0.02,
        life: 0,
        maxLife: Math.random() * 600 + 400,
      };
    };

    // Inicializa espalhado pela tela
    for (let i = 0; i < emberCount; i++) {
      embers.push(createEmber(Math.random() * height));
    }

    // ==========================================
    // 2. PLUMAS DE VAPOR TRANSLÚCIDAS (Steam Puffs)
    // ==========================================
    const steamCount = Math.min(Math.max(Math.floor(width / 320), 4), 7);
    const steams = [];

    const createSteamCloud = (initialY = null) => {
      return {
        x: Math.random() * width,
        y: initialY !== null ? initialY : height + Math.random() * 80,
        radius: Math.random() * 35 + 30,
        maxRadius: Math.random() * 90 + 70,
        growth: Math.random() * 0.08 + 0.03,
        vy: -(Math.random() * 0.4 + 0.2), // Subida lenta e quente
        vx: (Math.random() - 0.5) * 0.25,
        alpha: 0,
        maxAlpha: Math.random() * 0.065 + 0.035, // Bem sutil para não poluir
        fadeIn: true,
        fadeSpeed: 0.0008,
      };
    };

    for (let i = 0; i < steamCount; i++) {
      steams.push(createSteamCloud(Math.random() * height));
    }

    // ==========================================
    // LOOP PRINCIPAL DE RENDERIZAÇÃO
    // ==========================================
    let isTabActive = true;

    const handleVisibility = () => {
      isTabActive = !document.hidden;
      if (isTabActive) {
        lastTime = performance.now();
        animId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    let lastTime = performance.now();

    const render = (currentTime) => {
      if (!isTabActive) return;

      const dt = Math.min((currentTime - lastTime) / 16.667, 2.5); // Normalizado para 60 FPS
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      // --- Renderiza Plumas de Vapor ---
      for (let i = 0; i < steams.length; i++) {
        const s = steams[i];

        // Atualiza física
        s.y += s.vy * dt;
        s.x += s.vx * dt;
        if (s.radius < s.maxRadius) {
          s.radius += s.growth * dt;
        }

        // Transição de opacidade
        if (s.fadeIn) {
          s.alpha += s.fadeSpeed * dt * 2.5;
          if (s.alpha >= s.maxAlpha) {
            s.alpha = s.maxAlpha;
            s.fadeIn = false;
          }
        } else {
          s.alpha -= s.fadeSpeed * dt * 0.7;
        }

        // Desenha nuvem de vapor suave com gradiente radial
        if (s.alpha > 0.002) {
          const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius);
          grad.addColorStop(0, `rgba(235, 220, 200, ${s.alpha * 1.2})`);
          grad.addColorStop(0.45, `rgba(200, 180, 160, ${s.alpha * 0.65})`);
          grad.addColorStop(0.85, `rgba(160, 140, 120, ${s.alpha * 0.2})`);
          grad.addColorStop(1, 'rgba(120, 100, 80, 0)');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Reinicia pluma quando sai do topo ou apaga
        if (s.y < -s.maxRadius || s.alpha <= 0) {
          steams[i] = createSteamCloud();
        }
      }

      // --- Renderiza Faíscas / Brasas ---
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];

        e.life += dt;
        e.y += e.vy * dt;
        e.x += Math.sin((e.life + e.seed) * e.vxFrequency) * e.vxAmplitude * dt;

        // Cintilação suave
        const flicker = Math.sin(e.life * e.flickerSpeed + e.seed) * 0.25;
        const currentAlpha = Math.max(0, Math.min(1, e.baseAlpha + flicker));

        // Desenha brasa com halo incandescente
        const { r, g, b } = e.color;

        // Ponto central brilhante
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
        ctx.fill();

        // Halo suave ao redor da partícula
        if (e.radius > 1) {
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentAlpha * 0.22})`;
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.radius * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Reinicia brasa ao ultrapassar o topo da tela ou expirar
        if (e.y < -15 || e.life > e.maxLife) {
          embers[i] = createEmber();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[1] opacity-90"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

