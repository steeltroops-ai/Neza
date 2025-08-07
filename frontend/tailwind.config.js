/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          light: "hsl(var(--primary-light))",
          dark: "hsl(var(--primary-dark))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          light: "hsl(var(--secondary-light))",
          dark: "hsl(var(--secondary-dark))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          light: "hsl(var(--accent-light))",
          dark: "hsl(var(--accent-dark))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        surface: {
          1: "hsl(var(--surface-1))",
          2: "hsl(var(--surface-2))",
          3: "hsl(var(--surface-3))",
        },
        // Category colors for service marketplace
        category: {
          home: "hsl(var(--category-home))",
          cleaning: "hsl(var(--category-cleaning))",
          education: "hsl(var(--category-education))",
          beauty: "hsl(var(--category-beauty))",
          auto: "hsl(var(--category-auto))",
          food: "hsl(var(--category-food))",
          creative: "hsl(var(--category-creative))",
          other: "hsl(var(--category-other))",
        },
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius)",
        sm: "calc(var(--radius) - 4px)",
        xl: "var(--radius-xl)",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: 'var(--font-size-xs)',
        sm: 'var(--font-size-sm)',
        base: 'var(--font-size-base)',
        lg: 'var(--font-size-lg)',
        xl: 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
        '4xl': 'var(--font-size-4xl)',
        '5xl': 'var(--font-size-5xl)',
        '6xl': 'var(--font-size-6xl)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 183, 183, 0.3), 0 8px 32px rgba(0, 0, 0, 0.1)',
        'glow-secondary': '0 0 20px rgba(255, 107, 71, 0.3), 0 8px 32px rgba(0, 0, 0, 0.1)',
        'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'medium': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'strong': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "fadeIn": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        "slideUp": {
          from: { opacity: 0, transform: "translateY(30px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        "slideInLeft": {
          from: { opacity: 0, transform: "translateX(-50px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        "slideInRight": {
          from: { opacity: 0, transform: "translateX(50px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        "scaleIn": {
          from: { opacity: 0, transform: "scale(0.9)" },
          to: { opacity: 1, transform: "scale(1)" },
        },
        "bounceIn": {
          "0%": { opacity: 0, transform: "scale(0.3)" },
          "50%": { opacity: 1, transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "glow": {
          "from": { boxShadow: "0 0 20px rgba(0, 183, 183, 0.3)" },
          "to": { boxShadow: "0 0 30px rgba(0, 183, 183, 0.6)" },
        },
        "gradient": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fadeIn": "fadeIn 0.6s ease-out forwards",
        "slideUp": "slideUp 0.6s ease-out forwards",
        "slideInLeft": "slideInLeft 0.6s ease-out forwards",
        "slideInRight": "slideInRight 0.6s ease-out forwards",
        "scaleIn": "scaleIn 0.4s ease-out forwards",
        "bounceIn": "bounceIn 0.8s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "gradient": "gradient 4s ease infinite",
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // Custom plugin for our design system utilities
    function({ addUtilities, theme }) {
      const newUtilities = {
        '.text-gradient': {
          background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.text-gradient-secondary': {
          background: 'linear-gradient(135deg, hsl(var(--secondary)) 0%, hsl(var(--secondary-light)) 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.btn-primary': {
          background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-light)) 100%)',
          color: 'hsl(var(--primary-foreground))',
          border: 'none',
          borderRadius: 'var(--radius)',
          fontWeight: '600',
          padding: '12px 24px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 4px 14px 0 rgba(0, 183, 183, 0.3)',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px 0 rgba(0, 183, 183, 0.4)',
          },
        },
        '.btn-secondary': {
          background: 'linear-gradient(135deg, hsl(var(--secondary)) 0%, hsl(var(--secondary-light)) 100%)',
          color: 'hsl(var(--secondary-foreground))',
          border: 'none',
          borderRadius: 'var(--radius)',
          fontWeight: '600',
          padding: '12px 24px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 4px 14px 0 rgba(255, 107, 71, 0.3)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px 0 rgba(255, 107, 71, 0.4)',
          },
        },
        '.btn-accent': {
          background: 'linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(var(--accent-light)) 100%)',
          color: 'hsl(var(--accent-foreground))',
          border: 'none',
          borderRadius: 'var(--radius)',
          fontWeight: '600',
          padding: '12px 24px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 4px 14px 0 rgba(138, 71, 255, 0.3)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px 0 rgba(138, 71, 255, 0.4)',
          },
        },
        '.card-modern': {
          background: 'linear-gradient(145deg, hsl(var(--background)) 0%, hsl(var(--muted)) 100%)',
          border: '1px solid hsl(var(--border))',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            borderColor: 'hsl(var(--primary) / 0.3)',
          },
        },
        '.glass': {
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          '-webkit-backdrop-filter': 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        },
        '.search-enhanced': {
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '2px solid rgba(0, 183, 183, 0.2)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:focus-within': {
            borderColor: 'hsl(var(--primary))',
            boxShadow: '0 25px 50px -12px rgba(0, 183, 183, 0.25), 0 0 0 4px rgba(0, 183, 183, 0.1)',
            transform: 'translateY(-2px)',
          },
        },
        '.hero-gradient': {
          background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 50%, hsl(var(--accent)) 100%)',
          position: 'relative',
          overflow: 'hidden',
        },
        '.trust-badge': {
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: 'var(--radius-lg)',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
          },
        },
      };

      addUtilities(newUtilities);
    },
  ],
}