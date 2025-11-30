import { useState } from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'
import { ChevronDown } from 'lucide-react'
import FilterSection from './FilterInputCdr'
import type { CdrFilter } from '@/types/EcdrType'

export default function FilterInput() {
  const [filter, setFilter] = useState<CdrFilter>({})
  const [open, setOpen] = useState(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="mb-5 p-5 rounded-xl border shadow-sm bg-white dark:bg-neutral-900 dark:border-neutral-800">
        {/* Header */}
        <CollapsibleTrigger className="w-full flex items-center justify-between cursor-pointer select-none">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-neutral-200">Filters</h2>
          <ChevronDown
            className={`h-5 w-5 text-gray-600 dark:text-neutral-300 cursor-pointer transition-transform duration-300 ${
              open ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </CollapsibleTrigger>

        <CollapsibleContent className="transition-all duration-300">
          <div
            className={`
              overflow-y-auto transition-all duration-300
              ${open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
            `}
          >
            <div className="mt-4">
              <FilterSection filter={filter} setFilter={setFilter} />

              <div className="mt-6 flex justify-end gap-3 mb-5">
                <button
                  className="flex items-center cursor-pointer justify-center gap-2 px-4 py-2 rounded-lg font-medium text-white
                             bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed
                             dark:bg-blue-600 dark:hover:bg-blue-700 dark:disabled:bg-blue-400"
                >
                  Apply Filter
                </button>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}
