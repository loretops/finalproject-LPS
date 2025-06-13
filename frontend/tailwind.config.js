/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f9f7f4',
          100: '#f1ede6',
          200: '#e3d9cb',
          300: '#d4c4ae',
          400: '#c2a988',
          500: '#b49167',
          600: '#a27a56',
          700: '#86634a',
          800: '#6d5140',
          900: '#5a4437',
          950: '#302420',
        },
        secondary: {
          50: '#f6f8f9',
          100: '#edf1f3',
          200: '#dce5e9',
          300: '#c1d1d9',
          400: '#a1b7c4',
          500: '#879fb1',
          600: '#708599',
          700: '#5f7082',
          800: '#515e6b',
          900: '#465059',
          950: '#272e35',
        },
        accent: {
          50: '#f5f7fa',
          100: '#eaeff5',
          200: '#d0dcea',
          300: '#a8c1d8',
          400: '#79a1c2',
          500: '#5885ad',
          600: '#446c93',
          700: '#385878',
          800: '#314964',
          900: '#2c3f54',
          950: '#1e2937',
        },
      },
      backgroundImage: {
        'hero-pattern': "url('/images/optimized/luxury-real-estate.webp')",
      },
    },
  },
  plugins: [],
}; 