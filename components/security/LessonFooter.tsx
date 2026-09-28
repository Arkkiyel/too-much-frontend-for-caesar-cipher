"use client";

import { Lightbulb } from "lucide-react";

export default function LessonFooter() {
  return (
    <div className="bg-[#111111] border border-amber-900/30 rounded-2xl p-6 flex flex-col md:flex-row gap-5 shadow-lg relative overflow-hidden mt-2">

      {/* Efek glow di background */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Ikon */}
      <div className="p-3 bg-amber-950/40 rounded-xl border border-amber-900/50 h-fit shrink-0">
        <Lightbulb className="text-amber-500" size={24} />
      </div>

      {/* Konten Edukasi */}
      <div className="w-full">
        <h3 className="text-white font-bold text-base mb-2">
          Pelajaran Keamanan Kriptografi
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed mb-5 max-w-4xl">
          Caesar Cipher <strong className="text-amber-500 font-medium">tidak aman</strong> untuk komunikasi rahasia modern. Ruang kuncinya hanya 25 key dan dapat diuji dalam hitungan mikrodetik. Sebagai pembanding, AES-256 menyediakan 2^256 kemungkinan kunci—jumlah astronomis yang tidak realistis untuk di-brute-force dengan komputasi saat ini.
        </p>

        {/* Perbandingan Key Space */}
        <div className="grid md:grid-cols-2 gap-4">

          {/* Kotak Caesar */}
          <div className="bg-[#0a0a0a] border border-amber-900/30 rounded-lg p-4">
            <span className="text-amber-500 font-bold text-lg block mb-1">25 keys</span>
            <span className="text-zinc-600 text-xs font-mono">Caesar - selesai dalam milidetik</span>
          </div>

          {/* Kotak AES-256 */}
          <div className="bg-[#0a0a0a] border border-emerald-900/30 rounded-lg p-4">
            <span className="text-emerald-500 font-bold text-lg block mb-1">2^256</span>
            <span className="text-zinc-600 text-xs font-mono">AES 256 - komputasi nyaris mustahil</span>
          </div>

        </div>
      </div>

    </div>
  );
}
