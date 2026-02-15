"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Calculator, Send, TrendingUp, ShieldCheck, User, Mail, ArrowRight, Download } from 'lucide-react';
import { calculateGiftTax, simulateAssetGrowth } from '@/lib/calculator';
import LeadMagnet from './LeadMagnet';

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const AIGuardian = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'chat' | 'calc'>('chat');
    const [messages, setMessages] = useState([
        { role: 'assistant', content: '안녕하세요, 황선미 가디언의 AI 어드바이저입니다. 자산 관리나 보험 설계에 대해 궁금한 점이 있으신가요?' }
    ]);
    const [input, setInput] = useState('');

    // 시뮬레이터 상태
    const [assetAmount, setAssetAmount] = useState(100000000); // 1억
    const [growthRate, setGrowthRate] = useState(5); // 5%
    const [period, setPeriod] = useState(10); // 10년
    const [calcResult, setCalcResult] = useState<any>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    // 상시 상담 신청 모달 상태
    const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
    const [leadTitle, setLeadTitle] = useState("");

    const scrollRef = useRef<HTMLDivElement>(null);
    const reportRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (!input.trim()) return;
        const newMessages = [...messages, { role: 'user', content: input }];
        setMessages(newMessages);
        setInput('');

        setTimeout(() => {
            let response = "금융 전문가로서 고객님의 상황을 면밀히 검토해드리고 싶습니다. 구체적인 자산 현황이나 가족 관계를 말씀해주시면 더 정확한 안내가 가능합니다.";
            if (input.includes('증여') || input.includes('세금')) {
                response = "증여세는 공제 한도와 자산 종류에 따라 전략이 크게 달라집니다. 오른쪽 '계산기' 탭에서 대략적인 세액과 미래 가치를 확인해보시겠어요? 상세한 절세 플랜은 대면 상담을 추천드립니다.";
            } else if (input.includes('상담') || input.includes('연락')) {
                response = "상담 신청을 원하시는군요. 성함과 연락처를 남겨주시거나 하단의 '상담 신청' 버튼을 클릭해주시면 황선미 팀장이 직접 연락드리겠습니다.";
            }
            setMessages([...newMessages, { role: 'assistant', content: response }]);
        }, 1000);
    };

    const runSimulation = () => {
        const giftTax = calculateGiftTax(assetAmount);
        const growth = simulateAssetGrowth(assetAmount, 0, growthRate, period);
        setCalcResult({
            ...giftTax,
            ...growth,
            principal: assetAmount,
            rate: growthRate,
            period: period
        });
    };

    const openLeadModal = (title: string) => {
        setLeadTitle(title);
        setIsLeadModalOpen(true);
    };

    const downloadPDF = async () => {
        if (!calcResult || isGenerating) return;
        setIsGenerating(true);

        try {
            const doc = new jsPDF('p', 'mm', 'a4');
            const pageWidth = doc.internal.pageSize.getWidth();

            // 프리미엄 리포트 디자인 (수동 구축)
            doc.setFillColor(26, 43, 75); // Blue 900
            doc.rect(0, 0, pageWidth, 40, 'F');

            doc.setTextColor(212, 175, 55); // Gold
            doc.setFontSize(22);
            doc.text('FUTURE VALUE REPORT', pageWidth / 2, 20, { align: 'center' });
            doc.setFontSize(10);
            doc.text('BY HWANG SUN MI - WEALTH GUARDIAN', pageWidth / 2, 30, { align: 'center' });

            doc.setTextColor(40, 40, 40);
            doc.setFontSize(14);
            doc.text('1. Simulation Summary', 20, 60);
            doc.setFontSize(11);
            doc.text(`- Initial Assets: ${calcResult.principal.toLocaleString()} KRW`, 25, 75);
            doc.text(`- Annual Growth Rate: ${calcResult.rate}%`, 25, 85);
            doc.text(`- Strategy Period: ${calcResult.period} Years`, 25, 95);

            doc.setFontSize(14);
            doc.text('2. Estimated Results', 20, 115);
            doc.setFontSize(12);
            doc.setTextColor(26, 43, 75);
            doc.text(`Expected Gift Tax: ${calcResult.tax.toLocaleString()} KRW`, 25, 130);
            doc.setFontSize(16);
            doc.setTextColor(184, 134, 11);
            doc.text(`Future Market Value: ${calcResult.finalBalance.toLocaleString()} KRW`, 25, 145);

            doc.setDrawColor(212, 175, 55);
            doc.setLineWidth(0.5);
            doc.line(20, 160, pageWidth - 20, 160);

            doc.setTextColor(100, 100, 100);
            doc.setFontSize(9);
            const disclaimer = "* This report is a simulation based on current tax laws and assumed interest rates.\n  Actual results may vary significantly based on legal changes and market fluctuations.";
            doc.text(disclaimer, 20, 175);

            doc.setFillColor(245, 245, 245);
            doc.rect(20, 195, pageWidth - 40, 40, 'F');
            doc.setTextColor(26, 43, 75);
            doc.setFontSize(11);
            doc.text('Consultation Inquiry: 010.8673.4589', pageWidth / 2, 215, { align: 'center' });
            doc.text('Tailored asset succession strategy is available.', pageWidth / 2, 225, { align: 'center' });

            doc.save(`Wealth_Guardian_Report_${new Date().getTime()}.pdf`);
        } catch (error) {
            console.error('PDF Generation Failed:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-50">
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 bg-blue-900 text-gold-500 rounded-full shadow-2xl flex items-center justify-center border-2 border-gold-500/50 backdrop-blur-md"
            >
                {isOpen ? <X size={32} /> : <MessageSquare size={32} />}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="absolute bottom-20 right-0 w-96 max-h-[650px] bg-slate-900 border border-gold-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        <div className="p-4 bg-gradient-to-r from-blue-900 to-slate-900 border-b border-gold-500/20 flex justify-between items-center shrink-0">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="text-gold-500" size={20} />
                                <span className="text-gold-100 font-semibold truncate">AI Guardian Advisor</span>
                            </div>
                            <div className="flex bg-slate-800/50 rounded-lg p-1">
                                <button
                                    onClick={() => setActiveTab('chat')}
                                    className={`px-3 py-1 rounded-md text-xs transition-all ${activeTab === 'chat' ? 'bg-gold-500 text-blue-900' : 'text-slate-400 font-medium'}`}
                                >
                                    상담
                                </button>
                                <button
                                    onClick={() => setActiveTab('calc')}
                                    className={`px-3 py-1 rounded-md text-xs transition-all ${activeTab === 'calc' ? 'bg-gold-500 text-blue-900' : 'text-slate-400 font-medium'}`}
                                >
                                    시뮬레이터
                                </button>
                            </div>
                        </div>

                        {activeTab === 'chat' ? (
                            <>
                                <div ref={scrollRef} className="h-96 p-4 overflow-y-auto space-y-4 scrollbar-hide">
                                    {messages.map((msg, i) => (
                                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-gold-500 text-blue-900 rounded-tr-none' : 'bg-slate-800 text-slate-100 border border-slate-700 rounded-tl-none'}`}>
                                                {msg.content}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 border-t border-slate-800 flex gap-2">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                        placeholder="질문을 입력하세요..."
                                        className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-gold-500"
                                    />
                                    <button onClick={handleSendMessage} className="p-2 bg-gold-500 text-blue-900 rounded-xl hover:bg-gold-400 transition-colors">
                                        <Send size={20} />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 p-6 overflow-y-auto space-y-6 scrollbar-hide">
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase tracking-widest text-gold-500/70 font-bold ml-1">Asset Amount</label>
                                        <input
                                            type="number"
                                            value={assetAmount}
                                            onChange={(e) => setAssetAmount(Number(e.target.value))}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-lg text-slate-100 focus:outline-none focus:border-gold-500"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase tracking-widest text-gold-500/70 font-bold ml-1">Annual Rate (%)</label>
                                            <input
                                                type="number"
                                                value={growthRate}
                                                onChange={(e) => setGrowthRate(Number(e.target.value))}
                                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-gold-500"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase tracking-widest text-gold-500/70 font-bold ml-1">Period (Years)</label>
                                            <input
                                                type="number"
                                                value={period}
                                                onChange={(e) => setPeriod(Number(e.target.value))}
                                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-gold-500"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        onClick={runSimulation}
                                        className="w-full py-4 bg-blue-900 text-gold-500 border border-gold-500/50 rounded-xl hover:bg-blue-800 transition-all font-bold shadow-xl shadow-gold-500/5 flex items-center justify-center gap-2"
                                    >
                                        <Calculator size={18} /> 시뮬레이션 실행
                                    </button>
                                </div>

                                {calcResult && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-4"
                                    >
                                        <div className="p-5 bg-slate-800/80 rounded-2xl border border-gold-500/30 space-y-4 shadow-inner">
                                            <div className="flex justify-between items-center text-xs border-b border-slate-700 pb-2">
                                                <span className="text-slate-400">예상 증여세</span>
                                                <span className="text-slate-100 font-bold">{calcResult.tax.toLocaleString()}원</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[10px] text-gold-500/70 uppercase tracking-widest font-black">Future Value Prediction</span>
                                                <span className="text-2xl font-black text-gold-500 tracking-tighter">{calcResult.finalBalance.toLocaleString()}원</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <button
                                                onClick={downloadPDF}
                                                disabled={isGenerating}
                                                className="flex-1 py-3 bg-slate-100 text-blue-900 font-black rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2 text-[10px] uppercase tracking-wider border border-gold-500/20 shadow-lg disabled:opacity-50"
                                            >
                                                PDF 다운로드 <Download size={14} />
                                            </button>
                                            <button
                                                onClick={() => openLeadModal("미래 가치 리포트 이메일 발송")}
                                                className="flex-1 py-3 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-500 transition-all flex items-center justify-center gap-2 text-[10px] uppercase tracking-wider shadow-lg"
                                            >
                                                이메일로 받기 <Mail size={14} />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => openLeadModal("1:1 심층 자산 경영 상담")}
                                            className="w-full py-4 bg-gradient-to-r from-gold-600 to-gold-400 text-blue-950 font-black rounded-xl hover:from-gold-500 hover:to-gold-300 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-[0.1em] shadow-xl shadow-gold-500/20"
                                        >
                                            무료 1:1 심층 상담 신청 <ArrowRight size={16} />
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        )}

                        <div className="p-3 bg-slate-900 border-t border-slate-800 flex justify-center shrink-0">
                            <span className="text-[9px] text-slate-500 uppercase tracking-widest">
                                Private Wealth Guardian - HSM
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <LeadMagnet
                isOpen={isLeadModalOpen}
                onClose={() => setIsLeadModalOpen(false)}
                title={leadTitle}
            />
        </div>
    );
};

export default AIGuardian;
