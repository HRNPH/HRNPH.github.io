import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: '#f5f5f5',
				foreground: '#333333',
				// Base colors
				gray: {
					800: '#1F2937',
					900: '#111827',
				},
				// Gradient colors
				blue: {
					300: '#93C5FD',
					400: '#60A5FA',
					500: '#3B82F6',
					600: '#2563EB',
					900: '#1E3A8A',
				},
				purple: {
					400: '#C084FC',
					500: '#A855F7',
					900: '#581C87',
				},
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			animation: {
				'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'tilt': 'tilt 10s infinite linear',
			},
			keyframes: {
				tilt: {
					'0%, 50%, 100%': {
						transform: 'rotate(0deg)',
					},
					'25%': {
						transform: 'rotate(0.5deg)',
					},
					'75%': {
						transform: 'rotate(-0.5deg)',
					},
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			spacing: {
				18: '4.5rem', // Custom gap
			},
		},
		fontFamily: {
			mitrSans: ['var(--font-mitr-sans)'],
		},
	},
	plugins: [
		tailwindcssAnimate,
		require('@tailwindcss/aspect-ratio'),
	]
} satisfies Config;