"use client";

import { motion } from "framer-motion";

export default function SocialProof() {
    const stats = [
        { label: "Consultation Counts", value: "2,500", suffix: "+" },
        { label: "Assets Managed", value: "1.2", suffix: "T+" },
        { label: "Client Satisfaction", value: "99", suffix: "%" },
    ];

    return (
        <section className="py-40 bg-primary text-white">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid md:grid-cols-3 gap-20 text-center">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <p className="text-xs uppercase tracking-[0.4em] font-black text-white/40 mb-2">{stat.label}</p>
                            <h4 className="text-5xl md:text-6xl font-black tracking-tighter text-white">
                                {stat.value}<span className="text-accent">{stat.suffix}</span>
                            </h4>
                            <div className="w-12 h-1 bg-accent/30 mx-auto" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
