"use client";

import { Info, AlertTriangle, CheckCircle2 } from "lucide-react";

interface ReverseTransformationTableProps {
  ciphertext: string;
  shift: number;
}

export default function ReverseTransformationTable({ ciphertext, shift }: ReverseTransformationTableProps) {
  const chars = ciphertext.split("");

  return (
    <div className="bg-[#111111] border border-zinc-800 rounded-2xl p-6 flex flex-col gap-4 w-full">

      {/* Header Tabel & WRAP NEGATIF Badge */}
      <div className="flex flex-wrap justify-between items-start gap-4">
        <div>
          <h2 className="text-white font-semibold text-lg">Tabel Dekripsi Karakter (Reverse Shift)</h2>
          <p className="text-xs text-zinc-500 mt-1">Arah: Inner ke Outer</p>
        </div>
        <div className="flex items-center gap-1.5 bg-amber-950/30 border border-amber-900/50 px-3 py-1.5 rounded-lg text-amber-500 text-xs font-mono font-medium tracking-wide">
          <AlertTriangle size={14} />
          WRAP NEGATIF
        </div>
      </div>

      {/* Info Banner Rumus Negatif */}
      <div className="flex items-center gap-2 bg-amber-950/20 border border-amber-900/30 text-amber-500/80 px-4 py-3 rounded-xl text-[11px] md:text-xs">
        <Info size={16} className="shrink-0" />
        <p>Jika hasil pengurangan di bawah 0, tambahkan 26 sebelum modulo. Contoh: B(1) - 3 = -2 &rarr; +26 = 24 &rarr; Y</p>
      </div>

      {/* Kontainer Scrollable */}
      <div className="overflow-y-auto overflow-x-auto max-h-[300px] relative rounded-xl border border-zinc-800/50 shadow-inner custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead className="sticky top-0 bg-[#111111] z-10 shadow-md">
            <tr className="border-b border-zinc-800 text-zinc-500 text-xs font-medium">
              <th className="py-4 px-4 font-normal">Huruf Cipher</th>
              <th className="py-4 px-4 font-normal">Posisi</th>
              <th className="py-4 px-4 font-normal">Minus Shift</th>
              <th className="py-4 px-4 font-normal">Modulo 26 lengkap</th>
              <th className="py-4 px-4 font-normal text-right">Huruf Asli</th>
              <th className="py-4 px-4 font-normal text-center">Catatan</th>
            </tr>
          </thead>
          <tbody className="text-sm font-mono">
            {chars.map((char, i) => {
              const isAlpha = /[a-zA-Z]/.test(char);
              const upperChar = char.toUpperCase();

              if (!isAlpha) {
                return (
                  <tr
                    key={i}
                    className="border-b border-zinc-800/50 text-zinc-600 animate-fade-in-row opacity-0"
                    style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'forwards' }}
                  >
                    <td className="py-3 px-4 text-zinc-500">{char === " " ? "SPASI" : char}</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4 text-right text-zinc-500">{char === " " ? "SPASI" : char}</td>
                    <td className="py-3 px-4 text-center">-</td>
                  </tr>
                );
              }

              // Kalkulasi Dekripsi
              const pos = upperChar.charCodeAt(0) - 65;
              const isNegativeWrap = (pos - shift) < 0; // Deteksi apakah hasilnya negatif
              const modResult = (pos - shift + 26) % 26;
              const resultChar = String.fromCharCode(modResult + 65);

              return (
                <tr
                  key={i}
                  className="border-b border-zinc-800/50 text-zinc-300 animate-fade-in-row opacity-0"
                  style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'forwards' }}
                >
                  <td className="py-3 px-4 text-white font-semibold">{upperChar}</td>
                  <td className="py-3 px-4">{pos}</td>
                  <td className="py-3 px-4 text-zinc-400">-{shift}</td>
                  <td className="py-3 px-4 text-zinc-400">({pos} - {shift} + 26) mod 26 = {modResult}</td>
                  <td className="py-3 px-4 text-right text-red-500 font-bold">{resultChar}</td>
                  <td className="py-3 px-4 text-center">
                    {/* Render badge kuning jika terjadi wrap negatif */}
                    {isNegativeWrap ? (
                      <span className="inline-block px-2 py-1 bg-amber-950/40 border border-amber-900/50 text-amber-500 text-[10px] rounded-full uppercase tracking-wider">
                        wrap negatif
                      </span>
                    ) : (
                      <span className="text-zinc-600">-</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer / Inverse Verified */}
      <div className="flex items-center gap-3 mt-2 bg-emerald-950/20 border border-emerald-900/30 text-emerald-500/90 px-4 py-3 rounded-xl">
        <CheckCircle2 size={20} className="shrink-0" />
        <div>
          <span className="font-semibold text-emerald-400 text-sm block mb-0.5">Inverse verified</span>
          <span className="text-xs opacity-80">Encrypt +{shift} lalu decrypt -{shift} mengembalikan setiap karakter ke indeks semula.</span>
        </div>
      </div>

    </div>
  );
}
