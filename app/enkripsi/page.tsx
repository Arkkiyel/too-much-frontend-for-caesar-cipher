"use client";

import { useState } from "react";
import EncryptionWorkspace from "@/components/enkripsi/EncryptionWorkspace";
import WheelVisualizer from "@/components/enkripsi/WheelVisualizer";
import TransformationTable from "@/components/enkripsi/TransformationTable";
import { encrypt } from "@/lib/caesar";

export default function EnkripsiPage() {
  const [plaintext, setPlaintext] = useState("HELLO WORLD");
  const [shift, setShift] = useState(3);
  const [hasEncrypted, setHasEncrypted] = useState(false);

  // Derivasi ciphertext secara langsung, atau jalankan hanya saat disubmit
  const ciphertext = encrypt(plaintext, shift);

  const handleEncrypt = () => {
    setHasEncrypted(true);
    // Tambahkan logika delay/loading buatan di sini jika ingin animasi
  };

  const handleReset = () => {
    setPlaintext("");
    setShift(3);
    setHasEncrypted(false);
  };

  return (
    <main className="min-h-screen bg-zinc-950 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6 space-y-6">

        {/* Header Halaman (Opsional, tergantung desain navigasi) */}
        <div>
          <h1 className="text-3xl font-bold text-white">Enkripsi</h1>
          <p className="text-zinc-400 mt-2">
            Transformasikan plaintext menjadi ciphertext dan audit setiap langkah pergeserannya.
          </p>
        </div>

        {/* 1. Input & Output Workspace */}
        <EncryptionWorkspace
          plaintext={plaintext}
          setPlaintext={setPlaintext}
          shift={shift}
          setShift={setShift}
          ciphertext={ciphertext}
          hasEncrypted={hasEncrypted}
          onEncrypt={handleEncrypt}
          onReset={handleReset}
        />

        {/* 2. Visualisasi Roda (Hanya tampil jika ada shift atau sudah enkripsi) */}
        <WheelVisualizer
          shift={shift}
          setShift={setShift}
          sampleChars={["A", "H"]} // Bisa diambil dari huruf pertama teks
        />

        {/* 3. Tabel Pemecahan (Hanya tampil setelah enkripsi sukses) */}
        {hasEncrypted && plaintext.length > 0 && (
          <TransformationTable
            plaintext={plaintext}
            shift={shift}
          />
        )}

      </div>
    </main>
  );
}
