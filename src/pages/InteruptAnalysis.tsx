import { DateRangePicker } from '@/components/DatePicker'
import { Spinner } from '@/components/Spinner'
import { GatewaySkeleton } from '@/components/interupt/GatewaySkeleton'
import { useInterupt } from '@/hooks/useInterupt'
import type { CdrFilterInterupt } from '@/types/EcdrType'
import { defaultDate, formatForGoUTC } from '@/utils/Date'
import { useEffect, useState } from 'react'
import type { DateRange } from 'react-day-picker'
import toast from 'react-hot-toast'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import { mapInteruptToTableRows } from '@/components/interupt/mapInteruptToTableRows'
import { NoDataFound } from '@/components/interupt/Notfound'
import GatewayTable from '@/components/interupt/TableInterupt'
import FilterSectionInterupt from '@/components/interupt/FilterInputInterupt'

export default function InteruptAnalysisPages() {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<DateRange | undefined>(defaultDate)
  const [appliedDate, setAppliedDate] = useState<DateRange | undefined>(defaultDate)
  const [filter, setFilter] = useState<CdrFilterInterupt>({})
  const [appliedFilter, setAppliedFilter] = useState<CdrFilterInterupt>({})
  

  const start = formatForGoUTC(appliedDate?.from)
  const end = formatForGoUTC(appliedDate?.to)

  const { data, isLoading, isFetching, isError, error } = useInterupt({
    start,
    end,
    filter: appliedFilter,
  })

  // Toast error empty data
  useEffect(() => {
    if (!isLoading && data?.result?.length === 0) {
      toast.error('Data not found')
    }
  }, [isLoading, data])

  // Toast query error
  useEffect(() => {
    if (isError) toast.error(error?.message ?? 'Unexpected error occurred')
  }, [isError])

  const handleReset = () => {
    setDate(defaultDate)
    setAppliedDate(defaultDate)
    setFilter({})
    setAppliedFilter({})
    toast.success('Reset Filter')
  }

  const handleApplyFilter = () => {
    setAppliedDate(date)
    setAppliedFilter(filter)
    toast.success('Filter applied')
  }

  const rows = mapInteruptToTableRows(data?.result ?? [])

  return (
    <div className="w-full min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Interupt Analysis</h1>

      {/* FILTER COLLAPSIBLE */}
      <Collapsible open={open} onOpenChange={setOpen}>
        <div className="mb-5 p-5 rounded-xl border shadow-sm   bg-white dark:bg-neutral-900 dark:border-neutral-800">
          <CollapsibleTrigger className="w-full flex items-center cursor-pointer justify-between">
            <h2 className="text-lg font-semibold mb-5">Filters Interupt Analysis</h2>

            <ChevronDown
              className={`h-5 w-5  cursor-pointer  transition-transform duration-300 ${
                open ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </CollapsibleTrigger>

          <CollapsibleContent>
            <FilterSectionInterupt filter={filter} setFilter={setFilter} />

            <div className="pb-4 border-b border-t pt-3">
              <h3 className="text-md font-semibold mb-3">Time Filters</h3>
              <DateRangePicker date={date} setDate={setDate} />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button onClick={handleReset} variant="secondary" className="cursor-pointer">
                Reset
              </Button>

              <Button
                onClick={handleApplyFilter}
                disabled={isFetching}
                className="flex items-center gap-2 cursor-pointer"
              >
                {isFetching ? (
                  <Spinner size={18} border={3} color="border-white" />
                ) : (
                  'Apply Filter'
                )}
              </Button>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* RESULT SECTION */}
      <div className="mt-4">
        {isLoading || isFetching ? (
          <GatewaySkeleton />
        ) : rows.length === 0 ? (
          <NoDataFound />
        ) : (
          <GatewayTable data={rows} />
        )}
      </div>
    </div>
  )
}
