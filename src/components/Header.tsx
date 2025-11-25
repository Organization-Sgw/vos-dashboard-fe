import { useSidebar } from '@/components/ui/sidebar'

export function HeaderSidebar() {
  const { state } = useSidebar()

  return (
    <div className="flex items-center gap-3 px-3 py-2 overflow-hidden">
      {state !== 'collapsed' && (
        <div className="flex flex-col leading-tight">
          <span className="font-semibold text-base text-black">Vos Dashboard</span>
          <span className="text-xs text-black/70">Monitoring & Reports</span>
        </div>
      )}
    </div>
  )
}
