import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import Features from "@/components/Features";
import StudentPackages from "@/components/StudentPackages";
import HowItWorks from "@/components/HowItWorks";
import Destinations from "@/components/Destinations";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-svh bg-white text-slate-900">
      <Navbar />
      <Hero />
      <TrustedBy />
      <Features />
      <StudentPackages />
      <HowItWorks />
      <Destinations />
      <Gallery />
      <Testimonials />
      <CallToAction />
      <FAQ />
      <Footer />
    </div>
  );
}
