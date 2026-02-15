"use client";

import React from 'react';
import { ShieldCheck, TrendingUp, Calculator, Award } from 'lucide-react';

interface ReportTemplateProps {
    data: {
        principal: number;
        rate: number;
        period: number;
        tax: number;
        finalBalance: number;
    };
}

const ReportTemplate = ({ data }: ReportTemplateProps) => {
    const today = new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div id="premium-report-template" className="w-[210mm] min-h-[297mm] bg-white p-[20mm] font-sans text-slate-900 leading-relaxed shadow-2xl mx-auto border border-slate-100 flex flex-col">
            {/* Header */}
            <header className="flex justify-between items-start border-b-4 border-[#C5A028] pb-10 mb-12">
                <div className="space-y-2">
                    <h1 className="text-4xl font-serif font-black text-[#1A2B4B] tracking-tight uppercase">
                        Asset Analysis <span className="text-[#C5A028]">Report</span>
                    </h1>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em]">
                        Wealth Guardian - Hwang Sun Mi
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-xs font-black text-slate-400 mb-1 tracking-widest uppercase">Issue Date</p>
                    <p className="text-sm font-bold text-[#1A2B4B]">{today}</p>
                </div>
            </header>

            {/* Introduction */}
            <section className="mb-16">
                <div className="flex items-center gap-3 mb-6">
                    <Award className="text-[#C5A028]" size={24} />
                    <h2 className="text-xl font-black text-[#1A2B4B] uppercase tracking-wider">01. 분석 개요</h2>
                </div>
                <div className="bg-[#fcfaf2] border-l-4 border-[#C5A028] p-8 rounded-tr-3xl rounded-br-3xl">
                    <p className="text-base text-slate-700 font-medium leading-loose">
                        본 리포트는 고객님의 현재 자산 상황과 목표를 바탕으로 AI 모델이 도출한 최적의 자산 성장 시뮬레이션 결과입니다.
                        금융 가디언 황선미의 전문성과 최신 데이터를 결합하여 설계되었습니다.
                    </p>
                </div>
            </section>

            {/* Input Summary */}
            <section className="mb-16">
                <div className="flex items-center gap-3 mb-6">
                    <Calculator className="text-[#C5A028]" size={24} />
                    <h2 className="text-xl font-black text-[#1A2B4B] uppercase tracking-wider">02. 시뮬레이션 설정 데이터</h2>
                </div>
                <div className="grid grid-cols-3 gap-8">
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">초기 자산</p>
                        <p className="text-xl font-black text-[#1A2B4B]">{data.principal.toLocaleString()}원</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">예상 수익률</p>
                        <p className="text-xl font-black text-[#1A2B4B]">{data.rate}% <span className="text-xs text-slate-400">(연간)</span></p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">운용 기간</p>
                        <p className="text-xl font-black text-[#1A2B4B]">{data.period}년</p>
                    </div>
                </div>
            </section>

            {/* Analysis Results */}
            <section className="mb-16 flex-grow">
                <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="text-[#C5A028]" size={24} />
                    <h2 className="text-xl font-black text-[#1A2B4B] uppercase tracking-wider">03. 분석 및 예측 결과</h2>
                </div>
                <div className="space-y-6">
                    <div className="p-10 bg-[#1A2B4B] rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <TrendingUp size={120} />
                        </div>
                        <div className="relative z-10">
                            <p className="text-xs font-black text-[#C5A028] uppercase tracking-[0.4em] mb-4">Final Target Value</p>
                            <h3 className="text-5xl font-serif font-black tracking-tighter mb-2">
                                {data.finalBalance.toLocaleString()}<span className="text-xl ml-1 text-[#C5A028]">원</span>
                            </h3>
                            <p className="text-sm font-bold text-slate-400">복리 효과가 반영된 목표 시점의 예상 자산 평가액입니다.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="p-8 border-2 border-slate-100 rounded-3xl">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">추정 증여세 가액</p>
                            <p className="text-2xl font-black text-[#1A2B4B]">{data.tax.toLocaleString()}원</p>
                        </div>
                        <div className="p-8 border-2 border-slate-100 rounded-3xl bg-slate-50">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">순자산 기여도</p>
                            <p className="text-2xl font-black text-[#C5A028]">Excellent</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer / Disclaimer */}
            <footer className="mt-auto border-t border-slate-100 pt-10">
                <div className="flex justify-between items-end">
                    <div className="space-y-4 max-w-md">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="text-[#C5A028]" size={18} />
                            <span className="text-xs font-black text-[#1A2B4B] uppercase tracking-widest">Compliance & Ethics Verified</span>
                        </div>
                        <p className="text-[9px] text-slate-400 font-medium leading-relaxed">
                            * 본 분석 결과는 입력된 지표를 기반으로 한 예측치이며, 실제 투자 수익률 및 세액은 금융 시장 변화 및 관련 법규 개정에 따라 달라질 수 있습니다.
                            정밀한 자산 배분 전략을 위해 전문가와의 1:1 상담을 권장드립니다.
                        </p>
                    </div>
                    <div className="text-right space-y-1">
                        <p className="text-sm font-black text-[#1A2B4B]">Hwang Sun Mi - Wealth Guardian</p>
                        <p className="text-[10px] font-bold text-slate-400 tracking-widest">MDRT LIFE MEMBER / TOP PRODUCER</p>
                        <p className="text-[10px] font-bold text-[#C5A028]">T. 010.8673.4589</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ReportTemplate;
