"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LockKeyholeIcon,
  UnlockIcon,
  PenLineIcon,
  TriangleAlertIcon,
  Menu,
  X
} from "lucide-react";
import Button from "@/components/ui/Button";

// Array navigasi dengan ikon
const navLinks = [
  { label: "Enkripsi", href: "/enkripsi", icon: LockKeyholeIcon },
  { label: "Dekripsi", href: "/dekripsi", icon: UnlockIcon },
  { label: "Test Cases", href: "/test-cases", icon: PenLineIcon },
  { label: "Security Demo", href: "/security-demo", icon: TriangleAlertIcon },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Mencegah scroll pada halaman di belakang saat sidebar terbuka
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

  return (
    <>
      {/* NAVBAR UTAMA (Desktop & Mobile Header) */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center gap-8">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-base font-bold text-red-500 shrink-0"
          >
            {/* Kotak merah gelap di belakang ikon logo */}
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-950/40 border border-red-900/50">
              <LockKeyholeIcon size={16} />
            </div>
            CaesarCipher
          </Link>

          {/* Nav links Desktop (Sembunyi di Mobile) */}
          <ul className="hidden md:flex items-center gap-2 flex-1 justify-center">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              const Icon = link.icon;

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300
                      ${active
                        ? "bg-[#111111] text-white border border-red-500/50 shadow-[0_0_15px_rgba(220,38,38,0.2)]"
                        : "text-zinc-500 hover:text-zinc-300"
                      }
                    `}
                  >
                    <Icon
                      size={16}
                      className={active ? "text-red-500" : "text-zinc-600"}
                    />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA & Hamburger Button */}
          <div className="ml-auto flex items-center gap-4">
            {/* Tombol CTA (Sembunyi di Mobile, pindah ke dalam sidebar) */}
            <div className="hidden md:block">
              <Button href="/enkripsi" variant="solid">
                Mulai Eksperimen →
              </Button>
            </div>

            {/* Tombol Hamburger (Muncul HANYA di Mobile) */}
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden p-1 text-zinc-400 hover:text-white transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </nav>
      </header>

      {/* =========================================
          MOBILE SIDEBAR SECTION 
          ========================================= */}

      {/* Overlay Gelap */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-zinc-950 border-l border-zinc-800 z-[70] transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Header Sidebar */}
        <div className="h-16 px-6 flex justify-between items-center border-b border-zinc-800/50">
          <span className="text-white font-bold text-sm">Navigasi</span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-zinc-400 hover:text-white p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu Sidebar */}
        <div className="flex flex-col gap-2 p-6 flex-1 overflow-y-auto">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all
                  ${active
                    ? "bg-[#111111] text-white border border-red-500/50 shadow-[0_0_15px_rgba(220,38,38,0.2)]"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
                  }
                `}
              >
                <Icon size={18} className={active ? "text-red-500" : "text-zinc-500"} />
                {link.label}
              </Link>
            );
          })}

          {/* CTA Button khusus Mobile */}
          <div className="mt-8">
            <Button href="/enkripsi" variant="solid" className="w-full flex justify-center">
              Mulai Eksperimen →
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
