/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary palette
        terracotta: {
          50:  '#FDF2EE',
          100: '#FAE0D6',
          200: '#F4C0AD',
          300: '#EC9A7D',
          400: '#E06030',
          DEFAULT: '#C1440E',
          600: '#A03508',
          700: '#7E2906',
          800: '#5C1E04',
          900: '#3A1302',
        },
        amber: {
          50:  '#FEF9F0',
          100: '#FCF0DA',
          200: '#F8DEB0',
          300: '#F3C87A',
          400: '#F0A850',
          DEFAULT: '#E8943A',
          600: '#C97820',
          700: '#A05E16',
          800: '#78440F',
          900: '#502D08',
        },
        forest: {
          50:  '#EEF4F0',
          100: '#D4E6DA',
          200: '#A9CDB5',
          300: '#72AA87',
          400: '#4A8A62',
          500: '#2D5A3D',
          DEFAULT: '#1A3A2A',
          700: '#122A1E',
          800: '#0B1C14',
          900: '#050E0A',
        },
        sage: {
          50:  '#F0F5F2',
          100: '#D8EAE0',
          200: '#B1D5C1',
          300: '#84B99C',
          400: '#6A9C79',
          DEFAULT: '#4A7C59',
          600: '#3A6246',
          700: '#2B4A34',
          800: '#1C3222',
          900: '#0E1A11',
        },
        // Neutral palette
        ivory: {
          DEFAULT: '#FAF7F2',
          dark: '#F0EBE1',
          darker: '#E5DDD0',
        },
        stone: {
          50:  '#F5F3F1',
          100: '#E8E4DF',
          200: '#D1CBC3',
          DEFAULT: '#8A8078',
          400: '#6B6059',
          500: '#524840',
          600: '#3A3028',
        },
        ash: {
          DEFAULT: '#C8C2B8',
          light: '#DDD9D3',
          dark: '#A8A29A',
        },
        // Status colors
        success: {
          light: '#D4EDDA',
          DEFAULT: '#2E7D52',
          dark: '#1D5235',
        },
        warning: {
          light: '#FFF3CD',
          DEFAULT: '#C47A1E',
          dark: '#8A5514',
        },
        danger: {
          light: '#FDDEDE',
          DEFAULT: '#B33A2A',
          dark: '#7A2219',
        },
        info: {
          light: '#D1E7F5',
          DEFAULT: '#2B5F8C',
          dark: '#1C3F5E',
        },
      },

      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Courier New"', 'monospace'],
      },

      fontSize: {
        'display-xl': ['5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'heading-lg': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading-md': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.005em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body-md': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'tiny': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.02em' }],
      },

      boxShadow: {
        'sm-warm':  '0 2px 8px rgba(26, 58, 42, 0.06)',
        'md-warm':  '0 4px 20px rgba(26, 58, 42, 0.10)',
        'lg-warm':  '0 8px 40px rgba(26, 58, 42, 0.14)',
        'xl-warm':  '0 20px 60px rgba(26, 58, 42, 0.18)',
        'cta':      '0 8px 32px rgba(193, 68, 14, 0.30)',
        'cta-lg':   '0 12px 48px rgba(193, 68, 14, 0.40)',
        'inner-warm': 'inset 0 2px 6px rgba(26, 58, 42, 0.08)',
      },

      borderRadius: {
        'soft': '20px',
        'card': '12px',
      },

      backgroundImage: {
        'gradient-hero':    'linear-gradient(135deg, #1A3A2A 0%, #2D5A3D 50%, #1A3A2A 100%)',
        'gradient-cta':     'linear-gradient(135deg, #C1440E 0%, #E8943A 100%)',
        'gradient-warm':    'linear-gradient(180deg, #FAF7F2 0%, #F0EBE1 100%)',
        'gradient-card':    'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 100%)',
        'gradient-forest':  'linear-gradient(135deg, #1A3A2A 0%, #4A7C59 100%)',
        'gradient-amber':   'linear-gradient(135deg, #E8943A 0%, #C1440E 100%)',
        'gradient-overlay': 'linear-gradient(to bottom, rgba(26,58,42,0.1) 0%, rgba(26,58,42,0.7) 100%)',
      },

      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },

      maxWidth: {
        'content': '1280px',
        'narrow': '768px',
        'wide': '1440px',
      },

      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-soft': 'bounceSoft 1s ease-in-out infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(0.97)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },

      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-sm': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },

      screens: {
        'xs': '375px',
      },
    },
  },
  plugins: [],
}
