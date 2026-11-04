import React, { useState } from 'react';
import { SteampunkGear } from './SteampunkGear';
import { SteampunkChain } from './SteampunkChain';
import { profileData } from '../data/profile';
import { Camera } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export const Hero = () => {
  const [userPhoto, setUserPhoto] = useState(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUserPhoto(url);
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
          {/* LADO ESQUERDO: Saudação em Português + Nome + 2 Frases       */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">

            {/* Linha Superior: Saudação em Português com Emoji de Aceno */}
            <div className="flex items-center gap-2.5 mb-2 sm:mb-3">
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

            {/* Nome Gigante com Gradiente Metálico e Ponto Marcante */}
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none mb-5 mt-6 sm:mt-8 font-body">
              <span className="relative inline-block">

                {/* Cartola Steampunk fiel ao modelo: feltro escuro, aba larga, faixa vermelha, óculos de latão */}
                <span
                  className="absolute pointer-events-none"
                  style={{
                    bottom: '68%',
                    left: '-0.04em',
                    width: '0.9em',
                    height: 'auto',
                    zIndex: 1,
                    transform: 'rotate(-10deg)',
                    transformOrigin: 'bottom center',
                  }}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 140 95" fill="none" xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-[0_8px_28px_rgba(0,0,0,0.95)]">
                    <defs>
                      {/* Feltro escuro do corpo */}
                      <linearGradient id="hh-crown" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#141618" />
                        <stop offset="10%" stopColor="#22272a" />
                        <stop offset="48%" stopColor="#2c3135" />
                        <stop offset="88%" stopColor="#22272a" />
                        <stop offset="100%" stopColor="#141618" />
                      </linearGradient>
                      {/* Aba superior */}
                      <linearGradient id="hh-brim" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2c3135" />
                        <stop offset="100%" stopColor="#161819" />
                      </linearGradient>
                      {/* Vidro óculos esquerdo */}
                      <radialGradient id="hh-gl" cx="32%" cy="32%" r="62%">
                        <stop offset="0%" stopColor="#d4eef8" stopOpacity="0.80" />
                        <stop offset="45%" stopColor="#7ab4cc" stopOpacity="0.60" />
                        <stop offset="100%" stopColor="#1a4a5e" stopOpacity="0.88" />
                      </radialGradient>
                      {/* Vidro óculos direito */}
                      <radialGradient id="hh-gr" cx="32%" cy="32%" r="62%">
                        <stop offset="0%" stopColor="#c8e8f4" stopOpacity="0.72" />
                        <stop offset="45%" stopColor="#68a8c0" stopOpacity="0.55" />
                        <stop offset="100%" stopColor="#16404e" stopOpacity="0.88" />
                      </radialGradient>
                    </defs>

                    {/* ── Sombra projetada da aba ── */}
                    <ellipse cx="70" cy="81" rx="66" ry="7" fill="#060708" opacity="0.55" />

                    {/* ── Aba frontal (face de baixo) ── */}
                    <ellipse cx="70" cy="78" rx="66" ry="8" fill="#161819" />

                    {/* ── Aba superior (face de cima) ── */}
                    <ellipse cx="70" cy="73" rx="66" ry="8"
                      fill="url(#hh-brim)" stroke="#0e1012" strokeWidth="0.8" />

                    {/* Curvatura lateral da aba (ligeiro upturn como no modelo) */}
                    <path d="M 4 73 Q 2 68 8 64" stroke="#0e1012" strokeWidth="2" fill="none" strokeLinecap="round" />
                    <path d="M 136 73 Q 138 68 132 64" stroke="#0e1012" strokeWidth="2" fill="none" strokeLinecap="round" />

                    {/* ── Corpo da copa (feltro alto e cilíndrico) ── */}
                    <path d="M 36 73 L 36 12 Q 36 4 70 4 Q 104 4 104 12 L 104 73 Z"
                      fill="url(#hh-crown)" />

                    {/* Topo da copa */}
                    <ellipse cx="70" cy="9" rx="34" ry="6.5" fill="#2c3135" />
                    <ellipse cx="70" cy="8" rx="30" ry="4.5" fill="#343b3f" opacity="0.7" />

                    {/* Sombra lateral interna (profundidade) */}
                    <rect x="36" y="12" width="9" height="61" fill="#060708" opacity="0.30" />
                    <rect x="95" y="12" width="9" height="61" fill="#060708" opacity="0.18" />

                    {/* Brilho sutil no feltro */}
                    <rect x="38" y="14" width="5" height="54" rx="2.5" fill="white" opacity="0.035" />

                    {/* ── Faixa vermelha (como no modelo) ── */}
                    <rect x="36" y="57" width="68" height="16" fill="#9a1818" />
                    <rect x="36" y="57" width="68" height="6" fill="#cc2828" />
                    <rect x="36" y="63" width="68" height="3" fill="#7a0f0f" />
                    <rect x="36" y="66" width="68" height="7" fill="#8c1616" />

                    {/* ── Correia de couro dos óculos ── */}
                    <rect x="24" y="61" width="92" height="7" rx="3.5" fill="#4a2e10" opacity="0.92" />
                    <rect x="24" y="62" width="92" height="2" rx="1" fill="#6a4218" opacity="0.6" />

                    {/* ════ ÓCULOS ESQUERDO (maior, mais à frente) ════ */}
                    {/* Anel externo de latão */}
                    <circle cx="56" cy="65" r="14" fill="#c8901c" />
                    <circle cx="56" cy="65" r="14" fill="none" stroke="#f0c840" strokeWidth="2" />
                    {/* Couro marrom */}
                    <circle cx="56" cy="65" r="11.2" fill="#7e4418" />
                    {/* Anel interno de latão */}
                    <circle cx="56" cy="65" r="9" fill="#b07818" />
                    <circle cx="56" cy="65" r="9" fill="none" stroke="#e8b830" strokeWidth="1.2" />
                    {/* Vidro */}
                    <circle cx="56" cy="65" r="7.2" fill="url(#hh-gl)" />
                    {/* Reflexo */}
                    <ellipse cx="52.5" cy="61.5" rx="2.4" ry="1.4" fill="white" opacity="0.5"
                      transform="rotate(-30 52.5 61.5)" />
                    {/* Parafusos / rebites */}
                    <circle cx="56" cy="52" r="1.7" fill="#f0c840" stroke="#a07018" strokeWidth="0.6" />
                    <circle cx="56" cy="78" r="1.7" fill="#f0c840" stroke="#a07018" strokeWidth="0.6" />
                    <circle cx="43" cy="65" r="1.7" fill="#f0c840" stroke="#a07018" strokeWidth="0.6" />
                    <circle cx="69" cy="65" r="1.7" fill="#f0c840" stroke="#a07018" strokeWidth="0.6" />
                    {/* Mini engrenagem (canto inferior esquerdo) */}
                    <circle cx="46" cy="72" r="4" fill="#c8901c" stroke="#f0c840" strokeWidth="0.8" />
                    <circle cx="46" cy="72" r="2.2" fill="#141618" />
                    <circle cx="46" cy="68" r="1" fill="#c8901c" />
                    <circle cx="46" cy="76" r="1" fill="#c8901c" />
                    <circle cx="42" cy="72" r="1" fill="#c8901c" />
                    <circle cx="50" cy="72" r="1" fill="#c8901c" />

                    {/* ════ ÓCULOS DIREITO (ligeiramente menor, meia-perspectiva) ════ */}
                    {/* Anel externo */}
                    <circle cx="86" cy="65" r="12" fill="#b07818" />
                    <circle cx="86" cy="65" r="12" fill="none" stroke="#d8a828" strokeWidth="1.8" />
                    {/* Couro */}
                    <circle cx="86" cy="65" r="9.5" fill="#6a3a14" />
                    {/* Anel interno */}
                    <circle cx="86" cy="65" r="7.6" fill="#9a6810" />
                    <circle cx="86" cy="65" r="7.6" fill="none" stroke="#d8a828" strokeWidth="1" />
                    {/* Vidro */}
                    <circle cx="86" cy="65" r="6" fill="url(#hh-gr)" />
                    {/* Reflexo */}
                    <ellipse cx="83" cy="62" rx="2" ry="1.2" fill="white" opacity="0.42"
                      transform="rotate(-30 83 62)" />
                    {/* Parafusos */}
                    <circle cx="86" cy="54" r="1.4" fill="#d8a828" stroke="#906010" strokeWidth="0.5" />
                    <circle cx="86" cy="76" r="1.4" fill="#d8a828" stroke="#906010" strokeWidth="0.5" />
                    <circle cx="75" cy="65" r="1.4" fill="#d8a828" stroke="#906010" strokeWidth="0.5" />
                    <circle cx="97" cy="65" r="1.4" fill="#d8a828" stroke="#906010" strokeWidth="0.5" />
                  </svg>
                </span>

                <span className="bg-gradient-to-r from-[#ffd978] via-[#e59834] to-[#c85a17] bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(245,158,11,0.45)]">
                  Gustavo
                </span>
              </span>
              <span className="text-copper-light drop-shadow-[0_0_20px_#e0985c]">.</span>
            </h1>


            {/* Frases de Destaque em Português */}
            <div className="space-y-1.5 sm:space-y-2 mb-8 sm:mb-9 text-lg sm:text-2xl lg:text-[1.65rem] text-[#d8c8b4] font-body leading-snug">
              <p className="font-normal text-[#f5ecd5]">
                Sou Desenvolvedor Full Stack & Estudante de Sistemas de Informação.
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
            <div className="flex items-center gap-4">
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

              {/* Trilho Circular de Cremalheira Sutil ao Redor da Foto */}
              <div className="absolute inset-[-14px] sm:inset-[-18px] rounded-full border border-dashed border-brass-dark/40 pointer-events-none opacity-60" />

              {/* Apenas a Foto Redonda e Limpa */}
              <div className="relative w-64 h-64 sm:w-76 sm:h-76 md:w-84 md:h-84 lg:w-92 lg:h-92 rounded-full overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.95)] group/photo cursor-pointer z-10">
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

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
