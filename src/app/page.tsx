import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Destinations from "@/components/Destinations";

export default function Home() {
  return (
    <div className="min-h-svh bg-white text-slate-900">
      <Navbar />
      <Hero />
      <Features />
      <Destinations />
    </div>
  );
}
