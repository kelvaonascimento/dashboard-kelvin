import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#7C5CFC',
          light: '#EDE9FE',
          dark: '#6C4CE6',
        },
        brand: {
          orange: '#FF6B35',
          'orange-light': '#FF8A5C',
          'orange-dark': '#E55A25',
        },
      },
    },
  },
  plugins: [],
}
export default config
