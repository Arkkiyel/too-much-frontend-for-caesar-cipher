import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import FlowchartSection from "@/components/landing/FlowchartSection";
import TeamSection from "@/components/landing/TeamSection";
import CTASection from "@/components/landing/CTASection";

export default function Home() {
  return (
    // Mengganti <> dengan <main> yang memiliki class gradien
    <main className="min-h-screen bg-black bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/40 via-zinc-950 to-black">
      <HeroSection />
      <AboutSection />
      <FlowchartSection />
      <TeamSection />
      <CTASection />
    </main>
  );
}
