import { Card, CardContent } from '@/components/ui/card'

export function ChartEmpty() {
  return (
    <Card className="p-6 border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
      <CardContent className="text-center">
        <p className="text-gray-500 dark:text-neutral-400">No chart data found</p>
      </CardContent>
    </Card>
  )
}
export function ChartError({ message }: { message: string }) {
  return (
    <Card className="p-6 border border-red-300 bg-red-50 dark:bg-red-900/20">
      <CardContent>
        <p className="text-red-700 dark:text-red-400 font-semibold">
          {message || 'Error loading chart'}
        </p>
      </CardContent>
    </Card>
  )
}
export function ChartSkeleton() {
  return (
    <div className="w-full h-[350px] rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 animate-pulse">
      {/* Title skeleton */}
      <div className="h-5 w-48 bg-gray-200 dark:bg-neutral-700 rounded mb-4" />

      <div className="relative w-full h-[260px]">
        {/* Grid horizontal lines */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute left-0 w-full border-t border-gray-200 dark:border-neutral-700"
            style={{ top: `${(i / 4) * 100}%` }}
          />
        ))}

        {/* Fake polyline path */}
        <svg
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <polyline
            points="0,30 10,25 20,28 30,20 40,22 50,15 60,18 70,10 80,12 90,8 100,10"
            fill="none"
            stroke="rgba(156,163,175,0.5)" /* gray-400 */
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  )
}
