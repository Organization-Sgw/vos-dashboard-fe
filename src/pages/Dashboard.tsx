import { ASRChart } from '@/components/chart/ChartASR'
import { ChartEmpty, ChartError, ChartSkeleton } from '@/components/chart/ErrorComponent'
import { DateRangePicker } from '@/components/DatePicker'
import { Button } from '@/components/ui/button'
import { useChartData } from '@/hooks/useChart'
import type { CdrFilterAsr } from '@/types/EcdrType'
import { defaultDateChart, formatForGoUTC } from '@/utils/Date'
import { useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { Loader2 } from 'lucide-react'

import toast from 'react-hot-toast'
import { AverageChart } from '@/components/chart/ChartAverage'
import { TotalCallsChart } from '@/components/chart/ChartTotal'

export default function DashboardPage() {
  const [date, setDate] = useState<DateRange | undefined>(defaultDateChart)
  const [appliedDate, setAppliedDate] = useState<DateRange | undefined>(defaultDateChart)
  const [filterAsr, setFilterAsr] = useState<CdrFilterAsr>({})
  const [appliedFilter, setAppliedFilter] = useState<CdrFilterAsr>({})
  const [isApplying, setIsApplying] = useState(false)

  const startDate = formatForGoUTC(appliedDate?.from)
  const endDate = formatForGoUTC(appliedDate?.to)

  const { data, isLoading, error } = useChartData(startDate, endDate, appliedFilter)

  const asr = data?.data_asr ?? []
  const total = data?.data_total_calls ?? []
  const avg = data?.data_avg_time ?? []

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
        {/* 
        <FilterSectionASR filter={filterAsr} setFilter={setFilterAsr} /> */}

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

      <section className="w-full">
        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col gap-5">
            <ChartSkeleton />
            <ChartSkeleton />
            <ChartSkeleton />
          </div>
        )}

        {/* Error */}
        {!isLoading && error && <ChartError message={error.message ?? 'Something went wrong'} />}

        {/* Empty */}
        {!isLoading && !error && asr.length === 0 && <ChartEmpty />}

        {/* Success */}
        {!isLoading && !error && asr.length > 0 && (
          <div className="flex flex-col gap-5">
            <ASRChart data={asr} />
            <AverageChart data={avg} />
            <TotalCallsChart data={total} />
          </div>
        )}
      </section>
    </div>
  )
}
