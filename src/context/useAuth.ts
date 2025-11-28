import { useMemo } from 'react'

export interface JwtUser {
  user_id: string
  username: string
  role: string
  exp: number
  email: string
  [key: string]: any
}

export interface UseAuthReturn {
  isAuthenticated: boolean
  token: string | null
  user: JwtUser | null
}

export function useAuth(): UseAuthReturn {
  const token = localStorage.getItem('token')

  const decodeJWT = (jwt: string): JwtUser | null => {
    if (!jwt) return null

    const parts = jwt.split('.')
    if (parts.length !== 3) return null

    try {
      const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/')
      const decoded = JSON.parse(atob(payload)) as JwtUser
      return decoded
    } catch (err) {
      console.error('Invalid JWT:', err)
      return null
    }
  }

  return useMemo(() => {
    if (!token) {
      return {
        isAuthenticated: false,
        token: null,
        user: null,
      }
    }

    const user = decodeJWT(token)

    const isExpired = user?.exp ? user.exp * 1000 < Date.now() : true

    return {
      isAuthenticated: !isExpired,
      token,
      user,
    }
  }, [token])
}
