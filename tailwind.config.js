/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Pretendard', 'sans-serif'],
			},
			colors: {
				main_1: '#6589DE',
				main_2: '#DBE5FF',
				main_3: '#4869C3',
				main_4: '#E1ECF6',
			},
		},
	},
	plugins: [require('tailwind-scrollbar')],
};
