import React, { useState } from 'react';
import { profileData } from '../data/profile';
import { SteampunkGear } from './SteampunkGear';
import { SteampunkChain } from './SteampunkChain';
import { SteampunkPortholeFrame } from './SteampunkPortholeFrame';
import { ScrollReveal } from './ScrollReveal';
import {
  Code2,
  Database,
  ShieldCheck,
  Workflow,
  Camera,
  Award
} from 'lucide-react';

export const AboutUFS = () => {
  const [photo, setPhoto] = useState(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhoto(url);
    }
  };

  return (
    <section
      id="sobre"
      className="relative py-28 bg-[#0e0c0a] border-b-2 border-brass-dark/60 overflow-hidden"
    >
      {/* Detalhes de Fundo com Engrenagens Steampunk */}
      <div className="absolute -top-16 right-0 opacity-10 pointer-events-none">
        <SteampunkGear size={260} teeth={14} color="brass" speed="spin-reverse-slow" />
      </div>
      <div className="absolute -bottom-20 -left-12 opacity-10 pointer-events-none">
        <SteampunkGear size={240} teeth={12} color="copper" speed="spin-slow" />
      </div>

      {/* Correntes de Metal de Fundo em Ângulos Diferentes (Subindo e Descendo) */}
      <SteampunkChain
        className="left-[6%] sm:left-[9%]"
        angle={20}
        direction="down"
        speed="slow"
        width={28}
        opacity={0.22}
      />
      <SteampunkChain
        className="right-[7%] sm:right-[11%]"
        angle={-16}
        direction="up"
        speed="normal"
        width={30}
        opacity={0.25}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ============================================================ */}
        {/* CABEÇALHO DA SEÇÃO: SOBRE MIM                                */}
        {/* ============================================================ */}
        <ScrollReveal delay={0} distance={28} className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-brass-gradient tracking-wide mb-4">
            Sobre Mim
          </h2>

          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-12 bg-brass/60"></span>
            <span className="text-copper-light text-xs font-schematic uppercase tracking-widest">
              Trajetória, Habilidades & Interesses
            </span>
            <span className="h-px w-12 bg-brass/60"></span>
          </div>

          <p className="text-[#c5b59e] text-sm sm:text-base leading-relaxed">
            Conheça minha jornada acadêmica na Universidade Federal de Sergipe, minha atuação prática
            no setor público e os interesses que impulsionam minha paixão por tecnologia.
          </p>
        </ScrollReveal>

        {/* ============================================================ */}
        {/* BLOCO PRINCIPAL: FOTO À ESQUERDA & TEXTO À DIREITA           */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start mb-20">

          {/* ---------------------------------------------------------- */}
          {/* LADO ESQUERDO: Apenas a Foto Redonda e Limpa               */}
          {/* ---------------------------------------------------------- */}
          <ScrollReveal
            variant="scale"
            delay={150}
            distance={28}
            className="lg:col-span-5 flex flex-col items-center justify-center sticky top-28 py-4"
          >
            <div className="relative w-64 h-64 sm:w-76 sm:h-76 md:w-80 md:h-80 flex items-center justify-center">

              {/* Brilho Suave Âmbar de Fundo */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-steamAmber-dim/20 via-brass/10 to-copper/20 blur-3xl pointer-events-none" />

              {/* Engrenagens Sutis em Volta para Manter a Estética Steampunk */}
              <div className="absolute -top-5 -left-5 pointer-events-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)] z-0 opacity-80">
                <SteampunkGear size={80} teeth={10} color="copper" speed="spin-slow" />
              </div>
              <div className="absolute -bottom-6 -right-6 pointer-events-none drop-shadow-[0_4px_14px_rgba(0,0,0,0.85)] z-0 opacity-85">
                <SteampunkGear size={92} teeth={12} color="brass" speed="spin-reverse-slow" />
              </div>

              {/* Moldura de Escotilha Submarina & Astrolábio com a Foto */}
              <SteampunkPortholeFrame
                sizeClassName="w-48 h-48 sm:w-56 sm:h-56 md:w-60 md:h-60"
                className="z-10"
              >
                <div className="relative w-full h-full rounded-full overflow-hidden group/photo cursor-pointer">
                  <img
                    src={photo || profileData.personal.avatar}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = profileData.personal.avatarFallback;
                    }}
                    alt={`Retrato de ${profileData.personal.name}`}
                    className="w-full h-full object-cover rounded-full group-hover/photo:scale-105 transition-transform duration-500"
                  />

                  {/* Overlay Interativo para Trocar Foto */}
                  <label
                    htmlFor="about-photo-input"
                    title="Clique para testar uma foto sua agora ou salve em public/foto-perfil.jpg"
                    className="absolute inset-0 rounded-full bg-black/65 opacity-0 group-hover/photo:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center cursor-pointer text-center p-4 z-20"
                  >
                    <Camera className="w-8 h-8 text-brass-light mb-1.5 animate-bounce" />
                    <span className="text-xs font-schematic font-bold text-brass-light">
                      Alterar Imagem
                    </span>
                    <span className="text-[10px] font-schematic text-[#cbba9d] mt-0.5">
                      foto-perfil.jpg
                    </span>
                  </label>

                  <input
                    id="about-photo-input"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>
              </SteampunkPortholeFrame>

            </div>
          </ScrollReveal>

          {/* ---------------------------------------------------------- */}
          {/* LADO DIREITO: Texto Resumindo Trajetória e Interesses      */}
          {/* ---------------------------------------------------------- */}
          <ScrollReveal
            delay={250}
            distance={32}
            className="lg:col-span-7 flex flex-col"
          >

            {/* Bloco 1: A Minha Trajetória */}
            <div className="mb-8">

              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-brass-light mb-4">
                Construindo Soluções através da Computação
              </h3>

              <div className="space-y-4 text-sm sm:text-base text-[#d8c8b4] font-light leading-relaxed">
                <p>
                  Minha jornada na tecnologia iniciou-se com uma curiosidade incessante por entender o funcionamento interno de sistemas, softwares e redes.
                  Atualmente, curso o <strong className="text-brass-light font-medium">Bacharelado em Sistemas de Informação na Universidade Federal de Sergipe (UFS)</strong>,
                  onde desenvolvo uma formação sólida que integra a lógica pura da Ciência da Computação às práticas de Engenharia de Software e governança tecnológica.
                </p>

                <p>
                  Busco continuamente aliar fundamentos teóricos a projetos práticos, aplicando linguagens modernas,
                  bancos de dados relacionais e metodologias ágeis de desenvolvimento para criar soluções escaláveis, intuitivas e eficientes.
                </p>
              </div>
            </div>

          </ScrollReveal>

        </div>

        {/* ============================================================ */}
        {/* COMPLEMENTO: CERTIFICAÇÕES TÉCNICAS OFICIAIS                */}
        {/* ============================================================ */}
        {profileData.certifications && profileData.certifications.length > 0 && (
          <ScrollReveal delay={150} distance={24} className="mt-14 pt-8 border-t border-brass-dark/40">
            <div className="flex items-center gap-2 mb-5">
              <Award className="w-4 h-4 text-copper-light" />
              <span className="text-xs font-schematic uppercase tracking-widest text-copper-light font-bold">
                Certificações &amp; Habilitações Oficiais
              </span>
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-3.5">
              {profileData.certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="relative px-4 py-3 rounded-xl sm:rounded-2xl border transition-all duration-300 flex items-center gap-3.5 group overflow-hidden bg-[#18130e]/95 backdrop-blur-md border-brass-light/75 shadow-[0_4px_16px_rgba(0,0,0,0.6)] hover:border-amber-300 hover:shadow-[0_0_24px_rgba(255,185,75,0.35)] hover:scale-[1.03] hover:-translate-y-1 select-none"
                >
                  {/* Efeito Contínuo de Reflexo Metálico Cintilante ao Passar o Cursor */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 overflow-hidden rounded-xl sm:rounded-2xl">
                    <div className="w-[130%] h-[220%] -top-[60%] absolute metallic-sheen-layer animate-metallic-sheen" />
                  </div>

                  {/* Formas Geométricas Orgânicas Decorativas que Deformam */}
                  <div className="absolute -top-8 -right-8 w-20 h-20 bg-gradient-to-br from-amber-400/[0.09] via-white/[0.03] to-transparent pointer-events-none blur-[1px] animate-morph-a opacity-70 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-tr from-copper-light/[0.07] to-transparent pointer-events-none blur-[1px] animate-morph-b opacity-60 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Ícone em Círculo Mecânico com Glow */}
                  <div className="relative z-10 w-8 h-8 rounded-full bg-[#201810] border border-brass-dark/70 flex items-center justify-center flex-shrink-0 group-hover:border-amber-400 group-hover:shadow-[0_0_12px_rgba(255,190,91,0.5)] transition-all duration-300">
                    <Award className="w-4 h-4 text-steamAmber-glow group-hover:scale-110 group-hover:text-amber-300 transition-transform" />
                  </div>

                  {/* Nome do Certificado e Emissor */}
                  <div className="relative z-10">
                    <span className="font-body font-semibold text-xs sm:text-sm text-[#f5ecd5] group-hover:text-amber-300 transition-colors block leading-tight">
                      {cert.name}
                    </span>
                    <span className="font-schematic text-[11px] text-[#cbba9d] mt-0.5 block font-light">
                      {cert.issuer}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        )}

      </div>
    </section>
  );
};

export const Experience = AboutUFS;
export const AboutMe = AboutUFS;
