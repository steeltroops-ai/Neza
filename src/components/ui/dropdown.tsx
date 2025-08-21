/**
 * NEZA DESIGN SYSTEM - DROPDOWN COMPONENT
 * 
 * Premium dropdown component with animations, keyboard navigation,
 * and comprehensive accessibility features.
 */

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Check, ChevronRight, Circle } from "lucide-react";

// ===== DROPDOWN VARIANTS =====

const dropdownContentVariants = cva(
  [
    "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
    "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
    "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  ],
  {
    variants: {
      variant: {
        default: "bg-white dark:bg-neza-gray-800 border-neza-gray-200 dark:border-neza-gray-700",
        glass: "bg-white/10 border-white/20 backdrop-blur-xl dark:bg-black/10 dark:border-white/10",
      },
      size: {
        sm: "min-w-[6rem] text-xs",
        default: "min-w-[8rem] text-sm",
        lg: "min-w-[12rem] text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const dropdownItemVariants = cva(
  [
    "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
    "focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: "hover:bg-neza-gray-100 dark:hover:bg-neza-gray-700 focus:bg-neza-gray-100 dark:focus:bg-neza-gray-700",
        destructive: "text-neza-error-600 dark:text-neza-error-400 hover:bg-neza-error-50 dark:hover:bg-neza-error-950 focus:bg-neza-error-50 dark:focus:bg-neza-error-950",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// ===== DROPDOWN ROOT COMPONENT =====

const DropdownMenu = DropdownMenuPrimitive.Root;

// ===== DROPDOWN TRIGGER COMPONENT =====

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

// ===== DROPDOWN CONTENT COMPONENT =====

export interface DropdownMenuContentProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>,
    VariantProps<typeof dropdownContentVariants> {}

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  DropdownMenuContentProps
>(({ className, variant, size, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(dropdownContentVariants({ variant, size }), className)}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

// ===== DROPDOWN ITEM COMPONENT =====

export interface DropdownMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>,
    VariantProps<typeof dropdownItemVariants> {
  inset?: boolean;
  icon?: React.ReactNode;
  shortcut?: string;
}

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemProps
>(({ className, variant, inset, icon, shortcut, children, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      dropdownItemVariants({ variant }),
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {icon && (
      <span className="mr-2 h-4 w-4 flex-shrink-0" aria-hidden="true">
        {icon}
      </span>
    )}
    <span className="flex-1">{children}</span>
    {shortcut && (
      <span className="ml-auto text-xs tracking-widest opacity-60">
        {shortcut}
      </span>
    )}
  </DropdownMenuPrimitive.Item>
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

// ===== DROPDOWN CHECKBOX ITEM COMPONENT =====

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

// ===== DROPDOWN RADIO ITEM COMPONENT =====

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

// ===== DROPDOWN LABEL COMPONENT =====

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold text-neza-gray-900 dark:text-neza-gray-100",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

// ===== DROPDOWN SEPARATOR COMPONENT =====

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-neza-gray-200 dark:bg-neza-gray-700", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

// ===== DROPDOWN SHORTCUT COMPONENT =====

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

// ===== DROPDOWN SUB COMPONENTS =====

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
    icon?: React.ReactNode;
  }
>(({ className, inset, icon, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {icon && (
      <span className="mr-2 h-4 w-4 flex-shrink-0" aria-hidden="true">
        {icon}
      </span>
    )}
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

// ===== DROPDOWN GROUP COMPONENTS =====

const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

// ===== CONTEXT MENU COMPONENT =====

export interface ContextMenuProps {
  children: React.ReactNode;
  items: Array<{
    type?: "item" | "separator" | "label" | "sub";
    label?: string;
    icon?: React.ReactNode;
    shortcut?: string;
    disabled?: boolean;
    destructive?: boolean;
    onClick?: () => void;
    items?: Array<{
      label: string;
      icon?: React.ReactNode;
      shortcut?: string;
      disabled?: boolean;
      onClick?: () => void;
    }>;
  }>;
}

const ContextMenu = React.forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ children, items }, ref) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div ref={ref} onContextMenu={(e) => e.preventDefault()}>
          {children}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        {items.map((item, index) => {
          if (item.type === "separator") {
            return <DropdownMenuSeparator key={index} />;
          }
          
          if (item.type === "label") {
            return (
              <DropdownMenuLabel key={index}>
                {item.label}
              </DropdownMenuLabel>
            );
          }
          
          if (item.type === "sub" && item.items) {
            return (
              <DropdownMenuSub key={index}>
                <DropdownMenuSubTrigger icon={item.icon}>
                  {item.label}
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {item.items.map((subItem, subIndex) => (
                    <DropdownMenuItem
                      key={subIndex}
                      icon={subItem.icon}
                      shortcut={subItem.shortcut}
                      disabled={subItem.disabled}
                      onClick={subItem.onClick}
                    >
                      {subItem.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            );
          }
          
          return (
            <DropdownMenuItem
              key={index}
              variant={item.destructive ? "destructive" : "default"}
              icon={item.icon}
              shortcut={item.shortcut}
              disabled={item.disabled}
              onClick={item.onClick}
            >
              {item.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
);
ContextMenu.displayName = "ContextMenu";

// ===== EXPORTS =====

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  ContextMenu,
  dropdownContentVariants,
  dropdownItemVariants,
};

export type {
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  ContextMenuProps,
};
