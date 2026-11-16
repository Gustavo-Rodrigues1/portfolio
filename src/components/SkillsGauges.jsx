import React from 'react';
import { SteampunkGear } from './SteampunkGear';
import { SteampunkChain } from './SteampunkChain';
import { ChainedSkills } from './ChainedSkills';
import { ScrollReveal } from './ScrollReveal';

export const SkillsGauges = () => {
  return (
    <section
      id="habilidades"
      className="relative steampunk-bg-pattern border-b-2 border-brass-dark/60 overflow-hidden"
      style={{ paddingBottom: '64px' }}
    >
      {/* Engrenagem de fundo decorativa */}
      <div className="absolute -bottom-20 -left-20 pointer-events-none opacity-10">
        <SteampunkGear size={280} teeth={14} color="brass" speed="spin-reverse-slow" />
      </div>

      {/* Correntes decorativas de fundo */}
      <SteampunkChain
        className="left-[5%] sm:left-[10%]"
        angle={-18}
        direction="up"
        speed="slow"
        width={26}
        opacity={0.22}
      />
      <SteampunkChain
        className="right-[6%] sm:right-[12%]"
        angle={15}
        direction="down"
        speed="normal"
        width={28}
        opacity={0.24}
      />

      {/* ── Cabeçalho ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <ScrollReveal delay={0} distance={28} className="text-center max-w-3xl mx-auto">
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-brass-gradient tracking-wide mb-4">
            Habilidades &amp; Tecnologias
          </h2>

          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-12 bg-brass/60"></span>
            <span className="text-copper-light text-xs font-schematic uppercase tracking-widest">
              Insígnias de Domínio Técnico
            </span>
            <span className="h-px w-12 bg-brass/60"></span>
          </div>

          <p className="text-[#c5b59e] text-sm sm:text-base leading-relaxed">
            Ferramentas, linguagens e tecnologias aplicadas na construção de soluções modernas,
            automação de processos analíticos e suporte de infraestrutura.
          </p>
        </ScrollReveal>
      </div>

      {/* ── Correntes com Skills ──
           Largura restrita ao max-w-3xl (mesma do parágrafo de texto),
           centralizada. O mask-image faz as correntes "surgirem" da borda. */}
      <ScrollReveal delay={180} distance={32} className="relative z-10 max-w-3xl mx-auto w-full px-2">
        <ChainedSkills />
      </ScrollReveal>
    </section>
  );
};
