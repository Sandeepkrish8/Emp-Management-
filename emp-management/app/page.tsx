'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/store/useStore'
import PremiumPromoPopup from '@/components/PremiumPromoPopup'
import {
  Menu,
  X,
  ArrowRight,
  Check,
  Star,
  Users,
  BarChart3,
  Clock,
  Shield,
  Zap,
  FileCheck,
  Play,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Video,
  MessageSquare,
  Headphones,
  Gauge,
  Settings,
  Eye,
  FileText,
  TrendingUp,
} from 'lucide-react'

export default function LandingPage() {
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    if (isAuthenticated) router.replace('/dashboard')
  }, [isAuthenticated, router])

  return (
    <div className="min-h-screen bg-white">
      {/* ========== NAVIGATION HEADER WITH MEGA DROPDOWN ========== */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="font-bold text-xl text-gray-900 hidden sm:block">
              EmpManage
            </span>
          </Link>

          {/* Desktop Menu with Mega Dropdown */}
          <div className="hidden md:flex items-center gap-1">
            {/* Features Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDropdown('features')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-teal-600 transition font-medium rounded-lg hover:bg-gray-50">
                Features
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-200" />
              </button>

              {/* MEGA DROPDOWN - Features */}
              <div className="absolute left-1/2 -translate-x-1/2 mt-0 w-[900px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2 pointer-events-none group-hover:pointer-events-auto">
                <div className="bg-white border border-gray-200 rounded-xl shadow-2xl p-8 mt-2">
                  <div className="grid grid-cols-4 gap-8">
                    {/* Core Features */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Users size={18} className="text-teal-600" />
                        Core Features
                      </h4>
                      <ul className="space-y-3">
                        {['Employee Directory', 'Attendance Tracking', 'Leave Management', 'Org Structure'].map((item) => (
                          <li key={item}>
                            <a href="#features" className="text-gray-600 hover:text-teal-600 transition text-sm flex items-center gap-2 group/item">
                              <ChevronRight size={14} className="opacity-0 group-hover/item:opacity-100 transition" />
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Analytics */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <BarChart3 size={18} className="text-blue-600" />
                        Analytics
                      </h4>
                      <ul className="space-y-3">
                        {['Real-time Dashboards', 'Performance Reviews', 'Custom Reports', 'Data Insights'].map((item) => (
                          <li key={item}>
                            <a href="#features" className="text-gray-600 hover:text-teal-600 transition text-sm flex items-center gap-2 group/item">
                              <ChevronRight size={14} className="opacity-0 group-hover/item:opacity-100 transition" />
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Security */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Shield size={18} className="text-green-600" />
                        Security
                      </h4>
                      <ul className="space-y-3">
                        {['Enterprise SSO', 'GDPR Compliance', 'Data Encryption', 'Audit Logs'].map((item) => (
                          <li key={item}>
                            <a href="#features" className="text-gray-600 hover:text-teal-600 transition text-sm flex items-center gap-2 group/item">
                              <ChevronRight size={14} className="opacity-0 group-hover/item:opacity-100 transition" />
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Featured Box */}
                    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-4 border border-teal-200">
                      <h4 className="font-bold text-gray-900 mb-3 text-sm">New Features</h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <span className="text-teal-600 font-bold">★</span>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">AI Analytics</p>
                            <p className="text-xs text-gray-600">Predictive insights</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-teal-600 font-bold">★</span>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">Mobile App</p>
                            <p className="text-xs text-gray-600">iOS & Android</p>
                          </div>
                        </div>
                      </div>
                      <button className="mt-4 w-full px-4 py-2 bg-teal-600 text-white text-sm font-semibold rounded-lg hover:bg-teal-700 transition">
                        View All
                      </button>
                    </div>
                  </div>

                  {/* Bottom Quick Links */}
                  <div className="border-t border-gray-200 mt-6 pt-6">
                    <div className="grid grid-cols-4 gap-8 text-center">
                      <a href="#" className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition">
                        <Eye size={20} className="text-gray-600" />
                        <span className="text-xs font-medium text-gray-700">View Demo</span>
                      </a>
                      <a href="#" className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition">
                        <FileText size={20} className="text-gray-600" />
                        <span className="text-xs font-medium text-gray-700">Documentation</span>
                      </a>
                      <a href="#" className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition">
                        <Video size={20} className="text-gray-600" />
                        <span className="text-xs font-medium text-gray-700">Video Guide</span>
                      </a>
                      <a href="#" className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition">
                        <Headphones size={20} className="text-gray-600" />
                        <span className="text-xs font-medium text-gray-700">Get Support</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Solutions Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDropdown('solutions')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-teal-600 transition font-medium rounded-lg hover:bg-gray-50">
                Solutions
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-200" />
              </button>

              {/* MEGA DROPDOWN - Solutions */}
              <div className="absolute left-1/2 -translate-x-1/2 mt-0 w-[750px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2 pointer-events-none group-hover:pointer-events-auto">
                <div className="bg-white border border-gray-200 rounded-xl shadow-2xl p-8 mt-2">
                  <div className="grid grid-cols-3 gap-8">
                    {/* By Role */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-4">By Role</h4>
                      <ul className="space-y-3">
                        {[
                          { icon: Users, label: 'HR Managers', desc: 'Streamline HR operations' },
                          { icon: TrendingUp, label: 'Executives', desc: 'Strategic insights' },
                          { icon: Gauge, label: 'Team Leads', desc: 'Manage your team' },
                          { icon: Settings, label: 'IT Admins', desc: 'Configure system' },
                        ].map((item, i) => {
                          const Icon = item.icon
                          return (
                            <li key={i}>
                              <a href="#" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition">
                                <Icon size={18} className="text-teal-600 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                                  <p className="text-xs text-gray-600">{item.desc}</p>
                                </div>
                              </a>
                            </li>
                          )
                        })}
                      </ul>
                    </div>

                    {/* By Industry */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-4">By Industry</h4>
                      <ul className="space-y-2">
                        {['Technology', 'Healthcare', 'Finance', 'Retail', 'Manufacturing'].map((item) => (
                          <li key={item}>
                            <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-teal-600 hover:bg-gray-50 rounded-lg transition">
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Enterprise */}
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
                      <h4 className="font-bold text-gray-900 mb-3">Enterprise</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Scale your HR operations with dedicated support and custom features.
                      </p>
                      <button className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition">
                        Contact Sales
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Resources Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDropdown('resources')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-teal-600 transition font-medium rounded-lg hover:bg-gray-50">
                Resources
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-200" />
              </button>

              {/* MEGA DROPDOWN - Resources */}
              <div className="absolute left-1/2 -translate-x-1/2 mt-0 w-[650px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2 pointer-events-none group-hover:pointer-events-auto">
                <div className="bg-white border border-gray-200 rounded-xl shadow-2xl p-8 mt-2">
                  <div className="grid grid-cols-3 gap-8">
                    {/* Learning */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <BookOpen size={18} className="text-purple-600" />
                        Learning
                      </h4>
                      <ul className="space-y-2">
                        {['Getting Started Guide', 'Video Tutorials', 'Knowledge Base', 'API Documentation'].map((item) => (
                          <li key={item}>
                            <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-teal-600 hover:bg-gray-50 rounded-lg transition">
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Community */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <MessageSquare size={18} className="text-orange-600" />
                        Community
                      </h4>
                      <ul className="space-y-2">
                        {['Community Forum', 'User Events', 'Case Studies', 'Blog'].map((item) => (
                          <li key={item}>
                            <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-teal-600 hover:bg-gray-50 rounded-lg transition">
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Support */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Headphones size={18} className="text-red-600" />
                        Support
                      </h4>
                      <ul className="space-y-2">
                        {['Contact Support', 'System Status', 'FAQ', 'Contact Sales'].map((item) => (
                          <li key={item}>
                            <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-teal-600 hover:bg-gray-50 rounded-lg transition">
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Simple Links */}
            <a href="#pricing" className="px-4 py-2 text-gray-700 hover:text-teal-600 transition font-medium rounded-lg hover:bg-gray-50">
              Pricing
            </a>
            <a href="#testimonials" className="px-4 py-2 text-gray-700 hover:text-teal-600 transition font-medium rounded-lg hover:bg-gray-50">
              Company
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex gap-3">
            <Link href="/login">
              <button className="px-6 py-2.5 text-teal-600 font-semibold hover:bg-teal-50 rounded-lg transition">
                Sign In
              </button>
            </Link>
            <Link href="/signup">
              <button className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105">
                Get Started Free
              </button>
            </Link>
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
            <a href="#features" className="block text-gray-700 hover:text-teal-600 py-2">
              Features
            </a>
            <a href="#" className="block text-gray-700 hover:text-teal-600 py-2">
              Solutions
            </a>
            <a href="#" className="block text-gray-700 hover:text-teal-600 py-2">
              Resources
            </a>
            <a href="#pricing" className="block text-gray-700 hover:text-teal-600 py-2">
              Pricing
            </a>
            <a href="#testimonials" className="block text-gray-700 hover:text-teal-600 py-2">
              Company
            </a>
            <div className="flex gap-2 pt-2">
              <Link href="/login" className="flex-1">
                <button className="w-full px-4 py-2 border border-teal-600 text-teal-600 rounded-lg font-semibold">
                  Sign In
                </button>
              </Link>
              <Link href="/signup" className="flex-1">
                <button className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg font-semibold">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ========== HERO SECTION ========== */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8 animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-teal-100 px-4 py-2 rounded-full w-fit">
            <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-teal-700">
              Smart Team Management Platform
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Manage Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-teal-700 block">
              Team Smarter
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
            Streamline employee management, track attendance in real-time, and boost team
            productivity with our intelligent platform designed for modern teams.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/signup">
              <button className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-200 hover:scale-105">
                Start Free Trial (14 Days)
                <ArrowRight size={20} />
              </button>
            </Link>
            <button className="px-8 py-4 border-2 border-teal-200 text-teal-600 font-semibold rounded-xl hover:bg-teal-50 transition flex items-center justify-center gap-2">
              <Play size={20} />
              Watch Demo (2 min)
            </button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-col sm:flex-row gap-8 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users size={24} className="text-green-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900">500+</p>
                <p className="text-sm text-gray-600">Companies Trust Us</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Star size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900">4.9/5 Stars</p>
                <p className="text-sm text-gray-600">User Rated</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Dashboard Preview */}
        <div className="relative animate-slide-in-right hidden md:block">
          {/* Floating gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 rounded-3xl blur-3xl"></div>

          {/* Dashboard Card */}
          <div className="relative bg-white rounded-2xl shadow-2xl border border-teal-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-4 text-white">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-bold text-lg">Good morning, John</h3>
                  <p className="text-sm text-teal-100">Dashboard Overview</p>
                </div>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">J</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4">
                  <p className="text-xs text-gray-600 font-semibold">Employees</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">254</p>
                  <p className="text-xs text-green-600 font-semibold mt-2">+12%</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                  <p className="text-xs text-gray-600 font-semibold">Present</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">198</p>
                  <p className="text-xs text-green-600 font-semibold mt-2">+8%</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
                  <p className="text-xs text-gray-600 font-semibold">On Leave</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">18</p>
                  <p className="text-xs text-orange-600 font-semibold mt-2">+5%</p>
                </div>
              </div>

              {/* Chart */}
              <div className="bg-gradient-to-b from-teal-50 to-transparent rounded-lg h-32 flex items-end justify-between px-2 gap-1">
                {[45, 60, 50, 75, 55, 70, 48].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-teal-500 to-teal-400 rounded-t transition hover:from-teal-600 hover:to-teal-500"
                    style={{ height: `${height}%`, minHeight: '16px' }}
                  ></div>
                ))}
              </div>

              {/* Bottom Info */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600">Avg. Work Hours</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">45 hrs</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600">Productivity</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">94%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FEATURES SECTION ========== */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-200">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern Teams
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage your workforce efficiently and effectively
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Users,
              title: 'Employee Directory',
              desc: 'Centralized database with complete employee information, profiles, and contact details',
              color: 'text-blue-600',
              bgColor: 'from-blue-50 to-blue-100',
            },
            {
              icon: Clock,
              title: 'Attendance Tracking',
              desc: 'Real-time check-in/out with automated timesheets and detailed analytics',
              color: 'text-green-600',
              bgColor: 'from-green-50 to-green-100',
            },
            {
              icon: FileCheck,
              title: 'Leave Management',
              desc: 'Streamlined leave requests with auto-approvals and balance tracking',
              color: 'text-orange-600',
              bgColor: 'from-orange-50 to-orange-100',
            },
            {
              icon: BarChart3,
              title: 'Performance Reviews',
              desc: '360-degree feedback system with goal tracking and continuous reviews',
              color: 'text-purple-600',
              bgColor: 'from-purple-50 to-purple-100',
            },
            {
              icon: Zap,
              title: 'Real-time Insights',
              desc: 'Powerful dashboards with metrics, trends, and actionable analytics',
              color: 'text-yellow-600',
              bgColor: 'from-yellow-50 to-yellow-100',
            },
            {
              icon: Shield,
              title: 'Enterprise Security',
              desc: 'Grade-A security with encryption, GDPR compliance, and data protection',
              color: 'text-red-600',
              bgColor: 'from-red-50 to-red-100',
            },
          ].map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={i}
                className="group bg-white rounded-xl p-8 border border-gray-200 hover:border-teal-300 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.bgColor} flex items-center justify-center mb-6 group-hover:shadow-lg transition`}
                >
                  <Icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ========== HOW IT WORKS SECTION ========== */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-200">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started in just 4 simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: 1, title: 'Sign Up', desc: 'Create your account in 2 minutes', icon: '📝' },
            { step: 2, title: 'Add Employees', desc: 'Import or manually add your team', icon: '👥' },
            { step: 3, title: 'Configure', desc: 'Set up departments and roles', icon: '⚙️' },
            { step: 4, title: 'Go Live', desc: 'Start managing your team', icon: '🚀' },
          ].map((item, i) => (
            <div key={i} className="relative">
              {/* Connector Line */}
              {i < 3 && (
                <div className="hidden md:block absolute top-20 left-[calc(50%+56px)] right-[calc(-50%+56px)] h-1 bg-gradient-to-r from-teal-500 to-transparent"></div>
              )}

              {/* Card */}
              <div className="bg-white rounded-xl p-8 border border-gray-200 hover:border-teal-300 hover:shadow-lg transition-all text-center relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded-xl flex items-center justify-center mx-auto mb-4 text-3xl">
                  {item.icon}
                </div>
                <div className="w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== PRICING SECTION ========== */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-200">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your organization
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: 'Starter',
              price: '$29',
              period: '/month',
              employees: 'Up to 50',
              popular: false,
              features: [
                'Core HR features',
                'Attendance tracking',
                'Basic reports',
                'Email support',
                'Mobile app access',
              ],
            },
            {
              name: 'Professional',
              price: '$79',
              period: '/month',
              employees: 'Up to 500',
              popular: true,
              features: [
                'All Starter features',
                'Performance reviews',
                'Leave management',
                'Advanced analytics',
                'Priority support',
                'Custom branding',
                'API access',
              ],
            },
            {
              name: 'Enterprise',
              price: 'Custom',
              period: 'Contact sales',
              employees: 'Unlimited',
              popular: false,
              features: [
                'All features included',
                'White-label solution',
                '24/7 dedicated support',
                'Custom integrations',
                'SLA guarantee',
                'On-premise option',
              ],
            },
          ].map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-2xl transition-all duration-300 ${
                plan.popular
                  ? 'bg-gradient-to-br from-teal-50 to-cyan-50 ring-2 ring-teal-500 shadow-2xl scale-105'
                  : 'bg-white border border-gray-200'
              }`}
            >
              <div className="p-8">
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </div>
                )}

                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>
                <p className="text-gray-600 font-semibold mb-6">{plan.employees} employees</p>

                <button
                  className={`w-full py-3 rounded-lg font-bold transition mb-8 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:shadow-lg'
                      : 'border-2 border-teal-200 text-teal-600 hover:bg-teal-50'
                  }`}
                >
                  Get Started
                </button>

                <ul className="space-y-4">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-gray-700">
                      <Check size={20} className="text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            ✓ All plans include 14-day free trial • ✓ No credit card required • ✓ Cancel anytime
          </p>
        </div>
      </section>

      {/* ========== TESTIMONIALS SECTION ========== */}
      <section id="testimonials" className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-200">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Loved by Teams Everywhere
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See what our customers have to say
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: 'Sarah Johnson',
              role: 'HR Manager',
              company: 'Tech Solutions Inc.',
              testimonial:
                'EmpManage transformed how we manage our team. Attendance tracking is now automated and leave approvals are instant. Highly recommended!',
              avatar: '👩‍💼',
            },
            {
              name: 'Michael Chen',
              role: 'Operations Director',
              company: 'Global Corp',
              testimonial:
                'The performance review system is exactly what we needed. It provides valuable insights for development conversations with our team.',
              avatar: '👨‍💼',
            },
            {
              name: 'Emily Rodriguez',
              role: 'CEO',
              company: 'StartUp Hub',
              testimonial:
                'Best investment for our growing team. The dashboards give us real-time visibility into our workforce metrics. Game-changer!',
              avatar: '👩‍🚀',
            },
          ].map((testimonial, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{testimonial.avatar}</span>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-4">
                &ldquo;{testimonial.testimonial}&rdquo;
              </p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== STATS SECTION ========== */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-200">
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { number: '500+', label: 'Companies' },
            { number: '50K+', label: 'Active Users' },
            { number: '99.9%', label: 'Uptime' },
            { number: '24/7', label: 'Support' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-teal-700 mb-2">
                {stat.number}
              </p>
              <p className="text-gray-600 font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========== FAQ SECTION ========== */}
      <section id="faq" className="max-w-4xl mx-auto px-6 py-20 border-t border-gray-200">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-6">
          {[
            {
              q: 'Is there a free trial?',
              a: 'Yes, all plans include a 14-day free trial. No credit card required to get started.',
            },
            {
              q: 'Can I switch plans anytime?',
              a: 'Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle.',
            },
            {
              q: 'What about data security?',
              a: 'We use enterprise-grade encryption and comply with GDPR, HIPAA, and SOC 2 standards.',
            },
            {
              q: 'Do you offer integrations?',
              a: 'Yes, we integrate with popular tools like Slack, Google Workspace, Microsoft Teams, and more.',
            },
            {
              q: 'What if I need custom features?',
              a: 'Contact our sales team. We offer custom development for enterprise clients.',
            },
            {
              q: 'How is customer support?',
              a: 'We provide email support for all plans and phone/chat support for Professional and Enterprise plans.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:border-teal-300 transition"
            >
              <h3 className="font-bold text-lg text-gray-900 mb-3">{item.q}</h3>
              <p className="text-gray-600 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-700 py-20 px-6 my-20">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to Transform Your HR?
          </h2>
          <p className="text-lg text-teal-100 mb-8 max-w-2xl mx-auto">
            Join 500+ companies managing their teams more efficiently with EmpManage
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <button className="px-8 py-4 bg-white text-teal-600 font-bold rounded-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                Start Free Trial (14 Days)
              </button>
            </Link>
            <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition">
              Schedule Demo
            </button>
          </div>
          <p className="text-teal-100 mt-6 text-sm">
            ✓ No credit card required • ✓ 14-day free trial • ✓ Cancel anytime
          </p>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg"></div>
                <span className="font-bold text-white">EmpManage</span>
              </div>
              <p className="text-sm text-gray-400">
                Modern employee management platform for growing teams
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition">Roadmap</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
                <li><a href="#" className="hover:text-white transition">Compliance</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Follow Us</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition">GitHub</a></li>
                <li><a href="#" className="hover:text-white transition">Facebook</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2024 EmpManage. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Promotional Popup */}
      <PremiumPromoPopup
        variant="a"
        delay={5000}
        isDemoMode={true}
        heading="Level up your HR game"
        description="See how EmpManage can save you 20 hours a week on HR tasks."
        primaryCta="Request Demo"
        secondaryCta="30-Day Free Trial"
        accentColor="#FCD34D"
        showEmail={false}
        showStats={false}
        onRequestDemo={async (email) => {
          console.log('Demo requested:', email)
          window.location.href = `/demo${email ? `?email=${encodeURIComponent(email)}` : ''}`
        }}
        onStartTrial={async (email) => {
          console.log('Trial started:', email)
          window.location.href = `/signup${email ? `?email=${encodeURIComponent(email)}` : ''}`
        }}
      />
    </div>
  )
}
