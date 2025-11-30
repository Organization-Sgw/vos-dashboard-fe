import { DateRangePicker } from '@/components/DatePicker'
import FilterSection from '@/components/FilterInputCdr'
import { Spinner } from '@/components/Spinner'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { fetchCDR } from '@/hooks/useCDR'
import { useExportCSV } from '@/hooks/useCSV'
import { cdrColumns } from '@/table/cdr-column'
import type { CdrFilter, ECdrResponse } from '@/types/EcdrType'
import { defaultDate, formatForGoUTC } from '@/utils/Date'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { ChevronDown, Download } from 'lucide-react'
import { useState } from 'react'
import { type DateRange } from 'react-day-picker'
import toast from 'react-hot-toast'

export default function RecordListPage() {
  const [open, setOpen] = useState(false)

  // Filter State
  const [date, setDate] = useState<DateRange | undefined>(defaultDate)
  const [appliedDate, setAppliedDate] = useState<DateRange | undefined>(defaultDate)
  const [appliedFilter, setAppliedFilter] = useState<CdrFilter>({})
  const [filter, setFilter] = useState<CdrFilter>({})

  // Filter Date
  const start = formatForGoUTC(appliedDate?.from)
  const end = formatForGoUTC(appliedDate?.to)

  // Pagination
  const [page, setPage] = useState('1')
  const limit = '30'

  // Fetch Data ECDR
  const { data, isFetching, isLoading } = useQuery<ECdrResponse>({
    queryKey: ['cdr', start, end, page, limit, appliedFilter],
    queryFn: () => fetchCDR(start, end, page, limit, appliedFilter),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  })

  // Table
  const loadingTable = isLoading || isFetching
  const table = useReactTable({
    data: data?.result.data || [],
    columns: cdrColumns,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
  })

  const exportCsv = useExportCSV()
  const handleExport = async () => {
    const toastId = toast.loading('Preparing your CSV...')

    try {
      const blob = await exportCsv.mutateAsync({
        start,
        end,
        filter: appliedFilter,
      })

      if (!(blob instanceof Blob)) {
        throw new Error('Invalid CSV Blob returned')
      }

      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')

      a.href = url
      a.download = `cdr_export_${Date.now()}.csv`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      // cleanup
      setTimeout(() => URL.revokeObjectURL(url), 300)

      toast.success('CSV exported successfully!', { id: toastId })
    } catch (error) {
      console.error('Export failed:', error)
      toast.error('Failed to export CSV', { id: toastId })
    }
  }

  const handleReset = () => {
    try {
      setDate(defaultDate)
      setAppliedDate(defaultDate)
      setFilter({})
      setAppliedFilter({})
      setPage('1')

      toast.success('Reset Filter')
    } catch (error) {
      console.error('Reset filter failed:', error)
      toast.error('Failed to reset filter')
    }
  }

  const handleApplyFilter = async () => {
    try {
      setAppliedDate(date)
      setAppliedFilter(filter)
      setPage('1')
      toast.success('Filter applied')
    } catch (error) {
      toast.error('Failed to apply filter')
    }
  }

  return (
    <div className="w-full max-w-full p-4">
      <h1 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
        Call Detail Records
      </h1>

      {/* FILTER CARD */}
      <Collapsible open={open} onOpenChange={setOpen}>
        <div className="mb-5 p-5 rounded-xl border shadow-sm bg-white dark:bg-neutral-900 dark:border-neutral-800">
          <CollapsibleTrigger className="w-full flex items-center justify-between cursor-pointer select-none">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-neutral-200">
              Filters CDR
            </h2>

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
              ${open ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}
            `}
            >
              <FilterSection filter={filter} setFilter={setFilter} />

              {/* TIME FILTERS */}
              <div className="pb-4 border-b border-t border-gray-200 dark:border-neutral-700 pt-3">
                <h3 className="text-md font-semibold text-gray-700 dark:text-neutral-200 mb-3">
                  Time Filters
                </h3>
                <DateRangePicker date={date} setDate={setDate} />
              </div>

              {/* BUTTONS */}
              <div className="mt-6 flex justify-end gap-3">
                <Button
                  onClick={handleExport}
                  disabled={exportCsv.isPending}
                  className="gap-2 cursor-pointer"
                >
                  {exportCsv.isPending ? (
                    <>
                      <Spinner size={18} border={3} color="border-white" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Export CSV
                    </>
                  )}
                </Button>

                <Button
                  className="cursor-pointer px-4 py-2 rounded-lg"
                  onClick={handleReset}
                  variant="secondary"
                >
                  Reset
                </Button>

                <Button
                  onClick={handleApplyFilter}
                  disabled={isFetching}
                  className="flex items-center cursor-pointer justify-center gap-2 px-4 py-2 rounded-lg font-medium text-white
                bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                  {isFetching ? (
                    <Spinner size={18} border={3} color="border-white" />
                  ) : (
                    'Apply Filter'
                  )}
                </Button>
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* TABLE */}
      <div className="min-h-[500px] min-w-full overflow-auto rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
        <table className="min-w-max border-collapse">
          <thead className="sticky top-0 bg-gray-50 dark:bg-neutral-800 z-10 shadow-sm">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="border-b border-gray-200 dark:border-neutral-700">
                {hg.headers.map((header, i) => (
                  <th
                    key={header.id}
                    className={`
                    px-4 py-3 text-left text-[13px] font-semibold text-gray-700 dark:text-neutral-200 whitespace-nowrap
                    ${
                      i !== table.getHeaderGroups()[0].headers.length - 1
                        ? 'border-r border-gray-300 dark:border-neutral-700'
                        : ''
                    }
                  `}
                    style={{ width: header.getSize() }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="text-sm text-gray-800 dark:text-neutral-200">
            {/* === SKELETON LOADING === */}
            {loadingTable ? (
              [...Array(8)].map((_, i) => (
                <tr key={i} className="border-b border-gray-200 dark:border-neutral-700">
                  {table.getAllLeafColumns().map((_, j) => (
                    <td
                      key={j}
                      className={`
                      px-4 py-3
                      ${
                        j !== table.getAllLeafColumns().length - 1
                          ? 'border-r border-gray-200 dark:border-neutral-700'
                          : ''
                      }
                    `}
                    >
                      <div className="h-4 w-full bg-gray-200 dark:bg-neutral-700 animate-pulse rounded"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={table.getAllLeafColumns().length}
                  className="text-center py-10 text-gray-500 dark:text-neutral-400 font-medium"
                >
                  Data not found
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 transition"
                >
                  {row.getVisibleCells().map((cell, i) => (
                    <td
                      key={cell.id}
                      className={`
                      px-4 py-3 whitespace-nowrap overflow-hidden text-ellipsis
                      ${
                        i !== row.getVisibleCells().length - 1
                          ? 'border-r border-gray-200 dark:border-neutral-700'
                          : ''
                      }
                    `}
                      style={{ width: cell.column.getSize() }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="mt-6 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const current = Number(page)
              if (current > 1) setPage(String(current - 1))
            }}
            disabled={Number(page) <= 1}
            className="h-10 w-10 flex cursor-pointer items-center justify-center rounded-lg border bg-white dark:bg-neutral-800 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700 disabled:opacity-40 shadow-sm"
          >
            ◀
          </button>

          <div className="px-5 py-2 rounded-lg border bg-gray-50 dark:bg-neutral-800 border-gray-200 dark:border-neutral-700 text-gray-800 dark:text-neutral-200 font-medium shadow-sm">
            Page {page} of {data?.result.total_pages ?? 1}
          </div>

          <button
            onClick={() => {
              const current = Number(page)
              const total = data?.result.total_pages ?? current
              if (current < total) setPage(String(current + 1))
            }}
            disabled={Number(page) >= (data?.result.total_pages ?? 1)}
            className="h-10 w-10 cursor-pointer flex items-center justify-center rounded-lg border bg-white dark:bg-neutral-800 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700 disabled:opacity-40 shadow-sm"
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  )
}
