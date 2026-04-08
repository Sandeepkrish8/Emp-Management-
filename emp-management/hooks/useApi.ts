'use client'

import { useState, useCallback } from 'react'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

interface UseApiOptions {
  successMessage?: string
  errorMessage?: string
  onSuccess?: (data: unknown) => void
  onError?: (err: string) => void
}

export function useApi<T>(options: UseApiOptions = {}) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const execute = useCallback(
    async (apiFn: () => Promise<T>): Promise<T | null> => {
      setLoading(true)
      setError(null)
      try {
        const result = await apiFn()
        setData(result)
        if (options.successMessage) toast.success(options.successMessage)
        options.onSuccess?.(result)
        return result
      } catch (err) {
        const axiosErr = err as AxiosError<{ message: string }>
        const msg =
          axiosErr.response?.data?.message ||
          options.errorMessage ||
          'Something went wrong'
        setError(msg)
        toast.error(msg)
        options.onError?.(msg)
        return null
      } finally {
        setLoading(false)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return { data, loading, error, execute, setData }
}
