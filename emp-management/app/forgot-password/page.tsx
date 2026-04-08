'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Mail, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error('Failed to send reset email')
      }

      setIsSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <span className="text-blue-900 font-bold">E</span>
          </div>
          <span className="text-white font-bold">EmpManage</span>
        </Link>

        {/* Content */}
        {!isSubmitted ? (
          <div className="space-y-8">
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-2">Reset Your Password</h2>
              <p className="text-blue-100">
                Enter your email address and we&apos;ll send you a link to reset your password
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 bg-white p-8 rounded-xl shadow-xl"
            >
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={20}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    id="email"
                    placeholder="admin@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    required
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 transition disabled:opacity-50 text-gray-900 placeholder-gray-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !email}
                className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin">⟳</span>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Reset Link
                    <ArrowRight size={20} />
                  </>
                )}
              </button>

              <Link
                href="/login"
                className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition"
              >
                <ArrowLeft size={20} />
                Back to Login
              </Link>
            </form>
          </div>
        ) : (
          <div className="text-center space-y-6 bg-white p-8 rounded-xl shadow-xl">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>
              <p className="text-gray-600 mb-1">We&apos;ve sent a password reset link to:</p>
              <p className="font-semibold text-gray-900">{email}</p>
            </div>
            <p className="text-sm text-gray-600">
              Click the link in the email to reset your password. It expires in 24 hours.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
            >
              <ArrowLeft size={20} />
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
