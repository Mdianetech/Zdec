/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
      colors: {
        // Couleurs ZDEC basées sur le logo
        zdec: {
          blue: '#1e40af',        // Bleu principal du logo
          'blue-light': '#3b82f6', // Bleu clair
          'blue-dark': '#1e3a8a',  // Bleu foncé
          orange: '#f97316',       // Orange accent du logo
          'orange-light': '#fb923c', // Orange clair
          'orange-dark': '#ea580c',  // Orange foncé
          gray: '#6b7280',         // Gris neutre
          'gray-light': '#9ca3af',  // Gris clair
          'gray-dark': '#4b5563',   // Gris foncé
        },
        primary: {
          50: '#e6e9ff',
          100: '#c4cbff',
          200: '#9ea9ff',
          300: '#7886ff',
          400: '#5263ff',
          500: '#2c40ff', // Main primary
          600: '#2736e6',
          700: '#1f2acc',
          800: '#171fb3',
          900: '#0f1399',
          950: '#070a80',
        },
        secondary: {
          50: '#eaf4ff',
          100: '#cbe4ff',
          200: '#a7d1ff',
          300: '#83beff',
          400: '#5fabff',
          500: '#3b98ff', // Main secondary
          600: '#2f7ae6',
          700: '#235dcc',
          800: '#1740b3',
          900: '#0b2399',
          950: '#000680',
        },
        accent: {
          50: '#fff2e5',
          100: '#ffdfbf',
          200: '#ffc894',
          300: '#ffb169',
          400: '#ff9a3e',
          500: '#ff8313', // Main accent
          600: '#e66b00',
          700: '#cc5f00',
          800: '#b35300',
          900: '#994700',
          950: '#803b00',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'elevation-1': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'elevation-2': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'elevation-3': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'elevation-4': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      spacing: {
        '18': '4.5rem',
      },
    },
  },
  plugins: [],
};