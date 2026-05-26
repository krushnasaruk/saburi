/**
 * Virtual Gurukul - Main Client Application Coordinator & Reactive Router
 * Manages custom routing, interactive CSS dark/light modes, synthesized music,
 * floating particle graphics, canvas certificate popups, interactive quizzes,
 * student/guru/admin dashboards, and course CRUD operations.
 */

import { initDatabase, DataManager } from "./data.js";
import { AudioSynth } from "./audio-synth.js";
import { GuruAI } from "./guru-ai.js";
import { CertificateGenerator } from "./certificates.js";

// Initialize relational local storage database
initDatabase();

// --- STATE MANAGEMENT ---
let currentUser = DataManager.getCurrentUser();
let activeRoute = "/";
let cursorX = 0, cursorY = 0;
let cursorDotX = 0, cursorDotY = 0;

// --- DYNAMIC PARTICLE ENGINE (Canvas Floating Lotuses) ---
function initLotusParticles() {
  const canvas = document.getElementById("lotus-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const maxParticles = 22;

  // Create lightweight floaters
  for (let i = 0; i < maxParticles; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height + height,
      size: Math.random() * 20 + 8,
      speedY: -(Math.random() * 0.7 + 0.3),
      speedX: Math.random() * 0.4 - 0.2,
      opacity: Math.random() * 0.35 + 0.1,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: Math.random() * 0.01 - 0.005,
      type: Math.random() > 0.4 ? "lotus" : "sparkle"
    });
  }

  function drawLotus(ctx, x, y, size) {
    ctx.beginPath();
    // Intricate lotus shape using quad curves
    ctx.moveTo(x, y - size);
    ctx.quadraticCurveTo(x + size * 0.6, y - size * 0.2, x, y + size * 0.3);
    ctx.quadraticCurveTo(x - size * 0.6, y - size * 0.2, x, y - size);
    
    // Side petals
    ctx.moveTo(x, y + size * 0.1);
    ctx.quadraticCurveTo(x + size * 0.9, y - size * 0.5, x + size * 0.2, y + size * 0.4);
    ctx.moveTo(x, y + size * 0.1);
    ctx.quadraticCurveTo(x - size * 0.9, y - size * 0.5, x - size * 0.2, y + size * 0.4);
    ctx.fillStyle = "rgba(217, 107, 39, 0.15)";
    ctx.fill();
    ctx.strokeStyle = "rgba(223, 178, 56, 0.45)";
    ctx.lineWidth = 1.2;
    ctx.stroke();
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Apply soft glowing background nodes
    ctx.save();
    const isDark = document.documentElement.classList.contains("dark");
    ctx.fillStyle = isDark ? "rgba(223, 178, 56, 0.015)" : "rgba(217, 107, 39, 0.008)";
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();

    particles.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotationSpeed;

      // recycle at the top boundary
      if (p.y < -50) {
        p.y = height + 50;
        p.x = Math.random() * width;
      }

      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      if (p.type === "lotus") {
        drawLotus(ctx, 0, 0, p.size);
      } else {
        // glowing gold stars
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          ctx.lineTo(0, -p.size/2);
          ctx.rotate(Math.PI / 5);
          ctx.lineTo(0, -p.size/4);
          ctx.rotate(Math.PI / 5);
        }
        ctx.closePath();
        ctx.fillStyle = "#dfb238";
        ctx.fill();
      }
      ctx.restore();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// --- CURSOR TRACKING ---
function initCustomCursor() {
  const cursor = document.getElementById("custom-cursor");
  const cursorDot = document.getElementById("custom-cursor-dot");
  if (!cursor || !cursorDot) return;

  document.addEventListener("mousemove", (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
  });

  function updateCursor() {
    // Linear interpolation for smooth trailing
    cursorDotX += (cursorX - cursorDotX) * 0.35;
    cursorDotY += (cursorY - cursorDotY) * 0.35;
    cursorX += (cursorX - cursorX) * 0.12;
    cursorY += (cursorY - cursorY) * 0.12;

    cursorDot.style.left = `${cursorDotX}px`;
    cursorDot.style.top = `${cursorDotY}px`;

    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;

    requestAnimationFrame(updateCursor);
  }
  updateCursor();
}

// --- GURU AI WIDGET LOGIC ---
function initGuruAIWidget() {
  const toggleBtn = document.getElementById("ai-toggle-btn");
  const closeBtn = document.getElementById("ai-close-btn");
  const aiPanel = document.querySelector(".ai-panel");
  const chatForm = document.getElementById("ai-chat-form");
  const userInput = document.getElementById("ai-user-input");
  const msgsContainer = document.getElementById("ai-messages-container");

  if (!toggleBtn || !aiPanel || !chatForm) return;

  toggleBtn.addEventListener("click", () => {
    aiPanel.classList.toggle("active");
  });

  closeBtn.addEventListener("click", () => {
    aiPanel.classList.remove("active");
  });

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = userInput.value.trim();
    if (!query) return;

    // Append user message
    const userBubble = document.createElement("div");
    userBubble.className = "ai-msg user";
    userBubble.textContent = query;
    msgsContainer.appendChild(userBubble);
    userInput.value = "";

    // Scroll to bottom
    msgsContainer.scrollTop = msgsContainer.scrollHeight;

    // Simulate Guru AI thinking
    setTimeout(() => {
      const responseText = GuruAI.respond(query);
      const botBubble = document.createElement("div");
      botBubble.className = "ai-msg bot";
      botBubble.innerHTML = responseText;
      msgsContainer.appendChild(botBubble);
      msgsContainer.scrollTop = msgsContainer.scrollHeight;
    }, 700);
  });
}

// --- UNIVERSAL MODAL SYSTEM ---
const Modal = {
  show: (htmlContent) => {
    const backdrop = document.getElementById("universal-modal");
    const container = document.getElementById("universal-modal-content");
    if (!backdrop || !container) return;

    container.innerHTML = htmlContent;
    backdrop.classList.add("active");
  },
  hide: () => {
    const backdrop = document.getElementById("universal-modal");
    if (backdrop) backdrop.classList.remove("active");
  }
};

// Bind global closing events to the modal backdrop
document.addEventListener("DOMContentLoaded", () => {
  const backdrop = document.getElementById("universal-modal");
  if (backdrop) {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) {
        Modal.hide();
      }
    });
  }
});

// --- CLIENT SIDE VIEWS RENDERERS ---

const Views = {
  
  // 1. LANDING / HOME VIEW
  Home: () => {
    const courses = DataManager.getCourses().slice(0, 3);
    const categoryCards = [
      { name: "Vedic Mathematics", desc: "Atharvavedic math shortcuts", icon: "🧮", img: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80" },
      { name: "Sanskrit Devbhasha", desc: "Decipher sacred Devanagari", icon: "🕉️", img: "assets/sanskrit_manuscript.png" },
      { name: "Yoga & Meditation", desc: "Master breath & asanas", icon: "🧘", img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80" },
      { name: "Ayurveda Wellness", desc: "Daily living & dosha balances", icon: "🌱", img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=400&q=80" }
    ];

    let categoriesHtml = "";
    categoryCards.forEach(c => {
      categoriesHtml += `
        <div class="category-card hoverable">
          <img src="${c.img}" alt="${c.name}" loading="lazy">
          <div class="category-info">
            <span class="icon">${c.icon}</span>
            <h3>${c.name}</h3>
            <p>${c.desc}</p>
          </div>
        </div>
      `;
    });

    let featuredCoursesHtml = "";
    courses.forEach(c => {
      featuredCoursesHtml += `
        <div class="course-card glass hoverable">
          <div class="course-thumb">
            <img src="${c.thumbnail}" alt="${c.title}" loading="lazy">
            <span class="course-tag">${c.level}</span>
          </div>
          <div class="course-body">
            <div class="course-meta">
              <span>📚 ${c.category}</span>
              <span>⏳ ${c.duration}</span>
            </div>
            <h3>${c.title}</h3>
            <p>${c.description}</p>
            <div class="course-footer">
              <span class="rating">⭐ ${c.rating}</span>
              <a href="#/course/${c.id}" class="btn btn-primary btn-sm hoverable">Explore</a>
            </div>
          </div>
        </div>
      `;
    });

    return `
      <!-- HERO -->
      <section class="hero">
        <div class="hero-content">
          <h1>Virtual Gurukul — <br><span>Reviving Ancient Indian Wisdom Digitally</span></h1>
          <p>
            Cross the bridge between ancient Vedic civilizations and future-gen Web technologies. Master fast Vedic Mathematics computation sutras, decipher complex Sanskrit scriptures, and adapt classical Patanjali yoga alignments for digital age longevity.
          </p>
          <div class="hero-buttons">
            <a href="#/courses" class="btn btn-primary hoverable">Explore Courses</a>
            <a href="#/login" class="btn btn-secondary hoverable">Join Gurukul</a>
          </div>
          <div class="hero-stats">
            <div class="stat-item">
              <h3>50K+</h3>
              <p>Active Shishyas</p>
            </div>
            <div class="stat-item">
              <h3>150+</h3>
              <p>Acharyas Approved</p>
            </div>
            <div class="stat-item">
              <h3>98%</h3>
              <p>Daily Streak Rate</p>
            </div>
          </div>
        </div>
        <div class="hero-visual hoverable">
          <img src="assets/hero_background.png" alt="Ancient futuristic gurukul illustration">
          <div class="hero-overlay">
            <div>
              <h3 style="font-family: var(--font-heading); font-size: 1.4rem;">Digital Gurukul Sanctuary</h3>
              <p style="font-size: 0.82rem; opacity: 0.85;">Immerse in synthesized spiritual drones and cosmic mathematics tutor frameworks.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ABOUT SECTION -->
      <section class="about-section">
        <div class="section-header">
          <h2>The Guru-Shishya Tradition</h2>
          <p>We revive the classical lineage-based pedagogy where personalized instruction, spiritual integration, and community learning unite in an immersive dashboard interface.</p>
        </div>
        <div class="about-grid">
          <div class="about-card glass hoverable">
            <div class="icon">🧘</div>
            <h3>Personalized Lineage</h3>
            <p>Every seeker receives dynamic guidance directly from approved Acharyas, following the authentic Guru-Shishya parampara.</p>
          </div>
          <div class="about-card glass hoverable">
            <div class="icon">📜</div>
            <h3>Decentralized Shastras</h3>
            <p>Read, download, and reference authentic translations of the Rigveda, Upanishads, and the Bhagavad Gita.</p>
          </div>
          <div class="about-card glass hoverable">
            <div class="icon">🧮</div>
            <h3>High-Speed Mental Math</h3>
            <p>Engage in gamified exercises utilizing Atharvaveda arithmetic sutras to expand cerebral speed and focus limits.</p>
          </div>
        </div>
      </section>

      <!-- KNOWLEDGE CATEGORIES -->
      <section style="padding: 4rem 0;">
        <div class="section-header">
          <h2>Ancient Knowledge Streams</h2>
          <p>Immerse in holistic pathways categorized across deep spiritual and structural sciences of the Indian subcontinent.</p>
        </div>
        <div class="categories-grid">
          ${categoriesHtml}
        </div>
      </section>

      <!-- FEATURED COURSES -->
      <section style="padding: 4rem 0;">
        <div class="section-header">
          <h2>Featured Vedic Syllabus</h2>
          <p>Embark on structured journeys with pre-loaded lectures, download notes resources, and printable graduation certificates.</p>
        </div>
        <div class="courses-grid">
          ${featuredCoursesHtml}
        </div>
        <div style="text-align: center; margin-top: 3.5rem;">
          <a href="#/courses" class="btn btn-secondary hoverable">View All Wisdom Streams</a>
        </div>
      </section>

      <!-- GURUS SECTION -->
      <section style="padding: 4rem 0;">
        <div class="section-header">
          <h2>Eminent Spiritual Masters</h2>
          <p>Learn from globally acclaimed academicians, yogis, and traditional Sanskrit pandits dedicated to reviving lineage studies.</p>
        </div>
        <div class="gurus-grid">
          <div class="guru-card glass hoverable">
            <div class="guru-img">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80" alt="Acharya Vidyasagar">
            </div>
            <h3>Acharya Vidyasagar</h3>
            <div class="expertise">Sanskrit Grammar & Vedic Cosmology</div>
            <p class="bio">Expended three decades researching Sandhi structures in RIGVEDIC scripts and coordinating celestial planetary transits.</p>
          </div>
          <div class="guru-card glass hoverable">
            <div class="guru-img">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" alt="Yogini Maitreyi">
            </div>
            <h3>Yogini Maitreyi</h3>
            <div class="expertise">Patanjali Ashtanga Yoga</div>
            <p class="bio">Integrating alignment postures with heart rate biofeedback systems for modern city dwellers.</p>
          </div>
          <div class="guru-card glass hoverable">
            <div class="guru-img">
              <img src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80" alt="Dr. Dhanvantari Prasad">
            </div>
            <h3>Dr. Dhanvantari Prasad</h3>
            <div class="expertise">Ayurvedic Botany & Dosha Diagnosis</div>
            <p class="bio">Spearheading analytical chemical extractions of ancient Himalayan restorative herbs and pulse metrics.</p>
          </div>
        </div>
      </section>

      <!-- CONTACT SECTION -->
      <section class="contact-section">
        <div class="section-header">
          <h2>Seek Admittance to Gurukul</h2>
          <p>Get in touch with our traditional council for specialized learning regimes, corporate yoga retreats, or research partnerships.</p>
        </div>
        <div class="contact-layout">
          <div class="contact-details">
            <div class="contact-item">
              <div class="icon">📍</div>
              <div>
                <h4 style="font-size: 1.1rem; margin-bottom:4px;">Sacred Ashram Sanctuary</h4>
                <p style="color:var(--text-secondary); font-size:0.9rem;">Himalayan foothills range, Uttarakhand, Bharat (India)</p>
              </div>
            </div>
            <div class="contact-item">
              <div class="icon">✉️</div>
              <div>
                <h4 style="font-size: 1.1rem; margin-bottom:4px;">Vedic Council Inquiries</h4>
                <p style="color:var(--text-secondary); font-size:0.9rem;">council@gurukul.edu</p>
              </div>
            </div>
            <div class="contact-item">
              <div class="icon">🗺️</div>
              <div style="width: 100%;">
                <h4 style="font-size: 1.1rem; margin-bottom:8px;">Digital Ashram Orbit View</h4>
                <div class="contact-map" style="display:flex; justify-content:center; align-items:center; color: var(--saffron-dark); font-weight:700;">
                  🏔️ Sacred Himalayan Coordinates Active (Vector Map Overlay)
                </div>
              </div>
            </div>
          </div>
          <form class="glass hoverable" style="padding: 2.5rem; display:flex; flex-direction:column; gap:1.2rem;" id="gurukul-contact-form">
            <h3 style="font-size: 1.4rem; color: var(--saffron); border-bottom: 1px solid var(--border-color); padding-bottom: 10px;">Inquiry Dispatch</h3>
            
            <div class="admin-form-group">
              <label>Seeker Name</label>
              <input type="text" required class="hoverable">
            </div>
            <div class="admin-form-group">
              <label>Email Address</label>
              <input type="email" required class="hoverable">
            </div>
            <div class="admin-form-group">
              <label>Chosen Study Stream</label>
              <select class="hoverable">
                <option>Vedic Mathematics</option>
                <option>Sanskrit Devbhasha</option>
                <option>Ashtanga Yoga & Breathing</option>
                <option>Ayurvedic Pharmacology</option>
              </select>
            </div>
            <div class="admin-form-group">
              <label>Sincere Intention Message</label>
              <textarea rows="4" required class="hoverable"></textarea>
            </div>
            <button type="submit" class="btn btn-primary hoverable">Dispatch to Council</button>
          </form>
        </div>
      </section>
    `;
  },

  // 2. COURSES BROWSER VIEW
  Courses: () => {
    const courses = DataManager.getCourses();

    let coursesHtml = "";
    courses.forEach(c => {
      coursesHtml += `
        <div class="course-card glass hoverable" data-level="${c.level.toLowerCase()}">
          <div class="course-thumb">
            <img src="${c.thumbnail}" alt="${c.title}" loading="lazy">
            <span class="course-tag">${c.level}</span>
          </div>
          <div class="course-body">
            <div class="course-meta">
              <span>📚 ${c.category}</span>
              <span>⏳ ${c.duration}</span>
            </div>
            <h3>${c.title}</h3>
            <p>${c.description}</p>
            <div class="course-footer">
              <span class="rating">⭐ ${c.rating}</span>
              <a href="#/course/${c.id}" class="btn btn-primary btn-sm hoverable">Enroll Stream</a>
            </div>
          </div>
        </div>
      `;
    });

    return `
      <div class="section-header" style="margin-top: 2rem;">
        <h2>Wisdom Streams (Shastra Catalog)</h2>
        <p>Unlock traditional Indian structural, planetary, and biological systems with complete student progress tracking.</p>
      </div>

      <div class="courses-filter hoverable">
        <button class="filter-btn active hoverable" data-filter="all">All levels</button>
        <button class="filter-btn hoverable" data-filter="beginner">Beginner</button>
        <button class="filter-btn hoverable" data-filter="intermediate">Intermediate</button>
        <button class="filter-btn hoverable" data-filter="advanced">Advanced</button>
      </div>

      <div class="courses-grid" id="catalog-grid">
        ${coursesHtml}
      </div>
    `;
  },

  // 3. COURSE DETAILED PLAYER WITH DYNAMIC QUIZ AND NOTES
  CoursePlayer: (courseId) => {
    const course = DataManager.getCourseById(courseId);
    if (!course) {
      return `<div style="padding: 5rem; text-align:center;"><h2>Wisdom stream not found in the archives.</h2><a href="#/courses" class="btn btn-primary mt-3">Back to Catalog</a></div>`;
    }

    // Default to first lesson
    const firstLesson = course.lessons[0] || { title: "No Lesson Content", content: "Archives under translation.", notes: "", videoUrl: "" };

    let playlistHtml = "";
    course.lessons.forEach((l, idx) => {
      playlistHtml += `
        <button class="playlist-item hoverable ${idx === 0 ? 'active' : ''}" data-lesson-idx="${idx}">
          <span class="index hoverable">${idx + 1}</span>
          <div class="playlist-item-info">
            <h4>${l.title}</h4>
            <p>⏳ ${l.duration} • Enrolled</p>
          </div>
        </button>
      `;
    });

    return `
      <div class="player-layout">
        <!-- PLAYER & NOTES -->
        <div>
          <div class="player-video-box">
            <video id="player-video-element" class="hoverable" controls width="100%" height="100%" src="${firstLesson.videoUrl}" style="outline:none; object-fit:cover;"></video>
          </div>

          <div class="lesson-details">
            <h2 id="player-lesson-title">${firstLesson.title}</h2>
            <div class="lesson-tabs hoverable">
              <button class="lesson-tab active hoverable" data-tab="content">Sutra Teachings</button>
              <button class="lesson-tab hoverable" data-tab="notes">Decoded Notes</button>
            </div>
            
            <div class="lesson-tab-content" id="player-tab-content">
              ${firstLesson.content}
            </div>
          </div>
        </div>

        <!-- PLAYLIST SIDEBAR -->
        <div class="glass" style="padding: 1.5rem; display:flex; flex-direction:column; gap:1.5rem; max-height: 590px; overflow-y:auto;">
          <h3 style="font-size:1.3rem; border-bottom: 1px solid var(--border-color); padding-bottom:10px; color:var(--saffron);">Syllabus Playlist</h3>
          <div class="lessons-playlist">
            ${playlistHtml}
          </div>

          <div style="border-top:1px solid var(--border-color); padding-top:1.5rem; text-align:center;">
            <button id="quiz-attempt-btn" class="btn btn-primary w-100 hoverable">Attempt Course Quiz</button>
          </div>
        </div>
      </div>
    `;
  },

  // 4. VIRTUAL CLASSROOM TIMETABLE AND CHAT SIMULATOR
  Classroom: () => {
    return `
      <div class="section-header" style="margin-top: 2rem;">
        <h2>Virtual Ashram & Live Timetable</h2>
        <p>Participate in active Vedic broadcasts, view classical event calendars, and coordinate directly with live student feeds.</p>
      </div>

      <div class="classroom-layout">
        
        <!-- TIMETABLE -->
        <div class="glass" style="padding: 2rem;">
          <h3 style="font-size:1.4rem; color:var(--saffron); border-bottom:1px solid var(--border-color); padding-bottom:12px; margin-bottom:1.5rem;">Ashram Live Calendar</h3>
          <div class="timetable-list">
            <div class="timetable-card glass hoverable">
              <div class="timetable-info">
                <h4>Vedic Astronomy Planetary Alignments</h4>
                <p>Guru: Acharya Vidyasagar • Live Stream</p>
              </div>
              <span class="timetable-time">10:00 AM IST</span>
            </div>
            <div class="timetable-card glass hoverable">
              <div class="timetable-info">
                <h4>Sanskrit Sandhi Rules Decoupling</h4>
                <p>Guru: Acharya Vidyasagar • Live Stream</p>
              </div>
              <span class="timetable-time">12:30 PM IST</span>
            </div>
            <div class="timetable-card glass hoverable" style="opacity: 0.6;">
              <div class="timetable-info">
                <h4>Ashtanga Pranayama Deep Breath Rest</h4>
                <p>Guru: Yogini Maitreyi • Concluded</p>
              </div>
              <span class="timetable-time" style="background:var(--border-color); color:var(--text-secondary);">Passed</span>
            </div>
          </div>
        </div>

        <!-- ACTIVE ZOOM SIMULATOR -->
        <div class="class-simulator">
          <div class="simulator-screen">
            <video class="simulator-video" autoplay loop muted playsinline src="https://www.w3schools.com/html/movie.mp4"></video>
            <div class="simulator-overlay">
              <span></span> Live Sanctuary Stream
            </div>
          </div>
          
          <div class="simulator-chat">
            <div class="chat-box" id="classroom-chat-box">
              <div class="chat-msg"><span>Yogi Anand:</span> Pranam Acharyaji! The breath alignments are beautifully relieving.</div>
              <div class="chat-msg"><span>Rohit Nair:</span> Are Atharvaveda mathematical notes downloadable?</div>
              <div class="chat-msg"><span>Guru Vidyasagar:</span> Yes, check under the course playlist notes tab.</div>
            </div>
            <form class="chat-input-bar" id="classroom-chat-form">
              <input type="text" id="classroom-chat-input" placeholder="Say namaste to the class..." autocomplete="off" class="hoverable">
              <button type="submit" class="hoverable">Send</button>
            </form>
          </div>
        </div>

      </div>
    `;
  },

  // 5. UNIFIED ACCOUNT REGISTRATION / LOGIN VIEWS
  Login: () => {
    return `
      <div class="glass hoverable" style="max-width: 440px; margin: 4rem auto; padding: 3rem 2.5rem; text-align:center;">
        <h2 style="font-size:2rem; color:var(--saffron); margin-bottom:5px;">Join Gurukul Portal</h2>
        <p style="color:var(--text-secondary); font-size:0.9rem; margin-bottom:2rem;">Acquire credentials to unlock streaks, XP points, and course player dashboards.</p>
        
        <form id="gurukul-login-form" style="display:flex; flex-direction:column; gap:1.2rem; text-align:left;">
          <div class="admin-form-group">
            <label>Shishya Username / Email</label>
            <input type="text" id="auth-username" required class="hoverable">
          </div>
          <div class="admin-form-group">
            <label>Secret Password</label>
            <input type="password" id="auth-password" required class="hoverable">
          </div>
          <button type="submit" class="btn btn-primary hoverable" style="margin-top: 10px;">Enter Sanctuary</button>
        </form>
        <p style="margin-top: 1.5rem; font-size:0.85rem; color:var(--text-secondary);">First time seeking truth? <a href="#/register" class="hoverable" style="color:var(--saffron); font-weight:700; text-decoration:none;">Enlist here</a></p>
      </div>
    `;
  },

  Register: () => {
    return `
      <div class="glass hoverable" style="max-width: 480px; margin: 4rem auto; padding: 3rem 2.5rem; text-align:center;">
        <h2 style="font-size:2rem; color:var(--saffron); margin-bottom:5px;">Initiate Shishya Oath</h2>
        <p style="color:var(--text-secondary); font-size:0.9rem; margin-bottom:2rem;">Start your holistic mental growth journey across Indian science streams.</p>
        
        <form id="gurukul-register-form" style="display:flex; flex-direction:column; gap:1.2rem; text-align:left;">
          <div class="admin-form-group">
            <label>Seeker Full Name</label>
            <input type="text" id="reg-fullname" required class="hoverable">
          </div>
          <div class="admin-form-group">
            <label>Choose Username</label>
            <input type="text" id="reg-username" required class="hoverable">
          </div>
          <div class="admin-form-group">
            <label>Email Address</label>
            <input type="email" id="reg-email" required class="hoverable">
          </div>
          <div class="admin-form-group">
            <label>Secret Password</label>
            <input type="password" id="reg-password" required class="hoverable">
          </div>
          <div class="admin-form-group">
            <label>Choose Portal Role</label>
            <select id="reg-role" class="hoverable">
              <option value="student">Student (Shishya)</option>
              <option value="guru">Teacher (Guru)</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary hoverable" style="margin-top: 10px;">Commit Shishya Vows</button>
        </form>
        <p style="margin-top: 1.5rem; font-size:0.85rem; color:var(--text-secondary);">Already hold credentials? <a href="#/login" class="hoverable" style="color:var(--saffron); font-weight:700; text-decoration:none;">Enter Sanctuary</a></p>
      </div>
    `;
  },

  // 6. DYNAMIC DASHBOARDS (Adapts instantly to Student, Guru, or Admin)
  Dashboard: () => {
    if (!currentUser) {
      return `<div style="padding: 5rem 0; text-align:center;"><h2>Credentials required to view dashboard records.</h2><a href="#/login" class="btn btn-primary mt-3 hoverable">Join Gurukul</a></div>`;
    }

    if (currentUser.role === "admin") {
      return Views.AdminDashboard();
    } else if (currentUser.role === "guru") {
      return Views.GuruDashboard();
    } else {
      return Views.StudentDashboard();
    }
  },

  // A. STUDENT DASHBOARD
  StudentDashboard: () => {
    const badges = DataManager.getBadges();
    const leaderboard = DataManager.getLeaderboard();
    const courses = DataManager.getCourses();

    // Map unlocked badges
    let badgesHtml = "";
    badges.forEach(b => {
      const unlocked = currentUser.badges.includes(b.id);
      badgesHtml += `
        <div class="badge-item glass hoverable ${unlocked ? 'unlocked' : ''}" title="${b.desc}">
          <div class="icon">${b.icon}</div>
          <p>${b.name}</p>
          <span style="font-size:0.65rem; opacity:0.75;">${unlocked ? 'Unlocked' : 'Locked'}</span>
        </div>
      `;
    });

    // Map leaderboard
    let leaderboardHtml = "";
    leaderboard.forEach(item => {
      const isSelf = item.name === currentUser.fullName;
      leaderboardHtml += `
        <div class="leaderboard-row hoverable ${isSelf ? 'highlight' : ''} rank-${item.rank}">
          <div class="leaderboard-left">
            <span class="rank-badge">${item.rank}</span>
            <span style="font-weight: 600;">${item.name}</span>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:0.78rem; opacity:0.8; font-style:italic;">${item.badge}</span>
            <span style="color:var(--saffron); font-weight:700;">${item.xp} XP</span>
          </div>
        </div>
      `;
    });

    // Map enrolled courses progress
    let enrollsHtml = "";
    const userEnrolls = currentUser.enrolledCourses || [];
    
    if (userEnrolls.length === 0) {
      enrollsHtml = `<div style="padding:2rem; text-align:center; color:var(--text-secondary);">No active enrollment streams. Explore courses to begin!</div>`;
    } else {
      userEnrolls.forEach(cId => {
        const course = courses.find(c => c.id === cId);
        if (!course) return;

        const progress = currentUser.progress?.[cId] || { lessonIndex: 0, completed: false };
        const percent = Math.round((progress.lessonIndex / course.lessons.length) * 100);

        enrollsHtml += `
          <div class="glass hoverable" style="padding:1.5rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1.5rem;">
            <div style="flex:1; min-width:200px;">
              <h4 style="font-size:1.15rem; margin-bottom:5px;">${course.title}</h4>
              <p style="font-size:0.82rem; color:var(--text-secondary);">Instructor: ${course.instructor}</p>
              
              <div class="xp-bar-container" style="margin-top:1rem;">
                <div class="xp-bar-fill" style="width: ${percent}%;"></div>
              </div>
              <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--text-secondary); margin-top:4px;">
                <span>${percent}% completed</span>
                <span>Lesson ${progress.lessonIndex} of ${course.lessons.length}</span>
              </div>
            </div>

            <div style="display:flex; gap:10px;">
              <a href="#/course/${course.id}" class="btn btn-secondary hoverable">Resume Player</a>
              ${progress.completed ? 
                `<button class="btn btn-primary download-certificate-btn hoverable" data-course-id="${course.id}" data-course-title="${course.title}">Download Certificate</button>` : 
                `<button class="btn btn-primary hoverable" style="opacity:0.5;" disabled title="Complete all lessons & pass the quiz to unlock">Locked Certificate</button>`
              }
            </div>
          </div>
        `;
      });
    }

    return `
      <div class="dashboard-grid">
        <!-- SIDEBAR METRICS -->
        <div class="glass profile-card">
          <div class="profile-avatar">${currentUser.avatar}</div>
          <h2 style="font-size:1.6rem; color:var(--text-primary);">${currentUser.fullName}</h2>
          <p style="color:var(--saffron); font-weight:700; font-size:0.9rem; margin-top:2px;">Shishya (Seeker)</p>
          
          <div class="xp-bar-container">
            <div class="xp-bar-fill" style="width: ${(currentUser.xp % 100)}%;"></div>
          </div>
          <p style="font-size:0.8rem; color:var(--text-secondary); margin-bottom:1.5rem;">Level ${Math.floor(currentUser.xp / 100) + 1} (${currentUser.xp} Total XP)</p>

          <div class="dashboard-stats">
            <div class="dash-stat-item">
              <h4>🔥 ${currentUser.streak} days</h4>
              <p>Daily Streak</p>
            </div>
            <div class="dash-stat-item">
              <h4>🏆 Rank #${leaderboard.find(l => l.name === currentUser.fullName)?.rank || 6}</h4>
              <p>Ashram Leaderboard</p>
            </div>
          </div>

          <div style="margin-top:2rem; border-top:1px solid var(--border-color); padding-top:2rem; text-align:center;">
            <button id="logout-btn" class="btn btn-secondary w-100 hoverable">Exit Portal</button>
          </div>
        </div>

        <!-- MAIN DASHBOARD CONTENT -->
        <div class="dashboard-content">
          <!-- Active Enrolled Courses -->
          <div class="glass" style="padding: 2rem; display:flex; flex-direction:column; gap:1.5rem;">
            <h3 style="font-size:1.4rem; color:var(--saffron); border-bottom:1px solid var(--border-color); padding-bottom:10px;">Active Wisdom Streams</h3>
            <div style="display:flex; flex-direction:column; gap:1rem;">
              ${enrollsHtml}
            </div>
          </div>

          <!-- Unlocked Gamified Badges -->
          <div class="glass" style="padding: 2rem;">
            <h3 style="font-size:1.4rem; color:var(--saffron); border-bottom:1px solid var(--border-color); padding-bottom:10px; margin-bottom:1.5rem;">Earned Shishya Badges</h3>
            <div class="badges-grid">
              ${badgesHtml}
            </div>
          </div>

          <!-- Ashram Leaderboard -->
          <div class="glass" style="padding: 2rem;">
            <h3 style="font-size:1.4rem; color:var(--saffron); border-bottom:1px solid var(--border-color); padding-bottom:10px; margin-bottom:1.5rem;">Ashram Leaderboard</h3>
            <div class="leaderboard-list">
              ${leaderboardHtml}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // B. GURU DASHBOARD
  GuruDashboard: () => {
    return `
      <div class="glass hoverable" style="padding: 3rem 2rem; text-align:center; max-width: 650px; margin: 3rem auto;">
        <span style="font-size: 3.5rem;">🧘</span>
        <h2 style="font-size:1.8rem; color:var(--saffron); margin:1rem 0 5px 0;">Acharya Sanctuary Portal</h2>
        <p style="color:var(--text-secondary); font-size:0.9rem; margin-bottom:2rem;">Welcome, <strong>${currentUser.fullName}</strong>. Verify your curriculum uploads and manage shishyas.</p>

        <div class="timetable-list" style="text-align:left; display:flex; flex-direction:column; gap:12px; margin-bottom:2.5rem;">
          <h3 style="font-size:1.2rem; color:var(--text-primary); border-bottom:1px solid var(--border-color); padding-bottom:8px;">Curriculum Approvals</h3>
          <div class="timetable-card glass">
            <div class="timetable-info">
              <h4>Vedic Mathematics Sutra Squares</h4>
              <p>Requested: Dec 2025 • Approved & Active</p>
            </div>
            <span class="timetable-time" style="background:#22c55e; color:#fff;">Active</span>
          </div>
          <div class="timetable-card glass" style="opacity: 0.75;">
            <div class="timetable-info">
              <h4>Ayurvedic Herbs Botanical Extraction</h4>
              <p>Requested: Just now • Pending Chancellor Approval</p>
            </div>
            <span class="timetable-time" style="background:#f59e0b; color:#fff;">Pending</span>
          </div>
        </div>

        <div style="display:flex; gap:10px; justify-content:center;">
          <button id="logout-btn" class="btn btn-secondary hoverable">Exit Portal</button>
          <a href="#/classroom" class="btn btn-primary hoverable">Enter Live Ashram</a>
        </div>
      </div>
    `;
  },

  // C. ADMIN DASHBOARD
  AdminDashboard: () => {
    const courses = DataManager.getCourses();
    const users = DataManager.getUsers();

    // Map courses list table rows
    let courseRows = "";
    courses.forEach(c => {
      courseRows += `
        <tr>
          <td style="font-weight:700;">${c.title}</td>
          <td>${c.category}</td>
          <td>${c.instructor}</td>
          <td>${c.level}</td>
          <td>
            <button class="btn-icon hoverable delete-course-btn" data-course-id="${c.id}" style="width:32px; height:32px; padding:0; font-size:0.8rem; background:rgba(166,43,43,0.15); border-color:var(--red-crimson); color:var(--red-crimson);" title="Delete course Archive">🗑️</button>
          </td>
        </tr>
      `;
    });

    // Map users approval table rows
    let userRows = "";
    users.forEach(u => {
      userRows += `
        <tr>
          <td style="font-weight:700;">${u.fullName}</td>
          <td>${u.email}</td>
          <td>
            <select class="hoverable admin-user-role-select" data-user-id="${u.id}" style="padding:4px 8px; font-size:0.8rem; border-radius:6px; background:var(--bg-main); color:var(--text-primary); border:1px solid var(--border-color);">
              <option value="student" ${u.role === 'student' ? 'selected' : ''}>Student</option>
              <option value="guru" ${u.role === 'guru' ? 'selected' : ''}>Guru</option>
              <option value="admin" ${u.role === 'admin' ? 'selected' : ''}>Admin</option>
            </select>
          </td>
          <td>🔥 ${u.streak} Days</td>
        </tr>
      `;
    });

    return `
      <div class="admin-layout">
        <!-- SIDEBAR -->
        <div class="admin-sidebar glass hoverable" style="padding:1.5rem;">
          <h3 style="font-size:1.25rem; border-bottom:1px solid var(--border-color); padding-bottom:10px; margin-bottom:1.5rem; color:var(--saffron);">Chancellor Hub</h3>
          <button class="active hoverable admin-nav-btn" data-tab="analytics">Analytics</button>
          <button class="hoverable admin-nav-btn" data-tab="courses">Curriculum CRUD</button>
          <button class="hoverable admin-nav-btn" data-tab="users">Shishya Approvals</button>
          <button class="hoverable admin-nav-btn" data-tab="create">Upload Syllabus</button>
          <div style="margin-top:auto; border-top:1px solid var(--border-color); padding-top:1.5rem;">
            <button id="logout-btn" class="btn btn-secondary w-100 hoverable">Exit Portal</button>
          </div>
        </div>

        <!-- CONTENT VIEWER -->
        <div class="admin-content" id="admin-panel-content">
          <!-- ANALYTICS TAB (Default) -->
          <div class="admin-tab-pane active" id="pane-analytics">
            <h3 style="font-size:1.5rem; color:var(--saffron); border-bottom:1px solid var(--border-color); padding-bottom:10px; margin-bottom:1.5rem;">Ashram Live Analytics</h3>
            <div class="admin-stats-grid">
              <div class="admin-stat-card hoverable">
                <span style="font-size:1.8rem;">🕉️</span>
                <h4 style="font-size:1.5rem; margin-top:8px;">${users.length}</h4>
                <p style="font-size:0.75rem; color:var(--text-secondary);">Enrolled Seekers</p>
              </div>
              <div class="admin-stat-card hoverable">
                <span style="font-size:1.8rem;">📚</span>
                <h4 style="font-size:1.5rem; margin-top:8px;">${courses.length}</h4>
                <p style="font-size:0.75rem; color:var(--text-secondary);">Syllabus Streams</p>
              </div>
              <div class="admin-stat-card hoverable">
                <span style="font-size:1.8rem;">🔥</span>
                <h4 style="font-size:1.5rem; margin-top:8px;">${users.reduce((acc, curr) => acc + curr.streak, 0) / users.length} Days</h4>
                <p style="font-size:0.75rem; color:var(--text-secondary);">Average Active Streak</p>
              </div>
              <div class="admin-stat-card hoverable">
                <span style="font-size:1.8rem;">🏆</span>
                <h4 style="font-size:1.5rem; margin-top:8px;">${users.reduce((acc, curr) => acc + curr.xp, 0)} XP</h4>
                <p style="font-size:0.75rem; color:var(--text-secondary);">Total Ashram XP</p>
              </div>
            </div>
            
            <h4 style="margin-bottom:10px; color:var(--text-primary);">Chancellor Administrative Logs</h4>
            <div class="glass" style="padding:1.25rem; font-size:0.82rem; color:var(--text-secondary); line-height:1.6;">
              🟢 <strong>Systems secure:</strong> local storage Relational Adapter active.<br>
              🟢 <strong>Sound generator:</strong> Tanpura & Flute Web Audio frequencies stable.<br>
              🟢 <strong>Guru AI:</strong> Natural language parsing dictionary verified.
            </div>
          </div>

          <!-- COURSES TAB -->
          <div class="admin-tab-pane" id="pane-courses" style="display:none;">
            <h3 style="font-size:1.5rem; color:var(--saffron); border-bottom:1px solid var(--border-color); padding-bottom:10px; margin-bottom:1rem;">Wisdom Stream Inventory</h3>
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Course Title</th>
                  <th>Category</th>
                  <th>Instructor</th>
                  <th>Difficulty</th>
                  <th>Archive Controls</th>
                </tr>
              </thead>
              <tbody>
                ${courseRows}
              </tbody>
            </table>
          </div>

          <!-- USERS TAB -->
          <div class="admin-tab-pane" id="pane-users" style="display:none;">
            <h3 style="font-size:1.5rem; color:var(--saffron); border-bottom:1px solid var(--border-color); padding-bottom:10px; margin-bottom:1rem;">Seeker Credentials & Roles</h3>
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Assigned Role</th>
                  <th>Active Streak</th>
                </tr>
              </thead>
              <tbody>
                ${userRows}
              </tbody>
            </table>
          </div>

          <!-- CREATE FORM TAB -->
          <div class="admin-tab-pane" id="pane-create" style="display:none;">
            <h3 style="font-size:1.5rem; color:var(--saffron); border-bottom:1px solid var(--border-color); padding-bottom:10px; margin-bottom:1.5rem;">Compile New Wisdom Stream</h3>
            
            <form id="admin-create-course-form" style="display:flex; flex-direction:column; gap:1.2rem;">
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem;">
                <div class="admin-form-group">
                  <label>Course Title</label>
                  <input type="text" id="add-title" required class="hoverable">
                </div>
                <div class="admin-form-group">
                  <label>Knowledge Category</label>
                  <select id="add-category" class="hoverable">
                    <option>Vedic Mathematics</option>
                    <option>Sanskrit Learning</option>
                    <option>Yoga & Meditation</option>
                    <option>Indian Astronomy</option>
                    <option>Ayurveda</option>
                  </select>
                </div>
              </div>

              <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem;">
                <div class="admin-form-group">
                  <label>Instructor Acharya Name</label>
                  <input type="text" id="add-instructor" required class="hoverable">
                </div>
                <div class="admin-form-group">
                  <label>Difficulty Rating</label>
                  <select id="add-level" class="hoverable">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
              </div>

              <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem;">
                <div class="admin-form-group">
                  <label>Syllabus Duration (e.g. 5 Weeks)</label>
                  <input type="text" id="add-duration" required class="hoverable">
                </div>
                <div class="admin-form-group">
                  <label>Thumbnail Image URL</label>
                  <input type="text" id="add-thumbnail" placeholder="https://images.unsplash.com/..." class="hoverable">
                </div>
              </div>

              <div class="admin-form-group">
                <label>Wisdom Description Overview</label>
                <textarea id="add-desc" rows="3" required class="hoverable"></textarea>
              </div>

              <!-- Mini Lesson 1 inclusion -->
              <h4 style="border-top:1px solid var(--border-color); padding-top:1.2rem; color:var(--saffron);">Syllabus Lesson 1 Details</h4>
              <div style="display:grid; grid-template-columns:1.5fr 0.5fr; gap:1.5rem;">
                <div class="admin-form-group">
                  <label>Lesson 1 Title</label>
                  <input type="text" id="add-l1-title" required class="hoverable">
                </div>
                <div class="admin-form-group">
                  <label>Lesson Duration</label>
                  <input type="text" id="add-l1-duration" placeholder="e.g. 45 mins" required class="hoverable">
                </div>
              </div>
              
              <div class="admin-form-group">
                <label>Lesson Sutra Teachings Text</label>
                <textarea id="add-l1-content" rows="4" required class="hoverable"></textarea>
              </div>

              <button type="submit" class="btn btn-primary hoverable">Deploy Wisdom Archive</button>
            </form>
          </div>

        </div>
      </div>
    `;
  }
};

// --- DYNAMIC INTERACTION EVENT ATTACHMENTS ---

function attachViewListeners(route, params = {}) {
  // Common element triggers: exit/logout triggers
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      DataManager.logoutUser();
      currentUser = null;
      updateAuthBtnHeader();
      window.location.hash = "#/login";
    });
  }

  // --- HOME / CONTACT SUBMISSION ---
  if (route === "/") {
    const contactForm = document.getElementById("gurukul-contact-form");
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Pranam seeker! Your earnest intention inquiry has been successfully dispatched to the Traditional Council Board.");
        contactForm.reset();
      });
    }
  }

  // --- CATALOG FILTERS ---
  if (route === "/courses") {
    const filters = document.querySelectorAll(".filter-btn");
    const gridItems = document.querySelectorAll(".courses-grid .course-card");
    
    filters.forEach(f => {
      f.addEventListener("click", () => {
        filters.forEach(btn => btn.classList.remove("active"));
        f.classList.add("active");
        
        const filterVal = f.dataset.filter;
        gridItems.forEach(item => {
          if (filterVal === "all" || item.dataset.level === filterVal) {
            item.style.display = "flex";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }

  // --- COURSE PLAYER FUNCTIONALITY ---
  if (route.startsWith("/course/")) {
    const courseId = params.id;
    const course = DataManager.getCourseById(courseId);
    
    if (course) {
      const playlistItems = document.querySelectorAll(".playlist-item");
      const videoElement = document.getElementById("player-video-element");
      const lessonTitle = document.getElementById("player-lesson-title");
      const tabContent = document.getElementById("player-tab-content");
      const tabs = document.querySelectorAll(".lesson-tab");
      
      let activeLessonIdx = 0;

      // Enroll user in course when they open it
      if (currentUser && currentUser.role === "student") {
        DataManager.enrollInCourse(courseId);
      }

      function loadLesson(idx) {
        activeLessonIdx = idx;
        const lesson = course.lessons[idx];
        if (!lesson) return;

        lessonTitle.textContent = lesson.title;
        videoElement.src = lesson.videoUrl;
        
        // Render currently active tab
        const activeTab = document.querySelector(".lesson-tab.active").dataset.tab;
        tabContent.innerHTML = activeTab === "content" ? lesson.content : (lesson.notes || "No separate notes recorded.");

        playlistItems.forEach(item => item.classList.remove("active"));
        playlistItems[idx].classList.add("active");

        // Sync student lesson progress in database
        if (currentUser && currentUser.role === "student") {
          DataManager.updateCurrentUserProgress(courseId, idx);
        }
      }

      playlistItems.forEach((btn, idx) => {
        btn.addEventListener("click", () => loadLesson(idx));
      });

      tabs.forEach(t => {
        t.addEventListener("click", () => {
          tabs.forEach(btn => btn.classList.remove("active"));
          t.classList.add("active");
          const tabName = t.dataset.tab;
          const lesson = course.lessons[activeLessonIdx];
          tabContent.innerHTML = tabName === "content" ? lesson.content : (lesson.notes || "No separate notes recorded.");
        });
      });

      // --- DYNAMIC QUIZ SYSTEM ATTACHMENT ---
      const quizBtn = document.getElementById("quiz-attempt-btn");
      if (quizBtn) {
        quizBtn.addEventListener("click", () => {
          if (!currentUser) {
            alert("Pranam! Please register an account and join the Gurukul to attempt this evaluation.");
            window.location.hash = "#/login";
            return;
          }

          const quiz = course.quiz;
          if (!quiz || !quiz.questions || quiz.questions.length === 0) {
            alert("This course has no active quiz. Master all syllabus levels and consult your Acharya.");
            return;
          }

          let currentQIdx = 0;
          let correctAnswers = 0;

          function renderQuizQuestion() {
            const question = quiz.questions[currentQIdx];
            let optionsHtml = "";
            question.options.forEach((opt, oIdx) => {
              optionsHtml += `<button class="quiz-option hoverable" data-opt-idx="${oIdx}">🪷 &nbsp; ${opt}</button>`;
            });

            const quizContentHtml = `
              <div class="quiz-box">
                <h3 style="font-size:1.6rem; color:var(--saffron); border-bottom:1px solid var(--border-color); padding-bottom:8px; margin-bottom:1.5rem;">Syllabus Evaluation</h3>
                <p style="font-size:0.8rem; color:var(--text-secondary); margin-bottom:1.5rem;">Question ${currentQIdx + 1} of ${quiz.questions.length}</p>
                
                <h4 style="font-size:1.25rem; margin-bottom:1.8rem; line-height:1.4;">${question.q}</h4>
                
                <div style="display:flex; flex-direction:column; text-align:left;">
                  ${optionsHtml}
                </div>
              </div>
            `;
            Modal.show(quizContentHtml);

            // Bind option click handlers
            const optionBtns = document.querySelectorAll(".quiz-option");
            optionBtns.forEach(btn => {
              btn.addEventListener("click", () => {
                const chosen = parseInt(btn.dataset.optIdx);
                if (chosen === question.answer) {
                  correctAnswers++;
                }

                currentQIdx++;
                if (currentQIdx < quiz.questions.length) {
                  renderQuizQuestion();
                } else {
                  // Quiz Concluded
                  const passed = correctAnswers === quiz.questions.length; // 100% correct required for ancient grading
                  
                  if (passed) {
                    DataManager.updateCurrentUserProgress(courseId, activeLessonIdx, true);
                    currentUser = DataManager.getCurrentUser(); // reload state
                    
                    const passedHtml = `
                      <div class="quiz-box" style="padding:4rem 2rem;">
                        <span style="font-size:4rem;">🎓</span>
                        <h2 style="font-size:2rem; color:#22c55e; margin:1.2rem 0 5px 0;">Rigorous Grading Passed!</h2>
                        <p style="color:var(--text-secondary); font-size:0.95rem; margin-bottom:2rem;">Perfect score of ${correctAnswers}/${quiz.questions.length}! You have earned <strong>50 XP</strong> and unlocked your <strong>Chancellor graduation credential</strong>.</p>
                        
                        <div style="display:flex; gap:10px; justify-content:center;">
                          <button class="btn btn-primary download-certificate-btn hoverable" data-course-id="${course.id}" data-course-title="${course.title}">Download Certificate</button>
                          <button class="btn btn-secondary hoverable" id="quiz-close-modal-btn">Return Player</button>
                        </div>
                      </div>
                    `;
                    Modal.show(passedHtml);
                    
                    // Rebind modal button events
                    document.getElementById("quiz-close-modal-btn").addEventListener("click", Modal.hide);
                    bindCertificateTriggers();
                  } else {
                    const failedHtml = `
                      <div class="quiz-box" style="padding:4rem 2rem;">
                        <span style="font-size:4rem;">🧘</span>
                        <h2 style="font-size:2rem; color:var(--red-crimson); margin:1.2rem 0 5px 0;">Evaluation Incomplete</h2>
                        <p style="color:var(--text-secondary); font-size:0.95rem; margin-bottom:2rem;">Score: ${correctAnswers}/${quiz.questions.length}. Gurukul standards require <strong>100% perfect clarity</strong> to graduate. Re-study Sandhi shlokas and attempt again.</p>
                        
                        <button class="btn btn-primary hoverable" id="quiz-retry-btn">Re-Attempt Quiz</button>
                      </div>
                    `;
                    Modal.show(failedHtml);
                    document.getElementById("quiz-retry-btn").addEventListener("click", () => {
                      currentQIdx = 0;
                      correctAnswers = 0;
                      renderQuizQuestion();
                    });
                  }
                }
              });
            });
          }

          // Trigger first question
          renderQuizQuestion();
        });
      }
    }
  }

  // --- VIRTUAL CLASS CHAT LOGIC ---
  if (route === "/classroom") {
    const chatForm = document.getElementById("classroom-chat-form");
    const chatInput = document.getElementById("classroom-chat-input");
    const chatBox = document.getElementById("classroom-chat-box");
    
    if (chatForm && chatInput && chatBox) {
      chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const msg = chatInput.value.trim();
        if (!msg) return;

        const sender = currentUser ? currentUser.fullName : "Seeker Visitor";
        
        const newMsgDiv = document.createElement("div");
        newMsgDiv.className = "chat-msg";
        newMsgDiv.innerHTML = `<span>${sender}:</span> ${msg}`;
        chatBox.appendChild(newMsgDiv);
        chatInput.value = "";
        
        chatBox.scrollTop = chatBox.scrollHeight;

        // Auto fake guru reply
        setTimeout(() => {
          const replDiv = document.createElement("div");
          replDiv.className = "chat-msg";
          replDiv.innerHTML = `<span>Guru Vidyasagar:</span> 🙏 Excellent contemplation, ${sender.split(' ')[0]}. Reflect on that deeply.`;
          chatBox.appendChild(replDiv);
          chatBox.scrollTop = chatBox.scrollHeight;
        }, 1200);
      });
    }
  }

  // --- AUTH FORMS ---
  if (route === "/login") {
    const loginForm = document.getElementById("gurukul-login-form");
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const userVal = document.getElementById("auth-username").value.trim();
        const passVal = document.getElementById("auth-password").value;

        try {
          currentUser = DataManager.loginUser(userVal, passVal);
          updateAuthBtnHeader();
          window.location.hash = "#/dashboard";
        } catch (err) {
          alert(err.message);
        }
      });
    }
  }

  if (route === "/register") {
    const regForm = document.getElementById("gurukul-register-form");
    if (regForm) {
      regForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const fn = document.getElementById("reg-fullname").value.trim();
        const un = document.getElementById("reg-username").value.trim();
        const em = document.getElementById("reg-email").value.trim();
        const ps = document.getElementById("reg-password").value;
        const rl = document.getElementById("reg-role").value;

        try {
          currentUser = DataManager.registerUser(un, em, ps, rl, fn);
          currentUser = DataManager.loginUser(un, ps); // auto-login
          updateAuthBtnHeader();
          window.location.hash = "#/dashboard";
        } catch (err) {
          alert(err.message);
        }
      });
    }
  }

  // --- DYNAMIC DASHBOARD CONTROLS ---
  if (route === "/dashboard" && currentUser) {
    bindCertificateTriggers();

    // Bind Admin Command Tab selectors
    if (currentUser.role === "admin") {
      const tabBtns = document.querySelectorAll(".admin-nav-btn");
      const panes = document.querySelectorAll(".admin-tab-pane");

      tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
          tabBtns.forEach(b => b.classList.remove("active"));
          btn.classList.add("active");

          const tabName = btn.dataset.tab;
          panes.forEach(pane => {
            if (pane.id === `pane-${tabName}`) {
              pane.style.display = "block";
            } else {
              pane.style.display = "none";
            }
          });
        });
      });

      // Role Select Dropdown synchronization
      const roleSelects = document.querySelectorAll(".admin-user-role-select");
      roleSelects.forEach(select => {
        select.addEventListener("change", () => {
          const uId = select.dataset.userId;
          const newRole = select.value;
          DataManager.updateUserRole(uId, newRole);
          alert("Shishya role credentials successfully synced on the blockchain matrix.");
        });
      });

      // Syllabus Creation Form
      const createForm = document.getElementById("admin-create-course-form");
      if (createForm) {
        createForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const title = document.getElementById("add-title").value.trim();
          const cat = document.getElementById("add-category").value;
          const instr = document.getElementById("add-instructor").value.trim();
          const lvl = document.getElementById("add-level").value;
          const dur = document.getElementById("add-duration").value.trim();
          const thumb = document.getElementById("add-thumbnail").value.trim() || "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80";
          const desc = document.getElementById("add-desc").value.trim();

          const lTitle = document.getElementById("add-l1-title").value.trim();
          const lDur = document.getElementById("add-l1-duration").value.trim();
          const lCont = document.getElementById("add-l1-content").value.trim();

          const newCourse = {
            title,
            category: cat,
            instructor: instr,
            level: lvl,
            duration: dur,
            thumbnail: thumb,
            description: desc,
            lessons: [
              {
                id: "l1",
                title: lTitle,
                duration: lDur,
                content: lCont,
                videoUrl: "https://www.w3schools.com/html/movie.mp4"
              }
            ],
            quiz: {
              questions: [
                {
                  q: `What is the core subject of ${title}?`,
                  options: ["Vedas & History", "Modern Physics", "Indian Wisdom streams", "Aviation"],
                  answer: 2
                }
              ]
            }
          };

          DataManager.addCourse(newCourse);
          alert("Syllabus Stream deployed successfully to the active catalog database!");
          createForm.reset();
          
          // Re-render dashboard
          routeTo(window.location.hash);
        });
      }

      // Course Delete Trigger
      const deleteBtns = document.querySelectorAll(".delete-course-btn");
      deleteBtns.forEach(btn => {
        btn.addEventListener("click", () => {
          const cId = btn.dataset.courseId;
          if (confirm("Are you absolutely sure you want to delete this course from the Gurukul database?")) {
            DataManager.deleteCourse(cId);
            alert("Course successfully removed.");
            routeTo(window.location.hash);
          }
        });
      });
    }
  }
}

// Draw Certificate dynamic Canvas modal triggers
function bindCertificateTriggers() {
  const certBtns = document.querySelectorAll(".download-certificate-btn");
  certBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const courseTitle = btn.dataset.courseTitle;
      const shishyaName = currentUser ? currentUser.fullName : "Aarav Sharma";

      const certModalHtml = `
        <div class="cert-canvas-container">
          <h3 style="font-size:1.5rem; color:var(--saffron); font-family:var(--font-heading); margin-bottom:5px;">Sanskrit Graduation Credential</h3>
          <p style="font-size:0.8rem; color:var(--text-secondary); text-align:center;">Canvas Render Active. Click download to acquire resolution PNG print file.</p>
          
          <canvas id="cert-rendering-canvas" style="width: 100%; border: 1px solid var(--border-color);"></canvas>
          
          <div style="display:flex; gap:10px; justify-content:center; margin-top:10px;">
            <button class="btn btn-primary hoverable" id="cert-act-download-btn">Download PNG</button>
            <button class="btn btn-secondary hoverable" id="cert-act-close-btn">Close Certificate</button>
          </div>
        </div>
      `;
      Modal.show(certModalHtml);

      const canvas = document.getElementById("cert-rendering-canvas");
      CertificateGenerator.draw(canvas, shishyaName, courseTitle);

      document.getElementById("cert-act-download-btn").addEventListener("click", () => {
        CertificateGenerator.download(canvas, shishyaName);
      });
      document.getElementById("cert-act-close-btn").addEventListener("click", Modal.hide);
    });
  });
}

// Sync Auth Button in Header layout
function updateAuthBtnHeader() {
  const container = document.getElementById("auth-header-btn-container");
  const dashboardLink = document.getElementById("nav-dashboard-link");
  if (!container) return;

  if (currentUser) {
    let dashboardRoute = "#/dashboard";
    container.innerHTML = `<a href="${dashboardRoute}" class="btn btn-secondary hoverable" style="padding:8px 16px; border-radius:10px;">Portal: ${currentUser.fullName.split(' ')[0]}</a>`;
    if (dashboardLink) dashboardLink.style.display = "inline-block";
  } else {
    container.innerHTML = `<a href="#/login" class="btn btn-primary hoverable">Join Gurukul</a>`;
    if (dashboardLink) dashboardLink.style.display = "none";
  }
}

// --- DYNAMIC HASH ROUTER ---
function routeTo(hash) {
  const appView = document.getElementById("app-view");
  if (!appView) return;

  // Clean hash routes
  let cleanHash = hash.replace("#", "");
  if (!cleanHash) cleanHash = "/";

  activeRoute = cleanHash;

  // Set active class on navbar links
  const navItems = document.querySelectorAll("#nav-links a");
  navItems.forEach(item => {
    const routeVal = item.getAttribute("data-route");
    if (routeVal === cleanHash || (cleanHash.startsWith("/course/") && routeVal === "/courses")) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // Handle Dynamic route bindings
  let match = null;
  
  if (cleanHash === "/") {
    appView.innerHTML = Views.Home();
    attachViewListeners("/");
  } else if (cleanHash === "/courses") {
    appView.innerHTML = Views.Courses();
    attachViewListeners("/courses");
  } else if (cleanHash === "/classroom") {
    appView.innerHTML = Views.Classroom();
    attachViewListeners("/classroom");
  } else if (cleanHash === "/dashboard") {
    appView.innerHTML = Views.Dashboard();
    attachViewListeners("/dashboard");
  } else if (cleanHash === "/login") {
    appView.innerHTML = Views.Login();
    attachViewListeners("/login");
  } else if (cleanHash === "/register") {
    appView.innerHTML = Views.Register();
    attachViewListeners("/register");
  } else if ((match = cleanHash.match(/^\/course\/([^/]+)$/))) {
    // Dynamic Course ID matching
    const courseId = match[1];
    appView.innerHTML = Views.CoursePlayer(courseId);
    attachViewListeners(`/course/${courseId}`, { id: courseId });
  } else {
    // 404 Route redirecting home
    window.location.hash = "#/";
  }

  // Smooth fade-in animation trigger
  appView.style.opacity = 0;
  setTimeout(() => {
    appView.style.transition = "opacity 0.5s ease-out";
    appView.style.opacity = 1;
  }, 50);

  // Scroll to top
  window.scrollTo(0, 0);
}

// --- INITIAL EVENT BINDINGS ON LOAD ---
document.addEventListener("DOMContentLoaded", () => {
  // Remove loading screen smoothly after layout calculations
  const loader = document.getElementById("loading-screen");
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = 0;
      setTimeout(() => loader.style.display = "none", 800);
    }, 600);
  }

  // Init graphic particle canvases & Custom Cursors
  initLotusParticles();
  initCustomCursor();
  initGuruAIWidget();
  updateAuthBtnHeader();

  // Bind Router hash events
  window.addEventListener("hashchange", () => {
    routeTo(window.location.hash);
  });
  
  // Trigger initial route load
  routeTo(window.location.hash);

  // --- AUDIO SYNTH TOGGLE CONTROL ---
  const musicBtn = document.getElementById("music-btn");
  if (musicBtn) {
    musicBtn.addEventListener("click", () => {
      const active = AudioSynth.toggle();
      if (active) {
        musicBtn.textContent = "🕉️";
        musicBtn.style.color = "var(--saffron)";
        musicBtn.style.borderColor = "var(--saffron)";
      } else {
        musicBtn.textContent = "📿";
        musicBtn.style.color = "var(--text-primary)";
        musicBtn.style.borderColor = "var(--border-color)";
      }
    });
  }

  // --- DARK/LIGHT THEME CONTROLLER ---
  const themeBtn = document.getElementById("theme-btn");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const root = document.documentElement;
      root.classList.toggle("dark");
      if (root.classList.contains("dark")) {
        themeBtn.textContent = "🌙";
        themeBtn.style.color = "var(--gold)";
      } else {
        themeBtn.textContent = "☀️";
        themeBtn.style.color = "var(--text-primary)";
      }
    });
  }

  // Header Logo click route home
  const logo = document.getElementById("logo-link");
  if (logo) {
    logo.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.hash = "#/";
    });
  }
});
