"use client";

import { useState } from "react";
import SecurityHeader from "@/components/security/SecurityHeader";
import AttackWorkspace from "@/components/security/AttackWorkspace";
import BruteForceTable, { BruteForceResult } from "@/components/security/BruteForceTable";
import LessonFooter from "@/components/security/LessonFooter";
import { bruteForce } from "@/lib/caesar";

// 1. Impor kamus raksasa Anda
import { CUSTOM_DICTIONARY } from "@/lib/dictionary";

export default function SecurityDemoPage() {
  const [targetText, setTargetText] = useState("KHOOR ZRUOG");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<BruteForceResult[]>([]);

  // 2. Fungsi Eksekusi Brute Force dengan Animasi
  const handleRunAttack = () => {
    setIsAnalyzing(true);
    setProgress(0);
    setResults([]); // Bersihkan hasil sebelumnya

    let currentProgress = 0;

    // Simulasikan delay iterasi agar UI progress bar terlihat bergerak
    const interval = setInterval(() => {
      currentProgress += 4; // Naik 4% setiap tick
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        processResults(); // Panggil analisis asli setelah progress penuh
      }
    }, 30); // Berjalan setiap 30ms (total animasi ~750ms)
  };

  // 3. Fungsi Logika Skor Kamus
  const processResults = () => {
    const rawData = bruteForce(targetText);

    const scoredData = rawData.map(item => {
      const words = item.result.split(" ");
      let score = 0;

      words.forEach(word => {
        const cleanWord = word.replace(/[^A-Z]/g, "");

        // 2. Gunakan kamus yang diimpor di sini
        if (CUSTOM_DICTIONARY.has(cleanWord)) score++;
      });

      return { key: item.shift, result: item.result, score: score };
    });

    const maxScore = Math.max(...scoredData.map(d => d.score));

    const finalResults: BruteForceResult[] = scoredData.map(item => ({
      key: item.key,
      result: item.result,
      isMatch: item.score === maxScore && item.score > 0
    }));

    setResults(finalResults);
    setIsAnalyzing(false);
  };
  return (
    // 1. Tambahkan efek radial gradient dengan tema Amber/Oranye gelap untuk Security Demo
    <main className="min-h-screen bg-gradient-to-b from-red-950/80 via-zinc-950 to-black pt-24 pb-20">
      {/* 2. SEMUA konten dipastikan masuk ke dalam pembungkus (wrapper) ini */}
      <div className="max-w-6xl mx-auto px-6 space-y-8">

        {/* Header Halaman SEKARANG ADA DI DALAM wrapper */}
        <div>
          <h1 className="text-3xl font-bold text-white">Security Demo</h1>
          <p className="text-zinc-400 mt-2 text-sm max-w-2xl">
            Ekspos kelemahan ruang kunci Caesar Cipher dengan mencoba seluruh kemungkinan secara instan.
          </p>
        </div>

        {/* Banner Peringatan Atas */}
        <SecurityHeader />

        {/* Panel Kendali Input & Progress */}
        <AttackWorkspace
          targetText={targetText}
          setTargetText={setTargetText}
          isAnalyzing={isAnalyzing}
          progress={progress}
          onRunAttack={handleRunAttack}
        />

        {/* Tabel 25 Iterasi */}
        <BruteForceTable results={results} />

        {/* Pelajaran Penutup */}
        <LessonFooter />

      </div>
    </main>
  );
}
