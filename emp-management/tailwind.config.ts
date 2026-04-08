import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './styles/**/*.{css}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary brand — DEFAULT enables bg-primary / text-primary utility classes
        primary: {
          DEFAULT: '#0066cc',
          50:  '#f0f6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#3399ff',
          500: '#0066cc',
          600: '#0052a3',
          700: '#004499',
          800: '#003366',
          900: '#001a33',
        },
        // Semantic
        success: { DEFAULT: '#10B981', light: '#D1FAE5', dark: '#059669' },
        warning: { DEFAULT: '#F59E0B', light: '#FEF3C7', dark: '#D97706' },
        danger:  { DEFAULT: '#EF4444', light: '#FEE2E2', dark: '#DC2626' },
        info:    { DEFAULT: '#0EA5E9', light: '#CFFAFE', dark: '#0284C7' },
        // Slate brand secondary
        slate: {
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#64748B',
          700: '#475569',
          800: '#E2E8F0',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        'xs':  ['12px', { lineHeight: '1.4' }],
        'sm':  ['14px', { lineHeight: '1.5' }],
        'base':['16px', { lineHeight: '1.5' }],
        'lg':  ['18px', { lineHeight: '1.5' }],
        'xl':  ['20px', { lineHeight: '1.4' }],
        '2xl': ['24px', { lineHeight: '1.3' }],
        '3xl': ['32px', { lineHeight: '1.2' }],
      },
      boxShadow: {
        'card':    '0 1px 2px rgba(0,0,0,0.05)',
        'dropdown':'0 4px 6px rgba(0,0,0,0.1)',
        'modal':   '0 10px 15px rgba(0,0,0,0.1)',
        'elevated':'0 20px 25px rgba(0,0,0,0.15)',
        'focus':   '0 0 0 3px rgba(0,102,204,0.15)',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      spacing: {
        'xs':  '4px',
        'sm':  '8px',
        'md':  '16px',
        'lg':  '24px',
        'xl':  '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
        'spin-slow':  'spin 1.5s linear infinite',
        'fade-in':    'fadeIn 0.2s ease-out',
        'slide-down': 'slideDown 0.2s ease-out',
        'fade-in-up': 'fadeInUp 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn:    { from: { opacity: '0' }, to: { opacity: '1' } },
        slideDown: { from: { opacity: '0', transform: 'translateY(-8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeInUp: { from: { opacity: '0', transform: 'translateY(30px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideInRight: { from: { opacity: '0', transform: 'translateX(30px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        slideInLeft: { from: { opacity: '0', transform: 'translateX(-30px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        scaleIn: { from: { opacity: '0', transform: 'scale(0.95)' }, to: { opacity: '1', transform: 'scale(1)' } },
      },
    },
  },
  plugins: [],
}
export default config
