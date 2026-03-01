import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          DEFAULT: '#8B4513',
          dark: '#5c2d0e',
          light: '#a0522d',
        },
        orange: {
          brand: '#ff6b35',
        },
        cream: {
          DEFAULT: '#f8f6f0',
          dark: '#ede9df',
        },
      },
      fontFamily: {
        sans: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
