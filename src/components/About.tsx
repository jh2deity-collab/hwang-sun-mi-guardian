"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Award, Heart } from "lucide-react";

export default function About() {
    const ethics = [
        { title: "고객 이익 최우선", desc: "모든 금융 전략의 출발점은 고객의 평온한 삶입니다.", icon: <ShieldCheck className="w-8 h-8" /> },
        { title: "절대적 전문성", desc: "글로벌 금융 시장의 흐름을 꿰뚫는 정교한 통찰을 약속합니다.", icon: <Award className="w-8 h-8" /> },
        { title: "비밀 유지 엄수", desc: "고객의 소중한 정보 자산은 최고 수준으로 보호됩니다.", icon: <Heart className="w-8 h-8" /> },
    ];

    return (
        <section id="소개" className="section-padding bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid lg:grid-cols-2 gap-24 items-center">
                    {/* Left: Professional Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="relative"
                    >
                        <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,32,96,0.2)]">
                            <img
                                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                                alt="Professional Office"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent" />
                        </div>

                        {/* Floating Experience Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="absolute -bottom-10 -right-10 glass-premium p-10 rounded-3xl border border-white/20 shadow-2xl max-w-[280px]"
                        >
                            <p className="text-accent font-black text-4xl mb-2">MDRT</p>
                            <p className="text-white/80 text-sm font-medium leading-relaxed">
                                백만 달러 원탁 회의 정회원이 증명하는 <br />글로벌 수준의 정직과 전문성.
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Right: Content */}
                    <div className="space-y-16">
                        <div className="space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-[1px] bg-accent" />
                                <span className="text-accent font-black uppercase tracking-[0.4em] text-[10px]">Our Philosophy</span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-serif font-black text-primary leading-[1.1] tracking-tight">
                                흔들리지 않는 원칙,<br />
                                <span className="text-gold-shine italic">압도적인 신뢰</span>
                            </h2>
                            <p className="text-lg md:text-xl text-primary/50 font-medium leading-relaxed">
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
