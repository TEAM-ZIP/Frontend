/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      fontSize: {
        heading2: ['4.25rem'],
        heading3: ['3rem'],
        heading4: ['2.25rem'],
        heading5: ['1.875rem'],
        heading6: ['1.5rem'],
        body1: ['1.25rem'],
        body2: ['1.125rem'],
        body3: ['1rem'],
        body4: ['.875rem'],
        caption1: ['.75rem'],
      },
      letterSpacing: {
        normal: '-0.48px',
        large: '-0.56px',
      },
      colors: {
        main_1: '#6589DE',
        main_2: '#DBE5FF',
        main_3: '#4869C3',
        main_4: '#E1ECF6',
        red_1: '#FF0101',
        gray_1: '#979797',
        gray_2: '#747070',
      },
      backgroundImage: {
        'key-gradient': 'linear-gradient(180deg, #E1ECF6 0%, #DAE4FD 31%, #DBE5FD 61.5%, #EAF1F8 100%)',
      },
    },
  },
  plugins: [require('tailwind-scrollbar'), require('tailwind-scrollbar-hide')],
};
