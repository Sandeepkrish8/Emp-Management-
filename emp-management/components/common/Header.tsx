'use client'

import { usePathname } from 'next/navigation'
import { Menu, Bell, Search, Sun, Moon } from 'lucide-react'
import { useAppStore, useUIStore } from '@/store/useStore'
import { useAuth } from '@/hooks/useAuth'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

const pageTitles: Record<string, string> = {
  '/dashboard':   'Dashboard',
  '/employees':   'Employees',
  '/departments': 'Departments',
  '/attendance':  'Attendance',
  '/leave':       'Leave Management',
  '/performance': 'Performance',
}

export function Header() {
  const { toggleSidebar } = useAppStore()
  const { theme, setTheme } = useUIStore()
  const { user, logout } = useAuth()
  const pathname = usePathname()

  // Apply dark class to <html> whenever theme changes
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  const title =
    Object.entries(pageTitles).find(([key]) => pathname.startsWith(key))?.[1] ??
    'Employee Management'

  return (
    // spec: 64px height, white bg, 1px #E5E7EB bottom border, 0 24px padding
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700 px-4 md:px-6">
      {/* Left: hamburger + breadcrumb title */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="lg:hidden rounded-md p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h1>
      </div>

      {/* Right: search + notifications + dark toggle + user menu */}
      <div className="flex items-center gap-2">
        {/* Search — spec: 200px, hidden on mobile */}
        <button
          className="hidden md:flex items-center gap-2 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors w-52"
          aria-label="Search"
        >
          <Search className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
          <span>Search...</span>
          <kbd className="ml-auto rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-1.5 text-xs text-gray-400">⌘K</kbd>
        </button>

        {/* Dark mode toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="rounded-md p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark'
            ? <Sun className="h-5 w-5" aria-hidden="true" />
            : <Moon className="h-5 w-5" aria-hidden="true" />
          }
        </button>

        {/* Notifications bell — spec: badge with count */}
        <button
          className="relative rounded-md p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          aria-label="Notifications (3 unread)"
        >
          <Bell className="h-5 w-5" aria-hidden="true" />
          <span
            className="absolute right-1 top-1 h-4 w-4 rounded-full bg-danger text-[10px] font-bold text-white flex items-center justify-center"
            aria-hidden="true"
          >
            3
          </span>
        </button>

        {/* User menu — spec: 40x40 avatar, name, role dropdown */}
        <div className="relative flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer group">
          {/* spec: Avatar 40x40, border-radius 50% */}
          <Avatar name={user?.name ?? 'User'} size="sm" />
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 leading-tight">
              {user?.name ?? 'User'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role ?? 'admin'}</p>
          </div>

          {/* Dropdown — spec: Profile, Settings, Logout */}
          <div className="absolute right-0 top-full mt-1 hidden group-hover:block z-20 w-48 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-1 shadow-dropdown animate-fade-in">
            <p className="px-3 py-2 text-xs text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700 truncate">{user?.email}</p>
            <a href="/profile" className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Profile</a>
            <a href="/settings" className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Settings</a>
            <div className="border-t border-gray-100 dark:border-gray-700 mt-1 pt-1">
              <button
                className="w-full text-left px-3 py-2 text-sm text-danger hover:bg-danger-light dark:hover:bg-red-900/20 transition-colors"
                onClick={logout}
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
