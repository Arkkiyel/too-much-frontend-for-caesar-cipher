import Button from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section className="bg-zinc-950 py-24 border-t border-zinc-800/50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Kotak CTA — lebar sama dengan TeamSection (max-w-6xl),
            gradien merah ke hitam dari kiri ke kanan */}
        <div
          className="w-full rounded-lg px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-8"
          style={{
            background:
              "linear-gradient(to right, #dc2626 0%, #991b1b 40%, #18181b 100%)",
          }}
        >
          <div>
            <h2 className="text-3xl font-bold text-white">Siap Mencoba Sendiri?</h2>
            <p className="text-red-200 text-sm mt-2 max-w-sm leading-relaxed">
              Masukkan pesan, pilih key, lalu saksikan bagaimana setiap huruf
              bergeser secara transparan.
            </p>
          </div>
          <Button href="/enkripsi" variant="solid" className="shrink-0">
            Mulai Eksperimen →
          </Button>
        </div>
      </div>
    </section>
  );
}
