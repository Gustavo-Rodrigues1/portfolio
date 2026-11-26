# ⚙️ Steampunk Industrial Portfolio

> **Language:** 🇺🇸 English | [🇧🇷 Portuguese](README.md)

An interactive portfolio with a **Steampunk / Victorian Industrial** aesthetic, built with **React**, **Vite**, and **Tailwind CSS**. The project combines animated mechanical elements (reactive gears on scroll, Nixie tubes, pressure gauges, CRT terminals, and a loading screen that behaves like a garage door) with a simple, centralized architecture for easy customization.

---

## ✨ Features

- **Steampunk Loading Screen (`SteampunkLoadingScreen`)**: Nixie tubes light up progressively (`L O A D I N G`), a golden fluid bar with dynamic bubbles, Victorian ornaments on the corners, and an exit animation that slides up like a garage door with a mechanical hook.
- **Identity & Glitch (`Navbar`, `Footer`, `GlitchText`)**: Name with a temporary glitch effect on hover and a mini green CRT monitor.
- **Projects Carousel (`ProjectsArchive`)**: Interactive carousel with synchronized gears, filament bulbs, and a CRT terminal with typing effect (`TerminalTyping`).
- **Gauges (`SkillsGauges`, `SteamGauge`)**: Visual representation of technical skills with BAR levels.
- **Timeline & Education (`ExperienceSection`, `AboutUFS`)**: Sections dedicated to professional journey, certifications, and academic background.
- **Telegraph‑style Contact (`ContactTelegraph`)**: Direct links to GitHub, LinkedIn, Email and WhatsApp.

---

## 🛠️ Technologies Used

- **React 19**
- **Vite 8**
- **Tailwind CSS 3**
- **Lucide React** & **React Icons**
- **Oxlint**

---

## 📁 Main Project Structure

```text
├── public/
│   ├── avatar-placeholder.svg   # Default avatar if no profile picture is provided
│   └── foto-perfil.jpg          # Your profile picture (add yours here)
├── src/
│   ├── components/              # Visual components and steampunk animations
│   ├── data/
│   │   └── profile.js           # Central file with all your personal data
│   ├── App.jsx                  # Main page layout
│   └── index.css                # Global styles and custom keyframes
├── index.html                   # Browser tab title and page metadata
└── package.json
```

---

## 🚀 How to Use This Project as a Template

Anyone can clone this repository and adapt it with their own information in just a few minutes.

### 1. Clone or Fork the Repository

```bash
git clone https://github.com/Gustavo-Rodrigues1/portf-lio.git
cd portf-lio
```

### 2. Install Dependencies

Make sure you have [Node.js](https://nodejs.org/) (v18+ recommended) installed:

```bash
npm install
```

### 3. Personalize Your Information in `src/data/profile.js`

Almost all of the portfolio content is loaded from the `profileData` object in [`src/data/profile.js`](src/data/profile.js). Edit each section with your own data:

- **`personal`**: name, professional title, university/education, location, headline, bio, tagline, years of experience, and avatar path.
- **`social`**: usernames and URLs for GitHub, LinkedIn, Email and WhatsApp.
- **`academic`**: course, institution, period, description, and pillars of your education.
- **`experiences`**: list of professional experiences (company, role, period, location, description, type, current).
- **`certifications`**: list of certifications (name, issuer).
- **`skills`**: your skills with category, percentage level (`level`) and displayed pressure (`pressure`, e.g., "9.0 BAR").
- **`projects`**: your projects (id, title, tagline, description, tech stack, GitHub URL, live URL, highlight flag, patent number).

### 4. Add Your Profile Picture

Place your picture inside the `public/` folder named `foto-perfil.jpg` (or change the `personal.avatar` field in `src/data/profile.js` to match your file name). If the file is missing, the project falls back to `public/avatar-placeholder.svg`.

### 5. Update the Page Title and Meta Tags (`index.html`)

Open [`index.html`](index.html) and adjust the `<title>` tag and any meta tags with your name.

> **Tip:** Some subtitle or footer texts (like the signature on the loading screen) can also be edited directly in the components under `src/components/` if you want to further customize beyond `profile.js`.

### 6. Run Locally to Test

```bash
npm run dev
```

Open the address shown in the terminal (usually `http://localhost:5173`).

---

## 📜 Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the development server with Vite |
| `npm run build` | Generates a production build in the `dist/` folder |
| `npm run preview` | Locally preview the production build |
| `npm run lint` | Runs code linting with `oxlint` |

---

## 🌐 Deploy

After personalizing your data, you can freely publish the `dist/` folder (generated with `npm run build`) on platforms like **Vercel**, **Netlify**, or **GitHub Pages**.
