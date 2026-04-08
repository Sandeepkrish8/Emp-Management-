'use client'

import { useAuthStore } from '@/store/useStore'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/lib/constants'

export function useAuth() {
  const { user, token, isAuthenticated, setAuth, logout, updateUser } =
    useAuthStore()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push(ROUTES.LOGIN)
  }

  const requireAuth = (): boolean => {
    if (!isAuthenticated) {
      router.push(ROUTES.LOGIN)
      return false
    }
    return true
  }

  return {
    user,
    token,
    isAuthenticated,
    setAuth,
    logout: handleLogout,
    updateUser,
    requireAuth,
  }
}
