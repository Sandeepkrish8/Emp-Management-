'use client'

import React from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

interface AuthLayoutProps {
  children: React.ReactNode
  pageType: 'login' | 'signup'
}

export default function AuthLayout({ children, pageType }: AuthLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* ========== NAVIGATION HEADER (Same as Landing Page) ========== */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="font-bold text-xl text-gray-900 hidden sm:block">EmpManage</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/#features" className="text-gray-700 hover:text-teal-600 font-medium transition">
              Features
            </a>
            <a href="/#pricing" className="text-gray-700 hover:text-teal-600 font-medium transition">
              Pricing
            </a>
            <a href="/#testimonials" className="text-gray-700 hover:text-teal-600 font-medium transition">
              Testimonials
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex gap-3">
            {pageType === 'login' ? (
              <>
                <Link href="/signup">
                  <button className="px-6 py-2.5 text-teal-600 font-semibold hover:bg-teal-50 rounded-lg transition">
                    Create Account
                  </button>
                </Link>
                <Link href="/">
                  <button className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105">
                    Back to Home
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login">
                  <button className="px-6 py-2.5 text-teal-600 font-semibold hover:bg-teal-50 rounded-lg transition">
                    Sign In
                  </button>
                </Link>
                <Link href="/">
                  <button className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105">
                    Back to Home
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white p-4 space-y-3">
            <a href="/#features" className="block text-gray-700 hover:text-teal-600 py-2">
              Features
            </a>
            <a href="/#pricing" className="block text-gray-700 hover:text-teal-600 py-2">
              Pricing
            </a>
            <a href="/#testimonials" className="block text-gray-700 hover:text-teal-600 py-2">
              Testimonials
            </a>
            <div className="flex gap-2 pt-2 border-t border-gray-200">
              {pageType === 'login' ? (
                <>
                  <Link href="/signup" className="flex-1">
                    <button className="w-full px-4 py-2 text-teal-600 border border-teal-600 rounded-lg font-semibold">
                      Create Account
                    </button>
                  </Link>
                  <Link href="/" className="flex-1">
                    <button className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg font-semibold">
                      Home
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login" className="flex-1">
                    <button className="w-full px-4 py-2 text-teal-600 border border-teal-600 rounded-lg font-semibold">
                      Sign In
                    </button>
                  </Link>
                  <Link href="/" className="flex-1">
                    <button className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg font-semibold">
                      Home
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      {children}

      {/* ========== FOOTER (Same as Landing Page) ========== */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 w-fit">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <span className="font-bold text-lg">EmpManage</span>
              </div>
              <p className="text-gray-400">Manage your team smarter.</p>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-teal-400 transition">Features</a></li>
                <li><a href="#" className="hover:text-teal-400 transition">Pricing</a></li>
                <li><a href="#" className="hover:text-teal-400 transition">Security</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-teal-400 transition">About</a></li>
                <li><a href="#" className="hover:text-teal-400 transition">Blog</a></li>
                <li><a href="#" className="hover:text-teal-400 transition">Contact</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-teal-400 transition">Privacy</a></li>
                <li><a href="#" className="hover:text-teal-400 transition">Terms</a></li>
                <li><a href="#" className="hover:text-teal-400 transition">Cookies</a></li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-bold mb-4">Follow</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-teal-400 transition">Twitter</a></li>
                <li><a href="#" className="hover:text-teal-400 transition">LinkedIn</a></li>
                <li><a href="#" className="hover:text-teal-400 transition">GitHub</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 EmpManage. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
