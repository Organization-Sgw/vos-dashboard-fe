import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useState } from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

import { fetchCDR } from '@/hooks/useCDR'
import { cdrColumns } from '@/table/cdr-column'

export default function RecordListPage() {
  const [page, setPage] = useState(1)
  const [goto, setGoto] = useState('')

  const limit = 10
  const date = '2025-11-25'

  const { data = [], isPending } = useQuery({
    queryKey: ['cdr', date, page, limit],
    queryFn: () => fetchCDR(date, page, limit),
    placeholderData: keepPreviousData,
  })

  const table = useReactTable({
    data,
    columns: cdrColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  const handleGoto = () => {
    const n = Number(goto)
    if (!isNaN(n) && n > 0) {
      setPage(n)
      setGoto('')
    }
  }

  return (
    <div className="w-full max-w-full p-4 ">
      <h1 className="text-2xl font-bold mb-4">Call Detail Records</h1>

      <div className="mb-5 p-5 rounded-xl border shadow-sm bg-white">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Filters</h2>

        {/* GENERAL FILTERS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* account_id */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Account ID</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Account ID"
                className="w-full px-3 py-2 rounded-md border bg-gray-50 shadow-sm 
                     focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <input type="checkbox" className="h-5 w-5" />
            </div>
          </div>

          {/* account_name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Account Name"
                className="w-full px-3 py-2 rounded-md border bg-gray-50 shadow-sm 
                     focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <input type="checkbox" className="h-5 w-5" />
            </div>
          </div>

          {/* caller */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Caller</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Caller"
                className="w-full px-3 py-2 rounded-md border bg-gray-50 shadow-sm 
                     focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <input type="checkbox" className="h-5 w-5" />
            </div>
          </div>

          {/* calling_gateway */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Calling Gateway</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Calling Gateway"
                className="w-full px-3 py-2 rounded-md border bg-gray-50 shadow-sm 
                     focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <input type="checkbox" className="h-5 w-5" />
            </div>
          </div>

          {/* called_gateway */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Called Gateway</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Called Gateway"
                className="w-full px-3 py-2 rounded-md border bg-gray-50 shadow-sm 
                     focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <input type="checkbox" className="h-5 w-5" />
            </div>
          </div>

          {/* caller_ip */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Caller IP</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Caller IP"
                className="w-full px-3 py-2 rounded-md border bg-gray-50 shadow-sm 
                     focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <input type="checkbox" className="h-5 w-5" />
            </div>
          </div>

          {/* callee_ip */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Callee IP</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Callee IP"
                className="w-full px-3 py-2 rounded-md border bg-gray-50 shadow-sm 
                     focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <input type="checkbox" className="h-5 w-5" />
            </div>
          </div>

          {/* incoming_caller */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Incoming Caller</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Incoming Caller"
                className="w-full px-3 py-2 rounded-md border bg-gray-50 shadow-sm 
                     focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <input type="checkbox" className="h-5 w-5" />
            </div>
          </div>

          {/* incoming_callee */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Incoming Callee</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Incoming Callee"
                className="w-full px-3 py-2 rounded-md border bg-gray-50 shadow-sm 
                     focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <input type="checkbox" className="h-5 w-5" />
            </div>
          </div>

          {/* outbound_caller */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Outbound Caller</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Outbound Caller"
                className="w-full px-3 py-2 rounded-md border bg-gray-50 shadow-sm 
                     focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <input type="checkbox" className="h-5 w-5" />
            </div>
          </div>

          {/* outbound_callee */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Outbound Callee</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Outbound Callee"
                className="w-full px-3 py-2 rounded-md border bg-gray-50 shadow-sm 
                     focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <input type="checkbox" className="h-5 w-5" />
            </div>
          </div>

          {/* terminate_reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Terminate Reason</label>
            <select
              className="w-full px-3 py-2 rounded-md border bg-gray-50 shadow-sm 
                        focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">All</option>
              <option value="normal">Normal</option>
              <option value="busy">Busy</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        {/* TIME FILTERS & BUTTONS CONTAINER */}
        <div className="mt-6">
          <div className="pb-4 border-b border-gray-200 border-t pt-3 ">
            <h3 className="text-md font-semibold  text-gray-700 mb-3">Time Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* call_begin mode selector */}
              <div className="flex items-center gap-2">
                <input id="call_begin_mode" type="checkbox" className="h-5 w-5" />
                <label htmlFor="call_begin_mode" className="text-sm font-medium text-gray-700">
                  Call Begin Time
                </label>
              </div>

              {/* call_end mode selector */}
              <div className="flex items-center gap-2">
                <input id="call_end_mode" type="checkbox" className="h-5 w-5" />
                <label htmlFor="call_end_mode" className="text-sm font-medium text-gray-700">
                  Call End Time
                </label>
              </div>

              {/* EMPTY SPOT for alignment */}
              <div />

              {/* begin_time input */}
              <div>
                <label
                  htmlFor="begin_time_input"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Begin Time Range
                </label>
                <input
                  id="begin_time_input"
                  type="datetime-local"
                  step="1"
                  className="w-full px-3 py-2 rounded-md border bg-gray-50 shadow-sm
                    text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* end_time input */}
              <div>
                <label
                  htmlFor="end_time_input"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  End Time Range
                </label>
                <input
                  id="end_time_input"
                  type="datetime-local"
                  step="1"
                  className="w-full px-3 py-2 rounded-md border bg-gray-50 shadow-sm
                    text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div />
              <div />
              <div />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button className="px-4 py-2 rounded-lg cursor-pointer bg-gray-200 text-gray-800 font-medium hover:bg-gray-300">
              Reset
            </button>
            <button className="px-4 py-2 rounded-lg cursor-pointer bg-green-500 text-white font-medium hover:bg-green-600">
              Export CSV
            </button>
            <button className="px-4 py-2  cursor-pointer rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">
              Apply Filter
            </button>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="min-w-full overflow-x-auto rounded-lg border bg-white">
        <table className="table-fixed min-w-max">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left text-sm font-semibold text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis"
                    style={{ maxWidth: '160px' }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-gray-200">
            {isPending ? (
              <tr>
                <td colSpan={table.getAllColumns().length} className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-2 text-sm text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis"
                      style={{ maxWidth: '160px' }}
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

      <div className="mt-6 flex flex-col items-center gap-4">
        {/* Pagination Controls */}
        <div className="flex items-center gap-2">
          {/* Prev */}
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className=" cursor-pointer
        h-10 w-10 flex items-center justify-center 
        rounded-lg border bg-white
        hover:bg-gray-50 transition-colors
        disabled:opacity-40 disabled:hover:bg-white
        shadow-sm
      "
          >
            <svg
              className="h-5 w-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Page Badge */}
          <div className="px-5 py-2 rounded-lg border bg-gray-50 text-gray-800 font-medium shadow-sm">
            Page {page}
          </div>

          {/* Next */}
          <button
            onClick={() => setPage((p) => p + 1)}
            className="
        h-10 w-10 flex items-center justify-center 
        rounded-lg border bg-white
        hover:bg-gray-50 transition-colors 
        shadow-sm cursor-pointer
      "
          >
            <svg
              className="h-5 w-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Go To Page */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={goto}
            onChange={(e) => setGoto(e.target.value)}
            placeholder="Jump..."
            min={1}
            className="
    w-28 px-3 py-2
    rounded-md border border-gray-200
    bg-white
    shadow-sm
    focus:border-gray-400
    focus:ring-0
    text-sm
    transition-colors
  "
          />

          <button
            onClick={handleGoto}
            className=" cursor-pointer
        px-4 py-2 rounded-lg 
        bg-blue-600 text-white 
        font-medium 
        hover:bg-blue-700
        transition-colors 
        shadow-sm
      "
          >
            Go
          </button>
        </div>
      </div>
    </div>
  )
}
