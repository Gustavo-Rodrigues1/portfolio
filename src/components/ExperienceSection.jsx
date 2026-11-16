import React from 'react';
import { profileData } from '../data/profile';
import { SteampunkGear } from './SteampunkGear';
import { SteampunkChain } from './SteampunkChain';
import { ScrollReveal } from './ScrollReveal';
import { Briefcase, Building2, Calendar, MapPin, Award, CheckCircle2 } from 'lucide-react';

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

    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

      {/* ════ Cabeçalho da Seção de Experiência ════ */}
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
      <div className="max-w-4xl mx-auto relative mb-24">

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

      {/* ════ Certificados & Habilitações Oficiais (Design do Card do Carrossel) ════ */}
      {profileData.certifications && profileData.certifications.length > 0 && (
        <div className="mt-20 pt-16 border-t-2 border-brass-dark/40">
          <ScrollReveal delay={0} distance={28} className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-[#1c140d] border border-brass-dark/80 shadow-[0_0_15px_rgba(255,157,46,0.3)] mb-4">
              <Award className="w-6 h-6 text-steamAmber-glow" />
            </div>

            <h3 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold text-brass-gradient tracking-wide mb-3">
              Certificações &amp; Habilitações Oficiais
            </h3>

            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-12 bg-brass/60" />
              <span className="text-copper-light text-xs font-schematic uppercase tracking-widest">
                Atestados Técnicos &amp; Domínio de Ferramentas
              </span>
              <span className="h-px w-12 bg-brass/60" />
            </div>

            <p className="text-[#c5b59e] text-sm sm:text-base leading-relaxed">
              Credenciais e certificados técnicos que comprovam dedicação contínua ao aprimoramento prático e excelência em engenharia e dados.
            </p>
          </ScrollReveal>

          {/* Grade de Cards com Modelo do Carrossel de Projetos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {profileData.certifications.map((cert, idx) => (
              <ScrollReveal key={idx} delay={idx * 110} distance={24} className="h-full">
                <div className="p-6 sm:p-7 rounded-2xl sm:rounded-3xl border transition-all duration-500 flex flex-col justify-between h-full group relative overflow-hidden shadow-2xl hover:scale-[1.03] hover:-translate-y-2 bg-[#18130e]/95 backdrop-blur-md border-brass-light/80 shadow-[0_0_35px_rgba(255,157,46,0.22)] hover:border-amber-300 hover:shadow-[0_0_48px_rgba(255,185,75,0.4)]">

                  {/* Efeito Contínuo de Reflexo Metálico Cintilante ao Passar o Cursor */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 overflow-hidden">
                    <div className="w-[130%] h-[220%] -top-[60%] absolute metallic-sheen-layer animate-metallic-sheen" />
                  </div>

                  {/* Formas Geométricas Orgânicas Decorativas que Deformam e Mudam de Forma */}
                  <div className="absolute -top-14 -right-14 w-44 h-44 bg-gradient-to-br from-amber-400/[0.09] via-white/[0.04] to-transparent pointer-events-none blur-[1px] animate-morph-a opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute -bottom-10 -right-8 w-36 h-36 bg-gradient-to-tr from-copper-light/[0.07] via-brass-light/[0.03] to-transparent pointer-events-none blur-[1px] animate-morph-b opacity-70 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute top-1/3 -left-10 w-28 h-28 bg-gradient-to-r from-steamAmber-bright/[0.06] to-transparent pointer-events-none blur-[2px] animate-morph-c opacity-60 group-hover:opacity-90 transition-opacity duration-700" />

                  <div className="relative z-10">
                    {/* Badge da Categoria / Emissor no topo */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3.5 py-1.5 rounded-full text-xs font-body font-semibold bg-[#241e17] border border-brass-dark/50 text-[#e4d7c5] group-hover:text-amber-200 group-hover:border-amber-400 group-hover:bg-[#2e2319] group-hover:shadow-[0_0_16px_rgba(255,190,91,0.7)] group-hover:scale-105 transition-all duration-300 cursor-default select-none">
                        {cert.issuer}
                      </span>

                      <div className="w-8 h-8 rounded-full bg-[#201810] border border-brass-dark/70 flex items-center justify-center group-hover:border-amber-400 group-hover:shadow-[0_0_12px_rgba(255,190,91,0.5)] transition-all duration-300">
                        <Award className="w-4 h-4 text-steamAmber-glow group-hover:scale-110 group-hover:text-amber-300 transition-transform" />
                      </div>
                    </div>

                    {/* Título Principal do Certificado */}
                    <h4 className="font-body text-xl sm:text-2xl font-bold text-[#f5ecd5] tracking-tight group-hover:text-amber-300 transition-colors mb-2">
                      {cert.name}
                    </h4>

                    <p className="font-body text-xs sm:text-[13px] text-[#b8a793] leading-relaxed mb-6">
                      Habilitação técnica com validação prática de conceitos, domínio de fluxo e aplicação em projetos reais.
                    </p>
                  </div>

                  {/* Linha Divisória e Rodapé com Selo de Validação */}
                  <div className="pt-4 sm:pt-5 border-t border-brass-dark/30 flex items-center justify-between mt-auto relative z-10">
                    <span className="flex items-center gap-1.5 text-xs font-schematic text-steamAmber-bright">
                      <CheckCircle2 className="w-4 h-4 text-steamAmber-bright" />
                      <span>Certificação Homologada</span>
                    </span>

                    <span className="font-schematic text-[11px] text-brass-dark font-mono font-bold">
                      CERT-0{idx + 1}
                    </span>
                  </div>

                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      )}

    </div>
  </section>
);
