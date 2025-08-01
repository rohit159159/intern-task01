import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-card hover:bg-primary/90 hover-lift",
        destructive:
          "bg-destructive text-destructive-foreground shadow-card hover:bg-destructive/90 hover-lift",
        outline:
          "glass-subtle text-foreground border-border hover:glass-card hover-lift",
        secondary:
          "bg-secondary text-secondary-foreground shadow-card hover:bg-secondary/80 hover-lift",
        ghost: "hover:glass-subtle hover-lift",
        link: "text-primary underline-offset-4 hover:underline transition-fast",
        gradient: "gradient-primary text-white shadow-glow hover:shadow-premium hover:scale-105 transition-bounce",
        "gradient-accent": "gradient-accent text-white shadow-glow-accent hover:shadow-premium hover:scale-105 transition-bounce",
        hero: "glass-premium text-white border-primary/30 hover:border-primary/50 animate-pulse-glow hover-lift",
        success: "gradient-success text-white shadow-card hover:shadow-premium hover-lift",
        premium: "glass-premium text-white border-primary/40 shadow-premium hover:shadow-glow hover-scale",
        minimal: "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-fast",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-lg px-10 text-lg",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
