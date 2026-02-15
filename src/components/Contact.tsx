"use client";

import { motion } from "framer-motion";
import { Send, Phone, Mail, MessageSquareText } from "lucide-react";

export default function Contact() {
    return (
        <section id="문의" className="section-padding bg-ivory-texture">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid lg:grid-cols-12 gap-16 items-center">
                    <div className="lg:col-span-5 space-y-12">
                        <div className="space-y-6">
                            <span className="text-accent font-black uppercase tracking-[0.4em] text-[10px]">Connect</span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-primary leading-[1.15] tracking-tight">
                                인생의 풍요,<br />
                                그 시작은 <span className="text-accent italic">상담</span>입니다.
                            </h2>
                            <p className="text-lg text-primary/60 font-medium leading-relaxed max-w-sm">
                                최고의 금융 전문가가 당신의 소중한 미래를 함께 고민합니다.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {[
                                { icon: <Phone className="w-5 h-5" />, label: "Call", value: "010-8673-4589" },
                                { icon: <Mail className="w-5 h-5" />, label: "Email", value: "hsm@miraeasset.me" },
                                { icon: <MessageSquareText className="w-5 h-5" />, label: "Kakao", value: "@hwang_guardian" },
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-6 group">
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-lg border border-primary/5 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-[9px] uppercase font-black text-primary/30 tracking-widest mb-0.5">{item.label}</p>
                                        <p className="text-lg font-black text-primary">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-7 bg-white p-10 md:p-16 rounded-[3rem] shadow-premium border border-primary/5">
                        <div className="space-y-10">
                            <h4 className="text-2xl font-serif font-black text-primary">Consultation Request</h4>
                            <form className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-primary/40 ml-4">Full Name</label>
                                        <input type="text" defaultValue="황선미" className="w-full px-6 py-4 bg-silver/30 rounded-full border border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-bold" placeholder="성함" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-primary/40 ml-4">Phone Number</label>
                                        <input type="text" defaultValue="010-8673-4589" className="w-full px-6 py-4 bg-silver/30 rounded-full border border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-bold" placeholder="010-0000-0000" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-primary/40 ml-4">Message</label>
                                    <textarea className="w-full px-6 py-6 bg-silver/30 rounded-[2rem] border border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-bold min-h-[120px] resize-none" placeholder="문의 사항을 남겨주세요"></textarea>
                                </div>
                                <button className="w-full btn-premium btn-premium-primary gap-3 py-6 group">
                                    <Send className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                    상담 신청하기
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
