"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Phone, Mail, MessageSquareText, CheckCircle2, Loader2 } from "lucide-react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.phone) return;

        setStatus("loading");
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setStatus("success");
    };

    return (
        <section id="contact" className="section-padding bg-ivory-texture">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid lg:grid-cols-12 gap-16 items-center">
                    <div className="lg:col-span-5 space-y-12">
                        <div className="space-y-6">
                            <span className="text-accent font-black uppercase tracking-[0.4em] text-[10px]">Connect</span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-primary leading-[1.15] tracking-tight">
                                인생의 풍요,<br />
                                그 시작은 <span className="text-accent italic">상담</span> 입니다.
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

                    <div className="lg:col-span-7 bg-white p-10 md:p-16 rounded-[3rem] shadow-premium border border-primary/5 min-h-[550px] flex items-center">
                        <AnimatePresence mode="wait">
                            {status === "success" ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="w-full text-center space-y-8"
                                >
                                    <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 className="w-12 h-12 text-accent" />
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-3xl font-serif font-black text-primary">신청이 완료되었습니다</h4>
                                        <p className="text-lg text-primary/60 font-medium leading-relaxed">
                                            {formData.name} 고객님, 소중한 상담 신청 감사합니다.<br />
                                            24시간 이내에 전문 가디언이 연락드리겠습니다.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => { setStatus("idle"); setFormData({ name: "", phone: "", message: "" }); }}
                                        className="text-[11px] font-black uppercase tracking-[0.3em] text-accent hover:text-primary transition-colors border-b border-accent/20 pb-1"
                                    >
                                        New Request
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="w-full space-y-10"
                                >
                                    <h4 className="text-2xl font-serif font-black text-primary">Consultation Request</h4>
                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black uppercase tracking-widest text-primary/40 ml-4">Full Name</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full px-6 py-4 bg-silver/30 rounded-full border border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-bold"
                                                    placeholder="성함"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black uppercase tracking-widest text-primary/40 ml-4">Phone Number</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.phone}
                                                    onChange={(e) => {
                                                        const val = e.target.value.replace(/[^0-9]/g, "");
                                                        let formatted = val;
                                                        if (val.length > 3 && val.length <= 7) {
                                                            formatted = val.replace(/(\d{3})(\d{1,})/, "$1-$2");
                                                        } else if (val.length > 7) {
                                                            formatted = val.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
                                                        }
                                                        setFormData({ ...formData, phone: formatted });
                                                    }}
                                                    className="w-full px-6 py-4 bg-silver/30 rounded-full border border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-bold"
                                                    placeholder="010-0000-0000"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-primary/40 ml-4">Message</label>
                                            <textarea
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="w-full px-6 py-6 bg-silver/30 rounded-[2rem] border border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-bold min-h-[120px] resize-none"
                                                placeholder="문의 사항을 남겨주세요"
                                            ></textarea>
                                        </div>
                                        <button
                                            disabled={status === "loading"}
                                            className="w-full btn-premium btn-premium-primary gap-3 py-6 group relative disabled:opacity-70"
                                        >
                                            {status === "loading" ? (
                                                <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                                            ) : (
                                                <>
                                                    <Send className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                                    <span className="font-black text-[1.2em]">상담 신청하기</span>
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
