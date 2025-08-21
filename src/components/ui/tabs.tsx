/**
 * NEZA DESIGN SYSTEM - TABS COMPONENT
 * 
 * Premium tabs component with smooth transitions,
 * keyboard navigation, and accessibility features.
 */

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ===== TABS VARIANTS =====

const tabsListVariants = cva(
  [
    "inline-flex items-center justify-center rounded-lg p-1",
    "text-neza-gray-500 dark:text-neza-gray-400",
  ],
  {
    variants: {
      variant: {
        default: "bg-neza-gray-100 dark:bg-neza-gray-800",
        outline: "border border-neza-gray-200 dark:border-neza-gray-700",
        underline: "border-b border-neza-gray-200 dark:border-neza-gray-700 bg-transparent rounded-none p-0",
        pills: "bg-transparent space-x-1",
      },
      size: {
        sm: "h-8 text-xs",
        default: "h-10 text-sm",
        lg: "h-12 text-base",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
    },
  }
);

const tabsTriggerVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5",
    "text-sm font-medium ring-offset-background transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neza-primary-500 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "relative",
  ],
  {
    variants: {
      variant: {
        default: [
          "data-[state=active]:bg-background data-[state=active]:text-foreground",
          "data-[state=active]:shadow-sm",
          "hover:bg-neza-gray-50 dark:hover:bg-neza-gray-700",
        ],
        outline: [
          "data-[state=active]:bg-background data-[state=active]:text-foreground",
          "data-[state=active]:border-neza-primary-500",
          "hover:bg-neza-gray-50 dark:hover:bg-neza-gray-800",
        ],
        underline: [
          "rounded-none border-b-2 border-transparent px-4 py-3",
          "data-[state=active]:border-neza-primary-500 data-[state=active]:text-neza-primary-600",
          "dark:data-[state=active]:text-neza-primary-400",
          "hover:text-neza-gray-700 dark:hover:text-neza-gray-300",
        ],
        pills: [
          "rounded-full",
          "data-[state=active]:bg-neza-primary-500 data-[state=active]:text-white",
          "hover:bg-neza-gray-100 dark:hover:bg-neza-gray-800",
        ],
      },
      size: {
        sm: "h-7 px-2 text-xs",
        default: "h-9 px-3 text-sm",
        lg: "h-11 px-4 text-base",
      },
      fullWidth: {
        true: "flex-1",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
    },
  }
);

const tabsContentVariants = cva(
  [
    "mt-4 ring-offset-background",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neza-primary-500 focus-visible:ring-offset-2",
  ]
);

// ===== TABS ROOT COMPONENT =====

export interface TabsProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>,
    VariantProps<typeof tabsListVariants> {
  orientation?: "horizontal" | "vertical";
}

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>(({ className, orientation = "horizontal", ...props }, ref) => (
  <TabsPrimitive.Root
    ref={ref}
    orientation={orientation}
    className={cn(
      orientation === "vertical" && "flex gap-4",
      className
    )}
    {...props}
  />
));
Tabs.displayName = TabsPrimitive.Root.displayName;

// ===== TABS LIST COMPONENT =====

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant, size, fullWidth, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants({ variant, size, fullWidth }), className)}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

// ===== TABS TRIGGER COMPONENT =====

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  disabled?: boolean;
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, size, fullWidth, icon, badge, children, disabled, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants({ variant, size, fullWidth }), className)}
    disabled={disabled}
    {...props}
  >
    <div className="flex items-center gap-2">
      {icon && (
        <span className="flex-shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {badge && (
        <span className="flex-shrink-0" aria-hidden="true">
          {badge}
        </span>
      )}
    </div>
  </TabsPrimitive.Trigger>
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

// ===== TABS CONTENT COMPONENT =====

export interface TabsContentProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {
  loading?: boolean;
  error?: string;
}

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, loading, error, children, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(tabsContentVariants(), className)}
    {...props}
  >
    {loading ? (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neza-primary-500"></div>
      </div>
    ) : error ? (
      <div className="flex items-center justify-center py-8 text-neza-error-600 dark:text-neza-error-400">
        <p>{error}</p>
      </div>
    ) : (
      children
    )}
  </TabsPrimitive.Content>
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

// ===== ANIMATED TABS COMPONENT =====

export interface AnimatedTabsProps extends TabsProps {
  tabs: Array<{
    value: string;
    label: string;
    icon?: React.ReactNode;
    badge?: React.ReactNode;
    disabled?: boolean;
    content: React.ReactNode;
  }>;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

const AnimatedTabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  AnimatedTabsProps
>(({ 
  className, 
  tabs, 
  defaultValue, 
  onValueChange, 
  variant, 
  size, 
  fullWidth,
  orientation = "horizontal",
  ...props 
}, ref) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue || tabs[0]?.value);

  const handleValueChange = (value: string) => {
    setActiveTab(value);
    onValueChange?.(value);
  };

  return (
    <Tabs
      ref={ref}
      value={activeTab}
      onValueChange={handleValueChange}
      orientation={orientation}
      className={className}
      {...props}
    >
      <TabsList variant={variant} size={size} fullWidth={fullWidth}>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            variant={variant}
            size={size}
            fullWidth={fullWidth}
            icon={tab.icon}
            badge={tab.badge}
            disabled={tab.disabled}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className="animate-in fade-in-50 duration-200"
        >
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
});
AnimatedTabs.displayName = "AnimatedTabs";

// ===== VERTICAL TABS COMPONENT =====

export interface VerticalTabsProps extends Omit<AnimatedTabsProps, "orientation"> {}

const VerticalTabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  VerticalTabsProps
>(({ className, ...props }, ref) => (
  <AnimatedTabs
    ref={ref}
    orientation="vertical"
    className={cn("flex gap-6", className)}
    {...props}
  />
));
VerticalTabs.displayName = "VerticalTabs";

// ===== SCROLLABLE TABS COMPONENT =====

export interface ScrollableTabsProps extends AnimatedTabsProps {
  scrollable?: boolean;
}

const ScrollableTabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  ScrollableTabsProps
>(({ className, scrollable = true, tabs, ...props }, ref) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollToActiveTab = React.useCallback((value: string) => {
    if (!scrollContainerRef.current || !scrollable) return;

    const activeButton = scrollContainerRef.current.querySelector(
      `[data-state="active"]`
    ) as HTMLElement;

    if (activeButton) {
      activeButton.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [scrollable]);

  React.useEffect(() => {
    if (props.value) {
      scrollToActiveTab(props.value);
    }
  }, [props.value, scrollToActiveTab]);

  return (
    <Tabs
      ref={ref}
      className={className}
      {...props}
    >
      <div
        ref={scrollContainerRef}
        className={cn(
          scrollable && "overflow-x-auto scrollbar-hide",
          "relative"
        )}
      >
        <TabsList 
          variant={props.variant} 
          size={props.size} 
          fullWidth={props.fullWidth}
          className={cn(
            scrollable && "w-max min-w-full",
            "flex-nowrap"
          )}
        >
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              variant={props.variant}
              size={props.size}
              icon={tab.icon}
              badge={tab.badge}
              disabled={tab.disabled}
              className="flex-shrink-0"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {tabs.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className="animate-in fade-in-50 duration-200"
        >
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
});
ScrollableTabs.displayName = "ScrollableTabs";

// ===== EXPORTS =====

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  AnimatedTabs,
  VerticalTabs,
  ScrollableTabs,
  tabsListVariants,
  tabsTriggerVariants,
  tabsContentVariants,
};

export type {
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
  AnimatedTabsProps,
  VerticalTabsProps,
  ScrollableTabsProps,
};
