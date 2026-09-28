"use client";

import {
  LockKeyhole,
  RotateCcw,
  KeyRound,
  CheckCircle2,
  Minus,
  Plus
} from "lucide-react";

interface EncryptionWorkspaceProps {
  plaintext: string;
  setPlaintext: (text: string) => void;
  shift: number;
  setShift: (shift: number) => void;
  ciphertext: string;
  hasEncrypted: boolean;
  onEncrypt: () => void;
  onReset: () => void;
}

export default function EncryptionWorkspace({
  plaintext,
  setPlaintext,
  shift,
  setShift,
  ciphertext,
  hasEncrypted,
  onEncrypt,
  onReset,
}: EncryptionWorkspaceProps) {

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
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <h2 className="text-white font-semibold text-lg">Input</h2>
        </div>

        {/* Input Plaintext */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-medium text-zinc-500">
            <label>Plaintext</label>
            {/* Ubah batas tampilan counter ke 100 */}
            <span className={plaintext.length === 1000 ? "text-red-500" : ""}>
              {plaintext.length}/1000
            </span>
          </div>
          <textarea
            value={plaintext}
            onChange={(e) => setPlaintext(e.target.value.toUpperCase())}
            maxLength={1000} // Batasi secara fungsional ke 100 karakter
            rows={4}
            placeholder="Ketik teks di sini (maks 100 huruf)..."
            className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-xl p-4 text-white font-mono text-sm focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all resize-none"
          />
        </div>
        {/* Input Key (Shift) */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-zinc-500 block">
            Key (Shift N)
          </label>
          <div className="flex items-center gap-3">
            {/* Custom Number Input */}
            <div className="flex-1 flex items-center justify-between bg-[#0a0a0a] border border-zinc-800 rounded-xl p-2 px-4">
              <div className="flex items-center gap-3 text-red-500">
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
          <p className="text-[10px] text-zinc-600">Gunakan rentang 1..25.</p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 pt-2">
          <button
            onClick={onEncrypt}
            disabled={!plaintext.trim()}
            className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-4 rounded-xl font-medium transition-colors shadow-[0_0_15px_rgba(220,38,38,0.2)]"
          >
            <LockKeyhole size={18} />
            Enkripsi Sekarang
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-3 text-zinc-400 hover:text-white transition-colors"
          >
            <RotateCcw size={18} />
            <span className="text-sm font-medium">Reset</span>
          </button>
        </div>

        {/* Status Alert Kiri (Muncul jika berhasil) */}
        {hasEncrypted && (
          <div className="flex items-center gap-2 bg-emerald-950/30 border border-emerald-900/50 text-emerald-500 px-4 py-3 rounded-xl text-sm font-medium">
            <CheckCircle2 size={16} />
            Berhasil menggeser +{shift} posisi
          </div>
        )}
      </div>


      {/* =======================
          PANEL KANAN: OUTPUT
      ======================= */}
      <div className="bg-[#111111] border border-zinc-800 rounded-2xl p-6 flex flex-col gap-6">

        {/* Header Output */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          <h2 className="text-white font-semibold text-lg">Output</h2>
        </div>

        {/* Ciphertext Box */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-zinc-500 block">
            Ciphertext
          </label>
          <div className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-xl p-4 min-h-[110px]">
            <span className="text-[10px] text-zinc-600 font-medium block mb-2">
              ENCRYPTED OUTPUT
            </span>
            <p className="text-red-500 font-mono text-sm break-all">
              {hasEncrypted ? ciphertext : "-"}
            </p>
          </div>
        </div>

        {/* Status & Formula Box */}
        {hasEncrypted && (
          <div className="space-y-4 pt-2">

            {/* Status */}
            <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-4">
              <span className="text-[10px] text-zinc-600 font-medium block mb-1">
                STATUS
              </span>
              <p className="text-emerald-500 text-sm font-medium">
                Enkripsi Berhasil
              </p>
            </div>

            {/* Formula */}
            <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-4">
              <span className="text-[10px] text-zinc-600 font-medium block mb-1">
                FORMULA
              </span>
              <p className="text-red-500 text-sm font-mono">
                C = (P + {shift}) mod 26
              </p>
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
