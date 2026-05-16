import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist)", "system-ui", "sans-serif"],
        geist: ["var(--font-geist)", "system-ui", "sans-serif"],
      },
    },
  },
} satisfies Config;
