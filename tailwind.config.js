/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0F172A',
        royal: '#1E3A8A',
        accent: '#F97316',
        success: '#22C55E',
        bg: '#F8FAFC',
        ink: '#111827',
        muted: '#6B7280'
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      borderRadius: {
        card: '20px',
        pill: '999px'
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgba(15, 23, 42, 0.08)',
        lifted: '0 12px 40px -8px rgba(15, 23, 42, 0.18)',
        glow: '0 0 0 1px rgba(249, 115, 22, 0.15), 0 8px 30px -6px rgba(249, 115, 22, 0.35)'
      },
      backgroundImage: {
        'grad-blue': 'linear-gradient(135deg, #1E3A8A 0%, #312E81 100%)',
        'grad-orange': 'linear-gradient(135deg, #F97316 0%, #FACC15 100%)',
        'grad-hero': 'radial-gradient(circle at 20% 20%, rgba(30,58,138,0.10), transparent 50%), radial-gradient(circle at 80% 30%, rgba(249,115,22,0.10), transparent 50%)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' }
        },
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: 0.45 },
          '100%': { transform: 'scale(2.4)', opacity: 0 }
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'spin-slow': 'spin-slow 12s linear infinite',
        ripple: 'ripple 0.6s ease-out'
      }
    }
  },
  plugins: []
}
