export interface RowData {
  gatewayId: string
  ip: string
  terminationReason: string
  totalCall: number
}

export default function GatewayTable({ data }: { data: RowData[] }) {
  return (
    <div
      className="
      min-h-[500px] min-w-full overflow-auto 
      rounded-xl border border-gray-200 dark:border-neutral-800
      bg-white dark:bg-neutral-900 shadow-sm
    "
    >
      <table className="min-w-max border-collapse w-full min-h-screen">
        {/* === HEADER === */}
        <thead className="sticky top-0 bg-gray-50 dark:bg-neutral-800 z-10 shadow-sm">
          <tr className="border-b border-gray-200 dark:border-neutral-700">
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-neutral-200 border-r border-gray-300 dark:border-neutral-700 w-[150px]">
              Gateway ID
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-neutral-200 border-r border-gray-300 dark:border-neutral-700 w-[180px]">
              IP
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-neutral-200 border-r border-gray-300 dark:border-neutral-700 w-[380px]">
              Termination Reason
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-neutral-200 w-[120px]">
              Total Call
            </th>
          </tr>
        </thead>

        {/* === BODY === */}
        <tbody className="text-sm text-gray-800 dark:text-neutral-200">
          {data.map((row, i) => (
            <tr
              key={i}
              className="border-b border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 transition"
            >
              {/* Gateway ID */}
              <td className="px-4 py-3 whitespace-nowrap border-r border-gray-200 dark:border-neutral-700">
                {row.gatewayId}
              </td>

              {/* IP */}
              <td className="px-4 py-3 whitespace-nowrap border-r border-gray-200 dark:border-neutral-700">
                {row.ip}
              </td>

              {/* Termination Reason (multi-line) */}
              <td className="px-4 py-3 whitespace-pre-wrap break-words border-r border-gray-200 dark:border-neutral-700 leading-relaxed">
                {row.terminationReason.split(', ').map((reason) => (
                  <div key={reason}>{reason}</div>
                ))}
              </td>

              {/* Total Call */}
              <td className="px-4 py-3 whitespace-nowrap font-semibold text-center">
                {row.totalCall}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
