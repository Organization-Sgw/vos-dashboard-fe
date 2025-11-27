import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLogin } from '@/hooks/useLogin'
import { useEffect, useState } from 'react'
import { Spinner } from '@/components/Spinner'

export default function LoginPages() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [localError, setLocalError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      window.location.href = '/'
    }
  }, [])

  const loginMutation = useLogin()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLocalError('')

    loginMutation.mutate(
      { username, password },
      {
        onSuccess: () => {
          window.location.href = '/'
        },
        onError: (err: any) => {
          const message = err?.response?.data?.message || err?.message || 'Login gagal, coba lagi.'

          setLocalError(message)
        },
      }
    )
  }

  const resetErrorOnChange = () => {
    if (localError) setLocalError('')
  }

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your username and password</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Username */}
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="your username"
                required
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                  resetErrorOnChange()
                }}
              />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  resetErrorOnChange()
                }}
              />
            </div>

            {/* BUTTON */}
            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <Spinner size={18} border={3} color="border-white" />
              ) : (
                'Login'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
