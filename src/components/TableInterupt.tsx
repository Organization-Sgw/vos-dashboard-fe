import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'

interface RowData {
  gatewayId: string
  ip: string
  terminationReason: string
  totalCall: number
}

export default function GatewayTable({ data }: { data: RowData[] }) {
  return (
    <div
      className="
        rounded-xl border shadow-sm bg-white dark:bg-neutral-900 
        border-gray-200 dark:border-neutral-800 
        p-4 w-full
      "
    >
      <Table>
        <TableHeader className="bg-gray-50 dark:bg-neutral-800">
          <TableRow className="border-gray-200 dark:border-neutral-700">
            <TableHead className="text-gray-700 dark:text-neutral-200">Gateway ID</TableHead>
            <TableHead className="text-gray-700 dark:text-neutral-200">IP</TableHead>
            <TableHead className="text-gray-700 dark:text-neutral-200">
              Termination Reason
            </TableHead>
            <TableHead className="text-gray-700 dark:text-neutral-200">Total Call</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((row, i) => (
            <TableRow
              key={i}
              className="
                border-gray-200 dark:border-neutral-700 
                hover:bg-gray-50 dark:hover:bg-neutral-800 transition
              "
            >
              <TableCell className="text-gray-900 dark:text-neutral-100">{row.gatewayId}</TableCell>

              <TableCell className="text-gray-900 dark:text-neutral-100">{row.ip}</TableCell>

              <TableCell className="text-gray-900 dark:text-neutral-100">
                {row.terminationReason}
              </TableCell>

              <TableCell className="text-gray-900 dark:text-neutral-100">{row.totalCall}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
