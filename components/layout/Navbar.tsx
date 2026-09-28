"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShieldAlert } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Mencegah scroll pada body saat sidebar mobile terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Enkripsi", href: "/enkripsi" },
    { name: "Dekripsi", href: "/dekripsi" },
    { name: "Test Cases", href: "/test-cases" },
  ];

  return (
    <>
      {/* Navbar Utama (Fixed di atas) */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg">
            <span className="text-red-600 font-mono">{'</>'}</span>
            CaesarCipher
          </Link>

          {/* Navigasi Desktop (Sembunyi di Mobile) */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}

            {/* Tombol Khusus Security Demo */}
            <Link
              href="/security-demo"
              className="flex items-center gap-2 text-sm text-amber-500 border border-amber-500/50 hover:bg-amber-950/30 px-3 py-1.5 rounded-md transition-colors"
            >
              <ShieldAlert size={14} />
              Security Demo
            </Link>
          </div>

          {/* Tombol Hamburger Mobile (Sembunyi di Desktop) */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden text-zinc-400 hover:text-white transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Overlay Gelap saat Sidebar terbuka */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Mobile */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-zinc-950 border-l border-zinc-800 z-[70] transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Header Sidebar */}
          <div className="flex justify-between items-center mb-8">
            <span className="text-white font-bold">Menu</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>

          {/* Link Navigasi Mobile */}
          <div className="flex flex-col gap-6 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)} // Tutup sidebar setelah diklik
                className="text-lg text-zinc-300 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}

            <div className="w-full h-px bg-zinc-800 my-2" />

            <Link
              href="/security-demo"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-lg text-amber-500 font-medium"
            >
              <ShieldAlert size={18} />
              Security Demo
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
