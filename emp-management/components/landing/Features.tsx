'use client'

import { Users, BarChart3, Clock, Shield, Zap, FileCheck } from 'lucide-react'

const features = [
  {
    Icon: Users,
    title: 'Employee Directory',
    description: 'Centralized employee database with complete information and profiles.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    Icon: Clock,
    title: 'Attendance Tracking',
    description: 'Real-time check-in/check-out with attendance analytics and reports.',
    color: 'bg-green-100 text-green-600',
  },
  {
    Icon: FileCheck,
    title: 'Leave Management',
    description: 'Streamlined leave request process with automatic approvals.',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    Icon: BarChart3,
    title: 'Performance Reviews',
    description: '360-degree feedback system with goal tracking and ratings.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    Icon: Zap,
    title: 'Real-time Insights',
    description: 'Dashboards with key metrics, trends, and actionable insights.',
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    Icon: Shield,
    title: 'Secure & Compliant',
    description: 'Enterprise-grade security with GDPR compliance and data encryption.',
    color: 'bg-red-100 text-red-600',
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern Teams
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage your workforce efficiently and effectively
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ Icon, title, description, color }) => (
            <div
              key={title}
              className="group bg-white rounded-xl p-8 border border-gray-200 hover:border-primary hover:shadow-dropdown transition-all duration-200"
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-5 ${color}`}>
                <Icon size={22} aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
