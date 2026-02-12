/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './templates/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Noto Sans KR',
          'Malgun Gothic',
          'Apple SD Gothic Neo',
          'sans-serif',
        ],
        gothic: [
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Noto Sans KR',
          'Malgun Gothic',
          'Apple SD Gothic Neo',
          'sans-serif',
        ],
      },
      colors: {
        /* Button */
        button: {
          DEFAULT: 'var(--button-default)',
          hover: 'var(--button-hover)',
          press: 'var(--button-press)',
          disabled: 'var(--button-disabled)',
          talk: 'var(--button-talk)',
        },
        /* Category */
        category: {
          health: 'var(--category-health)',
          variable: 'var(--category-variable)',
          life: 'var(--category-life)',
          purple: 'var(--category-purple)',
        },
        /* Status */
        status: {
          green: 'var(--status-green)',
          yellow: 'var(--status-yellow)',
          red: 'var(--status-red)',
          info: 'var(--status-info)',
        },
        /* Brand */
        brand: {
          primary: 'var(--brand-primary)',
          'primary-hover': 'var(--brand-primary-hover)',
          'primary-soft': 'var(--brand-primary-soft)',
          'primary-disabled': 'var(--brand-primary-disabled)',
        },
        /* Border */
        'border-default': 'var(--border-default)',
        'border-focus': 'var(--border-focus)',
        'border-accent': 'var(--border-accent)',
        /* Card */
        card: {
          service: 'var(--card-service)',
          review: 'var(--card-review)',
        },
        /* Background */
        'bg-blue': 'var(--bg-blue)',
        'page-bg': 'var(--page-bg)',
        'section-bg': 'var(--section-bg)',
        divider: 'var(--divider)',
        /* Text */
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'text-disabled': 'var(--text-disabled)',
        'text-inverse': 'var(--text-inverse)',
        /* 제품 페이지 전용 */
        'product-primary': 'var(--product-primary)',
      },
    },
  },
  plugins: [],
};
