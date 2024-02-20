/** @type {import('tailwindcss').Config} */
export default {
  content: ['./resources/**/*.{js,ts,jsx,tsx}', './resources/**/*.blade.php'],
  theme: {
    extend: {
      colors: {
        primary: {
          10: 'rgb(var(--primary-color-10) / <alpha-value>)',
          20: 'rgb(var(--primary-color-20) / <alpha-value>)',
          30: 'rgb(var(--primary-color-30) / <alpha-value>)',
          40: 'rgb(var(--primary-color-40) / <alpha-value>)',
          50: 'rgb(var(--primary-color-50) / <alpha-value>)',
          60: 'rgb(var(--primary-color-60) / <alpha-value>)',
          70: 'rgb(var(--primary-color-70) / <alpha-value>)',
          80: 'rgb(var(--primary-color-80) / <alpha-value>)',
          90: 'rgb(var(--primary-color-90) / <alpha-value>)',
          DEFAULT: 'rgb(var(--primary-color) / <alpha-value>)',
          200: 'rgb(var(--primary-color-200) / <alpha-value>)',
          300: 'rgb(var(--primary-color-300) / <alpha-value>)',
          400: 'rgb(var(--primary-color-400) / <alpha-value>)',
          500: 'rgb(var(--primary-color-500) / <alpha-value>)',
          600: 'rgb(var(--primary-color-600) / <alpha-value>)',
          700: 'rgb(var(--primary-color-700) / <alpha-value>)',
          800: 'rgb(var(--primary-color-800) / <alpha-value>)',
          900: 'rgb(var(--primary-color-900) / <alpha-value>)',
          1000: 'rgb(var(--primary-color-1000) / <alpha-value>)'
        },
        complementary: {
          10: 'rgb(var(--complementary-color-10) / <alpha-value>)',
          20: 'rgb(var(--complementary-color-20) / <alpha-value>)',
          30: 'rgb(var(--complementary-color-30) / <alpha-value>)',
          40: 'rgb(var(--complementary-color-40) / <alpha-value>)',
          50: 'rgb(var(--complementary-color-50) / <alpha-value>)',
          60: 'rgb(var(--complementary-color-60) / <alpha-value>)',
          70: 'rgb(var(--complementary-color-70) / <alpha-value>)',
          80: 'rgb(var(--complementary-color-80) / <alpha-value>)',
          90: 'rgb(var(--complementary-color-90) / <alpha-value>)',
          DEFAULT: 'rgb(var(--complementary-color) / <alpha-value>)',
          200: 'rgb(var(--complementary-color-200) / <alpha-value>)',
          300: 'rgb(var(--complementary-color-300) / <alpha-value>)',
          400: 'rgb(var(--complementary-color-400) / <alpha-value>)',
          500: 'rgb(var(--complementary-color-500) / <alpha-value>)',
          600: 'rgb(var(--complementary-color-600) / <alpha-value>)',
          700: 'rgb(var(--complementary-color-700) / <alpha-value>)',
          800: 'rgb(var(--complementary-color-800) / <alpha-value>)',
          900: 'rgb(var(--complementary-color-900) / <alpha-value>)',
          1000: 'rgb(var(--complementary-color-1000) / <alpha-value>)'
        },
        tertiary: {
          10: 'rgb(var(--tertiary-color-10) / <alpha-value>)',
          20: 'rgb(var(--tertiary-color-20) / <alpha-value>)',
          30: 'rgb(var(--tertiary-color-30) / <alpha-value>)',
          40: 'rgb(var(--tertiary-color-40) / <alpha-value>)',
          50: 'rgb(var(--tertiary-color-50) / <alpha-value>)',
          60: 'rgb(var(--tertiary-color-60) / <alpha-value>)',
          70: 'rgb(var(--tertiary-color-70) / <alpha-value>)',
          80: 'rgb(var(--tertiary-color-80) / <alpha-value>)',
          90: 'rgb(var(--tertiary-color-90) / <alpha-value>)',
          DEFAULT: 'rgb(var(--tertiary-color) / <alpha-value>)',
          200: 'rgb(var(--tertiary-color-200) / <alpha-value>)',
          300: 'rgb(var(--tertiary-color-300) / <alpha-value>)',
          400: 'rgb(var(--tertiary-color-400) / <alpha-value>)',
          500: 'rgb(var(--tertiary-color-500) / <alpha-value>)',
          600: 'rgb(var(--tertiary-color-600) / <alpha-value>)',
          700: 'rgb(var(--tertiary-color-700) / <alpha-value>)',
          800: 'rgb(var(--tertiary-color-800) / <alpha-value>)',
          900: 'rgb(var(--tertiary-color-900) / <alpha-value>)',
          1000: 'rgb(var(--tertiary-color-1000) / <alpha-value>)'
        }
      },
      spacing: {
        'nav-height': '',
        'limit-x': '1920px',
        'limit-nav': '1024px'
      },
      fontFamily: {
        rubik: ['Rubik', 'sans-serif']
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio')
  ]
}
