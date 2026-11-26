# ⚙️ Portfólio Steampunk Industrial

> **Idioma:** 🇧🇷 Português | [🇺🇸 English](README.en.md)

Um portfólio interativo com estética **Steampunk / Vitoriana Industrial**, desenvolvido em **React**, **Vite** e **Tailwind CSS**. O projeto combina elementos mecânicos animados (engrenagens reativas ao scroll, manômetros de pressão, válvulas Nixie, visores CRT com terminal e tela de carregamento estilo comporta) com uma arquitetura simples e centralizada para fácil personalização.

---

## ✨ Funcionalidades

- **Tela de Carregamento Steampunk (`SteampunkLoadingScreen`)**: válvulas Nixie acendendo progressivamente (`L O A D I N G`), barra de fluido dourado com bolhas dinâmicas, adornos vitorianos nos cantos e saída animada estilo porta de garagem com enganchada mecânica.
- **Identidade & Glitch (`Navbar`, `Footer`, `GlitchText`)**: nome com efeito glitch temporário ao passar o mouse e mini visor CRT verde pulsante.
- **Carrossel de Projetos (`ProjectsArchive`)**: carrossel interativo com engrenagens sincronizadas, lâmpadas de filamento e visor CRT com efeito de digitação em terminal (`TerminalTyping`).
- **Habilidades em Manômetros (`SkillsGauges`, `SteamGauge`)**: visualização de competências técnicas com níveis em `BAR`.
- **Linha do Tempo & Formação (`ExperienceSection`, `AboutUFS`)**: seções dedicadas à trajetória profissional, certificações e formação acadêmica.
- **Contato estilo Telégrafo (`ContactTelegraph`)**: links diretos para GitHub, LinkedIn, E-mail e WhatsApp.

---

## 🛠️ Tecnologias Utilizadas

- [React 19](https://react.dev/)
- [Vite 8](https://vite.dev/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- [Oxlint](https://oxc.rs/)

---

## 📁 Estrutura Principal do Projeto

```text
├── public/
│   ├── avatar-placeholder.svg   # Imagem padrão caso não haja foto de perfil
│   └── foto-perfil.jpg          # Sua foto de perfil (adicione aqui)
├── src/
│   ├── components/              # Componentes visuais e animações steampunk
│   ├── data/
│   │   └── profile.js           # Arquivo central com todos os seus dados
│   ├── App.jsx                  # Estrutura principal da página
│   └── index.css                # Estilos globais e keyframes customizados
├── index.html                   # Título da aba e metadados da página
└── package.json
```

---

## 🚀 Como Usar Este Projeto como Template

Qualquer pessoa pode clonar este repositório e adaptá-lo com suas próprias informações em poucos minutos.

### 1. Clone ou faça um Fork do repositório

```bash
git clone https://github.com/Gustavo-Rodrigues1/portf-lio.git
cd portf-lio
```

### 2. Instale as dependências

Certifique-se de ter o [Node.js](https://nodejs.org/) (v18+ recomendado) instalado:

```bash
npm install
```

### 3. Personalize suas informações em `src/data/profile.js`

Quase todo o conteúdo do portfólio é carregado a partir do objeto `profileData` em [`src/data/profile.js`](src/data/profile.js). Edite cada seção com os seus dados:

- **`personal`**: nome, título profissional, universidade/formação, localização, `headline`, `bio`, `tagline`, tempo de experiência e caminho da foto (`avatar`).
- **`social`**: usuário e URLs do `github`, `linkedin`, `email` e `whatsapp`.
- **`academic`**: curso, instituição, período, descrição e os pilares da sua formação (`pillars`).
- **`experiences`**: lista de experiências profissionais (`company`, `role`, `period`, `location`, `description`, `type`, `current`).
- **`certifications`**: lista de certificações (`name`, `issuer`).
- **`skills`**: suas habilidades com categoria, nível percentual (`level`) e pressão exibida nos mostradores (`pressure`, ex.: `"9.0 BAR"`).
- **`projects`**: seus projetos (`id`, `title`, `tagline`, `description`, `techs`, `githubUrl`, `liveUrl`, `highlight`, `patentNumber`).

### 4. Adicione sua foto de perfil

Coloque sua foto dentro da pasta `public/` com o nome `foto-perfil.jpg` (ou altere o campo `personal.avatar` em `src/data/profile.js` para o nome do seu arquivo). Caso o arquivo não exista, o projeto usa `public/avatar-placeholder.svg` como fallback.

### 5. Atualize o título e metadados (`index.html`)

Abra [`index.html`](index.html) e ajuste a tag `<title>` e eventuais meta tags com o seu nome.

> **Dica:** Alguns textos de subtítulo ou rodapé específicos (como a assinatura na tela de loading) também podem ser revisados diretamente nos componentes em `src/components/` caso queira personalizar detalhes além de `profile.js`.

### 6. Rode localmente para testar

```bash
npm run dev
```

Acesse o endereço exibido no terminal (geralmente `http://localhost:5173`).

---

## 📜 Scripts Disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento com Vite |
| `npm run build` | Gera a build de produção na pasta `dist/` |
| `npm run preview` | Visualiza localmente a build de produção |
| `npm run lint` | Executa a verificação de código com `oxlint` |

---

## 🌐 Deploy

Após personalizar seus dados, você pode publicar gratuitamente a pasta `dist/` (gerada com `npm run build`) em plataformas como **Vercel**, **Netlify** ou **GitHub Pages**.
