"use client";

import { useState } from "react";
import { Play, CheckCircle2, RotateCcw, Shuffle } from "lucide-react";
import TestCaseCard, { TestCaseData, TestState } from "@/components/test-cases/TestCaseCard";
import { encrypt, decrypt } from "@/lib/caesar";

// Data awal (Default)
const INITIAL_TEST_CASES: TestCaseData[] = [
  {
    id: "01",
    title: "Uji Enkripsi Kalimat Standar dengan Spasi",
    description: "Memastikan spasi dipertahankan pada pesan multi-kata.",
    type: "encrypt",
    inputLabel: "INPUT (PLAINTEXT)",
    input: "ATTACK AT DAWN",
    key: 4,
    algorithm: "Caesar Encrypt · C = (P + K) mod 26",
    expectedOutput: "EXXEGO EX HEAR",
  },
  {
    id: "02",
    title: "Uji Alfabet Wrap-Around",
    description: "X/Y/Z harus kembali ke awal alfabet tanpa overflow.",
    type: "encrypt",
    inputLabel: "INPUT (PLAINTEXT)",
    input: "XYZ ABC",
    key: 5,
    algorithm: "Caesar Encrypt · C = (P + K) mod 26",
    expectedOutput: "CDE FGH",
  },
  {
    id: "03",
    title: "Uji Dekripsi Inverse Matrix",
    description: "Reverse shift wajib memulihkan pesan sumber tepat.",
    type: "decrypt",
    inputLabel: "INPUT (CIPHERTEXT)",
    input: "KHOOR ZRUOG",
    key: 3,
    algorithm: "Caesar Decrypt · P = (C - K) mod 26",
    expectedOutput: "HELLO WORLD",
  }
];

// Helper untuk menghasilkan teks acak
const generateRandomString = (length: number) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join("");
};

export default function TestCasesPage() {
  const [testCases, setTestCases] = useState<TestCaseData[]>(INITIAL_TEST_CASES);
  const [results, setResults] = useState<Record<string, { status: TestState; output: string }>>(
    INITIAL_TEST_CASES.reduce((acc, test) => ({ ...acc, [test.id]: { status: "PENDING", output: "" } }), {})
  );

  // 1. Fungsi Menjalankan 1 Test
  const runSingleTest = (test: TestCaseData) => {
    const actualOutput = test.type === "encrypt"
      ? encrypt(test.input, test.key)
      : decrypt(test.input, test.key);

    setResults(prev => ({
      ...prev,
      [test.id]: {
        status: actualOutput === test.expectedOutput ? "PASS" : "MISMATCH",
        output: actualOutput
      }
    }));
  };

  // 2. Fungsi Menjalankan Semua Test
  const runAllTests = () => {
    testCases.forEach(runSingleTest);
  };

  // 3. Fungsi Reset Status ke PENDING
  const handleReset = () => {
    setResults(
      testCases.reduce((acc, test) => ({ ...acc, [test.id]: { status: "PENDING", output: "" } }), {})
    );
  };

  // 4. Fungsi Acak Data (Randomize)
  const handleRandomize = () => {
    const newTestCases = testCases.map(test => {
      const newKey = Math.floor(Math.random() * 25) + 1; // Key acak 1-25

      if (test.id === "01") {
        const newInput = `${generateRandomString(5)} ${generateRandomString(4)} ${generateRandomString(3)}`;
        return { ...test, input: newInput, key: newKey, expectedOutput: encrypt(newInput, newKey) };
      }
      else if (test.id === "02") {
        // Fokus pada huruf akhir alfabet untuk menguji wrap-around
        const wrapChars = ["X", "Y", "Z", "V", "W"];
        const newInput = Array.from({ length: 6 }, () => wrapChars[Math.floor(Math.random() * wrapChars.length)]).join("");
        return { ...test, input: newInput, key: newKey, expectedOutput: encrypt(newInput, newKey) };
      }
      else {
        // Dekripsi: Kita buat plaintext acak, lalu enkripsi untuk dijadikan soal input (ciphertext)
        const expectedPlaintext = `${generateRandomString(6)} ${generateRandomString(5)}`;
        const generatedCiphertext = encrypt(expectedPlaintext, newKey);
        return { ...test, input: generatedCiphertext, key: newKey, expectedOutput: expectedPlaintext };
      }
    });

    setTestCases(newTestCases);
    // Reset status otomatis saat data diacak
    setResults(newTestCases.reduce((acc, test) => ({ ...acc, [test.id]: { status: "PENDING", output: "" } }), {}));
  };

  // Kalkulasi Summary
  const totalTests = testCases.length;
  const passedTests = Object.values(results).filter(r => r.status === "PASS").length;
  const isAllPassed = passedTests === totalTests && passedTests > 0;

  return (
    <main className="min-h-screen bg-zinc-950 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6 space-y-8">

        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Test Cases</h1>
          <p className="text-zinc-400 text-sm max-w-2xl">
            Validasi skenario standar, batas wrap-around, dan inversi dekripsi dalam satu quality gate.
          </p>
        </div>

        {/* Summary Bar */}
        <div className="bg-[#111111] border border-zinc-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`px-3 py-1 rounded-full text-xs font-bold font-mono border ${isAllPassed ? 'bg-emerald-950/40 text-emerald-500 border-emerald-900/50' : 'bg-zinc-900 text-zinc-500 border-zinc-800'}`}>
              <CheckCircle2 size={14} className="inline mr-1 -mt-0.5" />
              {passedTests}/{totalTests} PASS
            </div>
            <p className="text-zinc-400 text-sm hidden sm:block">
              {isAllPassed ? "Semua expected output cocok dengan actual output." : "Menunggu eksekusi tes atau terdapat mismatch."}
            </p>
          </div>

          {/* Action Buttons Group */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={handleReset}
              title="Reset Status"
              className="p-2.5 bg-[#0a0a0a] hover:bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 rounded-xl transition-colors"
            >
              <RotateCcw size={18} />
            </button>
            <button
              onClick={handleRandomize}
              title="Acak Input & Key"
              className="p-2.5 bg-[#0a0a0a] hover:bg-zinc-900 text-zinc-400 hover:text-amber-500 border border-zinc-800 rounded-xl transition-colors"
            >
              <Shuffle size={18} />
            </button>
            <button
              onClick={runAllTests}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-[0_0_15px_rgba(220,38,38,0.2)]"
            >
              <Play size={16} />
              Jalankan Semua Test
            </button>
          </div>
        </div>

        {/* Test Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testCases.map(test => (
            <TestCaseCard
              key={test.id}
              data={test}
              status={results[test.id].status}
              actualOutput={results[test.id].output}
              onRunTest={() => runSingleTest(test)}
            />
          ))}
        </div>

        {/* Legend / State Convention */}
        <div className="bg-[#111111] border border-zinc-800 rounded-2xl p-5 mt-4">
          <div className="flex justify-between items-center mb-4 border-b border-zinc-800/50 pb-3">
            <h4 className="text-white font-medium text-sm">State & Diff Convention</h4>
            <span className="text-zinc-600 text-[10px] font-mono tracking-wide">test cards / sequential reveal 80ms</span>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 bg-[#0a0a0a] border border-emerald-900/30 rounded-lg p-3">
              <span className="bg-emerald-950/40 border border-emerald-900/50 text-emerald-500 text-[10px] font-mono px-2 py-0.5 rounded">PASS</span>
              <span className="text-zinc-400 text-xs">Expected = Actual</span>
            </div>
            <div className="flex items-center gap-3 bg-[#0a0a0a] border border-amber-900/30 rounded-lg p-3">
              <span className="bg-amber-950/40 border border-amber-900/50 text-amber-500 text-[10px] font-mono px-2 py-0.5 rounded">PENDING</span>
              <span className="text-zinc-400 text-xs">Menunggu eksekusi</span>
            </div>
            <div className="flex items-center gap-3 bg-[#0a0a0a] border border-red-900/30 rounded-lg p-3">
              <span className="bg-red-950/40 border border-red-900/50 text-red-500 text-[10px] font-mono px-2 py-0.5 rounded">MISMATCH</span>
              <span className="text-zinc-400 text-xs">Diff highlight kuning pada karakter berbeda</span>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
