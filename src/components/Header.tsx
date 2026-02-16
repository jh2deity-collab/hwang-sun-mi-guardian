"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, MessageSquare } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import LeadMagnet from "./LeadMagnet";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        {
            name: "소개",
            href: "#about",
            label: "Philosophy",
            image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=400"
        },
        {
            name: "서비스",
            href: "#service",
            label: "Expertise",
            image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=400"
        },
        {
            name: "인사이트",
            href: "#insights",
            label: "Insights",
            image: "https://images.unsplash.com/photo-1454165833267-028cc21e7867?auto=format&fit=crop&q=80&w=400"
        },
        {
            name: "문의",
            href: "#contact",
            label: "Contact",
            image: "https://images.unsplash.com/photo-1591696208182-8cbb7af297df?auto=format&fit=crop&q=80&w=400"
        },
    ];

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled ? "py-4 translate-y-0" : "py-10 translate-y-2"
                }`}
        >
            <div className="container mx-auto px-6 md:px-12">
                <div className={`flex items-center justify-between transition-all duration-500 px-6 py-3 rounded-full border border-primary/5 ${isScrolled ? "bg-white/80 backdrop-blur-xl shadow-premium" : "bg-white/40 backdrop-blur-md"
                    }`}>
                    {/* Logo Area */}
                    <Link
                        href="/"
                        className="flex items-center gap-4 group cursor-pointer"
                        onClick={(e) => {
                            if (window.location.pathname === "/") {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }
                        }}
                    >
                        <div className="w-11 h-11 bg-primary flex items-center justify-center text-accent text-[10px] font-black rounded-xl transition-all group-hover:rotate-[360deg] duration-1000 shadow-lg">
                            HSM
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-serif font-black tracking-tighter text-primary">Hwang Sun-mi</span>
                            <span className="text-[9px] font-black text-accent tracking-[0.4em] uppercase">Wealth Guardian</span>
                        </div>
                    </Link>

                    {/* Dashboard-style Navigation */}
                    <nav className="hidden lg:flex items-center gap-2">
                        {navItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={(e) => {
                                    e.preventDefault();
                                    const element = document.querySelector(item.href);
                                    if (element) {
                                        element.scrollIntoView({ behavior: 'smooth' });
                                        window.history.pushState({}, '', item.href);
                                    }
                                }}
                                className="group relative px-7 py-3 overflow-hidden rounded-full transition-all"
                            >
                                {/* Hover Image Background */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
                                    <Image
                                        src={item.image}
                                        alt=""
                                        fill
                                        className="object-cover grayscale scale-150 group-hover:scale-100 transition-transform duration-700 opacity-25"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-white/80" />
                                </div>

                                <div className="flex flex-col items-center relative z-10">
                                    <span className="text-[15px] font-black uppercase tracking-[0.15em] text-primary group-hover:text-primary/80 transition-colors">
                                        {item.name}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </nav>

                    {/* Action Area */}
                    <div className="flex items-center gap-4 pr-2">
                        <button
                            onClick={() => window.dispatchEvent(new CustomEvent('open-ai-guardian'))}
                            className="btn-premium bg-primary/90 text-accent border-accent/30 py-4 px-10 text-[12px] xl:flex hidden shadow-xl hover:-translate-y-1 transition-transform"
                        >
                            <MessageSquare size={16} />
                            <span className="text-[1.2em]">AI <span className="text-white">Guardian</span></span>
                        </button>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="btn-premium btn-premium-primary py-4 px-10 text-[12px] sm:flex hidden shadow-xl hover:-translate-y-1 transition-transform"
                        >
                            <span className="text-[1.2em]">상담 예약</span>
                            <ArrowUpRight className="w-4 h-4 text-accent" />
                        </button>
                        <button
                            className="lg:hidden p-3 text-primary bg-primary/5 rounded-full"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-full left-6 right-6 bg-primary/95 backdrop-blur-2xl border border-white/10 p-10 rounded-[3rem] mt-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in slide-in-from-top-4 duration-500 origin-top overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] pointer-events-none" />
                    <div className="space-y-8 relative z-10">
                        {navItems.map((item, idx) => (
                            <button
                                key={item.name}
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    const element = document.querySelector(item.href);
                                    if (element) {
                                        element.scrollIntoView({ behavior: 'smooth' });
                                        window.history.pushState({}, '', item.href);
                                    }
                                }}
                                className="flex items-center justify-between group py-2 w-full text-left"
                            >
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 + 0.2 }}
                                >
                                    <p className="text-[10px] font-black text-accent/60 uppercase tracking-[0.3em] mb-2">{item.label}</p>
                                    <p className="text-3xl font-serif font-black text-white group-hover:text-accent group-hover:translate-x-3 transition-all duration-500">{item.name}</p>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.1 + 0.3 }}
                                >
                                    <ArrowUpRight className="text-white/20 group-hover:text-accent group-hover:rotate-45 transition-all duration-500" />
                                </motion.div>
                            </button>
                        ))}
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            onClick={() => { setIsMenuOpen(false); window.dispatchEvent(new CustomEvent('open-ai-guardian')); }}
                            className="w-full py-6 bg-navy border border-accent/20 text-accent font-black rounded-2xl mt-6 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em]"
                        >
                            <MessageSquare size={18} />
                            <span>AI Guardian Advisor</span>
                        </motion.button>
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            onClick={() => { setIsMenuOpen(false); setIsModalOpen(true); }}
                            className="w-full py-6 bg-gradient-to-r from-accent to-[#D4AF37] text-primary font-black rounded-2xl mt-6 shadow-[0_15px_30px_rgba(197,160,40,0.2)] flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em]"
                        >
                            <span>상담 예약</span>
                            <ArrowUpRight className="w-4 h-4" />
                        </motion.button>
                    </div>
                </div>
            )}

            <LeadMagnet
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="VIP 프라이빗 상담 예약"
            />
        </header>
    );
}
