import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import { QueryProvider } from '@/components/providers/QueryProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'EmpManage - Employee Management System',
  description:
    'Modern employee management platform for teams. Track attendance, manage leave, and boost productivity.',
  icons: { icon: '/favicon.ico' },
  openGraph: {
    title: 'EmpManage - Employee Management System',
    description: 'Modern employee management platform for teams',
    siteName: 'EmpManage',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              borderRadius: '10px',
              background: '#1f2937',
              color: '#fff',
              fontSize: '14px',
            },
            success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
            error:   { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
          }}
        />
        </QueryProvider>
      </body>
    </html>
  )
}
