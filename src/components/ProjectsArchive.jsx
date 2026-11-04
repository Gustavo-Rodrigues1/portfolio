import React, { useState, useEffect, useCallback } from 'react';
import { profileData } from '../data/profile';
import { SteampunkGear } from './SteampunkGear';
import { GithubIcon } from './SocialIcons';
import {
  ExternalLink,
  Copy,
  Check,
  Layers,
  Bookmark
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
        <div className="text-center max-w-3xl mx-auto mb-16">
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
        </div>

        {/* Três Engrenagens Mecânicas Centrais Acima do Carrossel */}
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
          className="relative flex items-center justify-center overflow-hidden py-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Elemento Fantasma Invisível para Dimensionar a Altura do Palco de Forma Responsiva */}
          <div
            className="w-[90%] sm:w-[75%] md:w-[62%] lg:w-[50%] max-w-[560px] opacity-0 pointer-events-none select-none p-6 sm:p-7"
            aria-hidden="true"
          >
            <div className="steampunk-panel p-6 sm:p-7 rounded-lg border-2 border-transparent flex flex-col justify-between">
              <div className="brass-plate p-2.5 rounded mb-5">
                <span className="font-schematic text-[11px]">Patente: BR-UFS-0104-SI</span>
              </div>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold mb-2">Painel de Indicadores & Gestão de Dados</h3>
              <p className="text-xs font-schematic mb-4">Dashboard analítico com suporte a tomada de decisão</p>
              <p className="text-xs sm:text-sm font-body leading-relaxed mb-6">
                Plataforma interativa para consolidação de métricas, filtros em tempo real e visualização analítica desenvolvida com base nas competências de Sistemas de Informação.
              </p>
              <div className="mb-6">
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 text-[11px]">React</span>
                  <span className="px-2.5 py-1 text-[11px]">Tailwind CSS</span>
                  <span className="px-2.5 py-1 text-[11px]">JavaScript</span>
                </div>
              </div>
              <div className="pt-4 border-t border-transparent flex items-center justify-between">
                <div className="h-8"></div>
              </div>
            </div>
          </div>

          {/* Cartões dos Projetos Renderizados nas Posições Calculadas */}
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
                className={`absolute top-0 left-1/2 w-[90%] sm:w-[75%] md:w-[62%] lg:w-[50%] max-w-[560px] h-full transition-all duration-700 ease-out ${!isCenter ? 'cursor-pointer' : ''
                  }`}
              >
                {/* Camada Transparente de Clique para os Cartões Laterais */}
                {!isCenter && (
                  <div
                    className="absolute inset-0 z-30 rounded-lg hover:bg-black/10 transition-colors"
                    title={`Ver ${project.title}`}
                  />
                )}

                <div
                  key={isCenter ? `center-box-${currentIndex}` : `box-${project.id}`}
                  style={isCenter ? { transformOrigin: 'top center' } : undefined}
                  className={`steampunk-panel p-6 sm:p-7 rounded-lg border-2 transition-colors duration-500 flex flex-col justify-between h-full group relative ${isCenter
                    ? 'border-brass shadow-[0_0_35px_rgba(198,156,77,0.35)] animate-card-swing'
                    : 'border-brass-dark/50 hover:border-brass-dark'
                    }`}
                >
                  {/* Rebites estruturais nos 4 cantos */}
                  <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-brass-light border border-black shadow"></div>
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brass-light border border-black shadow"></div>
                  <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-brass-light border border-black shadow"></div>
                  <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-brass-light border border-black shadow"></div>

                  <div>
                    {/* Título do Projeto */}
                    <h3 className="font-cinzel text-lg sm:text-xl font-bold text-brass-light group-hover:text-brass-gradient transition-colors mb-2">
                      {project.title}
                    </h3>

                    {/* Tagline / Subtítulo */}
                    <p className="text-xs font-schematic text-copper-light mb-4">
                      {project.tagline}
                    </p>

                    {/* Descrição Detalhada */}
                    <p className="text-xs sm:text-sm text-[#cebeaa] font-body leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Tecnologias Utilizadas (Estilo Engrenagens / Tags de Metal) */}
                    <div className="mb-6">
                      <span className="text-[10px] font-schematic text-[#8f7d66] uppercase block mb-2 flex items-center gap-1">
                        <Layers className="w-3 h-3" />
                        Componentes Técnicos:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.techs.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-sm bg-[#221a13] border border-brass-dark/50 text-brass-light text-[11px] font-schematic"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Barra de Ações do Projeto */}
                  <div className="pt-4 border-t border-brass-dark/40 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-steampunk px-3.5 py-1.5 rounded text-xs font-schematic font-bold text-brass-light hover:text-white uppercase flex items-center gap-1.5"
                        title="Ver código no GitHub"
                      >
                        <GithubIcon className="w-4 h-4 text-copper-light" />
                        <span>GitHub</span>
                      </a>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-steampunk px-3.5 py-1.5 rounded text-xs font-schematic font-bold text-[#d8c8b4] hover:text-white uppercase flex items-center gap-1.5"
                          title="Ver protótipo ao vivo"
                        >
                          <ExternalLink className="w-4 h-4 text-brass-light" />
                          <span>Demonstração</span>
                        </a>
                      )}
                    </div>
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

          {/* A Caixa Bem Menor (Estilo madeira nobre encerada, tipo humidor/caixa de charuto vintage da foto) */}
          <div className="relative w-[230px] sm:w-[250px] bg-gradient-to-b from-[#3c2414] via-[#2c180d] to-[#1d0f07] border-2 border-[#6d4926] rounded-md shadow-[0_12px_25px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,200,120,0.35)] pt-2.5 pb-2 px-3">

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

            {/* Face Frontal da Caixa: Medidor de Vapor + Plaqueta + Engrenagens */}
            <div className="flex items-center justify-between gap-1.5">

              {/* Lado Esquerdo: Medidor de Pressão de Vapor (Manômetro Redondo) */}
              <div className="flex items-center gap-1" title="Manômetro de Pressão de Vapor">
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

                <span className="font-schematic text-[7px] text-copper-light font-bold uppercase tracking-tighter">
                  PSI
                </span>
              </div>

              {/* Centro: Plaquinha de latão gravada */}
              <div className="brass-plate px-1.5 py-0.5 rounded border border-brass-dark/70 text-center shadow-xs">
                <span className="font-schematic text-[8px] text-steamAmber-bright font-bold tracking-wider">
                  Ativo
                </span>
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

        {/* Rodapé da Seção com Botão para Perfil Geral do GitHub */}
        <div className="mt-14 text-center">
          <a
            href={profileData.social.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-steampunk inline-flex items-center gap-2 px-8 py-3.5 rounded text-xs sm:text-sm font-schematic font-bold text-brass-light hover:text-white uppercase tracking-wider shadow-lg group"
          >
            <GithubIcon className="w-5 h-5 text-copper-light group-hover:scale-110 transition-transform" />
            <span>Explorar Todos os Repositórios no GitHub</span>
            <ExternalLink className="w-4 h-4 text-brass-light" />
          </a>
        </div>

      </div>
    </section>
  );
};
