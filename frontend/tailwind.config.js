/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        solar: {
          light: "#ffe38b",
          DEFAULT: "#e4b021",
          dark: "#b88412",
        },
        farm: {
          light: "#90d88f",
          DEFAULT: "#2f7d32",
          dark: "#1f5a2a",
        },
      },
      fontFamily: {
        display: ["Poppins", "system-ui", "sans-serif"],
        sans: ["Hind", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
