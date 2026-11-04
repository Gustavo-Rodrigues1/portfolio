import React, { useState } from 'react';
import { profileData } from '../data/profile';
import { SteampunkGear } from './SteampunkGear';
import { SteampunkChain } from './SteampunkChain';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import {
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

/**
 * Ícone Oficial do WhatsApp
 */
const WhatsAppIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.82 14.1c-.24.68-1.4 1.26-1.92 1.31-.49.05-1.12.08-3.62-.96-3.19-1.33-5.23-4.57-5.39-4.78-.16-.21-1.3-1.73-1.3-3.3 0-1.57.82-2.34 1.11-2.66.29-.32.63-.4.85-.4.21 0 .43.01.61.02.2.01.46-.07.72.55.26.63.89 2.18.97 2.34.08.16.13.35.03.56-.11.21-.16.35-.32.53-.16.19-.34.42-.48.56-.16.16-.33.34-.14.66.19.32.84 1.38 1.8 2.24 1.24 1.1 2.29 1.45 2.61 1.61.32.16.51.13.7-.08.19-.21.82-.95 1.04-1.28.21-.32.43-.27.72-.16.29.11 1.84.87 2.16 1.03.32.16.53.24.61.37.08.13.08.77-.16 1.45z" />
  </svg>
);

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
          <div className="lg:col-span-7 flex flex-col justify-center">

            {/* Título Principal no Estilo do Modelo */}
            <h2 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brass-gradient tracking-wide mb-8 drop-shadow-md">
              Fale comigo!
            </h2>

            {/* Redes Sociais com Caixas Mais Compactas */}
            <div className="space-y-2.5 max-w-lg">
              <span className="text-[11px] font-schematic uppercase tracking-widest text-copper-light block mb-1">
                Conexões Oficiais
              </span>

              {/* Caixa Compacta LinkedIn */}
              <div className="steampunk-panel p-3 rounded-md border border-brass-dark/60 hover:border-brass transition-all flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#1e1711] border border-brass-dark flex items-center justify-center text-brass-light group-hover:scale-105 transition-transform shadow-inner">
                    <LinkedinIcon className="w-4 h-4 text-steamAmber-bright" />
                  </div>
                  <div>
                    <h3 className="font-cinzel text-xs sm:text-sm font-bold text-brass-light leading-tight">
                      LinkedIn
                    </h3>
                    <p className="text-[10px] text-[#9f8f7b] font-schematic truncate max-w-[200px] sm:max-w-[260px]">
                      {profileData.social.linkedin.label}
                    </p>
                  </div>
                </div>
                <a
                  href={profileData.social.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-steampunk px-2.5 py-1 rounded text-[11px] font-schematic font-bold text-brass-light hover:text-white uppercase flex items-center gap-1"
                >
                  <span>Abrir</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Caixa Compacta GitHub */}
              <div className="steampunk-panel p-3 rounded-md border border-brass-dark/60 hover:border-brass transition-all flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#1e1711] border border-brass-dark flex items-center justify-center text-brass-light group-hover:scale-105 transition-transform shadow-inner">
                    <GithubIcon className="w-4 h-4 text-steamAmber-bright" />
                  </div>
                  <div>
                    <h3 className="font-cinzel text-xs sm:text-sm font-bold text-brass-light leading-tight">
                      GitHub
                    </h3>
                    <p className="text-[10px] text-[#9f8f7b] font-schematic truncate max-w-[200px] sm:max-w-[260px]">
                      {profileData.social.github.label}
                    </p>
                  </div>
                </div>
                <a
                  href={profileData.social.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-steampunk px-2.5 py-1 rounded text-[11px] font-schematic font-bold text-brass-light hover:text-white uppercase flex items-center gap-1"
                >
                  <span>Abrir</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Caixa Compacta Localização */}
              <div className="steampunk-panel p-3 rounded-md border border-brass-dark/50 flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#1e1711] border border-brass-dark flex items-center justify-center text-brass-light shadow-inner">
                  <MapPin className="w-4 h-4 text-copper-light" />
                </div>
                <div>
                  <span className="text-[10px] font-schematic text-copper-light block uppercase leading-tight">
                    Base Operacional
                  </span>
                  <span className="text-xs font-schematic text-[#cfbfab] font-medium">
                    {profileData.personal.location}
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* ════════════ COLUNA DIREITA: CARTA COM ADESIVO DE CERA FLUTUANDO ════════════ */}
          <div className="lg:col-span-5 flex items-center justify-center relative py-8">

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

          </div>

        </div>
      </div>
    </section>
  );
};
