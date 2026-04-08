'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  Building2,
  Clock,
  CalendarDays,
  TrendingUp,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/useStore'
import { APP_NAME } from '@/lib/constants'

const navItems = [
  { href: '/dashboard',   label: 'Dashboard',   Icon: LayoutDashboard },
  { href: '/employees',   label: 'Employees',   Icon: Users },
  { href: '/departments', label: 'Departments', Icon: Building2 },
  { href: '/attendance',  label: 'Attendance',  Icon: Clock },
  { href: '/leave',       label: 'Leave',       Icon: CalendarDays },
  { href: '/performance', label: 'Performance', Icon: TrendingUp },
]

export function Sidebar() {
  const pathname = usePathname()
  const { sidebarOpen, setSidebarOpen } = useAppStore()

  const content = (
    <div className="flex h-full flex-col">
      {/* Logo — spec: 40px height, 16px top padding */}
      <div className="flex h-16 items-center justify-between border-b border-gray-200 dark:border-gray-700 px-4">
        <Link href="/dashboard" className="flex items-center gap-2" aria-label={APP_NAME}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-500 text-white font-bold text-sm select-none">
            E
          </span>
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 hidden md:block">
            {APP_NAME}
          </span>
        </Link>
        {/* Mobile close */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden rounded-md p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Nav — spec: 14px 500 weight labels, 20x20 icons, left-3px active border */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto scrollbar-hide px-3 py-4" aria-label="Main navigation">
        {navItems.map(({ href, label, Icon }) => {
          const isActive =
            href === '/dashboard'
              ? pathname === href
              : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                // spec: inactive — text-gray-600 hover:bg-#F9FAFB
                'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors duration-150',
                isActive
                  // spec: active — left border 3px #0066CC, bg #F9FAFB text primary
                  ? 'bg-primary-50 text-primary-700 border-l-[3px] border-primary-500 pl-[calc(0.75rem_-_3px)] dark:bg-primary-900/20 dark:text-primary-400'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100'
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3">
        <p className="text-xs text-gray-400 truncate">{APP_NAME} &copy; 2025</p>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar — spec: 260px width */}
      <aside className="hidden lg:flex h-full w-[260px] flex-col border-r border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700">
        {content}
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-[260px] flex-col bg-white dark:bg-gray-900 shadow-elevated lg:hidden flex animate-slide-down">
            {content}
          </aside>
        </>
      )}
    </>
  )
}
