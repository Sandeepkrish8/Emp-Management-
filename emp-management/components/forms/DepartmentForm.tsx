'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Department, DepartmentFormData } from '@/lib/types'

const schema = z.object({
  name: z.string().min(1, 'Department name is required'),
  description: z.string().optional(),
  managerId: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface DepartmentFormProps {
  department?: Department | null
  managers: { value: string; label: string }[]
  onSubmit: (data: DepartmentFormData) => Promise<void>
  onCancel: () => void
  loading?: boolean
}

export function DepartmentForm({
  department,
  managers,
  onSubmit,
  onCancel,
  loading,
}: DepartmentFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name:        department?.name        ?? '',
      description: department?.description ?? '',
      managerId:   department?.managerId   ?? '',
    },
  })

  const managerId = watch('managerId')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <Input
        label="Department Name"
        placeholder="e.g. Engineering"
        error={errors.name?.message}
        {...register('name')}
      />
      <Textarea
        label="Description"
        placeholder="Brief description of the department"
        {...register('description')}
      />
      <Select
        label="Manager"
        options={managers}
        placeholder="Select manager (optional)"
        value={managerId ?? ''}
        onChange={(e) => setValue('managerId', e.target.value)}
      />
      <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          {department ? 'Save Changes' : 'Create Department'}
        </Button>
      </div>
    </form>
  )
}
