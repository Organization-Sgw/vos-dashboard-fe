import { ASRChart } from '@/components/chart/ChartASR'
import { ChartEmpty, ChartError, ChartSkeleton } from '@/components/chart/ErrorComponent'
import { DateRangePicker } from '@/components/DatePicker'
import { Button } from '@/components/ui/button'
import { useChartData } from '@/hooks/useChart'
import type { CdrFilterChart } from '@/types/EcdrType'
import { defaultDateChart, formatForGoUTC } from '@/utils/Date'
import { useEffect, useState } from 'react'
import type { DateRange } from 'react-day-picker'

import toast from 'react-hot-toast'
import { AverageChart } from '@/components/chart/ChartAverage'
import { TotalCallsChart } from '@/components/chart/ChartTotal'
import { Spinner } from '@/components/Spinner'
import FilterSectionChart from '@/components/chart/FilterChart'

export default function DashboardPage() {
  const [date, setDate] = useState<DateRange | undefined>(defaultDateChart)
  const [appliedDate, setAppliedDate] = useState<DateRange | undefined>(defaultDateChart)
  const [filterChart, setFilterChart] = useState<CdrFilterChart>({ gw: 'calling' })
  const [appliedFilter, setAppliedFilter] = useState<CdrFilterChart>({ gw: 'calling' })

  const [_, setIsApplying] = useState(false)

  const startDate = formatForGoUTC(appliedDate?.from)
  const endDate = formatForGoUTC(appliedDate?.to)

  const { data, isLoading, error, isFetching } = useChartData(startDate, endDate, appliedFilter)

  const asr = data?.data_asr ?? []
  const total = data?.data_total_calls ?? []
  const avg = data?.data_avg_time ?? []

  const handleReset = () => {
    setDate(defaultDateChart)
    setAppliedDate(defaultDateChart)
    setFilterChart({ gw: 'calling' })
    setAppliedFilter({ gw: 'calling' })
    toast.success('Reset Filter')
  }

  const handleApplyFilter = async () => {
    const toastId = toast.loading('Applying filter...')
    setIsApplying(true)

    await new Promise((resolve) => setTimeout(resolve, 50))

    try {
      setAppliedDate(date)
      setAppliedFilter(filterChart)
      toast.success('Filter applied', { id: toastId })
    } catch (err) {
      toast.error('Failed to apply filter', { id: toastId })
    } finally {
      setIsApplying(false)
    }
  }

  useEffect(() => {
    let toastId: string | undefined

    if (isLoading) {
      toastId = toast.loading('Fetching chart data...')
    }

    if (!isLoading) {
      toast.dismiss(toastId)

      if (!error) {
        toast.success('Data loaded successfully')
      }
      if (error) {
        toast.error('failed to loaded data')
      }
    }

    return () => {
      toast.dismiss(toastId)
    }
  }, [isLoading])

  return (
    <div className="w-full min-h-screen p-4">
      {/* Page Title */}
      <h2 className="text-xl font-bold mb-6">ASR Dashboard</h2>

      {/* === FILTER SECTION === */}
      <section className="mb-6 rounded-xl border bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 p-5">
        <h3 className="text-lg font-semibold mb-4">Filters</h3>

        <FilterSectionChart filter={filterChart} setFilter={setFilterChart} />

        <div className="mt-4 border-t border-gray-200 dark:border-neutral-800 pt-4 overflow-x-scroll">
          <h4 className="text-md font-semibold mb-3">Time Range</h4>
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
              <>
                <Spinner size={18} border={3} color="border-white" />{' '}
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
