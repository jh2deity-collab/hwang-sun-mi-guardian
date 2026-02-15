"use client";

import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

const About = dynamic(() => import("@/components/About"), { ssr: false });
const Expertise = dynamic(() => import("@/components/Expertise"), { ssr: false });
const DiagnosisQuiz = dynamic(() => import("@/components/DiagnosisQuiz"), { ssr: false });
const AISimulator = dynamic(() => import("@/components/AISimulator"), { ssr: false });
const SocialProof = dynamic(() => import("@/components/SocialProof"), { ssr: false });
const Insights = dynamic(() => import("@/components/Insights"), { ssr: false });
const LeadGen = dynamic(() => import("@/components/LeadGen"), { ssr: false });
const Contact = dynamic(() => import("@/components/Contact"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
const HwangBot = dynamic(() => import("@/components/HwangBot"), { ssr: false });
const AIGuardian = dynamic(() => import('@/components/AIGuardian'), { ssr: false });

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white">
      <Header />
      <Hero />
      <AIGuardian />
      <About />
      <Expertise />
      <DiagnosisQuiz />
      <AISimulator />
      <SocialProof />
      <Insights />
      <LeadGen />
      <Contact />
      <Footer />
      <HwangBot />
    </main>
  );
}
