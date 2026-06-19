import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0c",
        panel: "#121217",
        line: "#22222b",
        ink: "#f2f2f5",
        muted: "#8a8a99",
        acid: "#c6ff3a",
        gold: "#c9a961",
        navy: "#1b2a4a",
      },
      fontFamily: {
        sans: ["'Space Grotesk'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      keyframes: {
        pulse2: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
        reveal: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        pulse2: "pulse2 2s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
