# Shubhrato Badole — Portfolio

Personal portfolio website built from scratch with React and TypeScript.

Live → [shubhrato.vercel.app](https://shubhrato.vercel.app)

---

## What's inside

**Entry experience** — Visitors type their name before entering. The portfolio greets them personally throughout.

**Vibe Check** — A dark humor HR Bot evaluates the visitor with unhinged corporate messages before granting access.

**Hero** — Animated star canvas background with typewriter role cycling.

**About** — Split layout with an animated self-typing code editor.

**Skills** — Filterable grid with per-skill hover level bars.

**Projects** — 3D tilt cards with mouse-follow glow effect.

**Contact** — EmailJS powered form. Visitor name pre-filled from entry.



## Stack

| Layer      | Tech                          |
|------------|-------------------------------|
| Framework  | React 18 + TypeScript         |
| Build tool | Vite                          |
| Styling    | Tailwind CSS v4               |
| Animation  | Framer Motion                 |
| Email      | EmailJS                       |
| Deploy     | Vercel                        |

---

## Run locally

```bash
git clone https://github.com/shubhrato/portfolio
cd portfolio
npm install
cp .env.example .env
# Add your EmailJS keys to .env
npm run dev
```

## Environment variables
VITE_EMAILJS_SERVICE_ID=

VITE_EMAILJS_TEMPLATE_ID=

VITE_EMAILJS_PUBLIC_KEY=



## Project structure

src/

├── components/

│   ├── Entry/        # EntryGate + VibeCheck

│   ├── Hero/         # Hero + StarCanvas + Typewriter

│   ├── About/        # About + CodeEditor

│   ├── Skills/       # Skills + SkillCard

│   ├── Projects/     # Projects + ProjectCard

│   ├── Games/        # BugSquash + CircuitPuzzle

│   ├── Contact/      # Contact form

│   └── Layout/       # Navbar + Footer

├── context/          # VisitorContext (global state)

├── hooks/            # useScrollAnimation + useKonamiCode

└── styles/           # globals.css



---

## What I learned building this

- React Context API for global state without prop drilling
- Canvas API for star field and particle animations
- Custom hooks for scroll detection and keyboard sequences
- TypeScript interfaces and type safety throughout
- CSS animations without any animation library
- EmailJS for contact form with zero backend

---

Built by **Shubhrato Badole** · Nagpur, India · Open to opportunities
