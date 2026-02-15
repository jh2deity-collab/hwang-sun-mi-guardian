"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Brain,
    Target,
    ShieldCheck,
    ArrowRight,
    RefreshCcw,
    FileText,
    TrendingUp,
    PieChart,
    Zap,
    ChevronRight,
    Sparkles
} from "lucide-react";
import { simulateAssetGrowth } from "@/lib/calculator";
import LeadMagnet from "./LeadMagnet";

type SimStep = "intro" | "data" | "concerns" | "analysis" | "result";

export default function AISimulator() {
    const [step, setStep] = useState<SimStep>("intro");
    const [data, setData] = useState({
        age: 35,
        targetAge: 60,
        currentAssets: 100000000,
        monthlySaving: 2000000,
        concern: "inflation", // inflation, market, tax, legacy
    });

    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [simulationResult, setSimulationResult] = useState<{
        finalBalance: number;
        history: { year: number; balance: number }[];
    } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("AI 맞춤 자산 관리 상담");

    const openModalWithTitle = (title: string) => {
        setModalTitle(title);
        setIsModalOpen(true);
    };

    // AI Feedback Logic based on data
    const aiInsight = useMemo(() => {
        const yearsRemaining = data.targetAge - data.age;
        if (yearsRemaining < 10) return "시간적 자산이 부족한 단계입니다. 공격적인 자산 증식보다는 방어 중심의 '안전 벨트' 전략이 시급합니다.";
        if (data.monthlySaving > 5000000) return "훌륭한 자본 체력을 보유하고 계십니다. 다만, 단순 저축을 넘어 세금 최적화를 통한 '절세 유동성' 확보가 핵심입니다.";
        return "자산의 성격에 맞춘 포트폴리오 재구성이 필요한 시점입니다. 인플레이션을 방어하는 전략적인 자산 배치가 동반되어야 합니다.";
    }, [data]);

    const handleNext = (nextStep: SimStep) => {
        if (nextStep === "analysis") {
            setIsAnalyzing(true);

            // 시뮬레이션 실행 (연 수익률 6% 가정)
            const years = data.targetAge - data.age;
            const res = simulateAssetGrowth(data.currentAssets, data.monthlySaving * 12, 6, years);
            setSimulationResult(res);

            setTimeout(() => {
                setIsAnalyzing(false);
                setStep("result");
            }, 2500);
        }
        setStep(nextStep);
    };

    const formatKRW = (val: number) => {
        if (val >= 100000000) return `${(val / 100000000).toFixed(1)}억 원`;
        return `${(val / 10000).toLocaleString()}만 원`;
    };

    // 프리미엄 SVG 차트 렌더러
    const AssetChart = ({ history }: { history: { year: number; balance: number }[] }) => {
        const padding = 40;
        const width = 400;
        const height = 200;

        const maxBalance = Math.max(...history.map(h => h.balance));
        const minBalance = Math.min(...history.map(h => h.balance));
        const range = maxBalance - minBalance;

        const points = history.map((h, i) => {
            const x = padding + (i / (history.length - 1)) * (width - padding * 2);
            const y = (height - padding) - ((h.balance - minBalance) / range) * (height - padding * 2);
            return `${x},${y}`;
        }).join(" ");

        const areaPoints = ` ${padding},${height - padding} ${points} ${width - padding},${height - padding}`;

        return (
            <div className="w-full bg-slate-50/50 rounded-2xl p-4 border border-slate-100 shadow-inner overflow-hidden">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Asset Growth Projection</span>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        <span className="text-[10px] font-bold text-accent">Real-time AI Analysis</span>
                    </div>
                </div>
                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto drop-shadow-lg">
                    {/* Grid Lines */}
                    {[0, 1, 2, 3].map(i => (
                        <line
                            key={i}
                            x1={padding}
                            y1={padding + (i * (height - padding * 2) / 3)}
                            x2={width - padding}
                            y2={padding + (i * (height - padding * 2) / 3)}
                            stroke="#e2e8f0"
                            strokeWidth="0.5"
                            strokeDasharray="4 4"
                        />
                    ))}

                    {/* Area Gradient */}
                    <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    <motion.polyline
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        points={areaPoints}
                        fill="url(#chartGradient)"
                    />

                    {/* Line Animation */}
                    <motion.polyline
                        fill="none"
                        stroke="#d4af37"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={points}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    />

                    {/* Points */}
                    {history.map((h, i) => {
                        if (i === 0 || i === history.length - 1) {
                            const x = padding + (i / (history.length - 1)) * (width - padding * 2);
                            const y = (height - padding) - ((h.balance - minBalance) / range) * (height - padding * 2);
                            return (
                                <motion.circle
                                    key={i}
                                    cx={x}
                                    cy={y}
                                    r="4"
                                    fill={i === 0 ? "#1e293b" : "#d4af37"}
                                    stroke="white"
                                    strokeWidth="2"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 1.5 + (i * 0.1) }}
                                />
                            );
                        }
                        return null;
                    })}
                </svg>
                <div className="flex justify-between mt-2 px-6">
                    <span className="text-[9px] font-bold text-slate-400">{data.age}세 (현재)</span>
                    <span className="text-[9px] font-bold text-slate-400">{data.targetAge}세 (목표)</span>
                </div>
            </div>
        );
    };

    return (
        <section id="ai-simulator" className="section-padding bg-ivory-texture relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -z-10 blur-3xl opacity-50" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-accent/5 -z-10 blur-3xl opacity-30" />

            <div className="container mx-auto px-6 md:px-12">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16 space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20">
                            <Sparkles className="w-3 h-3 text-accent" />
                            <span className="text-[10px] font-black text-accent uppercase tracking-widest">AI Financial Guardian</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-primary tracking-tight leading-[1.15]">
                            데이터로 설계하는 <br />
                            <span className="text-accent italic">당신의 미래 가치</span>
                        </h2>
                    </div>

                    {/* Simulator Card */}
                    <div className="bg-white/80 backdrop-blur-2xl rounded-[3rem] shadow-premium border border-primary/5 min-h-[600px] flex flex-col relative overflow-hidden">

                        {/* Progress Bar Container */}
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-primary/5">
                            <motion.div
                                className="h-full bg-accent"
                                initial={{ width: "0%" }}
                                animate={{
                                    width: step === "intro" ? "20%" :
                                        step === "data" ? "40%" :
                                            step === "concerns" ? "60%" :
                                                step === "analysis" ? "80%" : "100%"
                                }}
                            />
                        </div>

                        <AnimatePresence mode="wait">
                            {/* 1. Intro Step */}
                            {step === "intro" && (
                                <motion.div
                                    key="intro"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.02 }}
                                    className="p-12 md:p-20 flex flex-col items-center text-center space-y-10"
                                >
                                    <div className="w-24 h-24 bg-primary text-accent rounded-3xl flex items-center justify-center shadow-2xl rotate-3">
                                        <Brain className="w-12 h-12" />
                                    </div>
                                    <div className="space-y-4 max-w-2xl">
                                        <h3 className="text-3xl font-serif font-black text-primary">
                                            <span className="text-[1.2em]">당신의 금융 <span className="text-accent italic">정체성</span> 은<br />무엇입니까?</span>
                                        </h3>
                                        <p className="text-lg md:text-xl text-primary/80 font-semibold leading-relaxed">
                                            황선미 설계사의 자산 관리 철학과 최신 금융 데이터를 실시간으로 결합하여, <br className="hidden md:block" />
                                            오직 당신만을 위한 재무 시뮬레이션을 시작합니다.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleNext("data")}
                                        className="btn-premium btn-premium-primary px-12 py-5 text-base"
                                    >
                                        <span className="text-[1.2em]">시작하기</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            )}

                            {/* 2. Data Input Step */}
                            {step === "data" && (
                                <motion.div
                                    key="data"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    className="p-10 md:p-16 space-y-12"
                                >
                                    <div className="grid md:grid-cols-2 gap-10">
                                        <div className="space-y-8">
                                            <div className="space-y-4">
                                                <label className="text-sm font-black uppercase text-primary tracking-widest flex items-center gap-2">
                                                    <Target className="w-4 h-4 text-accent" /> 1. 나이 정보
                                                </label>
                                                <div className="flex gap-4">
                                                    <div className="flex-1 bg-ivory p-6 rounded-2xl border border-primary/10 shadow-sm transition-all hover:border-accent/30 group">
                                                        <span className="text-[11px] font-black text-primary/60 block mb-2 uppercase tracking-wider group-hover:text-accent transition-colors">현재 나이 (세)</span>
                                                        <input
                                                            type="number"
                                                            value={data.age}
                                                            onChange={(e) => setData({ ...data, age: Number(e.target.value) })}
                                                            className="w-full bg-transparent text-2xl font-black text-primary outline-none focus:text-accent transition-colors"
                                                        />
                                                    </div>
                                                    <div className="flex-1 bg-ivory p-6 rounded-2xl border border-primary/10 shadow-sm transition-all hover:border-accent/30 group">
                                                        <span className="text-[11px] font-black text-primary/60 block mb-2 uppercase tracking-wider group-hover:text-accent transition-colors">은퇴 목표 나이</span>
                                                        <input
                                                            type="number"
                                                            value={data.targetAge}
                                                            onChange={(e) => setData({ ...data, targetAge: Number(e.target.value) })}
                                                            className="w-full bg-transparent text-2xl font-black text-primary outline-none focus:text-accent transition-colors"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <label className="text-sm font-black uppercase text-primary tracking-widest flex items-center gap-2">
                                                    <TrendingUp className="w-4 h-4 text-accent" /> 2. 월 저축 가능액
                                                </label>
                                                <div className="bg-ivory p-8 rounded-2xl border border-primary/10 shadow-sm">
                                                    <input
                                                        type="range"
                                                        min="500000"
                                                        max="20000000"
                                                        step="500000"
                                                        value={data.monthlySaving}
                                                        onChange={(e) => setData({ ...data, monthlySaving: Number(e.target.value) })}
                                                        className="w-full accent-accent mb-6 h-2 rounded-lg cursor-pointer"
                                                    />
                                                    <div className="flex justify-between items-center bg-white/80 p-5 rounded-xl border border-primary/5 shadow-inner">
                                                        <div className="flex flex-col">
                                                            <span className="text-[10px] font-black text-primary/40 uppercase tracking-widest mb-1">Monthly Saving</span>
                                                            <span className="text-2xl font-black text-primary tracking-tighter">{formatKRW(data.monthlySaving)}</span>
                                                        </div>
                                                        <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                                                            <Zap className="w-5 h-5 text-accent" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-4">
                                                <label className="text-sm font-black uppercase text-primary tracking-widest flex items-center gap-2">
                                                    <PieChart className="w-4 h-4 text-accent" /> 3. 현재 보유 자산
                                                </label>
                                                <div className="bg-ivory p-8 rounded-2xl border border-primary/10 shadow-sm group">
                                                    <div className="flex items-center gap-3 border-b-2 border-primary/10 focus-within:border-accent transition-colors pb-4 mb-4">
                                                        <span className="text-3xl font-black text-primary/20 group-focus-within:text-accent transition-colors">₩</span>
                                                        <input
                                                            type="text"
                                                            value={data.currentAssets.toLocaleString()}
                                                            onChange={(e) => {
                                                                const val = e.target.value.replace(/[^0-9]/g, "");
                                                                setData({ ...data, currentAssets: Number(val) });
                                                            }}
                                                            className="w-full bg-transparent text-4xl font-black text-primary outline-none"
                                                        />
                                                    </div>
                                                    <div className="flex justify-between items-center bg-white/50 p-4 rounded-xl">
                                                        <span className="text-[11px] font-black text-primary/40 uppercase tracking-widest font-sans">Current Assets</span>
                                                        <span className="text-lg font-black text-accent">{formatKRW(data.currentAssets)}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-8 bg-primary rounded-3xl text-white space-y-4 relative overflow-hidden group">
                                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                                    <ShieldCheck className="w-16 h-16" />
                                                </div>
                                                <p className="text-[9px] font-black text-accent uppercase tracking-widest">HSM Strategy</p>
                                                <h4 className="text-lg font-serif font-bold italic leading-tight">
                                                    "자산의 속도를 결정하는 것은<br /> 금액이 아닌 '시간'입니다."
                                                </h4>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <button
                                            onClick={() => handleNext("concerns")}
                                            className="btn-premium btn-premium-primary px-12 py-5"
                                        >
                                            다음 단계
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* 3. Concerns Optional Step */}
                            {step === "concerns" && (
                                <motion.div
                                    key="concerns"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -30 }}
                                    className="p-10 md:p-16 space-y-12"
                                >
                                    <div className="text-center space-y-4">
                                        <h3 className="text-2xl font-serif font-black text-primary">현재 가장 고민되는 금융 이슈는?</h3>
                                        <p className="text-sm text-primary/40 font-medium">가장 큰 우려사항을 선택해 주시면 AI가 관련 절세 전략을 포함합니다.</p>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        {[
                                            { id: "inflation", icon: Zap, label: "인플레이션", sub: "자산가치 하락" },
                                            { id: "market", icon: TrendingUp, label: "시장 변동성", sub: "수익률 관리" },
                                            { id: "tax", icon: ShieldCheck, label: "세금 최적화", sub: "상속 및 증여" },
                                            { id: "legacy", icon: FileText, label: "승계 지원", sub: "법인 및 가업" },
                                        ].map((concern) => (
                                            <button
                                                key={concern.id}
                                                onClick={() => setData({ ...data, concern: concern.id })}
                                                className={`p-10 rounded-[2.5rem] border-2 transition-all flex flex-col items-center gap-6 text-center group ${data.concern === concern.id
                                                    ? "bg-primary text-white border-primary shadow-2xl scale-105"
                                                    : "bg-white text-primary border-primary/5 hover:border-accent hover:shadow-xl shadow-sm"
                                                    }`}
                                            >
                                                <concern.icon className={`w-10 h-10 transition-colors ${data.concern === concern.id ? "text-accent" : "text-primary/20 group-hover:text-accent"}`} />
                                                <div>
                                                    <p className="font-black text-lg mb-1">{concern.label}</p>
                                                    <p className={`text-[10px] font-black uppercase tracking-widest ${data.concern === concern.id ? "text-accent/80" : "text-primary/30"}`}>{concern.sub}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    <div className="flex justify-between items-center pt-8 border-t border-primary/5">
                                        <button
                                            onClick={() => setStep("data")}
                                            className="text-sm font-black text-primary/40 hover:text-primary transition-colors flex items-center gap-2"
                                        >
                                            <RefreshCcw className="w-3 h-3" /> 이전으로
                                        </button>
                                        <button
                                            onClick={() => handleNext("analysis")}
                                            className="btn-premium btn-premium-primary px-12 py-5"
                                        >
                                            AI 분석 시작
                                            <Brain className="w-4 h-4 ml-2" />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* 4. Analysis Wait Step */}
                            {step === "analysis" && (
                                <motion.div
                                    key="analysis"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="p-20 flex flex-col items-center justify-center space-y-12"
                                >
                                    <div className="relative">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                            className="w-32 h-32 border-4 border-accent border-t-transparent rounded-full flex items-center justify-center"
                                        />
                                        <Brain className="w-12 h-12 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                    </div>
                                    <div className="text-center space-y-4">
                                        <h4 className="text-xl font-serif font-black text-primary">미래 시나리오를 설계 중입니다...</h4>
                                        <div className="flex flex-col gap-2">
                                            {[
                                                "데이터 모델링 분석 중",
                                                "세금 최적화 시나리오 연산",
                                                "황선미 가디언 솔루션 매칭"
                                            ].map((text, i) => (
                                                <motion.p
                                                    key={i}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: i * 0.7 }}
                                                    className="text-xs font-black text-accent uppercase tracking-[0.4em]"
                                                >
                                                    {text}
                                                </motion.p>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* 5. Result Step */}
                            {step === "result" && simulationResult && (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="p-10 md:p-16 space-y-12"
                                >
                                    <div className="flex flex-col md:flex-row gap-12">
                                        <div className="flex-1 space-y-8">
                                            <div className="space-y-2">
                                                <p className="text-[10px] font-black text-accent uppercase tracking-widest">Expected Result</p>
                                                <h4 className="text-4xl font-serif font-black text-primary">예상 자산 리포트</h4>
                                            </div>

                                            <div className="p-8 bg-ivory rounded-[2.5rem] border border-primary/5 space-y-6">
                                                <div className="flex justify-between items-end border-b border-accent/10 pb-4">
                                                    <span className="text-xs font-bold text-primary/40">목표 시점 자산 (복리 6% 적용)</span>
                                                    <span className="text-3xl font-black text-primary">{formatKRW(simulationResult.finalBalance)}*</span>
                                                </div>

                                                {/* Asset Chart Inserted Here */}
                                                <AssetChart history={simulationResult.history} />

                                                <div className="space-y-4">
                                                    <p className="text-[11px] font-bold text-primary/60 leading-relaxed italic">
                                                        "위 수치는 연평균 수익률 6%를 가정하여 복리 효과를 반영한 결과입니다. <br />황선미 가디언의 맞춤 절세 전략이 결합되면 실질 수령액은 더 높아질 수 있습니다."
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="p-8 bg-accent/5 rounded-[2.5rem] border border-accent/20 space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <Brain className="w-5 h-5 text-accent" />
                                                    <span className="text-xs font-black text-primary uppercase tracking-widest">AI Guardian Insight</span>
                                                </div>
                                                <p className="text-sm font-bold text-primary leading-relaxed">
                                                    {aiInsight}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="w-full md:w-1/3 flex flex-col gap-6">
                                            <div className="flex-1 p-8 bg-primary rounded-[2.5rem] text-white flex flex-col justify-between group">
                                                <Sparkles className="w-8 h-8 text-accent group-hover:scale-125 transition-transform" />
                                                <div className="space-y-4">
                                                    <p className="text-[9px] font-black text-accent uppercase tracking-widest">Expert Action</p>
                                                    <h5 className="text-xl font-serif font-bold leading-tight">상세 리포트 <br />무료 신청하기</h5>
                                                    <p className="text-[10px] text-white/50 leading-relaxed font-medium">당신의 데이터를 기반으로 한 15페이지 분량의 상세 PDF 분석서를 보내드립니다.</p>
                                                </div>
                                                <button
                                                    onClick={() => openModalWithTitle("AI 정밀 자산 리포트")}
                                                    className="mt-6 w-full py-4 bg-white text-primary text-[11px] font-black rounded-2xl hover:bg-accent hover:text-white transition-all transform hover:-translate-y-1"
                                                >
                                                    <span className="text-[1.2em]">PDF 리포트 받기</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center pt-8 border-t border-primary/5">
                                        <button
                                            onClick={() => setStep("intro")}
                                            className="text-sm font-black text-primary/40 hover:text-primary transition-colors flex items-center gap-2"
                                        >
                                            <RefreshCcw className="w-3 h-3" /> 다시 진단하기
                                        </button>
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => openModalWithTitle("무료 1:1 심층 상담")}
                                                className="btn-premium btn-premium-primary px-10 py-5"
                                            >
                                                무료 1:1 심층 <span className="text-[1.2em]">상담</span> 신청
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Footer Info */}
                    <p className="text-center mt-8 text-[10px] font-bold text-primary/30 uppercase tracking-[0.3em]">
                        &copy; Powered by Hwang Sun-mi AI Intelligence & MDRT Ethics
                    </p>
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
