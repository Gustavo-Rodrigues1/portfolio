import React from 'react';
import { profileData } from '../data/profile';
import { SteampunkGear } from './SteampunkGear';
import { SteampunkChain } from './SteampunkChain';
import { ScrollReveal } from './ScrollReveal';
import {
  Briefcase,
  Building2,
  Calendar,
  MapPin,
  Sparkles,
  CheckCircle2,
  Cpu,
  Clock,
  Layers,
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';

export const ExperienceSection = () => {
  // Competências e destaques associados a cada experiência
  const experienceHighlights = {
    "Governo de Sergipe - Secretaria de Estado da Comunicação Social (SECOM)": {
      icon: Cpu,
      accentColor: "border-amber-500/60",
      glowColor: "rgba(255,157,46,0.3)",
      tags: [
        "Suporte Técnico N1 & N2",
        "Hardware & Manutenção",
        "Redes & Conectividade",
        "Diagnóstico de Sistemas",
        "Atendimento a Chamados",
        "Infraestrutura de TI"
      ],
      bullets: [
        "Atendimento de primeiro e segundo nível a chamados técnicos de servidores e colaboradores.",
        "Diagnóstico ágil, manutenção preventiva e corretiva de computadores, impressoras e periféricos.",
        "Configuração de sistemas operacionais, cabeamento de redes e resolução de falhas de conectividade.",
        "Apoio na garantia da alta disponibilidade da infraestrutura tecnológica da SECOM."
      ]
    },
    "Moura Dubeux": {
      icon: FileSpreadsheet,
      accentColor: "border-brass-dark/70",
      glowColor: "rgba(198,156,77,0.25)",
      tags: [
        "Microsoft Excel Avançado",
        "Sistemas de Apoio à Decisão (SAD)",
        "Análise e Conferência de Dados",
        "Controle de Suprimentos",
        "Comunicação Corporativa"
      ],
      bullets: [
        "Manipulação, tratamento e validação de relatórios analíticos utilizando Excel avançado e SAD.",
        "Organização, inventário e supervisão do fluxo de insumos, equipamentos e ferramentas.",
        "Intermediação ágil de informações operacionais entre os setores corporativos."
      ]
    }
  };

  return (
    <section
      id="experiencia"
      className="relative py-28 steampunk-bg-pattern border-b-2 border-brass-dark/60 overflow-hidden"
    >
      {/* Engrenagens de Fundo Industriais */}
      <div className="absolute -top-16 -left-12 pointer-events-none opacity-10">
        <SteampunkGear size={280} teeth={14} color="brass" speed="spin-slow" />
      </div>
      <div className="absolute -bottom-20 -right-12 pointer-events-none opacity-10">
        <SteampunkGear size={300} teeth={16} color="copper" speed="spin-reverse-slow" />
      </div>

      {/* Correntes Metálicas em Ângulos Diferentes */}
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

        {/* ════ Cabeçalho da Seção ════ */}
        <ScrollReveal delay={0} distance={28} className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-[#1c140d] border border-brass-dark/80 shadow-[0_0_15px_rgba(255,157,46,0.3)] mb-4">
            <Briefcase className="w-6 h-6 text-steamAmber-glow" />
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-brass-gradient tracking-wide mb-4">
            Experiência Profissional
          </h2>

          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-12 bg-brass/60"></span>
            <span className="text-copper-light text-xs font-schematic uppercase tracking-widest">
              Registros de Ofício &amp; Atuação Prática
            </span>
            <span className="h-px w-12 bg-brass/60"></span>
          </div>

          <p className="text-[#c5b59e] text-sm sm:text-base leading-relaxed">
            Histórico de atuação profissional, papéis desempenhados e contribuições práticas
            no suporte de tecnologia da informação, sustentação de infraestrutura e análise operacional.
          </p>
        </ScrollReveal>

        {/* ════ Linha do Tempo de Experiências ════ */}
        <div className="space-y-8 relative">

          {profileData.experiences.map((exp, idx) => {
            const extra = experienceHighlights[exp.company] || {
              icon: Briefcase,
              tags: [],
              bullets: []
            };
            const IconComponent = extra.icon;

            return (
              <ScrollReveal
                key={idx}
                delay={idx * 160}
                distance={32}
                className="steampunk-panel p-6 sm:p-8 rounded-xl border border-brass-dark/70 hover:border-brass/90 transition-all duration-300 relative group shadow-2xl hover:shadow-[0_0_25px_rgba(255,157,46,0.2)]"
              >
                {/* Rebites Mecânicos nos 4 Cantos */}
                <span className="absolute top-2.5 left-2.5 w-2 h-2 rounded-full bg-gradient-to-br from-brass-light to-brass-dark border border-black/80 shadow" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-gradient-to-br from-brass-light to-brass-dark border border-black/80 shadow" />
                <span className="absolute bottom-2.5 left-2.5 w-2 h-2 rounded-full bg-gradient-to-br from-brass-light to-brass-dark border border-black/80 shadow" />
                <span className="absolute bottom-2.5 right-2.5 w-2 h-2 rounded-full bg-gradient-to-br from-brass-light to-brass-dark border border-black/80 shadow" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                  {/* Coluna Esquerda: Função, Empresa, Período e Badges */}
                  <div className="lg:col-span-5 flex flex-col justify-between">
                    <div>
                      {/* Selo de Status / Vigência */}
                      <div className="flex items-center gap-2 mb-3">
                        {exp.current ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-schematic uppercase tracking-wider font-bold bg-[#291b0c] border border-amber-400 text-amber-300 shadow-[0_0_10px_rgba(255,190,91,0.4)]">
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                            Em Atividade Atual
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-schematic uppercase tracking-wider font-semibold bg-[#17120e] border border-brass-dark/60 text-[#ab9a85]">
                            <Clock className="w-3 h-3 text-copper-light" />
                            Ciclo Concluído
                          </span>
                        )}

                        <span className="px-2.5 py-1 rounded-full text-[10px] font-schematic uppercase tracking-wider bg-[#130f0b] border border-brass-dark/40 text-copper-light">
                          {exp.type}
                        </span>
                      </div>

                      {/* Cargo Principal */}
                      <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-brass-light group-hover:text-amber-200 transition-colors">
                        {exp.role}
                      </h3>

                      {/* Empresa */}
                      <div className="flex items-center gap-2 mt-2 text-sm font-schematic text-[#cbba9d] font-medium">
                        <Building2 className="w-4 h-4 text-steamAmber-glow flex-shrink-0" />
                        <span>{exp.company}</span>
                      </div>

                      {/* Metadados: Período e Local */}
                      <div className="mt-4 pt-4 border-t border-brass-dark/30 space-y-1.5 text-xs font-schematic text-[#b09e88]">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-brass" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-brass" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Selo de Validação Steampunk */}
                    <div className="mt-6 pt-3 border-t border-brass-dark/20 flex items-center justify-between text-[11px] font-schematic text-copper-light">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-steamAmber-bright" />
                        Registro Validado
                      </span>
                      <span className="text-brass-dark font-mono text-[10px]">
                        ID-EXP.0{idx + 1}
                      </span>
                    </div>
                  </div>

                  {/* Coluna Direita: Descrição Detalhada, Tópicos e Tags */}
                  <div className="lg:col-span-7 bg-[#140f0b]/80 p-5 sm:p-6 rounded-lg border border-brass-dark/50 flex flex-col justify-between h-full">

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Layers className="w-4 h-4 text-copper-light" />
                        <h4 className="text-xs font-schematic uppercase tracking-wider text-copper-light font-bold">
                          Atividades &amp; Escopo Operacional
                        </h4>
                      </div>

                      <p className="text-xs sm:text-sm text-[#d4c5b3] font-light leading-relaxed mb-4">
                        {exp.description}
                      </p>

                      {/* Tópicos de Destaque */}
                      {extra.bullets && extra.bullets.length > 0 && (
                        <div className="space-y-2 mb-5">
                          {extra.bullets.map((bullet, bIdx) => (
                            <div key={bIdx} className="flex items-start gap-2.5 text-xs text-[#c5b59e]">
                              <span className="w-1.5 h-1.5 rounded-full bg-brass-light flex-shrink-0 mt-1.5 shadow-[0_0_4px_#f1d289]" />
                              <span className="leading-snug">{bullet}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Tags Tecnológicas Aplicadas */}
                    {extra.tags && extra.tags.length > 0 && (
                      <div className="pt-4 border-t border-brass-dark/30">
                        <span className="block text-[10px] font-schematic uppercase tracking-wider text-brass-dark font-bold mb-2">
                          Competências &amp; Ferramentas Aplicadas:
                        </span>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {extra.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2.5 py-1 rounded bg-[#1c150e] border border-brass-dark/60 text-[11px] font-schematic text-[#e3d4be] hover:border-amber-400/80 hover:text-amber-200 transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>

                </div>
              </ScrollReveal>
            );
          })}

        </div>

      </div>
    </section>
  );
};

