export function GatewaySkeleton() {
  return (
    <div className="rounded-xl border shadow-sm bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 p-4 w-full animate-pulse">
      <div className="h-6 bg-gray-200 dark:bg-neutral-700 rounded mb-4 w-1/4" />

      {[...Array(5)].map((_, i) => (
        <div key={i} className="grid grid-cols-4 gap-4 mb-3">
          <div className="h-5 bg-gray-200 dark:bg-neutral-700 rounded" />
          <div className="h-5 bg-gray-200 dark:bg-neutral-700 rounded" />
          <div className="h-5 bg-gray-200 dark:bg-neutral-700 rounded" />
          <div className="h-5 bg-gray-200 dark:bg-neutral-700 rounded" />
        </div>
      ))}
    </div>
  )
}
