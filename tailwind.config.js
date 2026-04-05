/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        lato: ["Lato", "sans-serif"],
      },
      colors: {
        black: "#232323",
        custom: {
          success: "#8ADD21",
          danger: "#DD2121",
          primary: {
            1: "#343C6A",
            2: "#718EBF",
            3: "#F5F7FA",
          },
          secondary: {
            1: "#B5D2CB",
            2: "#CDE1DC",
            3: "#E6F0ED",
          },
          accent: {
            1: "#40E0BA",
            2: "#7FEAD1",
            3: "#BFF4E8",
          },
        },
      },
    },
    screens: {
      ...defaultTheme.screens,
    },
  },
  plugins: [],
};
