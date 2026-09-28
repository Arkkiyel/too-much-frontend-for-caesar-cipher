"use client";

import { Crosshair, Zap } from "lucide-react";

interface AttackWorkspaceProps {
  targetText: string;
  setTargetText: (text: string) => void;
  isAnalyzing: boolean;
  progress: number;
  onRunAttack: () => void;
}

export default function AttackWorkspace({
  targetText,
  setTargetText,
  isAnalyzing,
  progress,
  onRunAttack
}: AttackWorkspaceProps) {

  return (
    <div className="bg-[#111111] border border-zinc-800 rounded-2xl p-6 flex flex-col gap-5 w-full shadow-lg">

      {/* Header Panel */}
      <div>
        <h3 className="text-white font-semibold text-base">Ciphertext Attack Target</h3>
        <p className="text-zinc-500 text-xs mt-1">Uji semua pergeseran dari key 1 sampai key 25</p>
      </div>

      {/* Input & Action */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Input Target */}
        <div className="flex-1 flex items-center bg-[#0a0a0a] border border-zinc-800 rounded-xl px-4 py-1.5 focus-within:border-amber-500/50 focus-within:ring-1 focus-within:ring-amber-500/50 transition-all">
          <Crosshair size={16} className="text-amber-500 mr-3 shrink-0" />
          <input
            type="text"
            value={targetText}
            onChange={(e) => setTargetText(e.target.value.toUpperCase())}
            placeholder="Masukkan ciphertext..."
            disabled={isAnalyzing}
            className="w-full bg-transparent text-white font-mono text-sm py-2.5 focus:outline-none disabled:opacity-50 uppercase"
          />
        </div>

        {/* Attack Button */}
        <button
          onClick={onRunAttack}
          disabled={!targetText.trim() || isAnalyzing}
          className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-medium text-sm transition-colors shadow-[0_0_15px_rgba(217,119,6,0.2)] whitespace-nowrap shrink-0"
        >
          <Zap size={16} />
          {isAnalyzing ? "Menganalisis..." : "Jalankan Brute Force"}
        </button>
      </div>

      {/* Progress Bar Container */}
      <div className="space-y-2 mt-1">
        <div className="flex justify-between items-center text-[11px] font-medium">
          <span className="text-zinc-500">
            {isAnalyzing
              ? "Mengeksekusi iterasi kunci..."
              : "Siap mengeksekusi 25 kemungkinan iterasi kunci"}
          </span>
          <span className="text-amber-500 font-mono">
            {progress}% Selesai ({Math.floor((progress / 100) * 25)}/25)
          </span>
        </div>

        {/* Track */}
        <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
          {/* Fill */}
          <div
            className="h-full bg-amber-500 transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

    </div>
  );
}
