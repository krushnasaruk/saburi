/**
 * Virtual Gurukul - Data Layer & Mock Database Management
 * Manages reactive browser-based storage (LocalStorage) for authentication,
 * courses, student dashboards, gamification, and admin records.
 */

const DB_PREFIX = "virtual_gurukul_";

// Helper utilities for local storage
const db = {
  get: (key) => JSON.parse(localStorage.getItem(DB_PREFIX + key)),
  set: (key, val) => localStorage.setItem(DB_PREFIX + key, JSON.stringify(val)),
  init: (key, defaultVal) => {
    if (!localStorage.getItem(DB_PREFIX + key)) {
      localStorage.setItem(DB_PREFIX + key, JSON.stringify(defaultVal));
      return defaultVal;
    }
    return JSON.parse(localStorage.getItem(DB_PREFIX + key));
  }
};

// --- INITIAL SEED DATA ---

const DEFAULT_USERS = [
  {
    id: "usr_student",
    username: "shishya",
    email: "shishya@gurukul.edu",
    password: "password", // In a real app this is hashed; for browser demo we store simple check
    role: "student",
    fullName: "Aarav Sharma",
    avatar: "🕉️",
    xp: 450,
    streak: 5,
    lastLogin: new Date().toISOString(),
    badges: ["veda_novice", "math_pioneer"],
    enrolledCourses: ["course_sanskrit", "course_vedic_maths"]
  },
  {
    id: "usr_guru",
    username: "acharya",
    email: "acharya@gurukul.edu",
    password: "password",
    role: "guru",
    fullName: "Acharya Vidyasagar",
    avatar: "🧘",
    expertise: "Vedic Astronomy & Sanskrit Literature",
    bio: "Devoted 30 years to deciphering ancient Sanskrit mathematical manuscripts and astronomy.",
    social: { twitter: "#", github: "#", linkedin: "#" },
    approved: true
  },
  {
    id: "usr_admin",
    username: "admin",
    email: "admin@gurukul.edu",
    password: "password",
    role: "admin",
    fullName: "Kulapati (Chancellor)",
    avatar: "👑"
  }
];

const DEFAULT_COURSES = [
  {
    id: "course_sanskrit",
    title: "Sanskrit Devbhasha Introduction",
    category: "Sanskrit Learning",
    instructor: "Acharya Vidyasagar",
    duration: "6 Weeks",
    level: "Beginner",
    rating: 4.9,
    xpAward: 200,
    thumbnail: "assets/sanskrit_manuscript.png",
    description: "Discover 'Devbhasha'—the language of the gods. Learn the Devanagari script, phonetics, rules of sandhi, and recite timeless Rigvedic shlokas.",
    lessons: [
      {
        id: "l1",
        title: "Introduction to Devanagari Script & Alphabets",
        duration: "45 mins",
        content: "Sanskrit is an exceptionally phonetic language. It is written in the Devanagari script. We begin with vowels (Svaras) and consonants (Vyanjanas). The perfect structural organization of Sanskrit alphabets is widely praised by linguists worldwide.",
        notes: "Sanskrit has 13 vowels and 33 consonants, arranged scientifically based on the point of articulation.",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
      },
      {
        id: "l2",
        title: "Pronunciation Rules & Sanskrit Sounds",
        duration: "50 mins",
        content: "Learn how the position of the tongue, teeth, and lips generates sacred sounds. Discover the difference between guttural, palatal, cerebral, dental, and labial pronunciations.",
        notes: "Reciting chants with absolute phonetic perfection resonates positive energy in the human mind.",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
      },
      {
        id: "l3",
        title: "Timeless Shlokas & Vedic Grammar Rules",
        duration: "60 mins",
        content: "Unpack grammatical foundations. Translate the Gayatri Mantra word by word and study the rules of Sandhi (sound blending).",
        notes: "Gayatri Mantra is written in the sacred Gayatri meter of Vedic sanskrit.",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
      }
    ],
    quiz: {
      questions: [
        {
          q: "What does the term 'Devbhasha' translate to?",
          options: ["Language of the Gods", "Language of Kings", "Language of Forests", "Dialect of Merchants"],
          answer: 0
        },
        {
          q: "How many main categories of vowels (Svaras) exist in Sanskrit Devanagari?",
          options: ["5", "2 (Hrasva & Dirgha)", "10", "4"],
          answer: 1
        },
        {
          q: "Which Veda contains the famous Gayatri Mantra?",
          options: ["Yajurveda", "Samaveda", "Rigveda", "Atharvaveda"],
          answer: 2
        }
      ]
    }
  },
  {
    id: "course_vedic_maths",
    title: "Vedic Mathematics & Fast Computations",
    category: "Vedic Mathematics",
    instructor: "Aryabhata Junior",
    duration: "4 Weeks",
    level: "Beginner",
    rating: 4.8,
    xpAward: 150,
    thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80",
    description: "Unlock mental superpowers with 16 sacred mathematical sutras from the Atharvaveda. Solve multi-digit multiplications, squares, and roots in seconds without scratch paper.",
    lessons: [
      {
        id: "l1",
        title: "Ekadhikena Purvena (One More than the Previous)",
        duration: "40 mins",
        content: "This Sutra is magical for squaring numbers ending in 5. E.g., for 35 squared: Take the first digit 3, multiply by (3+1)=4 to get 12. Appending 25 yields 1225! Instantly calculate squares of 45, 65, 95 in your head.",
        notes: "Sutra: 'Ekadhikena Purvena' translates to 'By one more than the previous one'. Use it for multiplication and division.",
        videoUrl: "https://www.w3schools.com/html/movie.mp4"
      },
      {
        id: "l2",
        title: "Nikhilam Navatashcaramam Dashatah",
        duration: "55 mins",
        content: "Meaning 'All from 9 and the last from 10'. Extremely efficient for multiplying large numbers close to bases like 100, 1000. E.g., 97 x 96: Complements from 100 are -3 and -4. Cross subtract to get 93, multiply complements (-3 x -4) to get 12. Combined result: 9312!",
        notes: "Crucial rule: Always pad with zeroes to match base complements.",
        videoUrl: "https://www.w3schools.com/html/movie.mp4"
      }
    ],
    quiz: {
      questions: [
        {
          q: "What does the Sutra 'Ekadhikena Purvena' translate to?",
          options: ["All from 9 and last from 10", "Vertically and Crosswise", "By one more than the previous one", "Proportionately"],
          answer: 2
        },
        {
          q: "Using Vedic Mathematics, what is 75 squared?",
          options: ["5625", "4925", "6425", "5425"],
          answer: 0
        }
      ]
    }
  },
  {
    id: "course_yoga_meditation",
    title: "Ashtanga Yoga & Prana Meditation",
    category: "Yoga & Meditation",
    instructor: "Yogi Anand",
    duration: "5 Weeks",
    level: "Intermediate",
    rating: 5.0,
    xpAward: 250,
    thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    description: "Deep dive into Patanjali's Yoga Sutras. Master Pranayama breathing practices, deep dhyana meditation, and physical postures (Asanas) to align body, mind, and soul.",
    lessons: [
      {
        id: "l1",
        title: "The 8 Limbs of Ashtanga Yoga",
        duration: "50 mins",
        content: "Patanjali outlines an eight-fold path: Yama (ethics), Niyama (disciplines), Asana (posture), Pranayama (breath Control), Pratyahara (sensory withdrawal), Dharana (concentration), Dhyana (meditation), and Samadhi (absorption). We explore the Yamas and Niyamas in detail.",
        notes: "These principles serve as a lifelong moral and mental compass.",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
      }
    ],
    quiz: {
      questions: [
        {
          q: "Who compiled the Yoga Sutras?",
          options: ["Sage Patanjali", "Sage Vyasa", "Adi Shankaracharya", "Guru Vashistha"],
          answer: 0
        }
      ]
    }
  },
  {
    id: "course_ayurveda",
    title: "Ayurveda Foundations & Holistic Living",
    category: "Ayurveda",
    instructor: "Dr. Dhanvantari",
    duration: "8 Weeks",
    level: "Advanced",
    rating: 4.7,
    xpAward: 300,
    thumbnail: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80",
    description: "Learn about the five elements, the three doshas (Vata, Pitta, and Kapha), daily rituals (Dinacharya), and using kitchen spices as powerful organic medicine.",
    lessons: [
      {
        id: "l1",
        title: "Understanding the Three Doshas: Vata, Pitta, Kapha",
        duration: "65 mins",
        content: "Every individual is a unique combination of five elements (Space, Air, Fire, Water, Earth), expressing as Doshas. Understanding your Prakriti (constitution) helps tailor your diet, habits, and herbal wellness routines.",
        notes: "Vata is wind/space, Pitta is fire/water, Kapha is water/earth.",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
      }
    ],
    quiz: {
      questions: [
        {
          q: "Which dosha represents the element of Fire and Water?",
          options: ["Vata", "Pitta", "Kapha", "None of these"],
          answer: 1
        }
      ]
    }
  }
];

const DEFAULT_LEADERBOARD = [
  { rank: 1, name: "Pranav M.", xp: 1250, badge: "Aryabhata Scholar 🏆" },
  { rank: 2, name: "Shruti Sen", xp: 1100, badge: "Sanskrit Master 🕉️" },
  { rank: 3, name: "Aarav Sharma", xp: 450, badge: "Vedic Explorer 📜" },
  { rank: 4, name: "Rohit Nair", xp: 380, badge: "Yoga Beginner 🧘" },
  { rank: 5, name: "Diya Iyer", xp: 290, badge: "Star Gazer 🌌" }
];

const DEFAULT_BADGES = [
  { id: "veda_novice", name: "Veda Novice", icon: "📜", desc: "Successfully enrolled in your first course." },
  { id: "math_pioneer", name: "Math Pioneer", icon: "🧮", desc: "Learnt the fundamentals of Vedic Mathematics." },
  { id: "sanskrit_scholar", name: "Sanskrit Scholar", icon: "🕉️", desc: "Passed the Sanskrit Devbhasha Quiz." },
  { id: "yoga_master", name: "Pranayama Yogi", icon: "🧘", desc: "Enrolled and completed the Yoga training module." },
  { id: "admin_champion", name: "Gurukul Archmage", icon: "👑", desc: "Granted full admin access panel privileges." }
];

// --- INITIALIZE DATABASE ---

export function initDatabase() {
  db.init("users", DEFAULT_USERS);
  db.init("courses", DEFAULT_COURSES);
  db.init("leaderboard", DEFAULT_LEADERBOARD);
  db.init("badges", DEFAULT_BADGES);
  
  // Track current logged-in user
  if (!db.get("current_user")) {
    db.set("current_user", null);
  }
}

// --- DB API ABSTRACTED ENDPOINTS ---

export const DataManager = {
  // Authentication
  registerUser: (username, email, password, role = "student", fullName) => {
    const users = db.get("users") || [];
    if (users.find(u => u.username === username || u.email === email)) {
      throw new Error("Username or Email already registered in Gurukul database.");
    }
    const newUser = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      username,
      email,
      password,
      role,
      fullName: fullName || username,
      avatar: role === "student" ? "🕉️" : role === "guru" ? "🧘" : "👑",
      xp: 100, // starting gift
      streak: 1,
      lastLogin: new Date().toISOString(),
      badges: ["veda_novice"],
      enrolledCourses: []
    };
    users.push(newUser);
    db.set("users", users);
    return newUser;
  },

  loginUser: (username, password) => {
    const users = db.get("users") || [];
    const user = users.find(u => (u.username === username || u.email === username) && u.password === password);
    if (!user) {
      throw new Error("Invalid Gurukul credentials.");
    }
    
    // Update streak if a calendar day passed since last login
    const today = new Date().toDateString();
    const lastLog = new Date(user.lastLogin).toDateString();
    if (today !== lastLog) {
      const msDiff = new Date(today) - new Date(lastLog);
      const daysDiff = msDiff / (1000 * 60 * 60 * 24);
      if (daysDiff === 1) {
        user.streak += 1;
        user.xp += 20; // 20 XP streak reward!
      } else if (daysDiff > 1) {
        user.streak = 1; // reset streak
      }
      user.lastLogin = new Date().toISOString();
      
      // Update inside users array
      const idx = users.findIndex(u => u.id === user.id);
      users[idx] = user;
      db.set("users", users);
    }

    db.set("current_user", user);
    return user;
  },

  logoutUser: () => {
    db.set("current_user", null);
  },

  getCurrentUser: () => {
    return db.get("current_user");
  },

  updateCurrentUserProgress: (courseId, lessonIndex, quizPassed = false) => {
    const curr = db.get("current_user");
    if (!curr) return;
    const users = db.get("users");
    const user = users.find(u => u.id === curr.id);

    // Initial progress tracking structure if not present
    if (!user.progress) {
      user.progress = {};
    }
    if (!user.progress[courseId]) {
      user.progress[courseId] = { lessonIndex: 0, completed: false, quizScore: null };
    }

    const prog = user.progress[courseId];
    if (lessonIndex > prog.lessonIndex) {
      prog.lessonIndex = lessonIndex;
      user.xp += 15; // 15 XP for finishing lesson
    }

    if (quizPassed) {
      prog.completed = true;
      user.xp += 50; // 50 XP for passing quiz!
      
      // Award Sanskrit Scholar badge for Sanskrit course
      if (courseId === "course_sanskrit" && !user.badges.includes("sanskrit_scholar")) {
        user.badges.push("sanskrit_scholar");
      }
    }

    // sync databases
    const uIdx = users.findIndex(u => u.id === user.id);
    users[uIdx] = user;
    db.set("users", users);
    db.set("current_user", user);

    // Sync leaderboard if matching
    const leaderboard = db.get("leaderboard") || [];
    const lbIdx = leaderboard.findIndex(l => l.name === user.fullName);
    if (lbIdx !== -1) {
      leaderboard[lbIdx].xp = user.xp;
    } else {
      leaderboard.push({ rank: 6, name: user.fullName, xp: user.xp, badge: "Vedic Explorer 📜" });
    }
    // Re-rank leaderboard
    leaderboard.sort((a, b) => b.xp - a.xp);
    leaderboard.forEach((item, idx) => {
      item.rank = idx + 1;
    });
    db.set("leaderboard", leaderboard.slice(0, 7)); // keep top 7
  },

  enrollInCourse: (courseId) => {
    const curr = db.get("current_user");
    if (!curr) throw new Error("Please join Gurukul to enroll in courses.");
    const users = db.get("users");
    const user = users.find(u => u.id === curr.id);

    if (!user.enrolledCourses.includes(courseId)) {
      user.enrolledCourses.push(courseId);
      if (!user.progress) user.progress = {};
      user.progress[courseId] = { lessonIndex: 0, completed: false, quizScore: null };
      user.xp += 30; // Enrolling XP boost

      const uIdx = users.findIndex(u => u.id === user.id);
      users[uIdx] = user;
      db.set("users", users);
      db.set("current_user", user);
    }
  },

  // Courses
  getCourses: () => {
    return db.get("courses") || [];
  },

  getCourseById: (id) => {
    const courses = db.get("courses") || [];
    return courses.find(c => c.id === id);
  },

  // Guru and Admin Course Management
  addCourse: (courseData) => {
    const courses = db.get("courses") || [];
    const newCourse = {
      id: "course_" + Math.random().toString(36).substring(2, 9),
      rating: 4.8,
      xpAward: 150,
      thumbnail: courseData.thumbnail || "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80",
      ...courseData
    };
    courses.push(newCourse);
    db.set("courses", courses);
    return newCourse;
  },

  editCourse: (id, updatedData) => {
    const courses = db.get("courses") || [];
    const idx = courses.findIndex(c => c.id === id);
    if (idx === -1) throw new Error("Course not found.");
    courses[idx] = { ...courses[idx], ...updatedData };
    db.set("courses", courses);
    return courses[idx];
  },

  deleteCourse: (id) => {
    let courses = db.get("courses") || [];
    courses = courses.filter(c => c.id !== id);
    db.set("courses", courses);
  },

  // Admin users lists
  getUsers: () => {
    return db.get("users") || [];
  },

  updateUserRole: (userId, newRole) => {
    const users = db.get("users") || [];
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) throw new Error("User not found.");
    users[idx].role = newRole;
    db.set("users", users);
  },

  getLeaderboard: () => {
    return db.get("leaderboard") || [];
  },

  getBadges: () => {
    return db.get("badges") || [];
  }
};
