import React, { useState } from "react";

export default function Courses() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const sampleCourses = [
    {
      id: "course_sanskrit",
      title: "Sanskrit Devbhasha Introduction",
      category: "Sanskrit Learning",
      instructor: "Acharya Vidyasagar",
      duration: "6 Weeks",
      level: "Beginner",
      rating: "4.9",
      thumb: "assets/sanskrit_manuscript.png",
      desc: "Discover 'Devbhasha'—the language of the gods. Learn the Devanagari script, phonetics, rules of sandhi, and recite Rigvedic shlokas."
    },
    {
      id: "course_vedic_maths",
      title: "Vedic Mathematics & Fast Computations",
      category: "Vedic Mathematics",
      instructor: "Aryabhata Junior",
      duration: "4 Weeks",
      level: "Beginner",
      rating: "4.8",
      thumb: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80",
      desc: "Unlock mental calculations superpowers with 16 sacred mathematical sutras. Solve divisions and multiplications in seconds."
    },
    {
      id: "course_yoga_meditation",
      title: "Ashtanga Yoga & Prana Meditation",
      category: "Yoga & Meditation",
      instructor: "Yogi Anand",
      duration: "5 Weeks",
      level: "Intermediate",
      rating: "5.0",
      thumb: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80",
      desc: "Deep dive into Patanjali's Yoga Sutras. Master physical postures (Asanas) and breath alignment sequences."
    },
    {
      id: "course_ayurveda",
      title: "Ayurveda Foundations & Holistic Living",
      category: "Ayurveda",
      instructor: "Dr. Dhanvantari",
      duration: "8 Weeks",
      level: "Advanced",
      rating: "4.7",
      thumb: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=400&q=80",
      desc: "Study element dynamics, daily routines (Dinacharya), the three physiological Doshas (Vata, Pitta, Kapha) and dietary wellness."
    }
  ];

  const filtered = sampleCourses.filter(c => {
    const matchesFilter = filter === "all" || c.level.toLowerCase() === filter;
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || 
                          c.category.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section className="py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-3xl font-extrabold font-heading text-sienna dark:text-cream">
          Syllabus Archives (Shastra Catalog)
        </h2>
        <p className="text-sm text-sienna/60 dark:text-cream/60 mt-2">
          Master the traditional sciences of the Indian subcontinent with immersive structures.
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8 bg-cream-light dark:bg-sienna-light/10 p-4 rounded-2xl border border-sienna/10 dark:border-gold/10">
        <input 
          type="text" 
          placeholder="Search courses (e.g. Sanskrit, Maths)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-80 p-2 border border-sienna/15 dark:border-gold/15 bg-cream/35 rounded-xl text-xs outline-none focus:border-saffron"
        />

        <div className="flex gap-2">
          {["all", "beginner", "intermediate", "advanced"].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilter(lvl)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold font-heading transition-colors border ${
                filter === lvl 
                  ? "bg-saffron border-saffron text-white" 
                  : "bg-white dark:bg-sienna-light border-sienna/10 dark:border-gold/10 text-sienna dark:text-cream"
              }`}
            >
              {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-sm text-sienna/50">No courses match your query in current records.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map((c) => (
            <div key={c.id} className="glass rounded-3xl overflow-hidden hover:border-gold transition-all duration-300 flex flex-col">
              <div className="h-48 relative overflow-hidden">
                <img src={c.thumb} alt={c.title} className="w-full h-full object-cover" />
                <span className="absolute top-4 left-4 bg-sienna/75 backdrop-blur-sm text-gold text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">
                  {c.level}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-center text-[10px] font-bold text-sienna/50 dark:text-cream/50 mb-3">
                  <span>📚 {c.category}</span>
                  <span>⏳ {c.duration}</span>
                </div>
                <h3 className="text-base font-bold font-heading mb-2 leading-snug">{c.title}</h3>
                <p className="text-xs text-sienna/65 dark:text-cream/65 leading-relaxed mb-6 flex-1">{c.desc}</p>
                <div className="flex justify-between items-center border-t border-sienna/10 dark:border-gold/10 pt-4">
                  <span className="text-xs font-bold text-gold">⭐ {c.rating}</span>
                  <a href="#/" className="px-4 py-2 bg-gradient-to-r from-saffron to-saffron-dark text-white rounded-xl text-[11px] font-bold tracking-wide shadow-sm hover:translate-y-[-1px] transition-transform">
                    Enroll Stream
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
