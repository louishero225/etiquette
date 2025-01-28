/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B00', // Orange
          dark: '#CC5500',
          light: '#FF8533',
        },
        secondary: {
          DEFAULT: '#0066CC', // Bleu
          dark: '#004C99',
          light: '#3385D6',
        },
      },
    },
  },
  plugins: [],
}
