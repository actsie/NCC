/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        purple: {
          50: '#F8F6FE',
          100: '#EBE5FD',
          200: '#D7CBFC',
          300: '#C3B1FA',
          400: '#AF97F8',
          500: '#7866CC',
          600: '#5E50A0',
          700: '#362B6B',
          800: '#191046',
          900: '#1B0A38',
        }
      },
      keyframes: {
        'slide-up-peek': {
          '0%': { transform: 'translateY(60%)' },
          '100%': { transform: 'translateY(0)' }
        }
      },
      animation: {
        'slide-up-peek': 'slide-up-peek 1s ease-out'
      }
    },
  },
  plugins: [],
}