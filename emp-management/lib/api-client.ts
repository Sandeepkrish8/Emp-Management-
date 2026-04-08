import axios, { AxiosInstance, AxiosError } from 'axios'
import { API_BASE_URL } from './constants'

function getToken(): string | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem('auth-store')
    if (!raw) return null
    const { state } = JSON.parse(raw)
    return state?.token ?? null
  } catch {
    return null
  }
}

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: { 'Content-Type': 'application/json' },
      timeout: 10000,
    })

    this.client.interceptors.request.use((config) => {
      const token = getToken()
      if (token) config.headers.Authorization = `Bearer ${token}`
      return config
    })

    this.client.interceptors.response.use(
      (res) => res,
      (error: AxiosError) => {
        if (error.response?.status === 401 && typeof window !== 'undefined') {
          localStorage.removeItem('auth-store')
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )
  }

  async get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    const { data } = await this.client.get<T>(url, { params })
    return data
  }

  async post<T>(url: string, body?: unknown): Promise<T> {
    const { data } = await this.client.post<T>(url, body)
    return data
  }

  async put<T>(url: string, body?: unknown): Promise<T> {
    const { data } = await this.client.put<T>(url, body)
    return data
  }

  async patch<T>(url: string, body?: unknown): Promise<T> {
    const { data } = await this.client.patch<T>(url, body)
    return data
  }

  async delete<T>(url: string): Promise<T> {
    const { data } = await this.client.delete<T>(url)
    return data
  }
}

export const apiClient = new ApiClient()
