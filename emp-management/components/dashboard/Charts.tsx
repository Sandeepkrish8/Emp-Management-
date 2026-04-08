'use client'

import { MONTHLY_HEADCOUNT, DEPT_DISTRIBUTION } from '@/lib/mock-data'

// ── Bar chart (headcount over time) ──────────────────────────────────────────

export function HeadcountChart() {
  const max = Math.max(...MONTHLY_HEADCOUNT.map((d) => d.count))

  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold text-gray-700">
        Headcount Trend (6 months)
      </h3>
      <div className="flex items-end gap-3 h-36">
        {MONTHLY_HEADCOUNT.map((d) => {
          const pct = (d.count / max) * 100
          return (
            <div key={d.month} className="flex flex-1 flex-col items-center gap-1">
              <span className="text-xs font-medium text-gray-600">{d.count}</span>
              <div className="w-full rounded-t-md bg-primary-500 transition-all" style={{ height: `${pct}%` }} />
              <span className="text-xs text-gray-400">{d.month}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Donut / horizontal-bar dept distribution ─────────────────────────────────

const COLORS = ['#0066cc', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444']

export function DeptDistributionChart() {
  const total = DEPT_DISTRIBUTION.reduce((s, d) => s + d.count, 0)

  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold text-gray-700">
        Department Distribution
      </h3>
      <div className="space-y-3">
        {DEPT_DISTRIBUTION.map((d, i) => {
          const pct = Math.round((d.count / total) * 100)
          return (
            <div key={d.name}>
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-gray-600">{d.name}</span>
                <span className="font-medium text-gray-700">
                  {d.count} ({pct}%)
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-100">
                <div
                  className="h-2 rounded-full transition-all"
                  style={{ width: `${pct}%`, backgroundColor: COLORS[i % COLORS.length] }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Attendance overview – simple pie-like ring visualization ─────────────────

interface AttendanceData {
  present: number
  absent: number
  late: number
  halfDay: number
}

export function AttendanceOverviewChart({ data }: { data: AttendanceData }) {
  const total = data.present + data.absent + data.late + data.halfDay || 1
  const segments = [
    { label: 'Present',  value: data.present,  color: '#10b981' },
    { label: 'Late',     value: data.late,      color: '#f59e0b' },
    { label: 'Half-day', value: data.halfDay,   color: '#0ea5e9' },
    { label: 'Absent',   value: data.absent,    color: '#ef4444' },
  ]

  return (
    <div className="flex flex-col gap-3">
      {segments.map((s) => (
        <div key={s.label} className="flex items-center gap-3">
          <span
            className="h-3 w-3 flex-shrink-0 rounded-full"
            style={{ backgroundColor: s.color }}
          />
          <div className="flex-1">
            <div className="h-2 rounded-full bg-gray-100">
              <div
                className="h-2 rounded-full"
                style={{
                  width: `${(s.value / total) * 100}%`,
                  backgroundColor: s.color,
                }}
              />
            </div>
          </div>
          <span className="w-6 text-right text-xs font-medium text-gray-600">
            {s.value}
          </span>
          <span className="w-16 text-xs text-gray-400">{s.label}</span>
        </div>
      ))}
    </div>
  )
}
