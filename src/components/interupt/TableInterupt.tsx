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
        min-w-full overflow-auto rounded-xl 
        border border-gray-200 dark:border-neutral-800
        bg-white dark:bg-neutral-900 shadow-sm
      "
    >
      <table className="w-full min-w-max border-collapse">
        {/* === HEADER === */}
        <thead className="sticky top-0 z-10 shadow-sm bg-gray-50 dark:bg-neutral-800">
          <tr className="border-b border-gray-200 dark:border-neutral-700">
            {[
              { label: 'Gateway ID', width: 'w-[150px]' },
              { label: 'IP', width: 'w-[180px]' },
              { label: 'Termination Reason', width: 'w-[380px]' },
              { label: 'Total Call', width: 'w-[120px]' },
            ].map((col) => (
              <th
                key={col.label}
                className={`
                  px-4 py-3 text-left text-sm font-semibold 
                  text-gray-700 dark:text-neutral-200
                  border-r border-gray-300 dark:border-neutral-700
                  ${col.width}
                `}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* === BODY === */}
        <tbody className="text-sm text-gray-800 dark:text-neutral-200">
          {data.map((row, index) => (
            <tr
              key={index}
              className="
                border-b border-gray-200 dark:border-neutral-700 
                hover:bg-gray-50 dark:hover:bg-neutral-800 
                transition
              "
            >
              {/* Gateway ID */}
              <td className="px-4 py-3 whitespace-nowrap border-r border-gray-200 dark:border-neutral-700">
                {row.gatewayId}
              </td>

              {/* IP */}
              <td className="px-4 py-3 whitespace-nowrap border-r border-gray-200 dark:border-neutral-700">
                {row.ip}
              </td>

              {/* Termination Reason */}
              <td
                className="
    px-4 py-3 whitespace-pre-wrap wrap-break-word 
    border-r border-gray-200 dark:border-neutral-700
  "
              >
                {row.terminationReason.split(', ').map((text, rIdx) => (
                  <div key={rIdx} className="text-right">
                    {text}
                  </div>
                ))}
              </td>

              {/* Total Call */}
              <td className="px-4 py-3 font-semibold text-center whitespace-nowrap">
                {row.totalCall}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
