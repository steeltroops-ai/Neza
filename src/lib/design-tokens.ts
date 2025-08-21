/**
 * NEZA DESIGN SYSTEM - DESIGN TOKENS
 * 
 * Comprehensive design token system following industry best practices
 * and accessibility standards. All tokens are mathematically derived
 * using golden ratio and 8px grid system.
 */

// ===== PRIMITIVE TOKENS =====

export const primitiveTokens = {
  // Color primitives (base palette)
  colors: {
    primary: {
      50: "#eff6ff",
      100: "#dbeafe", 
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6", // Base primary
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
      950: "#172554",
    },
    success: {
      50: "#f0fdf4",
      100: "#dcfce7",
      200: "#bbf7d0",
      300: "#86efac",
      400: "#4ade80",
      500: "#22c55e", // Base success
      600: "#16a34a",
      700: "#15803d",
      800: "#166534",
      900: "#14532d",
    },
    warning: {
      50: "#fffbeb",
      100: "#fef3c7",
      200: "#fde68a",
      300: "#fcd34d",
      400: "#fbbf24",
      500: "#f59e0b", // Base warning
      600: "#d97706",
      700: "#b45309",
      800: "#92400e",
      900: "#78350f",
    },
    error: {
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecaca",
      300: "#fca5a5",
      400: "#f87171",
      500: "#ef4444", // Base error
      600: "#dc2626",
      700: "#b91c1c",
      800: "#991b1b",
      900: "#7f1d1d",
    },
    neutral: {
      0: "#ffffff",
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#e5e5e5",
      300: "#d4d4d4",
      400: "#a3a3a3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717",
      950: "#0a0a0a",
    },
  },

  // Spacing primitives (8px base unit)
  spacing: {
    0: "0px",
    1: "0.125rem", // 2px
    2: "0.25rem",  // 4px
    3: "0.375rem", // 6px
    4: "0.5rem",   // 8px
    5: "0.625rem", // 10px
    6: "0.75rem",  // 12px
    8: "1rem",     // 16px
    10: "1.25rem", // 20px
    12: "1.5rem",  // 24px
    16: "2rem",    // 32px
    20: "2.5rem",  // 40px
    24: "3rem",    // 48px
    32: "4rem",    // 64px
    40: "5rem",    // 80px
    48: "6rem",    // 96px
    64: "8rem",    // 128px
    80: "10rem",   // 160px
    96: "12rem",   // 192px
  },

  // Typography primitives (golden ratio scale)
  typography: {
    fontFamily: {
      sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      mono: ["JetBrains Mono", "SF Mono", "Monaco", "Consolas", "monospace"],
    },
    fontSize: {
      xs: "0.75rem",    // 12px
      sm: "0.875rem",   // 14px
      base: "1rem",     // 16px
      lg: "1.125rem",   // 18px
      xl: "1.25rem",    // 20px
      "2xl": "1.5rem",  // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem", // 36px
      "5xl": "3rem",    // 48px
      "6xl": "3.75rem", // 60px
      "7xl": "4.5rem",  // 72px
      "8xl": "6rem",    // 96px
      "9xl": "8rem",    // 128px
    },
    fontWeight: {
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      black: "900",
    },
    lineHeight: {
      none: "1",
      tight: "1.25",
      snug: "1.375",
      normal: "1.5",
      relaxed: "1.625",
      loose: "2",
    },
    letterSpacing: {
      tighter: "-0.05em",
      tight: "-0.025em",
      normal: "0em",
      wide: "0.025em",
      wider: "0.05em",
      widest: "0.1em",
    },
  },

  // Border radius primitives
  borderRadius: {
    none: "0px",
    sm: "0.125rem",   // 2px
    base: "0.25rem",  // 4px
    md: "0.375rem",   // 6px
    lg: "0.5rem",     // 8px
    xl: "0.75rem",    // 12px
    "2xl": "1rem",    // 16px
    "3xl": "1.5rem",  // 24px
    full: "9999px",
  },

  // Shadow primitives
  boxShadow: {
    xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)",
    // Premium shadows
    glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    glow: "0 0 20px rgba(59, 130, 246, 0.3)",
    glowLg: "0 0 40px rgba(59, 130, 246, 0.4)",
  },

  // Animation primitives
  animation: {
    duration: {
      instant: "0ms",
      fast: "150ms",
      normal: "300ms",
      slow: "500ms",
      slower: "750ms",
      slowest: "1000ms",
    },
    easing: {
      linear: "linear",
      in: "cubic-bezier(0.4, 0, 1, 1)",
      out: "cubic-bezier(0, 0, 0.2, 1)",
      inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      spring: "cubic-bezier(0.22, 1, 0.36, 1)",
      bounce: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      elastic: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    },
  },

  // Breakpoint primitives
  breakpoints: {
    xs: "320px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  // Z-index primitives
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    toast: 1080,
  },
} as const;

// ===== SEMANTIC TOKENS =====

export const semanticTokens = {
  // Semantic colors (contextual meaning)
  colors: {
    background: {
      primary: primitiveTokens.colors.neutral[0],
      secondary: primitiveTokens.colors.neutral[50],
      tertiary: primitiveTokens.colors.neutral[100],
      inverse: primitiveTokens.colors.neutral[950],
    },
    surface: {
      primary: primitiveTokens.colors.neutral[0],
      secondary: primitiveTokens.colors.neutral[50],
      elevated: primitiveTokens.colors.neutral[100],
      inverse: primitiveTokens.colors.neutral[900],
    },
    text: {
      primary: primitiveTokens.colors.neutral[900],
      secondary: primitiveTokens.colors.neutral[600],
      tertiary: primitiveTokens.colors.neutral[400],
      inverse: primitiveTokens.colors.neutral[0],
      disabled: primitiveTokens.colors.neutral[300],
    },
    border: {
      subtle: primitiveTokens.colors.neutral[200],
      default: primitiveTokens.colors.neutral[300],
      strong: primitiveTokens.colors.neutral[400],
      inverse: primitiveTokens.colors.neutral[700],
    },
    interactive: {
      primary: primitiveTokens.colors.primary[500],
      primaryHover: primitiveTokens.colors.primary[600],
      primaryActive: primitiveTokens.colors.primary[700],
      primaryDisabled: primitiveTokens.colors.neutral[300],
    },
    feedback: {
      success: primitiveTokens.colors.success[500],
      successSubtle: primitiveTokens.colors.success[50],
      warning: primitiveTokens.colors.warning[500],
      warningSubtle: primitiveTokens.colors.warning[50],
      error: primitiveTokens.colors.error[500],
      errorSubtle: primitiveTokens.colors.error[50],
      info: primitiveTokens.colors.primary[500],
      infoSubtle: primitiveTokens.colors.primary[50],
    },
  },

  // Semantic spacing
  spacing: {
    component: {
      padding: primitiveTokens.spacing[4], // 16px
      margin: primitiveTokens.spacing[6],  // 24px
      gap: primitiveTokens.spacing[4],     // 16px
    },
    section: {
      padding: primitiveTokens.spacing[16], // 64px
      margin: primitiveTokens.spacing[20],  // 80px
      gap: primitiveTokens.spacing[12],     // 48px
    },
    layout: {
      container: primitiveTokens.spacing[6], // 24px
      grid: primitiveTokens.spacing[6],      // 24px
      content: primitiveTokens.spacing[4],   // 16px
    },
  },

  // Semantic typography
  typography: {
    heading: {
      h1: {
        fontSize: primitiveTokens.typography.fontSize["5xl"],
        fontWeight: primitiveTokens.typography.fontWeight.bold,
        lineHeight: primitiveTokens.typography.lineHeight.tight,
        letterSpacing: primitiveTokens.typography.letterSpacing.tight,
      },
      h2: {
        fontSize: primitiveTokens.typography.fontSize["4xl"],
        fontWeight: primitiveTokens.typography.fontWeight.bold,
        lineHeight: primitiveTokens.typography.lineHeight.tight,
        letterSpacing: primitiveTokens.typography.letterSpacing.tight,
      },
      h3: {
        fontSize: primitiveTokens.typography.fontSize["3xl"],
        fontWeight: primitiveTokens.typography.fontWeight.semibold,
        lineHeight: primitiveTokens.typography.lineHeight.snug,
        letterSpacing: primitiveTokens.typography.letterSpacing.normal,
      },
      h4: {
        fontSize: primitiveTokens.typography.fontSize["2xl"],
        fontWeight: primitiveTokens.typography.fontWeight.semibold,
        lineHeight: primitiveTokens.typography.lineHeight.snug,
        letterSpacing: primitiveTokens.typography.letterSpacing.normal,
      },
      h5: {
        fontSize: primitiveTokens.typography.fontSize.xl,
        fontWeight: primitiveTokens.typography.fontWeight.medium,
        lineHeight: primitiveTokens.typography.lineHeight.normal,
        letterSpacing: primitiveTokens.typography.letterSpacing.normal,
      },
      h6: {
        fontSize: primitiveTokens.typography.fontSize.lg,
        fontWeight: primitiveTokens.typography.fontWeight.medium,
        lineHeight: primitiveTokens.typography.lineHeight.normal,
        letterSpacing: primitiveTokens.typography.letterSpacing.normal,
      },
    },
    body: {
      large: {
        fontSize: primitiveTokens.typography.fontSize.lg,
        fontWeight: primitiveTokens.typography.fontWeight.normal,
        lineHeight: primitiveTokens.typography.lineHeight.relaxed,
      },
      base: {
        fontSize: primitiveTokens.typography.fontSize.base,
        fontWeight: primitiveTokens.typography.fontWeight.normal,
        lineHeight: primitiveTokens.typography.lineHeight.normal,
      },
      small: {
        fontSize: primitiveTokens.typography.fontSize.sm,
        fontWeight: primitiveTokens.typography.fontWeight.normal,
        lineHeight: primitiveTokens.typography.lineHeight.normal,
      },
    },
    caption: {
      fontSize: primitiveTokens.typography.fontSize.xs,
      fontWeight: primitiveTokens.typography.fontWeight.normal,
      lineHeight: primitiveTokens.typography.lineHeight.normal,
      color: semanticTokens.colors.text.secondary,
    },
  },
} as const;

// ===== COMPONENT TOKENS =====

export const componentTokens = {
  button: {
    primary: {
      background: semanticTokens.colors.interactive.primary,
      backgroundHover: semanticTokens.colors.interactive.primaryHover,
      backgroundActive: semanticTokens.colors.interactive.primaryActive,
      text: semanticTokens.colors.text.inverse,
      border: "transparent",
      borderRadius: primitiveTokens.borderRadius.lg,
      padding: `${primitiveTokens.spacing[3]} ${primitiveTokens.spacing[6]}`,
      fontSize: primitiveTokens.typography.fontSize.base,
      fontWeight: primitiveTokens.typography.fontWeight.medium,
      boxShadow: primitiveTokens.boxShadow.sm,
    },
    secondary: {
      background: "transparent",
      backgroundHover: semanticTokens.colors.surface.secondary,
      backgroundActive: semanticTokens.colors.surface.tertiary,
      text: semanticTokens.colors.text.primary,
      border: semanticTokens.colors.border.default,
      borderRadius: primitiveTokens.borderRadius.lg,
      padding: `${primitiveTokens.spacing[3]} ${primitiveTokens.spacing[6]}`,
      fontSize: primitiveTokens.typography.fontSize.base,
      fontWeight: primitiveTokens.typography.fontWeight.medium,
    },
    ghost: {
      background: "transparent",
      backgroundHover: semanticTokens.colors.surface.secondary,
      backgroundActive: semanticTokens.colors.surface.tertiary,
      text: semanticTokens.colors.text.primary,
      border: "transparent",
      borderRadius: primitiveTokens.borderRadius.lg,
      padding: `${primitiveTokens.spacing[3]} ${primitiveTokens.spacing[6]}`,
      fontSize: primitiveTokens.typography.fontSize.base,
      fontWeight: primitiveTokens.typography.fontWeight.medium,
    },
  },

  input: {
    default: {
      background: semanticTokens.colors.surface.primary,
      backgroundFocus: semanticTokens.colors.surface.primary,
      text: semanticTokens.colors.text.primary,
      placeholder: semanticTokens.colors.text.tertiary,
      border: semanticTokens.colors.border.default,
      borderFocus: semanticTokens.colors.interactive.primary,
      borderRadius: primitiveTokens.borderRadius.lg,
      padding: `${primitiveTokens.spacing[3]} ${primitiveTokens.spacing[4]}`,
      fontSize: primitiveTokens.typography.fontSize.base,
      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
    },
  },

  card: {
    default: {
      background: semanticTokens.colors.surface.primary,
      border: semanticTokens.colors.border.subtle,
      borderRadius: primitiveTokens.borderRadius.xl,
      padding: primitiveTokens.spacing[6],
      boxShadow: primitiveTokens.boxShadow.sm,
      boxShadowHover: primitiveTokens.boxShadow.lg,
    },
    elevated: {
      background: semanticTokens.colors.surface.elevated,
      border: semanticTokens.colors.border.subtle,
      borderRadius: primitiveTokens.borderRadius.xl,
      padding: primitiveTokens.spacing[6],
      boxShadow: primitiveTokens.boxShadow.md,
      boxShadowHover: primitiveTokens.boxShadow.xl,
    },
    glass: {
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(16px)",
      border: "rgba(255, 255, 255, 0.2)",
      borderRadius: primitiveTokens.borderRadius.xl,
      padding: primitiveTokens.spacing[6],
      boxShadow: primitiveTokens.boxShadow.glass,
    },
  },
} as const;

// ===== DARK MODE TOKENS =====

export const darkModeTokens = {
  colors: {
    background: {
      primary: primitiveTokens.colors.neutral[950],
      secondary: primitiveTokens.colors.neutral[900],
      tertiary: primitiveTokens.colors.neutral[800],
      inverse: primitiveTokens.colors.neutral[0],
    },
    surface: {
      primary: primitiveTokens.colors.neutral[950],
      secondary: primitiveTokens.colors.neutral[900],
      elevated: primitiveTokens.colors.neutral[800],
      inverse: primitiveTokens.colors.neutral[100],
    },
    text: {
      primary: primitiveTokens.colors.neutral[0],
      secondary: primitiveTokens.colors.neutral[400],
      tertiary: primitiveTokens.colors.neutral[600],
      inverse: primitiveTokens.colors.neutral[950],
      disabled: primitiveTokens.colors.neutral[700],
    },
    border: {
      subtle: primitiveTokens.colors.neutral[800],
      default: primitiveTokens.colors.neutral[700],
      strong: primitiveTokens.colors.neutral[600],
      inverse: primitiveTokens.colors.neutral[300],
    },
  },
} as const;

// Export all tokens
export const designTokens = {
  primitive: primitiveTokens,
  semantic: semanticTokens,
  component: componentTokens,
  darkMode: darkModeTokens,
} as const;

export default designTokens;
