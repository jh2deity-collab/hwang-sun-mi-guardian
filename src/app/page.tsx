import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Expertise from "@/components/Expertise";
import DiagnosisQuiz from "@/components/DiagnosisQuiz";
import Calculators from "@/components/Calculators";
import SocialProof from "@/components/SocialProof";
import Insights from "@/components/Insights";
import LeadGen from "@/components/LeadGen";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import HwangBot from "@/components/HwangBot";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <Expertise />
      <DiagnosisQuiz />
      <Calculators />
      <SocialProof />
      <Insights />
      <LeadGen />
      <Contact />
      <Footer />
      <HwangBot />
    </main>
  );
}
