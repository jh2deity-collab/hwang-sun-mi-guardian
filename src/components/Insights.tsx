"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Insights() {
    const articles = [
        {
            date: "2024.10.12",
            title: "변화하는 자산 시장의 미래와 대응 전략",
            cat: "Market Analysis",
            image: "https://images.unsplash.com/photo-1591696208182-8cbb7af297df?auto=format&fit=crop&q=80&w=1200"
        },
        {
            date: "2024.09.28",
            title: "법인 승계의 핵심, 절세와 안정성의 균형",
            cat: "Legacy Planning",
            image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200"
        },
        {
            date: "2024.09.15",
            title: "은퇴 설계: 정년을 넘어선 삶의 품격",
            cat: "Retirement",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
        },
    ];

    return (
        <section id="인사이트" className="section-padding bg-white relative overflow-hidden">
            {/* Background Accent Lines */}
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none -z-10">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent rounded-full blur-[160px] translate-x-1/2 -translate-y-1/2" />
            </div>

            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-16 mb-24">
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-[1px] bg-accent" />
                            <h2 className="text-accent font-black uppercase tracking-[0.5em] text-[10px]">Financial Intelligence</h2>
                        </div>
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-primary tracking-tight leading-[1.15]">
                            금융과 인생을 관통하는<br /><span className="text-gold-shine italic">전문가적 통찰</span>
                        </h3>
                    </div>
                    <button className="btn-premium btn-premium-outline px-12 group">
                        View All Publications
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {articles.map((article, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-premium border border-primary/5 mb-10">
                                <motion.img
                                    src={article.image}
                                    alt={article.title}
                                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                                <div className="absolute top-10 left-10">
                                    <span className="px-5 py-2 glass-premium rounded-full text-[9px] font-black uppercase tracking-[0.3em] text-white">
                                        {article.cat}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-6 px-4">
                                <div className="flex items-center gap-3">
                                    <p className="text-[10px] font-black text-primary/30 uppercase tracking-[0.5em]">{article.date}</p>
                                    <div className="h-[1px] w-6 bg-accent/20" />
                                </div>
                                <h4 className="text-2xl md:text-3xl font-serif font-black text-primary group-hover:text-accent transition-colors leading-[1.3] tracking-tight">
                                    {article.title}
                                </h4>
                                <div className="flex items-center gap-3 text-accent font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                                    Read Insight <ArrowRight className="w-3 h-3" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
