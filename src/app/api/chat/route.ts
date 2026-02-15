import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_api_key_here') {
            return NextResponse.json(
                { error: 'OpenAI API 키가 설정되지 않았습니다. .env.local 파일을 확인해주세요.' },
                { status: 500 }
            );
        }

        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini', // 가성비 좋은 모델 사용
            messages: [
                {
                    role: 'system',
                    content: `당신은 '황선미 설계사'의 AI 어드바이저입니다. 
          황선미 설계사는 자산 관리, 증여/상속 세무 전략, 보험 설계 분야의 전문가입니다.
          
          대화 원칙:
          1. 전문가답고 신뢰감 있는 어조를 유지하세요.
          2. 고객의 질문에 친절하고 상세하게 답변하세요.
          3. 복잡한 금융 개념은 쉽게 풀어서 설명하세요.
          4. 답변 끝에는 더 상세한 상담이 필요할 경우 '대면 상담'이나 '전화 상담'을 권유하세요.
          5. 황선미 설계사의 가치관인 '고객의 자산을 지키는 가디언'이라는 정체성을 강조하세요.
          
          전문 분야:
          - 상속세 및 증여세 절세 전략
          - 법인 자산 관리 및 CEO 플랜
          - 은퇴 설계 및 연금 포트폴리오
          - 맞춤형 보험 설계 및 리스크 관리`
                },
                ...messages
            ],
            temperature: 0.7,
            max_tokens: 1000,
        });

        return NextResponse.json({
            role: 'assistant',
            content: response.choices[0].message.content
        });
    } catch (error: any) {
        console.error('AI Chat Error:', error);
        return NextResponse.json(
            { error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
            { status: 500 }
        );
    }
}
