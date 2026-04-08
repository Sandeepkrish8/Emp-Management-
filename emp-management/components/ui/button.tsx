import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef, cloneElement, isValidElement, Children } from 'react'

const buttonVariants = cva(
  // base — matches spec: rounded-md (8px), ring focus, smooth transitions
  'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-150 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // Solid / Primary
        default:
          'bg-primary-500 text-white shadow-card hover:bg-primary-700 active:bg-primary-800 dark:bg-primary-500 dark:hover:bg-primary-700',
        // Ghost / Secondary — transparent + border
        ghost:
          'border border-primary-500 bg-transparent text-primary-600 hover:bg-blue-50 active:bg-blue-100 dark:text-primary-400 dark:hover:bg-primary-900/20',
        // Outline neutral
        outline:
          'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700',
        // Subtle secondary (was "secondary")
        secondary:
          'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
        destructive:
          'bg-danger text-white hover:bg-danger-dark active:opacity-90',
        link:
          'text-primary-600 underline-offset-4 hover:underline p-0 h-auto dark:text-primary-400',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-9 px-4 text-sm',
        lg: 'h-11 px-6 text-base',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  asChild?: boolean
  /** Explicitly typed for IDE when CVA VariantProps doesn't resolve */
  variant?: 'default' | 'ghost' | 'outline' | 'secondary' | 'destructive' | 'link'
  size?: 'sm' | 'md' | 'lg' | 'icon'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, disabled, asChild, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size }), className)
    if (asChild && isValidElement(children)) {
      const child = Children.only(children) as React.ReactElement<React.HTMLAttributes<HTMLElement>>
      return cloneElement(child, {
        ...props,
        className: cn(classes, child.props.className),
      })
    }
    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
