'use client'

import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'
import { DashboardLayout } from '@/components/layouts/DashboardLayout'
import { DataTable, Column } from '@/components/tables/DataTable'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Performance } from '@/lib/types'
import { MOCK_PERFORMANCE } from '@/lib/mock-data'
import { formatDate, getRatingLabel, sleep } from '@/lib/utils'

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'
          }`}
        />
      ))}
      <span className="ml-1.5 text-xs text-gray-500">{getRatingLabel(rating)}</span>
    </div>
  )
}

const ratingBg: Record<number, string> = {
  5: 'bg-emerald-50 text-emerald-700',
  4: 'bg-blue-50 text-blue-700',
  3: 'bg-amber-50 text-amber-700',
  2: 'bg-orange-50 text-orange-700',
  1: 'bg-red-50 text-red-700',
}

const RATING_DIST = [5, 4, 3, 2, 1].map((r) => ({
  rating: r,
  count: MOCK_PERFORMANCE.filter((p) => p.rating === r).length,
}))

export default function PerformancePage() {
  const [records, setRecords] = useState<Performance[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    sleep(250).then(() => {
      setRecords([...MOCK_PERFORMANCE])
      setLoading(false)
    })
  }, [])

  const avg =
    records.length
      ? (records.reduce((s, p) => s + p.rating, 0) / records.length).toFixed(1)
      : '—'

  const columns: Column<Performance>[] = [
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
              <p className="text-xs text-gray-500">{r.employee?.position}</p>
            </div>
          </div>
        )
      },
    },
    { key: 'period', label: 'Period', render: (r) => r.period },
    {
      key: 'rating',
      label: 'Rating',
      render: (r) => <RatingStars rating={r.rating} />,
    },
    {
      key: 'goals',
      label: 'Goals',
      render: (r) => (
        <span className="block max-w-xs truncate text-xs text-gray-600">{r.goals}</span>
      ),
    },
    {
      key: 'achievements',
      label: 'Achievements',
      render: (r) => (
        <span className="block max-w-xs truncate text-xs text-gray-600">{r.achievements}</span>
      ),
    },
    {
      key: 'feedback',
      label: 'Feedback',
      render: (r) => (
        <span className="block max-w-[180px] truncate text-xs text-gray-500 italic">
          &ldquo;{r.feedback}&rdquo;
        </span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Reviewed',
      render: (r) => formatDate(r.createdAt, 'MMM d, yyyy'),
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-5">
        {/* Summary */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <Card className="col-span-2 sm:col-span-1">
            <CardContent className="pt-4">
              <p className="text-xs text-gray-500">Avg Rating</p>
              <p className="mt-0.5 text-3xl font-bold text-amber-500">{avg}</p>
              <p className="text-xs text-gray-400">out of 5</p>
            </CardContent>
          </Card>
          {RATING_DIST.map((d) => (
            <Card key={d.rating}>
              <CardContent className="pt-4">
                <p className="text-xs text-gray-500">{getRatingLabel(d.rating)}</p>
                <p className={`mt-0.5 text-2xl font-bold ${ratingBg[d.rating]?.split(' ')[1] ?? ''}`}>
                  {d.count}
                </p>
                <div className="mt-1 flex">
                  {Array.from({ length: d.rating }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={records}
          loading={loading}
          emptyMessage="No performance reviews found"
        />
      </div>
    </DashboardLayout>
  )
}
