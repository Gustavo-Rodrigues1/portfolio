import React from 'react';
import { SteampunkGear } from './SteampunkGear';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { profileData } from '../data/profile';
import { Mail, MessageCircle } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Início',      href: '#hero' },
  { name: 'Sobre Mim',   href: '#sobre' },
  { name: 'Experiência', href: '#experiencia' },
  { name: 'Habilidades', href: '#habilidades' },
  { name: 'Projetos',    href: '#projetos' },
  { name: 'Contato',     href: '#contato' },
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

          {/* Coluna 1 — Nome + frase de efeito + redes sociais */}
          <div className="flex flex-col gap-4">
            {/* Logo / nome */}
            <div className="flex items-center gap-2.5">
              <div className="relative shrink-0">
                <SteampunkGear size={28} teeth={7} color="brass" speed="spin-slow" />
                <span className="absolute inset-0 flex items-center justify-center font-cinzel font-bold text-[9px] text-brass-light pointer-events-none">G</span>
              </div>
              <span className="font-cinzel font-bold text-base sm:text-lg tracking-wider text-brass-gradient uppercase">
                {profileData.personal.name}
              </span>
            </div>

            {/* Frase de efeito */}
            <p className="font-schematic text-sm text-[#8d7d6b] leading-relaxed italic border-l-2 border-brass-dark/60 pl-3">
              "{profileData.personal.tagline}"
            </p>

            {/* Ícones sociais */}
            <div className="flex items-center gap-3 mt-1">
              <a
                href={profileData.social.github.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="btn-steampunk p-2 rounded text-brass-light hover:text-white transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={profileData.social.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="btn-steampunk p-2 rounded text-brass-light hover:text-white transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
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
