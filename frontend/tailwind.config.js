/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        saffron: {
          light: '#f3833f',
          DEFAULT: '#d96b27',
          dark: '#b84f18',
        },
        gold: {
          DEFAULT: '#dfb238',
          glow: 'rgba(223, 178, 56, 0.35)',
        },
        cream: {
          light: '#fefcf7',
          DEFAULT: '#faf5eb',
        },
        sienna: {
          DEFAULT: '#251206',
          light: '#3e2213',
        }
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
