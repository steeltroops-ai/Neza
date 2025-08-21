/**
 * NEZA DESIGN SYSTEM - NAVIGATION COMPONENTS
 * 
 * Premium navigation system with sticky behavior,
 * backdrop blur, and smooth transitions.
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ChevronRight, Menu, X, Home } from "lucide-react";
import { Button } from "./button";

// ===== HEADER VARIANTS =====

const headerVariants = cva(
  [
    "w-full border-b transition-all duration-300 ease-out",
    "supports-[backdrop-filter]:bg-background/60 supports-[backdrop-filter]:backdrop-blur-xl",
  ],
  {
    variants: {
      variant: {
        default: "bg-background border-border",
        transparent: "bg-transparent border-transparent",
        glass: "bg-white/10 border-white/20 backdrop-blur-xl dark:bg-black/10 dark:border-white/10",
        solid: "bg-background border-border shadow-sm",
      },
      sticky: {
        true: "sticky top-0 z-50",
        false: "relative",
      },
      size: {
        sm: "h-14",
        default: "h-16",
        lg: "h-20",
      },
    },
    defaultVariants: {
      variant: "default",
      sticky: true,
      size: "default",
    },
  }
);

// ===== HEADER COMPONENT =====

export interface HeaderProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof headerVariants> {
  logo?: React.ReactNode;
  navigation?: React.ReactNode;
  actions?: React.ReactNode;
  mobileMenuTrigger?: React.ReactNode;
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ 
    className, 
    variant, 
    sticky, 
    size, 
    logo, 
    navigation, 
    actions, 
    mobileMenuTrigger,
    children,
    ...props 
  }, ref) => (
    <header
      ref={ref}
      className={cn(headerVariants({ variant, sticky, size }), className)}
      {...props}
    >
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          {logo && (
            <div className="flex-shrink-0">
              {logo}
            </div>
          )}

          {/* Desktop Navigation */}
          {navigation && (
            <nav className="hidden md:flex items-center space-x-8">
              {navigation}
            </nav>
          )}

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {actions}
            
            {/* Mobile Menu Trigger */}
            <div className="md:hidden">
              {mobileMenuTrigger}
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom children for additional content */}
      {children}
    </header>
  )
);
Header.displayName = "Header";

// ===== NAVIGATION MENU COMPONENT =====

export interface NavigationMenuProps extends React.HTMLAttributes<HTMLElement> {
  items: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
    active?: boolean;
    disabled?: boolean;
    children?: Array<{
      label: string;
      href?: string;
      onClick?: () => void;
      description?: string;
    }>;
  }>;
  orientation?: "horizontal" | "vertical";
}

const NavigationMenu = React.forwardRef<HTMLElement, NavigationMenuProps>(
  ({ className, items, orientation = "horizontal", ...props }, ref) => (
    <nav
      ref={ref}
      className={cn(
        "flex",
        orientation === "horizontal" ? "flex-row space-x-6" : "flex-col space-y-2",
        className
      )}
      {...props}
    >
      {items.map((item, index) => (
        <div key={index} className="relative group">
          {item.href ? (
            <a
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors duration-200",
                "hover:text-neza-primary-600 dark:hover:text-neza-primary-400",
                item.active 
                  ? "text-neza-primary-600 dark:text-neza-primary-400" 
                  : "text-neza-gray-600 dark:text-neza-gray-300",
                item.disabled && "opacity-50 cursor-not-allowed pointer-events-none"
              )}
              aria-current={item.active ? "page" : undefined}
            >
              {item.label}
            </a>
          ) : (
            <button
              onClick={item.onClick}
              disabled={item.disabled}
              className={cn(
                "text-sm font-medium transition-colors duration-200",
                "hover:text-neza-primary-600 dark:hover:text-neza-primary-400",
                item.active 
                  ? "text-neza-primary-600 dark:text-neza-primary-400" 
                  : "text-neza-gray-600 dark:text-neza-gray-300",
                item.disabled && "opacity-50 cursor-not-allowed"
              )}
              aria-current={item.active ? "page" : undefined}
            >
              {item.label}
            </button>
          )}

          {/* Dropdown Menu */}
          {item.children && item.children.length > 0 && (
            <div className="absolute top-full left-0 mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="bg-white dark:bg-neza-gray-800 rounded-lg shadow-lg border border-neza-gray-200 dark:border-neza-gray-700 py-2">
                {item.children.map((child, childIndex) => (
                  <div key={childIndex}>
                    {child.href ? (
                      <a
                        href={child.href}
                        className="block px-4 py-3 text-sm text-neza-gray-700 dark:text-neza-gray-300 hover:bg-neza-gray-50 dark:hover:bg-neza-gray-700 transition-colors duration-200"
                      >
                        <div className="font-medium">{child.label}</div>
                        {child.description && (
                          <div className="text-xs text-neza-gray-500 dark:text-neza-gray-400 mt-1">
                            {child.description}
                          </div>
                        )}
                      </a>
                    ) : (
                      <button
                        onClick={child.onClick}
                        className="w-full text-left block px-4 py-3 text-sm text-neza-gray-700 dark:text-neza-gray-300 hover:bg-neza-gray-50 dark:hover:bg-neza-gray-700 transition-colors duration-200"
                      >
                        <div className="font-medium">{child.label}</div>
                        {child.description && (
                          <div className="text-xs text-neza-gray-500 dark:text-neza-gray-400 mt-1">
                            {child.description}
                          </div>
                        )}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  )
);
NavigationMenu.displayName = "NavigationMenu";

// ===== BREADCRUMBS COMPONENT =====

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  showHome?: boolean;
  homeHref?: string;
  maxItems?: number;
}

const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ 
    className, 
    items, 
    separator = <ChevronRight className="h-4 w-4" />, 
    showHome = true,
    homeHref = "/",
    maxItems = 5,
    ...props 
  }, ref) => {
    const allItems = showHome 
      ? [{ label: "Home", href: homeHref, icon: <Home className="h-4 w-4" /> }, ...items]
      : items;

    const displayItems = allItems.length > maxItems 
      ? [
          allItems[0],
          { label: "...", disabled: true },
          ...allItems.slice(-maxItems + 2)
        ]
      : allItems;

    return (
      <nav
        ref={ref}
        className={cn("flex items-center space-x-2 text-sm", className)}
        aria-label="Breadcrumb"
        {...props}
      >
        <ol className="flex items-center space-x-2">
          {displayItems.map((item, index) => {
            const isLast = index === displayItems.length - 1;
            const isDisabled = "disabled" in item && item.disabled;

            return (
              <li key={index} className="flex items-center space-x-2">
                {index > 0 && (
                  <span className="text-neza-gray-400 dark:text-neza-gray-500" aria-hidden="true">
                    {separator}
                  </span>
                )}
                
                {isDisabled ? (
                  <span className="text-neza-gray-400 dark:text-neza-gray-500">
                    {item.label}
                  </span>
                ) : isLast ? (
                  <span 
                    className="flex items-center space-x-1 text-neza-gray-900 dark:text-neza-gray-100 font-medium"
                    aria-current="page"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </span>
                ) : item.href ? (
                  <a
                    href={item.href}
                    className="flex items-center space-x-1 text-neza-gray-600 dark:text-neza-gray-400 hover:text-neza-primary-600 dark:hover:text-neza-primary-400 transition-colors duration-200"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                ) : (
                  <button
                    onClick={item.onClick}
                    className="flex items-center space-x-1 text-neza-gray-600 dark:text-neza-gray-400 hover:text-neza-primary-600 dark:hover:text-neza-primary-400 transition-colors duration-200"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);
Breadcrumbs.displayName = "Breadcrumbs";

// ===== MOBILE MENU COMPONENT =====

export interface MobileMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  items: NavigationMenuProps["items"];
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const MobileMenu = React.forwardRef<HTMLDivElement, MobileMenuProps>(
  ({ className, isOpen, onClose, items, header, footer, ...props }, ref) => {
    // Close on escape key
    React.useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape" && isOpen) {
          onClose();
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    // Prevent body scroll when menu is open
    React.useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }

      return () => {
        document.body.style.overflow = "";
      };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Menu Panel */}
        <div
          ref={ref}
          className={cn(
            "fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white dark:bg-neza-gray-900",
            "border-l border-neza-gray-200 dark:border-neza-gray-800",
            "shadow-xl z-50 md:hidden",
            "transform transition-transform duration-300 ease-out",
            isOpen ? "translate-x-0" : "translate-x-full",
            className
          )}
          {...props}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-neza-gray-200 dark:border-neza-gray-800">
            {header || <div className="font-semibold text-lg">Menu</div>}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto p-4">
            <NavigationMenu
              items={items}
              orientation="vertical"
              className="space-y-1"
            />
          </div>

          {/* Footer */}
          {footer && (
            <div className="p-4 border-t border-neza-gray-200 dark:border-neza-gray-800">
              {footer}
            </div>
          )}
        </div>
      </>
    );
  }
);
MobileMenu.displayName = "MobileMenu";

// ===== MOBILE MENU TRIGGER COMPONENT =====

export interface MobileMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen: boolean;
  onToggle: () => void;
}

const MobileMenuTrigger = React.forwardRef<HTMLButtonElement, MobileMenuTriggerProps>(
  ({ className, isOpen, onToggle, ...props }, ref) => (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      onClick={onToggle}
      className={cn("md:hidden", className)}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      {...props}
    >
      {isOpen ? (
        <X className="h-5 w-5" />
      ) : (
        <Menu className="h-5 w-5" />
      )}
    </Button>
  )
);
MobileMenuTrigger.displayName = "MobileMenuTrigger";

// ===== EXPORTS =====

export {
  Header,
  NavigationMenu,
  Breadcrumbs,
  MobileMenu,
  MobileMenuTrigger,
  headerVariants,
};

export type {
  HeaderProps,
  NavigationMenuProps,
  BreadcrumbsProps,
  BreadcrumbItem,
  MobileMenuProps,
  MobileMenuTriggerProps,
};
