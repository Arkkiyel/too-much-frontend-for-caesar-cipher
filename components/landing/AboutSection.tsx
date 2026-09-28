const cards = [
  {
    title: "Sejarah",
    subtitle: "± 58 SM",
    body: "Julius Caesar menggunakan pergeseran alfabet untuk melindungi pesan militer Romawi. Sederhana, cepat, dan mudah dilakukan dengan tangan.",
  },
  {
    title: "Rumus Enkripsi",
    formula: "E(x) = (x + n) mod 26",
    body: "x adalah posisi huruf 0–25, sedangkan n adalah besar kunci. Hasil dibungkus kembali ke alfabet dengan modulo 26.",
  },
  {
    title: "Rumus Dekripsi",
    formula: "D(x) = (x − n) mod 26",
    body: "Reverse shift mengurangi posisi dengan kunci yang sama. Tambahkan 26 sebelum modulo untuk menghindari nilai negatif.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-zinc-950 py-24 border-t border-zinc-800/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white">Apa itu Caesar Cipher?</h2>
          <p className="text-zinc-400 mt-3 max-w-lg text-sm leading-relaxed">
            Sebuah cipher substitusi monoalfabetik yang memindahkan setiap huruf
            dengan jumlah langkah tetap. Pahami asal-usul, rumus, dan alurnya
            sebelum bereksperimen.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-zinc-900 border border-zinc-800 rounded p-6 space-y-3"
            >
              {/* Icon placeholder — lock SVG sederhana, bukan emoji */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ef4444"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>

              <div>
                <h3 className="text-white font-semibold text-base">{card.title}</h3>
                {card.subtitle && (
                  <p className="text-red-400 text-xs font-mono mt-0.5">{card.subtitle}</p>
                )}
              </div>
              {card.formula && (
                <p className="font-mono text-red-400 text-sm bg-zinc-950 rounded px-3 py-2 border border-zinc-800">
                  {card.formula}
                </p>
              )}
              <p className="text-zinc-400 text-sm leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
