"use client";

import { motion } from "framer-motion";
import { PieChart, Shield, Landmark, ArrowRight } from "lucide-react";

export default function Expertise() {
    const services = [
        {
            title: "Asset Strategy",
            kr: "전략적 자산 관리",
            details: "거시적 시장 분석을 바탕으로 개인별 최적화된 포트폴리오를 설계하여 견고한 자산 성장을 실현합니다.",
            icon: <PieChart className="w-10 h-10" />,
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"
        },
        {
            title: "Risk Management",
            kr: "철저한 리스크 예방",
            details: "예측 불가능한 위험으로부터 가족과 자산을 지켜내는 최고 수준의 방어 체계를 구축합니다.",
            icon: <Shield className="w-10 h-10" />,
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200"
        },
        {
            title: "Legacy & Success",
            kr: "상속 및 가업 승계",
            details: "축적된 유산의 품격이 다음 세대로 온전히 이어질 수 있도록 전문적인 설계와 실행을 돕습니다.",
            icon: <Landmark className="w-10 h-10" />,
            image: "https://images.unsplash.com/photo-1507679799987-c7377ec486b8?auto=format&fit=crop&q=80&w=1200"
        },
    ];

    return (
        <section id="서비스" className="section-padding bg-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

            <div className="container mx-auto px-6 md:px-12 space-y-24 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-[1px] bg-accent" />
                            <span className="text-accent font-black uppercase tracking-[0.5em] text-[10px]">Financial Mastery</span>
                        </div>
                        <h3 className="text-5xl md:text-7xl font-serif font-black text-primary tracking-tight leading-[1.1]">
                            초격차 전문성이<br /><span className="text-gold-shine italic">증명하는 특별함</span>
                        </h3>
                    </div>
                    <p className="text-lg md:text-xl text-primary/50 max-w-sm font-medium leading-relaxed border-l-2 border-accent/20 pl-8">
                        당신의 인생에서 가장 임계점이 되는 금융 의사결정, 황선미가 독보적인 해답을 제시합니다.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {services.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.8 }}
                            className="group relative h-[600px] rounded-[3rem] overflow-hidden border border-primary/5 shadow-premium active:scale-[0.98] transition-transform"
                        >
                            {/* Background Image */}
                            <motion.img
                                src={item.image}
                                alt={item.kr}
                                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 opacity-40 group-hover:opacity-100"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent transition-opacity duration-700 opacity-90 group-hover:opacity-70" />

                            {/* Content */}
                            <div className="absolute inset-0 p-12 flex flex-col justify-end space-y-8 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="text-accent bg-white/10 w-20 h-20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 group-hover:bg-accent group-hover:text-white transition-all">
                                    {item.icon}
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <p className="text-accent text-[9px] font-black uppercase tracking-[0.3em]">{item.title}</p>
                                        <h4 className="text-3xl font-serif font-black text-white">
                                            {item.kr}
                                        </h4>
                                    </div>
                                    <p className="text-base text-white/60 leading-relaxed font-medium">
                                        {item.details}
                                    </p>
                                </div>

                                <div className="pt-6 border-t border-white/10 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all">
                                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Explore Service</span>
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/20">
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
