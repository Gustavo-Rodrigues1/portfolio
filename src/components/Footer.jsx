import React from 'react';
import { SteampunkGear } from './SteampunkGear';
import { GlitchText } from './GlitchText';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { profileData } from '../data/profile';
import { Mail, MessageCircle } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Início', href: '#hero' },
  { name: 'Sobre Mim', href: '#sobre' },
  { name: 'Experiência', href: '#experiencia' },
  { name: 'Habilidades', href: '#habilidades' },
  { name: 'Projetos', href: '#projetos' },
  { name: 'Contato', href: '#contato' },
];

export const Footer = () => {
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 76, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#070605] border-t-2 border-brass-dark text-[#ad9d88] pt-14 pb-8 overflow-hidden">

      {/* Engrenagens Decorativas */}
      <div className="absolute -bottom-10 left-6 opacity-15 pointer-events-none">
        <SteampunkGear size={130} teeth={10} color="brass" speed="spin-slow" />
      </div>
      <div className="absolute -bottom-14 right-8 opacity-15 pointer-events-none">
        <SteampunkGear size={160} teeth={12} color="copper" speed="spin-reverse-slow" />
      </div>
      {/* Engrenagem central decorativa */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 opacity-10 pointer-events-none hidden lg:block">
        <SteampunkGear size={60} teeth={8} color="brass" speed="spin-slow" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Grid de 3 colunas ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-10 border-b border-brass-dark/40">

          {/* Coluna 1 — Nome + Redes Sociais logo abaixo + frase de efeito */}
          <div className="flex flex-col gap-3.5">
            {/* Logo / nome */}
            <div className="flex items-center gap-2.5">
              {/* Mini Tela CRT de Fósforo Verde com símbolo Dev piscando */}
              <div
                className="relative w-7 h-7 rounded-sm flex items-center justify-center border border-[#523d24] shadow-[0_2px_6px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(212,168,83,0.3)] shrink-0 overflow-hidden"
                style={{
                  background: 'linear-gradient(180deg, #241c14 0%, #15100a 60%, #0d0a06 100%)',
                }}
              >
                {/* Parafusos nos cantos */}
                <div className="absolute top-0.5 left-0.5 w-[3px] h-[3px] rounded-full bg-[#c69c4d] border border-[#3b2914]" />
                <div className="absolute top-0.5 right-0.5 w-[3px] h-[3px] rounded-full bg-[#c69c4d] border border-[#3b2914]" />
                <div className="absolute bottom-0.5 left-0.5 w-[3px] h-[3px] rounded-full bg-[#c69c4d] border border-[#3b2914]" />
                <div className="absolute bottom-0.5 right-0.5 w-[3px] h-[3px] rounded-full bg-[#c69c4d] border border-[#3b2914]" />

                {/* Visor de fósforo verde com scanlines */}
                <div
                  className="relative w-[20px] h-[20px] rounded-[1px] bg-[#021307] border border-emerald-600/90 overflow-hidden flex items-center justify-center shadow-[inset_0_0_6px_rgba(34,197,94,0.5),0_0_8px_rgba(34,197,94,0.2)]"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px)',
                    backgroundSize: '100% 2.5px',
                  }}
                >
                  {/* Símbolo Dev </> piscando */}
                  <span
                    className="font-schematic text-[8px] font-black text-emerald-400 animate-pulse select-none"
                    style={{
                      textShadow: '0 0 2px #bbf7d0, 0 0 5px #22c55e, 0 0 10px rgba(34, 197, 94, 0.9)',
                      animationDuration: '1.5s',
                    }}
                  >
                    &lt;/&gt;
                  </span>
                </div>
              </div>
              <GlitchText
                text={profileData.personal.name}
                className="font-cinzel font-bold text-base sm:text-lg tracking-wider text-brass-gradient uppercase"
              />
            </div>

            {/* Frase de efeito */}
            <p className="font-schematic text-sm text-[#8d7d6b] leading-relaxed italic border-l-2 border-brass-dark/60 pl-3 mt-1">
              "{profileData.personal.tagline}"
            </p>

            {/* Ícones sociais logo abaixo do nome */}
            <div className="flex items-center gap-3">
              <a
                href={profileData.social.github.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="Acessar GitHub de Gustavo"
                className="w-9 h-9 rounded-full bg-[#18120c] border border-brass-dark/80 text-[#e8dcce] hover:text-white hover:border-brass-light hover:bg-[#281b10] hover:shadow-[0_0_16px_rgba(241,210,137,0.45)] flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 group"
              >
                <GithubIcon className="w-4 h-4 icon-spin-hover text-[#d8c8b4] group-hover:text-brass-light" />
              </a>
              <a
                href={profileData.social.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="Acessar LinkedIn de Gustavo"
                className="w-9 h-9 rounded-full bg-[#18120c] border border-brass-dark/80 text-[#e8dcce] hover:text-white hover:border-brass-light hover:bg-[#281b10] hover:shadow-[0_0_16px_rgba(241,210,137,0.45)] flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 group"
              >
                <LinkedinIcon className="w-4 h-4 icon-spin-hover text-[#d8c8b4] group-hover:text-brass-light" />
              </a>
            </div>
          </div>

          {/* Coluna 2 — Links rápidos */}
          <div className="flex flex-col gap-3">
            <h3 className="font-cinzel text-xs font-bold uppercase tracking-widest text-brass-light/80 mb-1 flex items-center gap-2">
              <span className="text-brass-dark">⚙</span> Links Rápidos
            </h3>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="font-body text-sm text-[#9d8e7c] hover:text-amber-300 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brass-dark/60 group-hover:bg-amber-400 transition-colors duration-200 shrink-0" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3 — Contato */}
          <div className="flex flex-col gap-3">
            <h3 className="font-cinzel text-xs font-bold uppercase tracking-widest text-brass-light/80 mb-1 flex items-center gap-2">
              <span className="text-brass-dark">✦</span> Contato
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={profileData.social.email.url}
                  className="flex items-start gap-2.5 text-sm text-[#9d8e7c] hover:text-amber-300 transition-colors duration-200 group"
                >
                  <Mail className="w-4 h-4 shrink-0 mt-0.5 text-brass-dark group-hover:text-amber-400 transition-colors" />
                  <span className="break-all">{profileData.social.email.address}</span>
                </a>
              </li>
              <li>
                <a
                  href={profileData.social.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-[#9d8e7c] hover:text-amber-300 transition-colors duration-200 group"
                >
                  <MessageCircle className="w-4 h-4 shrink-0 text-brass-dark group-hover:text-amber-400 transition-colors" />
                  <span>{profileData.social.whatsapp.number}</span>
                </a>
              </li>
              <li>
                <a
                  href={profileData.social.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-[#9d8e7c] hover:text-amber-300 transition-colors duration-200 group"
                >
                  <GithubIcon className="w-4 h-4 shrink-0 text-brass-dark group-hover:text-amber-400 transition-colors" />
                  <span>{profileData.social.github.label}</span>
                </a>
              </li>
              <li>
                <a
                  href={profileData.social.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-[#9d8e7c] hover:text-amber-300 transition-colors duration-200 group"
                >
                  <LinkedinIcon className="w-4 h-4 shrink-0 text-brass-dark group-hover:text-amber-400 transition-colors" />
                  <span className="break-all">{profileData.social.linkedin.label}</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* ── Linha de Copyright ── */}
        <div className="mt-7 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-schematic text-[#5c4f3f]">
          <p>© {new Date().getFullYear()} {profileData.personal.name}. Todos os direitos das patentes reservados.</p>
          <p className="italic text-[#4a3f31]">Forjado com React &amp; Tailwind CSS ⚙</p>
        </div>

      </div>
    </footer>
  );
};
