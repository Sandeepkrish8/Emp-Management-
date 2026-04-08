import { ReactNode } from 'react'
import { DashboardLayout } from './DashboardLayout'

export function MainLayout({ children }: { children: ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>
}
