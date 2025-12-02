import { ASRChart } from '@/components/chart/ChartASR'
import { ChartEmpty, ChartError, ChartSkeleton } from '@/components/chart/ErrorComponent'
import FilterSectionASR from '@/components/chart/FilterAsr'
import { DateRangePicker } from '@/components/DatePicker'
import { Button } from '@/components/ui/button'
import { useASRChart } from '@/hooks/useASR'
import type { CdrFilterAsr } from '@/types/EcdrType'
import { defaultDateChart, formatForGoUTC } from '@/utils/Date'
import { useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { Loader2 } from 'lucide-react'

import toast from 'react-hot-toast'

export default function DashboardPage() {
  const [date, setDate] = useState<DateRange | undefined>(defaultDateChart)
  const [appliedDate, setAppliedDate] = useState<DateRange | undefined>(defaultDateChart)
  const [filterAsr, setFilterAsr] = useState<CdrFilterAsr>({})
  const [appliedFilter, setAppliedFilter] = useState<CdrFilterAsr>({})
  const [isApplying, setIsApplying] = useState(false)

  const startDate = formatForGoUTC(appliedDate?.from)
  const endDate = formatForGoUTC(appliedDate?.to)

  // Fetch Chart Data
  const { data, isLoading, error } = useASRChart(startDate, endDate, appliedFilter)

  const handleReset = () => {
    setDate(defaultDateChart)
    setAppliedDate(defaultDateChart)
    setFilterAsr({})
    setAppliedFilter({})
    toast.success('Reset Filter')
  }

  const handleApplyFilter = async () => {
    const toastId = toast.loading('Applying filter...')
    setIsApplying(true)

    try {
      setAppliedDate(date)
      setAppliedFilter(filterAsr)

      await new Promise((res) => setTimeout(res, 300))

      toast.success('Filter applied', { id: toastId })
    } catch (err) {
      toast.error('Failed to apply filter', { id: toastId })
    } finally {
      setIsApplying(false)
    }
  }

  return (
    <div className="w-full min-h-screen p-4">
      {/* Page Title */}
      <h2 className="text-xl font-bold mb-6">ASR Dashboard</h2>

      {/* === FILTER SECTION === */}
      <section className="mb-6 rounded-xl border bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 p-5">
        <h3 className="text-lg font-semibold mb-4">Filters</h3>

        <FilterSectionASR filter={filterAsr} setFilter={setFilterAsr} />

        <div className="mt-4 border-t border-gray-200 dark:border-neutral-800 pt-4">
          <h4 className="text-md font-semibold mb-3">Time Range</h4>
          <DateRangePicker date={date} setDate={setDate} />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button onClick={handleReset} variant="secondary" className="cursor-pointer">
            Reset
          </Button>
          <Button
            onClick={handleApplyFilter}
            disabled={isApplying}
            className="flex items-center gap-2 cursor-pointer"
          >
            {isApplying ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Applying...
              </>
            ) : (
              'Apply Filter'
            )}
          </Button>
        </div>
      </section>

      {/* === CHART SECTION === */}
      <section className="w-full">
        {isLoading && <ChartSkeleton />}

        {error && <ChartError message={error.message} />}

        {!isLoading && !error && (!data || data.length === 0) && <ChartEmpty />}

        {!isLoading && !error && data && data.length > 0 && (
          <ASRChart startDate={startDate} endDate={endDate} data={data} />
        )}
      </section>
    </div>
  )
}
