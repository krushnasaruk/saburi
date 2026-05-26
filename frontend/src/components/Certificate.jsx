import React, { useRef, useEffect } from "react";

export default function Certificate({ studentName, courseTitle, onClose }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    // High-resolution dimensions
    canvas.width = 1000;
    canvas.height = 700;

    const w = canvas.width;
    const h = canvas.height;

    // Background Gradient (parchment effect)
    const bgGrad = ctx.createRadialGradient(w/2, h/2, 100, w/2, h/2, w/1.4);
    bgGrad.addColorStop(0, "#fffbf2");
    bgGrad.addColorStop(1, "#f4ebd3");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Intricate Saffron & Gold Borders
    ctx.lineWidth = 14;
    ctx.strokeStyle = "#b84f18"; // saffron dark
    ctx.strokeRect(20, 20, w - 40, h - 40);

    ctx.lineWidth = 4;
    ctx.strokeStyle = "#dfb238"; // gold
    ctx.strokeRect(34, 34, w - 68, h - 68);

    // Corner Mandala Accents
    const drawCornerMandala = (x, y, rotation) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.strokeStyle = "#dfb238";
      ctx.lineWidth = 2.5;

      ctx.beginPath();
      ctx.arc(0, 0, 35, 0, Math.PI / 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, 50, 0, Math.PI / 2);
      ctx.stroke();

      for (let angle = 0; angle <= Math.PI / 2; angle += Math.PI / 16) {
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * 35, Math.sin(angle) * 35);
        ctx.lineTo(Math.cos(angle) * 55, Math.sin(angle) * 55);
        ctx.stroke();
      }
      ctx.restore();
    };

    drawCornerMandala(34, 34, 0);
    drawCornerMandala(w - 34, 34, Math.PI / 2);
    drawCornerMandala(w - 34, h - 34, Math.PI);
    drawCornerMandala(34, h - 34, -Math.PI / 2);

    // Background Mandala Watermark
    ctx.save();
    ctx.globalAlpha = 0.04;
    ctx.strokeStyle = "#251206";
    ctx.lineWidth = 2;
    ctx.translate(w/2, h/2);
    for (let r = 50; r <= 280; r += 30) {
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    for (let petals = 8; petals <= 24; petals += 8) {
      for (let i = 0; i < petals; i++) {
        const angle = (i * Math.PI * 2) / petals;
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, 80, 20, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
    ctx.restore();

    // Texts
    ctx.textAlign = "center";
    ctx.fillStyle = "#251206";
    ctx.font = "bold 26px 'Outfit', sans-serif";
    ctx.letterSpacing = "6px";
    ctx.fillText("VIRTUAL GURUKUL", w / 2, 95);

    ctx.font = "italic 16px 'Outfit', sans-serif";
    ctx.fillStyle = "#d96b27";
    ctx.letterSpacing = "2px";
    ctx.fillText("विद्ययाऽमृतमश्नुते", w / 2, 130);

    ctx.font = "bold 38px 'Outfit', sans-serif";
    ctx.fillStyle = "#b84f18";
    ctx.letterSpacing = "3px";
    ctx.fillText("CERTIFICATE OF GRADUATION", w / 2, 210);

    ctx.font = "500 17px 'Inter', sans-serif";
    ctx.fillStyle = "#5e473b";
    ctx.fillText("This credential is dry-inked and awarded to verify that", w / 2, 275);

    ctx.font = "bold 46px 'Outfit', sans-serif";
    ctx.fillStyle = "#d96b27";
    ctx.fillText(studentName, w / 2, 340);

    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#dfb238";
    ctx.beginPath();
    ctx.moveTo(w/2 - 180, 355);
    ctx.lineTo(w/2 + 180, 355);
    ctx.stroke();

    ctx.font = "500 17px 'Inter', sans-serif";
    ctx.fillStyle = "#5e473b";
    ctx.fillText("has successfully mastered the ancient syllabus of the digital course", w / 2, 395);

    ctx.font = "bold 32px 'Outfit', sans-serif";
    ctx.fillStyle = "#251206";
    ctx.fillText(courseTitle.toUpperCase(), w / 2, 445);

    ctx.font = "14px 'Inter', sans-serif";
    ctx.fillStyle = "#7e6557";
    ctx.fillText("demonstrating rigorous dedication, passing all examinations, and earning the esteemed Shishya Honors.", w / 2, 490);

    // Signatures
    ctx.font = "bold 16px 'Outfit', sans-serif";
    ctx.fillStyle = "#251206";
    ctx.fillText("Acharya Vidyasagar", 230, 585);
    ctx.font = "12px 'Inter', sans-serif";
    ctx.fillStyle = "#7e6557";
    ctx.fillText("Head Guru (Academics)", 230, 605);
    ctx.beginPath();
    ctx.moveTo(130, 570);
    ctx.lineTo(330, 570);
    ctx.stroke();

    ctx.font = "bold 16px 'Outfit', sans-serif";
    ctx.fillStyle = "#251206";
    ctx.fillText(new Date().toLocaleDateString(), w - 230, 585);
    ctx.font = "12px 'Inter', sans-serif";
    ctx.fillStyle = "#7e6557";
    ctx.fillText("Date of Accomplishment", w - 230, 605);
    ctx.beginPath();
    ctx.moveTo(w - 330, 570);
    ctx.lineTo(w - 130, 570);
    ctx.stroke();

    // Central Gold Seal
    const sealX = w / 2;
    const sealY = 585;
    ctx.beginPath();
    ctx.arc(sealX, sealY, 40, 0, Math.PI * 2);
    ctx.fillStyle = "#dfb238";
    ctx.fill();
    ctx.strokeStyle = "#b84f18";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(sealX, sealY, 32, 0, Math.PI * 2);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.stroke();

    ctx.font = "bold 26px 'Outfit', sans-serif";
    ctx.fillStyle = "#b84f18";
    ctx.fillText("🕉️", sealX, sealY + 8);
  }, [studentName, courseTitle]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const imageURL = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = imageURL;
    downloadLink.download = `Gurukul_Certificate_${studentName.replace(/\s+/g, "_")}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <h3 className="text-lg font-bold font-heading text-saffron">Decoded graduation credential</h3>
      <canvas ref={canvasRef} className="max-w-full shadow-2xl rounded-2xl border border-sienna/10" style={{ width: '600px' }}></canvas>
      <div className="flex gap-4">
        <button onClick={handleDownload} className="px-5 py-2.5 bg-saffron hover:bg-saffron-dark text-white rounded-xl text-xs font-bold font-heading">
          Download PNG
        </button>
        {onClose && (
          <button onClick={onClose} className="px-5 py-2.5 bg-sienna-light/10 text-sienna rounded-xl text-xs font-bold font-heading">
            Close View
          </button>
        )}
      </div>
    </div>
  );
}
