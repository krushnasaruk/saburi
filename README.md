# 🕉️ Virtual Gurukul — Full-Stack Educational Platform

Virtual Gurukul is a next-generation, premium educational platform that merges ancient Indian wisdom (Vedic Mathematics, Sanskrit script, Ashtanga Yoga, Ayurveda botany) with futuristic, responsive, and highly interactive browser-based interfaces.

---

## 🚀 Architectural Setup

The repository features two distinct, optimized directories designed to guarantee both instant local utility and enterprise scale:

### 1. Zero-Dependency Local Showcase (Root Directory)
Designed for immediate execution on machines lacking compile environments. Simply double-click **`index.html`** in your browser!
- **`index.html`**: Premium portal layout.
- **`style.css`**: Tailwind-inspired glassmorphism, earth-tone coloring, and dark modes.
- **`app.js`**: Client-side hash routing, lotuses particles generator, custom cursors.
- **`data.js`**: Simulated relational database managers using `localStorage`.
- **`audio-synth.js`**: REAL-TIME Indian classical Tanpura and Flute drone synth.
- **`guru-ai.js`**: Conversational chat NLP solving Vedic calculations.
- **`certificates.js`**: Dynamic calligraphic Canvas credential builders.

### 2. Enterprise Full-Stack Codebase (`/frontend/` & `/backend/`)
Structured using industry-standard MVC architectures, fully ready to deploy to cloud providers (e.g. Vercel, Render, Railway, MongoDB Atlas).

#### A. Backend API (`/backend/`)
- **Main Server**: Express bootstrap server with CORS parsing, JWT authorization filters, and MongoDB connection gateways.
- **Data Models**: Mongoose schemas for `User.js` (passwords hashed via bcrypt), `Course.js` (with embeds for lessons and quiz lists), and `Enrollment.js` tracking.
- **Controllers & Routing**: Scalable endpoints in `controllers/` and mappings in `routes/`.
- **Setup & Launch**:
  1. Navigate to `/backend/` and run `npm install`.
  2. Create a `.env` file specifying your `MONGODB_URI`, `PORT=5000`, and `JWT_SECRET`.
  3. Start dev servers: `npm run dev`.

#### B. React.js Client (`/frontend/`)
- **Main Framework**: Reactive Single Page Application bundled with Vite, styled with Tailwind CSS, and using React Hooks.
- **Interactive UI**: Responsive navbar menus, dynamic search tables, canvas certificates wrappers, and active classroom feeds.
- **Auth Provider**: JWT login hooks mapping profiles and active streaks, with local storage fallbacks.
- **Setup & Launch**:
  1. Navigate to `/frontend/` and run `npm install`.
  2. Start hot-reload dev servers: `npm run dev`.
  3. Bundle builds: `npm run build`.

---

## 🎨 Creative Aesthetic Guidelines
- **Earthy Saffron Palette**: Cream backgrounds (`#faf5eb`), deep sienna brown headings (`#251206`), warm saffron gold highlights (`#d96b27`), and transparent glass widgets.
- **Tanpura drone Synth**: Custom synthesized Web Audio waves mimicking acoustic instruments.
- **Vedic Mathematics Solver**: NLP queries calculating squaring sutras (*Ekadhikena Purvena*) and complements (*Nikhilam Sutra*) dynamically.
