'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" aria-label="EmpManage home">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm select-none">EMP</span>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">
              EmpManage
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {[
              ['#features', 'Features'],
              ['#how-it-works', 'How It Works'],
              ['#pricing', 'Pricing'],
              ['#testimonials', 'Testimonials'],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/login">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-md p-2 text-gray-600 hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-gray-200 pt-3 space-y-1 animate-fade-in" aria-label="Mobile navigation">
            {[
              ['#features', 'Features'],
              ['#how-it-works', 'How It Works'],
              ['#pricing', 'Pricing'],
              ['#testimonials', 'Testimonials'],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors"
              >
                {label}
              </Link>
            ))}
            <div className="flex gap-2 pt-3 px-1">
              <Link href="/login" className="flex-1">
                <Button variant="outline" className="w-full" size="sm">Sign In</Button>
              </Link>
              <Link href="/login" className="flex-1">
                <Button className="w-full" size="sm">Get Started</Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
