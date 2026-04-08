import { HTMLAttributes, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  // spec: rounded pill (full), small padding, 12px text, border
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default:     'bg-primary-50 text-primary-700 border-primary-200 dark:bg-primary-900/30 dark:text-primary-300 dark:border-primary-800',
        secondary:   'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600',
        destructive: 'bg-danger-light text-danger border-red-200 dark:bg-red-900/30 dark:text-red-400',
        success:     'bg-success-light text-success border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400',
        warning:     'bg-warning-light text-warning border-amber-200 dark:bg-amber-900/30 dark:text-amber-400',
        info:        'bg-info-light text-info border-blue-200 dark:bg-blue-900/30 dark:text-blue-400',
        outline:     'bg-transparent text-gray-700 border-gray-300 dark:text-gray-300 dark:border-gray-600',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
)
Badge.displayName = 'Badge'

export { Badge, badgeVariants }
