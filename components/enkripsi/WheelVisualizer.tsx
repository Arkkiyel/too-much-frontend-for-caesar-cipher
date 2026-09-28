"use client";

import { ChevronUp, KeyRound } from "lucide-react";
import CipherWheel from "@/components/ui/CipherWheel";

interface WheelVisualizerProps {
  shift: number;
  setShift: (shift: number) => void; // <-- 1. TAMBAHKAN INI DI INTERFACE
  // Memungkinkan kita mengoper karakter spesifik untuk disorot (misal: "A" dan "H")
  sampleChars?: string[];
}

export default function WheelVisualizer({
  shift,
  setShift, // <-- 2. TAMBAHKAN INI DI PARAMETER
  sampleChars = ["A", "H"] // Default sesuai gambar desain
}: WheelVisualizerProps) {

  // Fungsi helper untuk menghitung huruf hasil pergeseran (korelasi)
  const getCipherChar = (char: string) => {
    const pos = char.toUpperCase().charCodeAt(0) - 65;
    const modResult = (pos + shift) % 26;
    // Mengatasi nilai negatif jika shift negatif (untuk dekripsi nantinya)
    const normalizedMod = (modResult + 26) % 26;
    return String.fromCharCode(normalizedMod + 65);
  };

  return (
    <div className="bg-[#111111] border border-zinc-800 rounded-2xl p-6 flex flex-col gap-8 w-full">

      {/* Header & Badge Key */}
      <div className="flex flex-wrap items-center justify-between gap-4">

        {/* Accordion/Header Title */}
        <div className="flex items-center gap-2 text-white font-medium cursor-pointer hover:text-zinc-300 transition-colors">
          <ChevronUp size={20} className="text-zinc-500" />
          <h2 className="text-lg">Lihat Roda Pergeseran Alfabet (Shift Wheel)</h2>
        </div>

        {/* Current Key Badge */}
        <div className="flex items-center gap-2 bg-red-950/30 border border-red-900/50 px-3 py-1.5 rounded-lg text-red-500 text-xs font-mono font-medium tracking-wide">
          <KeyRound size={14} />
          CURRENT KEY +{shift}
        </div>

      </div>

      {/* Main Content Area: Wheel & Correlation */}
      <div className="grid md:grid-cols-2 gap-8 items-center pt-2">

        {/* Sisi Kiri: Cipher Wheel Canvas */}
        <div className="flex justify-center items-center">
          {/* Kita memanggil komponen CipherWheel yang sudah Anda buat sebelumnya */}
          <CipherWheel
            shift={shift}
            onChangeShift={setShift} // <-- 3. SEKARANG INI AKAN BERFUNGSI
          />
        </div>

        {/* Sisi Kanan: Korelasi Saat Ini & Legend */}
        <div className="flex flex-col gap-10">

          {/* Korelasi Karakter */}
          <div>
            <h3 className="text-white font-medium mb-4">Korelasi Saat Ini</h3>
            <div className="flex flex-wrap gap-4">
              {sampleChars.map((char, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-6 bg-[#0a0a0a] border border-zinc-800 rounded-xl px-6 py-4 font-mono text-xl font-bold shadow-inner"
                >
                  <span className="text-white">{char.toUpperCase()}</span>
                  <span className="text-zinc-600">→</span>
                  <span className="text-red-500">{getCipherChar(char)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Legend / Keterangan Warna */}
          <div className="space-y-3 text-xs text-zinc-400 font-medium">

            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 shadow-[0_0_8px_rgba(212,212,216,0.4)]"></div>
              <p>Outer ring : alfabet asli / plaintext</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
              <p>Inner ring : alfabet bergeser / ciphertext</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
              <p>Connector aktif : pasangan karakter saat ini</p>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
