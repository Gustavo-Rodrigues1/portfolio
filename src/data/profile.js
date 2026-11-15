/**
 * Dados de perfil e configurações de Gustavo Rodrigues
 * Graduando em Sistemas de Informação - Universidade Federal de Sergipe (UFS) (2023 - 2027)
 */

export const profileData = {
  personal: {
    name: "Gustavo Rodrigues",
    title: "Estudante de Sistemas de Informação",
    university: "Universidade Federal de Sergipe (UFS)",
    degreePeriod: "2023 - 2027",
    campus: "Campus São Cristóvão - SE",
    location: "Aracaju, Sergipe, Brasil",
    headline: "Estudante de Sistemas de Informação | Python | Javascript | Typescript | Tailwindcss | React",
    bio: "Graduando em Sistemas de Informação na Universidade Federal de Sergipe (UFS). Possuo conhecimentos sólidos de Python, Javascript, Typescript, React, Tailwind CSS, HTML, CSS, SQL, Power BI, Pacote Office e Figma, com versionamento em Git e GitHub, além de Inglês Intermediário. Sou focado, comunicativo, disciplinado e autodidata, atualmente solidificando e expandindo meus conhecimentos em Docker, React e Django.",
    tagline: "Engenharia de Software, Suporte de TI & Soluções Web a Todo Vapor.",
    yearsExperience: "2+",
    status: "Atuando como Estagiário de TI no Governo de Sergipe (SECOM) & Aberto a novos desafios",
    // Caminho da foto: basta colocar seu arquivo 'foto-perfil.jpg' dentro da pasta 'public/'
    avatar: "/foto-perfil.jpg",
    avatarFallback: "/avatar-placeholder.svg",
  },

  // Redes sociais e contatos oficiais
  social: {
    github: {
      username: "Gustavo-Rodrigues1",
      url: "https://github.com/Gustavo-Rodrigues1",
      label: "github.com/Gustavo-Rodrigues1",
    },
    linkedin: {
      username: "gustavo-rodrigues-5792b1321",
      url: "https://www.linkedin.com/in/gustavo-rodrigues-5792b1321",
      label: "linkedin.com/in/gustavo-rodrigues-5792b1321",
    },
    email: {
      address: "gustavorodrigues3807@gmail.com",
      url: "mailto:gustavorodrigues3807@gmail.com",
      label: "gustavorodrigues3807@gmail.com",
    },
    whatsapp: {
      number: "+55 (79) 996110310",
      url: "https://wa.me/5579999999999",
      label: "+55 (79) 99999-9999",
    },
  },

  // Formação acadêmica na UFS
  academic: {
    degree: "Bacharelado em Sistemas de Informação",
    institution: "Universidade Federal de Sergipe (UFS)",
    period: "2023 - 2027",
    description: "Graduação sólida em Sistemas de Informação conectando Ciência da Computação, Engenharia de Software e Gestão Estratégica Organizacional.",
    pillars: [
      {
        title: "Engenharia de Software & Web",
        description: "Construção de aplicações modernas com React, Tailwind CSS, JavaScript e TypeScript, focando em usabilidade, escalabilidade e manutenibilidade.",
        icon: "Cpu",
      },
      {
        title: "Bancos de Dados & SQL",
        description: "Modelagem relacional, consultas SQL, integridade transacional, estruturação de dados e manipulação analítica.",
        icon: "Database",
      },
      {
        title: "Suporte & Infraestrutura de TI",
        description: "Manutenção de equipamentos, redes de computadores, atendimento a chamados e garantia da continuidade dos serviços tecnológicos organizacionais.",
        icon: "ShieldCheck",
      },
      {
        title: "DevOps & Ferramental Moderno",
        description: "Fluxos de trabalho com Git e GitHub, conteinerização com Docker, prototipagem com Figma e análises com Power BI.",
        icon: "Workflow",
      },
    ],
  },

  // Experiências profissionais
  experiences: [
    {
      company: "Governo de Sergipe - Secretaria de Estado da Comunicação Social (SECOM)",
      role: "Estagiário de TI",
      period: "julho de 2026 - Presente",
      location: "Aracaju, Sergipe, Brasil",
      description: "Atuação no suporte técnico aos usuários, realizando manutenção de computadores, instalação e configuração de softwares, diagnóstico e resolução de problemas de hardware e software. Responsável pelo atendimento de chamados, suporte a sistemas internos, configuração de redes e equipamentos, além de auxiliar na administração da infraestrutura de TI, garantindo o funcionamento dos recursos tecnológicos e a continuidade dos serviços da organização.",
      type: "Estágio",
      current: true,
    },
    {
      company: "Moura Dubeux",
      role: "Assistente Administrativo",
      period: "agosto de 2025 - julho de 2026 (1 ano)",
      location: "Aracaju, Sergipe, Brasil",
      description: "Utilização de Excel para manipular e checar dados com auxílio de um SAD. Organização e controle de fluxo de produtos e ferramentas. Auxílio na comunicação e administração entre colaboradores.",
      type: "Profissional",
      current: false,
    },
  ],

  // Certificações profissionais
  certifications: [
    { name: "Git e Versionamento", issuer: "Certificação Técnica" },
    { name: "Banco de Dados & SQL", issuer: "Certificação Técnica" },
    { name: "Figma para Devs", issuer: "Design & UI/UX" },
    { name: "Data Analytics | Básico", issuer: "Análise de Dados" },
    { name: "Python: Noções Introdutórias & Práticas", issuer: "Linguagem & Backend" },
  ],

  // Habilidades com níveis para manômetros e mostradores
  skills: [
    { name: "Python & Django", category: "Backend", level: 90, pressure: "9.0 BAR", description: "Scripts de automação, manipulação de dados e desenvolvimento de servidores robustos com Django." },
    { name: "JavaScript & TypeScript", category: "Frontend", level: 92, pressure: "9.2 BAR", description: "Fundamentos sólidos, tipagem estática e desenvolvimento assíncrono para a web moderna." },
    { name: "React & Tailwind CSS", category: "Frontend", level: 94, pressure: "9.4 BAR", description: "Construção de SPAs dinâmicas, componentes modulares e estilização customizada de alta performance." },
    { name: "SQL & Bancos de Dados", category: "Banco de Dados", level: 88, pressure: "8.8 BAR", description: "Modelagem de dados, queries estruturadas, integridade relacional e consultas analíticas." },
    { name: "Git, GitHub & Versionamento", category: "DevOps", level: 92, pressure: "9.2 BAR", description: "Controle de versão, branches, repositórios colaborativos e boas práticas de commits." },
    { name: "Docker & Conteinerização", category: "DevOps", level: 80, pressure: "8.0 BAR", description: "Criação de containers, isolamento de ambientes e empacotamento de aplicações." },
    { name: "Power BI, Excel & SAD", category: "Dados & Gestão", level: 88, pressure: "8.8 BAR", description: "Manipulação de dados corporativos, construção de dashboards e relatórios analíticos de apoio à decisão." },
    { name: "Figma & Design de Interfaces", category: "Design UI", level: 85, pressure: "8.5 BAR", description: "Prototipagem de telas, arquitetura de informação e alinhamento visual para desenvolvimento." },
    { name: "Suporte Técnico & Redes", category: "Infraestrutura", level: 93, pressure: "9.3 BAR", description: "Diagnóstico de hardware/software, configuração de redes, atendimento a chamados e manutenção na SECOM." },
  ],

  // Projetos em destaque do GitHub
  projects: [
    {
      id: "clockwork-dashboard",
      title: "Painel de Indicadores & Gestão de Dados",
      tagline: "Dashboard analítico com suporte a tomada de decisão",
      description: "Plataforma interativa para consolidação de métricas, filtros em tempo real e visualização analítica desenvolvida com base nas competências de Sistemas de Informação.",
      techs: ["React", "Tailwind CSS", "JavaScript", "SQL", "Power BI"],
      githubUrl: "https://github.com/Gustavo-Rodrigues1",
      liveUrl: "https://github.com/Gustavo-Rodrigues1",
      highlight: true,
      patentNumber: "BR-UFS-0104-SI",
    },
    {
      id: "python-automation-pipeline",
      title: "Pipeline de Automação & Scripting em Python",
      tagline: "Tratamento de dados e rotinas automatizadas",
      description: "Scripts e módulos em Python para extração, validação e manipulação automatizada de fluxos de dados, reduzindo trabalho manual repetitivo.",
      techs: ["Python", "SQL", "Git", "Docker"],
      githubUrl: "https://github.com/Gustavo-Rodrigues1",
      liveUrl: "https://github.com/Gustavo-Rodrigues1",
      highlight: true,
      patentNumber: "BR-UFS-0209-PY",
    },
    {
      id: "ti-support-infrastructure",
      title: "Central de Suporte & Manutenção de Equipamentos",
      tagline: "Gestão de chamados e conformidade técnica de infraestrutura",
      description: "Metodologia prática e rotinas de atendimento de chamados, suporte preventivo e corretivo e administração de computadores e redes operacionais.",
      techs: ["Hardware", "Redes", "Sistemas Operacionais", "Gestão TI"],
      githubUrl: "https://github.com/Gustavo-Rodrigues1",
      liveUrl: "https://github.com/Gustavo-Rodrigues1",
      highlight: false,
      patentNumber: "BR-SECOM-0341-TI",
    },
    {
      id: "steampunk-portfolio",
      title: "Portfólio Steampunk Industrial",
      tagline: "Interface vitoriana com engrenagens e manômetros mecânicos",
      description: "Aplicação interativa desenvolvida com React e Tailwind CSS, inspirada na estética Steampunk com engrenagens móveis que reagem à física de rolagem da página.",
      techs: ["React", "Tailwind CSS", "Vite", "SVG Dinâmico"],
      githubUrl: "https://github.com/Gustavo-Rodrigues1/portf-lio",
      liveUrl: "https://github.com/Gustavo-Rodrigues1/portf-lio",
      highlight: false,
      patentNumber: "BR-UFS-0418-PORT",
    },
  ],
};
