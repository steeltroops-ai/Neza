/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      // Premium Color System - Globally Neutral
      colors: {
        // Neza Design System Colors
        'neza-primary': {
          50: 'var(--neza-primary-50)',
          100: 'var(--neza-primary-100)',
          200: 'var(--neza-primary-200)',
          300: 'var(--neza-primary-300)',
          400: 'var(--neza-primary-400)',
          500: 'var(--neza-primary-500)',
          600: 'var(--neza-primary-600)',
          700: 'var(--neza-primary-700)',
          800: 'var(--neza-primary-800)',
          900: 'var(--neza-primary-900)',
        },
        'neza-success': {
          50: 'var(--neza-success-50)',
          500: 'var(--neza-success-500)',
          600: 'var(--neza-success-600)',
        },
        'neza-warning': {
          50: 'var(--neza-warning-50)',
          500: 'var(--neza-warning-500)',
          600: 'var(--neza-warning-600)',
        },
        'neza-error': {
          50: 'var(--neza-error-50)',
          500: 'var(--neza-error-500)',
          600: 'var(--neza-error-600)',
        },
        'neza-gray': {
          50: 'var(--neza-gray-50)',
          100: 'var(--neza-gray-100)',
          200: 'var(--neza-gray-200)',
          300: 'var(--neza-gray-300)',
          400: 'var(--neza-gray-400)',
          500: 'var(--neza-gray-500)',
          600: 'var(--neza-gray-600)',
          700: 'var(--neza-gray-700)',
          800: 'var(--neza-gray-800)',
          900: 'var(--neza-gray-900)',
          950: 'var(--neza-gray-950)',
        },

        // Legacy Tailwind Colors for Compatibility
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        // Primary - Professional Blue
        primary: {
          50: 'hsl(214, 100%, 97%)',
          100: 'hsl(214, 95%, 93%)',
          200: 'hsl(213, 97%, 87%)',
          300: 'hsl(212, 96%, 78%)',
          400: 'hsl(213, 94%, 68%)',
          500: 'hsl(217, 91%, 60%)', // Base primary
          600: 'hsl(221, 83%, 53%)',
          700: 'hsl(224, 76%, 48%)',
          800: 'hsl(226, 71%, 40%)',
          900: 'hsl(224, 64%, 33%)',
          950: 'hsl(226, 55%, 21%)',
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },

        // Secondary - Sophisticated Gray
        secondary: {
          50: 'hsl(210, 40%, 98%)',
          100: 'hsl(210, 40%, 96%)',
          200: 'hsl(214, 32%, 91%)',
          300: 'hsl(213, 27%, 84%)',
          400: 'hsl(215, 20%, 65%)',
          500: 'hsl(215, 16%, 47%)', // Base secondary
          600: 'hsl(215, 19%, 35%)',
          700: 'hsl(215, 25%, 27%)',
          800: 'hsl(217, 33%, 17%)',
          900: 'hsl(222, 84%, 5%)',
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },

        // Accent - Success Green
        accent: {
          50: 'hsl(138, 76%, 97%)',
          100: 'hsl(141, 84%, 93%)',
          200: 'hsl(141, 79%, 85%)',
          300: 'hsl(142, 77%, 73%)',
          400: 'hsl(142, 69%, 58%)',
          500: 'hsl(142, 71%, 45%)', // Base accent
          600: 'hsl(142, 76%, 36%)',
          700: 'hsl(142, 72%, 29%)',
          800: 'hsl(142, 64%, 24%)',
          900: 'hsl(143, 61%, 20%)',
          950: 'hsl(144, 60%, 12%)',
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },

        // Semantic Colors
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        // Premium Glass Effects
        glass: {
          light: 'rgba(255, 255, 255, 0.1)',
          medium: 'rgba(255, 255, 255, 0.2)',
          dark: 'rgba(0, 0, 0, 0.1)',
        },
      },

      // Premium Typography
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
        mono: ['var(--font-mono)', ...fontFamily.mono],
      },

      // Enhanced Border Radius
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      // Premium Animations
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'slide-in-from-top': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'slide-in-from-bottom': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'slide-in-from-left': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-in-from-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'scale-out': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(59, 130, 246, 0.8)' },
        },
        // Neza Design System Keyframes
        'neza-shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'neza-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'neza-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'neza-bounce': {
          '0%, 20%, 53%, 80%, 100%': { transform: 'translate3d(0,0,0)' },
          '40%, 43%': { transform: 'translate3d(0, -30px, 0)' },
          '70%': { transform: 'translate3d(0, -15px, 0)' },
          '90%': { transform: 'translate3d(0, -4px, 0)' },
        },
        'neza-slide-in': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'neza-scale-in': {
          from: { opacity: '0', transform: 'scale(0.9)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-out': 'fade-out 0.5s ease-out',
        'slide-in-from-top': 'slide-in-from-top 0.3s ease-out',
        'slide-in-from-bottom': 'slide-in-from-bottom 0.3s ease-out',
        'slide-in-from-left': 'slide-in-from-left 0.3s ease-out',
        'slide-in-from-right': 'slide-in-from-right 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'scale-out': 'scale-out 0.2s ease-out',
        shimmer: 'shimmer 2s infinite',
        'pulse-glow': 'pulse-glow 2s infinite',
        // Neza Design System Animations
        'neza-shimmer': 'neza-shimmer 2s infinite',
        'neza-float': 'neza-float 6s ease-in-out infinite',
        'neza-pulse': 'neza-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'neza-bounce': 'neza-bounce 1s infinite',
        'neza-slide-in':
          'neza-slide-in 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'neza-scale-in':
          'neza-scale-in 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },

      // Premium Shadows
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-inset': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
        premium: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'premium-colored': '0 25px 50px -12px rgba(59, 130, 246, 0.25)',
        glow: '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-lg': '0 0 40px rgba(59, 130, 246, 0.4)',
      },

      // Premium Backdrop Blur
      backdropBlur: {
        xs: '2px',
        '4xl': '72px',
      },

      // Enhanced Spacing
      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
