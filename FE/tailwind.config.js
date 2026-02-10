/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f7ff',
          100: '#ebf0ff',
          200: '#d6e0ff',
          300: '#adc2ff',
          400: '#7a9aff',
          500: '#667eea',
          600: '#5568d3',
          700: '#4651b8',
          800: '#3a4294',
          900: '#2f3575',
        }
      }
    },
  },
  plugins: [],
}
