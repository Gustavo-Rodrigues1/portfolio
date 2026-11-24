import React, { useState, useEffect, useCallback } from 'react';
import { profileData } from '../data/profile';
import { SteampunkGear } from './SteampunkGear';
import { GithubIcon } from './SocialIcons';
import { ScrollReveal } from './ScrollReveal';
import {
  ExternalLink,
  Copy,
  Check,
  Layers,
  Bookmark,
  ArrowRight
} from 'lucide-react';

/**
 * Lâmpada de filamento Steampunk (estilo bulbo globo redondo vitoriano)
 * Formato arredondado com soquete de latão e filamento de tungstênio incandescente
 */
const SteampunkBulb = ({ isActive }) => (
  <svg
    viewBox="0 0 28 36"
    className={`w-7 h-9 transition-all duration-500 overflow-visible ${isActive
      ? 'drop-shadow-[0_0_14px_rgba(255,160,50,0.95)] scale-110'
      : 'opacity-40 hover:opacity-75'
      }`}
  >
    <defs>
      <radialGradient id="round-lamp-lit-grad" cx="48%" cy="40%" r="55%">
        <stop offset="0%" stopColor="#fffcee" />
        <stop offset="25%" stopColor="#ffd276" />
        <stop offset="55%" stopColor="#ff9a1f" />
        <stop offset="85%" stopColor="#d15e00" />
        <stop offset="100%" stopColor="#6e2e00" />
      </radialGradient>
      <radialGradient id="round-lamp-off-grad" cx="42%" cy="38%" r="60%">
        <stop offset="0%" stopColor="#35291f" />
        <stop offset="55%" stopColor="#1e1610" />
        <stop offset="100%" stopColor="#0d0906" />
      </radialGradient>
    </defs>

    {/* Casquilho / Soquete de latão rosqueado na base */}
    <g>
      <rect x="9" y="23.5" width="10" height="3.5" rx="0.5" fill="#4d381c" stroke="#8a6730" strokeWidth="0.8" />
      <line x1="9.5" y1="25.5" x2="18.5" y2="25.5" stroke="#22180c" strokeWidth="0.8" />
      <rect x="7.5" y="27" width="13" height="3" rx="0.8" fill="#2d1f10" stroke="#684e26" strokeWidth="0.8" />
    </g>

    {/* Bulbo de vidro redondo (formato globo / esfera) */}
    <path
      d="M 9.5 23.5 C 5.5 20.5 4 16.5 4 13 C 4 7.48 8.48 3 14 3 C 19.52 3 24 7.48 24 13 C 24 16.5 22.5 20.5 18.5 23.5 Z"
      fill={isActive ? 'url(#round-lamp-lit-grad)' : 'url(#round-lamp-off-grad)'}
      stroke={isActive ? '#ffe4a0' : '#574229'}
      strokeWidth={isActive ? '1.2' : '0.8'}
      className="transition-colors duration-500"
    />

    {/* Filamento interno de tungstênio */}
    {isActive ? (
      <g className="transition-all duration-300">
        <line x1="11.5" y1="23" x2="12" y2="15" stroke="#ffe5a3" strokeWidth="0.8" />
        <line x1="16.5" y1="23" x2="16" y2="15" stroke="#ffe5a3" strokeWidth="0.8" />
        <path
          d="M 12 15 C 12 8, 16 8, 16 15"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="14" cy="11.5" r="2.8" fill="#ffffff" />
      </g>
    ) : (
      <g opacity="0.35">
        <line x1="11.5" y1="23" x2="12" y2="15" stroke="#6b5742" strokeWidth="0.7" />
        <line x1="16.5" y1="23" x2="16" y2="15" stroke="#6b5742" strokeWidth="0.7" />
        <path
          d="M 12 15 C 12 9, 16 9, 16 15"
          fill="none"
          stroke="#554433"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </g>
    )}

    {/* Reflexo curvo no vidro esférico */}
    <path
      d="M 7 8 C 5.5 10.5 5.5 14.5 7.5 17"
      fill="none"
      stroke="#ffffff"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity={isActive ? '0.7' : '0.15'}
    />
  </svg>
);

export const ProjectsArchive = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gearAngle, setGearAngle] = useState(0);
  const [copiedId, setCopiedId] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);

  const projects = profileData.projects || [];
  const totalProjects = projects.length;

  const goTo = (targetIndex) => {
    if (targetIndex === currentIndex) return;
    let diff = targetIndex - currentIndex;
    if (diff > totalProjects / 2) diff -= totalProjects;
    if (diff < -totalProjects / 2) diff += totalProjects;

    setGearAngle((prev) => prev + diff * 90);
    setCurrentIndex(targetIndex);
  };

  const handleNext = useCallback(() => {
    setGearAngle((prev) => prev + 90);
    setCurrentIndex((prev) => (prev + 1) % totalProjects);
  }, [totalProjects]);

  const handlePrev = useCallback(() => {
    setGearAngle((prev) => prev - 90);
    setCurrentIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
  }, [totalProjects]);

  // Rotação automática contínua pelo tempo (4.5 segundos)
  // O timer é cancelado e reiniciado toda vez que currentIndex muda (reset no clique manual)
  useEffect(() => {
    if (isHovered || totalProjects <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(timer);
  }, [isHovered, totalProjects, handleNext, currentIndex]);

  const handleCopyLink = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  // Suporte a Touch Swipe para Mobile
  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX) return;
    const touchEndX = e.changedTouches[0].clientX;
    const distance = touchStartX - touchEndX;

    if (distance > 45) {
      handleNext();
    } else if (distance < -45) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  // Cálculo da posição de cada cartão (Centro em destaque, Laterais turvas)
  const getCardStyle = (index) => {
    let diff = index - currentIndex;
    if (diff > totalProjects / 2) diff -= totalProjects;
    if (diff < -totalProjects / 2) diff += totalProjects;

    if (diff === 0) {
      // Cartão Central em Destaque
      return {
        transform: 'translate(-50%, 0) scale(1)',
        opacity: 1,
        filter: 'blur(0px)',
        zIndex: 30,
        pointerEvents: 'auto',
      };
    } else if (diff === 1 || (totalProjects === 2 && diff === -1)) {
      // Cartão Lateral Direito (turvo e menor)
      return {
        transform: 'translate(calc(-50% + 56%), 0) scale(0.88)',
        opacity: 0.35,
        filter: 'blur(2.5px)',
        zIndex: 10,
        pointerEvents: 'auto',
      };
    } else if (diff === -1) {
      // Cartão Lateral Esquerdo (turvo e menor)
      return {
        transform: 'translate(calc(-50% - 56%), 0) scale(0.88)',
        opacity: 0.35,
        filter: 'blur(2.5px)',
        zIndex: 10,
        pointerEvents: 'auto',
      };
    } else {
      // Cartões adicionais ocultos
      return {
        transform: diff > 0
          ? 'translate(calc(-50% + 110%), 0) scale(0.75)'
          : 'translate(calc(-50% - 110%), 0) scale(0.75)',
        opacity: 0,
        filter: 'blur(6px)',
        zIndex: 0,
        pointerEvents: 'none',
      };
    }
  };

  return (
    <section
      id="projetos"
      className="relative py-24 bg-[#0a0807] border-b-2 border-brass-dark/60 overflow-hidden select-none"
    >
      {/* Detalhes de engrenagens industriais ao fundo */}
      <div className="absolute top-1/2 -left-20 pointer-events-none opacity-10">
        <SteampunkGear size={300} teeth={16} color="iron" speed="spin-slow" />
      </div>
      <div className="absolute bottom-10 -right-24 pointer-events-none opacity-10">
        <SteampunkGear size={280} teeth={14} color="brass" speed="spin-reverse-slow" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Cabeçalho da Seção */}
        <ScrollReveal delay={0} distance={28} className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-brass-gradient tracking-wide mb-4">
            Projetos Registrados no GitHub
          </h2>

          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-12 bg-brass/60"></span>
            <span className="text-copper-light text-xs font-schematic uppercase tracking-widest">
              Engenharia de Software • Soluções Web & TI
            </span>
            <span className="h-px w-12 bg-brass/60"></span>
          </div>

          <p className="text-[#c5b59e] text-sm sm:text-base leading-relaxed">
            Mecanismos digitais forjados com precisão. Cada projeto representa um desafio de arquitetura,
            processamento de dados e experiência do usuário, documentado e versionado no GitHub.
          </p>
        </ScrollReveal>

      {/* Três Engrenagens Mecânicas Centrais Acima do Carrossel */}
      <ScrollReveal delay={180} distance={32}>
        <div className="relative flex items-end justify-center mb-3 pointer-events-none" style={{ height: '76px' }}>
          {/* Engrenagem Pequena (Esquerda - Cobre) */}
          <div
            className="-mr-3 z-10"
            style={{
              transform: `rotate(${-gearAngle * 1.5}deg)`,
              transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.25, 1)',
            }}
          >
            <SteampunkGear size={50} teeth={8} color="copper" speed={null} />
          </div>

          {/* Engrenagem Grande (Centro - Latão) */}
          <div
            className="z-20"
            style={{
              transform: `rotate(${gearAngle}deg)`,
              transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.25, 1)',
            }}
          >
            <SteampunkGear size={76} teeth={12} color="brass" speed={null} />
          </div>

          {/* Engrenagem Média (Direita - Ferro) */}
          <div
            className="-ml-3 z-10"
            style={{
              transform: `rotate(${-gearAngle * 1.2}deg)`,
              transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.25, 1)',
            }}
          >
            <SteampunkGear size={62} teeth={10} color="iron" speed={null} />
          </div>
        </div>

        {/* Palco do Carrossel (3 Projetos: Central em Destaque e 2 Laterais Turvas) */}
        <div
          className="relative flex items-center justify-center py-6 sm:py-8"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Elemento Fantasma Invisível para Dimensionar a Altura do Palco de Forma Responsiva */}
          <div
            className="w-[92%] sm:w-[78%] md:w-[65%] lg:w-[52%] max-w-[560px] opacity-0 pointer-events-none select-none p-6 sm:p-8"
            aria-hidden="true"
          >
            <div className="p-6 sm:p-8 rounded-3xl border border-transparent flex flex-col justify-between">
              <h3 className="font-body text-2xl sm:text-3xl font-bold mb-3">Painel de Indicadores &amp; Gestão de Dados</h3>
              <p className="text-xs sm:text-[13.5px] font-body leading-relaxed mb-6">
                Plataforma interativa para consolidação de métricas, filtros em tempo real e visualização analítica desenvolvida com base nas competências de Sistemas de Informação.
              </p>
              <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-6">
                <span className="px-4.5 py-2 rounded-full text-xs sm:text-sm">React</span>
                <span className="px-4.5 py-2 rounded-full text-xs sm:text-sm">Tailwind CSS</span>
                <span className="px-4.5 py-2 rounded-full text-xs sm:text-sm">JavaScript</span>
              </div>
              <div className="pt-4 border-t border-transparent flex items-center justify-between">
                <span className="h-8">View Live</span>
              </div>
            </div>
          </div>

          {/* Cartões dos Projetos Renderizados nas Posições Calculadas (Modelo Simplificado) */}
          {projects.map((project, index) => {
            let diff = index - currentIndex;
            if (diff > totalProjects / 2) diff -= totalProjects;
            if (diff < -totalProjects / 2) diff += totalProjects;

            const isCenter = diff === 0;

            return (
              <div
                key={project.id}
                style={getCardStyle(index)}
                onClick={() => {
                  if (!isCenter) {
                    goTo(index);
                  }
                }}
                className={`absolute top-0 left-1/2 w-[92%] sm:w-[78%] md:w-[65%] lg:w-[52%] max-w-[560px] h-full transition-all duration-700 ease-out ${!isCenter ? 'cursor-pointer' : ''
                  }`}
              >
                {/* Camada Transparente de Clique para os Cartões Laterais */}
                {!isCenter && (
                  <div
                    className="absolute inset-0 z-30 rounded-3xl hover:bg-black/10 transition-colors"
                    title={`Ver ${project.title}`}
                  />
                )}

                <div
                  key={isCenter ? `center-box-${currentIndex}` : `box-${project.id}`}
                  style={isCenter ? { transformOrigin: 'top center' } : undefined}
                  className={`p-6 sm:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-500 flex flex-col justify-between h-full group relative overflow-hidden shadow-2xl hover:scale-[1.04] hover:-translate-y-2.5 ${
                    isCenter
                      ? 'bg-[#18130e]/95 backdrop-blur-md border-brass-light/80 shadow-[0_0_35px_rgba(255,157,46,0.22)] hover:border-amber-300 hover:shadow-[0_0_48px_rgba(255,185,75,0.4)]'
                      : 'bg-[#120e0a]/90 backdrop-blur-sm border-brass-dark/40 hover:border-brass-dark/70'
                  }`}
                >
                  {/* Efeito Contínuo de Reflexo Metálico Cintilante ao Passar o Cursor */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 overflow-hidden">
                    <div className="w-[130%] h-[220%] -top-[60%] absolute metallic-sheen-layer animate-metallic-sheen" />
                  </div>

                  {/* Formas Geométricas Orgânicas Decorativas que Deformam e Mudam de Forma */}
                  <div className="absolute -top-16 -right-16 w-60 h-60 bg-gradient-to-br from-amber-400/[0.09] via-white/[0.04] to-transparent pointer-events-none blur-[1px] animate-morph-a opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute -bottom-12 -right-10 w-44 h-44 bg-gradient-to-tr from-copper-light/[0.07] via-brass-light/[0.03] to-transparent pointer-events-none blur-[1px] animate-morph-b opacity-70 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute top-1/3 -left-12 w-32 h-32 bg-gradient-to-r from-steamAmber-bright/[0.06] to-transparent pointer-events-none blur-[2px] animate-morph-c opacity-60 group-hover:opacity-90 transition-opacity duration-700" />

                  <div>
                    {/* Título Principal em Destaque */}
                    <h3 className="font-body text-2xl sm:text-3xl font-bold text-[#f5ecd5] tracking-tight group-hover:text-amber-300 transition-colors">
                      {project.title}
                    </h3>

                    {/* Descrição Concisa e Limpa */}
                    <p className="font-body text-xs sm:text-[13.5px] text-[#b8a793] leading-relaxed mt-3 mb-6">
                      {project.description}
                    </p>

                    {/* Tecnologias em Pílulas Maiores que Brilham e Aumentam no Hover */}
                    <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-6">
                      {project.techs.map((tech, i) => (
                        <span
                          key={i}
                          className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-body font-semibold bg-[#241e17] border border-brass-dark/50 text-[#e4d7c5] hover:text-amber-200 hover:border-amber-400 hover:bg-[#2e2319] hover:shadow-[0_0_16px_rgba(255,190,91,0.7)] hover:scale-110 hover:-translate-y-0.5 transition-all duration-300 cursor-default select-none"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Linha Divisória e Rodapé com Ações */}
                  <div className="pt-4 sm:pt-5 border-t border-brass-dark/30 flex items-center justify-between mt-auto">
                    {/* Link para visualização ao vivo */}
                    <a
                      href={project.liveUrl || project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-sm sm:text-[15px] font-semibold text-[#f5ecd5] hover:text-steamAmber-bright transition-colors flex items-center gap-1.5 group/link"
                    >
                      <span>View Live</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </a>

                    {/* Ícone Maior do GitHub com Efeito de Brilho */}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Repositório GitHub de ${project.title}`}
                      className="text-[#b8a793] hover:text-amber-300 hover:drop-shadow-[0_0_12px_rgba(255,190,91,0.85)] hover:scale-120 transition-all duration-300 p-1.5 flex items-center justify-center"
                      title="Acessar repositório no GitHub"
                    >
                      <GithubIcon className="w-7 h-7 sm:w-8 sm:h-8" />
                    </a>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Caixa de Madeira e Latão Vintage com Lâmpadas Eretas Acima Dela */}
        <div className="mt-14 flex flex-col items-center justify-center select-none px-4">

          {/* Lâmpadas Redondas em Pé, ACIMA da Caixa (apoiadas na tampa) */}
          <div className="relative z-10 flex items-end justify-center gap-2.5 sm:gap-3.5 -mb-1">
            {projects.map((project, dotIdx) => {
              const isActive = currentIndex === dotIdx;
              return (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => goTo(dotIdx)}
                  className="group relative flex flex-col items-center focus:outline-none transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
                  title={`Patente ${dotIdx + 1}: ${project.title}`}
                  aria-label={`Ir para a patente ${dotIdx + 1}: ${project.title}`}
                >
                  {/* Lâmpada */}
                  <div className="relative flex items-center justify-center">
                    <SteampunkBulb isActive={isActive} />

                    {/* Brilho âmbar quando a lâmpada acende */}
                    {isActive && (
                      <div className="absolute -bottom-1 w-6 h-2 bg-[#ff9d2e] rounded-full blur-sm opacity-90" />
                    )}
                  </div>

                  {/* Soquete cilíndrico de baquelite/latão montado na tampa da caixa */}
                  <div className="w-4 h-1.5 bg-[#1b140e] border border-[#523d24] rounded-t-sm shadow-xs -mt-0.5" />
                </button>
              );
            })}
          </div>

          {/* A Caixa (Estilo madeira nobre encerada, tipo humidor/caixa vintage da foto) */}
          <div className="relative w-[245px] sm:w-[270px] bg-gradient-to-b from-[#3c2414] via-[#2c180d] to-[#1d0f07] border-2 border-[#6d4926] rounded-md shadow-[0_12px_25px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,200,120,0.35)] pt-2.5 pb-2.5 px-3">

            {/* Friso chanfrado da tampa de madeira nobre polida */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#6e4624] via-[#9e6737] to-[#6e4624] rounded-t-sm shadow-sm" />

            {/* Fecho de metal / dobradiça vintage no topo central */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3.5 h-1.5 bg-brass border border-black/70 rounded-b shadow-xs z-20 flex items-center justify-center">
              <div className="w-0.5 h-0.5 rounded-full bg-brass-light border border-black/60" />
            </div>

            {/* Rebites/parafusos de latão nos 4 cantos da caixa de madeira */}
            <div className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full bg-brass-light border border-black/60" />
            <div className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-brass-light border border-black/60" />
            <div className="absolute bottom-1.5 left-1.5 w-1 h-1 rounded-full bg-brass-light border border-black/60" />
            <div className="absolute bottom-1.5 right-1.5 w-1 h-1 rounded-full bg-brass-light border border-black/60" />

            {/* Face Frontal da Caixa: Medidor de Vapor + Tela CRT Verde Aumentada + Engrenagens */}
            <div className="flex items-center justify-between gap-1.5">

              {/* Lado Esquerdo: Medidor de Pressão de Vapor (Manômetro Redondo sem texto PSI) */}
              <div className="flex items-center flex-shrink-0" title="Manômetro de Pressão de Vapor">
                <div
                  className="relative w-8 h-8 rounded-full p-0.5 flex-shrink-0"
                  style={{
                    background: 'radial-gradient(circle at 35% 35%, #f1d289 0%, #aa8033 55%, #46300f 95%)',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.4)',
                  }}
                >
                  {/* Mostrador analógico pergaminho */}
                  <div className="relative w-full h-full rounded-full bg-[#f4ecd8] border border-[#5a4325] overflow-hidden flex items-center justify-center">
                    {/* Ticks e arco do manômetro */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 30 30">
                      <path
                        d="M 7 23 A 10 10 0 1 1 23 23"
                        fill="none"
                        stroke="#6e5434"
                        strokeWidth="1"
                        strokeDasharray="1.2 1.2"
                      />
                      <path
                        d="M 20 10 A 10 10 0 0 1 23 23"
                        fill="none"
                        stroke="#a93226"
                        strokeWidth="1.2"
                      />
                    </svg>

                    {/* Ponteiro analógico oscilante */}
                    <div
                      className="absolute w-0.5 h-2.5 bg-[#8b1810] origin-bottom bottom-1/2 left-1/2 -translate-x-1/2 rounded-full transition-transform duration-700 ease-out shadow-sm"
                      style={{
                        transform: `translateX(-50%) rotate(${-70 + (currentIndex / Math.max(totalProjects - 1, 1)) * 140}deg)`,
                      }}
                    />

                    {/* Rebite central do ponteiro */}
                    <div className="absolute w-1 h-1 rounded-full bg-brass border border-black shadow z-10" />
                  </div>
                </div>
              </div>

              {/* Centro: Tela CRT Verde Aumentada com Paleta Verde Neon e Scanlines */}
              <div
                className="relative px-3 py-1 sm:px-4 sm:py-1 rounded-sm flex items-center justify-center border border-[#523d24] shadow-[0_2px_8px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(212,168,83,0.35)]"
                style={{
                  background: 'linear-gradient(180deg, #241c14 0%, #15100a 60%, #0d0a06 100%)',
                }}
              >
                {/* Parafusos nos cantos da moldura da tela */}
                <div className="absolute top-0.5 left-0.5 w-1 h-1 rounded-full bg-[#c69c4d] border border-[#3b2914]" />
                <div className="absolute top-0.5 right-0.5 w-1 h-1 rounded-full bg-[#c69c4d] border border-[#3b2914]" />
                <div className="absolute bottom-0.5 left-0.5 w-1 h-1 rounded-full bg-[#c69c4d] border border-[#3b2914]" />
                <div className="absolute bottom-0.5 right-0.5 w-1 h-1 rounded-full bg-[#c69c4d] border border-[#3b2914]" />

                {/* Visor com fósforo verde e linhas de varredura */}
                <div
                  className="relative px-2.5 py-1 sm:px-3.5 sm:py-1 rounded-[2px] bg-[#021307] border border-emerald-600/90 overflow-hidden flex items-center justify-center gap-1.5 shadow-[inset_0_0_8px_rgba(34,197,94,0.5),0_0_10px_rgba(34,197,94,0.25)]"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(34, 197, 94, 0.12) 1px, transparent 1px)',
                    backgroundSize: '100% 2.5px',
                  }}
                >
                  {/* Indicador LED verde pulsante */}
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#22c55e] shrink-0" />

                  {/* Texto de status em verde neon */}
                  <span
                    className="font-schematic text-[10px] sm:text-[11px] font-black text-emerald-400 tracking-wider uppercase select-none"
                    style={{
                      textShadow: '0 0 2px #bbf7d0, 0 0 6px #22c55e, 0 0 12px rgba(34, 197, 94, 0.9)',
                    }}
                  >
                    Ativo
                  </span>
                </div>
              </div>

              {/* Lado Direito: Engrenagens Mecânicas na Caixa */}
              <div className="flex items-center justify-end -space-x-1 flex-shrink-0">
                {/* Engrenagem Latão */}
                <div
                  style={{
                    transform: `rotate(${gearAngle}deg)`,
                    transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.25, 1)',
                  }}
                >
                  <SteampunkGear size={24} teeth={8} color="brass" speed={null} />
                </div>

                {/* Engrenagem Cobre */}
                <div
                  style={{
                    transform: `rotate(${-gearAngle * 1.3}deg)`,
                    transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.25, 1)',
                  }}
                >
                  <SteampunkGear size={18} teeth={6} color="copper" speed={null} />
                </div>
              </div>

            </div>

          </div>

        </div>
      </ScrollReveal>

      {/* Rodapé da Seção com Botão para Perfil Geral do GitHub estilo Card do Carrossel */}
      <ScrollReveal delay={250} distance={20} className="mt-14 text-center">
        <a
          href={profileData.social.github.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-flex items-center gap-3.5 px-8 py-4 rounded-2xl sm:rounded-3xl bg-[#18130e]/95 backdrop-blur-md border border-brass-light/80 text-[#f5ecd5] hover:text-amber-300 font-schematic font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_4px_20px_rgba(0,0,0,0.6)] shadow-[0_0_24px_rgba(255,157,46,0.18)] hover:border-amber-300 hover:shadow-[0_0_36px_rgba(255,185,75,0.45)] hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 group"
        >
          <GithubIcon className="w-5 h-5 icon-spin-hover text-copper-light group-hover:text-amber-300" />
          <span>Explorar Todos os Repositórios no GitHub</span>
          <ExternalLink className="w-4 h-4 text-brass-light/70 group-hover:text-amber-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
        </a>
      </ScrollReveal>

    </div>
  </section>
);
};
