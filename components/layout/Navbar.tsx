"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LockKeyholeIcon,
  UnlockIcon,
  PenLineIcon,
  TriangleAlertIcon
} from "lucide-react";
import Button from "@/components/ui/Button";

// 1. Tambahkan ikon ke dalam array navigasi
const navLinks = [
  { label: "Enkripsi", href: "/enkripsi", icon: LockKeyholeIcon },
  { label: "Dekripsi", href: "/dekripsi", icon: UnlockIcon },
  { label: "Test Cases", href: "/test-cases", icon: PenLineIcon },
  { label: "Security Demo", href: "/security-demo", icon: TriangleAlertIcon },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
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

        {/* Nav links */}
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
                      ? "bg-[#111111] text-white border border-red-500/50 shadow-[0_0_15px_rgba(220,38,38,0.2)]" // Efek kotak dan menyala (Glow)
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

        {/* CTA */}
        <div className="ml-auto">
          <Button href="/enkripsi" variant="solid">
            Mulai Eksperimen →
          </Button>
        </div>
      </nav>
    </header>
  );
}
