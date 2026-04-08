'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, ArrowRight, Mail, Lock, CheckCircle } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import AuthLayout from '@/components/AuthLayout'
import { useAuthStore } from '@/store/useStore'

interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}

interface LoginErrors {
  email?: string
  password?: string
  general?: string
}

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [errors, setErrors] = useState<LoginErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const emailInputRef = useRef<HTMLInputElement>(null)
  const { setAuth } = useAuthStore()

  useEffect(() => {
    const emailParam = searchParams.get('email')
    if (emailParam) {
      setFormData(prev => ({ ...prev, email: emailParam }))
    }
  }, [searchParams])

  const validateForm = (): boolean => {
    const newErrors: LoginErrors = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    if (errors[name as keyof LoginErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (formData.email && formData.password) {
        setLoginSuccess(true)
        const token = `token_${Date.now()}`
        localStorage.setItem('auth_token', token)
        setAuth(
          { id: '1', firstName: 'Admin', lastName: 'User', email: formData.email, role: 'admin' } as any,
          token
        )
        
        setTimeout(() => {
          router.push('/dashboard')
        }, 1500)
      }
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const useDemoCredentials = () => {
    setFormData({
      email: 'admin@company.com',
      password: 'demo123',
      rememberMe: false,
    })
  }

  return (
    <AuthLayout pageType="login">
      {/* Hero Section - Same as Landing */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-4">
                Welcome Back
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Sign in to your account and manage your team with ease. Track attendance, manage leaves, and boost team productivity.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row gap-8 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg">👥</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900">500+</p>
                  <p className="text-sm text-gray-600">Companies Trust Us</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg">⭐</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900">4.9/5 Stars</p>
                  <p className="text-sm text-gray-600">User Rated</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Login Form Card */}
          <div className="relative">
            {/* Floating gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 rounded-3xl blur-3xl"></div>

            {/* Form Card */}
            <div className="relative bg-white rounded-2xl shadow-2xl border border-teal-100 p-8 md:p-10">
              {/* Success State */}
              {loginSuccess && (
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
                    <CheckCircle size={32} className="text-teal-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Welcome Back!</h2>
                  <p className="text-gray-600">Redirecting to your dashboard...</p>
                  <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mt-6">
                    <div className="h-full bg-gradient-to-r from-teal-500 to-teal-600 animate-[growWidth_1.5s_ease-out]" />
                  </div>
                </div>
              )}

              {/* Login Form */}
              {!loginSuccess && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
                    <p className="text-gray-600 text-sm mt-1">Continue to your account</p>
                  </div>

                  {/* Demo Credentials */}
                  <div className="bg-teal-50 border-l-4 border-teal-600 p-3 rounded text-sm">
                    <p><span className="font-semibold text-teal-700">Demo:</span> admin@company.com / demo123</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* General Error */}
                    {errors.general && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                        {errors.general}
                      </div>
                    )}

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          ref={emailInputRef}
                          type="email"
                          name="email"
                          placeholder="admin@company.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={isLoading}
                          className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-0 transition ${
                            errors.email
                              ? 'border-red-300 bg-red-50'
                              : 'border-gray-200 focus:border-teal-600'
                          } disabled:opacity-50`}
                        />
                      </div>
                      {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-900">
                          Password
                        </label>
                        <Link href="/forgot-password" className="text-sm text-teal-600 hover:text-teal-700 font-semibold">
                          Forgot?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleInputChange}
                          disabled={isLoading}
                          className={`w-full pl-10 pr-12 py-3 border-2 rounded-lg focus:outline-none focus:ring-0 transition ${
                            errors.password
                              ? 'border-red-300 bg-red-50'
                              : 'border-gray-200 focus:border-teal-600'
                          } disabled:opacity-50`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
                    </div>

                    {/* Remember Me */}
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-teal-600 rounded"
                      />
                      <span className="text-sm text-gray-700">Remember me</span>
                    </label>

                    {/* Sign In Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 mt-6"
                    >
                      {isLoading ? (
                        <>
                          <span className="animate-spin">⟳</span>
                          Signing in...
                        </>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight size={20} />
                        </>
                      )}
                    </button>

                    {/* Demo Button */}
                    <button
                      type="button"
                      onClick={useDemoCredentials}
                      disabled={isLoading}
                      className="w-full py-2.5 border-2 border-teal-300 text-teal-600 font-semibold rounded-lg hover:bg-teal-50 transition disabled:opacity-50"
                    >
                      Use Demo Credentials
                    </button>
                  </form>

                  {/* Sign Up Link */}
                  <div className="text-center pt-4 border-t border-gray-200">
                    <p className="text-gray-600 text-sm">
                      Don't have an account?{' '}
                      <Link href="/signup" className="text-teal-600 font-bold hover:text-teal-700">
                        Create one
                      </Link>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Same as Landing */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-200">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">Why Teams Love EmpManage</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: '⚡', title: 'Real-time Tracking', desc: 'Track attendance instantly with our live dashboard' },
            { icon: '📊', title: 'Powerful Analytics', desc: 'Get insights into team performance and productivity' },
            { icon: '🔒', title: 'Enterprise Security', desc: 'Bank-grade security with GDPR compliance' },
          ].map((feature, i) => (
            <div key={i} className="p-6 bg-white rounded-lg border border-gray-200 hover:border-teal-300 hover:shadow-lg transition">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section - Same as Landing */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-teal-50">
            Join hundreds of companies managing their teams smarter with EmpManage
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <button className="px-8 py-4 bg-white text-teal-600 font-bold rounded-lg hover:shadow-lg transition">
                Start Free Trial
              </button>
            </Link>
            <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition">
              View Pricing
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes growWidth {
          from { width: 0; }
          to { width: 100%; }
        }
      `}</style>
    </AuthLayout>
  )
}
