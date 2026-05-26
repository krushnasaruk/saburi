import React, { useState, useRef, useEffect } from "react";

const SANSKRIT_DICT = {
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

export default function GuruAI() {
  const [active, setActive] = useState(false);
  const [msgs, setMsgs] = useState([
    {
      bot: true,
      text: "🙏 Pranam! I am <strong>Guru AI</strong>, your digital spiritual companion. Ask me Sanskrit meanings (e.g. <em>Dharma, Karma</em>), or Vedic maths problems (e.g. <em>85 squared, 97 x 98</em>)!"
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const msgsEndRef = useRef(null);

  useEffect(() => {
    if (msgsEndRef.current) {
      msgsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [msgs]);

  const handleQuery = (message) => {
    const msg = message.toLowerCase().trim();

    // 1. Sanskrit Dictionary Lookups
    for (const key in SANSKRIT_DICT) {
      if (msg.includes(key)) {
        const item = SANSKRIT_DICT[key];
        return `
          Ah! You inquire about the sacred concept of <strong>${key.toUpperCase()} (${item.sanskrit})</strong>.<br/><br/>
          <em>Definition:</em> ${item.meaning}<br/><br/>
          <em>Sacred Maxim:</em> "${item.shloka}"<br/><br/>
          💡 <em>Recommended Course:</em> Check out our <strong>Sanskrit Devbhasha Introduction</strong> catalog!
        `;
      }
    }

    // 2. Vedic Math Squaring problems (Ekadhikena Purvena Sutra)
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
          🧮 I can solve ${num}² instantly using the Vedic Sutra <strong>"Ekadhikena Purvena"</strong> (By one more than the previous one)!<br/><br/>
          <strong>Step 1:</strong> Identify the digits. The number ends in 5, so the last part of the answer is always <strong>25</strong>.<br/>
          <strong>Step 2:</strong> Take the remaining digit(s), which is <strong>${firstPart}</strong>. Multiply it by 'one more than itself':<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;${firstPart} × (${firstPart} + 1) = ${firstPart} × ${firstPart + 1} = <strong>${formulaLeft}</strong>.<br/>
          <strong>Step 3:</strong> Append 25 to the result:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;${formulaLeft} | 25 = <strong>${result}</strong>!<br/><br/>
          ✨ ${num}² = <strong>${result}</strong>.
        `;
      } else {
        const result = num * num;
        return `
          The square of ${num} is <strong>${result}</strong>.<br/><br/>
          💡 <em>Tip:</em> Try asking for the square of a number ending in 5 (e.g. "85 squared") to see the Vedic mathematical sutra!
        `;
      }
    }

    // 3. Vedic Math Multiplications close to 100 (Nikhilam Sutra)
    const multRegex = /(\d+)\s*(?:\*|x|by|multiply)\s*(\d+)/i;
    const multMatch = msg.match(multRegex) || msg.match(/multiply\s*(\d+)\s*and\s*(\d+)/i);

    if (multMatch) {
      const n1 = parseInt(multMatch[1]);
      const n2 = parseInt(multMatch[2]);
      
      if (n1 >= 90 && n1 <= 100 && n2 >= 90 && n2 <= 100) {
        const diff1 = 100 - n1;
        const diff2 = 100 - n2;
        const crossSub = n1 - diff2;
        const multDiff = diff1 * diff2;
        const diffStr = multDiff < 10 ? "0" + multDiff : multDiff;
        const result = n1 * n2;

        return `
          🧮 Multiplying ${n1} × ${n2} using the <strong>Nikhilam Sutra</strong> (All from 9 and last from 10):<br/><br/>
          We use <strong>100</strong> as our base:<br/>
          - Deviancy of ${n1} from 100 is <strong>-${diff1}</strong><br/>
          - Deviancy of ${n2} from 100 is <strong>-${diff2}</strong><br/><br/>
          <strong>Step 1 (Left Part):</strong> Cross-subtract deviancy from the numbers:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;${n1} - ${diff2} = <strong>${crossSub}</strong> (or ${n2} - ${diff1} = ${crossSub})<br/>
          <strong>Step 2 (Right Part):</strong> Multiply the deviancies:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;(-${diff1}) × (-${diff2}) = <strong>${multDiff}</strong><br/>
          <strong>Step 3:</strong> Combine the Left and Right parts:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;${crossSub} | ${diffStr} = <strong>${result}</strong>!<br/><br/>
          ✨ ${n1} × ${n2} = <strong>${result}</strong>!
        `;
      } else {
        return `${n1} multiplied by ${n2} is <strong>${n1 * n2}</strong>.<br/><br/>💡 <em>Tip:</em> Try multiplying numbers close to 100 (e.g. "98 x 96") to see the Vedic sutra calculation!`;
      }
    }

    if (msg.includes("hello") || msg.includes("hi") || msg.includes("namaste") || msg.includes("pranam")) {
      return "🙏 Namaste & Pranam, dear Shishya! I am here to light your path to wisdom. Ask me mathematical sutras or Sanskrit definitions!";
    }

    return "I hear your earnest request, seeker. The depths of ancient shastras are profound. Try asking about <strong>Dharma</strong>, <strong>Moksha</strong>, or let me solve a calculation like <strong>85 squared</strong>!";
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal.trim();
    setMsgs(prev => [...prev, { bot: false, text: userText }]);
    setInputVal("");

    setTimeout(() => {
      const response = handleQuery(userText);
      setMsgs(prev => [...prev, { bot: true, text: response }]);
    }, 700);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      {/* CHAT PANEL */}
      <div className={`mb-4 w-80 h-96 glass rounded-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right shadow-2xl ${active ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-75 opacity-0 pointer-events-none'}`}>
        <div className="bg-gradient-to-r from-sienna to-sienna-light p-4 flex justify-between items-center text-white border-b-2 border-gold">
          <h3 className="font-heading font-extrabold text-sm flex items-center gap-1.5">🕉️ Guru AI Assistant</h3>
          <button onClick={() => setActive(false)} className="text-white text-lg font-bold">×</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#faf5eb]/50 text-xs">
          {msgs.map((m, idx) => (
            <div 
              key={idx} 
              className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${m.bot ? 'bg-white dark:bg-sienna-light text-sienna dark:text-cream border border-sienna/5 self-start' : 'bg-saffron text-white self-end'}`}
              style={{ alignSelf: m.bot ? 'flex-start' : 'flex-end' }}
              dangerouslySetInnerHTML={{ __html: m.text }}
            ></div>
          ))}
          <div ref={msgsEndRef} />
        </div>

        <form onSubmit={handleSend} className="flex border-t border-sienna/10 bg-white">
          <input 
            type="text" 
            placeholder="Ask Guru AI (e.g. Dharma, 85^2)..." 
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            className="flex-1 bg-transparent p-3 text-xs outline-none text-sienna font-medium"
          />
          <button type="submit" className="bg-saffron hover:bg-saffron-dark text-white px-4 text-xs font-bold font-heading">Seek</button>
        </form>
      </div>

      {/* FLOAT BUTTON */}
      <button 
        onClick={() => setActive(!active)}
        className="w-14 h-14 bg-gradient-to-br from-saffron to-gold rounded-full flex items-center justify-center text-2xl text-white shadow-lg animate-bounce"
        title="Chat with Guru AI"
      >
        🧘
      </button>
    </div>
  );
}
