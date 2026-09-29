"use client";

import { useState } from "react";

const encryptSteps = [
  { icon: "T", label: "Input Plaintext", desc: "Masukkan teks asli yang ingin dienkripsi" },
  { icon: "12", label: "Ubah ke Angka", desc: "Setiap huruf dikonversi ke posisi alfabet (A=0, B=1, …)" },
  { icon: "+n", label: "Tambahkan Key", desc: "Posisi huruf dijumlahkan dengan nilai kunci n" },
  { icon: "%26", label: "Modulo 26", desc: "Hasil dibungkus kembali ke rentang 0–25" },
  { icon: "AB", label: "Ubah ke Huruf", desc: "Angka dikonversi kembali menjadi huruf alfabet" },
  { icon: "AB", label: "Ciphertext", desc: "Teks terenkripsi siap dikirim", highlight: true },
];

const decryptSteps = [
  { icon: "AB", label: "Input Ciphertext", desc: "Masukkan teks terenkripsi yang diterima" },
  { icon: "12", label: "Ubah ke Angka", desc: "Setiap huruf cipher dikonversi ke posisi alfabet" },
  { icon: "−n", label: "Kurangi Key", desc: "Posisi huruf dikurangi dengan nilai kunci n" },
  { icon: "%26", label: "Modulo 26", desc: "Hasil dibungkus kembali ke rentang 0–25" },
  { icon: "AB", label: "Ubah ke Huruf", desc: "Angka dikonversi kembali menjadi huruf alfabet" },
  { icon: "T", label: "Plaintext", desc: "Teks asli berhasil dipulihkan", highlight: true },
];

export default function FlowchartSection() {
  const [mode, setMode] = useState<"enkripsi" | "dekripsi">("enkripsi");
  const steps = mode === "enkripsi" ? encryptSteps : decryptSteps;

  return (
    <section className="bg-zinc-900 border-y border-zinc-800 py-16">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Flowchart Proses {mode === "enkripsi" ? "Enkripsi" : "Dekripsi"}
            </h2>
            <p className="text-zinc-400 text-sm mt-1">
              {/* Deskripsi disamakan menjadi enam tahap karena sekarang jumlah kotaknya sama */}
              Dari pesan terbaca menjadi ciphertext dalam enam tahap deterministik.
            </p>
          </div>

          {/* Button Toggle */}
          <button
            onClick={() => setMode((m) => (m === "enkripsi" ? "dekripsi" : "enkripsi"))}
            className="flex items-center gap-3 text-sm font-medium transition-colors focus:outline-none"
          >
            <span className={mode === "enkripsi" ? "text-white" : "text-zinc-500"}>
              Enkripsi
            </span>

            {/* Kontainer Toggle */}
            <span
              className={`flex items-center w-11 h-6 rounded-full p-1 transition-colors duration-300 ${mode === "dekripsi" ? "bg-red-600" : "bg-zinc-700"
                }`}
            >
              <span
                className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${mode === "dekripsi" ? "translate-x-5" : "translate-x-0"
                  }`}
              />
            </span>

            <span className={mode === "dekripsi" ? "text-white" : "text-zinc-500"}>
              Dekripsi
            </span>
          </button>
        </div>

        {/* Steps */}
        <div className="w-full overflow-x-auto pb-6 scrollbar-hide">
          {/* Karena keduanya 6 kotak, kita kunci di grid-cols-6 */}
          <div className="grid grid-cols-6 gap-0 w-full min-w-[768px] md:min-w-full">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center">
                {/* Kotak step */}
                <div className="group relative flex-1">
                  <div
                    className={`flex flex-col items-center justify-center text-center px-2 py-5 h-24 border transition-colors cursor-default
                      ${step.highlight
                        ? "border-red-600 bg-red-950/40"
                        : "border-zinc-700 bg-zinc-950 hover:border-zinc-500"
                      }
                      ${i === 0 ? "rounded-l" : ""}
                      ${i === steps.length - 1 ? "rounded-r" : ""}
                    `}
                  >
                    <span className="text-red-400 font-mono text-xs font-bold">{step.icon}</span>
                    <span className="text-white text-xs mt-1.5 leading-tight">{step.label}</span>
                  </div>

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 bg-zinc-800 border border-zinc-700 rounded px-2 py-1.5 text-xs text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 text-center">
                    {step.desc}
                  </div>
                </div>

                {/* Panah antar kotak */}
                {i < steps.length - 1 && (
                  <span className="text-zinc-600 text-sm px-1 shrink-0">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <p className="text-zinc-500 text-xs mt-5 border-l-2 border-zinc-700 pl-3">
          Tip: Modulo 26 memastikan pergeseran setelah Z kembali ke A — inilah mekanisme wrap-around.
        </p>
      </div>
    </section>
  );
}
