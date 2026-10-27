import React from 'react';
import {
  SiPython,
  SiDjango,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiDocker,
  SiFigma,
} from 'react-icons/si';
import {
  FaChartSimple,
  FaFileExcel,
  FaWrench,
  FaNetworkWired,
} from 'react-icons/fa6';

/**
 * Logotipos oficiais das ferramentas tecnológicas utilizando React Icons
 * (Simple Icons e Font Awesome 6)
 */
export const OfficialToolLogo = ({
  id,
  className = "w-4 h-4 sm:w-[18px] sm:h-[18px]",
  monochrome = false,
}) => {
  switch (id) {
    case 'python':
      return <SiPython className={className} style={monochrome ? undefined : { color: '#3776ab' }} />;

    case 'django':
      return <SiDjango className={className} style={monochrome ? undefined : { color: '#2ba977' }} />;

    case 'javascript':
      return <SiJavascript className={className} style={monochrome ? undefined : { color: '#f7df1e' }} />;

    case 'typescript':
      return <SiTypescript className={className} style={monochrome ? undefined : { color: '#3178c6' }} />;

    case 'react':
      return <SiReact className={className} style={monochrome ? undefined : { color: '#61dafb' }} />;

    case 'tailwind':
      return <SiTailwindcss className={className} style={monochrome ? undefined : { color: '#38bdf8' }} />;

    case 'htmlcss':
      return (
        <div className="flex items-center -space-x-0.5">
          <SiHtml5 className="w-3.5 h-3.5" style={monochrome ? undefined : { color: '#e34f26' }} />
          <SiCss className="w-3.5 h-3.5" style={monochrome ? undefined : { color: '#1572b6' }} />
        </div>
      );

    case 'sql':
      return <SiPostgresql className={className} style={monochrome ? undefined : { color: '#4169e1' }} />;

    case 'git':
      return <SiGit className={className} style={monochrome ? undefined : { color: '#f05032' }} />;

    case 'github':
      return <SiGithub className={className} style={monochrome ? undefined : { color: '#ffffff' }} />;

    case 'docker':
      return <SiDocker className={className} style={monochrome ? undefined : { color: '#2496ed' }} />;

    case 'powerbi':
      return <FaChartSimple className={className} style={monochrome ? undefined : { color: '#f2c811' }} />;

    case 'excel':
      return <FaFileExcel className={className} style={monochrome ? undefined : { color: '#21a366' }} />;

    case 'figma':
      return <SiFigma className={className} style={monochrome ? undefined : { color: '#f24e1e' }} />;

    case 'suporte':
      return <FaWrench className={className} style={monochrome ? undefined : { color: '#f1d289' }} />;

    case 'redes':
      return <FaNetworkWired className={className} style={monochrome ? undefined : { color: '#38bdf8' }} />;

    default:
      return null;
  }
};

/**
 * Chip / Pill Steampunk Clean:
 * - Insígnia metálica circular elegante com o logotipo oficial no centro
 * - Nome da ferramenta ao lado
 * - Sem barras ou dados desnecessários
 */
export const SkillChip = ({ tool }) => {
  return (
    <div
      className="group inline-flex items-center gap-3 px-4 sm:px-4.5 py-2 sm:py-2.5 rounded-full bg-[#15100c]/90 border border-brass-dark/70 hover:border-brass hover:shadow-[0_0_16px_rgba(241,210,137,0.3)] transition-all duration-300 hover:scale-105 cursor-default select-none shadow-md backdrop-blur-sm"
    >
      {/* Moldura de Insígnia Circular Steampunk */}
      <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 flex items-center justify-center">
        {/* Borda / Aro de Latão com Efeito Metálico */}
        <div className="absolute inset-0 rounded-full border border-brass-light/80 shadow-[inset_0_1px_2px_rgba(241,210,137,0.4),0_2px_4px_rgba(0,0,0,0.9)] bg-gradient-to-tr from-[#2a1d12] via-[#1a120b] to-[#0c0906] transition-all group-hover:border-brass group-hover:rotate-45 duration-500" />
        
        {/* Rebites discretos nos vértices (Aro Steampunk) */}
        <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brass-light shadow" />
        <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brass-light shadow" />
        
        {/* Símbolo Original */}
        <div className="relative z-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <OfficialToolLogo id={tool.id} />
        </div>
      </div>

      {/* Nome da Ferramenta */}
      <span className="font-schematic text-xs sm:text-sm font-semibold tracking-wide text-[#dfd2be] group-hover:text-brass-light transition-colors whitespace-nowrap">
        {tool.name}
      </span>
    </div>
  );
};

export const SkillInsignia = SkillChip;
