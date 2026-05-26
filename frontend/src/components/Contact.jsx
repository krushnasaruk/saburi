import React, { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [stream, setStream] = useState("Vedic Mathematics");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setName("");
      setEmail("");
      setStream("Vedic Mathematics");
      setMessage("");
      setSubmitted(false);
      alert("🕉️ Inquiry dispatched successfully to the Vedic Council!");
    }, 800);
  };

  return (
    <section className="py-16 border-t border-sienna/5 dark:border-gold/5">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-extrabold font-heading text-sienna dark:text-cream mb-3">
          Seek Admittance to Gurukul
        </h2>
        <p className="text-sm text-sienna/60 dark:text-cream/60">
          Get in touch with our traditional council for specialized learning regimes, corporate yoga retreats, or research partnerships.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Contact Details */}
        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-4">
            <span className="text-2xl p-3 glass rounded-xl">📍</span>
            <div>
              <h4 className="font-heading font-extrabold text-base text-sienna dark:text-cream">
                Sacred Ashram Sanctuary
              </h4>
              <p className="text-xs text-sienna/60 dark:text-cream/60 mt-1">
                Himalayan foothills range, Uttarakhand, Bharat (India)
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="text-2xl p-3 glass rounded-xl">✉️</span>
            <div>
              <h4 className="font-heading font-extrabold text-base text-sienna dark:text-cream">
                Vedic Council Inquiries
              </h4>
              <p className="text-xs text-sienna/60 dark:text-cream/60 mt-1">
                council@gurukul.edu
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <h4 className="font-heading font-extrabold text-base text-sienna dark:text-cream flex items-center gap-2">
              <span>🗺️</span> Digital Ashram Orbit View
            </h4>
            <div className="h-48 glass rounded-2xl flex items-center justify-center text-center p-4 border border-sienna/10 dark:border-gold/10 font-bold text-saffron text-xs">
              🏔️ Sacred Himalayan Coordinates Active (Vector Map Overlay)
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="glass p-8 rounded-3xl hover:border-gold transition-all duration-300 flex flex-col gap-4"
        >
          <h3 className="text-lg font-bold font-heading text-saffron border-b border-sienna/10 dark:border-gold/10 pb-2">
            Inquiry Dispatch
          </h3>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-sienna/80 dark:text-cream/80">Seeker Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2.5 rounded-lg border border-sienna/20 dark:border-gold/20 bg-cream/30 dark:bg-black/30 text-sm outline-none focus:border-saffron transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-sienna/80 dark:text-cream/80">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2.5 rounded-lg border border-sienna/20 dark:border-gold/20 bg-cream/30 dark:bg-black/30 text-sm outline-none focus:border-saffron transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-sienna/80 dark:text-cream/80">Chosen Study Stream</label>
            <select
              value={stream}
              onChange={(e) => setStream(e.target.value)}
              className="p-2.5 rounded-lg border border-sienna/20 dark:border-gold/20 bg-cream/30 dark:bg-black/30 text-sm outline-none focus:border-saffron transition-colors"
            >
              <option value="Vedic Mathematics">Vedic Mathematics</option>
              <option value="Sanskrit Devbhasha">Sanskrit Devbhasha</option>
              <option value="Ashtanga Yoga & Breathing">Ashtanga Yoga & Breathing</option>
              <option value="Ayurvedic Pharmacology">Ayurvedic Pharmacology</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-sienna/80 dark:text-cream/80">Sincere Intention Message</label>
            <textarea
              rows="4"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="p-2.5 rounded-lg border border-sienna/20 dark:border-gold/20 bg-cream/30 dark:bg-black/30 text-sm outline-none focus:border-saffron transition-colors resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={submitted}
            className="mt-2 p-3 bg-gradient-to-r from-saffron to-saffron-dark text-white rounded-xl text-sm font-semibold font-heading shadow-md hover:translate-y-[-1px] transition-all disabled:opacity-50 animate-pulse-slow"
          >
            {submitted ? "Dispatching..." : "Dispatch to Council"}
          </button>
        </form>
      </div>
    </section>
  );
}
