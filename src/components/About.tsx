"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Award, Heart } from "lucide-react";
import Image from "next/image";

export default function About() {
    const ethics = [
        { title: "고객 이익 최우선", desc: "모든 금융 전략의 출발점은 고객의 평온한 삶입니다.", icon: <ShieldCheck className="w-8 h-8" /> },
        { title: "절대적 전문성", desc: "글로벌 금융 시장의 흐름을 꿰뚫는 정교한 통찰을 약속합니다.", icon: <Award className="w-8 h-8" /> },
        { title: "비밀 유지 엄수", desc: "고객의 소중한 정보 자산은 최고 수준으로 보호됩니다.", icon: <Heart className="w-8 h-8" /> },
    ];

    return (
        <section id="소개" className="section-padding bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid lg:grid-cols-[1fr_1.618fr] gap-16 lg:gap-24 items-center">
                    {/* Left: Professional Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative"
                    >
                        <div className="relative aspect-[1/1.618] rounded-[5rem] overflow-hidden shadow-premium border border-primary/5">
                            <Image
                                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                                alt="Professional Office"
                                fill
                                className="absolute inset-0 object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-[2000ms]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/60 to-transparent" />
                        </div>

                        {/* Floating Experience Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6, duration: 1 }}
                            className="absolute -bottom-12 -left-12 glass-premium p-12 rounded-[3rem] border border-white/20 shadow-2xl max-w-[320px]"
                        >
                            <p className="text-accent font-black text-5xl mb-3 tracking-tighter">MDRT</p>
                            <p className="text-white text-base font-semibold leading-relaxed">
                                백만 달러 원탁 회의 정회원이 증명하는 <br />글로벌 수준의 정직과 전문성.
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Right: Content */}
                    <div className="space-y-20">
                        <div className="space-y-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-[1px] bg-accent" />
                                <span className="text-accent font-black uppercase tracking-[0.5em] text-[11px]">Our Philosophy</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-primary leading-[1.15] tracking-tight">
                                흔들리지 않는 원칙,<br />
                                <span className="text-gold-shine italic">압도적인 신뢰</span>
                            </h2>
                            <p className="text-xl md:text-2xl text-primary/70 font-medium leading-relaxed max-w-2xl border-l-[3px] border-accent/30 pl-8">
                                자산 관리는 단순한 숫자의 나열이 아닙니다. 고객의 인생이라는 위대한 여정을 지키는 가장 든든한 가디언이 되는 것, 그것이 황선미의 유일한 사명입니다.
                            </p>
                        </div>

                        <div className="grid gap-6">
                            {ethics.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-start gap-8 p-8 rounded-[2rem] hover:bg-silver/50 border border-transparent hover:border-primary/5 transition-all group"
                                >
                                    <div className="text-accent p-4 bg-accent/5 rounded-2xl group-hover:bg-accent group-hover:text-white transition-all">
                                        {item.icon}
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-xl font-black text-primary">{item.title}</h4>
                                        <p className="text-base text-primary/50 font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
