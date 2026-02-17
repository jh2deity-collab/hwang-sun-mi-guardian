"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { MessageSquare, X, Calculator, Send, TrendingUp, ShieldCheck, User, Mail, ArrowRight, Download, Mic, MicOff } from 'lucide-react';
import { calculateGiftTax, simulateAssetGrowth } from '@/lib/calculator';
import LeadMagnet from './LeadMagnet';
import ReportTemplate from './ReportTemplate';

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

    const [isTyping, setIsTyping] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<any>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const reportRef = useRef<HTMLDivElement>(null);

    const dragControls = useDragControls();

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSendMessage = async () => {
        if (!input.trim() || isTyping) return;

        const userMessage = { role: 'user', content: input };
        const newMessages = [...messages, userMessage];

        setMessages(newMessages);
        setInput('');
        setIsTyping(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: newMessages.map(m => ({ role: m.role, content: m.content }))
                }),
            });

            if (!response.ok) throw new Error('API 호출 실패');

            const data = await response.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
        } catch (error) {
            console.error('Chat Error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: '죄송합니다. 서버와 통신 중 오류가 발생했습니다. 잠시 후 다시 시도해주시거나, 상담 예약 버튼을 이용해주세요.'
            }]);
        } finally {
            setIsTyping(false);
        }
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
            // 렌더링을 위한 잠시 대기 (DOM에 반영되도록)
            await new Promise(resolve => setTimeout(resolve, 100));

            const element = document.getElementById('premium-report-template');
            if (!element) throw new Error('템플릿을 찾을 수 없습니다.');

            const canvas = await html2canvas(element, {
                scale: 3, // 고해상도 캡처
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Wealth_Guardian_Report_${new Date().getTime()}.pdf`);
        } catch (error) {
            console.error('PDF Generation Failed:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
            return;
        }

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert('이 브라우저는 음성 인식을 지원하지 않습니다. 크롬이나 사파리를 이용해주세요.');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'ko-KR';
        recognition.interimResults = true;
        recognition.continuous = false;

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onresult = (event: any) => {
            const transcript = Array.from(event.results)
                .map((result: any) => result[0])
                .map((result: any) => result.transcript)
                .join('');
            setInput(transcript);
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
        };

        recognitionRef.current = recognition;
        recognition.start();
    };

    useEffect(() => {
        return () => {
            recognitionRef.current?.stop();
        };
    }, []);

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener('open-ai-guardian', handleOpen);
        return () => window.removeEventListener('open-ai-guardian', handleOpen);
    }, []);

    return (
        <div className="fixed inset-0 md:inset-auto md:bottom-8 md:right-8 z-50 pointer-events-none flex items-end justify-center md:block overflow-hidden">
            <div className="pointer-events-auto w-full md:w-auto flex justify-center md:block">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            drag={typeof window !== 'undefined' && window.innerWidth > 768 ? true : false}
                            dragListener={false}
                            dragControls={dragControls}
                            dragMomentum={false}
                            whileDrag={{ scale: 1.02 }}
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 50 }}
                            className="relative md:absolute md:bottom-20 md:right-0 w-full md:w-[480px] h-[92svh] md:h-[780px] max-h-[92svh] md:max-h-[780px] bg-primary border-x-0 md:border border-t border-accent/30 rounded-t-[2.5rem] md:rounded-3xl shadow-2xl overflow-hidden flex flex-col backdrop-blur-2xl pointer-events-auto"
                        >
                            <div
                                onPointerDown={(e) => {
                                    if (typeof window !== 'undefined' && window.innerWidth > 768) {
                                        dragControls.start(e);
                                    }
                                }}
                                className="p-5 bg-gradient-to-r from-primary via-navy to-primary border-b border-accent/20 flex justify-between items-center shrink-0 cursor-default md:cursor-move"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 bg-accent flex items-center justify-center rounded-xl shadow-[0_0_15px_rgba(197,160,40,0.3)]">
                                        <ShieldCheck className="text-primary" size={22} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-white font-serif font-black text-base tracking-tight leading-none">Guardian Advisor</span>
                                        <span className="text-[9px] text-accent/70 font-black uppercase tracking-widest mt-1">Live Support</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex bg-white/5 rounded-xl p-1 border border-white/10 backdrop-blur-md">
                                        <button
                                            onClick={() => setActiveTab('chat')}
                                            className={`px-4 py-1.5 rounded-lg text-[11px] font-black transition-all ${activeTab === 'chat' ? 'bg-accent text-primary shadow-md' : 'text-white/40 hover:text-white'}`}
                                        >
                                            상담
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('calc')}
                                            className={`px-4 py-1.5 rounded-lg text-[11px] font-black transition-all ${activeTab === 'calc' ? 'bg-accent text-primary shadow-md' : 'text-white/40 hover:text-white'}`}
                                        >
                                            시뮬레이터
                                        </button>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.1, rotate: 90 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setIsOpen(false)}
                                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all"
                                    >
                                        <X size={18} strokeWidth={3} />
                                    </motion.button>
                                </div>
                            </div>

                            {activeTab === 'chat' ? (
                                <>
                                    <div ref={scrollRef} className="flex-1 min-h-0 p-5 overflow-y-auto space-y-4 scrollbar-hide bg-navy/30">
                                        {messages.map((msg, i) => (
                                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`max-w-[85%] p-4 rounded-2xl text-[15px] leading-relaxed shadow-lg ${msg.role === 'user'
                                                    ? 'bg-accent text-primary font-bold rounded-tr-none'
                                                    : 'bg-white/10 text-white border border-white/10 rounded-tl-none backdrop-blur-sm'}`}>
                                                    {msg.content}
                                                </div>
                                            </div>
                                        ))}
                                        {isTyping && (
                                            <div className="flex justify-start">
                                                <div className="max-w-[80%] p-4 rounded-2xl text-sm bg-white/5 text-white/50 border border-white/10 rounded-tl-none flex items-center gap-2 backdrop-blur-sm">
                                                    <motion.div
                                                        animate={{ opacity: [0.4, 1, 0.4] }}
                                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                                    >
                                                        가디언이 답변을 작성 중입니다...
                                                    </motion.div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-5 pb-10 md:pb-5 border-t border-white/10 flex gap-2 bg-primary shrink-0 relative z-20 shadow-[0_-10px_20px_rgba(0,0,0,0.2)]">
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                            placeholder={isListening ? "말씀해 주세요..." : (isTyping ? "답변을 기다리는 중..." : "질문을 입력하세요...")}
                                            disabled={isTyping}
                                            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent disabled:opacity-50 transition-all font-medium"
                                        />
                                        <button
                                            onClick={toggleListening}
                                            className={`p-3 rounded-2xl transition-all flex items-center justify-center shrink-0 shadow-lg ${isListening
                                                ? 'bg-red-500 text-white animate-pulse shadow-red-500/40'
                                                : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10 border border-white/10'
                                                }`}
                                        >
                                            {isListening ? <MicOff size={22} /> : <Mic size={22} />}
                                        </button>
                                        <button
                                            onClick={handleSendMessage}
                                            disabled={isTyping || !input.trim()}
                                            className="p-3 bg-accent text-primary rounded-2xl hover:bg-accent/80 transition-all disabled:opacity-30 shadow-lg shadow-accent/20 flex items-center justify-center shrink-0"
                                        >
                                            <Send size={22} strokeWidth={2.5} />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="flex-1 p-6 overflow-y-auto space-y-6 scrollbar-hide bg-navy/30">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-[11px] uppercase tracking-[0.2em] text-accent font-black ml-1">현재 보유 자산 (원)</label>
                                            <input
                                                type="text"
                                                value={assetAmount.toLocaleString()}
                                                onChange={(e) => {
                                                    const val = e.target.value.replace(/[^0-9]/g, "");
                                                    setAssetAmount(Number(val));
                                                }}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-2xl font-serif font-black text-white focus:outline-none focus:border-accent transition-all"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[11px] uppercase tracking-[0.2em] text-accent/70 font-black ml-1">예상 수익률 (%)</label>
                                                <input
                                                    type="number"
                                                    value={growthRate}
                                                    onChange={(e) => setGrowthRate(Number(e.target.value))}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-base font-bold text-white focus:outline-none focus:border-accent transition-all"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[11px] uppercase tracking-[0.2em] text-accent/70 font-black ml-1">운용 기간 (년)</label>
                                                <input
                                                    type="number"
                                                    value={period}
                                                    onChange={(e) => setPeriod(Number(e.target.value))}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-base font-bold text-white focus:outline-none focus:border-accent transition-all"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            onClick={runSimulation}
                                            className="w-full py-5 bg-navy text-accent border border-accent/40 rounded-2xl hover:bg-navy/80 transition-all font-black shadow-xl shadow-accent/5 flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
                                        >
                                            <Calculator size={20} /> 시뮬레이션 실행
                                        </button>
                                    </div>

                                    {calcResult && (
                                        <div className="space-y-3">
                                            <div className="p-6 bg-white/5 border border-accent/20 rounded-[2rem] space-y-5 shadow-inner backdrop-blur-xl relative overflow-hidden group">
                                                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <div className="flex justify-between items-center text-[10px] border-b border-white/5 pb-3">
                                                    <span className="text-accent/60 font-black uppercase tracking-[0.2em]">Expected Gift Tax</span>
                                                    <span className="text-white font-black">{calcResult.tax.toLocaleString()}원</span>
                                                </div>
                                                <div className="flex flex-col gap-2 relative z-10">
                                                    <span className="text-[10px] text-accent font-black uppercase tracking-[0.2em]">Future Value Prediction</span>
                                                    <div className="flex items-baseline gap-1">
                                                        <span className="text-4xl font-serif font-black text-white tracking-tighter leading-none">{calcResult.finalBalance.toLocaleString()}</span>
                                                        <span className="text-sm font-bold text-accent">원</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                <button
                                                    onClick={downloadPDF}
                                                    disabled={isGenerating}
                                                    className="flex-1 py-4 bg-white/5 text-white/80 font-black rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] border border-white/10 disabled:opacity-50 active:scale-95"
                                                >
                                                    PDF 다운로드 <Download size={15} />
                                                </button>
                                                <button
                                                    onClick={() => openLeadModal("미래 가치 리포트 이메일 발송")}
                                                    className="flex-1 py-4 bg-blue-600/20 text-blue-400 font-black rounded-2xl hover:bg-blue-600/30 transition-all flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] border border-blue-500/30 active:scale-95"
                                                >
                                                    이메일 전송 <Mail size={15} />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => openLeadModal("1:1 심층 자산 경영 상담")}
                                                className="w-full py-5 bg-gradient-to-r from-accent to-[#D4AF37] text-primary font-black rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] shadow-[0_15px_30px_rgba(197,160,40,0.2)] active:scale-95 mt-4"
                                            >
                                                무료 1:1 심층 <span className="text-[1.2em]">상담</span> 신청 <ArrowRight size={18} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="hidden md:flex p-4 bg-primary border-t border-white/5 justify-center shrink-0">
                                <span className="text-[9px] text-white/20 font-black uppercase tracking-[0.4em]">
                                    Strategic Wealth Guardian - Advisor
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
                {/* Hidden PDF Template Container */}
                {calcResult && (
                    <div className="fixed -left-[10000px] top-0 overflow-hidden print:static print:left-0">
                        <ReportTemplate data={calcResult} />
                    </div>
                )}
            </div>
        </div >
    );
};

export default AIGuardian;
