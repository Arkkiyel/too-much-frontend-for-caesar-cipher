"use client";

import { CheckCircle2 } from "lucide-react";

export interface BruteForceResult {
  key: number;
  result: string;
  isMatch: boolean;
}

interface BruteForceTableProps {
  results: BruteForceResult[];
}

export default function BruteForceTable({ results }: BruteForceTableProps) {

  return (
    <div className="bg-[#111111] border border-zinc-800 rounded-2xl p-6 flex flex-col gap-4 w-full">

      {/* Header Tabel */}
      <div>
        <h2 className="text-white font-semibold text-lg">Hasil Dekripsi Seluruh Ruang Kunci</h2>
        <p className="text-xs text-zinc-500 mt-1">25 iterasi diurutkan berdasarkan key dekripsi.</p>
      </div>

      {/* Kontainer Scrollable */}
      <div className="overflow-y-auto overflow-x-auto max-h-[500px] relative rounded-xl border border-zinc-800/50 shadow-inner custom-scrollbar mt-2">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead className="sticky top-0 bg-[#111111] z-10 shadow-md">
            <tr className="border-b border-zinc-800 text-zinc-500 text-[10px] uppercase tracking-wider font-medium">
              <th className="py-4 px-6 font-normal w-24">KEY</th>
              <th className="py-4 px-6 font-normal">HASIL DEKRIPSI</th>
              <th className="py-4 px-6 font-normal w-72">ANALISIS</th>
            </tr>
          </thead>
          <tbody className="text-sm font-mono">
            {results.length === 0 ? (
              /* State Kosong (Belum dijalankan) */
              <tr>
                <td colSpan={3} className="py-12 text-center text-zinc-600 text-xs">
                  Tekan "Jalankan Brute Force" untuk melihat 25 kemungkinan.
                </td>
              </tr>
            ) : (
              /* Mapping Hasil */
              results.map((row) => {
                const isMatch = row.isMatch;

                return (
                  <tr
                    key={row.key}
                    className={`border-b border-zinc-800/50 transition-colors
                      ${isMatch ? "bg-emerald-950/20" : "hover:bg-zinc-900/50"}
                    `}
                  >
                    {/* Kolom Key */}
                    <td className="py-3 px-6">
                      <span className="text-amber-500 font-medium text-xs">KEY {row.key}</span>
                    </td>

                    {/* Kolom Hasil Dekripsi */}
                    <td className={`py-3 px-6 ${isMatch ? "text-white font-bold" : "text-zinc-500"}`}>
                      {row.result}
                    </td>

                    {/* Kolom Analisis (Badge Kamus) */}
                    <td className="py-3 px-6">
                      {isMatch ? (
                        <div className="inline-flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-900/50 text-emerald-500 text-[10px] px-2.5 py-1 rounded-full whitespace-nowrap">
                          <CheckCircle2 size={12} />
                          Kemungkinan Jawaban Benar (Matches Dictionary)
                        </div>
                      ) : (
                        <span className="text-zinc-600 text-[10px]">
                          Tidak cocok dengan kamus
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="flex justify-center mt-2">
        <span className="text-[10px] text-zinc-600 font-mono tracking-wide">
          Menampilkan {results.length} / 25 hasil
        </span>
      </div>

    </div>
  );
}
