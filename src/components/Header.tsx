"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            href: "#소개",
            label: "Philosophy",
            image: "https://images.unsplash.com/photo-1507679799987-c7377ec486b8?auto=format&fit=crop&q=80&w=400"
        },
        {
            name: "서비스",
            href: "#서비스",
            label: "Expertise",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400"
        },
        {
            name: "인사이트",
            href: "#인사이트",
            label: "Insights",
            image: "https://images.unsplash.com/photo-1454165833267-028cc21e7867?auto=format&fit=crop&q=80&w=400"
        },
        {
            name: "문의",
            href: "#문의",
            label: "Contact",
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400"
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
                            <Link
                                key={item.name}
                                href={item.href}
                                className="group relative px-7 py-3 overflow-hidden rounded-full transition-all"
                            >
                                {/* Hover Image Background */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
                                    <img
                                        src={item.image}
                                        alt=""
                                        className="w-full h-full object-cover grayscale scale-150 group-hover:scale-100 transition-transform duration-700 opacity-25"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-white/80" />
                                </div>

                                <div className="flex flex-col items-center relative z-10">
                                    <span className="text-[13px] font-black uppercase tracking-[0.2em] text-primary/70 group-hover:text-primary transition-colors">
                                        {item.name}
                                    </span>
                                    <span className="text-[9px] font-bold text-accent opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                                        {item.label}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </nav>

                    {/* Action Area */}
                    <div className="flex items-center gap-4 pr-2">
                        <div className="hidden xl:flex flex-col items-end mr-4">
                            <span className="text-[9px] font-black text-primary/40 uppercase tracking-widest">Global MDRT</span>
                            <span className="text-[15px] font-bold text-primary">010.8673.4589</span>
                        </div>
                        <button className="btn-premium btn-premium-primary py-4 px-10 text-[12px] sm:flex hidden shadow-xl hover:-translate-y-1 transition-transform">
                            상담 예약
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
                <div className="lg:hidden absolute top-full left-6 right-6 bg-white/95 backdrop-blur-xl border border-primary/5 p-10 rounded-[3rem] mt-4 shadow-2xl animate-in fade-in zoom-in duration-300 origin-top">
                    <div className="space-y-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center justify-between group"
                            >
                                <div>
                                    <p className="text-[10px] font-black text-accent uppercase tracking-widest mb-1">{item.label}</p>
                                    <p className="text-2xl font-serif font-black text-primary group-hover:translate-x-2 transition-transform">{item.name}</p>
                                </div>
                                <ArrowUpRight className="text-primary/20 group-hover:text-accent transition-colors" />
                            </Link>
                        ))}
                        <button className="w-full btn-premium btn-premium-primary py-6 text-xs mt-4">
                            상담 신청하기
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
