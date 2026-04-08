import { formatDate, getStatusColor, cn } from '@/lib/utils'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { MOCK_LEAVES, MOCK_ATTENDANCE } from '@/lib/mock-data'

export function RecentActivity() {
  const recentLeaves = MOCK_LEAVES.slice(0, 4)

  return (
    <div className="space-y-3">
      {recentLeaves.map((leave) => {
        const name = leave.employee?.name ?? 'Unknown'
        return (
          <div key={leave.id} className="flex items-start gap-3">
            <Avatar name={name} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
              <p className="text-xs text-gray-500 truncate">
                Requested <span className="capitalize">{leave.type.replace('_', ' ')}</span> leave
                &nbsp;·&nbsp; {leave.days} day{leave.days !== 1 ? 's' : ''}
              </p>
              <p className="text-xs text-gray-400">{formatDate(leave.createdAt, 'MMM d, yyyy')}</p>
            </div>
            <Badge className={cn('text-xs capitalize', getStatusColor(leave.status))}>
              {leave.status}
            </Badge>
          </div>
        )
      })}
    </div>
  )
}

export function TodayAttendance() {
  const records = MOCK_ATTENDANCE.slice(0, 5)
  return (
    <div className="space-y-3">
      {records.map((rec) => {
        const name = rec.employee?.name ?? 'Unknown'
        return (
          <div key={rec.id} className="flex items-center gap-3">
            <Avatar name={name} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
              <p className="text-xs text-gray-500">
                {rec.checkIn ? `In: ${rec.checkIn}` : 'Not checked in'}
                {rec.checkOut ? ` · Out: ${rec.checkOut}` : ''}
              </p>
            </div>
            <Badge className={cn('text-xs capitalize', getStatusColor(rec.status))}>
              {rec.status.replace('_', ' ')}
            </Badge>
          </div>
        )
      })}
    </div>
  )
}
