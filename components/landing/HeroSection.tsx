"use client";

import { useState } from "react";
import CipherWheel from "@/components/ui/CipherWheel";
import Button from "@/components/ui/Button";
import { encrypt } from "@/lib/caesar";

const DEFAULT_TEXT = "HELLO";
const DEFAULT_SHIFT = 3;

export default function HeroSection() {
  const [shift, setShift] = useState(DEFAULT_SHIFT);
  const ciphertext = encrypt(DEFAULT_TEXT, shift);

  return (
    <section className="relative min-h-screen flex items-center pt-14 bg-zinc-950 overflow-hidden">
      {/* Gradien merah di sudut kanan atas */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, #dc2626 0%, #7f1d1d 40%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-16 py-20 items-center">
        {/* Teks kiri */}
        <div className="space-y-6">
          <h1 className="text-5xl font-bold leading-tight">
            <span className="text-red-500">Caesar Cipher</span>
            <br />
            <span className="text-white">Interactive Playground</span>
          </h1>
          <p className="text-zinc-400 text-base leading-relaxed max-w-sm">
            Pelajari cara kerja sandi substitusi paling ikonik dalam sejarah.
            Geser alfabet, lihat transformasi setiap karakter, dan uji sendiri
            kelemahannya secara interaktif.
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <Button href="/enkripsi" variant="solid">
              Coba Enkripsi Sekarang
            </Button>
            <Button href="/#about" variant="outline">
              Pelajari Materi
            </Button>
          </div>
        </div>

        {/* Visualisasi kanan */}
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <CipherWheel
              shift={shift}
              onChangeShift={setShift} // <--- Wajib tambahkan ini!
            />
          </div>

          {/* Slider shift */}
          <div className="w-full max-w-xs space-y-2">
            <div className="flex justify-between text-xs text-zinc-500">
              <span>Shift</span>
              <span className="text-red-400 font-mono">+{shift}</span>
            </div>
            <input
              type="range"
              min={1}
              max={25}
              value={shift}
              onChange={(e) => setShift(Number(e.target.value))}
              className="w-full accent-red-500"
            />
          </div>

          {/* Preview enkripsi — border dengan red glow sesuai desain */}
          <div
            className="w-full max-w-xs rounded px-4 py-3 flex items-center justify-between text-sm font-mono"
            style={{
              background: "#111111",
              border: "1px solid #3f3f46",
              boxShadow: "0 0 0 1px #7f1d1d, 0 0 12px 2px rgba(220,38,38,0.25)",
            }}
          >
            <div>
              <span className="text-zinc-500 text-xs block mb-0.5">PLAINTEXT</span>
              <span className="text-white font-bold">{DEFAULT_TEXT}</span>
            </div>
            <span className="text-red-500 text-lg">→</span>
            <div className="text-right">
              <span className="text-zinc-500 text-xs block mb-0.5">SHIFT +{shift}</span>
              <span className="text-red-400 font-bold">{ciphertext}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
