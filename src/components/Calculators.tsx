"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, TrendingUp, Wallet, RefreshCcw, ArrowRight } from "lucide-react";

export default function Calculators() {
    const [step, setStep] = useState(1); // 1: Input, 2: Result
    const [values, setValues] = useState({
        currentAge: 35,
        targetAge: 65,
        monthlySavings: 1000000,
        expectedReturn: 5,
        estimatedExpense: 3000000,
    });

    const [result, setResult] = useState({
        totalCapital: 0,
        monthlyIncome: 0,
        isSufficient: false,
    });

    const calculateRetirement = () => {
        const yearsToSave = values.targetAge - values.currentAge;
        const rate = values.expectedReturn / 100 / 12;
        const months = yearsToSave * 12;

        // Compound interest formula for regular contributions
        // FV = P * [(1 + r)^n - 1] / r
        let total = values.monthlySavings * (Math.pow(1 + rate, months) - 1) / rate;

        // Final capital after inflation/etc (simplified for demo)
        const monthlyIncome = (total * (values.expectedReturn / 100)) / 12;

        setResult({
            totalCapital: Math.floor(total),
            monthlyIncome: Math.floor(monthlyIncome),
            isSufficient: monthlyIncome >= values.estimatedExpense,
        });
        setStep(2);
    };

    const formatCurrency = (val: number) => {
        if (val >= 100000000) {
            return `${(val / 100000000).toFixed(1)}억 원`;
        }
        return `${(val / 10000).toLocaleString()}만 원`;
    };

    return (
        <section id="도구" className="section-padding bg-white overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <span className="text-accent font-black uppercase tracking-[0.4em] text-[10px]">Financial Simulator</span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-primary leading-tight tracking-tight">
                                미래를 숫자로<br />
                                <span className="text-accent italic">증명</span>해 보세요.
                            </h2>
                            <p className="text-lg text-primary/60 font-medium leading-relaxed max-w-md">
                                막연한 불안함을 구체적인 데이터로 바꾸는 첫걸음. <br />당신의 은퇴 준비도를 지금 즉시 진단해 드립니다.
                            </p>
                        </div>

                        <div className="flex items-center gap-4 py-8 border-t border-primary/5">
                            <div className="w-12 h-12 bg-silver flex items-center justify-center rounded-xl text-primary">
                                <Calculator className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-primary">Pre-Consulting Tool</p>
                                <p className="text-xs text-primary/40">상담 전 간단한 자산 진단을 통해 방향을 설정하세요.</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        {/* Calculator Card */}
                        <div className="bg-ivory-texture p-8 md:p-12 rounded-[3.5rem] shadow-premium border border-primary/5 min-h-[500px] flex flex-col justify-center">
                            <AnimatePresence mode="wait">
                                {step === 1 ? (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black uppercase tracking-widest text-primary/40 ml-4">현재 나이</label>
                                                <input
                                                    type="number"
                                                    value={values.currentAge}
                                                    onChange={(e) => setValues({ ...values, currentAge: Number(e.target.value) })}
                                                    className="w-full px-6 py-4 bg-white rounded-2xl border border-transparent focus:border-accent outline-none text-sm font-black text-primary"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black uppercase tracking-widest text-primary/40 ml-4">은퇴 희망 나이</label>
                                                <input
                                                    type="number"
                                                    value={values.targetAge}
                                                    onChange={(e) => setValues({ ...values, targetAge: Number(e.target.value) })}
                                                    className="w-full px-6 py-4 bg-white rounded-2xl border border-transparent focus:border-accent outline-none text-sm font-black text-primary"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-primary/40 ml-4">매월 저축 가능 금액 (원)</label>
                                            <input
                                                type="range"
                                                min="100000"
                                                max="10000000"
                                                step="100000"
                                                value={values.monthlySavings}
                                                onChange={(e) => setValues({ ...values, monthlySavings: Number(e.target.value) })}
                                                className="w-full accent-accent"
                                            />
                                            <div className="flex justify-between items-center bg-white px-6 py-4 rounded-2xl">
                                                <span className="text-xs font-bold text-primary/40 font-sans">Monthly Saving</span>
                                                <span className="text-lg font-black text-primary">{formatCurrency(values.monthlySavings)}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-primary/40 ml-4">기대 수익률 (%)</label>
                                            <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl">
                                                <TrendingUp className="w-4 h-4 text-accent" />
                                                <input
                                                    type="number"
                                                    value={values.expectedReturn}
                                                    onChange={(e) => setValues({ ...values, expectedReturn: Number(e.target.value) })}
                                                    className="bg-transparent outline-none text-lg font-black text-primary w-full"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            onClick={calculateRetirement}
                                            className="w-full btn-premium btn-premium-primary py-6 mt-4"
                                        >
                                            결과 확인하기
                                            <ArrowRight className="w-4 h-4 text-accent" />
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.05 }}
                                        className="text-center space-y-10"
                                    >
                                        <div className="space-y-2">
                                            <p className="text-[10px] uppercase font-black tracking-widest text-accent">Simulation Result</p>
                                            <h4 className="text-2xl font-serif font-black text-primary">예상 은퇴 자산</h4>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="text-5xl md:text-6xl font-black text-primary tracking-tighter">
                                                {formatCurrency(result.totalCapital)}
                                            </div>
                                            <p className="text-sm text-primary/40 font-medium">
                                                은퇴 시점까지 모이는 예상 순자산입니다.
                                            </p>
                                        </div>

                                        <div className="bg-white p-8 rounded-3xl border border-primary/5 space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-bold text-primary/40">매월 예상 소득</span>
                                                <span className="text-xl font-black text-primary">{formatCurrency(result.monthlyIncome)} / 월</span>
                                            </div>
                                            <div className={`text-xs py-2 px-4 rounded-full font-black ${result.isSufficient ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                                {result.isSufficient ? "은퇴 목표 달성이 가능합니다!" : "추가적인 자산 전략이 필요합니다."}
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => setStep(1)}
                                                className="flex-1 btn-premium btn-premium-outline py-5 gap-2"
                                            >
                                                <RefreshCcw className="w-3 h-3" />
                                                다시 계산
                                            </button>
                                            <button className="flex-1 btn-premium btn-premium-primary py-5">
                                                전문가 상담 예약
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Decorative Background for Calculator */}
                        <div className="absolute -z-10 -top-10 -right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
                        <div className="absolute -z-10 -bottom-10 -left-10 w-60 h-60 bg-primary/5 rounded-full blur-3xl" />
                    </div>
                </div>
            </div>
        </section>
    );
}
