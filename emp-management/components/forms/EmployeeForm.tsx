'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Employee, EmployeeFormData } from '@/lib/types'
import { EMPLOYEE_STATUS_OPTIONS } from '@/lib/constants'
import { generateEmployeeId } from '@/lib/utils'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  phoneNumber: z.string().min(7, 'Enter a valid phone number'),
  departmentId: z.string().min(1, 'Select a department'),
  position: z.string().min(1, 'Position is required'),
  salary: z.coerce.number().positive('Salary must be positive'),
  status: z.enum(['active', 'inactive', 'on-leave']),
  hireDate: z.string().min(1, 'Hire date is required'),
})

type FormData = z.infer<typeof schema>

interface EmployeeFormProps {
  employee?: Employee | null
  departments: { value: string; label: string }[]
  onSubmit: (data: EmployeeFormData) => Promise<void>
  onCancel: () => void
  loading?: boolean
}

export function EmployeeForm({
  employee,
  departments,
  onSubmit,
  onCancel,
  loading,
}: EmployeeFormProps) {
  const isEdit = !!employee

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name:         employee?.name         ?? '',
      email:        employee?.email        ?? '',
      phoneNumber:  employee?.phoneNumber  ?? '',
      departmentId: employee?.departmentId ?? '',
      position:     employee?.position     ?? '',
      salary:       employee?.salary       ?? 0,
      status:       (employee?.status as 'active' | 'inactive' | 'on-leave') ?? 'active',
      hireDate:     employee?.hireDate
        ? String(employee.hireDate).split('T')[0]
        : new Date().toISOString().split('T')[0],
    },
  })

  // Sync select fields (uncontrolled → controlled bridge)
  const status = watch('status')
  const departmentId = watch('departmentId')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Full Name"
          placeholder="John Smith"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label="Hire Date"
          type="date"
          error={errors.hireDate?.message}
          {...register('hireDate')}
        />
        <Input
          label="Email"
          type="email"
          placeholder="john@company.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Phone"
          type="tel"
          placeholder="+1 555-0100"
          error={errors.phoneNumber?.message}
          {...register('phoneNumber')}
        />
        <Select
          label="Department"
          options={departments}
          placeholder="Select department"
          value={departmentId}
          onChange={(e) => setValue('departmentId', e.target.value)}
          error={errors.departmentId?.message}
        />
        <Input
          label="Position"
          placeholder="Software Engineer"
          error={errors.position?.message}
          {...register('position')}
        />
        <Input
          label="Salary (USD)"
          type="number"
          placeholder="75000"
          error={errors.salary?.message}
          {...register('salary')}
        />
        <Select
          label="Status"
          options={EMPLOYEE_STATUS_OPTIONS as unknown as { value: string; label: string }[]}
          value={status}
          onChange={(e) =>
            setValue('status', e.target.value as 'active' | 'inactive' | 'on-leave')
          }
          error={errors.status?.message}
        />
      </div>

      <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          {isEdit ? 'Save Changes' : 'Create Employee'}
        </Button>
      </div>
    </form>
  )
}
