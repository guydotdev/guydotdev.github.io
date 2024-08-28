const defaultTheme = require('tailwindcss/defaultTheme')
const typography = require('@tailwindcss/typography')

export default {
  content: ['./src/**/*.{astro,html,js,md,ts}'],

  theme: {
    extend: {
      fontFamily: {
        serif: ['"Arvo"', ...defaultTheme.fontFamily.serif],
        sans: ['"Raleway"', ...defaultTheme.fontFamily.sans],
        mono: ['"Fira Code"', ...defaultTheme.fontFamily.mono],
        script: ['"Edu VIC WA NT Beginner"']
      },
      colors: {
        'royse-red': '#a52a2a',
        'programer-peach': '#ce9a5f',
        'dorkness-rising': '#1a1921',
        'not-white': '#fafafa'
      }
    }
  },

  plugins: [typography]
}
