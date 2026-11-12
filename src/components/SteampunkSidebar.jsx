import React, { useState, useEffect, useRef } from 'react';
import { SteampunkGear } from './SteampunkGear';
import { ChevronUp, Compass, Home, User, Briefcase, Wrench, FolderGit2, Mail } from 'lucide-react';

/**
 * Lâmpada indicadora Steampunk horizontal (lado esquerdo da barra lateral)
 * O bulbo aponta para a esquerda e o soquete encaixa atrás da lateral da barra à direita.
 */
const SteampunkNavBulb = ({ isActive, icon: Icon, id }) => {
  return (
    <div
      className={`relative w-[44px] sm:w-[48px] h-[28px] sm:h-[30px] flex items-center transition-all duration-300 ${isActive
        ? 'scale-110 drop-shadow-[0_0_14px_rgba(255,157,46,0.95)]'
        : 'hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(255,157,46,0.5)] opacity-85 hover:opacity-100'
        }`}
    >
      <svg
        viewBox="0 0 46 28"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          {/* Gradiente do bulbo de vidro aceso - foco no bojo à esquerda */}
          <radialGradient id={`nav-lamp-lit-${id}`} cx="38%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#fffcee" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#ffbe54" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#e57207" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#5c2000" stopOpacity="0.95" />
          </radialGradient>

          {/* Gradiente do bulbo de vidro apagado */}
          <radialGradient id={`nav-lamp-off-${id}`} cx="42%" cy="48%" r="55%">
            <stop offset="0%" stopColor="#2c2219" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#1a130e" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0c0906" stopOpacity="0.98" />
          </radialGradient>
        </defs>

        {/* Soquete de latão (à direita, encaixando por trás da barra lateral) */}
        <g>
          {/* Base embutida que fica escondida atrás da lateral da barra */}
          <rect
            x="40"
            y="7.5"
            width="6"
            height="13"
            rx="0.8"
            fill="#22180e"
            stroke="#4a3622"
            strokeWidth="0.8"
          />
          {/* Anéis da rosca mecânica - pequena parte visível saindo da lateral */}
          <rect
            x="38"
            y="8"
            width="2.5"
            height="12"
            rx="0.4"
            fill="#453118"
            stroke="#755624"
            strokeWidth="0.6"
          />
          <rect
            x="35.5"
            y="7.5"
            width="2.5"
            height="13"
            rx="0.4"
            fill="#5a3f1d"
            stroke="#916a2d"
            strokeWidth="0.6"
          />
          {/* Colar / Anel de latão de transição para o vidro */}
          <rect
            x="32"
            y="6.5"
            width="3.5"
            height="15"
            rx="0.8"
            fill="#755624"
            stroke="#c69c4d"
            strokeWidth="0.8"
          />
        </g>

        {/* Bulbo de vidro horizontal (apontando para a esquerda, esférico na ponta esquerda) */}
        <path
          d="M 33 8.5 C 29 8.5, 25 2, 18 2 C 10.3 2, 4 7.4, 4 14 C 4 20.6, 10.3 26, 18 26 C 25 26, 29 19.5, 33 19.5 Z"
          fill={isActive ? `url(#nav-lamp-lit-${id})` : `url(#nav-lamp-off-${id})`}
          stroke={isActive ? '#ffe494' : '#684e26'}
          strokeWidth={isActive ? '1.3' : '0.8'}
          className="transition-colors duration-300"
        />
      </svg>

      {/* Ícone na parte interna do bulbo de vidro (centralizado na esfera esquerda, mantendo orientação em pé) */}
      <div className="absolute left-[39%] top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center pointer-events-none">
        <Icon
          className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-all duration-300 ${isActive
            ? 'text-[#150d04] drop-shadow-[0_0_2px_rgba(255,255,255,0.7)]'
            : 'text-brass-light/85 group-hover/item:text-brass-light'
            }`}
          strokeWidth={isActive ? 2.6 : 2.2}
        />
      </div>
    </div>
  );
};

/**
 * Barra lateral Steampunk com trilho de cremalheira vertical
 * e engrenagens mecânicas que giram conforme o scroll da página:
 * - Sentido horário ao descer (scroll down)
 * - Sentido anti-horário ao subir (scroll up)
 */
export const SteampunkSidebar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const rafRef = useRef(null);

  const sections = [
    { id: 'hero', label: 'Início', icon: Home, desc: 'Convés Principal' },
    { id: 'sobre', label: 'Sobre Mim', icon: User, desc: 'Trajetória & UFS' },
    { id: 'experiencia', label: 'Experiência', icon: Briefcase, desc: 'Registros de Ofício' },
    { id: 'habilidades', label: 'Habilidades', icon: Wrench, desc: 'Insígnias Técnicas' },
    { id: 'projetos', label: 'Projetos', icon: FolderGit2, desc: 'Arquivo de Patentes' },
    { id: 'contato', label: 'Contato', icon: Mail, desc: 'Central Telegráfica' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY || window.pageYOffset;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? Math.min(Math.max(scrollY / totalHeight, 0), 1) : 0;

        // Fator de rotação contínua:
        // Ao descer: scrollY aumenta -> rotation aumenta (sentido horário em CSS)
        // Ao subir: scrollY diminui -> rotation diminui (sentido anti-horário em CSS)
        const currentRotation = scrollY * 0.45;

        setScrollProgress(progress);
        setRotation(currentRotation);

        // Detectar seção ativa no viewport
        for (let i = sections.length - 1; i >= 0; i--) {
          const sectionEl = document.getElementById(sections[i].id);
          if (sectionEl) {
            const rect = sectionEl.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.45) {
              setActiveSection(sections[i].id);
              break;
            }
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Execução inicial

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);


  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Altura útil da cremalheira
  const trackHeight = 210;

  return (
    <aside
      aria-label="Barra lateral mecânica de navegação"
      className="fixed right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 select-none flex items-center"
    >
      {/* Marcadores de Seções em Formato de Lâmpada (Encaixadas do Lado Esquerdo da Barra) */}
      <div
        className="absolute left-0 top-1/2 flex flex-col justify-between py-1 z-0 pointer-events-none"
        style={{
          height: `${trackHeight}px`,
          transform: 'translate(-36px, -50%)',
        }}
      >
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          const Icon = section.icon;
          return (
            <div key={section.id} className="relative flex items-center group/item pointer-events-auto hover:z-30">

              {/* Botão Lâmpada Steampunk Horizontal (apontando para a esquerda) */}
              <button
                type="button"
                onClick={() => scrollToSection(section.id)}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                aria-label={`Ir para seção ${section.label}`}
                className="relative focus:outline-none transition-transform active:scale-95"
              >
                <SteampunkNavBulb
                  isActive={isActive}
                  icon={Icon}
                  id={section.id}
                />
              </button>

              {/* Tooltip Vitoriano em Pergaminho/Bronze à esquerda da lâmpada ao passar o mouse */}
              <div
                className="absolute right-full mr-2.5 hidden group-hover/item:flex items-center gap-2 px-2.5 py-1 rounded bg-[#18130e]/95 border border-brass-dark text-nowrap shadow-2xl pointer-events-none transition-all duration-200 z-50"
              >
                <div className="flex flex-col text-right">
                  <span className="font-cinzel text-xs font-bold text-brass-gradient uppercase">
                    {section.label}
                  </span>
                  <span className="text-[9px] font-schematic text-[#ab9982]">
                    {section.desc}
                  </span>
                </div>
                <span className="text-copper-light text-[10px]">⚙</span>

                {/* Seta do tooltip apontando para a direita (em direção à lâmpada) */}
                <span className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-[#18130e]"></span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Console Vitoriano Industrial (em primeiro plano sobre as bases dos soquetes) */}
      <div className="relative z-10 flex flex-col items-center bg-[#130f0c]/95 backdrop-blur-md border border-brass-dark/80 hover:border-brass/70 rounded-2xl p-2 sm:p-2.5 shadow-[0_12px_35px_rgba(0,0,0,0.85)] transition-all duration-300">

        {/* Rebites nos cantos do painel */}
        <span className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-brass-light/80 shadow-[0_0_2px_#fff]"></span>
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-brass-light/80 shadow-[0_0_2px_#fff]"></span>
        <span className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-brass-light/80 shadow-[0_0_2px_#fff]"></span>
        <span className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-brass-light/80 shadow-[0_0_2px_#fff]"></span>

        {/* Topo do Console: Válvula / Selo de Latão */}
        <div className="flex flex-col items-center mb-2 pb-1 border-b border-brass-dark/40 w-full">
          <div className="w-5 h-5 rounded-full bg-[#1e1712] border border-brass/60 flex items-center justify-center shadow-inner">
            <Compass className="w-3 h-3 text-brass-light animate-spin-slow" />
          </div>
          <span className="text-[8px] font-schematic tracking-widest text-brass-light/80 mt-1 uppercase hidden sm:block">
            MEC-01
          </span>
        </div>

        {/* Trilho de Cremalheira Vertical (Rack & Pinion) */}
        <div
          className="relative flex items-center justify-center my-1"
          style={{ height: `${trackHeight}px`, width: '50px' }}
        >
          {/* Haste de Latão / Trilho dentado */}
          <div className="absolute inset-y-0 w-3 bg-gradient-to-r from-[#221811] via-[#4a3622] to-[#1c130d] rounded-full border border-brass-dark/70 shadow-inner flex flex-col justify-between py-2 pointer-events-none">
            {/* Dentes da cremalheira (entalhes) */}
            {Array.from({ length: 16 }).map((_, i) => (
              <span
                key={i}
                className="w-full h-[1.5px] bg-[#825c27] opacity-60 self-center"
              />
            ))}
          </div>

          {/* Carrinho Mecânico com Engrenagens que acompanham o scroll */}
          <div
            className="absolute left-1/2 flex items-center justify-center"
            style={{
              top: `${scrollProgress * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* Engrenagem Secundária de Cobre (contra-rotaciona para realismo físico) */}
            <div className="absolute -top-3 -right-2 opacity-80 pointer-events-none">
              <SteampunkGear
                size={22}
                teeth={7}
                color="copper"
                rotation={-rotation * 1.5}
                speed={null}
              />
            </div>

            {/* Engrenagem Principal de Latão (Gira no sentido horário ao descer e anti-horário ao subir) */}
            <div className="relative drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]">
              <SteampunkGear
                size={44}
                teeth={10}
                color="brass"
                rotation={rotation}
                speed={null}
              />

              {/* Indicador de Pressão / Centro iluminado com pulso suave */}
              <div className="absolute inset-0 m-auto w-2.5 h-2.5 rounded-full bg-steamAmber-glow/80 shadow-[0_0_8px_#ff9d2e]"></div>
            </div>
          </div>
        </div>

        {/* Botão de Retornar ao Topo com Estilo Steampunk */}
        <div className="flex flex-col items-center mt-2 pt-2 border-t border-brass-dark/40 w-full">
          <button
            type="button"
            onClick={scrollToTop}
            title="Retornar ao topo"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full btn-steampunk flex items-center justify-center text-brass-light hover:text-white transition-all hover:scale-105 active:scale-95 shadow-md"
          >
            <ChevronUp className="w-4 h-4 text-brass-light" />
          </button>
        </div>

      </div>
    </aside>
  );
};
