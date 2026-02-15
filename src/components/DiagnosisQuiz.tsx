"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Shield, Target, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import LeadMagnet from "./LeadMagnet";

const questions = [
    {
        q: "자산을 운용할 때 당신이 가장 중요하게 생각하는 것은?",
        options: [
            { text: "잃지 않는 안전함", type: "Guardian" },
            { text: "시장보다 높은 수익", type: "Hunter" },
            { text: "예측 가능한 현금 흐름", type: "Strategist" },
            { text: "자녀에게 물려줄 유산", type: "Legacy" }
        ]
    },
    {
        q: "갑작스러운 시장 폭락 시 당신의 반응은?",
        options: [
            { text: "불안해서 즉시 매도", type: "Guardian" },
            { text: "저점 매수 기회로 활용", type: "Hunter" },
            { text: "계획대로 포트폴리오 유지", type: "Strategist" },
            { text: "전문가에게 즉시 자문", type: "Legacy" }
        ]
    },
    {
        q: "당신의 금융 목표 중 가장 우선순위는?",
        options: [
            { text: "내 집 마련 및 부채 상환", type: "Guardian" },
            { text: "경제적 자유와 조기 은퇴", type: "Hunter" },
            { text: "체계적인 자녀 교육 및 상속", type: "Legacy" },
            { text: "자산 효율화 및 절세 상담", type: "Strategist" }
        ]
    }
];

const results = {
    Guardian: {
        title: "안정형 가디언",
        desc: "불확실성보다는 확실한 원금 보존과 안정적인 자산 방어를 중시합니다.",
        tag: "Safety First",
        icon: <Shield className="w-12 h-12 text-accent" />
    },
    Hunter: {
        title: "수익형 헌터",
        desc: "적극적인 시장 참여와 기회 포착을 통해 자산의 폭발적 성장을 추구합니다.",
        tag: "Aggressive Growth",
        icon: <Zap className="w-12 h-12 text-accent" />
    },
    Strategist: {
        title: "설계형 전략가",
        desc: "정교한 포트폴리오 분산과 리스크 관리를 통해 합리적인 부를 축적합니다.",
        tag: "Optimized Balance",
        icon: <Target className="w-12 h-12 text-accent" />
    },
    Legacy: {
        title: "철학형 레거시",
        desc: "나의 자산이 다음 세대까지 온전히 이어지는 가문의 번영을 계획합니다.",
        tag: "Succession Wise",
        icon: <Sparkles className="w-12 h-12 text-accent" />
    }
};

export default function DiagnosisQuiz() {
    const [currentIdx, setCurrentIdx] = useState(-1); // -1: Intro, 0~N: Quiz, -2: Result
    const [answers, setAnswers] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("무료 1:1 심층 상담");

    const openModalWithTitle = (title: string) => {
        setModalTitle(title);
        setIsModalOpen(true);
    };

    const startQuiz = () => setCurrentIdx(0);

    const handleAnswer = (type: string) => {
        const newAnswers = [...answers, type];
        if (currentIdx < questions.length - 1) {
            setAnswers(newAnswers);
            setCurrentIdx(currentIdx + 1);
        } else {
            // Calculate Result
            const counts = newAnswers.reduce((acc: any, cur) => {
                acc[cur] = (acc[cur] || 0) + 1;
                return acc;
            }, {});
            const topType = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
            setAnswers([topType]);
            setCurrentIdx(-2);
        }
    };

    return (
        <section className="section-padding bg-white relative overflow-hidden">
            {/* Artistic Background Patterns */}
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none -z-10">
                <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-accent rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2" />
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-[4rem] shadow-premium border border-primary/5 overflow-hidden backdrop-blur-sm">
                        <AnimatePresence mode="wait">
                            {currentIdx === -1 && (
                                <motion.div
                                    key="intro"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="p-16 md:p-28 text-center space-y-12"
                                >
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-center gap-3">
                                            <div className="w-6 h-[1px] bg-accent" />
                                            <span className="text-accent font-black uppercase tracking-[0.5em] text-[10px]">Asset Archetype Quiz</span>
                                            <div className="w-6 h-[1px] bg-accent" />
                                        </div>
                                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-primary leading-[1.15]">
                                            <span className="text-[1.2em]">당신의 금융 <span className="text-gold-shine italic">정체성</span> 은<br />무엇입니까?</span>
                                        </h3>
                                        <p className="text-lg md:text-xl text-primary/50 font-medium max-w-lg mx-auto leading-relaxed border-t border-accent/10 pt-8 mt-8">
                                            정교한 3가지 질문을 통해 당신의 잠재된 자산 운용 성향을 진단하고, 상위 1%를 위한 전문가 맞춤 제언을 확인해 보세요.
                                        </p>
                                    </div>
                                    <button
                                        onClick={startQuiz}
                                        className="btn-premium btn-premium-primary py-6 px-12 mx-auto text-base"
                                    >
                                        <span className="text-[1.2em]">진단 시작하기</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            )}

                            {currentIdx >= 0 && (
                                <motion.div
                                    key="quiz"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="p-12 md:p-20 space-y-12"
                                >
                                    <div className="flex justify-between items-end">
                                        <p className="text-accent font-black text-[10px] tracking-widest uppercase">Question {currentIdx + 1} / {questions.length}</p>
                                        <div className="flex gap-2">
                                            {questions.map((_, i) => (
                                                <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i <= currentIdx ? 'w-8 bg-accent' : 'w-4 bg-silver'}`} />
                                            ))}
                                        </div>
                                    </div>
                                    <h4 className="text-2xl md:text-3xl font-serif font-black text-primary inline-block relative">
                                        {questions[currentIdx].q}
                                    </h4>
                                    <div className="grid gap-4">
                                        {questions[currentIdx].options.map((opt, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleAnswer(opt.type)}
                                                className="w-full text-left px-8 py-6 bg-silver/30 rounded-2xl hover:bg-primary hover:text-white transition-all duration-300 font-bold text-lg flex items-center justify-between group"
                                            >
                                                {opt.text}
                                                <CheckCircle2 className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {currentIdx === -2 && (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="p-16 md:p-24 text-center space-y-12"
                                >
                                    <div className="flex justify-center">{results[answers[0] as keyof typeof results].icon}</div>
                                    <div className="space-y-4">
                                        <span className="text-accent font-black uppercase tracking-[0.3em] text-[10px] bg-accent/10 px-4 py-1 rounded-full">
                                            {results[answers[0] as keyof typeof results].tag}
                                        </span>
                                        <h3 className="text-4xl font-serif font-black text-primary">
                                            {results[answers[0] as keyof typeof results].title}
                                        </h3>
                                        <p className="text-xl text-primary/60 font-medium max-w-lg mx-auto leading-relaxed">
                                            {results[answers[0] as keyof typeof results].desc}
                                        </p>
                                    </div>
                                    <div className="pt-8 border-t border-primary/5 flex flex-col md:flex-row gap-4 justify-center">
                                        <button
                                            onClick={() => openModalWithTitle("진단 결과 상세 리포트")}
                                            className="btn-premium btn-premium-outline py-5 px-10"
                                        >
                                            <span className="text-[1.2em]">상세 리포트 이메일로 받기</span>
                                        </button>
                                        <button
                                            onClick={() => openModalWithTitle("무료 1:1 심층 상담")}
                                            className="btn-premium btn-premium-primary py-5 px-10"
                                        >
                                            무료 1:1 심층 <span className="text-[1.2em]">상담</span> 신청
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <LeadMagnet
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalTitle}
            />
        </section>
    );
}
