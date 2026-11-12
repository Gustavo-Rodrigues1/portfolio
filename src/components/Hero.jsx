import React, { useState } from 'react';
import { SteampunkGear } from './SteampunkGear';
import { SteampunkChain } from './SteampunkChain';
import { SteampunkPortholeFrame } from './SteampunkPortholeFrame';
import { profileData } from '../data/profile';
import { Camera } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { SteampunkTopHat } from './HeroAnimatedText';

export const Hero = () => {
  const [userPhoto, setUserPhoto] = useState(null);
  // 'intro' (warmup inicial) | 'flipping' (salto mortal no clique) | 'idle' (repouso perfeitamente visível)
  const [hatMode, setHatMode] = useState('intro');

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUserPhoto(url);
    }
  };

  const handleHatClick = () => {
    // Dispara o salto mortal suave sem risco de sumir
    setHatMode('idle');
    requestAnimationFrame(() => {
      setHatMode('flipping');
    });
  };

  const handleHatAnimationEnd = (e) => {
    // Interrompe apenas no elemento principal do chapéu (evita bubbling indesejado)
    if (e.target === e.currentTarget) {
      setHatMode('idle');
    }
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: GithubIcon,
      url: profileData.social.github.url,
      label: 'Acessar GitHub de Gustavo',
    },
    {
      name: 'LinkedIn',
      icon: LinkedinIcon,
      url: profileData.social.linkedin.url,
      label: 'Acessar LinkedIn de Gustavo',
    },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] pt-32 pb-20 flex items-center justify-center overflow-hidden steampunk-bg-pattern border-b-2 border-brass-dark/60"
    >
      {/* Engrenagens de Fundo Distantes (Aura Steampunk Industrial) */}
      <div className="absolute top-10 -left-28 pointer-events-none opacity-15">
        <SteampunkGear size={320} teeth={16} color="brass" speed="spin-slow" />
      </div>
      <div className="absolute -bottom-28 -right-24 pointer-events-none opacity-15">
        <SteampunkGear size={360} teeth={18} color="copper" speed="spin-reverse-slow" />
      </div>

      {/* Correntes de Metal de Fundo em Ângulos Diferentes (Subindo e Descendo) */}
      <SteampunkChain
        className="left-[4%] sm:left-[8%]"
        angle={-15}
        direction="up"
        speed="slow"
        width={30}
        opacity={0.24}
      />
      <SteampunkChain
        className="right-[5%] sm:right-[10%]"
        angle={18}
        direction="down"
        speed="normal"
        width={32}
        opacity={0.26}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* ============================================================ */}
          {/* LADO ESQUERDO: Saudação + Nome Térmico + Cartola Interativa  */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 flex flex-col items-start text-left select-none">

            {/* Linha Superior: Saudação com delay suave */}
            <div className="flex items-center gap-2.5 mb-2 sm:mb-3 animate-heat-header">
              <span className="text-xl sm:text-2xl lg:text-3xl text-[#f3dec3] font-medium font-body tracking-tight">
                Olá
              </span>
              <span className="animate-wave text-2xl sm:text-3xl inline-block select-none" role="img" aria-label="Aceno">
                👋
              </span>
              <span className="text-xl sm:text-2xl lg:text-3xl text-[#f3dec3] font-medium font-body tracking-tight">
                Meu nome é
              </span>
            </div>

            {/* Nome com Efeito Térmico + Cartola Acrobática */}
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none mb-5 mt-6 sm:mt-8 font-body">
              <span className="relative inline-block animate-filament-glow">
                {/* Cartola Steampunk interativa: salto suave no ar sem sumir ou travar */}
                <SteampunkTopHat
                  onClick={handleHatClick}
                  onAnimationEnd={handleHatAnimationEnd}
                  className={
                    hatMode === 'intro'
                      ? 'animate-hat-intro'
                      : hatMode === 'flipping'
                      ? 'animate-hat-flip'
                      : ''
                  }
                  style={
                    hatMode === 'idle'
                      ? { transform: 'rotate(0deg)', opacity: 1 }
                      : undefined
                  }
                />

                <span className="bg-gradient-to-r from-[#ffd978] via-[#e59834] to-[#c85a17] bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(245,158,11,0.45)]">
                  Gustavo
                </span>
              </span>
              <span className="text-copper-light drop-shadow-[0_0_20px_#e0985c] inline-block animate-heat-dot">.</span>
            </h1>

            {/* Frases de Destaque com surgimento térmico sincronizado */}
            <div className="space-y-1.5 sm:space-y-2 mb-8 sm:mb-9 text-lg sm:text-2xl lg:text-[1.65rem] text-[#d8c8b4] font-body leading-snug animate-heat-subtitles">
              <p className="font-normal text-[#f5ecd5]">
                Sou Desenvolvedor Full Stack &amp; Estudante de Sistemas de Informação.
              </p>
              <p className="font-normal text-[#c7b49d]">
                Eu crio{' '}
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-brass-light via-steamAmber-bright to-copper-light drop-shadow-[0_0_12px_rgba(255,190,91,0.5)]">
                  Projetos Incríveis
                </span>{' '}
                na Web e Sistemas.
              </p>
            </div>

            {/* Apenas GitHub e LinkedIn */}
            <div className="flex items-center gap-4 animate-heat-subtitles">
              {socialLinks.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    title={item.label}
                    className="w-12 h-12 rounded-full bg-[#18120c] border border-brass-dark/80 text-[#e8dcce] hover:text-white hover:border-brass-light hover:bg-[#281b10] hover:shadow-[0_0_16px_rgba(241,210,137,0.45)] flex items-center justify-center transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <IconComponent className="w-5 h-5 transition-transform group-hover:scale-110 text-[#d8c8b4] group-hover:text-brass-light" />
                  </a>
                );
              })}
            </div>

          </div>

          {/* ============================================================ */}
          {/* LADO DIREITO: FOTO REDONDA COM ENGRENAGENS MECÂNICAS AO REDOR */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 flex items-center justify-center relative w-full py-8 lg:py-0">

            {/* Container Central da Foto com Engrenagens Conectadas */}
            <div className="relative w-72 h-72 sm:w-84 sm:h-84 md:w-92 md:h-92 lg:w-[380px] lg:h-[380px] flex items-center justify-center">

              {/* Brilho de Vapor Âmbar ao Fundo */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-steamAmber-dim/25 via-brass/15 to-copper/25 blur-3xl pointer-events-none" />

              {/* 1. Engrenagem Superior Direita (Latão) */}
              <div className="absolute -top-7 -right-7 sm:-top-9 sm:-right-9 pointer-events-none drop-shadow-[0_6px_18px_rgba(0,0,0,0.9)] z-20">
                <SteampunkGear size={110} teeth={12} color="brass" speed="spin-slow" />
              </div>

              {/* 2. Engrenagem Inferior Esquerda (Cobre) */}
              <div className="absolute -bottom-8 -left-8 sm:-bottom-10 sm:-left-10 pointer-events-none drop-shadow-[0_6px_18px_rgba(0,0,0,0.9)] z-20">
                <SteampunkGear size={125} teeth={14} color="copper" speed="spin-reverse-slow" />
              </div>

              {/* 3. Engrenagem Superior Esquerda (Ferro Forjado) */}
              <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 pointer-events-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)] z-0 opacity-80">
                <SteampunkGear size={78} teeth={10} color="iron" speed="spin-medium" />
              </div>

              {/* 4. Engrenagem Inferior Direita (Latão Polido) */}
              <div className="absolute -bottom-5 -right-5 sm:-bottom-6 sm:-right-6 pointer-events-none drop-shadow-[0_4px_14px_rgba(0,0,0,0.85)] z-0 opacity-85">
                <SteampunkGear size={88} teeth={10} color="brass" speed="spin-reverse-slow" />
              </div>

              {/* Moldura de Escotilha Submarina & Astrolábio com a Foto */}
              <SteampunkPortholeFrame
                sizeClassName="w-52 h-52 sm:w-60 sm:h-60 md:w-68 md:h-68 lg:w-[280px] lg:h-[280px]"
                className="z-10"
              >
                <div className="relative w-full h-full rounded-full overflow-hidden group/photo cursor-pointer">
                  <img
                    src={userPhoto || profileData.personal.avatar}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = profileData.personal.avatarFallback;
                    }}
                    alt={`Foto de ${profileData.personal.name}`}
                    className="w-full h-full object-cover rounded-full group-hover/photo:scale-105 transition-transform duration-500"
                  />

                  {/* Overlay Interativo para Trocar/Testar Foto */}
                  <label
                    htmlFor="hero-round-photo-input"
                    title="Clique para testar uma foto sua agora ou salve em public/foto-perfil.jpg"
                    className="absolute inset-0 rounded-full bg-black/65 opacity-0 group-hover/photo:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center cursor-pointer text-center p-4 z-30"
                  >
                    <Camera className="w-8 h-8 text-brass-light mb-1.5 animate-bounce" />
                    <span className="text-xs sm:text-sm font-schematic font-bold text-brass-light">
                      Atualizar Foto
                    </span>
                    <span className="text-[10px] sm:text-xs font-schematic text-[#cbba9d] mt-1 max-w-[200px]">
                      Clique para escolher imagem
                    </span>
                  </label>

                  <input
                    id="hero-round-photo-input"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>
              </SteampunkPortholeFrame>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
