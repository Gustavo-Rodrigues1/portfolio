import React, { useState } from 'react';
import { profileData } from '../data/profile';
import { SteampunkGear } from './SteampunkGear';
import { SteampunkChain } from './SteampunkChain';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { ScrollReveal } from './ScrollReveal';
import {
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  MessageSquare
} from 'lucide-react';


/**
 * Selo / Adesivo de Cera Vitoriano Steampunk
 */
const WaxSeal = ({ className = "w-20 h-20" }) => (
  <div className={`relative flex items-center justify-center ${className} filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.85)] animate-wax-shine`}>
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        {/* Gradiente da Cera Escarlate */}
        <radialGradient id="waxRedGrad" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#f84b4b" />
          <stop offset="35%" stopColor="#c51616" />
          <stop offset="70%" stopColor="#7e0808" />
          <stop offset="100%" stopColor="#460404" />
        </radialGradient>

        {/* Brilho da Cera */}
        <radialGradient id="waxGlint" cx="30%" cy="25%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      {/* Gotas e contorno irregular de cera derretida */}
      <path
        d="M50 8 C68 6, 85 18, 91 35 C96 48, 93 64, 84 76 C74 88, 59 93, 44 91 C30 89, 14 83, 9 68 C4 54, 8 38, 17 26 C26 14, 37 9, 50 8 Z"
        fill="url(#waxRedGrad)"
        stroke="#520505"
        strokeWidth="1.5"
      />

      {/* Borda interna gravada do anel de sinete */}
      <circle cx="50" cy="50" r="32" fill="#880e0e" stroke="#500606" strokeWidth="2" opacity="0.9" />
      <circle cx="50" cy="50" r="28" fill="url(#waxRedGrad)" stroke="#3e0303" strokeWidth="1" />

      {/* Brilho de reflexo */}
      <ellipse cx="40" cy="36" rx="14" ry="7" fill="url(#waxGlint)" transform="rotate(-25 40 36)" />

      {/* Monograma / Brasão Central 'G' em Latão/Ouro em relevo */}
      <text
        x="50"
        y="58"
        textAnchor="middle"
        fontFamily="Cinzel, serif"
        fontSize="24"
        fontWeight="bold"
        fill="#f7dfa4"
        stroke="#745116"
        strokeWidth="0.8"
        filter="drop-shadow(0 2px 3px rgba(0,0,0,0.8))"
      >
        G
      </text>
    </svg>
  </div>
);

export const ContactTelegraph = () => {
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section
      id="contato"
      className="relative py-24 bg-[#0a0807] border-b-2 border-brass-dark/60 overflow-hidden"
    >
      {/* Engrenagens de Fundo Vitorianas */}
      <div className="absolute top-10 -right-20 pointer-events-none opacity-10">
        <SteampunkGear size={320} teeth={16} color="brass" speed="spin-slow" />
      </div>
      <div className="absolute -bottom-16 -left-16 pointer-events-none opacity-10">
        <SteampunkGear size={240} teeth={12} color="copper" speed="spin-reverse-slow" />
      </div>

      {/* Correntes de Metal de Fundo em Ângulos Diferentes (Subindo e Descendo) */}
      <SteampunkChain
        className="left-[6%] sm:left-[10%]"
        angle={-17}
        direction="up"
        speed="normal"
        width={28}
        opacity={0.22}
      />
      <SteampunkChain
        className="right-[7%] sm:right-[11%]"
        angle={20}
        direction="down"
        speed="slow"
        width={30}
        opacity={0.24}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* ════════════ COLUNA ESQUERDA: FALE COMIGO & CONTATOS ════════════ */}
          <ScrollReveal
            variant="slide"
            delay={0}
            distance={32}
            className="lg:col-span-7 flex flex-col justify-center"
          >

            {/* Título Principal */}
            <div className="mb-7">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-px w-8 bg-brass/60"></span>
                <span className="text-copper-light text-xs font-schematic uppercase tracking-widest font-semibold">
                  Canais de Comunicação
                </span>
              </div>
              <h2 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brass-gradient tracking-wide drop-shadow-md">
                Conecte-se comigo!
              </h2>
            </div>

              {/* Informações de Contato Direto: Email, Telefone e Localidade */}
              <div className="space-y-3.5 max-w-lg mb-6">

                {/* 1. Caixa E-mail */}
                <div className="relative p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-300 flex items-center justify-between group overflow-hidden bg-[#18130e]/95 backdrop-blur-md border-brass-light/75 shadow-[0_4px_16px_rgba(0,0,0,0.6)] hover:border-amber-300 hover:shadow-[0_0_24px_rgba(255,185,75,0.35)] hover:scale-[1.02] hover:-translate-y-0.5 select-none">
                  {/* Efeito Contínuo de Reflexo Metálico Cintilante ao Passar o Cursor */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 overflow-hidden rounded-xl sm:rounded-2xl">
                    <div className="w-[130%] h-[220%] -top-[60%] absolute metallic-sheen-layer animate-metallic-sheen" />
                  </div>

                  {/* Formas Geométricas Orgânicas Decorativas */}
                  <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-amber-400/[0.09] via-white/[0.03] to-transparent pointer-events-none blur-[1px] animate-morph-a opacity-70 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-tr from-copper-light/[0.07] to-transparent pointer-events-none blur-[1px] animate-morph-b opacity-60 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative z-10 flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-[#201810] border border-brass-dark/70 flex items-center justify-center text-brass-light group-hover:border-amber-400 group-hover:shadow-[0_0_12px_rgba(255,190,91,0.5)] transition-all duration-300 flex-shrink-0">
                      <Mail className="w-5 h-5 text-steamAmber-glow group-hover:scale-110 group-hover:text-amber-300 transition-transform" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-schematic uppercase tracking-widest text-copper-light block font-semibold leading-tight">
                        E-mail
                      </span>
                      <a
                        href={profileData.social.email.url}
                        className="text-xs sm:text-sm font-body font-semibold text-[#f5ecd5] group-hover:text-amber-300 transition-colors truncate block"
                        title={profileData.social.email.address}
                      >
                        {profileData.social.email.address}
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(profileData.social.email.address, 'email')}
                    title="Copiar endereço de e-mail"
                    className="relative z-10 btn-steampunk px-2.5 py-1.5 rounded text-[11px] font-schematic font-bold text-brass-light hover:text-white uppercase flex items-center gap-1.5 flex-shrink-0 ml-2 cursor-pointer shadow-sm"
                  >
                    {copiedField === 'email' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-400" />
                        <span className="text-green-400">Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>

                {/* 2. Caixa Telefone */}
                <div className="relative p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-300 flex items-center justify-between group overflow-hidden bg-[#18130e]/95 backdrop-blur-md border-brass-light/75 shadow-[0_4px_16px_rgba(0,0,0,0.6)] hover:border-amber-300 hover:shadow-[0_0_24px_rgba(255,185,75,0.35)] hover:scale-[1.02] hover:-translate-y-0.5 select-none">
                  {/* Efeito Contínuo de Reflexo Metálico Cintilante ao Passar o Cursor */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 overflow-hidden rounded-xl sm:rounded-2xl">
                    <div className="w-[130%] h-[220%] -top-[60%] absolute metallic-sheen-layer animate-metallic-sheen" />
                  </div>

                  {/* Formas Geométricas Orgânicas Decorativas */}
                  <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-amber-400/[0.09] via-white/[0.03] to-transparent pointer-events-none blur-[1px] animate-morph-a opacity-70 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-tr from-copper-light/[0.07] to-transparent pointer-events-none blur-[1px] animate-morph-b opacity-60 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative z-10 flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-[#201810] border border-brass-dark/70 flex items-center justify-center text-brass-light group-hover:border-amber-400 group-hover:shadow-[0_0_12px_rgba(255,190,91,0.5)] transition-all duration-300 flex-shrink-0">
                      <Phone className="w-5 h-5 text-steamAmber-glow group-hover:scale-110 group-hover:text-amber-300 transition-transform" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-schematic uppercase tracking-widest text-copper-light block font-semibold leading-tight">
                        Telefone
                      </span>
                      <a
                        href={profileData.social.whatsapp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm font-body font-semibold text-[#f5ecd5] group-hover:text-amber-300 transition-colors truncate block"
                        title={profileData.social.whatsapp.number}
                      >
                        {profileData.social.whatsapp.number}
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(profileData.social.whatsapp.number, 'phone')}
                    title="Copiar número de telefone"
                    className="relative z-10 btn-steampunk px-2.5 py-1.5 rounded text-[11px] font-schematic font-bold text-brass-light hover:text-white uppercase flex items-center gap-1.5 flex-shrink-0 ml-2 cursor-pointer shadow-sm"
                  >
                    {copiedField === 'phone' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-400" />
                        <span className="text-green-400">Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>

                {/* 3. Caixa Localidade */}
                <div className="relative p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-300 flex items-center gap-3.5 group overflow-hidden bg-[#18130e]/95 backdrop-blur-md border-brass-light/75 shadow-[0_4px_16px_rgba(0,0,0,0.6)] hover:border-amber-300 hover:shadow-[0_0_24px_rgba(255,185,75,0.35)] hover:scale-[1.02] hover:-translate-y-0.5 select-none">
                  {/* Efeito Contínuo de Reflexo Metálico Cintilante ao Passar o Cursor */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 overflow-hidden rounded-xl sm:rounded-2xl">
                    <div className="w-[130%] h-[220%] -top-[60%] absolute metallic-sheen-layer animate-metallic-sheen" />
                  </div>

                  {/* Formas Geométricas Orgânicas Decorativas */}
                  <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-amber-400/[0.09] via-white/[0.03] to-transparent pointer-events-none blur-[1px] animate-morph-a opacity-70 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-tr from-copper-light/[0.07] to-transparent pointer-events-none blur-[1px] animate-morph-b opacity-60 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative z-10 w-10 h-10 rounded-full bg-[#201810] border border-brass-dark/70 flex items-center justify-center text-brass-light group-hover:border-amber-400 group-hover:shadow-[0_0_12px_rgba(255,190,91,0.5)] transition-all duration-300 flex-shrink-0">
                    <MapPin className="w-5 h-5 text-steamAmber-glow group-hover:scale-110 group-hover:text-amber-300 transition-transform" />
                  </div>
                  <div className="relative z-10 min-w-0">
                    <span className="text-[10px] font-schematic uppercase tracking-widest text-copper-light block font-semibold leading-tight">
                      Localidade
                    </span>
                    <span className="text-xs sm:text-sm font-body font-semibold text-[#f5ecd5] group-hover:text-amber-300 transition-colors block truncate">
                      {profileData.personal.location}
                    </span>
                  </div>
                </div>

              </div>

                                {/* Embaixo: Botões do LinkedIn e GitHub com APENAS OS SÍMBOLOS */}
                                <div className="pt-2">
                                  <span className="text-[10px] font-schematic uppercase tracking-widest text-copper-light block mb-3 font-semibold">
                                    Perfis &amp; Redes Sociais
                                  </span>
                                  <div className="flex items-center gap-3.5">
                                    {/* Botão LinkedIn (Apenas Símbolo) */}
                                    <a
                                      href={profileData.social.linkedin.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      title="Acessar LinkedIn de Gustavo"
                                      aria-label="LinkedIn de Gustavo"
                                      className="w-12 h-12 rounded-full bg-[#18120c] border border-brass-dark/80 text-[#e8dcce] hover:text-white hover:border-brass-light hover:bg-[#281b10] hover:shadow-[0_0_18px_rgba(241,210,137,0.5)] flex items-center justify-center transition-all duration-300 hover:-translate-y-1 group"
                                    >
                                      <LinkedinIcon className="w-5 h-5 text-[#d8c8b4] group-hover:text-brass-light group-hover:scale-110 transition-transform" />
                                    </a>

                                    {/* Botão GitHub (Apenas Símbolo) */}
                                    <a
                                      href={profileData.social.github.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      title="Acessar GitHub de Gustavo"
                                      aria-label="GitHub de Gustavo"
                                      className="w-12 h-12 rounded-full bg-[#18120c] border border-brass-dark/80 text-[#e8dcce] hover:text-white hover:border-brass-light hover:bg-[#281b10] hover:shadow-[0_0_18px_rgba(241,210,137,0.5)] flex items-center justify-center transition-all duration-300 hover:-translate-y-1 group"
                                    >
                                      <GithubIcon className="w-5 h-5 text-[#d8c8b4] group-hover:text-brass-light group-hover:scale-110 transition-transform" />
                                    </a>
                                  </div>
                                </div>

                              </ScrollReveal>

                              {/* ════════════ COLUNA DIREITA: CARTA COM ADESIVO DE CERA FLUTUANDO ════════════ */}
                              <ScrollReveal
                                variant="slide"
                                delay={180}
                                distance={32}
                                className="lg:col-span-5 flex items-center justify-center relative py-8"
                              >

                                {/* Halo / Iluminação Âmbar de Fundo */}
                                <div className="absolute w-72 h-96 rounded-full bg-steamAmber-glow/15 blur-3xl pointer-events-none" />

                                {/* Container da Carta com Animação de Flutuação Contínua */}
                                <div className="relative animate-float-letter group select-none">

                                  {/* Balão de Mensagem Vitoriano Flutuando sobre a Carta */}
                                  <div className="absolute -top-7 -right-4 z-30 bg-[#1e1710] border-2 border-brass-light px-3.5 py-1.5 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.8)] flex items-center gap-2 transform rotate-6 group-hover:rotate-0 transition-transform duration-300">
                                    <MessageSquare className="w-3.5 h-3.5 text-steamAmber-bright animate-pulse" />
                                    <span className="font-schematic text-[11px] font-bold tracking-wider text-brass-light whitespace-nowrap">
                                      Pronto para conectar!
                                    </span>
                                    {/* Rabicho do balão */}
                                    <div className="absolute -bottom-1.5 left-6 w-3 h-3 bg-[#1e1710] border-r-2 border-b-2 border-brass-light transform rotate-45" />
                                  </div>

                                  {/* A CARTA VITORIANA EM PERGAMINHO */}
                                  <div
                                    className="w-72 sm:w-80 h-[380px] sm:h-[420px] rounded-sm p-6 relative border-2 border-[#b8993f] shadow-[0_20px_45px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,255,255,0.4)] flex flex-col justify-between"
                                    style={{
                                      background: 'linear-gradient(155deg, #f7eed8 0%, #ecd9b5 45%, #dfc79e 100%)',
                                    }}
                                  >
                                    {/* Dobra de canto superior esquerdo decorada */}
                                    <div
                                      className="absolute top-0 left-0 w-0 h-0 pointer-events-none"
                                      style={{
                                        borderLeft: '28px solid #a38234',
                                        borderBottom: '28px solid transparent',
                                      }}
                                    />
                                    <div
                                      className="absolute top-0 left-0 w-0 h-0 pointer-events-none"
                                      style={{
                                        borderLeft: '26px solid #e8d7b3',
                                        borderBottom: '26px solid transparent',
                                      }}
                                    />

                                    {/* Textura de linhas sutis pautadas na carta */}
                                    <div className="absolute inset-0 pointer-events-none opacity-25 overflow-hidden rounded-sm">
                                      {[60, 95, 130, 165, 200, 235, 270, 305, 340].map((y, idx) => (
                                        <div key={idx} className="absolute w-full h-px bg-[#7c5d26]" style={{ top: y }} />
                                      ))}
                                    </div>

                                    {/* 4 Cantoneiras Rebitadas em Latão */}
                                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brass-light border border-black shadow" />
                                    <span className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-brass-light border border-black shadow" />
                                    <span className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-brass-light border border-black shadow" />

                                    {/* Cabeçalho da Carta */}
                                    <div className="relative z-10 border-b border-[#a07b36]/60 pb-3">
                                      <div className="flex items-center justify-between mb-1">
                                        <span className="font-schematic text-[8px] uppercase tracking-widest text-[#72531e] font-bold">
                                          Despacho Telegráfico
                                        </span>
                                        <span className="font-schematic text-[8px] text-[#8e6c31]">
                                          Est. 2026
                                        </span>
                                      </div>
                                      <h4 className="font-cinzel text-base font-bold text-[#442c0c] tracking-wide">
                                        Gustavo Rodrigues
                                      </h4>
                                      <p className="font-schematic text-[9px] text-[#785922]">
                                        Engenharia de Software & Suporte de TI
                                      </p>
                                    </div>

                                    {/* Conteúdo Simulado da Carta */}
                                    <div className="relative z-10 space-y-2 py-3 font-schematic text-[10px] text-[#4d320d] leading-relaxed">
                                      <p className="italic">
                                        "Prezado visitante, portas e canais abertos para novas colaborações, soluções de sistemas e projetos tecnológicos."
                                      </p>
                                      <p className="text-[9px] text-[#73531f]">
                                        Destinatário direto: Aracaju / Sergipe
                                      </p>
                                    </div>

                                    {/* Rodapé da Carta com Assinatura */}
                                    <div className="relative z-10 pt-3 border-t border-[#a07b36]/50 flex items-center justify-between text-[9px] font-schematic text-[#6b4c19]">
                                      <span>Correspondência Validada</span>
                                      <span className="font-cinzel font-bold text-[#442c0c]">G. Rodrigues</span>
                                    </div>

                                    {/* ── ADESIVO DE CERA FLUTUANTE EM RELEVO ── */}
                                    <div className="absolute -bottom-6 -right-6 z-20 hover:scale-110 transition-transform duration-300 cursor-pointer">
                                      <WaxSeal className="w-24 h-24 sm:w-28 sm:h-28" />
                                    </div>

                                  </div>

                                </div>

                              </ScrollReveal>

                            </div>
                          </div>
                        </section>
                        );
};
