"use client";

import { Play, CheckCircle2, Clock, AlertTriangle, ArrowDown } from "lucide-react";

export type TestState = "PENDING" | "PASS" | "MISMATCH";

export interface TestCaseData {
  id: string;
  title: string;
  description: string;
  type: "encrypt" | "decrypt";
  inputLabel: string;
  input: string;
  key: number;
  algorithm: string;
  expectedOutput: string;
}

interface TestCaseCardProps {
  data: TestCaseData;
  status: TestState;
  actualOutput: string;
  onRunTest: () => void;
}

export default function TestCaseCard({ data, status, actualOutput, onRunTest }: TestCaseCardProps) {

  // Konfigurasi warna berdasarkan status
  const statusConfig = {
    PENDING: { color: "text-amber-500", bg: "bg-amber-950/20", border: "border-amber-900/50", icon: Clock, text: "PENDING" },
    PASS: { color: "text-emerald-500", bg: "bg-emerald-950/20", border: "border-emerald-900/50", icon: CheckCircle2, text: "PASS" },
    MISMATCH: { color: "text-red-500", bg: "bg-red-950/20", border: "border-red-900/50", icon: AlertTriangle, text: "MISMATCH" },
  };

  const activeConfig = statusConfig[status];
  const Icon = activeConfig.icon;

  // Helper untuk merender panah kecil ke bawah
  const StepArrow = () => (
    <div className="flex justify-center py-1">
      <ArrowDown size={14} className="text-zinc-700" />
    </div>
  );

  return (
    <div className="bg-[#111111] border border-zinc-800 rounded-2xl p-6 flex flex-col h-full shadow-lg">

      {/* Card Header */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-emerald-500 font-mono font-bold">{data.id}</span>
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono font-medium tracking-wide ${activeConfig.color} ${activeConfig.border} ${activeConfig.bg}`}>
          <Icon size={14} />
          {activeConfig.text}
        </div>
      </div>

      <h3 className="text-white font-semibold text-base mb-1">{data.title}</h3>
      <p className="text-zinc-500 text-xs mb-5 h-8">{data.description}</p>

      {/* Run Button */}
      <button
        onClick={onRunTest}
        className="w-full flex items-center justify-center gap-2 bg-[#0a0a0a] hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 py-2.5 rounded-xl text-sm font-medium transition-colors mb-6"
      >
        <Play size={16} />
        Run Test
      </button>

      {/* Data Flow / Steps */}
      <div className="flex-1 flex flex-col space-y-1">

        {/* Input */}
        <div className="bg-[#0a0a0a] border border-zinc-800/80 rounded-lg p-3">
          <span className="text-[9px] text-zinc-600 font-medium block mb-1 uppercase tracking-wider">{data.inputLabel}</span>
          <p className="text-white font-mono text-xs">{data.input}</p>
        </div>
        <StepArrow />

        {/* Key */}
        <div className="bg-[#0a0a0a] border border-zinc-800/80 rounded-lg p-3">
          <span className="text-[9px] text-zinc-600 font-medium block mb-1 uppercase tracking-wider">KEY</span>
          <p className="text-white font-mono text-xs">{data.key}</p>
        </div>
        <StepArrow />

        {/* Algorithm */}
        <div className="bg-[#0a0a0a] border border-zinc-800/80 rounded-lg p-3">
          <span className="text-[9px] text-zinc-600 font-medium block mb-1 uppercase tracking-wider">ALGORITHM</span>
          <p className="text-white font-mono text-xs">{data.algorithm}</p>
        </div>
        <StepArrow />

        {/* Your Output */}
        <div className="bg-[#0a0a0a] border border-zinc-800/80 rounded-lg p-3">
          <span className="text-[9px] text-zinc-600 font-medium block mb-1 uppercase tracking-wider">YOUR OUTPUT</span>
          <p className="text-zinc-300 font-mono text-xs h-4">{actualOutput}</p>
        </div>
        <StepArrow />

        {/* Expected Output */}
        <div className="bg-[#0a0a0a] border border-zinc-800/80 rounded-lg p-3">
          <span className="text-[9px] text-zinc-600 font-medium block mb-1 uppercase tracking-wider">EXPECTED OUTPUT</span>
          <p className="text-white font-mono text-xs">{data.expectedOutput}</p>
        </div>
        <StepArrow />

        {/* Result Box */}
        <div className={`mt-2 border rounded-lg p-3 ${activeConfig.bg} ${activeConfig.border}`}>
          <span className={`text-[9px] font-medium block mb-1 uppercase tracking-wider ${activeConfig.color} opacity-80`}>RESULT</span>
          <div className={`flex items-center gap-1.5 font-mono text-xs ${activeConfig.color}`}>
            <Icon size={14} />
            {status === "PENDING" ? "Menunggu eksekusi" :
              status === "PASS" ? "PASS - Output matches expected" :
                "MISMATCH - Terdapat perbedaan output"}
          </div>
        </div>

      </div>
    </div>
  );
}
