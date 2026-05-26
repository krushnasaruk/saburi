/**
 * Virtual Gurukul - Canvas Certificate Generator
 * Dynamically draws premium, high-resolution Sanskrit-themed certificates
 * with gold mandala borders, customized names, dates, and Chancellor seals
 * that can be downloaded instantly in the browser.
 */

export const CertificateGenerator = {
  /**
   * Draws a premium certificate onto a target HTML5 canvas element
   * @param {HTMLCanvasElement} canvas The canvas element
   * @param {string} studentName The student's full name
   * @param {string} courseTitle The completed course title
   * @param {string} dateString The issue date
   */
  draw: (canvas, studentName, courseTitle, dateString = new Date().toLocaleDateString()) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    // Set fixed high resolution dimensions
    canvas.width = 1000;
    canvas.height = 700;

    const w = canvas.width;
    const h = canvas.height;

    // --- 1. Background Fill (Earthy cream parchment look) ---
    const bgGrad = ctx.createRadialGradient(w/2, h/2, 100, w/2, h/2, w/1.4);
    bgGrad.addColorStop(0, "#fffbf2");
    bgGrad.addColorStop(1, "#f4ebd3");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // --- 2. Elegant Gold & Saffron Borders ---
    // Outer border (saffron)
    ctx.lineWidth = 14;
    ctx.strokeStyle = "#b84f18"; // saffron dark
    ctx.strokeRect(20, 20, w - 40, h - 40);

    // Inner thin border (gold)
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#dfb238"; // gold
    ctx.strokeRect(34, 34, w - 68, h - 68);

    // Corner Mandala Accents
    function drawCornerMandala(x, y, rotation) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.strokeStyle = "#dfb238";
      ctx.lineWidth = 2.5;

      // Draw concentric elegant fan circles
      ctx.beginPath();
      ctx.arc(0, 0, 35, 0, Math.PI / 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, 50, 0, Math.PI / 2);
      ctx.stroke();

      // Rays
      for (let angle = 0; angle <= Math.PI / 2; angle += Math.PI / 16) {
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * 35, Math.sin(angle) * 35);
        ctx.lineTo(Math.cos(angle) * 55, Math.sin(angle) * 55);
        ctx.stroke();
      }
      ctx.restore();
    }

    drawCornerMandala(34, 34, 0);
    drawCornerMandala(w - 34, 34, Math.PI / 2);
    drawCornerMandala(w - 34, h - 34, Math.PI);
    drawCornerMandala(34, h - 34, -Math.PI / 2);

    // --- 3. Intricate Mandala Watermark in the Background ---
    ctx.save();
    ctx.globalAlpha = 0.045; // very faint
    ctx.strokeStyle = "#251206";
    ctx.lineWidth = 2;
    ctx.translate(w/2, h/2);
    
    // Draw concentric circles
    for (let r = 50; r <= 280; r += 30) {
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Draw petals
    for (let petals = 8; petals <= 32; petals += 8) {
      for (let i = 0; i < petals; i++) {
        const angle = (i * Math.PI * 2) / petals;
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, 80, 20, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
    ctx.restore();

    // --- 4. TEXT CONTENT ---

    // Top Header: "VIRTUAL GURUKUL"
    ctx.textAlign = "center";
    ctx.fillStyle = "#251206"; // dark brown
    ctx.font = "bold 26px 'Outfit', sans-serif";
    ctx.letterSpacing = "6px";
    ctx.fillText("VIRTUAL GURUKUL", w / 2, 95);

    // Sanskrit Motto: "विद्ययाऽमृतमश्नुते" (Through Knowledge, One Attains Immortality)
    ctx.font = "italic 16px 'Outfit', sans-serif";
    ctx.fillStyle = "#d96b27"; // saffron
    ctx.letterSpacing = "2px";
    ctx.fillText("विद्ययाऽमृतमश्नुते", w / 2, 130);

    // Sub-title: "CERTIFICATE OF GRADUATION"
    ctx.font = "bold 38px 'Outfit', sans-serif";
    ctx.fillStyle = "#b84f18";
    ctx.letterSpacing = "3px";
    ctx.fillText("CERTIFICATE OF GRADUATION", w / 2, 210);

    // Text: "This credential is dry-inked to verify that"
    ctx.font = "500 17px 'Inter', sans-serif";
    ctx.fillStyle = "#5e473b";
    ctx.letterSpacing = "0.5px";
    ctx.fillText("This credential is dry-inked and awarded to verify that", w / 2, 275);

    // --- Student's Name (Calligraphy Style) ---
    ctx.font = "bold 46px 'Outfit', sans-serif";
    ctx.fillStyle = "#d96b27";
    ctx.shadowColor = "rgba(219, 107, 39, 0.25)";
    ctx.shadowBlur = 8;
    ctx.fillText(studentName, w / 2, 340);
    ctx.shadowBlur = 0; // reset shadow

    // Line under student name
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#dfb238";
    ctx.beginPath();
    ctx.moveTo(w/2 - 180, 355);
    ctx.lineTo(w/2 + 180, 355);
    ctx.stroke();

    // Text: "has successfully mastered the sacred syllabus of"
    ctx.font = "500 17px 'Inter', sans-serif";
    ctx.fillStyle = "#5e473b";
    ctx.fillText("has successfully mastered the ancient syllabus of the digital course", w / 2, 395);

    // --- Course Title ---
    ctx.font = "bold 32px 'Outfit', sans-serif";
    ctx.fillStyle = "#251206";
    ctx.fillText(courseTitle.toUpperCase(), w / 2, 445);

    // Text: "demonstrating high proficiency, passing all spiritual quizzes, and earning academic honors."
    ctx.font = "14px 'Inter', sans-serif";
    ctx.fillStyle = "#7e6557";
    ctx.fillText("demonstrating rigorous dedication, passing all examinations, and earning the esteemed Shishya Honors.", w / 2, 490);

    // --- 5. Chancellor's Stamp & Signatures ---
    
    // Left: Chancellor Signature
    ctx.font = "bold 16px 'Outfit', sans-serif";
    ctx.fillStyle = "#251206";
    ctx.fillText("Acharya Vidyasagar", 230, 585);
    ctx.font = "12px 'Inter', sans-serif";
    ctx.fillStyle = "#7e6557";
    ctx.fillText("Head Guru (Academics)", 230, 605);
    // Draw sign line
    ctx.beginPath();
    ctx.moveTo(130, 570);
    ctx.lineTo(330, 570);
    ctx.stroke();

    // Right: Date
    ctx.font = "bold 16px 'Outfit', sans-serif";
    ctx.fillStyle = "#251206";
    ctx.fillText(dateString, w - 230, 585);
    ctx.font = "12px 'Inter', sans-serif";
    ctx.fillStyle = "#7e6557";
    ctx.fillText("Date of Accomplishment", w - 230, 605);
    // Draw sign line
    ctx.beginPath();
    ctx.moveTo(w - 330, 570);
    ctx.lineTo(w - 130, 570);
    ctx.stroke();

    // Bottom Center: Gold Chancellor Seal (Mandala style stamp)
    const sealX = w / 2;
    const sealY = 585;
    
    ctx.save();
    ctx.shadowColor = "rgba(184, 79, 24, 0.3)";
    ctx.shadowBlur = 10;
    
    // Outer seal circle
    ctx.beginPath();
    ctx.arc(sealX, sealY, 40, 0, Math.PI * 2);
    ctx.fillStyle = "#dfb238";
    ctx.fill();
    ctx.strokeStyle = "#b84f18";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Inner dotted circle
    ctx.beginPath();
    ctx.arc(sealX, sealY, 32, 0, Math.PI * 2);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.stroke();
    ctx.restore();

    // Seal icon (Om 🕉️ symbol or wheat sheaf)
    ctx.font = "bold 26px 'Outfit', sans-serif";
    ctx.fillStyle = "#b84f18";
    ctx.fillText("🕉️", sealX, sealY + 8);
  },

  /**
   * Prompts immediate browser download of the certificate as a high-quality PNG
   * @param {HTMLCanvasElement} canvas The canvas element
   * @param {string} studentName Name for file naming
   */
  download: (canvas, studentName = "Shishya") => {
    if (!canvas) return;
    const imageURL = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = imageURL;
    downloadLink.download = `Gurukul_Certificate_${studentName.replace(/\s+/g, "_")}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
};
