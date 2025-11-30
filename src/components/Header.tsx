import { useSidebar } from '@/components/ui/sidebar'
export function HeaderSidebar() {
  const { state } = useSidebar()

  return (
    <div className="flex items-center gap-3 px-3 py-2 overflow-hidden">
      {state !== 'collapsed' && (
        <div className="flex flex-col leading-tight">
          <span className="font-semibold text-base text-neutral-900 dark:text-neutral-100">
            Vos Dashboard
          </span>
          <span className="text-xs text-neutral-600 dark:text-neutral-400">
            Monitoring & Reports
          </span>
        </div>
      )}
    </div>
  )
}
