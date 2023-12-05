/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      cinzel: ['Cinzel', 'serif'],
      roboto: ['Roboto', 'sans-serif']
    },
    extend: {},
  },
  plugins: [require("daisyui")],
}