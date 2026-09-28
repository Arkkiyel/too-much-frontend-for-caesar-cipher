"use client";

import { useState } from "react";
import DecryptionWorkspace from "@/components/dekripsi/DecryptionWorkspace";
import ReverseTransformationTable from "@/components/dekripsi/ReverseTransformationTable";
import { decrypt } from "@/lib/caesar";

export default function DekripsiPage() {
  // Inisialisasi state dengan nilai default sesuai desain
  const [ciphertext, setCiphertext] = useState("KHOOR ZRUOG");
  const [shift, setShift] = useState(3);
  const [hasDecrypted, setHasDecrypted] = useState(false);

  // Derivasi plaintext secara otomatis menggunakan fungsi dari caesar.ts
  const plaintext = decrypt(ciphertext, shift);

  const handleDecrypt = () => {
    setHasDecrypted(true);
    // Anda bisa menambahkan efek loading atau animasi di sini jika diperlukan
  };

  const handleReset = () => {
    setCiphertext("");
    setShift(3);
    setHasDecrypted(false);
  };

  return (
    <main className="min-h-screen bg-zinc-950 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6 space-y-8">

        {/* Header Halaman */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dekripsi</h1>
          <p className="text-zinc-400 text-sm max-w-2xl">
            Balikkan pergeseran Caesar dan pulihkan pesan asli dengan key yang sama.
          </p>
        </div>

        {/* 1. Input & Output Workspace */}
        <DecryptionWorkspace
          ciphertext={ciphertext}
          setCiphertext={setCiphertext}
          shift={shift}
          setShift={setShift}
          plaintext={plaintext}
          hasDecrypted={hasDecrypted}
          onDecrypt={handleDecrypt}
          onReset={handleReset}
        />

        {/* 2. Tabel Pemecahan Reverse (Hanya tampil setelah dekripsi sukses) */}
        {hasDecrypted && ciphertext.trim().length > 0 && (
          <ReverseTransformationTable
            ciphertext={ciphertext}
            shift={shift}
          />
        )}

      </div>
    </main>
  );
}
