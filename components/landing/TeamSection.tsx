const members = [
  { name: "Dhimas Arya Cahya Nugraha", nim: "25/559844/PA/23548" },
  { name: "Hajar Mutmainnah Muallif", nim: "25/561559/PA/23674" },
  { name: "Andika Wahyu Dwi Saputra", nim: "25/557882/PA/23452" },
  { name: "Nabil Adriansyah", nim: "25/561604/NPA/20041" },
  { name: "Gusti Rayna", nim: "25/557884/PA/23446" },
];

export default function TeamSection() {
  return (
    <section id="team" className="bg-zinc-950 py-24 border-t border-zinc-800/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Dibalik Proyek Ini</h2>
          <p className="text-zinc-400 text-sm mt-3">
            Empat peran, satu tujuan: membuat konsep kriptografi klasik terasa
            visual, logis, dan menyenangkan untuk dipelajari.
          </p>
        </div>

        {/* Kartu anggota — center secara horizontal */}
        <div className="flex flex-wrap justify-center gap-3">
          {members.map((m) => (
            <div
              key={m.nim}
              className="bg-zinc-900 border border-zinc-800 rounded px-5 py-4 text-center"
              style={{ minWidth: "180px" }}
            >
              <p className="text-white text-sm font-medium leading-snug">{m.name}</p>
              <p className="text-red-400 font-mono text-xs mt-1">{m.nim}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
