/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          black: '#050505',
          dark: '#0a0a0a',
          orange: '#f97316',
        }
      }
    },
  },
  plugins: [],
}