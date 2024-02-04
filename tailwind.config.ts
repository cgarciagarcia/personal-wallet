import { Config } from "tailwindcss/types/config";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./resources/**/*.{js,ts,jsx,tsx}", "./resources/**/*.blade.php"],
  theme: {
    extend: {
      spacing: {
        "limit-x": "1920px",
        "limit-nav": "1024px",
      },
    },
  },
  plugins: [],
} satisfies Config;
