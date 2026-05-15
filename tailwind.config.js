/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Plus Jakarta Sans"',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(99, 102, 241, 0.45)',
        'glow-sm': '0 0 24px -6px rgba(139, 92, 246, 0.35)',
        glass: '0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.06)',
      },
      backgroundImage: {
        'mesh-gradient':
          'radial-gradient(ellipse 80% 60% at 20% 10%, rgba(99,102,241,0.35), transparent 55%), radial-gradient(ellipse 70% 50% at 80% 0%, rgba(168,85,247,0.28), transparent 50%), radial-gradient(ellipse 60% 40% at 50% 100%, rgba(34,211,238,0.12), transparent 45%)',
      },
      animation: {
        shimmer: 'shimmer 2.2s ease-in-out infinite',
        pulseSoft: 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.85' },
          '50%': { transform: 'scale(1.02)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('light', 'html.light &')
    },
  ],
}
