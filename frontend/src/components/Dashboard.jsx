import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [adminTab, setAdminTab] = useState("analytics");

  if (!user) {
    return (
      <div className="py-20 text-center glass rounded-3xl max-w-md mx-auto px-6">
        <h2 className="text-xl font-bold font-heading text-saffron">Sanctuary Entrance Protected</h2>
        <p className="text-xs text-sienna/60 dark:text-cream/60 mt-2">Log in or create a seeker profile to unlock your dynamic dashboard metrics.</p>
        <a href="#/login" className="mt-6 inline-block px-5 py-2.5 bg-saffron text-white rounded-xl text-xs font-semibold shadow-md">Enter Sanctuary</a>
      </div>
    );
  }

  // --- 1. ADMIN DASHBOARD VIEW ---
  if (user.role === "admin") {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 py-6">
        <div className="lg:col-span-1 glass p-6 rounded-3xl flex flex-col gap-2 h-fit">
          <h3 className="font-heading font-extrabold text-saffron border-b border-sienna/10 dark:border-gold/10 pb-3 mb-4 text-base">Chancellor Command</h3>
          <button onClick={() => setAdminTab("analytics")} className={`w-full text-left p-3 rounded-xl text-xs font-heading font-bold transition-all ${adminTab === 'analytics' ? 'bg-saffron text-white' : 'hover:bg-saffron/10'}`}>Analytics Hub</button>
          <button onClick={() => setAdminTab("courses")} className={`w-full text-left p-3 rounded-xl text-xs font-heading font-bold transition-all ${adminTab === 'courses' ? 'bg-saffron text-white' : 'hover:bg-saffron/10'}`}>Syllabus CRUD</button>
          <button onClick={() => setAdminTab("users")} className={`w-full text-left p-3 rounded-xl text-xs font-heading font-bold transition-all ${adminTab === 'users' ? 'bg-saffron text-white' : 'hover:bg-saffron/10'}`}>Shishya Approvals</button>
          <button onClick={logout} className="mt-8 w-full p-3 rounded-xl border border-sienna/10 hover:bg-red-50 text-red-600 text-xs font-bold text-center">Wipe Session</button>
        </div>

        <div className="lg:col-span-3 glass p-8 rounded-3xl">
          {adminTab === "analytics" && (
            <div>
              <h3 className="font-heading font-extrabold text-lg text-saffron border-b border-sienna/10 dark:border-gold/10 pb-3 mb-6">Ashram Live Analytics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="p-4 bg-saffron/5 border border-saffron/20 rounded-2xl">
                  <span className="text-2xl">🕉️</span>
                  <h4 className="text-xl font-bold mt-2">12</h4>
                  <p className="text-[10px] text-sienna/60">Enrolled Seekers</p>
                </div>
                <div className="p-4 bg-saffron/5 border border-saffron/20 rounded-2xl">
                  <span className="text-2xl">📚</span>
                  <h4 className="text-xl font-bold mt-2">4</h4>
                  <p className="text-[10px] text-sienna/60">Active Shastras</p>
                </div>
                <div className="p-4 bg-saffron/5 border border-saffron/20 rounded-2xl">
                  <span className="text-2xl">🔥</span>
                  <h4 className="text-xl font-bold mt-2">4.5 Days</h4>
                  <p className="text-[10px] text-sienna/60">Avg. Daily Streak</p>
                </div>
                <div className="p-4 bg-saffron/5 border border-saffron/20 rounded-2xl">
                  <span className="text-2xl">🏆</span>
                  <h4 className="text-xl font-bold mt-2">2,850</h4>
                  <p className="text-[10px] text-sienna/60">Total Ashram XP</p>
                </div>
              </div>
              <h4 className="font-bold mb-2">Chancellor Operations Console</h4>
              <div className="p-4 bg-black/5 dark:bg-white/5 rounded-xl text-xs space-y-2 text-sienna/70 dark:text-cream/70 leading-relaxed font-mono">
                <div>🟢 [SECURE]: Local adapter database sync online.</div>
                <div>🟢 [SYNTH]: Sitar/Drone Web Audio oscillators functional.</div>
                <div>🟢 [AI BOT]: Chat lookup index mapped.</div>
              </div>
            </div>
          )}

          {adminTab === "courses" && (
            <div>
              <h3 className="font-heading font-extrabold text-lg text-saffron border-b border-sienna/10 dark:border-gold/10 pb-3 mb-4">Curriculum Inventory</h3>
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-sienna/10 text-saffron font-bold">
                    <th className="py-2">Course Title</th>
                    <th className="py-2">Category</th>
                    <th className="py-2">Instructor</th>
                    <th className="py-2">Difficulty</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sienna/5">
                  <tr>
                    <td className="py-3 font-semibold">Sanskrit Devbhasha Introduction</td>
                    <td>Sanskrit Learning</td>
                    <td>Acharya Vidyasagar</td>
                    <td>Beginner</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold">Vedic Mathematics & Fast Computations</td>
                    <td>Vedic Mathematics</td>
                    <td>Aryabhata Junior</td>
                    <td>Beginner</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {adminTab === "users" && (
            <div>
              <h3 className="font-heading font-extrabold text-lg text-saffron border-b border-sienna/10 dark:border-gold/10 pb-3 mb-4">Seeker Registry</h3>
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-sienna/10 text-saffron font-bold">
                    <th className="py-2">Seeker Full Name</th>
                    <th className="py-2">Username</th>
                    <th className="py-2">Enrolled Role</th>
                    <th className="py-2">Streak Progress</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sienna/5">
                  <tr>
                    <td className="py-3 font-semibold">Aarav Sharma</td>
                    <td>shishya</td>
                    <td>Student</td>
                    <td>🔥 5 Days</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold">Acharya Vidyasagar</td>
                    <td>acharya</td>
                    <td>Guru</td>
                    <td>🔥 1 Day</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- 2. GURU DASHBOARD VIEW ---
  if (user.role === "guru") {
    return (
      <div className="max-w-2xl mx-auto my-8 glass p-8 rounded-3xl text-center flex flex-col items-center gap-4">
        <span className="text-5xl">🧘</span>
        <h2 className="text-2xl font-bold font-heading text-saffron">Acharya Sanctuary Dashboard</h2>
        <p className="text-xs text-sienna/60 dark:text-cream/60 max-w-md leading-relaxed">
          Welcome, <strong>{user.fullName}</strong>. Your instruction credentials are approved in the Virtual Gurukul. Manage your study queues, curriculum approvals, and live lectures schedule.
        </p>

        <div className="w-full text-left bg-saffron/5 p-5 rounded-2xl border border-saffron/20 mt-4 space-y-3">
          <h3 className="text-sm font-bold border-b border-saffron/10 pb-2">Active Timetable broadcasts</h3>
          <div className="flex justify-between items-center text-xs">
            <div>
              <h4 className="font-semibold">Vedic Astronomy Planetary Alignments</h4>
              <p className="text-[10px] text-sienna/50 mt-0.5">Approved & Live in Ashram</p>
            </div>
            <span className="px-2.5 py-1 bg-green-600 text-white rounded font-bold uppercase tracking-wider text-[9px]">Live</span>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button onClick={logout} className="px-5 py-2.5 bg-sienna-light/10 text-sienna border border-sienna/20 rounded-xl text-xs font-bold">Wipe Session</button>
          <a href="#/classroom" className="px-5 py-2.5 bg-saffron text-white rounded-xl text-xs font-bold">Enter Live Broadcast</a>
        </div>
      </div>
    );
  }

  // --- 3. STUDENT DASHBOARD VIEW ---
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-6">
      {/* PROFILE SIDEBAR */}
      <div className="lg:col-span-1 glass p-8 rounded-3xl text-center flex flex-col items-center sticky top-28 h-fit">
        <div className="text-5xl mb-3">{user.avatar}</div>
        <h2 className="text-xl font-bold font-heading leading-tight">{user.fullName}</h2>
        <p className="text-xs font-bold text-saffron tracking-wider font-heading mt-1">Shishya (Seeker)</p>

        <div className="w-full bg-sienna/10 dark:bg-gold/10 h-2.5 rounded-full overflow-hidden mt-6">
          <div className="bg-gradient-to-r from-gold to-saffron h-full rounded-full" style={{ width: `${user.xp % 100}%` }}></div>
        </div>
        <p className="text-[10px] text-sienna/50 dark:text-cream/50 mt-1.5 mb-6">Level {Math.floor(user.xp / 100) + 1} ({user.xp} Total XP)</p>

        <div className="grid grid-cols-2 gap-4 w-full bg-saffron/5 p-4 rounded-xl border border-saffron/10 mb-8">
          <div>
            <h4 className="text-base font-bold text-saffron">🔥 {user.streak} days</h4>
            <p className="text-[9px] text-sienna/65">Daily Streak</p>
          </div>
          <div>
            <h4 className="text-base font-bold text-saffron">🏆 Rank #3</h4>
            <p className="text-[9px] text-sienna/65">Leaderboard Standing</p>
          </div>
        </div>

        <button onClick={logout} className="w-full py-2.5 bg-sienna-light/10 text-sienna border border-sienna/20 rounded-xl text-xs font-bold">Wipe Session</button>
      </div>

      {/* DASHBOARD SECTIONS */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        
        {/* ENROLLMENTS */}
        <div className="glass p-8 rounded-3xl flex flex-col gap-4">
          <h3 className="font-heading font-extrabold text-saffron border-b border-sienna/10 dark:border-gold/10 pb-3 text-base">My Wisdom Streams</h3>
          
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-saffron/5 border border-saffron/15 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex-1">
                <h4 className="text-sm font-bold leading-snug">Sanskrit Devbhasha Introduction</h4>
                <p className="text-[10px] text-sienna/60">Instructor: Acharya Vidyasagar</p>
                <div className="w-full bg-sienna/10 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-saffron h-full rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <a href="#/" className="px-4 py-2 bg-saffron text-white rounded-xl text-[10px] font-bold shadow-sm">Resume Player</a>
            </div>
            <div className="p-4 rounded-2xl bg-saffron/5 border border-saffron/15 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex-1">
                <h4 className="text-sm font-bold leading-snug">Vedic Mathematics & Fast Computations</h4>
                <p className="text-[10px] text-sienna/60">Instructor: Aryabhata Junior</p>
                <div className="w-full bg-sienna/10 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-saffron h-full rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              <a href="#/" className="px-4 py-2 bg-saffron text-white rounded-xl text-[10px] font-bold shadow-sm">Download Certificate</a>
            </div>
          </div>
        </div>

        {/* REWARDS & BADGES */}
        <div className="glass p-8 rounded-3xl">
          <h3 className="font-heading font-extrabold text-saffron border-b border-sienna/10 dark:border-gold/10 pb-3 mb-6 text-base">Earned Shishya Badges</h3>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-cream/30 dark:bg-sienna-light/10 border border-sienna/10 rounded-xl">
              <span className="text-2xl">📜</span>
              <p className="text-[10px] font-bold mt-1 leading-tight">Veda Novice</p>
              <span className="text-[8px] opacity-75">Unlocked</span>
            </div>
            <div className="p-3 bg-cream/30 dark:bg-sienna-light/10 border border-saffron/30 rounded-xl relative shadow-md">
              <span className="text-2xl">🧮</span>
              <p className="text-[10px] font-bold mt-1 leading-tight">Math Pioneer</p>
              <span className="text-[8px] text-saffron font-bold">Unlocked</span>
            </div>
            <div className="p-3 bg-cream/30 dark:bg-sienna-light/10 border border-sienna/10 rounded-xl opacity-35 filter grayscale">
              <span className="text-2xl">🕉️</span>
              <p className="text-[10px] font-bold mt-1 leading-tight">Sanskrit Scholar</p>
              <span className="text-[8px] opacity-75">Locked</span>
            </div>
            <div className="p-3 bg-cream/30 dark:bg-sienna-light/10 border border-sienna/10 rounded-xl opacity-35 filter grayscale">
              <span className="text-2xl">🧘</span>
              <p className="text-[10px] font-bold mt-1 leading-tight">Pranayama Yogi</p>
              <span className="text-[8px] opacity-75">Locked</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
