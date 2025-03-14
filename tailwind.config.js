const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        'xs': '0.775rem',
        'sm': '0.975rem',
        'base': '1.075rem',
        'lg': '1.125rem',
      },
      fontFamily: {
        sans: ['Untitled-Sans', 'ui-sans'],
        serif: ['ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
        title: ['Tiempos', 'ui-serif'], // new font family for titles
      },
      colors: {
        blue: {
          300: '#7ec7e8',
          700: '#174fce',
        },
        coal: {
          'light': '#323639',
          'dark': '#242933'
        },
        gray: colors.gray,
        orange: '#FF6600',
        black: '#111111',
        white: '#FFFFFF',
        paper: '#f6f6ef',
      },
    },
  },
  variants: {},
  plugins: [],
}
