"use client";

import { motion, Variants } from "framer-motion";
import { PieChart, Shield, Landmark, ArrowRight } from "lucide-react";
import Image from "next/image";
import LeadMagnet from "./LeadMagnet";
import { useState } from "react";

const Expertise = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");

    const openModal = (title: string) => {
        setModalTitle(title);
        setIsModalOpen(true);
    };

    const services = [
        {
            id: 1,
            title: "Asset Strategy",
            kr: "전략적 자산 관리",
            category: "Expertise 01",
            details: "거시적 시장 분석을 바탕으로 개인별 최적화된 포트폴리오를 설계하여 견고한 자산 성장을 실현합니다.",
            icon: <PieChart size={20} />,
            image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200"
        },
        {
            id: 2,
            title: "Risk Management",
            kr: "철저한 리스크 예방",
            category: "Expertise 02",
            details: "예측 불가능한 위험으로부터 가족과 자산을 지켜내는 최고 수준의 방어 체계를 구축합니다.",
            icon: <Shield size={20} />,
            image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&q=80&w=1200"
        },
        {
            id: 3,
            title: "Legacy & Success",
            kr: "상속 및 가업 승계",
            category: "Expertise 03",
            details: "축적된 유산의 품격이 다음 세대로 온전히 이어질 수 있도록 전문적인 설계와 실행을 돕습니다.",
            icon: <Landmark size={20} />,
            image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200"
        },
    ];

    return (
        <section id="service" className="py-32 bg-[#020617] relative overflow-hidden">
            {/* Background Decorative Text */}
            <div className="absolute top-20 left-0 w-full overflow-hidden whitespace-nowrap opacity-[0.02] pointer-events-none select-none">
                <span className="text-[15rem] font-bold leading-none tracking-tighter uppercase mr-20">
                    Professionalism
                </span>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-2 mb-4"
                        >
                            <span className="w-12 h-[1px] bg-gold-500/50"></span>
                            <span className="text-gold-500 font-semibold uppercase tracking-[0.3em] text-xs">
                                Financial Mastery
                            </span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-100"
                        >
                            독보적 <span className="text-gold-500 italic">Expertise</span>
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-slate-400 max-w-sm text-sm leading-relaxed"
                    >
                        당신의 인생에서 가장 중요한 금융적 순간,
                        전문가의 정교한 해답을 통해 새로운 가치를 제시합니다.
                    </motion.p>
                </div>

                {/* Magazine Layout Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {services.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-[4/5] mb-6 overflow-hidden rounded-sm bg-slate-900 border border-slate-800">
                                <Image
                                    src={item.image}
                                    alt={item.kr}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />

                                {/* Overlay Content */}
                                <div className="absolute top-6 left-6">
                                    <span className="bg-gold-500 text-blue-900 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">
                                        {item.category}
                                    </span>
                                </div>

                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="flex items-center gap-2 text-[10px] text-gold-500 font-bold uppercase tracking-widest mb-3">
                                        {item.icon} <span className="text-slate-400">{item.title}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-100 leading-snug group-hover:text-gold-500 transition-colors">
                                        {item.kr}
                                    </h3>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 font-medium">
                                    {item.details}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openModal(`${item.kr} 심층 상담`);
                                        }}
                                        className="flex items-center gap-2 text-gold-500 font-bold text-xs uppercase tracking-widest group/btn"
                                    >
                                        Consult with Expert <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Integration Callout */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24 p-12 bg-gradient-to-br from-blue-900/40 to-slate-900/40 rounded-3xl border border-gold-500/20 backdrop-blur-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10"
                >
                    <div className="max-w-xl relative z-10">
                        <h3 className="text-3xl font-bold text-slate-100 mb-4">
                            금융의 깊이가 만드는 <span className="text-gold-500 italic">특별한 가치</span> 를 경험하세요
                        </h3>
                        <p className="text-slate-400 text-base leading-relaxed">
                            MDRT 정회원으로서 검증된 전문성과 하이엔드 자산 관리 철학으로
                            당신의 독보적인 부의 지도를 함께 설계합니다.
                        </p>
                    </div>

                    <button
                        onClick={() => openModal("심층 자산 전략 상담")}
                        className="relative z-10 px-10 py-5 bg-gold-500 text-blue-900 font-bold rounded-full hover:bg-gold-400 transition-all flex items-center gap-3 shadow-xl shadow-gold-500/20 whitespace-nowrap"
                    >
                        무료 심층 상담 신청하기 <ArrowRight size={20} />
                    </button>
                </motion.div>
            </div>

            {/* Lead Magnet Modal */}
            <LeadMagnet
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalTitle}
            />
        </section>
    );
};

export default Expertise;
