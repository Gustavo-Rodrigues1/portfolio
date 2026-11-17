import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { SteampunkGear } from './SteampunkGear';
import { profileData } from '../data/profile';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Início', href: '#hero', id: 'hero' },
  { name: 'Sobre Mim', href: '#sobre', id: 'sobre' },
  { name: 'Experiência', href: '#experiencia', id: 'experiencia' },
  { name: 'Habilidades', href: '#habilidades', id: 'habilidades' },
  { name: 'Projetos', href: '#projetos', id: 'projetos' },
  { name: 'Contato', href: '#contato', id: 'contato' },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(null);
  const [isSparking, setIsSparking] = useState(false);

  const headerRef = useRef(null);
  const firstLinkRef = useRef(null);
  const lastLinkRef = useRef(null);
  const sparkTimeoutRef = useRef(null);
  const lastScrollYRef = useRef(0);
  const [navBounds, setNavBounds] = useState({ startX: 0, endX: 0 });

  const GEAR_LARGE_SIZE = 38;
  const GEAR_SMALL_SIZE = 22;
  const GEAR_MEDIUM_SIZE = 30;

  const baseAngle = scrollProgress * 1440; // 4 voltas completas ao longo do percurso das seções
  const angleLarge = baseAngle;
  const angleSmall = -baseAngle * (GEAR_LARGE_SIZE / GEAR_SMALL_SIZE); // ~1.73x rotação contrária no meio
  const angleMedium = baseAngle * (GEAR_LARGE_SIZE / GEAR_MEDIUM_SIZE); // ~1.27x rotação sincronizada

  // Calcula a posição horizontal inicial (embaixo de 'Início') e final (embaixo de 'Contato')
  const updateNavBounds = useCallback(() => {
    if (firstLinkRef.current && lastLinkRef.current && headerRef.current) {
      const headerRect = headerRef.current.getBoundingClientRect();
      const firstRect = firstLinkRef.current.getBoundingClientRect();
      const lastRect = lastLinkRef.current.getBoundingClientRect();

      const startX = firstRect.left + firstRect.width / 2 - headerRect.left;
      const endX = lastRect.left + lastRect.width / 2 - headerRect.left;

      if (startX > 0 && endX > startX) {
        setNavBounds({ startX, endX });
      }
    }
  }, []);

  useEffect(() => {
    updateNavBounds();
    const t1 = setTimeout(updateNavBounds, 150);
    const t2 = setTimeout(updateNavBounds, 600);
    window.addEventListener('resize', updateNavBounds);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', updateNavBounds);
    };
  }, [updateNavBounds]);

  // Observador de Rolagem e Transição Ativa das Seções
  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 30);

      // Progresso de rolagem de 0 a 1 em relação à altura total rolável
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
      setScrollProgress(progress);

      // Detecta direção do deslocamento para disparar faíscas de atrito mecânico
      const delta = scrollY - lastScrollYRef.current;
      if (Math.abs(delta) > 0.3) {
        setScrollDirection(delta > 0 ? 'right' : 'left');
        setIsSparking(true);

        if (sparkTimeoutRef.current) {
          clearTimeout(sparkTimeoutRef.current);
        }
        sparkTimeoutRef.current = setTimeout(() => {
          setIsSparking(false);
        }, 280);
      }
      lastScrollYRef.current = scrollY;

      // Detecta qual seção está no campo de visão para transição no menu
      const scrollPos = scrollY + 140; // compensação do cabeçalho
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_LINKS[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(NAV_LINKS[i].id);
            break;
          }
        }
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScroll(); // Executa na montagem inicial

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (sparkTimeoutRef.current) {
        clearTimeout(sparkTimeoutRef.current);
      }
    };
  }, []);

  // Posição X da engrenagem limitada estritamente debaixo das seções
  const currentX = navBounds.startX > 0
    ? navBounds.startX + scrollProgress * (navBounds.endX - navBounds.startX)
    : 0;

  // Transição suave ao clicar nas seções com compensação da altura da Navbar
  const handleNavClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 76;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  // ── Bolhas dinâmicas que percorrem a barra da esquerda para a direita ──
  const [bubbles, setBubbles] = useState([]);
  const bubbleIdRef = useRef(0);
  const bubbleBarWidth = useMemo(
    () => navBounds.endX - navBounds.startX,
    [navBounds.startX, navBounds.endX]
  );

  useEffect(() => {
    if (bubbleBarWidth <= 0) return;

    let spawnTimer;

    const spawnBubble = () => {
      const id = ++bubbleIdRef.current;
      const size = 3 + Math.random() * 4;           // 3–7 px
      const topPct = 15 + Math.random() * 65;       // 15–80% da altura da barra
      const duration = 3500 + Math.random() * 4000; // 3.5–7.5 s para cruzar

      setBubbles(prev => [...prev, { id, size, topPct, duration }]);

      // Remove a bolha depois que ela termina
      setTimeout(() => {
        setBubbles(prev => prev.filter(b => b.id !== id));
      }, duration + 300);

      // Agenda o próximo spawn com intervalo aleatório
      spawnTimer = setTimeout(spawnBubble, 450 + Math.random() * 650);
    };

    spawnTimer = setTimeout(spawnBubble, 300);
    return () => clearTimeout(spawnTimer);
  }, [bubbleBarWidth]);

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 animate-navbar-entrance">
      {/* Corpo principal da Navbar com fundo escuro opaco e borda inferior */}
      <div
        className={`relative z-30 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0f0c0a]/95 backdrop-blur-md border-b-2 border-brass-dark/70 shadow-2xl py-3'
            : 'bg-[#120f0d]/85 backdrop-blur-sm border-b-2 border-brass-dark/50 py-4 sm:py-4.5'
        }`}
      >
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="flex items-center justify-between">

            {/* Logo / Selo Steampunk (Lado Esquerdo) */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, 'hero')}
              className="flex items-center gap-3 group text-decoration-none select-none"
              title="Gustavo Rodrigues dos Santos - Portfólio"
            >
              <div className="relative">
                <SteampunkGear
                  size={38}
                  teeth={8}
                  color="brass"
                  speed="spin-slow"
                  className="group-hover:rotate-45"
                />
                <span className="absolute inset-0 flex items-center justify-center font-cinzel font-bold text-xs text-brass-light pointer-events-none">
                  G
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-cinzel font-bold text-base sm:text-lg tracking-wider text-brass-gradient uppercase">
                  {profileData.personal.name}
                </span>
              </div>
            </a>

            {/* Links de navegação com Transição Suave de Seção Ativa (Lado Direito) */}
            <nav className="hidden md:flex items-center gap-7 lg:gap-9 xl:gap-11">
              {NAV_LINKS.map((link, idx) => {
                const isActive = activeSection === link.id;
                const isFirst = idx === 0;
                const isLast = idx === NAV_LINKS.length - 1;

                return (
                  <a
                    key={link.name}
                    ref={isFirst ? firstLinkRef : isLast ? lastLinkRef : null}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className={`font-body text-sm sm:text-[15px] lg:text-base font-medium transition-all duration-300 relative py-1.5 select-none ${
                      isActive
                        ? 'text-amber-300 drop-shadow-[0_0_12px_rgba(255,190,91,0.7)] font-semibold'
                        : 'text-[#d6c7b2] hover:text-[#fff4d6] hover:drop-shadow-[0_0_8px_rgba(255,190,91,0.4)]'
                    }`}
                  >
                    <span>{link.name}</span>

                    {/* Indicador de Transição Ativa / Hover sob o Link */}
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full transition-all duration-300 pointer-events-none ${
                        isActive
                          ? 'opacity-100 bg-gradient-to-r from-brass-light via-amber-400 to-copper-light shadow-[0_0_10px_rgba(255,190,91,0.85)] scale-x-100'
                          : 'opacity-0 bg-brass-light/60 scale-x-0'
                      }`}
                    />
                  </a>
                );
              })}
            </nav>

            {/* Botão Mobile Menu Hamburger */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Alternar menu de navegação"
                className="btn-steampunk p-2 rounded text-brass-light"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Painel Dropdown Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#14100d] border-b-2 border-brass-dark/80 px-6 py-5 shadow-2xl animate-fadeIn">
            <div className="flex flex-col gap-3.5">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className={`font-body text-base font-medium py-2.5 border-b border-brass-dark/20 flex items-center justify-between transition-colors duration-200 ${
                      isActive
                        ? 'text-amber-300 font-semibold drop-shadow-[0_0_8px_rgba(255,190,91,0.6)]'
                        : 'text-[#d6c7b2] hover:text-brass-light'
                    }`}
                  >
                    <span>{link.name}</span>
                    <span
                      className={`text-sm transition-transform duration-300 ${
                        isActive ? 'text-amber-400 rotate-90 scale-125' : 'text-brass/60'
                      }`}
                    >
                      ⚙
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Mecanismo de engrenagens, barra mecânica e faíscas sob as seções (Início até Contato) */}
      {navBounds.startX > 0 && (
        <div className="hidden md:block absolute inset-x-0 pointer-events-none" style={{ top: '100%' }}>
          {/* 1. Tubo de fluido mecânico / Barra líquida com bolhas e brilho (Camada Z: 10) */}
          <div
            className="absolute"
            style={{
              left: `${navBounds.startX}px`,
              width: `${navBounds.endX - navBounds.startX}px`,
              top: '0',
              zIndex: 10,
            }}
          >
            {/* Tubo de vidro com borda de latão escuro e profundidade vítrea */}
            <div
              className="w-full relative rounded-full overflow-hidden"
              style={{
                height: '7px',
                background: 'linear-gradient(180deg, #100b06 0%, #1e140a 50%, #0d0804 100%)',
                border: '1px solid rgba(212, 168, 83, 0.8)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.9), inset 0 1px 3px rgba(0,0,0,0.95), 0 0 8px rgba(198,156,77,0.25)',
              }}
            >
              {/* Coluna de fluido líquido brilhante dourado/âmbar com bolhas */}
              <div
                className="h-full rounded-full relative overflow-hidden"
                style={{
                  width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%`,
                  background: 'linear-gradient(90deg, #7c4812 0%, #c88927 25%, #fde28e 55%, #ffa534 85%, #fff2b8 100%)',
                  boxShadow: '0 0 14px rgba(255, 175, 45, 0.95), 0 0 6px rgba(255, 235, 150, 0.8), inset 0 1px 2px rgba(255,255,255,0.7)',
                  transition: 'none',
                  willChange: 'width',
                }}
              >
                {/* Reflexo vítreo superior do líquido */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.18) 45%, transparent 55%, rgba(0,0,0,0.25) 100%)',
                  }}
                />

                {/* Varredura cintilante contínua do líquido */}
                <div
                  className="absolute inset-y-0 w-24 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
                    animation: 'liquid-shimmer-sweep 2.8s ease-in-out infinite',
                  }}
                />

                {/* Bolhas dinâmicas transparentes que percorrem a barra da esquerda para direita */}
                {bubbles.map((b) => (
                  <div
                    key={b.id}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      '--bar-width': `${bubbleBarWidth}px`,
                      width: `${b.size}px`,
                      height: `${b.size}px`,
                      top: `${b.topPct}%`,
                      left: 0,
                      background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.08) 60%, transparent 100%)',
                      border: '0.8px solid rgba(255,255,255,0.35)',
                      boxShadow: '0 0 4px rgba(255,255,255,0.4), inset 0 0 2px rgba(255,255,255,0.3)',
                      animation: `bubble-flow-right ${b.duration}ms linear forwards`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Rebites/pinos de latão nas extremidades (Início e Contato) para acabamento steampunk */}
            <div
              className="absolute rounded-full"
              style={{
                left: '-4px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '8px',
                height: '8px',
                background: 'radial-gradient(circle at 35% 35%, #f5d47e, #b88628 60%, #4a3410 100%)',
                border: '1px solid #d4a74a',
                boxShadow: '0 1px 3px rgba(0,0,0,0.9)',
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                right: '-4px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '8px',
                height: '8px',
                background: 'radial-gradient(circle at 35% 35%, #f5d47e, #b88628 60%, #4a3410 100%)',
                border: '1px solid #d4a74a',
                boxShadow: '0 1px 3px rgba(0,0,0,0.9)',
              }}
            />
          </div>

          {/* 2. Efeito de faíscas direcionadas para trás e para baixo por debaixo das engrenagens (Camada Z: 15, sem ponto de atrito) */}
          {isSparking && (
            <div
              className="absolute pointer-events-none"
              style={{
                left: `${currentX}px`,
                top: '3.5px',
                transform: 'translateY(-50%)',
                zIndex: 15,
              }}
              aria-hidden="true"
            >

              {/* Partículas de faísca disparadas na altura da barra por baixo das engrenagens */}
              {scrollDirection === 'right' ? (
                <>
                  <div
                    className="absolute rounded-full"
                    style={{
                      left: '-15px',
                      top: '0px',
                      width: '4.5px',
                      height: '4px',
                      background: 'radial-gradient(circle, #ffffff, #ffb833 70%, #ff4400)',
                      boxShadow: '0 0 6px #ff9900, 0 0 2px #fff',
                      animation: 'spark-shoot-l1 0.22s cubic-bezier(0.2, 0.8, 0.4, 1) infinite',
                    }}
                  />
                  <div
                    className="absolute rounded-full"
                    style={{
                      left: '-22px',
                      top: '1px',
                      width: '5px',
                      height: '4px',
                      background: 'radial-gradient(circle, #ffffff, #ffe066 60%, #ff3300)',
                      boxShadow: '0 0 7px #ff8800, 0 0 3px #fff',
                      animation: 'spark-shoot-l2 0.28s cubic-bezier(0.2, 0.8, 0.4, 1) 0.03s infinite',
                    }}
                  />
                  <div
                    className="absolute rounded-full"
                    style={{
                      left: '-8px',
                      top: '-1px',
                      width: '4px',
                      height: '3.5px',
                      background: '#ffffff',
                      boxShadow: '0 0 5px #ffcc00, 0 0 2px #fff',
                      animation: 'spark-shoot-l3 0.18s cubic-bezier(0.2, 0.8, 0.4, 1) 0.02s infinite',
                    }}
                  />
                  <div
                    className="absolute rounded-full"
                    style={{
                      left: '-26px',
                      top: '0px',
                      width: '4.5px',
                      height: '4px',
                      background: 'radial-gradient(circle, #ffffff, #ffaa00 70%, #ff4400)',
                      boxShadow: '0 0 6px #ff8800',
                      animation: 'spark-shoot-l4 0.25s cubic-bezier(0.2, 0.8, 0.4, 1) 0.05s infinite',
                    }}
                  />
                  <div
                    className="absolute rounded-full"
                    style={{
                      left: '-18px',
                      top: '2px',
                      width: '4px',
                      height: '3.5px',
                      background: 'radial-gradient(circle, #ffffff, #ffd24d)',
                      boxShadow: '0 0 6px #ffbb00',
                      animation: 'spark-shoot-l5 0.26s cubic-bezier(0.2, 0.8, 0.4, 1) infinite',
                    }}
                  />
                  <div
                    className="absolute rounded-full"
                    style={{
                      left: '-28px',
                      top: '-2px',
                      width: '5px',
                      height: '4px',
                      background: 'radial-gradient(circle, #ffffff, #ff9900 70%, #ff2200)',
                      boxShadow: '0 0 8px #ff7700, 0 0 3px #fff',
                      animation: 'spark-shoot-l6 0.21s cubic-bezier(0.2, 0.8, 0.4, 1) 0.04s infinite',
                    }}
                  />
                  <div
                    className="absolute rounded-full"
                    style={{
                      left: '-12px',
                      top: '0px',
                      width: '5.5px',
                      height: '4px',
                      background: 'radial-gradient(circle, #ffffff, #ffe580 50%, #ff5500)',
                      boxShadow: '0 0 9px #ff6600, 0 0 3px #fff',
                      animation: 'spark-shoot-l7 0.3s cubic-bezier(0.2, 0.8, 0.4, 1) 0.02s infinite',
                    }}
                  />
                  <div
                    className="absolute rounded-full"
                    style={{
                      left: '-24px',
                      top: '1px',
                      width: '4px',
                      height: '3.5px',
                      background: '#ffffff',
                      boxShadow: '0 0 5px #ffaa00',
                      animation: 'spark-shoot-l8 0.24s cubic-bezier(0.2, 0.8, 0.4, 1) 0.06s infinite',
                    }}
                  />
                </>
              ) : (
                <>
                  <div
                    className="absolute rounded-full"
                    style={{
                      left: '15px',
                      top: '0px',
                      width: '4.5px',
                      height: '4px',
                      background: 'radial-gradient(circle, #ffffff, #ffb833 70%, #ff5500)',
                      boxShadow: '0 0 6px #ff9900, 0 0 2px #fff',
                      animation: 'spark-shoot-r1 0.22s cubic-bezier(0.2, 0.8, 0.4, 1) infinite',
                    }}
                  />
                  <div
                    className="absolute rounded-full"
                    style={{
                      left: '22px',
                      top: '1px',
                      width: '5px',
                      height: '4px',
                      background: 'radial-gradient(circle, #ffffff, #ffe066 60%, #ff3300)',
                      boxShadow: '0 0 7px #ff8800, 0 0 3px #fff',
                      animation: 'spark-shoot-r2 0.28s cubic-bezier(0.2, 0.8, 0.4, 1) 0.03s infinite',
                    }}
                  />
                  <div
                    className="absolute rounded-full"
                    style={{
                      left: '8px',
                      top: '-1px',
                      width: '4px',
                      height: '3.5px',
                      background: '#ffffff',
                      boxShadow: '0 0 5px #ffcc00, 0 0 2px #fff',
                      animation: 'spark-shoot-r3 0.18s cubic-bezier(0.2, 0.8, 0.4, 1) 0.02s infinite',
                    }}
                  />
                  <div
                    className="absolute rounded-full"
                    style={{
                      left: '26px',
                      top: '0px',
                      width: '4.5px',
                      height: '4px',
                      background: 'radial-gradient(circle, #ffffff, #ffaa00 70%, #ff4400)',
                      boxShadow: '0 0 6px #ff8800',
                      animation: 'spark-shoot-r4 0.25s cubic-bezier(0.2, 0.8, 0.4, 1) 0.05s infinite',
                    }}
                  />
                  <div
                    className="absolute rounded-full"
                    style={{
                      left: '18px',
                      top: '2px',
                      width: '4px',
                      height: '3.5px',
                      background: 'radial-gradient(circle, #ffffff, #ffd24d)',
                      boxShadow: '0 0 6px #ffbb00',
                      animation: 'spark-shoot-r5 0.26s cubic-bezier(0.2, 0.8, 0.4, 1) infinite',
                    }}
                  />
                  <div
                    className="absolute rounded-full"
                    style={{
                      left: '28px',
                      top: '-2px',
                      width: '5px',
                      height: '4px',
                      background: 'radial-gradient(circle, #ffffff, #ff9900 70%, #ff2200)',
                      boxShadow: '0 0 8px #ff7700, 0 0 3px #fff',
                      animation: 'spark-shoot-r6 0.21s cubic-bezier(0.2, 0.8, 0.4, 1) 0.04s infinite',
                    }}
                  />
                  <div
                    className="absolute rounded-full"
                    style={{
                      left: '12px',
                      top: '0px',
                      width: '5.5px',
                      height: '4px',
                      background: 'radial-gradient(circle, #ffffff, #ffe580 50%, #ff5500)',
                      boxShadow: '0 0 9px #ff6600, 0 0 3px #fff',
                      animation: 'spark-shoot-r7 0.3s cubic-bezier(0.2, 0.8, 0.4, 1) 0.02s infinite',
                    }}
                  />
                  <div
                    className="absolute rounded-full"
                    style={{
                      left: '24px',
                      top: '1px',
                      width: '4px',
                      height: '3.5px',
                      background: '#ffffff',
                      boxShadow: '0 0 5px #ffaa00',
                      animation: 'spark-shoot-r8 0.24s cubic-bezier(0.2, 0.8, 0.4, 1) 0.06s infinite',
                    }}
                  />
                </>
              )}
            </div>
          )}

          {/* 3. Trem de 3 engrenagens mecânicas acopladas (Camada Z: 20 - por cima da barra e das faíscas) */}
          <div
            className="absolute"
            style={{
              left: `${currentX}px`,
              top: '0',
              zIndex: 20,
              willChange: 'left',
            }}
          >
            {/* Engrenagem Grande (Esquerda - Latão Dourado) */}
            <div
              className="absolute"
              style={{
                left: '-26px',
                top: '0',
                transform: `translate(-50%, -50%) rotate(${angleLarge}deg)`,
                width: `${GEAR_LARGE_SIZE}px`,
                height: `${GEAR_LARGE_SIZE}px`,
                filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.95)) drop-shadow(0 0 10px rgba(255,157,46,0.5))',
                willChange: 'transform',
              }}
              aria-hidden="true"
            >
              <SteampunkGear
                size={GEAR_LARGE_SIZE}
                teeth={10}
                color="brass"
                speed={null}
              />
            </div>

            {/* Engrenagem Menor (No Meio - Cobre) */}
            <div
              className="absolute"
              style={{
                left: '0px',
                top: '0',
                transform: `translate(-50%, -50%) rotate(${angleSmall}deg)`,
                width: `${GEAR_SMALL_SIZE}px`,
                height: `${GEAR_SMALL_SIZE}px`,
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.95)) drop-shadow(0 0 8px rgba(255,140,30,0.6))',
                willChange: 'transform',
              }}
              aria-hidden="true"
            >
              <SteampunkGear
                size={GEAR_SMALL_SIZE}
                teeth={6}
                color="copper"
                speed={null}
              />
            </div>

            {/* Engrenagem Média (Direita - Prata / Aço Vitoriano) */}
            <div
              className="absolute"
              style={{
                left: '23px',
                top: '0',
                transform: `translate(-50%, -50%) rotate(${angleMedium}deg)`,
                width: `${GEAR_MEDIUM_SIZE}px`,
                height: `${GEAR_MEDIUM_SIZE}px`,
                filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.95)) drop-shadow(0 0 10px rgba(200,220,255,0.4))',
                willChange: 'transform',
              }}
              aria-hidden="true"
            >
              <SteampunkGear
                size={GEAR_MEDIUM_SIZE}
                teeth={8}
                color="silver"
                speed={null}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
