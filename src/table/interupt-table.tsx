// columns.ts
import { createColumnHelper, type RowData } from '@tanstack/react-table'

const columnHelper = createColumnHelper<RowData>()

export const gatewayColumns = [
  columnHelper.accessor('gatewayId', {
    header: 'Gateway ID',
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('ip', {
    header: 'IP',
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('terminationReason', {
    header: 'Termination Reason',
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('totalCall', {
    header: 'Total Call',
    cell: (info) => info.getValue(),
  }),
]
