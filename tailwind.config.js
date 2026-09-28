/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: {
          950: '#070a0f',
          900: '#0b1018',
          850: '#0f1623',
          800: '#141c2e',
          700: '#1c2740',
          600: '#283656',
        },
        accent: {
          400: '#00d4aa',
          500: '#00bf94',
          600: '#00a67d',
          700: '#008866',
        },
        ember: {
          400: '#ff7a3d',
          500: '#f56a2e',
          600: '#e25826',
        },
        slate: {
          350: '#a3afc2',
          450: '#78849a',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'slide-in': 'slideIn 0.5s ease-out forwards',
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
        'scan': 'scan 4s linear infinite',
        'spin-slow': 'spin 2s linear infinite',
        'ping-slow': 'pingSlow 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        pingSlow: {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '75%, 100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
    },
  },
  plugins: [],
};
