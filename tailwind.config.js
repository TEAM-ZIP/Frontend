/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      fontSize: {
        base: '14px',
        lg: '16px',
      },
      letterSpacing: {
        normal: '-0.48px',
      },
      colors: {
        main_1: '#6589DE',
        main_2: '#DBE5FF',
        main_3: '#4869C3',
        main_4: '#E1ECF6',
        red_1: '#FF0101',
        gray_1: '#979797',
      },
      backgroundImage: {
        'key-gradient': 'linear-gradient(180deg, #E1ECF6 0%, #DAE4FD 31%, #DBE5FD 61.5%, #EAF1F8 100%)',
      },
    },
  },
  plugins: [require('tailwind-scrollbar'), require('tailwind-scrollbar-hide')],
};
