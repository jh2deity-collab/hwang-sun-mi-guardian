import React, { useState } from 'react';
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { X, User, Phone, Mail, ChevronRight, ShieldCheck, CalendarClock, Briefcase, Clock } from "lucide-react";

interface LeadMagnetProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
}

const LeadMagnet = ({ isOpen, onClose, title = "프리미엄 자산 관리 가이드" }: LeadMagnetProps) => {
    const [step, setStep] = useState<'form' | 'success'>('form');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        service: '자산 경영 전략',
        time: '평일 오후'
    });

    const services = ["자산 경영 전략", "증여 · 상속", "리스크 관리", "가업 승계"];
    const times = ["평일 오전", "평일 오후", "주말/공휴일"];

    const dragControls = useDragControls();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 실제 전송 로직 시뮬레이션
        setTimeout(() => setStep('success'), 800);
    };

    const switchToAI = () => {
        onClose();
        setTimeout(() => window.dispatchEvent(new CustomEvent('open-ai-guardian')), 300);
    };

    return (
        <AnimatePresence>
            {isOpen && (

                <div className="fixed inset-0 md:inset-auto md:top-24 md:right-8 z-[100] pointer-events-none flex items-center justify-center md:block">
                    <motion.div
                        drag
                        dragListener={false}
                        dragControls={dragControls}
                        dragMomentum={false}
                        whileDrag={{ scale: 1.02 }}
                        initial={{ opacity: 0, scale: 0.8, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -20 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="relative md:absolute md:top-0 md:right-0 w-[92vw] md:w-[480px] max-h-[85vh] md:max-h-[780px] bg-primary border border-accent/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col backdrop-blur-2xl pointer-events-auto"
                    >
                        {/* Compact Redesigned Header to match AIGuardian */}
                        <div
                            onPointerDown={(e) => dragControls.start(e)}
                            className="p-5 bg-gradient-to-r from-primary via-navy to-primary border-b border-accent/20 flex justify-between items-center shrink-0 cursor-move"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-accent flex items-center justify-center rounded-xl shadow-[0_0_15px_rgba(197,160,40,0.3)]">
                                    <CalendarClock className="text-primary" size={22} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-white font-serif font-black text-base tracking-tight leading-none">VIP Reservation</span>
                                    <span className="text-[9px] text-accent/70 font-black uppercase tracking-widest mt-1">Private Support</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={switchToAI}
                                    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-accent hover:bg-white/10 transition-all flex items-center gap-1.5"
                                >
                                    <span className="hidden sm:inline">AI Guardian</span>
                                    <ChevronRight size={12} />
                                </button>
                                <motion.button
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={onClose}
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all"
                                >
                                    <X size={18} strokeWidth={3} />
                                </motion.button>
                            </div>
                        </div>

                        <div className="p-8 md:p-10 overflow-hidden">
                            {step === 'form' ? (
                                <div className="space-y-6">
                                    {/* Strategy Selection Area (Redesigned for High-Readability) */}
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2.5 text-[11px] font-black text-accent/60 uppercase tracking-[0.2em] ml-1">
                                                <Briefcase size={13} /> Consultation Sector
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                {services.map(s => (
                                                    <button
                                                        key={s}
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, service: s })}
                                                        className={`py-2.5 px-3 rounded-xl text-[13px] font-bold transition-all border ${formData.service === s
                                                            ? "bg-accent text-primary border-accent shadow-[0_5px_15px_rgba(197,160,40,0.3)]"
                                                            : "bg-white/5 text-white/40 border-white/10 hover:border-white/20"}`}
                                                    >
                                                        {s.split(' ')[0]}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2.5 text-[11px] font-black text-accent/60 uppercase tracking-[0.2em] ml-1">
                                                <Clock size={13} /> Preferred Time
                                            </div>
                                            <div className="bg-white/5 rounded-xl p-2 border border-white/10 space-y-1.5">
                                                {times.map(t => (
                                                    <button
                                                        key={t}
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, time: t })}
                                                        className={`w-full py-2 rounded-lg text-[12px] font-bold transition-all ${formData.time === t
                                                            ? "bg-white/10 text-white shadow-lg"
                                                            : "text-white/30 hover:text-white/50"}`}
                                                    >
                                                        {t}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                                    {/* Identity Verification Area */}
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="grid gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-black text-accent/60 uppercase tracking-[0.2em] ml-1">Client Identity</label>
                                                <div className="relative group">
                                                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-colors" size={20} />
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder="성함을 입력하세요"
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4.5 pl-14 pr-8 text-white text-[16px] font-bold focus:outline-none focus:border-accent focus:bg-white/10 transition-all placeholder:text-white/20 shadow-inner"
                                                        value={formData.name}
                                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-[11px] font-black text-accent/60 uppercase tracking-[0.2em] ml-1">Contact Signal</label>
                                                    <div className="relative group">
                                                        <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-colors" size={20} />
                                                        <input
                                                            required
                                                            type="tel"
                                                            placeholder="연락처"
                                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4.5 pl-14 pr-5 text-white text-[16px] font-bold focus:outline-none focus:border-accent focus:bg-white/10 transition-all placeholder:text-white/20 shadow-inner"
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
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-[11px] font-black text-accent/60 uppercase tracking-[0.2em] ml-1">Email Secure</label>
                                                    <div className="relative group">
                                                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-colors" size={20} />
                                                        <input
                                                            required
                                                            type="email"
                                                            placeholder="이메일"
                                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4.5 pl-14 pr-5 text-white text-[16px] font-bold focus:outline-none focus:border-accent focus:bg-white/10 transition-all placeholder:text-white/20 shadow-inner"
                                                            value={formData.email}
                                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full py-5 bg-gradient-to-r from-accent to-[#D4AF37] text-primary font-black rounded-2xl mt-6 hover:opacity-90 transition-all shadow-[0_15px_30px_rgba(197,160,40,0.3)] flex items-center justify-center gap-4 active:scale-[0.98] group uppercase tracking-[0.2em] text-[16px]"
                                        >
                                            <span>상담 예약 확정하기</span>
                                            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </button>

                                        <div className="flex items-center justify-center gap-3 py-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                            <p className="text-[10px] text-white/30 font-bold uppercase tracking-[0.1em]">
                                                Premium Privacy protocols applied.
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            ) : (
                                <div className="py-10 text-center space-y-8">
                                    <div className="relative h-24 flex items-center justify-center">
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                                            className="w-26 h-26 bg-accent/10 border-2 border-accent/20 rounded-full flex items-center justify-center"
                                        >
                                            <ShieldCheck className="text-accent" size={52} />
                                        </motion.div>
                                        <motion.div
                                            animate={{ scale: [1, 1.3, 1], opacity: [0, 0.4, 0] }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                            className="absolute w-36 h-36 bg-accent/20 rounded-full blur-2xl"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <h2 className="text-[32px] font-serif font-black text-white tracking-tight leading-tight">예약이 접수되었습니다</h2>
                                        <div className="inline-block px-3.5 py-1.5 bg-accent/10 rounded-xl border border-accent/20">
                                            <span className="text-accent text-[12px] font-black tracking-widest uppercase">Ref. RSM-{Math.floor(Math.random() * 90000) + 10000}</span>
                                        </div>
                                        <p className="text-white/50 text-[16px] font-medium leading-relaxed max-w-[260px] mx-auto">
                                            <span className="text-accent font-black text-[18px]">{formData.name}</span> 회원님,<br />
                                            전문 가디언이 곧 연락드리겠습니다.
                                        </p>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="px-12 py-4 bg-white/5 text-white/80 font-black rounded-xl border border-white/10 hover:bg-white/10 transition-all active:scale-95 uppercase tracking-widest text-[11px]"
                                    >
                                        확인 및 닫기
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="p-5 bg-navy/60 border-t border-white/5 flex items-center justify-between">
                            <span className="text-[11px] text-white/20 font-black uppercase tracking-[0.4em]">HSM Luxury Wealth Guardian</span>
                            <div className="flex gap-2.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                                <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                                <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default LeadMagnet;
