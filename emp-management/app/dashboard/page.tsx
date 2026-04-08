'use client'

import { useAuth } from '@/hooks/useAuth'
import { redirect } from 'next/navigation'
import { MainLayout } from '@/components/layouts/MainLayout'
import { MoreVertical, Eye } from 'lucide-react'

export default function DashboardPage() {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated) {
    redirect('/login')
  }

  const stats = [
    {
      title: 'Total Employees',
      value: '254',
      change: '+12%',
      icon: '👥',
      gradient: 'from-blue-50 to-blue-100',
    },
    {
      title: 'Present Today',
      value: '198',
      change: '+8%',
      icon: '✓',
      gradient: 'from-green-50 to-green-100',
    },
    {
      title: 'On Leave',
      value: '18',
      change: '+5%',
      icon: '📋',
      gradient: 'from-orange-50 to-orange-100',
    },
    {
      title: 'Departments',
      value: '12',
      change: 'Active',
      icon: '🏢',
      gradient: 'from-purple-50 to-purple-100',
    },
  ]

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Good morning{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
            </h1>
            <p className="text-slate-600 mt-2">Here&apos;s your team&apos;s performance overview</p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-3 border-2 border-teal-200 text-teal-600 font-bold rounded-lg hover:bg-teal-50 transition">
              Last 7 Days
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold rounded-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
              Export Report
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 shadow-md border border-slate-200 hover:shadow-xl hover:border-teal-200 transition-all duration-200 group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-xl font-bold group-hover:shadow-lg transition`}
                >
                  {stat.icon}
                </div>
                <button className="p-2 opacity-0 group-hover:opacity-100 hover:bg-slate-100 rounded-lg transition">
                  <MoreVertical size={18} className="text-slate-600" />
                </button>
              </div>
              <p className="text-slate-600 text-sm font-semibold mb-2">{stat.title}</p>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-bold text-slate-900">{stat.value}</span>
                <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Attendance Trend */}
          <div className="lg:col-span-2 bg-white rounded-xl p-8 shadow-md border border-slate-200 hover:shadow-lg transition">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Attendance Trend</h3>
                <p className="text-sm text-slate-600">Last 7 days performance</p>
              </div>
              <button className="text-teal-600 hover:text-teal-700 font-bold text-sm flex items-center gap-1">
                View Details <Eye size={16} />
              </button>
            </div>

            {/* Chart */}
            <div className="h-64 bg-gradient-to-b from-teal-50/50 to-transparent rounded-lg flex items-end justify-between px-2 gap-1">
              {[
                { height: 65, day: 'Mon' },
                { height: 80, day: 'Tue' },
                { height: 75, day: 'Wed' },
                { height: 85, day: 'Thu' },
                { height: 78, day: 'Fri' },
                { height: 82, day: 'Sat' },
                { height: 88, day: 'Sun' },
              ].map((data, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center flex-1 gap-2 group/bar"
                >
                  <div
                    className="w-full bg-gradient-to-t from-teal-500 to-teal-400 rounded-t-lg hover:from-teal-600 hover:to-teal-500 transition-all duration-200 transform group-hover/bar:scale-105 cursor-pointer shadow-md"
                    style={{ height: `${data.height}%`, minHeight: '20px' }}
                  ></div>
                  <span className="text-xs font-semibold text-slate-600">{data.day}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-200">
              <div>
                <p className="text-xs text-slate-600 font-semibold">Average</p>
                <p className="text-2xl font-bold text-slate-900 mt-2">79.6%</p>
              </div>
              <div>
                <p className="text-xs text-slate-600 font-semibold">Highest</p>
                <p className="text-2xl font-bold text-slate-900 mt-2">88%</p>
              </div>
              <div>
                <p className="text-xs text-slate-600 font-semibold">Lowest</p>
                <p className="text-2xl font-bold text-slate-900 mt-2">65%</p>
              </div>
            </div>
          </div>

          {/* Department Distribution */}
          <div className="bg-white rounded-xl p-8 shadow-md border border-slate-200 hover:shadow-lg transition">
            <h3 className="text-lg font-bold text-slate-900 mb-6">
              Department Distribution
            </h3>

            <div className="space-y-6">
              {[
                { name: 'Engineering', count: 45, color: 'from-blue-500 to-blue-600' },
                { name: 'Sales', count: 32, color: 'from-green-500 to-green-600' },
                { name: 'HR', count: 12, color: 'from-purple-500 to-purple-600' },
                { name: 'Marketing', count: 18, color: 'from-orange-500 to-orange-600' },
              ].map((dept, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-slate-900">{dept.name}</span>
                    <span className="text-sm font-bold text-slate-600">{dept.count}</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${dept.color} transition-all duration-500`}
                      style={{ width: `${(dept.count / 45) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200">
              <p className="text-xs text-slate-600 font-semibold">Total Headcount</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">254</p>
            </div>
          </div>
        </div>

        {/* Activity & Events */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-8 shadow-md border border-slate-200 hover:shadow-lg transition">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Activity</h3>

            <div className="space-y-4">
              {[
                { icon: '👤', title: 'John Doe joined Engineering', time: '2 hours ago' },
                { icon: '✓', title: 'Leave approved for Sarah', time: '3 hours ago' },
                { icon: '⭐', title: 'Performance review added', time: '5 hours ago' },
                { icon: '📋', title: 'Department meeting scheduled', time: '1 day ago' },
              ].map((activity, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 pb-4 border-b border-slate-200 last:border-b-0 hover:bg-slate-50 p-2 rounded transition"
                >
                  <span className="text-2xl">{activity.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-900 font-semibold text-sm">{activity.title}</p>
                    <p className="text-slate-500 text-xs mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-xl p-8 shadow-md border border-slate-200 hover:shadow-lg transition">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Upcoming Events</h3>

            <div className="space-y-4">
              {[
                { date: '20', title: 'Team Meeting', desc: 'Engineering Team', icon: '📅' },
                { date: '22', title: 'Performance Reviews', desc: 'All Departments', icon: '⭐' },
                { date: '25', title: 'Company Outing', desc: 'Team Building', icon: '🎉' },
              ].map((event, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg border border-teal-200 hover:shadow-md hover:border-teal-300 transition group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {event.date}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 text-sm">{event.title}</p>
                    <p className="text-slate-600 text-xs mt-1">{event.desc}</p>
                  </div>
                  <span className="text-2xl group-hover:scale-110 transition">{event.icon}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}