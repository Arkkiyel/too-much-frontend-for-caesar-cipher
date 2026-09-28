"use client";

import { useEffect, useRef } from "react";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

interface CipherWheelProps {
  shift: number;
  onChangeShift?: (newShift: number) => void;
}

export default function CipherWheel({ shift, onChangeShift }: CipherWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 1. KITA GUNAKAN REF BUKAN STATE!
  // Ini mencegah React melakukan re-render berat berkali-kali. Canvas akan digambar ulang 
  // pada kecepatan 60FPS secara independen (super ringan dan mulus).
  const shiftRef = useRef(shift);          // Angka target dari slider (misal: 5)
  const visualShiftRef = useRef(shift);    // Posisi visual roda saat ini (desimal, misal: 4.87)
  const isDragging = useRef(false);
  const startAngleRef = useRef(0);
  const startShiftRef = useRef(0);
  const dragOffsetRef = useRef(0);

  // Selaraskan perubahan prop shift (dari slider luar) ke dalam Ref
  useEffect(() => {
    shiftRef.current = shift;
  }, [shift]);

  // --- LOGIKA DRAG MOUSE / TOUCH ---
  const getPointerAngle = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;
    const rect = canvas.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return Math.atan2(e.clientY - cy, e.clientX - cx);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(e.pointerId);
    isDragging.current = true;
    startAngleRef.current = getPointerAngle(e);
    startShiftRef.current = shiftRef.current;
    dragOffsetRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDragging.current) return;

    const currentAngle = getPointerAngle(e);
    let diff = currentAngle - startAngleRef.current;

    // Normalisasi agar putaran tidak melompat di titik 360 derajat
    if (diff > Math.PI) diff -= Math.PI * 2;
    if (diff < -Math.PI) diff += Math.PI * 2;

    const shiftStep = (Math.PI * 2) / 26;
    const shiftDiff = diff / shiftStep;

    dragOffsetRef.current = -shiftDiff;

    // Mengirim ke parent (Slider)
    if (onChangeShift) {
      const newShiftRaw = startShiftRef.current - Math.round(shiftDiff);
      const newShift = ((newShiftRaw % 26) + 26) % 26;
      if (newShift !== shiftRef.current) {
        onChangeShift(newShift);
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    dragOffsetRef.current = 0;
    const canvas = canvasRef.current;
    if (canvas) canvas.releasePointerCapture(e.pointerId);
  };

  // --- RENDER LOOP 60FPS (ANIMASI MULUS) ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {

      // A. LOGIKA INTERPOLASI MULUS (LERP)
      if (isDragging.current) {
        // Jika sedang disentuh, visual roda 100% mengikuti jari
        visualShiftRef.current = startShiftRef.current + dragOffsetRef.current;
      } else {
        // Jika tidak disentuh (slider digeser), visual mengejar target secara mulus
        let diff = shiftRef.current - visualShiftRef.current;

        // Logika Rute Terpendek (Wrap Around). 
        // Contoh: Jika dari 25 mau ke 0, roda memutar maju, bukan mundur jauh 24 langkah.
        if (diff > 13) diff -= 26;
        if (diff < -13) diff += 26;

        if (Math.abs(diff) > 0.005) {
          // Mendekati target sebesar 15% setiap frame (memberikan efek 'easing' yang elegan)
          visualShiftRef.current += diff * 0.15;
        } else {
          // Snap jika sudah sangat dekat
          visualShiftRef.current = shiftRef.current;
        }
      }

      // B. MENGGAMBAR CANVAS
      const SIZE = 320;
      canvas.width = SIZE;
      canvas.height = SIZE;
      const cx = SIZE / 2;
      const cy = SIZE / 2;

      const R_OUTER_BORDER = SIZE * 0.46;
      const R_OUTER_LETTER = SIZE * 0.40;
      const R_INNER_BORDER = SIZE * 0.30;
      const R_INNER_LETTER = SIZE * 0.25;
      const R_CENTER = SIZE * 0.16;

      ctx.clearRect(0, 0, SIZE, SIZE);

      // Background dan Border Luar
      ctx.beginPath();
      ctx.arc(cx, cy, R_OUTER_BORDER, 0, Math.PI * 2);
      ctx.fillStyle = "#0a0a0a";
      ctx.fill();
      ctx.strokeStyle = "#3f3f46";
      ctx.lineWidth = 1;
      ctx.stroke();

      const arcSpan = (110 / 360) * Math.PI * 2;
      const arcStart = -Math.PI / 2 - arcSpan / 2;
      const arcEnd = -Math.PI / 2 + arcSpan / 2;

      ctx.save();
      ctx.shadowColor = "#dc2626";
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(cx, cy, R_OUTER_BORDER, arcStart, arcEnd);
      ctx.strokeStyle = "#ef4444";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      // Huruf Ring Luar (Plaintext - Statis)
      ALPHABET.forEach((letter, i) => {
        const angle = (i / 26) * Math.PI * 2 - Math.PI / 2;
        const x = cx + R_OUTER_LETTER * Math.cos(angle);
        const y = cy + R_OUTER_LETTER * Math.sin(angle);

        const normAngle = ((angle + Math.PI / 2) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        const nearTop = normAngle < arcSpan / 2 || normAngle > Math.PI * 2 - arcSpan / 2;

        ctx.font = `${SIZE * 0.037}px monospace`;
        ctx.fillStyle = nearTop ? "#ffffff" : "#71717a";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(letter, x, y);
      });

      // Background dan Border Ring Dalam
      ctx.beginPath();
      ctx.arc(cx, cy, R_INNER_BORDER, 0, Math.PI * 2);
      ctx.fillStyle = "#111111";
      ctx.fill();
      ctx.strokeStyle = "#7f1d1d";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.save();
      ctx.shadowColor = "#dc2626";
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(cx, cy, R_INNER_BORDER, arcStart, arcEnd);
      ctx.strokeStyle = "#ef4444";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // Huruf Ring Dalam (Ciphertext - Berputar Mulus)
      ALPHABET.forEach((letter, i) => {
        // Menggunakan visualShiftRef (desimal yang dianimasikan), BUKAN shift angka bulat
        const angle = ((i - visualShiftRef.current) / 26) * Math.PI * 2 - Math.PI / 2;
        const x = cx + R_INNER_LETTER * Math.cos(angle);
        const y = cy + R_INNER_LETTER * Math.sin(angle);

        ctx.font = `${SIZE * 0.035}px monospace`;
        ctx.fillStyle = "#ef4444";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(letter, x, y);
      });

      // Lingkaran Merah Tengah
      ctx.save();
      ctx.shadowColor = "#dc2626";
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(cx, cy, R_CENTER, 0, Math.PI * 2);
      ctx.fillStyle = "#dc2626";
      ctx.fill();
      ctx.restore();

      // Label Angka Tengah (Tetap menampilkan angka bulat target)
      ctx.font = `bold ${SIZE * 0.11}px sans-serif`;
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`+${shiftRef.current}`, cx, cy);

      // Jarum Penunjuk
      ctx.save();
      ctx.shadowColor = "#ef4444";
      ctx.shadowBlur = 6;
      ctx.strokeStyle = "#ef4444";
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(cx, cy - R_CENTER - 2);
      ctx.lineTo(cx, cy - R_INNER_BORDER + 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx, cy - R_INNER_BORDER - 2);
      ctx.lineTo(cx, cy - R_OUTER_LETTER + 6);
      ctx.stroke();
      ctx.restore();

      // Panggil loop frame berikutnya
      animationFrameId = requestAnimationFrame(render);
    };

    render(); // Jalankan loop

    return () => cancelAnimationFrame(animationFrameId); // Bersihkan saat unmount
  }, []); // Array dependensi kosong: Effect ini hanya berjalan 1 kali dan memutar loop selamanya

  return (
    <canvas
      ref={canvasRef}
      width={320}
      height={320}
      className="max-w-full h-auto cursor-grab active:cursor-grabbing touch-none"
      style={{ width: "320px", height: "320px", maxWidth: "100%" }}
      aria-label={`Cipher wheel dengan shift ${shift}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    />
  );
}
