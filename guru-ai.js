/**
 * Virtual Gurukul - Guru AI Assistant Engine
 * Powering "Guru AI" conversational logic, dynamic Sanskrit dictionaries,
 * real-time Vedic mathematics computations, and course recommendations.
 */

const SANSKRIT_DICTIONARY = {
  dharma: {
    sanskrit: "धर्म",
    meaning: "Righteous duty, cosmic order, and moral law that sustains the universe and individual life.",
    shloka: "धर्मो रक्षति रक्षितः (Dharma protects those who protect it)."
  },
  karma: {
    sanskrit: "कर्म",
    meaning: "Action, intent, and deed, which form a cycle of cause and effect, shaping our life trajectory.",
    shloka: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन (You have a right to perform duty, not to its fruits)."
  },
  yoga: {
    sanskrit: "योग",
    meaning: "Union of the individual consciousness with the universal consciousness; integration of body, mind, and spirit.",
    shloka: "योगश्चित्तवृत्तिनिरोधः (Yoga is the cessation of the fluctuations of the mind)."
  },
  jnana: {
    sanskrit: "ज्ञान",
    meaning: "Sacred transcendental knowledge and self-realization that dissolves ignorance.",
    shloka: "न हि ज्ञानेन सदृशं पवित्रमिह विद्यते (Truly, there is nothing in this world as purifying as knowledge)."
  },
  guru: {
    sanskrit: "गुरु",
    meaning: "The dispeller of darkness. 'Gu' means darkness/ignorance, and 'Ru' means the remover.",
    shloka: "गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः (Guru is Brahma, Vishnu, and Lord Shiva himself)."
  },
  shishya: {
    sanskrit: "शिष्य",
    meaning: "The humble seeker of truth, characterized by earnest inquiry, discipline, and devotion to learning.",
    shloka: "शिष्यस्तेऽहं शाधि मां त्वां प्रपन्नम् (I am your disciple, please guide me who has surrendered to you)."
  },
  moksha: {
    sanskrit: "मोक्ष",
    meaning: "Liberation from the eternal cycle of rebirth (Samsara) and merging into the ultimate reality.",
    shloka: "तमसो मा ज्योतिर्गमय (Lead me from darkness to light)."
  },
  ayurveda: {
    sanskrit: "आयुर्वेद",
    meaning: "The science of longevity and holistic healing. 'Ayus' means life, and 'Veda' means knowledge.",
    shloka: "स्वस्थस्य स्वास्थ्य रक्षणं (To protect the health of the healthy)."
  }
};

const VEDIC_MATHS_SUGGESTIONS = [
  { keywords: ["maths", "mathematics", "vedic maths", "calculate", "multiplication", "multiply", "square"], text: "Try entering a squaring problem ending in 5 (like `65 squared` or `65*65`) or numbers close to 100 (like `98 * 97`), and watch me compute it using sacred Vedic Sutras!" }
];

export const GuruAI = {
  respond: (message) => {
    const msg = message.toLowerCase().trim();

    // 1. Check for Sanskrit Words Dictionary
    for (const key in SANSKRIT_DICTIONARY) {
      if (msg.includes(key)) {
        const item = SANSKRIT_DICTIONARY[key];
        return `
          <strong>Guru AI:</strong> Ah! You inquire about the sacred concept of <strong>${key.toUpperCase()} (${item.sanskrit})</strong>.<br><br>
          <em>Definition:</em> ${item.meaning}<br><br>
          <em>Sacred Maxim:</em> "${item.shloka}"<br><br>
          💡 <em>Recommended Course:</em> Check out our <strong>Sanskrit Devbhasha Introduction</strong> or <strong>Bhagavad Gita Wisdom</strong> in the courses catalog!
        `;
      }
    }

    // 2. Check for Vedic Math Squaring problems ending in 5 (Ekadhikena Purvena Sutra)
    // Regex: Match patterns like 75 squared, 75^2, 75*75, square of 75
    const squareRegex = /(\d+)\s*(?:squared|\^2|\*\s*\1|square\s*of)/i;
    const squareMatch = msg.match(squareRegex) || msg.match(/square\s*of\s*(\d+)/i);
    
    if (squareMatch) {
      const numStr = squareMatch[1] || squareMatch[2];
      const num = parseInt(numStr);
      
      if (numStr.endsWith("5")) {
        const firstPart = Math.floor(num / 10);
        const formulaLeft = firstPart * (firstPart + 1);
        const result = num * num;
        
        return `
          <strong>Guru AI (Vedic Math Tutors):</strong> 🧮 I can solve ${num}² instantly using the Vedic Sutra <strong>"Ekadhikena Purvena"</strong> (By one more than the previous one)!<br><br>
          <strong>Step 1:</strong> Identify the digits. The number ends in 5, so the last part of the answer is always <strong>25</strong>.<br>
          <strong>Step 2:</strong> Take the remaining digit(s), which is <strong>${firstPart}</strong>. Multiply it by 'one more than itself':<br>
          &nbsp;&nbsp;&nbsp;&nbsp;${firstPart} × (${firstPart} + 1) = ${firstPart} × ${firstPart + 1} = <strong>${formulaLeft}</strong>.<br>
          <strong>Step 3:</strong> Append 25 to the result:<br>
          &nbsp;&nbsp;&nbsp;&nbsp;${formulaLeft} | 25 = <strong>${result}</strong>!<br><br>
          ✨ ${num}² = <strong>${result}</strong>. Amazing, isn't it?
        `;
      } else {
        // Fallback standard math square
        const result = num * num;
        return `
          <strong>Guru AI:</strong> The square of ${num} is <strong>${result}</strong>.<br><br>
          💡 <em>Tip:</em> Try asking for the square of a number ending in 5 (e.g., "75 squared") to see the Vedic mathematical sutra in action!
        `;
      }
    }

    // 3. Check for base multiplication close to 100 (Nikhilam Sutra)
    // Regex: Match patterns like 97 * 98, 97 x 98, multiply 97 by 98
    const multRegex = /(\d+)\s*(?:\*|x|by|multiply)\s*(\d+)/i;
    const multMatch = msg.match(multRegex) || msg.match(/multiply\s*(\d+)\s*and\s*(\d+)/i);

    if (multMatch) {
      const n1 = parseInt(multMatch[1]);
      const n2 = parseInt(multMatch[2]);
      
      if (n1 >= 90 && n1 <= 100 && n2 >= 90 && n2 <= 100) {
        const diff1 = 100 - n1;
        const diff2 = 100 - n2;
        const crossSub = n1 - diff2; // or n2 - diff1
        const multDiff = diff1 * diff2;
        const diffStr = multDiff < 10 ? "0" + multDiff : multDiff;
        const result = n1 * n2;

        return `
          <strong>Guru AI (Vedic Math Tutors):</strong> 🧮 Multiplying ${n1} × ${n2} using the <strong>Nikhilam Navatashcaramam Dashatah Sutra</strong> (All from 9 and last from 10):<br><br>
          We use <strong>100</strong> as our base:<br>
          - Deviancy of ${n1} from 100 is <strong>-${diff1}</strong><br>
          - Deviancy of ${n2} from 100 is <strong>-${diff2}</strong><br><br>
          <strong>Step 1 (Left Part):</strong> Cross-subtract deviancy from the numbers:<br>
          &nbsp;&nbsp;&nbsp;&nbsp;${n1} - ${diff2} = <strong>${crossSub}</strong> (or ${n2} - ${diff1} = ${crossSub})<br>
          <strong>Step 2 (Right Part):</strong> Multiply the deviancies:<br>
          &nbsp;&nbsp;&nbsp;&nbsp;(-${diff1}) × (-${diff2}) = <strong>${multDiff}</strong><br>
          <strong>Step 3:</strong> Combine the Left and Right parts:<br>
          &nbsp;&nbsp;&nbsp;&nbsp;${crossSub} | ${diffStr} = <strong>${result}</strong>!<br><br>
          ✨ ${n1} × ${n2} = <strong>${result}</strong>!
        `;
      } else {
        return `
          <strong>Guru AI:</strong> ${n1} multiplied by ${n2} is <strong>${n1 * n2}</strong>.<br><br>
          💡 <em>Tip:</em> Try multiplying numbers close to 100 (e.g. "98 x 96") to see the Atharvavedic <strong>Nikhilam Sutra</strong> break it down!
        `;
      }
    }

    // 4. Check for course searches
    if (msg.includes("course") || msg.includes("learn") || msg.includes("study") || msg.includes("class")) {
      return `
        <strong>Guru AI:</strong> Pranam! I can guide you to these profound streams of knowledge:<br><br>
        🕉️ <strong>Sanskrit Learning:</strong> Introduction to Devanagari alphabets, sandhi and mantras.<br>
        🧮 <strong>Vedic Mathematics:</strong> Sacred sutras for hyper-speed calculation.<br>
        🧘 <strong>Yoga & Meditation:</strong> Patanjali's Ashtanga Yoga and breath control.<br>
        🌱 <strong>Ayurveda:</strong> Element balances, Dosha profiling, and organic living.<br><br>
        Which wisdom stream calls out to your soul today? Enter its name and I will explain further!
      `;
    }

    // 5. Basic greetings and spiritual inquiries
    if (msg.includes("hello") || msg.includes("hi") || msg.includes("pranam") || msg.includes("namaste")) {
      return `
        <strong>Guru AI:</strong> 🙏 Namaste & Pranam, dear Shishya (Seeker)! I am <strong>Guru AI</strong>, your spiritual companion and tutor in this Virtual Gurukul.<br><br>
        Ask me about:
        - 🕉️ Sanskrit definitions (e.g. <em>Dharma, Karma, Moksha, Yoga</em>)
        - 🧮 Solving complex maths with Vedic Sutras (e.g. <em>85 squared, 96 x 97</em>)
        - 📚 Gurukul courses recommendations.
      `;
    }

    if (msg.includes("who are you") || msg.includes("your name")) {
      return "<strong>Guru AI:</strong> I am Guru AI, synthesized from the spiritual essence of ancient Rishis combined with modern digital neural pathways. I am here to light your path to wisdom!";
    }

    // Default response
    return `
      <strong>Guru AI:</strong> I hear your earnest voice, seeker. The layers of ancient Indian wisdom are deep and profound.<br><br>
      Try asking me to translate key Sanskrit terms like <strong>Dharma</strong>, <strong>Karma</strong>, or <strong>Moksha</strong>, or let me solve a calculation like <strong>75 squared</strong>!
    `;
  }
};
