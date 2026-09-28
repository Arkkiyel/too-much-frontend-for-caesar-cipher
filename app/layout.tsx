import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 1. Import Navbar yang baru dibuat
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Caesar Cipher Platform",
  description: "Educational platform for cryptography",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>

        {/* 2. Taruh Navbar di atas children */}
        <Navbar />

        {/* 3. Anak-anak elemen (konten halaman) otomatis akan menyesuaikan */}
        {children}

      </body>
    </html>
  );
}
