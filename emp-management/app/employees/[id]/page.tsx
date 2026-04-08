'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Mail, Phone, Calendar, Briefcase, Building2, DollarSign, Edit } from 'lucide-react'
import { DashboardLayout } from '@/components/layouts/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useEmployee } from '@/hooks/useEmployees'
import { formatDate, formatCurrency, getStatusColor, cn } from '@/lib/utils'

interface InfoRowProps { icon: React.ReactNode; label: string; value: string }
function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-500 flex-shrink-0">
        {icon}
      </span>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-medium text-gray-900">{value}</p>
      </div>
    </div>
  )
}

export default function EmployeeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: emp, isLoading } = useEmployee(id)
  const router = useRouter()

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-24">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-600 border-t-transparent" />
        </div>
      </DashboardLayout>
    )
  }

  if (!emp) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-24">
          <p className="text-gray-500 mb-4">Employee not found</p>
          <Button variant="outline" onClick={() => router.push('/employees')}>
            Back to Employees
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-5 max-w-4xl">
        {/* Back + actions row */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild className="gap-1.5 -ml-2">
            <Link href="/employees">
              <ArrowLeft className="h-4 w-4" /> Employees
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5" asChild>
            <Link href="/employees">
              <Edit className="h-4 w-4" /> Edit Employee
            </Link>
          </Button>
        </div>

        {/* Banner profile card */}
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
          {/* Gradient banner */}
          <div className="h-28 bg-gradient-to-r from-primary-600 to-primary-800" />
          <div className="px-6 pb-6 relative">
            {/* Avatar overlaps banner */}
            <div className="-mt-10 mb-4 flex items-end justify-between">
              <div className="ring-4 ring-white rounded-full">
                <Avatar name={emp.name} size="lg" />
              </div>
              <Badge className={cn('capitalize', getStatusColor(emp.status))}>
                {emp.status.replace('_', ' ')}
              </Badge>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{emp.name}</h2>
            <p className="text-gray-500 mt-0.5">{emp.position}</p>
            <p className="text-sm text-gray-400">{emp.department?.name}</p>
          </div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Contact & Personal</CardTitle></CardHeader>
            <CardContent className="pt-2">
              <InfoRow icon={<Mail className="h-4 w-4" />}     label="Email"     value={emp.email} />
              <InfoRow icon={<Phone className="h-4 w-4" />}    label="Phone"     value={emp.phoneNumber} />
              <InfoRow icon={<Calendar className="h-4 w-4" />} label="Join Date" value={formatDate(String(emp.hireDate))} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Employment Details</CardTitle></CardHeader>
            <CardContent className="pt-2">
              <InfoRow icon={<Briefcase className="h-4 w-4" />}  label="Position"   value={emp.position} />
              <InfoRow icon={<Building2 className="h-4 w-4" />}  label="Department" value={emp.department?.name ?? '—'} />
              <InfoRow icon={<DollarSign className="h-4 w-4" />} label="Salary"     value={formatCurrency(emp.salary)} />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}