/**
 * 황선미 가디언 - 자산 관리 및 세무 계산 엔진
 * 상속/증여세 및 복리 자산 성장을 시뮬레이션합니다.
 */

// 대한민국 상속/증여세율표 (기본)
const TAX_BRACKETS = [
    { limit: 100000000, rate: 0.10, deduction: 0 },
    { limit: 500000000, rate: 0.20, deduction: 10000000 },
    { limit: 1000000000, rate: 0.30, deduction: 60000000 },
    { limit: 3000000000, rate: 0.40, deduction: 160000000 },
    { limit: Infinity, rate: 0.50, deduction: 460000000 },
];

/**
 * 증여세 계산 (간이형)
 * @param amount 증여 금액 (원)
 * @param exemption 공제액 (성인 자녀 5천, 미성년 2천 등)
 */
export const calculateGiftTax = (amount: number, exemption: number = 50000000) => {
    const taxableAmount = Math.max(0, amount - exemption);
    const bracket = TAX_BRACKETS.find(b => taxableAmount <= b.limit) || TAX_BRACKETS[TAX_BRACKETS.length - 1];

    const tax = taxableAmount * bracket.rate - bracket.deduction;
    return {
        taxableAmount,
        tax: Math.max(0, Math.floor(tax)),
        effectiveRate: taxableAmount > 0 ? (tax / taxableAmount) * 100 : 0
    };
};

/**
 * 복리 자산 성장 시뮬레이션
 * @param principal 초기 자본
 * @param annualContribution 연간 추가 납입액
 * @param rate 연 수익률 (%)
 * @param years 기간 (년)
 */
export const simulateAssetGrowth = (
    principal: number,
    annualContribution: number,
    rate: number,
    years: number
) => {
    let currentBalance = principal;
    const history = [];

    for (let i = 0; i <= years; i++) {
        history.push({
            year: i,
            balance: Math.floor(currentBalance)
        });
        currentBalance = (currentBalance + annualContribution) * (1 + rate / 100);
    }

    return {
        finalBalance: Math.floor(currentBalance),
        history
    };
};
