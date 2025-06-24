/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // ✅ required for manual dark mode toggle
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
