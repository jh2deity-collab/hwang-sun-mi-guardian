"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 100]);

    const portraitUrl = "/images/hsm_profile_v8.jpg";
    const financialThemeUrl = "https://images.unsplash.com/photo-1454165833267-028cc21e7867?auto=format&fit=crop&q=80&w=2000";

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-white">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-silver/20 -z-10" />

            <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-10"
                >
                    <div className="space-y-3">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "40px" }}
                            className="h-[2px] bg-accent"
                        />
                        <span className="text-accent text-[11px] uppercase font-black tracking-[0.5em] block">
                            Global Wealth Strategist
                        </span>
                    </div>

                    <div className="space-y-6">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-black text-primary leading-[1.15] tracking-tight">
                            당신의 삶,<br />
                            <span className="text-gold-shine italic">더 높은 가치</span>를<br />
                            완성합니다.
                        </h1>
                        <p className="text-lg md:text-xl text-primary/60 font-medium leading-relaxed max-w-xl border-l-2 border-accent/30 pl-6">
                            변화하는 시대 속에서 변치 않는 인생의 확신과 <br />
                            풍요를 설계하는 <strong>금융 가디언 황선미</strong>입니다.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-8 pt-2">
                        <button className="btn-premium btn-premium-primary group px-10">
                            상담 예약하기
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <div className="flex flex-col">
                            <span className="text-[9px] text-primary/30 uppercase font-black tracking-widest">MDRT Member</span>
                            <span className="text-lg font-serif font-black text-primary border-b border-accent/20">010.8673.4589</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                    className="relative"
                >
                    <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-premium border-[1px] border-primary/5 group">
                        <img
                            src={portraitUrl}
                            alt="HSM Professional"
                            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/10 to-transparent" />
                        <div className="absolute bottom-12 left-12 text-white">
                            <p className="text-4xl font-serif font-black mb-2 tracking-tight">황선미</p>
                            <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-accent">Financial Advisor</p>
                        </div>
                    </div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="absolute -bottom-6 -left-6 bg-white p-10 rounded-3xl shadow-premium border border-primary/5"
                    >
                        <p className="text-[9px] font-black text-accent uppercase tracking-[0.3em] mb-3">Certification</p>
                        <p className="text-lg font-serif font-black text-primary leading-tight">
                            상위 1% MDRT <br />정회원 및 종신회원
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
