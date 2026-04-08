'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { DashboardLayout } from '@/components/layouts/DashboardLayout'
import { EmployeeForm } from '@/components/forms/EmployeeForm'
import { Button } from '@/components/ui/button'
import { useCreateEmployee } from '@/hooks/useEmployees'
import { useDepartments } from '@/hooks/useDepartments'
import { EmployeeFormData } from '@/lib/types'

export default function NewEmployeePage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const createMutation = useCreateEmployee()
  const { departments } = useDepartments()

  const deptOptions = departments.map((d) => ({ value: d.id, label: d.name }))

  const handleSubmit = async (data: EmployeeFormData) => {
    setLoading(true)
    try {
      await createMutation.mutateAsync(data)
      router.push('/employees')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl space-y-5">
        {/* Back */}
        <Button variant="ghost" size="sm" asChild className="gap-1.5 -ml-2">
          <Link href="/employees">
            <ArrowLeft className="h-4 w-4" /> Employees
          </Link>
        </Button>

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Employee</h1>
          <p className="text-sm text-gray-500 mt-0.5">Fill in the details below to add a new team member</p>
        </div>

        {/* Form card */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-6 sm:p-8">
          <EmployeeForm
            departments={deptOptions}
            onSubmit={handleSubmit}
            onCancel={() => router.push('/employees')}
            loading={loading}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}