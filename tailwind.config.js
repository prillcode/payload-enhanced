/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/(frontend)/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Forest Green shades
        forest: {
          50: '#f0f9f0',
          100: '#dcf2dc',
          200: '#bce5bc',
          300: '#8fd18f',
          400: '#5bb85b',
          500: '#369636', // Main forest green
          600: '#2d7d2d',
          700: '#256625',
          800: '#1f521f',
          900: '#1a441a',
        },
        // Earth Brown shades
        earth: {
          50: '#faf8f5',
          100: '#f4efe6',
          200: '#e7dccc',
          300: '#d4c2a8',
          400: '#bfa080',
          500: '#a67c52', // Main earth brown
          600: '#8b6640',
          700: '#6b4e2f',
          800: '#4a3620',
          900: '#2d2014',
        },
        // Sunset Orange shades
        sunset: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316', // Main sunset orange
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
      },
    },
  },
  plugins: [],
}