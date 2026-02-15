export interface Insight {
    id: string;
    category: string;
    title: string;
    summary: string;
    date: string;
    image: string;
    readTime: string;
}

export const insights: Insight[] = [
    {
        id: "1",
        category: "상속/증여",
        title: "2026 자산 승계 전략: 절세의 골든타임을 잡아라",
        summary: "급변하는 세법 환경 속에서 자산 가치를 온전히 보존하기 위한 상속 및 증여의 핵심 포인트를 정리해 드립니다.",
        date: "2026.02.15",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800",
        readTime: "5 min read"
    },
    {
        id: "2",
        category: "은퇴 설계",
        title: "생애 주기별 맞춤형 연금 포트폴리오 구성법",
        summary: "단순한 저축을 넘어 평생 줄지 않는 마르지 않는 샘물과 같은 현금 흐름을 만드는 노하우를 공개합니다.",
        date: "2026.02.10",
        image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800",
        readTime: "4 min read"
    },
    {
        id: "3",
        category: "기업 리스크",
        title: "CEO 경영 권한 방어와 가업 승계 리스크 관리",
        summary: "법인 기업의 지속 가능한 성장을 위해 반드시 체크해야 할 리스크 체크리스트와 가업 승계 전략을 제안합니다.",
        date: "2026.02.05",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        readTime: "6 min read"
    }
];
