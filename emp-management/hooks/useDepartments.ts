'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import { Department, DepartmentFormData } from '@/lib/types'
import toast from 'react-hot-toast'

export function useDepartments() {
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['departments'],
    queryFn: () => apiClient.get<Department[]>('/departments'),
    staleTime: 1000 * 60 * 5,
  })

  const create = useMutation({
    mutationFn: (data: DepartmentFormData) =>
      apiClient.post<Department>('/departments', data as Record<string, unknown>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] })
      toast.success('Department created successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to create department')
    },
  })

  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<DepartmentFormData> }) =>
      apiClient.put<Department>(`/departments/${id}`, data as Record<string, unknown>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] })
      toast.success('Department updated successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to update department')
    },
  })

  const remove = useMutation({
    mutationFn: (id: string) => apiClient.delete<{ message: string }>(`/departments/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] })
      toast.success('Department deleted')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to delete department')
    },
  })

  return {
    departments: result.data ?? [],
    loading: result.isLoading,
    error: result.error ? 'Failed to load departments' : null,
    refetch: result.refetch,
    createDepartment: create.mutateAsync,
    updateDepartment: (id: string, data: Partial<DepartmentFormData>) =>
      update.mutateAsync({ id, data }),
    deleteDepartment: remove.mutateAsync,
  }
}
