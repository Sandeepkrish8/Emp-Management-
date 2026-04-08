'use client'

import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/layouts/DashboardLayout'
import { DataTable, Column } from '@/components/tables/DataTable'
import { Badge } from '@/components/ui/badge'
import { Select } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { AttendanceOverviewChart } from '@/components/dashboard/Charts'
import { Attendance } from '@/lib/types'
import { MOCK_ATTENDANCE } from '@/lib/mock-data'
import { formatDate, getStatusColor, cn, sleep } from '@/lib/utils'

const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'present',  label: 'Present' },
  { value: 'absent',   label: 'Absent' },
  { value: 'late',     label: 'Late' },
  { value: 'half_day', label: 'Half Day' },
]

export default function AttendancePage() {
  const [records, setRecords] = useState<Attendance[]>([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    setLoading(true)
    sleep(250).then(() => {
      setRecords([...MOCK_ATTENDANCE])
      setLoading(false)
    })
  }, [])

  const filtered = filter ? records.filter((r) => r.status === filter) : records

  const present  = records.filter((r) => r.status === 'present').length
  const absent   = records.filter((r) => r.status === 'absent').length
  const late     = records.filter((r) => r.status === 'late').length
  const halfDay  = records.filter((r) => r.status === 'half_day').length

  const columns: Column<Attendance>[] = [
    {
      key: 'employee',
      label: 'Employee',
      render: (r) => {
        const name = r.employee?.name ?? 'Unknown'
        return (
          <div className="flex items-center gap-2.5">
            <Avatar name={name} size="sm" />
            <div>
              <p className="font-medium text-gray-900">{name}</p>
              <p className="text-xs text-gray-500">{r.employee?.department?.name}</p>
            </div>
          </div>
        )
      },
    },
    {
      key: 'date',
      label: 'Date',
      render: (r) => formatDate(r.date, 'MMM dd, yyyy'),
    },
    { key: 'checkIn',  label: 'Check In',  render: (r) => r.checkIn || '—' },
    { key: 'checkOut', label: 'Check Out', render: (r) => r.checkOut || '—' },
    {
      key: 'hoursWorked',
      label: 'Hours',
      render: (r) =>
        r.hoursWorked ? `${r.hoursWorked.toFixed(1)} hrs` : '—',
    },
    {
      key: 'status',
      label: 'Status',
      render: (r) => (
        <Badge className={cn('capitalize', getStatusColor(r.status))}>
          {r.status.replace('_', ' ')}
        </Badge>
      ),
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-5">
        {/* Overview card */}
        <Card>
          <CardContent className="pt-5">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-1 text-sm font-semibold text-gray-700">
                  Today — {formatDate(new Date(), 'MMMM dd, yyyy')}
                </h3>
                <p className="text-xs text-gray-400 mb-4">
                  {records.length} total records
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Present',  value: present,  color: 'text-emerald-600' },
                    { label: 'Absent',   value: absent,   color: 'text-red-600' },
                    { label: 'Late',     value: late,     color: 'text-amber-600' },
                    { label: 'Half Day', value: halfDay,  color: 'text-blue-600' },
                  ].map((s) => (
                    <div key={s.label} className="rounded-lg bg-gray-50 p-3">
                      <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                      <p className="text-xs text-gray-500">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <AttendanceOverviewChart data={{ present, absent, late, halfDay }} />
            </div>
          </CardContent>
        </Card>

        {/* Filter */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">{filtered.length} records</p>
          <div className="w-44">
            <Select
              options={STATUS_OPTIONS}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filtered}
          loading={loading}
          emptyMessage="No attendance records found"
        />
      </div>
    </DashboardLayout>
  )
}
