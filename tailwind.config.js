const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: ['./src/**/*.{astro,html,js,md,ts}'],

  theme: {
    extend: {
      fontFamily: {
        sans: ['"Raleway"', ...defaultTheme.fontFamily.sans],
        mono: ['"Fira Code"', ...defaultTheme.fontFamily.mono]
      },
      colors: {
        'royse-red': '#a52a2a',
        'programer-peach': '#ce9a5f',
        'dorkness-rising': '#1a1921',
        'not-white': '#fafafa'
      }
    }
  },

  plugins: []
}
