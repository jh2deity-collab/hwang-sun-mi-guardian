"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 100]);

    const portraitUrl = "/images/hsm_profile_v8.jpg";
    const financialThemeUrl = "https://images.unsplash.com/photo-1454165833267-028cc21e7867?auto=format&fit=crop&q=80&w=2000";

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-white">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-silver/20 -z-10" />

            <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-[1.618fr_1fr] gap-12 lg:gap-24 items-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-12"
                >
                    <div className="space-y-4">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "60px" }}
                            className="h-[2px] bg-accent"
                        />
                        <span className="text-accent text-[12px] md:text-[13px] uppercase font-black tracking-[0.6em] block">
                            Global Wealth Strategist
                        </span>
                    </div>

                    <div className="space-y-8">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-primary leading-[1.15] tracking-tight">
                            당신의 삶,<br />
                            <span className="text-gold-shine italic">더 높은 가치</span>를<br />
                            완성합니다.
                        </h1>
                        <p className="text-xl md:text-2xl text-primary/70 font-medium leading-relaxed max-w-2xl border-l-[3px] border-accent/40 pl-8 py-2">
                            변화하는 시대 속에서 변치 않는 인생의 확신과 <br />
                            풍요를 설계하는 <strong>금융 가디언 황선미</strong>입니다.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-10 pt-4">
                        <button className="btn-premium btn-premium-primary group px-12 py-6 text-lg">
                            상담 예약하기
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-primary/40 uppercase font-black tracking-[0.3em]">MDRT Life Member</span>
                            <span className="text-2xl font-serif font-black text-primary border-b-2 border-accent/30 tracking-tighter">010.8673.4589</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                    className="relative lg:justify-self-end"
                >
                    <div className="relative aspect-[1/1.618] w-full max-w-[480px] rounded-[4rem] overflow-hidden shadow-premium border-[1px] border-primary/5 group">
                        <Image
                            src={portraitUrl}
                            alt="HSM Professional"
                            fill
                            priority
                            className="object-cover group-hover:scale-110 transition-all duration-[2000ms]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/5 to-transparent" />
                        <div className="absolute bottom-16 left-12 text-white">
                            <p className="text-5xl font-serif font-black mb-3 tracking-tighter">황선미</p>
                            <p className="text-[12px] uppercase tracking-[0.6em] font-black text-accent drop-shadow-md">Financial Advisor</p>
                        </div>
                    </div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="absolute -bottom-8 -left-8 bg-white p-12 rounded-[2.5rem] shadow-premium border border-primary/10 backdrop-blur-sm"
                    >
                        <p className="text-[10px] font-black text-accent uppercase tracking-[0.4em] mb-4">Certification</p>
                        <p className="text-2xl font-serif font-black text-primary leading-tight tracking-tight">
                            상위 1% MDRT <br />정회원 및 종신회원
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
