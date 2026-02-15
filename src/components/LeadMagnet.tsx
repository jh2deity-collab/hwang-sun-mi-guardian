"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, ChevronRight, Download, Mail, Phone } from 'lucide-react';

interface LeadMagnetProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
}

const LeadMagnet = ({ isOpen, onClose, title = "프리미엄 자산 관리 가이드" }: LeadMagnetProps) => {
    const [step, setStep] = useState<'form' | 'success'>('form');
    const [formData, setFormData] = useState({ name: '', phone: '', email: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 실제 전송 로직 시뮬레이션
        setTimeout(() => setStep('success'), 800);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#020617]/90 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg bg-slate-900 border border-gold-500/30 rounded-3xl overflow-hidden shadow-2xl"
                    >
                        {/* Header Graphics */}
                        <div className="h-24 bg-gradient-to-r from-blue-900 to-slate-900 border-b border-gold-500/20 flex items-center px-8">
                            <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center">
                                <Download className="text-gold-500" size={24} />
                            </div>
                            <div className="ml-4">
                                <h3 className="text-gold-500 font-bold text-lg leading-tight uppercase tracking-wider">Lead Magnet</h3>
                                <p className="text-slate-400 text-xs">Premium Resource Access</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="ml-auto p-2 text-slate-500 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-8">
                            {step === 'form' ? (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <h2 className="text-2xl font-bold text-slate-100">{title} 신청</h2>
                                        <p className="text-slate-400 text-sm leading-relaxed">
                                            황선미 가디언의 하이엔드 자산 관리 노하우가 담긴 리포트를 발송해 드립니다.
                                            아래 정보를 입력해 주시면 전문가가 직접 전송해 드립니다.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-gold-500/70 uppercase tracking-widest pl-1">Name</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="성함을 입력하세요"
                                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-slate-100 focus:outline-none focus:border-gold-500 transition-all"
                                                    value={formData.name}
                                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-gold-500/70 uppercase tracking-widest pl-1">Phone</label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                                <input
                                                    required
                                                    type="tel"
                                                    placeholder="연락처를 입력하세요"
                                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-slate-100 focus:outline-none focus:border-gold-500 transition-all"
                                                    value={formData.phone}
                                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-gold-500/70 uppercase tracking-widest pl-1">Email</label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                                <input
                                                    required
                                                    type="email"
                                                    placeholder="이메일을 입력하세요"
                                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-slate-100 focus:outline-none focus:border-gold-500 transition-all"
                                                    value={formData.email}
                                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full py-4 bg-gold-500 text-blue-900 font-bold rounded-xl mt-4 hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/20 flex items-center justify-center gap-2"
                                        >
                                            확인 및 신청하기 <ChevronRight size={20} />
                                        </button>

                                        <p className="text-[10px] text-slate-500 text-center">
                                            제공해주신 정보는 리포트 발송 및 전문 상담 안내를 위해서만 사용됩니다.
                                        </p>
                                    </form>
                                </div>
                            ) : (
                                <div className="py-12 text-center space-y-6">
                                    <div className="w-20 h-20 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', damping: 10 }}
                                        >
                                            <ShieldCheck className="text-green-500" size={40} />
                                        </motion.div>
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-2xl font-bold text-slate-100">신청이 완료되었습니다</h2>
                                        <p className="text-slate-400 text-sm leading-relaxed">
                                            {formData.name} 회원님, 소중한 정보를 남겨주셔서 감사합니다.<br />
                                            곧 입력하신 정보를 통해 프리미엄 가이드와 함께<br />
                                            전문가의 맞춤 상담 안내를 드리겠습니다.
                                        </p>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="px-8 py-3 bg-slate-800 text-slate-100 rounded-xl border border-slate-700 hover:bg-slate-700 transition-all"
                                    >
                                        닫기
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="p-4 bg-slate-800/50 border-t border-gold-500/10 text-center">
                            <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">Hwang Sun Mi - Wealth Guardian</span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

// Lucide icon dependency for Success state
const ShieldCheck = ({ size, className }: { size: number, className: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
    </svg>
);

export default LeadMagnet;
