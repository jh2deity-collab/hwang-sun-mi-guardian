import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-primary text-white py-10 md:py-20 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-2 space-y-6">
                        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
                            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center font-serif font-black text-primary transition-transform group-hover:scale-110">
                                HS
                            </div>
                            <span className="text-2xl font-serif font-bold tracking-tighter hover:text-accent transition-colors">Hwang Sun-mi</span>
                        </Link>
                        <p className="text-white/50 leading-relaxed max-w-sm font-light">
                            MDRT(백만 달러 원탁 회의) 회원으로서 정직과 윤리를 바탕으로 당신의 삶에 가장 가치 있는 재무 솔루션을 제안합니다.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-accent font-bold uppercase tracking-widest text-xs">Quick Links</h4>
                        <ul className="space-y-4 text-sm text-white/40">
                            <li><Link href="#소개" className="hover:text-white transition-colors">서비스 소개</Link></li>
                            <li><Link href="#윤리강령" className="hover:text-white transition-colors">윤리 강령</Link></li>
                            <li><Link href="#인사이트" className="hover:text-white transition-colors">금융 인사이트</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-accent font-bold uppercase tracking-widest text-xs">Contact</h4>
                        <ul className="space-y-4 text-sm text-white/40">
                            <li>010-8673-4589</li>
                            <li>hhssmi@nate.com</li>
                            <li>Seoul, Republic of Korea</li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-white/5 gap-6">
                    <p className="text-[10px] text-white/20 uppercase tracking-[0.2em]">
                        &copy; 2026 Hwang Sun-mi: The Premier Financial Guardian. All Rights Reserved.
                    </p>
                    <div className="flex gap-8 items-center grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all">
                        {/* MDRT Logo Placeholder Text for now */}
                        <span className="text-[10px] font-black border border-white/20 px-3 py-1 rounded">MDRT MEMBER</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
