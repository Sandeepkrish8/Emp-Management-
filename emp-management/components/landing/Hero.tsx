'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, TrendingUp } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-blue-50 to-white z-0" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full">
              <span className="text-sm font-semibold text-primary">✨ New</span>
              <span className="text-sm text-gray-600">AI-powered employee insights now available</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Manage Your Team,
              <span className="text-primary"> Effortlessly</span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Streamline employee management, track attendance, manage leave requests,
              and boost team productivity with our intelligent platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/login">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  Start Free Trial <ArrowRight size={18} aria-hidden="true" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-col sm:flex-row gap-6 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users size={18} className="text-green-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">500+</p>
                  <p className="text-xs text-gray-500">Companies trust us</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp size={18} className="text-blue-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">99.9%</p>
                  <p className="text-xs text-gray-500">Uptime guarantee</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Dashboard preview mockup */}
          <div className="relative" aria-hidden="true">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-300/20 rounded-3xl blur-3xl" />
            <div className="relative bg-white rounded-2xl shadow-elevated border border-gray-200 p-6">
              {/* Fake browser bar */}
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
                <div className="ml-3 flex-1 h-5 bg-gray-100 rounded-md" />
              </div>
              {/* Dashboard mockup */}
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-20 bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex flex-col items-center justify-center gap-1">
                    <span className="text-xs font-bold text-green-700">254</span>
                    <span className="text-[10px] text-green-600">Employees</span>
                  </div>
                  <div className="h-20 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex flex-col items-center justify-center gap-1">
                    <span className="text-xs font-bold text-blue-700">12</span>
                    <span className="text-[10px] text-blue-600">Departments</span>
                  </div>
                  <div className="h-20 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg flex flex-col items-center justify-center gap-1">
                    <span className="text-xs font-bold text-orange-700">18</span>
                    <span className="text-[10px] text-orange-600">On Leave</span>
                  </div>
                </div>
                <div className="h-36 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
                  <div className="flex items-end gap-2 h-20 px-4">
                    {[40,65,50,80,70,90,75].map((h, i) => (
                      <div key={i} className="flex-1 bg-primary/60 rounded-t" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
                <div className="h-20 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
