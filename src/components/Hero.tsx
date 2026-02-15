"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Crown } from "lucide-react";
import Image from "next/image";

export default function Hero() {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 100]);

    const portraitUrl = "/images/hsm_profile_v8.jpg";

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-[#fdfdfd]">
            {/* Premium Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Metallic Mesh Texture */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#1a2b4b 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                {/* Soft Light Rays */}
                <div className="absolute -top-1/4 -right-1/4 w-[80%] h-[80%] bg-accent/10 rounded-full blur-[120px] mix-blend-multiply" />
                <div className="absolute -bottom-1/4 -left-1/4 w-[60%] h-[60%] bg-primary/5 rounded-full blur-[100px]" />

                {/* Vertical Decorative Bar (Golden Ratio based) */}
                <div className="absolute top-0 right-[38.2%] w-[1px] h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-0 items-center">
                    {/* Left: Text Content (Golden Ratio: 61.8%) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-16"
                    >
                        <div className="space-y-6">
                            <div className="flex items-center gap-6">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "80px" }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                    className="h-[1px] bg-accent"
                                />
                                <span className="text-accent text-[11px] md:text-[12px] uppercase font-black tracking-[0.8em] block">
                                    Strategic Wealth Guardian
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-primary leading-[1.1] tracking-[-0.03em]">
                                당신의 삶에<br />
                                <span className="relative inline-block mt-4">
                                    <span className="relative z-10 text-gold-shine italic">압도적 가치</span>
                                    <motion.span
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 1, delay: 1 }}
                                        className="absolute bottom-2 left-0 w-full h-4 bg-accent/10 -z-10 origin-left"
                                    />
                                </span>를<br />
                                설계합니다.
                            </h1>
                        </div>

                        <div className="space-y-8 max-w-xl">
                            <p className="text-xl md:text-2xl text-primary/70 font-medium leading-[1.6] border-l-[4px] border-accent/40 pl-10 py-1">
                                글로벌 금융 시장의 거시적 통찰과<br />
                                상위 1%를 위한 <strong className="text-primary font-black">정교한 자산 전략</strong>
                            </p>
                            <p className="text-base md:text-lg text-primary/50 font-medium leading-relaxed">
                                변화의 흐름 앞에서도 흔들리지 않는 인생의 확신을 위해,<br />
                                황선미 설계사가 당신의 가장 든든한 파트너가 되어드립니다.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-12 pt-6">
                            <button className="btn-premium btn-premium-primary group px-16 py-7 text-lg shadow-2xl hover:shadow-accent/20">
                                무료 컨설팅 신청
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </button>
                            <div className="flex flex-col gap-2 relative">
                                <span className="text-[10px] text-primary/30 uppercase font-black tracking-[0.4em]">Direct Contact</span>
                                <span className="text-2xl font-serif font-black text-primary hover:text-accent transition-colors cursor-pointer border-b border-primary/10 tracking-tight">010.8673.4589</span>
                                <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent/20" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Portrait (Golden Ratio: 38.2%) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative lg:pl-12"
                    >
                        {/* Decorative Decorative Organic Frame */}
                        <div className="absolute -top-12 -left-4 w-32 h-32 border-t-[1px] border-l-[1px] border-accent/30 rounded-tl-[4rem] -z-10" />
                        <div className="absolute -bottom-12 -right-4 w-40 h-40 border-b-[1px] border-r-[1px] border-accent/30 rounded-br-[5rem] -z-10" />

                        <div className="relative aspect-[1/1.5] w-full max-w-[520px] rounded-[5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(26,43,75,0.3)] group border border-white/20">
                            <Image
                                src={portraitUrl}
                                alt="Hwang Sun-mi Professional"
                                fill
                                priority
                                className="object-cover group-hover:scale-105 transition-transform duration-[4000ms] ease-out grayscale-[0.1] contrast-[1.05]"
                            />

                            {/* Sophisticated Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1a2b4b]/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                            {/* Floating Professional Info */}
                            <div className="absolute bottom-16 left-16 right-16 flex flex-col items-start gap-4 text-white">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.2 }}
                                    className="h-[1px] w-12 bg-accent/60"
                                />
                                <div>
                                    <p className="text-5xl font-serif font-black mb-2 tracking-tighter drop-shadow-lg">황선미</p>
                                    <p className="text-[11px] uppercase tracking-[0.5em] font-black text-accent/90">Master Wealth Advisor</p>
                                </div>
                            </div>
                        </div>

                        {/* Achievement Badge (Floating Card) */}
                        <motion.div
                            initial={{ x: 30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 1.5, duration: 1 }}
                            className="absolute -bottom-10 -left-12 glass-premium p-10 rounded-[3rem] border border-white/20 shadow-2xl max-w-[280px] backdrop-blur-md"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <Crown className="text-accent w-6 h-6" />
                                <span className="text-[10px] font-black text-accent uppercase tracking-[0.3em]">Honorary Title</span>
                            </div>
                            <p className="text-xl font-serif font-black text-white leading-tight tracking-tight">
                                상위 1% MDRT 정회원<br />
                                및 글로벌 종신회원
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
