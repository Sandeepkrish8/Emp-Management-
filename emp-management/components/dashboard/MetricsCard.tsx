import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface MetricsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: ReactNode
  trend?: { value: number; positive: boolean }
  color?: 'blue' | 'green' | 'amber' | 'red' | 'violet' | 'cyan'
}

const colorMap = {
  blue:   { bg: 'bg-blue-50',   icon: 'bg-blue-100 text-blue-600',   value: 'text-blue-700' },
  green:  { bg: 'bg-emerald-50',icon: 'bg-emerald-100 text-emerald-600', value: 'text-emerald-700' },
  amber:  { bg: 'bg-amber-50',  icon: 'bg-amber-100 text-amber-600',  value: 'text-amber-700' },
  red:    { bg: 'bg-red-50',    icon: 'bg-red-100 text-red-600',      value: 'text-red-700' },
  violet: { bg: 'bg-violet-50', icon: 'bg-violet-100 text-violet-600',value: 'text-violet-700' },
  cyan:   { bg: 'bg-cyan-50',   icon: 'bg-cyan-100 text-cyan-600',    value: 'text-cyan-700' },
}

export function MetricsCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = 'blue',
}: MetricsCardProps) {
  const c = colorMap[color]
  return (
    <div className={cn('rounded-xl border border-gray-200 bg-white p-5 shadow-sm', )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className={cn('mt-1 text-3xl font-bold', c.value)}>{value}</p>
          {subtitle && (
            <p className="mt-1 text-xs text-gray-400">{subtitle}</p>
          )}
          {trend && (
            <p
              className={cn(
                'mt-2 flex items-center gap-1 text-xs font-medium',
                trend.positive ? 'text-emerald-600' : 'text-red-500'
              )}
            >
              {trend.positive ? '▲' : '▼'} {Math.abs(trend.value)}% vs last month
            </p>
          )}
        </div>
        <span className={cn('flex h-11 w-11 items-center justify-center rounded-xl', c.icon)}>
          {icon}
        </span>
      </div>
    </div>
  )
}
