'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, CalendarDays, TrendingUp, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

// spec: 5 main tabs — Dashboard, Employees, Leave, Performance, More
const tabs = [
  { href: '/dashboard',   label: 'Dashboard',   Icon: LayoutDashboard },
  { href: '/employees',   label: 'Employees',   Icon: Users },
  { href: '/leave',       label: 'Leave',        Icon: CalendarDays },
  { href: '/performance', label: 'Performance',  Icon: TrendingUp },
  { href: '/departments', label: 'More',         Icon: MoreHorizontal },
]

/**
 * Mobile Bottom Navigation Tab Bar
 * Spec: visible on <640px, sticky at bottom, 40px height (using auto for label+icon),
 *       5 tabs, blue active highlight, icons + labels
 */
export function MobileNav() {
  const pathname = usePathname()

  return (
    // spec: sm:hidden → shown on mobile only (< 640px)
    <nav
      className="fixed bottom-0 inset-x-0 z-30 flex sm:hidden border-t border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700"
      aria-label="Mobile navigation"
    >
      {tabs.map(({ href, label, Icon }) => {
        const isActive =
          href === '/dashboard'
            ? pathname === href || pathname === '/'
            : pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              // spec: fills bottom bar evenly, icons + labels, 40px min height
              'flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-medium transition-colors',
              isActive
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            )}
          >
            <Icon
              className={cn('h-5 w-5', isActive ? 'stroke-[2.25]' : 'stroke-[1.5]')}
              aria-hidden="true"
            />
            <span>{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
