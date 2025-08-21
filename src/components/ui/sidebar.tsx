/**
 * NEZA DESIGN SYSTEM - SIDEBAR COMPONENT
 * 
 * Premium sidebar component with collapsible behavior,
 * smooth animations, and responsive design.
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";

// ===== SIDEBAR VARIANTS =====

const sidebarVariants = cva(
  [
    "flex flex-col bg-background border-r border-border",
    "transition-all duration-300 ease-out",
    "relative z-30",
  ],
  {
    variants: {
      variant: {
        default: "bg-background border-border",
        glass: "bg-white/10 border-white/20 backdrop-blur-xl dark:bg-black/10 dark:border-white/10",
        solid: "bg-neza-gray-50 dark:bg-neza-gray-900 border-neza-gray-200 dark:border-neza-gray-800",
      },
      size: {
        sm: "w-56",
        default: "w-64",
        lg: "w-72",
        xl: "w-80",
      },
      collapsedSize: {
        sm: "w-12",
        default: "w-16",
        lg: "w-20",
      },
      position: {
        left: "left-0",
        right: "right-0",
      },
      behavior: {
        fixed: "fixed top-0 h-screen",
        sticky: "sticky top-0 h-screen",
        static: "relative",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      collapsedSize: "default",
      position: "left",
      behavior: "sticky",
    },
  }
);

// ===== SIDEBAR COMPONENT =====

export interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  collapsible?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  overlay?: boolean;
  onOverlayClick?: () => void;
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({
    className,
    variant,
    size,
    collapsedSize,
    position,
    behavior,
    collapsed = false,
    onCollapsedChange,
    collapsible = true,
    header,
    footer,
    overlay = false,
    onOverlayClick,
    children,
    ...props
  }, ref) => {
    const [isCollapsed, setIsCollapsed] = React.useState(collapsed);

    React.useEffect(() => {
      setIsCollapsed(collapsed);
    }, [collapsed]);

    const handleToggle = () => {
      const newCollapsed = !isCollapsed;
      setIsCollapsed(newCollapsed);
      onCollapsedChange?.(newCollapsed);
    };

    const sidebarClasses = cn(
      sidebarVariants({ variant, size: isCollapsed ? collapsedSize : size, position, behavior }),
      className
    );

    return (
      <>
        {/* Overlay for mobile */}
        {overlay && !isCollapsed && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden"
            onClick={onOverlayClick}
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <div
          ref={ref}
          className={sidebarClasses}
          {...props}
        >
          {/* Header */}
          {header && (
            <div className={cn(
              "flex-shrink-0 p-4 border-b border-border",
              isCollapsed && "px-2"
            )}>
              {header}
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className={cn(
              "flex-shrink-0 p-4 border-t border-border",
              isCollapsed && "px-2"
            )}>
              {footer}
            </div>
          )}

          {/* Collapse Toggle */}
          {collapsible && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggle}
              className={cn(
                "absolute -right-3 top-6 h-6 w-6 rounded-full border border-border bg-background shadow-md",
                "hover:bg-neza-gray-50 dark:hover:bg-neza-gray-800",
                "transition-transform duration-200",
                isCollapsed && "rotate-180"
              )}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {position === "left" ? (
                <ChevronLeft className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </Button>
          )}
        </div>
      </>
    );
  }
);
Sidebar.displayName = "Sidebar";

// ===== SIDEBAR SECTION COMPONENT =====

export interface SidebarSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  icon?: React.ReactNode;
}

const SidebarSection = React.forwardRef<HTMLDivElement, SidebarSectionProps>(
  ({ className, title, collapsible = false, defaultCollapsed = false, icon, children, ...props }, ref) => {
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

    return (
      <div ref={ref} className={cn("py-2", className)} {...props}>
        {title && (
          <div className="px-4 py-2">
            {collapsible ? (
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="flex items-center justify-between w-full text-left text-xs font-semibold text-neza-gray-500 dark:text-neza-gray-400 uppercase tracking-wider hover:text-neza-gray-700 dark:hover:text-neza-gray-300 transition-colors"
              >
                <div className="flex items-center gap-2">
                  {icon}
                  <span>{title}</span>
                </div>
                <ChevronRight
                  className={cn(
                    "h-3 w-3 transition-transform duration-200",
                    isCollapsed && "rotate-90"
                  )}
                />
              </button>
            ) : (
              <div className="flex items-center gap-2 text-xs font-semibold text-neza-gray-500 dark:text-neza-gray-400 uppercase tracking-wider">
                {icon}
                <span>{title}</span>
              </div>
            )}
          </div>
        )}
        
        {(!collapsible || !isCollapsed) && (
          <div className="space-y-1">
            {children}
          </div>
        )}
      </div>
    );
  }
);
SidebarSection.displayName = "SidebarSection";

// ===== SIDEBAR ITEM COMPONENT =====

export interface SidebarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  href?: string;
  active?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  collapsed?: boolean;
  tooltip?: string;
}

const SidebarItem = React.forwardRef<HTMLDivElement, SidebarItemProps>(
  ({ 
    className, 
    href, 
    active = false, 
    disabled = false, 
    icon, 
    badge, 
    collapsed = false,
    tooltip,
    children, 
    onClick,
    ...props 
  }, ref) => {
    const Component = href ? "a" : "button";
    
    const itemClasses = cn(
      "flex items-center gap-3 w-full px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neza-primary-500 focus-visible:ring-offset-2",
      active
        ? "bg-neza-primary-100 text-neza-primary-700 dark:bg-neza-primary-900 dark:text-neza-primary-300"
        : "text-neza-gray-700 dark:text-neza-gray-300 hover:bg-neza-gray-100 dark:hover:bg-neza-gray-800",
      disabled && "opacity-50 cursor-not-allowed pointer-events-none",
      collapsed && "justify-center px-2",
      className
    );

    const content = (
      <>
        {icon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}
        
        {!collapsed && (
          <>
            <span className="flex-1 truncate">{children}</span>
            {badge && (
              <span className="flex-shrink-0" aria-hidden="true">
                {badge}
              </span>
            )}
          </>
        )}
      </>
    );

    return (
      <div ref={ref} className="px-2" {...props}>
        {collapsed && tooltip ? (
          <div className="group relative">
            <Component
              href={href}
              onClick={onClick}
              className={itemClasses}
              aria-current={active ? "page" : undefined}
              disabled={disabled}
              title={tooltip}
            >
              {content}
            </Component>
            
            {/* Tooltip */}
            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-neza-gray-900 dark:bg-neza-gray-100 text-white dark:text-neza-gray-900 text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
              {tooltip}
              <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-neza-gray-900 dark:border-r-neza-gray-100"></div>
            </div>
          </div>
        ) : (
          <Component
            href={href}
            onClick={onClick}
            className={itemClasses}
            aria-current={active ? "page" : undefined}
            disabled={disabled}
          >
            {content}
          </Component>
        )}
      </div>
    );
  }
);
SidebarItem.displayName = "SidebarItem";

// ===== SIDEBAR DIVIDER COMPONENT =====

const SidebarDivider = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mx-4 my-2 border-t border-border", className)}
    {...props}
  />
));
SidebarDivider.displayName = "SidebarDivider";

// ===== RESPONSIVE SIDEBAR HOOK =====

export function useResponsiveSidebar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  return {
    isOpen,
    isMobile,
    toggle,
    close,
    open,
  };
}

// ===== EXPORTS =====

export {
  Sidebar,
  SidebarSection,
  SidebarItem,
  SidebarDivider,
  useResponsiveSidebar,
  sidebarVariants,
};

export type {
  SidebarProps,
  SidebarSectionProps,
  SidebarItemProps,
};
