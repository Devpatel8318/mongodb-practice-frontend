/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				'brand-bg': '#F3F4F6', // bg-gray-100
				'brand-hover': '#F3F4F6', // bg-gray-100
				'brand-lightest': '#f9fafb', // bg-gray-50'
				'brand-lighter': '#e5e7eb', // bg-gray-200
			},
		},
	},
	plugins: [],
}
