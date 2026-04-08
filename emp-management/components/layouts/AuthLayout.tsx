import { ReactNode } from 'react'
import { APP_NAME } from '@/lib/constants'

interface AuthLayoutProps {
  children: ReactNode
  /** Show split-panel branding (login). Signup uses the centered variant. */
  variant?: 'split' | 'centered'
}

export function AuthLayout({ children, variant = 'split' }: AuthLayoutProps) {
  if (variant === 'centered') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
        <div className="max-w-xl mx-auto">
          {/* Logo */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600 text-white font-bold text-xl shadow-md">
                E
              </span>
              <span className="text-2xl font-bold text-gray-900">EmpManage</span>
            </div>
          </div>
          {children}
          <p className="mt-6 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} EMS. All rights reserved.
          </p>
        </div>
      </div>
    )
  }

  /* split variant — used by Login */
  return (
    <div className="min-h-screen flex">
      {/* Left: brand panel */}
      <div className="hidden lg:flex lg:w-[46%] bg-gradient-to-br from-primary-600 to-primary-900 flex-col justify-between p-12 text-white">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary-600 font-bold text-xl">
            E
          </span>
          <span className="text-xl font-bold">EmpManage</span>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-4xl font-bold leading-tight mb-4">
              Manage Your Team Smarter
            </h2>
            <p className="text-primary-100 text-lg leading-relaxed">
              Streamline employee management, track attendance, and boost team
              productivity with our intelligent platform.
            </p>
          </div>
          <ul className="space-y-3">
            {[
              'Real-time attendance tracking',
              'Streamlined leave management',
              'Performance insights & reviews',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-primary-50">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs font-bold">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-primary-200 text-sm">
          Trusted by 500+ companies worldwide
        </p>
      </div>

      {/* Right: form */}
      <div className="flex flex-1 items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white font-bold">E</span>
            <span className="text-xl font-bold text-gray-900">EmpManage</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

