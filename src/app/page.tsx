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
import { getHomeContent } from "@/lib/landing/getHomeContent";

export default async function Home() {
  const content = await getHomeContent();

  return (
    <div className="min-h-svh bg-white text-slate-900">
      <Navbar content={content.navbar} />
      <Hero content={content.hero} />
      <TrustedBy content={content.trustedBy} />
      <Features content={content.features} />
      <StudentPackages content={content.packages} />
      <HowItWorks content={content.howItWorks} />
      <Destinations content={content.destinations} />
      <Gallery content={content.gallery} />
      <Testimonials content={content.testimonials} />
      <CallToAction content={content.cta} />
      <FAQ content={content.faq} />
      <Footer content={content.footer} />
    </div>
  );
}
