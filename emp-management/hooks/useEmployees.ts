'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import { Employee, PaginatedResponse } from '@/lib/types'
import toast from 'react-hot-toast'

export function useEmployees(page = 1, pageSize = 10) {
  const result = useQuery({
    queryKey: ['employees', { page, pageSize }],
    queryFn: () =>
      apiClient.get<PaginatedResponse<Employee>>('/employees', {
        page: String(page),
        limit: String(pageSize),
      }),
    staleTime: 1000 * 60 * 5,
  })

  return {
    employees: result.data?.data ?? [],
    total: result.data?.total ?? 0,
    loading: result.isLoading,
    error: result.error ? 'Failed to load employees' : null,
    refetch: result.refetch,
  }
}

export function useAllEmployees() {
  const result = useQuery({
    queryKey: ['employees', 'all'],
    queryFn: () =>
      apiClient.get<PaginatedResponse<Employee>>('/employees', { limit: '1000' }),
    staleTime: 1000 * 60 * 5,
  })

  return {
    employees: result.data?.data ?? [],
    loading: result.isLoading,
  }
}

export function useEmployee(id: string) {
  return useQuery({
    queryKey: ['employee', id],
    queryFn: () => apiClient.get<Employee>(`/employees/${id}`),
    enabled: !!id,
  })
}

export function useCreateEmployee() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Employee>) =>
      apiClient.post<Employee>('/employees', data as Record<string, unknown>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      toast.success('Employee created successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to create employee')
    },
  })
}

export function useUpdateEmployee(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Employee>) =>
      apiClient.put<Employee>(`/employees/${id}`, data as Record<string, unknown>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      queryClient.invalidateQueries({ queryKey: ['employee', id] })
      toast.success('Employee updated successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to update employee')
    },
  })
}

export function useDeleteEmployee() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => apiClient.delete<{ message: string }>(`/employees/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      toast.success('Employee deleted')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to delete employee')
    },
  })
}
