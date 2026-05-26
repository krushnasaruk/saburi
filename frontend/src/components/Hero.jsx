import React from "react";

export default function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12 md:py-20">
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading leading-tight dark:text-[#fbf5ee]">
          Virtual Gurukul — <br />
          <span className="bg-gradient-to-r from-saffron to-gold bg-clip-text text-transparent">
            Reviving Ancient Indian Wisdom Digitally
          </span>
        </h1>
        <p className="text-sm md:text-base leading-relaxed text-sienna/75 dark:text-cream/75 max-w-xl">
          Empower your intellect with the optimal synergy of ancient Indian wisdom systems and high-tech digital environments. Solve computations using Atharvaveda sutras, learn Sanskrit phonetic pronunciations, and master Patanjali Yoga postures from anywhere in the cosmos.
        </p>
        <div className="flex gap-4">
          <a href="#/courses" className="px-6 py-3 bg-gradient-to-r from-saffron to-saffron-dark text-white rounded-xl font-bold font-heading shadow-md hover:translate-y-[-1px] transition-transform">
            Explore Courses
          </a>
          <a href="#/login" className="px-6 py-3 border border-sienna/20 dark:border-gold/20 hover:bg-sienna/5 rounded-xl font-bold font-heading transition-colors">
            Join Gurukul
          </a>
        </div>
        
        <div className="grid grid-cols-3 gap-6 bg-cream-light/60 dark:bg-sienna-light/20 p-5 rounded-2xl border border-sienna/10 dark:border-gold/10 mt-6">
          <div>
            <h3 className="text-xl font-heading font-extrabold text-saffron">50K+</h3>
            <p className="text-[10px] text-sienna/60 dark:text-cream/60">Active Shishyas</p>
          </div>
          <div>
            <h3 className="text-xl font-heading font-extrabold text-saffron">150+</h3>
            <p className="text-[10px] text-sienna/60 dark:text-cream/60">Acharyas Approved</p>
          </div>
          <div>
            <h3 className="text-xl font-heading font-extrabold text-saffron">98%</h3>
            <p className="text-[10px] text-sienna/60 dark:text-cream/60">Daily Streak Rate</p>
          </div>
        </div>
      </div>

      <div className="relative h-[360px] md:h-[450px] w-full rounded-3xl overflow-hidden border border-sienna/15 dark:border-gold/15 shadow-xl group">
        <img 
          src="assets/hero_background.png" 
          alt="Virtual Gurukul Sunset Sanctuary" 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sienna/85 via-sienna/25 to-transparent flex items-end p-8 text-white">
          <div>
            <h3 className="font-heading font-extrabold text-lg text-gold mb-1">Traditional Digital Ashram</h3>
            <p className="text-xs opacity-85 leading-relaxed">Immerse in synthesized spiritual classical sitar and dynamic Vedic mathematical modules.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
