import Link from "next/link";
import { LockKeyholeIcon } from "lucide-react";

const pages = [
  { label: "Materi", href: "/" },
  { label: "Kelompok", href: "/#team" },
  { label: "Enkripsi", href: "/enkripsi" },
  { label: "Dekripsi", href: "/dekripsi" },
  { label: "Test Cases", href: "/test-cases" },
  { label: "Security Demo", href: "/security-demo" },
];

export default function Footer() {
  return (
    // overflow-hidden DIHAPUS — itu yang memotong gradien
    // Gradien kini pakai background langsung di footer, bukan div absolute
    <footer
      className="relative border-t border-zinc-800"
      style={{
        background:
          "radial-gradient(ellipse 100% 80% at 50% 100%, #7f1d1d 0%, #3f0d0d 35%, #09090b 65%)",
      }}
    >
      <div className="relative max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Brand */}
        <div className="space-y-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-red-500"
          >
            <LockKeyholeIcon size={16} />
            CaesarCipher
          </Link>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
            Belajar kriptografi klasik melalui visualisasi interaktif, eksperimen
            langsung, dan audit keamanan yang transparan.
          </p>
        </div>

        {/* Pages */}
        <div>
          <p className="text-zinc-400 text-xs tracking-widest mb-4 uppercase">Pages</p>
          <ul className="space-y-2">
            {pages.map((page) => (
              <li key={page.href}>
                <Link
                  href={page.href}
                  className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors flex items-center gap-2"
                >
                  <span className="text-red-600">→</span>
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
