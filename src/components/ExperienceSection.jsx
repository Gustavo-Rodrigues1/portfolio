import React from 'react';
import { profileData } from '../data/profile';
import { SteampunkGear } from './SteampunkGear';
import { SteampunkChain } from './SteampunkChain';
import { ScrollReveal } from './ScrollReveal';
import { Briefcase, Building2, Calendar, MapPin } from 'lucide-react';

// Descrições curtas por empresa para a trilha
const EXPERIENCE_SUMMARIES = {
  "Governo de Sergipe - Secretaria de Estado da Comunicação Social (SECOM)": {
    summary: "Suporte técnico N1/N2 a servidores públicos — diagnóstico, manutenção de hardware, configuração de redes, atendimento a chamados e sustentação da infraestrutura de TI da secretaria.",
    accentColor: "#f59e0b",   // amber
    glowColor: "rgba(245,158,11,0.55)",
    trackColor: "rgba(245,158,11,0.35)",
  },
  "Moura Dubeux": {
    summary: "Manipulação e validação de relatórios analíticos com Excel avançado e SAD, controle de suprimentos e intermediação de informações entre setores corporativos.",
    accentColor: "#c69c4d",   // brass
    glowColor: "rgba(198,156,77,0.45)",
    trackColor: "rgba(198,156,77,0.25)",
  },
};

export const ExperienceSection = () => (
  <section
    id="experiencia"
    className="relative py-28 steampunk-bg-pattern border-b-2 border-brass-dark/60 overflow-hidden"
  >
    {/* Engrenagens de Fundo */}
    <div className="absolute -top-16 -left-12 pointer-events-none opacity-10">
      <SteampunkGear size={280} teeth={14} color="brass" speed="spin-slow" />
    </div>
    <div className="absolute -bottom-20 -right-12 pointer-events-none opacity-10">
      <SteampunkGear size={300} teeth={16} color="copper" speed="spin-reverse-slow" />
    </div>

    {/* Correntes Metálicas */}
    <SteampunkChain
      className="left-[4%] sm:left-[8%]"
      angle={-14}
      direction="up"
      speed="slow"
      width={26}
      opacity={0.2}
    />
    <SteampunkChain
      className="right-[5%] sm:right-[9%]"
      angle={16}
      direction="down"
      speed="normal"
      width={28}
      opacity={0.22}
    />

    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

      {/* ════ Cabeçalho ════ */}
      <ScrollReveal delay={0} distance={28} className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-[#1c140d] border border-brass-dark/80 shadow-[0_0_15px_rgba(255,157,46,0.3)] mb-4">
          <Briefcase className="w-6 h-6 text-steamAmber-glow" />
        </div>

        <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-brass-gradient tracking-wide mb-4">
          Experiência Profissional
        </h2>

        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="h-px w-12 bg-brass/60" />
          <span className="text-copper-light text-xs font-schematic uppercase tracking-widest">
            Registros de Ofício &amp; Atuação Prática
          </span>
          <span className="h-px w-12 bg-brass/60" />
        </div>

        <p className="text-[#c5b59e] text-sm sm:text-base leading-relaxed">
          Histórico de atuação profissional, papéis desempenhados e contribuições práticas
          no suporte de tecnologia da informação e análise operacional.
        </p>
      </ScrollReveal>

      {/* ════ Trilha de Experiências ════ */}
      <div className="relative">

        {/* Linha vertical da trilha */}
        <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-brass/50 via-brass-dark/40 to-transparent" />

        <div className="space-y-14">
          {profileData.experiences.map((exp, idx) => {
            const extra = EXPERIENCE_SUMMARIES[exp.company] || {
              summary: exp.description,
              accentColor: "#c69c4d",
              glowColor: "rgba(198,156,77,0.4)",
              trackColor: "rgba(198,156,77,0.2)",
            };

            return (
              <ScrollReveal key={idx} delay={idx * 180} distance={30}>
                <div className="relative flex gap-6 sm:gap-10 items-start group">

                  {/* ── Esfera da Trilha ── */}
                  <div className="relative flex-shrink-0 flex flex-col items-center" style={{ width: '48px' }}>

                    {/* Esfera principal */}
                    <div
                      className="relative w-12 h-12 rounded-full flex items-center justify-center z-10"
                      style={{
                        background: `radial-gradient(circle at 35% 35%, #3a2e1a, #1a1208)`,
                        border: `2px solid ${extra.accentColor}`,
                        boxShadow: exp.current
                          ? `0 0 0 4px ${extra.trackColor}, 0 0 20px ${extra.glowColor}, 0 0 40px ${extra.glowColor}`
                          : `0 0 8px ${extra.glowColor}`,
                      }}
                    >
                      {/* Núcleo brilhante */}
                      <div
                        className={`w-4 h-4 rounded-full${exp.current ? ' animate-pulse' : ''}`}
                        style={{
                          background: `radial-gradient(circle at 35% 35%, #fff8e0, ${extra.accentColor})`,
                          boxShadow: `0 0 10px ${extra.glowColor}`,
                        }}
                      />

                      {/* Anel pulsante externo — apenas no atual */}
                      {exp.current && (
                        <span
                          className="absolute inset-0 rounded-full animate-ping"
                          style={{
                            border: `1.5px solid ${extra.accentColor}`,
                            opacity: 0.5,
                          }}
                        />
                      )}
                    </div>

                    {/* Conector inferior (exceto no último) */}
                    {idx < profileData.experiences.length - 1 && (
                      <div
                        className="absolute top-12 w-px flex-1"
                        style={{
                          height: '56px',
                          background: `linear-gradient(to bottom, ${extra.accentColor}60, transparent)`,
                        }}
                      />
                    )}
                  </div>

                  {/* ── Conteúdo da Experiência ── */}
                  <div className="flex-1 pb-2">

                    {/* Modalidade (tipo) — topo */}
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className="text-[10px] font-schematic uppercase tracking-widest px-2.5 py-0.5 rounded-full border font-bold"
                        style={{
                          color: extra.accentColor,
                          borderColor: `${extra.accentColor}70`,
                          background: `${extra.accentColor}12`,
                        }}
                      >
                        {exp.type}
                      </span>

                      {exp.current && (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-schematic uppercase tracking-wider text-amber-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                          Em Atividade
                        </span>
                      )}
                    </div>

                    {/* Cargo — destaque principal */}
                    <h3
                      className="font-cinzel text-xl sm:text-2xl font-bold mb-1 transition-colors duration-300"
                      style={{ color: extra.accentColor }}
                    >
                      {exp.role}
                    </h3>

                    {/* Empresa */}
                    <div className="flex items-center gap-1.5 text-sm font-schematic text-[#cbba9d] mb-1">
                      <Building2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: extra.accentColor }} />
                      <span className="font-medium">{exp.company}</span>
                    </div>

                    {/* Período e Localidade */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-schematic text-[#9a8878] mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" style={{ color: extra.accentColor + 'aa' }} />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" style={{ color: extra.accentColor + 'aa' }} />
                        {exp.location}
                      </span>
                    </div>

                    {/* Descrição */}
                    <p className="text-[#c5b59e] text-sm leading-relaxed border-l-2 pl-4"
                      style={{ borderColor: `${extra.accentColor}50` }}
                    >
                      {extra.summary}
                    </p>

                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

    </div>
  </section>
);
