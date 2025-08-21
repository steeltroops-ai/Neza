/**
 * NEZA DESIGN SYSTEM - UI COMPONENTS INDEX
 * 
 * Central export file for all UI components
 * following atomic design principles.
 */

// ===== ATOMIC COMPONENTS =====

// Typography
export * from "./typography";

// Buttons
export * from "./button";

// Form Controls
export * from "./input";
export * from "./label";

// Data Display
export * from "./avatar";
export * from "./badge";

// ===== LAYOUT COMPONENTS =====

// Containers
export * from "./container";
export * from "./card";
export * from "./stack";

// ===== FORM COMPONENTS =====
export * from "./form";

// ===== NAVIGATION COMPONENTS =====
export * from "./navigation";
export * from "./tabs";
export * from "./sidebar";

// ===== FEEDBACK COMPONENTS =====
export * from "./alert";
export * from "./loading";
export * from "./toast";

// ===== ADVANCED COMPONENTS =====
export * from "./modal";

// ===== COMPONENT COLLECTIONS =====

// Export all button variants
export {
  Button,
  IconButton,
  ButtonGroup,
  buttonVariants,
  type ButtonProps,
  type IconButtonProps,
  type ButtonGroupProps,
} from "./button";

// Export all input variants
export {
  Input,
  PasswordInput,
  SearchInput,
  Textarea,
  inputVariants,
  type InputProps,
  type PasswordInputProps,
  type SearchInputProps,
  type TextareaProps,
} from "./input";

// Export all typography components
export {
  Heading,
  Text,
  Code,
  Blockquote,
  List,
  ListItem,
  Link,
  Lead,
  Muted,
  Small,
  headingVariants,
  textVariants,
  codeVariants,
  linkVariants,
  typographyUtils,
} from "./typography";

// Export all label components
export {
  Label,
  FieldLabel,
  FormLabel,
  labelVariants,
  type LabelProps,
  type FieldLabelProps,
  type FormLabelProps,
} from "./label";

// Export all avatar components
export {
  Avatar,
  AvatarGroup,
  AvatarWithText,
  avatarVariants,
  avatarImageVariants,
  avatarFallbackVariants,
  type AvatarProps,
  type AvatarGroupProps,
  type AvatarWithTextProps,
} from "./avatar";

// Export all badge components
export {
  Badge,
  BadgeGroup,
  StatusBadge,
  NotificationBadge,
  badgeVariants,
  type BadgeProps,
  type BadgeGroupProps,
  type StatusBadgeProps,
  type NotificationBadgeProps,
} from "./badge";

// Export all container components
export {
  Container,
  SectionContainer,
  ContentContainer,
  containerVariants,
  type ContainerProps,
  type SectionContainerProps,
  type ContentContainerProps,
} from "./container";

// Export all card components
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  FeatureCard,
  StatCard,
  CardGrid,
  cardVariants,
  type CardProps,
  type FeatureCardProps,
  type StatCardProps,
  type CardGridProps,
} from "./card";

// Export all stack components
export {
  Stack,
  HStack,
  VStack,
  Center,
  Spacer,
  Divider,
  Grid,
  stackVariants,
  type StackProps,
  type HStackProps,
  type VStackProps,
  type CenterProps,
  type SpacerProps,
  type DividerProps,
  type GridProps,
} from "./stack";

// ===== DESIGN SYSTEM UTILITIES =====

// Re-export design tokens and utilities
export { cn } from "@/lib/utils";
export { colors } from "@/lib/colors";
export { designTokens } from "@/lib/design-tokens";

// ===== COMPONENT CATEGORIES =====

// Atomic components (smallest building blocks)
export const atomicComponents = {
  Button,
  IconButton,
  Input,
  PasswordInput,
  SearchInput,
  Textarea,
  Label,
  Avatar,
  Badge,
  Heading,
  Text,
  Code,
  Link,
} as const;

// Layout components (structural elements)
export const layoutComponents = {
  Container,
  SectionContainer,
  ContentContainer,
  Card,
  Stack,
  HStack,
  VStack,
  Center,
  Grid,
  Spacer,
  Divider,
} as const;

// Composite components (complex combinations)
export const compositeComponents = {
  ButtonGroup,
  AvatarGroup,
  AvatarWithText,
  BadgeGroup,
  StatusBadge,
  NotificationBadge,
  FeatureCard,
  StatCard,
  CardGrid,
  FieldLabel,
  FormLabel,
} as const;

// ===== DESIGN SYSTEM METADATA =====

export const designSystemInfo = {
  name: "Neza Design System",
  version: "1.0.0",
  description: "Premium design system for local services marketplace",
  principles: [
    "Accessibility First",
    "Performance Optimized", 
    "Consistent Design Language",
    "Developer Experience",
    "Scalable Architecture",
  ],
  colorSystem: {
    primary: "Professional Blue",
    success: "Growth Green", 
    warning: "Attention Amber",
    error: "Alert Red",
    neutral: "Sophisticated Grays",
  },
  typography: {
    fontFamily: "Inter",
    scale: "Golden Ratio (1.618)",
    weights: [300, 400, 500, 600, 700, 800, 900],
  },
  spacing: {
    baseUnit: "8px",
    scale: "Mathematical progression",
  },
  animations: {
    duration: "150ms - 1000ms",
    easing: "Premium cubic-bezier curves",
    performance: "GPU accelerated",
  },
} as const;
