import React, { useState } from 'react';
import { profileData } from '../data/profile';
import { SteampunkGear } from './SteampunkGear';
import { SteampunkChain } from './SteampunkChain';
import { SteampunkPortholeFrame } from './SteampunkPortholeFrame';
import { ScrollReveal } from './ScrollReveal';
import {
  GraduationCap,
  Briefcase,
  Building2,
  Calendar,
  MapPin,
  Award,
  Code2,
  Database,
  ShieldCheck,
  Workflow,
  Sparkles,
  Camera,
  Compass,
  ArrowRight
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

  const interestPillars = [
    {
      title: "Engenharia de Software & Web",
      desc: "Construção de aplicações completas, responsivas e performáticas com React, Tailwind CSS, JavaScript e TypeScript.",
      icon: Code2,
      color: "text-brass-light"
    },
    {
      title: "Backend, Python & Dados",
      desc: "Automação de rotinas, desenvolvimento de servidores com Django e manipulação analítica com SQL e PostgreSQL.",
      icon: Database,
      color: "text-copper-light"
    },
    {
      title: "Suporte & Infraestrutura de TI",
      desc: "Diagnóstico e manutenção de hardware e software, redes locais e garantia de continuidade operacional na SECOM.",
      icon: ShieldCheck,
      color: "text-steamAmber-bright"
    },
    {
      title: "DevOps & Ferramental Moderno",
      desc: "Controle rigoroso de versões com Git e GitHub, conteinerização ágil com Docker e prototipagem no Figma.",
      icon: Workflow,
      color: "text-brass"
    }
  ];

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

            {/* Pilares Acadêmicos e Áreas de Domínio */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-2">
              {interestPillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded bg-[#16110c]/85 border border-brass-dark/50 hover:border-brass-light/70 transition-all shadow-sm group/pillar"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <IconComponent className={`w-4 h-4 ${pillar.color} transition-transform group-hover/pillar:scale-110`} />
                      <h4 className="text-xs font-schematic font-bold text-brass-light">
                        {pillar.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-[#b8a791] font-light leading-snug">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>

          </ScrollReveal>

        </div>

        {/* ============================================================ */}
        {/* COMPLEMENTO: CERTIFICAÇÕES TÉCNICAS OFICIAIS                */}
        {/* ============================================================ */}
        {profileData.certifications && profileData.certifications.length > 0 && (
          <ScrollReveal delay={150} distance={24} className="mt-12 pt-8 border-t border-brass-dark/40">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-4 h-4 text-copper-light" />
              <span className="text-xs font-schematic uppercase tracking-widest text-copper-light font-bold">
                Certificações & Habilitações Oficiais
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              {profileData.certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded bg-[#18130e] border border-brass-dark/60 text-xs font-schematic text-brass-light hover:border-brass-light/80 transition-all shadow-sm"
                >
                  <Award className="w-4 h-4 text-steamAmber-glow flex-shrink-0" />
                  <div>
                    <span className="font-semibold block">{cert.name}</span>
                    <span className="text-[10px] text-copper-light block font-light">{cert.issuer}</span>
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
