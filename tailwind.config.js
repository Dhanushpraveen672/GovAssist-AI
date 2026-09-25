/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#F0FDFA',  // Light background
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6', // Accent
          600: '#0D9488',
          700: '#0F766E', // Primary
          800: '#115E59',
          900: '#134E4A', // Text dark teal
          950: '#042F2E',
        },
        gov: {
          darkBg: '#092625',
          panelDark: '#0B3330',
          lightText: '#134E4A',
          saffron: '#FF9933',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 118, 110, 0.08)',
        'soft-lg': '0 10px 30px -4px rgba(15, 118, 110, 0.14)',
        'teal-glow': '0 0 30px rgba(20, 184, 166, 0.3)',
      },
    },
  },
  plugins: [],
}
