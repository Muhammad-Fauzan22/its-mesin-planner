/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        its: {
          red: '#C41230',
          blue: '#0056A3',
          yellow: '#FFD200'
        }
      }
    },
  },
  plugins: [],
}