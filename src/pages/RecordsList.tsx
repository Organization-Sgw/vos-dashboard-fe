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
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold mb-4">Call Detail Records</h1>

      {/* TABLE */}
      <div className="overflow-x-auto border rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left text-sm font-semibold text-gray-800"
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
                <td colSpan={5} className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-2 text-sm text-gray-900">
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
