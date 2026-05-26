import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function VirtualClassroom() {
  const { user } = useAuth();
  const [msgs, setMsgs] = useState([
    { sender: "Yogi Anand", text: "Pranam Acharyaji! The breath alignments are beautifully relieving." },
    { sender: "Rohit Nair", text: "Are Atharvaveda mathematical notes study materials downloadable?" },
    { sender: "Guru Vidyasagar", text: "Yes, check under the course playlist notes tab." }
  ]);
  const [inputVal, setInputVal] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const sender = user ? user.fullName : "Seeker Visitor";
    const newMsg = { sender, text: inputVal.trim() };
    setMsgs([...msgs, newMsg]);
    setInputVal("");

    setTimeout(() => {
      setMsgs(prev => [
        ...prev, 
        { sender: "Guru Vidyasagar", text: `🙏 Divine contemplation, ${sender.split(' ')[0]}. Reflect on that deeply.` }
      ]);
    }, 1100);
  };

  return (
    <section className="py-8">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-3xl font-extrabold font-heading text-sienna dark:text-cream">
          Virtual Ashram Broadcasts & Timetable
        </h2>
        <p className="text-sm text-sienna/60 dark:text-cream/60 mt-2">
          Participate in live Vedic discussions, view ashram schedules, and study alongside fellow shishyas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* TIMETABLE */}
        <div className="glass p-8 rounded-3xl">
          <h3 className="font-heading font-extrabold text-saffron border-b border-sienna/10 dark:border-gold/10 pb-3 mb-6 text-base">Ashram Calendar Schedule</h3>
          <div className="space-y-4">
            <div className="p-4 glass rounded-2xl flex justify-between items-center gap-4">
              <div>
                <h4 className="font-bold text-sm leading-snug">Vedic Astronomy Planetary transits</h4>
                <p className="text-[10px] text-sienna/60">Guru: Acharya Vidyasagar • Live stream active</p>
              </div>
              <span className="text-[10px] font-bold text-saffron bg-saffron/10 border border-saffron/20 px-2.5 py-1 rounded-lg">10:00 AM IST</span>
            </div>
            <div className="p-4 glass rounded-2xl flex justify-between items-center gap-4">
              <div>
                <h4 className="font-bold text-sm leading-snug">Sanskrit Grammar Sandhi rules</h4>
                <p className="text-[10px] text-sienna/60">Guru: Acharya Vidyasagar • Scheduled stream</p>
              </div>
              <span className="text-[10px] font-bold text-saffron bg-saffron/10 border border-saffron/20 px-2.5 py-1 rounded-lg">12:30 PM IST</span>
            </div>
            <div className="p-4 glass rounded-2xl flex justify-between items-center gap-4 opacity-50">
              <div>
                <h4 className="font-bold text-sm leading-snug">Pranayama Ashtanga Breath Meditation</h4>
                <p className="text-[10px] text-sienna/60">Guru: Yogini Maitreyi • Concluded stream</p>
              </div>
              <span className="text-[10px] font-bold bg-sienna/10 text-sienna/60 px-2.5 py-1 rounded-lg">Concluded</span>
            </div>
          </div>
        </div>

        {/* ACTIVE BROADCAST SIMULATOR */}
        <div className="bg-black rounded-3xl overflow-hidden border border-sienna/15 dark:border-gold/15 flex flex-col h-[520px] shadow-lg">
          <div className="flex-1 relative bg-black flex justify-center items-center">
            <video 
              className="w-full h-full object-cover" 
              autoPlay loop muted playsInline 
              src="https://www.w3schools.com/html/movie.mp4"
            ></video>
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-[#fff] text-[10px] px-3 py-1 rounded-md flex items-center gap-2 border border-white/10 font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Live Broadcast
            </div>
          </div>

          <div className="h-44 bg-sienna-light/10 border-t border-white/15 flex flex-col justify-between">
            <div className="flex-1 overflow-y-auto p-4 space-y-2 text-[11px]">
              {msgs.map((m, idx) => (
                <div key={idx} className="leading-relaxed">
                  <span className="font-bold text-gold">{m.sender}:</span> <span className="text-white/80">{m.text}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSend} className="flex border-t border-white/10 bg-black/40">
              <input
                type="text"
                placeholder="Participate in live class discussion..."
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                className="flex-1 bg-transparent border-none text-xs text-white p-3.5 outline-none"
              />
              <button type="submit" className="bg-saffron text-white text-xs px-5 py-3 font-bold">Send</button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
