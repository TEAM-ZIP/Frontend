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
			},
		},
	},
	plugins: [require('tailwind-scrollbar')],
};
