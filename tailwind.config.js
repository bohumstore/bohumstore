/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Noto Sans KR', 'Malgun Gothic', 'Apple SD Gothic Neo', 'sans-serif'],
        gothic: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Noto Sans KR', 'Malgun Gothic', 'Apple SD Gothic Neo', 'sans-serif'],
      },
      keyframes: {
        'jump-glow': {
          '0%, 100%': { 
            transform: 'scale(1)', 
            filter: 'drop-shadow(0 0 0 #3a80e0)' 
          },
          '30%': { 
            transform: 'scale(1.18) translateY(-6px)', 
            filter: 'drop-shadow(0 0 8px #87b7f0)' 
          },
          '60%': { 
            transform: 'scale(0.95) translateY(2px)', 
            filter: 'drop-shadow(0 0 0 #3a80e0)' 
          }
        }
      },
      animation: {
        'jump-glow': 'jump-glow 1.2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
