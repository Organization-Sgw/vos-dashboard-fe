import { DateRangePicker } from '@/components/DatePicker'
import FilterSection from '@/components/FilterInputCdr'
import { Spinner } from '@/components/Spinner'
import { fetchCDR, useGenerateCSV, type CdrFilter } from '@/hooks/useCDR'
import { cdrColumns } from '@/table/cdr-column'
import type { ECdrResponse } from '@/types/EcdrType'
import { formatForGoUTC } from '@/utils/Date'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useState } from 'react'
import type { DateRange } from 'react-day-picker'

function getDefaultDateRange(): DateRange {
  const now = new Date()

  const oneHourBefore = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours() - 1,
    now.getMinutes(),
    now.getSeconds()
  )

  return {
    from: oneHourBefore,
    to: now,
  }
}

export default function RecordListPage() {
  const defaultDate = getDefaultDateRange()

  // Date Range State
  const [date, setDate] = useState<DateRange | undefined>(defaultDate)
  const [appliedDate, setAppliedDate] = useState<DateRange | undefined>(defaultDate)
  const [appliedFilter, setAppliedFilter] = useState<CdrFilter>({})

  const [filter, setFilter] = useState<CdrFilter>({})

  // Filter
  const start = formatForGoUTC(appliedDate?.from)
  const end = formatForGoUTC(appliedDate?.to)

  // Pagination
  const [page, setPage] = useState('1')
  const limit = '30'

  const { data, isFetching, isLoading } = useQuery<ECdrResponse>({
    queryKey: ['cdr', start, end, page, limit, appliedFilter],
    queryFn: () => fetchCDR(start, end, page, limit, appliedFilter),
    // enabled: Boolean(start && end),
    placeholderData: keepPreviousData,
  })

  const loadingTable = isLoading || isFetching

  const table = useReactTable({
    data: data?.data ?? [],
    columns: cdrColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  // Generate CSV
  const csvQuery = useGenerateCSV({ start, end, page, limit, filter: appliedFilter })

  const handleDownload = async () => {
    const blob = await csvQuery.refetch()

    const url = window.URL.createObjectURL(blob.data)
    const a = document.createElement('a')
    a.href = url
    a.download = 'cdr_export.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="w-full max-w-full p-4">
      <h1 className="text-2xl font-bold mb-4">Call Detail Records</h1>

      {/* FILTER CARD */}
      <div className="mb-5 p-5 rounded-xl border shadow-sm bg-white">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Filters</h2>
        <FilterSection filter={filter} setFilter={setFilter} />

        {/* TIME FILTERS */}
        <div className="pb-4 border-b border-t border-gray-200 pt-3">
          <h3 className="text-md font-semibold text-gray-700 mb-3">Time Filters</h3>
          <DateRangePicker date={date} setDate={setDate} />
        </div>

        {/* BUTTONS */}
        <div className="mt-6 flex justify-end gap-3">
          {/* <button className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300">
            Reset
          </button> */}

          <button
            onClick={handleDownload}
            disabled={csvQuery.isFetching}
            className="px-4 py-2 rounded-lg cursor-pointer bg-green-600 text-white"
          >
            {csvQuery.isFetching ? 'Downloading...' : 'Export CSV'}
          </button>

          <button
            onClick={() => {
              setAppliedDate(date)
              setAppliedFilter(filter)
              setPage('1')
            }}
            disabled={isFetching}
            className="flex items-center cursor-pointer justify-center gap-2 px-4 py-2 rounded-lg font-medium text-white
             bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {isFetching ? <Spinner size={18} border={3} color="border-white" /> : 'Apply Filter'}
          </button>
        </div>
      </div>

      <div className="min-h-[500px] min-w-full overflow-x-auto rounded-lg border bg-white">
        <table className="table-fixed min-w-max">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left text-sm font-semibold text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis"
                    style={{ maxWidth: 160 }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-gray-200">
            {loadingTable ? (
              // SKELETON
              [...Array(10)].map((_, i) => (
                <tr key={i}>
                  {table.getAllColumns().map((_, idx) => (
                    <td key={idx} className="px-4 py-3">
                      <div className="h-4 animate-pulse rounded bg-gray-200"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : table.getRowModel().rows.length === 0 ? (
              // DATA KOSONG
              <tr>
                <td
                  colSpan={table.getAllColumns().length}
                  className="text-center py-6 text-gray-500 font-medium"
                >
                  Data tidak ada
                </td>
              </tr>
            ) : (
              // DATA ADA
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-2 text-sm text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis"
                      style={{ maxWidth: 200 }}
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
            className="h-10 w-10 flex cursor-pointer items-center justify-center rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-40 shadow-sm"
          >
            ◀
          </button>

          <div className="px-5 py-2 rounded-lg border bg-gray-50 text-gray-800 font-medium shadow-sm">
            Page {page} of {data?.total_pages ?? 1}
          </div>

          <button
            onClick={() => {
              const current = Number(page)
              const total = data?.total_pages ?? current
              if (current < total) setPage(String(current + 1))
            }}
            disabled={Number(page) >= (data?.total_pages ?? 1)}
            className="h-10 w-10 cursor-pointer flex items-center justify-center rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-40 shadow-sm"
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  )
}
