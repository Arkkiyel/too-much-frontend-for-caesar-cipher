"use client";

import { AlertTriangle } from "lucide-react";

export default function SecurityHeader() {
  return (
    <div className="bg-amber-950/20 border border-amber-900/40 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-5 w-full shadow-[0_0_20px_rgba(245,158,11,0.05)]">

      {/* Icon Box */}
      <div className="p-3 bg-amber-950/40 rounded-xl border border-amber-900/50 shrink-0">
        <AlertTriangle className="text-amber-500" size={24} />
      </div>

      {/* Text Content */}
      <div>
        <h2 className="text-white font-bold text-lg md:text-xl">
          Demonstrasi Kelemahan: Brute Force Attack
        </h2>
        <p className="text-amber-500/70 text-sm mt-1 max-w-3xl leading-relaxed">
          Karena hanya memiliki 25 kemungkinan kunci, Caesar Cipher dapat dipecahkan tanpa mengetahui key aslinya.
        </p>
      </div>

    </div>
  );
}
