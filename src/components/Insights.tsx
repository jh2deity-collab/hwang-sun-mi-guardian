"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Clock, Calendar, Download } from "lucide-react";
import { insights } from "@/data/insights";
import LeadMagnet from "./LeadMagnet";

const Insights = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTitle, setSelectedTitle] = useState("");

    const openRegister = (title: string) => {
        setSelectedTitle(title);
        setIsModalOpen(true);
    };

    return (
        <section id="insights" className="py-32 bg-[#020617] relative overflow-hidden">
            {/* Background Decorative Text */}
            <div className="absolute top-20 left-0 w-full overflow-hidden whitespace-nowrap opacity-[0.02] pointer-events-none select-none">
                <span className="text-[15rem] font-bold leading-none tracking-tighter uppercase mr-20">
                    Digital Authority
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
                                Insights & Columns
                            </span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-100"
                        >
                            Expert <span className="text-gold-500 italic">Perspectives</span>
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-slate-400 max-w-sm text-sm leading-relaxed"
                    >
                        황선미 가디언이 제안하는 최신 금융 트렌드와
                        자산 관리의 정석을 담은 통찰을 소개합니다.
                    </motion.p>
                </div>

                {/* Magazine Layout Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {insights.map((insight, index) => (
                        <motion.div
                            key={insight.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-[4/5] mb-6 overflow-hidden rounded-sm bg-slate-900 border border-slate-800">
                                <Image
                                    src={insight.image}
                                    alt={insight.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />

                                {/* Overlay Content */}
                                <div className="absolute top-6 left-6">
                                    <span className="bg-gold-500 text-blue-900 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">
                                        {insight.category}
                                    </span>
                                </div>

                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="flex items-center gap-4 text-[10px] text-slate-400 font-medium uppercase tracking-widest mb-3">
                                        <span className="flex items-center gap-1">
                                            <Calendar size={12} className="text-gold-500" /> {insight.date}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock size={12} className="text-gold-500" /> {insight.readTime}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-100 leading-snug group-hover:text-gold-500 transition-colors">
                                        {insight.title}
                                    </h3>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
                                    {insight.summary}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
                                    <button className="flex items-center gap-2 text-gold-500 font-bold text-xs uppercase tracking-widest group/btn">
                                        Read Story <ArrowUpRight size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openRegister(`${insight.category} 가이드`);
                                        }}
                                        className="flex items-center gap-1.5 text-slate-400 hover:text-gold-500 transition-colors text-xs font-medium"
                                    >
                                        <Download size={14} /> PDF Guide
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Global Lead Magnet Callout */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24 p-12 bg-gradient-to-br from-blue-900 to-slate-900 rounded-3xl border border-gold-500/20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10"
                >
                    {/* Decorative Pattern */}
                    <div className="absolute top-0 right-0 p-20 opacity-10">
                        <BookOpen size={200} className="text-gold-500" />
                    </div>

                    <div className="max-w-xl relative z-10">
                        <h3 className="text-3xl font-bold text-slate-100 mb-4">
                            황선미 가디언의 <span className="text-gold-500 italic">2026 자산 가이드북</span> 을 받아보세요
                        </h3>
                        <p className="text-slate-400 text-base leading-relaxed">
                            상위 1% 자산승계 노하우부터 CEO 리스크 관리까지,
                            전문가의 깊은 식견이 담긴 프리미엄 리포트를 무료로 제공해 드립니다.
                        </p>
                    </div>

                    <button
                        onClick={() => openRegister("2026 자산 관리 통합 가이드")}
                        className="relative z-10 px-10 py-5 bg-gold-500 text-blue-900 font-bold rounded-full hover:bg-gold-400 transition-all flex items-center gap-3 shadow-xl shadow-gold-500/20 whitespace-nowrap"
                    >
                        프리미엄 리포트 신청하기 <Download size={20} />
                    </button>
                </motion.div>
            </div>

            {/* Lead Magnet Modal */}
            <LeadMagnet
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={selectedTitle}
            />
        </section>
    );
};

export default Insights;
