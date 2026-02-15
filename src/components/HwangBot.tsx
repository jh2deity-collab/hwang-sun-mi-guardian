"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, User, Shield } from "lucide-react";

export default function HwangBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "bot", text: "안녕하세요. 금융 가디언 황선미의 AI 어시스턴트 'H-Bot'입니다. 어떤 도움이 필요하신가요?" }
    ]);
    const [input, setInput] = useState("");

    const [isTyping, setIsTyping] = useState(false);

    const handleSend = async () => {
        if (!input.trim() || isTyping) return;

        const userMessage = { role: "user", text: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput("");
        setIsTyping(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: newMessages.map(m => ({
                        role: m.role === 'bot' ? 'assistant' : 'user',
                        content: m.text
                    }))
                }),
            });

            if (!response.ok) throw new Error('API 호출 실패');

            const data = await response.json();
            setMessages(prev => [...prev, { role: 'bot', text: data.content }]);
        } catch (error) {
            console.error('HwangBot Error:', error);
            setMessages(prev => [...prev, {
                role: 'bot',
                text: '죄송합니다. 서버와 통신 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <>
            {/* Floating Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-10 right-10 z-[60] w-16 h-16 bg-primary text-accent rounded-full shadow-2xl flex items-center justify-center border border-white/10"
            >
                {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
                {!isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-primary text-[10px] font-black rounded-full border-2 border-white flex items-center justify-center"
                    >
                        1
                    </motion.div>
                )}
            </motion.button>

            {/* Chatbot Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-32 right-10 z-[60] w-[380px] h-[550px] bg-white rounded-[2.5rem] shadow-premium border border-primary/5 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-primary p-6 text-white flex items-center gap-4">
                            <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
                                <Shield className="w-5 h-5 text-accent" />
                            </div>
                            <div>
                                <h4 className="font-serif font-black text-sm">Hwang Guardian AI</h4>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-[9px] text-white/50 font-bold uppercase tracking-widest">Always Active</span>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-ivory-texture/50">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: msg.role === 'bot' ? -10 : 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${msg.role === 'bot' ? 'justify-start' : 'justify-end'} gap-3`}
                                >
                                    {msg.role === 'bot' && (
                                        <div className="w-8 h-8 bg-primary/5 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                                            <Shield className="w-4 h-4" />
                                        </div>
                                    )}
                                    <div className={`p-4 rounded-2xl text-xs font-medium leading-relaxed max-w-[80%] ${msg.role === 'bot'
                                        ? 'bg-white text-primary shadow-sm rounded-tl-none'
                                        : 'bg-primary text-white rounded-tr-none'
                                        }`}>
                                        {msg.text}
                                    </div>
                                    {msg.role === 'user' && (
                                        <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center text-accent flex-shrink-0">
                                            <User className="w-4 h-4" />
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start gap-3"
                                >
                                    <div className="w-8 h-8 bg-primary/5 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                                        <Shield className="w-4 h-4" />
                                    </div>
                                    <div className="p-4 rounded-2xl text-[10px] font-bold bg-white text-primary/40 shadow-sm rounded-tl-none italic">
                                        가디언이 답변을 작성 중입니다...
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-primary/5">
                            <div className="flex items-center gap-2 bg-silver/30 rounded-full pl-6 pr-2 py-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder={isTyping ? "답변을 기다리는 중..." : "무엇이든 물어보세요"}
                                    disabled={isTyping}
                                    className="flex-1 bg-transparent outline-none text-xs font-bold text-primary disabled:opacity-50"
                                />
                                <button
                                    onClick={handleSend}
                                    className="w-10 h-10 bg-primary text-accent rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                            <p className="text-[7px] text-primary/30 text-center mt-3 uppercase font-black tracking-widest">
                                Powered by AI - Official Guardian Assistant
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
