import React from "react";

export default function About() {
  const pillars = [
    { icon: "🧘", title: "Guru-Shishya Tradition", desc: "Experience tailored lineage transmission where authorized Acharyas monitor and guide your mental growth." },
    { icon: "📜", title: "Vedic Foundations", desc: "Read and decode Sanskrit scriptures, rigvedic mantras, sandhi, and asthantanga cosmological systems." },
    { icon: "🧮", title: "Mental Superpowers", desc: "Unlock high-speed calculations, mathematical sutras, and concentration disciplines." }
  ];

  return (
    <section className="py-16 border-t border-sienna/5 dark:border-gold/5">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-extrabold font-heading text-sienna dark:text-cream mb-3">
          The Sacred Lineage Ecosystem
        </h2>
        <p className="text-sm text-sienna/60 dark:text-cream/60">
          Blending the rigor of Vedic training with modern web technologies, Virtual Gurukul democratizes holistic Indian spiritual and structural sciences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((p, idx) => (
          <div key={idx} className="p-8 glass rounded-2xl hover:border-gold transition-all duration-300">
            <span className="text-4xl block mb-6">{p.icon}</span>
            <h3 className="text-lg font-bold font-heading mb-2">{p.title}</h3>
            <p className="text-xs text-sienna/75 dark:text-cream/75 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
