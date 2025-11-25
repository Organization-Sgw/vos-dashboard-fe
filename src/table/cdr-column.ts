import type { ECdr } from '@/types/EcdrType'
import { createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper<ECdr>()

export const cdrColumns = [
  columnHelper.accessor('Flowno', {
    header: 'Flow No',
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('Callere164', {
    header: 'Caller',
  }),

  columnHelper.accessor('Calleee164', {
    header: 'Callee',
  }),

  columnHelper.accessor('Starttime', {
    header: 'Start Time',
    cell: ({ getValue }) => new Date(getValue()).toLocaleString(),
  }),

  columnHelper.accessor('Fee', {
    header: 'Fee',
  }),
]
