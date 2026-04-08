import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  /** Icon or illustration element (spec: 64x64px, gray) */
  icon?: ReactNode
  /** Heading — spec: 18px 600 weight */
  title: string
  /** Description — spec: 14px 400 weight, gray */
  description?: string
  /** Primary action */
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

/**
 * Empty State Component
 * Spec:
 *  - Icon 64x64 gray
 *  - Heading 18px 600
 *  - Description 14px 400 gray
 *  - Optional action button
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-12 text-center',
        className
      )}
      role="status"
      aria-label={title}
    >
      {/* Icon — spec: 64x64, gray */}
      {icon && (
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500">
          {icon}
        </span>
      )}

      {/* Heading — spec: 18px 600 */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h3>

      {/* Description — spec: 14px 400 gray */}
      {description && (
        <p className="max-w-sm text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      )}

      {/* Action */}
      {action && (
        <Button onClick={action.onClick} size="md">
          {action.label}
        </Button>
      )}
    </div>
  )
}
