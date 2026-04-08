'use client'

import React, { Suspense, useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Mail, Lock, User, Building2, CheckCircle } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import AuthLayout from '@/components/AuthLayout'

interface SignUpFormData {
  fullName: string
  email: string
  company: string
  password: string
  passwordConfirm: string
  agreeToTerms: boolean
}

interface SignUpErrors {
  fullName?: string
  email?: string
  company?: string
  password?: string
  passwordConfirm?: string
  agreeToTerms?: string
  general?: string
}

interface PasswordStrength {
  score: number
  label: string
  color: string
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500" /></div>}>
      <SignUpContent />
    </Suspense>
  )
}

function SignUpContent() {
  const [formData, setFormData] = useState<SignUpFormData>({
    fullName: '',
    email: '',
    company: '',
    password: '',
    passwordConfirm: '',
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState<SignUpErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [signUpSuccess, setSignUpSuccess] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    label: '',
    color: '',
  })

  const router = useRouter()
  const searchParams = useSearchParams()
  const fullNameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const emailParam = searchParams.get('email')
    if (emailParam) {
      setFormData(prev => ({ ...prev, email: emailParam }))
    }
  }, [searchParams])

  const calculatePasswordStrength = (pwd: string): PasswordStrength => {
    let score = 0
    if (!pwd) return { score: 0, label: '', color: '' }

    if (pwd.length >= 8) score++
    if (pwd.length >= 12) score++
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++
    if (/[0-9]/.test(pwd)) score++
    if (/[^a-zA-Z0-9]/.test(pwd)) score++

    const strengths = [
      { score: 0, label: '', color: '' },
      { score: 1, label: 'Weak', color: 'bg-red-500' },
      { score: 2, label: 'Fair', color: 'bg-orange-500' },
      { score: 3, label: 'Good', color: 'bg-yellow-500' },
      { score: 4, label: 'Strong', color: 'bg-lime-500' },
      { score: 5, label: 'Very Strong', color: 'bg-teal-500' },
    ]

    return strengths[Math.min(score, 5)]
  }

  const validateForm = (): boolean => {
    const newErrors: SignUpErrors = {}

    if (!formData.fullName || formData.fullName.length < 2) {
      newErrors.fullName = 'Please enter your full name'
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.company) {
      newErrors.company = 'Company name is required'
    }

    if (!formData.password || formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = 'Passwords do not match'
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value

    setFormData(prev => ({
      ...prev,
      [name]: newValue,
    }))

    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value))
    }

    if (errors[name as keyof SignUpErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (formData.email) {
        setSignUpSuccess(true)
        localStorage.setItem('auth_token', `token_${Date.now()}`)

        setTimeout(() => {
          router.push('/dashboard')
        }, 1500)
      }
    } catch (error) {
      setErrors({ general: 'Sign up failed. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout pageType="signup">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-4">
                Start Free Today
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Create your account and get 14 days free. No credit card required. Start managing your team smarter immediately.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row gap-8 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg">⏱️</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900">14 Days</p>
                  <p className="text-sm text-gray-600">Free Trial Period</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg">💳</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900">No Card</p>
                  <p className="text-sm text-gray-600">Required to Start</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Sign Up Form Card */}
          <div className="relative">
            {/* Floating gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 rounded-3xl blur-3xl"></div>

            {/* Form Card */}
            <div className="relative bg-white rounded-2xl shadow-2xl border border-teal-100 p-8 md:p-10 max-h-[600px] overflow-y-auto">
              {/* Success State */}
              {signUpSuccess && (
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
                    <CheckCircle size={32} className="text-teal-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Account Created!</h2>
                  <p className="text-gray-600">Setting up your workspace...</p>
                  <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mt-6">
                    <div className="h-full bg-gradient-to-r from-teal-500 to-teal-600 animate-[growWidth_1.5s_ease-out]" />
                  </div>
                </div>
              )}

              {/* Sign Up Form */}
              {!signUpSuccess && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
                    <p className="text-gray-600 text-sm mt-1">Join thousands of companies</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* General Error */}
                    {errors.general && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                        {errors.general}
                      </div>
                    )}

                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-semibold text-gray-900 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          ref={fullNameRef}
                          type="text"
                          name="fullName"
                          placeholder="John Doe"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          disabled={isLoading}
                          className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-0 transition ${
                            errors.fullName
                              ? 'border-red-300 bg-red-50'
                              : 'border-gray-200 focus:border-teal-600'
                          } disabled:opacity-50`}
                        />
                      </div>
                      {errors.fullName && <p className="text-sm text-red-600 mt-1">{errors.fullName}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                        Work Email
                      </label>
                      <div className="relative">
                        <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          placeholder="you@company.com"
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

                    {/* Company */}
                    <div>
                      <label htmlFor="company" className="block text-sm font-semibold text-gray-900 mb-2">
                        Company Name
                      </label>
                      <div className="relative">
                        <Building2 size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="company"
                          placeholder="Acme Corp"
                          value={formData.company}
                          onChange={handleInputChange}
                          disabled={isLoading}
                          className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-0 transition ${
                            errors.company
                              ? 'border-red-300 bg-red-50'
                              : 'border-gray-200 focus:border-teal-600'
                          } disabled:opacity-50`}
                        />
                      </div>
                      {errors.company && <p className="text-sm text-red-600 mt-1">{errors.company}</p>}
                    </div>

                    {/* Password */}
                    <div>
                      <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="password"
                          name="password"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleInputChange}
                          disabled={isLoading}
                          className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-0 transition ${
                            errors.password
                              ? 'border-red-300 bg-red-50'
                              : 'border-gray-200 focus:border-teal-600'
                          } disabled:opacity-50`}
                        />
                      </div>

                      {formData.password && (
                        <div className="space-y-2 mt-2">
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`h-1 flex-1 rounded-full ${
                                  i < passwordStrength.score
                                    ? passwordStrength.color
                                    : 'bg-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                          {passwordStrength.label && (
                            <p className={`text-xs font-medium ${
                              passwordStrength.score <= 2
                                ? 'text-red-600'
                                : passwordStrength.score === 3
                                  ? 'text-yellow-600'
                                  : 'text-teal-600'
                            }`}>
                              {passwordStrength.label} password
                            </p>
                          )}
                        </div>
                      )}

                      {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label htmlFor="passwordConfirm" className="block text-sm font-semibold text-gray-900 mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="password"
                          name="passwordConfirm"
                          placeholder="••••••••"
                          value={formData.passwordConfirm}
                          onChange={handleInputChange}
                          disabled={isLoading}
                          className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-0 transition ${
                            errors.passwordConfirm
                              ? 'border-red-300 bg-red-50'
                              : 'border-gray-200 focus:border-teal-600'
                          } disabled:opacity-50`}
                        />
                      </div>
                      {errors.passwordConfirm && <p className="text-sm text-red-600 mt-1">{errors.passwordConfirm}</p>}
                    </div>

                    {/* Terms */}
                    <label className="flex items-start gap-2 pt-2">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        className="w-4 h-4 mt-1 accent-teal-600 rounded border-gray-300 cursor-pointer"
                      />
                      <span className="text-sm text-gray-700">
                        I agree to the <a href="#" className="text-teal-600 hover:underline">Terms</a> and <a href="#" className="text-teal-600 hover:underline">Privacy</a>
                      </span>
                    </label>
                    {errors.agreeToTerms && <p className="text-sm text-red-600">{errors.agreeToTerms}</p>}

                    {/* Sign Up Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 mt-6"
                    >
                      {isLoading ? (
                        <>
                          <span className="animate-spin">⟳</span>
                          Creating...
                        </>
                      ) : (
                        <>
                          Create Account
                          <ArrowRight size={20} />
                        </>
                      )}
                    </button>
                  </form>

                  {/* Sign In Link */}
                  <div className="text-center pt-4 border-t border-gray-200">
                    <p className="text-gray-600 text-sm">
                      Already have an account?{' '}
                      <Link href="/login" className="text-teal-600 font-bold hover:text-teal-700">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-200">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">Everything You Need</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: '✓', title: 'Real-time Attendance', desc: 'Track team presence with live check-ins' },
            { icon: '✓', title: 'Leave Management', desc: 'Streamlined approval workflows' },
            { icon: '✓', title: 'Performance Reviews', desc: '360° feedback and goal tracking' },
          ].map((feature, i) => (
            <div key={i} className="p-6 bg-white rounded-lg border border-gray-200 hover:border-teal-300 hover:shadow-lg transition">
              <div className="text-3xl text-teal-600 mb-4 font-bold">{feature.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Join 500+ companies managing smarter</h2>
          <p className="text-lg mb-8 text-teal-50">Start your 14-day free trial today</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-teal-600 font-bold rounded-lg hover:shadow-lg transition">
              Get Started Free
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition">
              Schedule Demo
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
