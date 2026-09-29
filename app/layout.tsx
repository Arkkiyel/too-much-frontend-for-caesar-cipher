import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer"; // <-- 1. Import Footer ditambahkan

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "CaesarCipher — Interactive Playground",
  description:
    "Pelajari cara kerja sandi substitusi paling ikonik dalam sejarah secara interaktif.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={mono.variable}>
      {/* 2. Class ditambahkan: overflow-x-hidden (mencegah bocor) & flexbox (mendorong footer) */}
      <body className="bg-zinc-950 text-white antialiased overflow-x-hidden flex flex-col min-h-screen">

        <Navbar />

        {/* 3. flex-1 membuat area konten utama membesar, mendorong footer ke paling bawah */}
        <div className="flex-1">
          {children}
        </div>

        {/* 4. Footer dimunculkan di sini */}
        <Footer />

      </body>
    </html>
  );
}
