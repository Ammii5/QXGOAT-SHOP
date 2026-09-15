/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './admin.html', './src/**/*.{js,jsx}'],

  // `badgeColor` arrives from the remote catalog as a raw utility string
  // (e.g. "bg-primary", "bg-rose-500"). JIT can't see those, so the classes
  // an admin is realistically going to type are pinned here.
  safelist: [
    'bg-primary', 'bg-primary-light', 'bg-primary-dark', 'bg-ink', 'bg-night',
    'bg-mint', 'bg-mint-dark', 'bg-amber', 'bg-danger', 'bg-violet-600',
    'bg-slate-700', 'bg-slate-900', 'bg-emerald-500', 'bg-emerald-600',
    'bg-rose-500', 'bg-rose-600', 'bg-red-500', 'bg-orange-500',
    'bg-amber-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500',
    'bg-teal-500', 'bg-cyan-500', 'bg-sky-500', 'bg-blue-500', 'bg-blue-600',
    'bg-indigo-500', 'bg-indigo-600', 'bg-purple-500', 'bg-purple-600',
    'bg-fuchsia-500', 'bg-pink-500', 'bg-zinc-800', 'bg-neutral-900',
  ],

  theme: {
    extend: {
      colors: {
        /* Brand blue. DEFAULT is unchanged (#1464D2) so catalog rows that
           already store "bg-primary" keep rendering exactly as before. */
        primary: {
          50: '#EEF5FF',
          100: '#D9E8FF',
          200: '#BCD7FF',
          300: '#8EBEFF',
          400: '#599BFF',
          500: '#2F7BF6',
          DEFAULT: '#1464D2',
          light: '#1E7BFF',
          dark: '#0F4FA8',
          700: '#0C3F86',
          800: '#0B3468',
          900: '#0B2B53',
        },

        /* Dark trading-surface ramp. */
        night: {
          DEFAULT: '#050A14',
          alt: '#08101F',
          card: '#0F1A2E',
          card2: '#16263F',
          wire: '#2A415F',
          text: '#93A7C4',
        },

        ink: {
          DEFAULT: '#0C1524',
          soft: '#334155',
          muted: '#64748B',
          faint: '#94A3B8',
        },

        surface: {
          DEFAULT: '#FFFFFF',
          soft: '#F4F6FA',
          sunk: '#EDF0F6',
          line: '#E3E8F0',
          hair: '#EEF1F6',
        },

        mint: { DEFAULT: '#00B383', light: '#E6F8F2', dark: '#00875F' },
        amber: { DEFAULT: '#F5A524', light: '#FEF6E7' },
        danger: { DEFAULT: '#E5484D', light: '#FDECEC' },
      },

      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },

      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],   // 11px
        xs:    ['0.75rem',   { lineHeight: '1.125rem' }],
        sm:    ['0.8125rem', { lineHeight: '1.25rem' }],
        base:  ['0.875rem',  { lineHeight: '1.375rem' }],
        md:    ['0.9375rem', { lineHeight: '1.5rem' }],
      },

      /* Elevation encodes hierarchy: hairline for rows, raised for products,
         deep only for things that float above the page. */
      boxShadow: {
        hair:    '0 1px 2px rgba(12,21,36,0.04)',
        soft:    '0 2px 8px -2px rgba(12,21,36,0.08), 0 1px 2px rgba(12,21,36,0.04)',
        card:    '0 4px 16px -4px rgba(12,21,36,0.10), 0 1px 3px rgba(12,21,36,0.05)',
        raised:  '0 12px 28px -8px rgba(12,21,36,0.16), 0 2px 6px rgba(12,21,36,0.06)',
        overlay: '0 24px 60px -12px rgba(5,10,20,0.35)',
        cta:     '0 6px 16px -4px rgba(20,100,210,0.45)',
        fab:     '0 10px 24px -6px rgba(20,100,210,0.55)',
        ring:    '0 0 0 3px rgba(20,100,210,0.18)',
      },

      borderRadius: { xl2: '1.25rem', '4xl': '2rem' },

      maxWidth: { shell: '1360px', prose: '68ch' },

      keyframes: {
        'fade-up':   { '0%': { opacity: 0, transform: 'translateY(8px)' },  '100%': { opacity: 1, transform: 'none' } },
        'fade-in':   { '0%': { opacity: 0 },                                '100%': { opacity: 1 } },
        'toast-in':  { '0%': { opacity: 0, transform: 'translateY(12px) scale(0.97)' }, '100%': { opacity: 1, transform: 'none' } },
        shimmer:     { '100%': { transform: 'translateX(100%)' } },
      },
      animation: {
        'fade-up':  'fade-up .45s cubic-bezier(.22,1,.36,1) both',
        'fade-in':  'fade-in .3s ease both',
        'toast-in': 'toast-in .28s cubic-bezier(.22,1,.36,1) both',
      },

      transitionTimingFunction: { spring: 'cubic-bezier(.22,1,.36,1)' },
    },
  },
  plugins: [],
}
