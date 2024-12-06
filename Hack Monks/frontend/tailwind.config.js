/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Make sure to include all relevant files
  ],
  theme: {
    extend: {
      keyframes: {
        'star': {
          '0%': {
            transform: 'translateY(0px)',
          },
          '100%': {
            transform: 'translateY(-2000px)',
          },
        },
        'star2': {
          '0%': {
            transform: 'translateY(0px)',
          },
          '100%': {
            transform: 'translateY(-2000px)',
          },
        },
        'star3': {
          '0%': {
            transform: 'translateY(0px)',
          },
          '100%': {
            transform: 'translateY(-2000px)',
          },
        },
      },
      animation: {
        star: 'star 50s linear infinite',
        star2: 'star2 100s linear infinite',
        star3: 'star3 150s linear infinite',
      },
    },
  },
  plugins: [],
}
