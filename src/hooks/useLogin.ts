import { axiosInstance } from '@/api/axios'
import { useMutation } from '@tanstack/react-query'

export interface LoginPayload {
  username: string
  password: string
}

export interface LoginResponse {
  status: string
  message: string
  token: string
}

async function loginRequest(payload: LoginPayload): Promise<LoginResponse> {
  try {
    const res = await axiosInstance.post('/login', payload)
    return res.data
  } catch (err: any) {
    // Extract pesan error dari backend
    const message = err?.response?.data?.message || err?.message || 'Login gagal'

    throw new Error(message)
  }
}

export function useLogin() {
  return useMutation({
    mutationFn: loginRequest,

    onSuccess: (data) => {
      localStorage.setItem('token', data.token)
    },

    onError: (error: any) => {
      console.error('Login gagal:', error)
    },
  })
}
