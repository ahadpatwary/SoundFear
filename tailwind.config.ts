import type { Config } from 'tailwindcss';

/**
 * All colors come from the CSS variables in src/app/globals.css (HSL triplets),
 * wrapped with <alpha-value> so opacity utilities like `bg-accent/20` work.
 */
const token = (name: string) => `hsl(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: token('background'),
        foreground: token('foreground'),
        'muted-foreground': token('muted-foreground'),
        'ink-muted': token('ink-muted'),
        border: token('border'),
        ring: token('ring'),
        mint: token('mint'),
        success: token('success'),
        danger: token('danger'),
        surface: {
          DEFAULT: token('surface'),
          2: token('surface-2'),
          raised: token('surface-raised'),
        },
        accent: {
          DEFAULT: token('accent'),
          strong: token('accent-strong'),
          foreground: token('accent-foreground'),
        },
      },
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        wave: {
          '0%, 100%': { transform: 'scaleY(0.35)' },
          '50%': { transform: 'scaleY(1)' },
        },
        'ring-pulse': {
          '0%': { transform: 'scale(0.9)', opacity: '0.5' },
          '100%': { transform: 'scale(1.35)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.35s ease-out both',
        wave: 'wave 1.8s ease-in-out infinite',
        'ring-pulse': 'ring-pulse 4s ease-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
