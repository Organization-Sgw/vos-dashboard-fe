import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const isDark = theme === 'dark'

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="
        h-9 w-9 rounded-full cursor-pointer
        bg-neutral-100 
        dark:bg-neutral-800 
        hover:bg-neutral-200 
        dark:hover:bg-neutral-700 
        border-neutral-300 
        dark:border-neutral-600 
        transition-colors mx-10
      "
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-yellow-400" />
      ) : (
        <Moon className="h-4 w-4 text-neutral-700" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
