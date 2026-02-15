import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShieldCheck, Award, Heart, Sparkles } from "lucide-react";
import Image from "next/image";

export default function About() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    const ethics = [
        { title: "고객 이익 최우선", desc: "모든 금융 전략의 출발점은 고객의 평온한 삶입니다.", icon: <ShieldCheck className="w-8 h-8" /> },
        { title: "절대적 전문성", desc: "글로벌 금융 시장의 흐름을 꿰뚫는 정교한 통찰을 약속합니다.", icon: <Award className="w-8 h-8" /> },
        { title: "비밀 유지 엄수", desc: "고객의 소중한 정보 자산은 최고 수준으로 보호됩니다.", icon: <Heart className="w-8 h-8" /> },
    ];

    return (
        <section
            id="about"
            ref={containerRef}
            className="section-padding bg-white relative overflow-hidden"
        >
            {/* Ambient Background Light */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="grid lg:grid-cols-[1fr_1.618fr] gap-16 lg:gap-24 items-center">
                    {/* Left: Professional Visual with Parallax */}
                    <motion.div
                        style={{ y: imageY, opacity }}
                        className="relative"
                    >
                        <div className="relative aspect-[1/1.618] rounded-[5rem] overflow-hidden shadow-premium border border-primary/5 group">
                            <Image
                                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200"
                                alt="Professional Office"
                                fill
                                className="absolute inset-0 object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-[2000ms] scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/60 to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-1000" />
                        </div>

                        {/* Floating Experience Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6, duration: 1 }}
                            className="absolute -bottom-10 -left-10 glass-premium p-10 rounded-[2.5rem] border border-white/20 shadow-2xl max-w-[300px]"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="text-gold-500 w-5 h-5" />
                                <span className="text-white/70 text-[10px] uppercase tracking-widest font-bold">Elite Status</span>
                            </div>
                            <p className="text-accent font-black text-5xl mb-3 tracking-tighter">MDRT</p>
                            <p className="text-white text-base font-semibold leading-relaxed">
                                글로벌 수준의 정직과 전문성을 증명하는 백만 달러 원탁 회의 정회원.
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Right: Content with Staggered Parallax */}
                    <motion.div
                        style={{ y: textY }}
                        className="space-y-16"
                    >
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-[1px] bg-accent" />
                                <span className="text-accent font-black uppercase tracking-[0.5em] text-[11px]">Philosophy</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black text-primary leading-tight tracking-tight">
                                단 하나의 <span className="text-gold-shine italic">가디언</span> ,<br />
                                흔들리지 않는 전문성
                            </h2>
                            <p className="text-lg md:text-xl text-primary/70 font-medium leading-relaxed max-w-2xl border-l-[3px] border-accent/30 pl-8">
                                자산 관리는 단순한 숫자를 넘어 고객의 인생과 꿈을 지키는 숭고한 약속입니다. 황선미의 전문성은 오직 고객의 평온함을 위해 존재합니다.
                            </p>
                        </div>

                        <div className="grid gap-4">
                            {ethics.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.15, duration: 0.8 }}
                                    className="flex items-center gap-6 p-6 rounded-3xl bg-silver/30 border border-primary/5 hover:border-accent/20 transition-all group cursor-default"
                                >
                                    <div className="text-accent p-3 bg-white rounded-xl shadow-sm group-hover:bg-accent group-hover:text-white transition-all duration-500">
                                        {item.icon}
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-lg font-black text-primary">{item.title}</h4>
                                        <p className="text-sm text-primary/60 font-medium">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
