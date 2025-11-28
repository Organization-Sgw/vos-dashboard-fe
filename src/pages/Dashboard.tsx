import FilterSection from '@/components/FilterInputCdr'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import type { CdrFilter } from '@/hooks/useCDR'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function DashboardPage() {
  const [filter, setFilter] = useState<CdrFilter>({})
  const [open, setOpen] = useState(false)

  return (
    <div className="w-full  min-h-screen">
      <Collapsible open={open} onOpenChange={setOpen}>
        <div className="mb-5 p-5 rounded-xl border shadow-sm bg-white">
          {/* Header */}
          <CollapsibleTrigger className="w-full flex items-center justify-between cursor-pointer select-none">
            <h2 className="text-lg font-semibold text-gray-700">Filters</h2>

            <ChevronDown
              className={`h-5 w-5 text-gray-600 curosr-pointer hover: transition-transform duration-300 ${
                open ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </CollapsibleTrigger>

          {/* SMOOTH CONTENT TANPA KEYFRAMES */}
          <CollapsibleContent
            className={`
              overflow-hidden transition-all duration-300
              ${open ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}
            `}
          >
            <div className="mt-4">
              <FilterSection filter={filter} setFilter={setFilter} />

              <div className="mt-6 flex justify-end gap-3 mb-5">
                <button
                  className="flex items-center cursor-pointer justify-center gap-2 px-4 py-2 rounded-lg font-medium text-white
                             bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                  Apply Filter
                </button>
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
      {/* Dashboard Charts */}
      <div className="flex flex-wrap gap-4 "></div>
    </div>
  )
}
