/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        card: {
          DEFAULT: '#111111',
          foreground: '#FFFFFF'
        }
      }
    },
  },
  plugins: [],
} 