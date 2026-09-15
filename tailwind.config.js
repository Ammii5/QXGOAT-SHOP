/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1464D2',
          light: '#1E7BFF',
          dark: '#0F4FA8',
        },
        ink: {
          DEFAULT: '#111827',
          muted: '#6B7280',
        },
        surface: {
          soft: '#F7F7F7',
          line: '#EEEEEE',
        },
        night: {
          DEFAULT: '#020B18',
          alt: '#031126',
          card: '#0E1B30',
          card2: '#123055',
          wire: '#3D5C86',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        card: '0 3px 10px rgba(0,0,0,0.08)',
        soft: '0 3px 10px rgba(0,0,0,0.06)',
        cta: '0 8px 18px rgba(20,100,210,0.4)',
        fab: '0 10px 22px rgba(20,100,210,0.45)',
      },
      borderRadius: {
        xl2: '22px',
      },
    },
  },
  plugins: [],
}
