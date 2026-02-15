"use client";

import { motion } from "framer-motion";
import { Download, Mail, BookOpen, Crown } from "lucide-react";

export default function LeadGen() {
    return (
        <section className="section-padding bg-primary relative overflow-hidden">
            {/* Professional Background Image with Overlay */}
            <div className="absolute inset-0 opacity-20 grayscale pointer-events-none">
                <img
                    src="https://images.unsplash.com/photo-1454165833267-028cc21e7867?auto=format&fit=crop&q=80&w=1200"
                    alt="Background Texture"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent z-0" />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-12">
                        <div className="space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-[1px] bg-accent" />
                                <span className="text-accent text-[9px] font-black uppercase tracking-[0.5em]">Exclusive Assets</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-white leading-[1.15] tracking-tight">
                                상위 1%를 위한<br />
                                <span className="text-gold-shine italic">자산 상속 비법서</span>
                            </h3>
                            <p className="text-lg md:text-xl text-white/50 max-w-md font-medium leading-relaxed border-l border-white/10 pl-8">
                                복잡한 세무와 증여, 은퇴 설계의 핵심 정수만을 담은 황선미 설계사의 특별 리포트를 독점 제공합니다.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            {[
                                { icon: <BookOpen className="w-5 h-5" />, title: "2026 자산 상속 바이블", size: "3.2MB" },
                                { icon: <BookOpen className="w-5 h-5" />, title: "절세 전략 10계명", size: "1.8MB" },
                            ].map((book, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -5 }}
                                    className="bg-white/5 p-8 rounded-3xl border border-white/10 group cursor-pointer"
                                >
                                    <div className="text-accent mb-6 group-hover:scale-110 transition-transform">{book.icon}</div>
                                    <p className="text-sm font-black text-white mb-2 leading-tight">{book.title}</p>
                                    <div className="flex items-center justify-between text-[10px] font-bold text-white/30">
                                        <span>PDF Report</span>
                                        <span>{book.size}</span>
                                    </div>
                                    <div className="mt-8 flex items-center gap-2 text-accent font-black text-[9px] uppercase tracking-widest group-hover:gap-4 transition-all">
                                        Download <Download className="w-3 h-3" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl relative">
                        <div className="space-y-10">
                            <div className="text-center space-y-4">
                                <h4 className="text-3xl font-serif font-black text-primary">Newsletter Insight</h4>
                                <p className="text-sm text-primary/40 font-medium">매월 가장 가치 있는 금융 통찰을 메일함으로 보내드립니다.</p>
                            </div>

                            <form className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-primary/40 ml-4">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="이메일 주소를 입력해 주세요"
                                        className="w-full px-8 py-5 bg-silver/30 rounded-full border border-transparent focus:border-accent focus:bg-white outline-none transition-all font-bold"
                                    />
                                </div>
                                <div className="flex items-start gap-3 px-4">
                                    <input type="checkbox" id="privacy" className="mt-1 accent-accent" />
                                    <label htmlFor="privacy" className="text-[10px] text-primary/40 leading-snug">
                                        개인정보 수집 및 뉴스레터 발송에 동의합니다. <br />언제든 한 번의 클릭으로 구독을 해지할 수 있습니다.
                                    </label>
                                </div>
                                <button className="w-full btn-premium btn-premium-primary py-6 gap-3 group">
                                    뉴스레터 구독하기
                                    <Mail className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>

                            <p className="text-center text-[9px] text-primary/20 uppercase font-black tracking-widest">
                                Trusted by 2,500+ Wealth Seekers
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
