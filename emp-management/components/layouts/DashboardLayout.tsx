'use client'

import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Sidebar } from '@/components/common/Sidebar'
import { Header } from '@/components/common/Header'
import { MobileNav } from '@/components/common/MobileNav'
import { useAuthStore } from '@/store/useStore'

export function DashboardLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) router.replace('/login')
  }, [isAuthenticated, router])

  if (!isAuthenticated) return null

  return (
    // dark:bg ensures page bg switches in dark mode
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        {/* spec: container padding 24px mobile → 32px desktop, bottom pad for mobile nav */}
        <main className="flex-1 overflow-y-auto p-4 pb-20 sm:pb-4 md:p-6 md:pb-6">
          {children}
        </main>
      </div>
      {/* Mobile bottom tab bar (< 640px) */}
      <MobileNav />
    </div>
  )
}
