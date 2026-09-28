"use client";

import { Info } from "lucide-react";

interface TransformationTableProps {
  plaintext: string;
  shift: number;
}

export default function TransformationTable({ plaintext, shift }: TransformationTableProps) {
  // Input sudah dibatasi 100 dari Workspace, jadi langsung proses semua
  const chars = plaintext.split("");

  return (
    <div className="bg-[#111111] border border-zinc-800 rounded-2xl p-6 flex flex-col gap-4 w-full">

      {/* Header Tabel */}
      <div>
        <h2 className="text-white font-semibold text-lg">Tabel Transformasi Per-Karakter</h2>
        <p className="text-xs text-zinc-500 mt-1">Sequential row reveal · stagger 40ms</p>
      </div>

      {/* Kontainer Scrollable: Tinggi maksimal dikurangi menjadi 250px */}
      <div className="overflow-y-auto overflow-x-auto max-h-[250px] relative rounded-xl border border-zinc-800/50 shadow-inner scroll-smooth">

        <table className="w-full text-left border-collapse min-w-[600px]">

          <thead className="sticky top-0 bg-[#111111] z-10 shadow-md">
            <tr className="border-b border-zinc-800 text-zinc-500 text-xs font-medium">
              <th className="py-4 px-4 font-normal">Huruf Asli</th>
              <th className="py-4 px-4 font-normal">Posisi 0-25</th>
              <th className="py-4 px-4 font-normal">Plus Shift</th>
              <th className="py-4 px-4 font-normal">Perhitungan Modulo 26</th>
              <th className="py-4 px-4 font-normal text-right">Huruf Hasil</th>
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
                  </tr>
                );
              }

              const pos = upperChar.charCodeAt(0) - 65;
              const modResult = (pos + shift) % 26;
              const resultChar = String.fromCharCode(modResult + 65);

              return (
                <tr
                  key={i}
                  className="border-b border-zinc-800/50 text-zinc-300 animate-fade-in-row opacity-0"
                  style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'forwards' }}
                >
                  <td className="py-3 px-4 text-white font-semibold">{upperChar}</td>
                  <td className="py-3 px-4">{pos}</td>
                  <td className="py-3 px-4 text-zinc-400">+{shift}</td>
                  <td className="py-3 px-4 text-zinc-400">({pos} + {shift}) mod 26 = {modResult}</td>
                  <td className="py-3 px-4 text-right text-red-500 font-bold">{resultChar}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-2 text-[11px] text-zinc-500 mt-2">
        <Info size={14} className="text-red-800 shrink-0" />
        <p>Spasi dipertahankan tanpa transformasi. Harga wrap-around modulo otomatis saat posisi + key &gt; 25.</p>
      </div>

    </div>
  );
}
