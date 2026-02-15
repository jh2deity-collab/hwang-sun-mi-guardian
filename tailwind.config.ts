import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#002060",
                accent: "#C5A028",
                navy: "#001A4D",
                gold: "#C5A028",
                silver: "#F2F4F7",
                ivory: "#F9F9F9",
            },
            fontFamily: {
                serif: ["var(--font-serif)"],
                sans: ["var(--font-sans)"],
            },
            boxShadow: {
                premium: "0 20px 40px rgba(0, 32, 96, 0.08)",
                glass: "0 8px 32px 0 rgba(0, 32, 96, 0.05)",
            },
        },
    },
    plugins: [],
};
export default config;
