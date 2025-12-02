import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ThemeToggle } from '@/components/theme-toggle'
import { Spinner } from '@/components/Spinner'

import { useLogin } from '@/hooks/useLogin'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [localError, setLocalError] = useState('')

  const loginMutation = useLogin()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) window.location.href = '/'
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLocalError('')

    loginMutation.mutate(
      { username, password },
      {
        onSuccess: () => {
          toast.success('Login Successful 🎉')
          window.location.href = '/'
        },
        onError: (err: any) => {
          const msg =
            err?.response?.data?.message ||
            err?.message ||
            'Login gagal, periksa username/password.'

          setLocalError(msg)
          toast.error(msg)
        },
      }
    )
  }

  const resetErrorOnChange = () => {
    if (localError) setLocalError('')
  }

  return (
    <div
      className="
        min-h-screen w-full flex items-center justify-center px-4
        bg-linear-to-br from-neutral-50 via-neutral-100 to-neutral-200
        dark:bg-linear-to-br dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800
      "
    >
      {/* Dark Mode Toggle */}
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      {/* LOGIN CARD */}
      <Card
        className="
          w-full max-w-md rounded-2xl
          bg-white/90 dark:bg-neutral-900/85
          backdrop-blur-sm
          border border-neutral-300 dark:border-neutral-700
          shadow-[0_8px_28px_rgba(0,0,0,0.15)]
          dark:shadow-[0_8px_28px_rgba(0,0,0,0.35)]
          hover:shadow-[0_12px_32px_rgba(0,0,0,0.20)]
          dark:hover:shadow-[0_12px_32px_rgba(0,0,0,0.45)]
          transition-all duration-300 ease-out
          hover:-translate-y-0.5
        "
      >
        <CardHeader className="text-center space-y-2 pb-6">
          <CardTitle className="text-3xl font-bold tracking-tight">Welcome back</CardTitle>
          <CardDescription className="text-base">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* USERNAME */}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                className="h-11"
                required
                onChange={(e) => {
                  setUsername(e.target.value)
                  resetErrorOnChange()
                }}
              />
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                className="h-11"
                required
                onChange={(e) => {
                  setPassword(e.target.value)
                  resetErrorOnChange()
                }}
              />
            </div>

            {/* SUBMIT BUTTON */}
            <Button
              type="submit"
              className="w-full h-12 font-semibold text-base mt-6 cursor-pointer"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <Spinner size={20} border={3} color="border-white" />
              ) : (
                'Sign in'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
