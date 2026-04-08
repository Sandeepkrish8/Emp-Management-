'use client'

import React from 'react'
import Link from 'next/link'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="font-bold text-xl text-gray-900">EmpManage</span>
          </Link>
          <Link href="/">
            <button className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105">
              Back to Home
            </button>
          </Link>
        </nav>
      </header>

      {/* 404 Content */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-2xl mx-auto">
          {/* Large 404 */}
          <div className="relative mb-8">
            <h1 className="text-[160px] md:text-[200px] font-black text-gray-100 leading-none select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center shadow-xl">
                <Search size={40} className="text-white" />
              </div>
            </div>
          </div>

          {/* Text */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <button className="px-8 py-3.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2">
                <Home size={20} />
                Go Home
              </button>
            </Link>
            <button
              onClick={() => history.back()}
              className="px-8 py-3.5 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:border-teal-400 hover:text-teal-600 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <ArrowLeft size={20} />
              Go Back
            </button>
          </div>

          {/* Quick Links */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">Popular pages</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                { label: 'Dashboard', href: '/dashboard' },
                { label: 'Employees', href: '/employees' },
                { label: 'Login', href: '/login' },
                { label: 'Sign Up', href: '/signup' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-teal-50 hover:text-teal-600 transition"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
