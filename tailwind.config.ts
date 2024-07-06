import { TbBackground } from "react-icons/tb";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        index: {
          "0%": { transform: "translateX(-100%)" },
          "58%": { transform: "translateX(100%)", opacity: "0" },
          "59%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(-100%)", opacity: "1" },
        },
        opac: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        motion: {
          "0%,100%": { transform: "translateX(0%)" },
          "50%": { transform: "translateX(-50%)" },
        },
      },
      screens: {
        xs: "240px",
        sm: "480px",
        md: "720px",
        lg: "1000px",
        xl: "1200px",
      },
    },
  },
  plugins: [],
};
export default config;
