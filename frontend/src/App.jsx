/**
 * Virtual Gurukul - React Main Application Shell & Dynamic Router
 */

import React, { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Courses from "./components/Courses";
import Dashboard from "./components/Dashboard";
import VirtualClassroom from "./components/VirtualClassroom";
import Contact from "./components/Contact";
import GuruAI from "./components/GuruAI";
import { AudioSynth } from "../../audio-synth";

function AppContent() {
  const { user, logout } = useAuth();
  const [route, setRoute] = useState(window.location.hash || "#/");
  const [darkMode, setDarkMode] = useState(false);
  const [musicActive, setMusicActive] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || "#/");
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Theme Controller
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Music Controller
  const toggleMusic = () => {
    const active = AudioSynth.toggle();
    setMusicActive(active);
  };

  // Parsing sub route parameters (e.g. #/course/course_sanskrit)
  const getSubRouteParam = (pattern) => {
    const match = route.match(pattern);
    return match ? match[1] : null;
  };

  const renderActiveView = () => {
    let courseId = null;

    if (route === "#/" || route === "#") {
      return (
        <>
          <Hero />
          <About />
          <Contact />
        </>
      );
    } else if (route === "#/courses") {
      return <Courses />;
    } else if (route === "#/classroom") {
      return <VirtualClassroom />;
    } else if (route === "#/dashboard") {
      return <Dashboard />;
    } else if (route === "#/login" || route === "#/register") {
      return <AuthForm isRegister={route === "#/register"} />;
    } else if ((courseId = getSubRouteParam(/^#\/course\/([^/]+)$/))) {
      return <CoursePlayer courseId={courseId} />;
    } else {
      return (
        <div className="py-20 text-center">
          <h2 className="text-2xl font-bold">Wisdom Archive Not Found</h2>
          <a href="#/" className="mt-4 inline-block text-saffron font-bold">Return Home</a>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen font-body flex flex-col bg-cream dark:bg-[#140b06] text-sienna dark:text-[#fbf5ee]">
      {/* FLOATING HEADER */}
      <header className="sticky top-0 z-50 px-6 py-4 flex justify-between items-center glass backdrop-blur-md">
        <a href="#/" className="flex items-center gap-2 text-xl font-extrabold text-saffron hover:text-saffron-light">
          🕉️ Gurukul<span className="text-gold">.edu</span>
        </a>

        <Navbar activeRoute={route} />

        <div className="flex items-center gap-4">
          {/* Audio Synthesizer */}
          <button 
            onClick={toggleMusic} 
            className={`w-10 h-10 rounded-full border flex items-center justify-center text-lg ${musicActive ? 'border-saffron text-saffron bg-saffron/10' : 'border-sienna/20 dark:border-gold/20 text-sienna dark:text-gold'}`}
            title="Toggle Meditative Ambient Sound"
          >
            {musicActive ? '🕉️' : '📿'}
          </button>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className="w-10 h-10 rounded-full border border-sienna/20 dark:border-gold/20 flex items-center justify-center text-lg text-sienna dark:text-gold"
          >
            {darkMode ? '🌙' : '☀️'}
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold font-heading px-3 py-1.5 rounded-lg border border-saffron bg-saffron/5">
                👤 {user.fullName.split(' ')[0]}
              </span>
              <button onClick={logout} className="text-xs text-red-600 hover:text-red-800 font-bold">Logout</button>
            </div>
          ) : (
            <a href="#/login" className="px-4 py-2 bg-gradient-to-r from-saffron to-saffron-dark text-white rounded-xl text-sm font-semibold font-heading shadow-md hover:translate-y-[-1px] transition-transform">
              Join Gurukul
            </a>
          )}
        </div>
      </header>

      {/* CORE CONTENT */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        {renderActiveView()}
      </main>

      {/* FOOTER */}
      <footer className="bg-sienna text-cream py-16 px-6 mt-16 border-t-2 border-gold">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-heading font-extrabold text-lg text-gold mb-4">🕉️ Virtual Gurukul</h4>
            <p className="text-xs leading-relaxed text-[#c2ada0]">
              Blending the eternal guru-shishya lineages of Vedic India with future-generation React architectures to democratize timeless wisdom.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-bold text-gold mb-4">Wisdom Streams</h4>
            <ul className="text-xs space-y-2 text-[#c2ada0]">
              <li><a href="#/courses" className="hover:text-saffron-light">Vedic Mathematics</a></li>
              <li><a href="#/courses" className="hover:text-saffron-light">Sanskrit Devbhasha</a></li>
              <li><a href="#/courses" className="hover:text-saffron-light">Ashtanga Yoga & Dhyana</a></li>
              <li><a href="#/courses" className="hover:text-saffron-light">Ayurveda Foundations</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-bold text-gold mb-4">Portals</h4>
            <ul className="text-xs space-y-2 text-[#c2ada0]">
              <li><a href="#/classroom" className="hover:text-saffron-light">Live Ashram Schedule</a></li>
              <li><a href="#/dashboard" className="hover:text-saffron-light">Seeker Dashboard</a></li>
              <li><a href="#/login" className="hover:text-saffron-light">Guru Enlistment</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-bold text-gold mb-4">Newsletter Dispatch</h4>
            <p className="text-xs text-[#c2ada0] mb-3">Subscribe to receive Sanskrit sutras, calculations, and botanical dispatches.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed!"); }} className="flex gap-2">
              <input type="email" placeholder="Your email..." required className="flex-1 bg-black/30 border border-white/10 rounded-lg p-2 text-xs text-white outline-none" />
              <button type="submit" className="bg-saffron text-white text-xs px-4 py-2 rounded-lg font-bold">Join</button>
            </form>
          </div>
        </div>
        <div className="text-center text-xs text-[#8c7365] border-t border-white/5 mt-10 pt-6">
          &copy; 2026 Virtual Gurukul. Dedicated to digitizing Vedic heritage.
        </div>
      </footer>

      {/* FLOATING GURU AI WIDGET */}
      <GuruAI />
    </div>
  );
}

// Subcomponent: Auth Forms Login/Register
function AuthForm({ isRegister }) {
  const { login, register } = useAuth();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isRegister) {
      const res = await register(fullName, username, email, password, role);
      if (res.success) {
        window.location.hash = "#/dashboard";
      } else {
        setError(res.message);
      }
    } else {
      const res = await login(username, password);
      if (res.success) {
        window.location.hash = "#/dashboard";
      } else {
        setError(res.message);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 p-8 glass rounded-3xl hover:border-gold transition-all duration-300">
      <h2 className="text-2xl font-bold font-heading text-center text-saffron mb-2">
        {isRegister ? "Initiate Shishya Oath" : "Enter Sanctuary Portal"}
      </h2>
      <p className="text-xs text-center text-sienna/60 dark:text-cream/60 mb-6">
        {isRegister ? "Start your holistic spiritual growth journey" : "Acquire credentials to unlock streaks & XP"}
      </p>

      {error && <div className="p-3 mb-4 rounded-xl bg-red-100 text-red-800 text-xs font-semibold">{error}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {isRegister && (
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold">Seeker Full Name</label>
            <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required className="p-2.5 rounded-lg border border-sienna/20 bg-cream/30 text-sm outline-none" />
          </div>
        )}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold">{isRegister ? "Choose Username" : "Username / Email"}</label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} required className="p-2.5 rounded-lg border border-sienna/20 bg-cream/30 text-sm outline-none" />
        </div>
        {isRegister && (
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold">Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="p-2.5 rounded-lg border border-sienna/20 bg-cream/30 text-sm outline-none" />
          </div>
        )}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold">Secret Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="p-2.5 rounded-lg border border-sienna/20 bg-cream/30 text-sm outline-none" />
        </div>
        {isRegister && (
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold">Choose Portal Role</label>
            <select value={role} onChange={e => setRole(e.target.value)} className="p-2.5 rounded-lg border border-sienna/20 bg-cream/30 text-sm outline-none">
              <option value="student">Student (Shishya)</option>
              <option value="guru">Teacher (Guru)</option>
            </select>
          </div>
        )}
        <button type="submit" className="mt-4 p-3 bg-saffron text-white rounded-xl text-sm font-semibold font-heading shadow-md hover:bg-saffron-dark transition-colors">
          {isRegister ? "Commit Vows" : "Enter Sanctuary"}
        </button>
      </form>
    </div>
  );
}

// Subcomponent: Course Player Placeholder (For router links compatibility)
function CoursePlayer({ courseId }) {
  return (
    <div className="py-20 text-center glass rounded-3xl p-8 max-w-2xl mx-auto">
      <span className="text-5xl">📚</span>
      <h2 className="text-2xl font-bold font-heading text-saffron mt-4">Active Wisdom Stream Active</h2>
      <p className="text-sm mt-2 text-sienna/60">
        You are looking at syllabus module: <strong className="text-sienna">{courseId}</strong>.<br />
        To enjoy complete multi-lesson videos, quiz grading models, and Canvas graduation certificates download triggers, click 
        <a href="#/" className="mx-1 text-saffron underline hover:text-saffron-light font-bold">Home</a> 
        and open the zero-dependency client preview.
      </p>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
