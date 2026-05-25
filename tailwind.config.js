/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Sora"', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['3.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '800' }],
        'display-md': ['2.75rem', { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '800' }],
        'display-sm': ['2rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
      },
      spacing: {
        sidebar: '17rem',
        'sidebar-collapsed': '5.25rem',
      },
      borderRadius: {
        card: '1.5rem',
        panel: '1.75rem',
        pill: '9999px',
      },
      boxShadow: {
        glow: '0 30px 90px rgba(59, 130, 246, 0.18)',
        'glow-violet': '0 30px 90px rgba(139, 92, 246, 0.16)',
        soft: '0 18px 55px rgba(15, 23, 42, 0.14)',
        panel: '0 18px 50px rgba(15, 23, 42, 0.18)',
        'inner-glow': 'inset 0 1px 0 rgba(255, 255, 255, 0.06)',
      },
      colors: {
        surface: {
          DEFAULT: '#090b14',
          raised: '#0f1424',
          overlay: '#12182b',
        },
        glass: {
          DEFAULT: 'rgba(255, 255, 255, 0.06)',
          border: 'rgba(255, 255, 255, 0.1)',
          strong: 'rgba(255, 255, 255, 0.1)',
        },
        accent: {
          blue: '#3b82f6',
          violet: '#8b5cf6',
          cyan: '#22d3ee',
        },
        muted: {
          DEFAULT: '#94a3b8',
          foreground: '#cbd5e1',
        },
        brand: {
          from: '#3b82f6',
          to: '#8b5cf6',
        },
      },
      backgroundImage: {
        'hero-radial':
          'radial-gradient(circle at top left, rgba(59,130,246,0.16), transparent 26%), radial-gradient(circle at bottom right, rgba(168,85,247,0.16), transparent 22%)',
        'brand-gradient': 'linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)',
        'sidebar-gradient': 'linear-gradient(180deg, rgba(15,23,42,0.95) 0%, rgba(9,11,20,0.98) 100%)',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      animation: {
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        shimmer: 'shimmer 1.5s ease-in-out infinite',
      },
      keyframes: {
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};
