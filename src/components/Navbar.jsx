import React, { useState, useEffect } from 'react';
import { SteampunkGear } from './SteampunkGear';
import { profileData } from '../data/profile';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Início', href: '#hero', id: 'hero' },
    { name: 'Sobre Mim', href: '#sobre', id: 'sobre' },
    { name: 'Experiência', href: '#experiencia', id: 'experiencia' },
    { name: 'Habilidades', href: '#habilidades', id: 'habilidades' },
    { name: 'Projetos', href: '#projetos', id: 'projetos' },
    { name: 'Contato', href: '#contato', id: 'contato' },
  ];

  // Observador de Rolagem e Transição Ativa das Seções
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Detecta qual seção está no campo de visão para transição no menu
      const scrollPos = window.scrollY + 140; // compensação do cabeçalho
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const el = document.getElementById(navLinks[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(navLinks[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Executa na montagem inicial

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Transição suave ao clicar nas seções com compensação da altura da Navbar
  const handleNavClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 76;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 animate-navbar-entrance ${
        scrolled
          ? 'bg-[#0f0c0a]/95 backdrop-blur-md border-b-2 border-brass-dark/70 shadow-2xl py-3'
          : 'bg-[#120f0d]/85 backdrop-blur-sm border-b-2 border-brass-dark/50 py-4 sm:py-4.5'
      }`}
    >
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="flex items-center justify-between">

          {/* Logo / Selo Steampunk (Lado Esquerdo) */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, 'hero')}
            className="flex items-center gap-3 group text-decoration-none select-none"
            title="Gustavo Rodrigues dos Santos - Portfólio"
          >
            <div className="relative">
              <SteampunkGear
                size={38}
                teeth={8}
                color="brass"
                speed="spin-slow"
                className="group-hover:rotate-45"
              />
              <span className="absolute inset-0 flex items-center justify-center font-cinzel font-bold text-xs text-brass-light pointer-events-none">
                G
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-cinzel font-bold text-base sm:text-lg tracking-wider text-brass-gradient uppercase">
                {profileData.personal.name}
              </span>
            </div>
          </a>

          {/* Links de navegação com Transição Suave de Seção Ativa (Lado Direito) */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9 xl:gap-11">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`font-body text-sm sm:text-[15px] lg:text-base font-medium transition-all duration-300 relative py-1.5 select-none ${
                    isActive
                      ? 'text-amber-300 drop-shadow-[0_0_12px_rgba(255,190,91,0.7)] font-semibold'
                      : 'text-[#d6c7b2] hover:text-[#fff4d6] hover:drop-shadow-[0_0_8px_rgba(255,190,91,0.4)]'
                  }`}
                >
                  <span>{link.name}</span>

                  {/* Indicador de Transição Ativa / Hover sob o Link */}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full transition-all duration-300 pointer-events-none ${
                      isActive
                        ? 'opacity-100 bg-gradient-to-r from-brass-light via-amber-400 to-copper-light shadow-[0_0_10px_rgba(255,190,91,0.85)] scale-x-100'
                        : 'opacity-0 bg-brass-light/60 scale-x-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Botão Mobile Menu Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Alternar menu de navegação"
              className="btn-steampunk p-2 rounded text-brass-light"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Painel Dropdown Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#14100d] border-b-2 border-brass-dark/80 px-6 py-5 shadow-2xl animate-fadeIn">
          <div className="flex flex-col gap-3.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`font-body text-base font-medium py-2.5 border-b border-brass-dark/20 flex items-center justify-between transition-colors duration-200 ${
                    isActive
                      ? 'text-amber-300 font-semibold drop-shadow-[0_0_8px_rgba(255,190,91,0.6)]'
                      : 'text-[#d6c7b2] hover:text-brass-light'
                  }`}
                >
                  <span>{link.name}</span>
                  <span
                    className={`text-sm transition-transform duration-300 ${
                      isActive ? 'text-amber-400 rotate-90 scale-125' : 'text-brass/60'
                    }`}
                  >
                    ⚙
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
