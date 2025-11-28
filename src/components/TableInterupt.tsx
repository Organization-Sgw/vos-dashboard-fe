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
    <div className="rounded-xl border shadow-sm bg-white p-4 w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Gateway ID</TableHead>
            <TableHead>IP</TableHead>
            <TableHead>Termination Reason</TableHead>
            <TableHead>Total Call</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i}>
              <TableCell>{row.gatewayId}</TableCell>
              <TableCell>{row.ip}</TableCell>
              <TableCell>{row.terminationReason}</TableCell>
              <TableCell>{row.totalCall}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
