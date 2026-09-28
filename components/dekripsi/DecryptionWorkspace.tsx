"use client";

import {
  Unlock,
  RotateCcw,
  KeyRound,
  CheckCircle2,
  Minus,
  Plus,
  Info
} from "lucide-react";

interface DecryptionWorkspaceProps {
  ciphertext: string;
  setCiphertext: (text: string) => void;
  shift: number;
  setShift: (shift: number) => void;
  plaintext: string;
  hasDecrypted: boolean;
  onDecrypt: () => void;
  onReset: () => void;
}

export default function DecryptionWorkspace({
  ciphertext,
  setCiphertext,
  shift,
  setShift,
  plaintext,
  hasDecrypted,
  onDecrypt,
  onReset,
}: DecryptionWorkspaceProps) {

  // Handler untuk tombol + dan - pada Shift/Key
  const decrementShift = () => setShift(Math.max(1, shift - 1));
  const incrementShift = () => setShift(Math.min(25, shift + 1));

  return (
    <div className="grid md:grid-cols-2 gap-6 w-full">

      {/* =======================
          PANEL KIRI: INPUT
      ======================= */}
      <div className="bg-[#111111] border border-zinc-800 rounded-2xl p-6 flex flex-col gap-6">

        {/* Header Input */}
        <div className="flex items-center gap-2">
          {/* Titik oranye/kuning sesuai desain */}
          <div className="w-2 h-2 rounded-full bg-amber-500"></div>
          <h2 className="text-white font-semibold text-lg">Input</h2>
        </div>

        {/* Input Ciphertext */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-medium text-zinc-500">
            <label>Ciphertext</label>
            <span className={ciphertext.length === 1000 ? "text-amber-500" : ""}>
              {ciphertext.length}/1000
            </span>
          </div>
          <textarea
            value={ciphertext}
            onChange={(e) => setCiphertext(e.target.value.toUpperCase())}
            maxLength={1000}
            rows={4}
            placeholder="Masukkan teks terenkripsi..."
            className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-xl p-4 text-white font-mono text-sm focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all resize-none"
          />
        </div>

        {/* Input Key (Shift) */}
        <div className="space-y-2">
          <label className="flex items-center gap-1 text-xs font-medium text-zinc-500">
            Key (Shift N) Dekripsi
            <Info size={12} className="text-zinc-600 cursor-help" />
          </label>
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center justify-between bg-[#0a0a0a] border border-zinc-800 rounded-xl p-2 px-4">
              <div className="flex items-center gap-3 text-amber-500">
                <KeyRound size={16} />
                <span className="font-mono font-medium">{shift}</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={decrementShift}
                  className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
                >
                  <Minus size={14} />
                </button>
                <button
                  onClick={incrementShift}
                  className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 pt-2">
          <button
            onClick={onDecrypt}
            disabled={!ciphertext.trim()}
            className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-4 rounded-xl font-medium transition-colors shadow-[0_0_15px_rgba(220,38,38,0.2)]"
          >
            {/* Menggunakan ikon Unlock untuk dekripsi */}
            <Unlock size={18} />
            Dekripsi Sekarang
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-3 text-zinc-400 hover:text-white transition-colors"
          >
            <RotateCcw size={18} />
            <span className="text-sm font-medium">Reset</span>
          </button>
        </div>

        {/* Mockup Error Slots Konteks Ciphertext */}
        <div className="space-y-2 pt-2 border-t border-zinc-800/50">
          <p className="text-[10px] font-medium text-zinc-600 uppercase tracking-wider">Error Slots Konteks Ciphertext</p>
          <div className="flex flex-wrap gap-2">
            {["Ciphertext kosong", "Key kosong", "Key invalid", "Karakter tidak didukung"].map((err) => (
              <span key={err} className="px-3 py-1 rounded-full bg-[#0a0a0a] border border-zinc-800 text-[10px] text-zinc-500">
                {err}
              </span>
            ))}
          </div>
        </div>
      </div>


      {/* =======================
          PANEL KANAN: OUTPUT
      ======================= */}
      <div className="bg-[#111111] border border-zinc-800 rounded-2xl p-6 flex flex-col gap-6">

        {/* Header Output */}
        <div className="flex items-center gap-2">
          {/* Titik hijau sesuai desain */}
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          <h2 className="text-white font-semibold text-lg">Output</h2>
        </div>

        {/* Plaintext Box */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-zinc-500 block">
            Plaintext
          </label>
          <div className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-xl p-4 min-h-[110px]">
            <span className="text-[10px] text-zinc-600 font-medium block mb-2 uppercase">
              Decrypted Output
            </span>
            {/* Teks plaintext berwarna putih untuk dekripsi */}
            <p className="text-white font-mono text-sm break-all">
              {hasDecrypted ? plaintext : "-"}
            </p>
          </div>
        </div>

        {/* Status & Formula Box */}
        {hasDecrypted && (
          <div className="space-y-4 pt-2">

            {/* Status */}
            <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-4">
              <span className="text-[10px] text-zinc-600 font-medium block mb-1">
                STATUS
              </span>
              <p className="text-emerald-500 text-sm font-medium">
                Dekripsi Berhasil
              </p>
            </div>

            {/* Formula Pembalikan (Reverse Shift) */}
            <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-4">
              <span className="text-[10px] text-zinc-600 font-medium block mb-1">
                FORMULA
              </span>
              <p className="text-red-500 text-sm font-mono">
                P = (C - {shift} + 26) mod 26
              </p>
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
