import { Link } from 'react-router-dom'
import { createColumnHelper } from '@tanstack/react-table'
import type { ECdr } from '@/types/EcdrType'
import { toUTC7String } from '@/utils/Date'

const columnHelper = createColumnHelper<ECdr>()

export const cdrColumns = [
  columnHelper.accessor('ID', {
    header: 'ID',
    cell: (info) => {
      const id = info.getValue()
      return (
        <Link to={`/records/${id}`} className="text-blue-600 hover:underline font-medium">
          {id}
        </Link>
      )
    },
  }),
  columnHelper.accessor('Starttime', {
    header: 'Start Time',
    cell: ({ row }) => toUTC7String(row.original.Starttime),
  }),

  columnHelper.accessor('Stoptime', {
    header: 'Stop Time',
    cell: ({ row }) => toUTC7String(row.original.Stoptime),
  }),

  columnHelper.accessor('Customeraccount', {
    header: 'Account ID',
  }),

  columnHelper.accessor('Customername', {
    header: 'Account Name',
  }),

  columnHelper.accessor('Callere164', {
    header: 'Caller',
  }),

  columnHelper.accessor('Callergatewayh323id', {
    header: 'Calling Gateway ',
  }),

  columnHelper.accessor('Calleee164', {
    header: 'Callee',
  }),
  columnHelper.accessor('Calleegatewayh323id', {
    header: 'Called Gateway',
  }),

  columnHelper.accessor('CallerIP', {
    header: 'Caller IP',
  }),
  columnHelper.accessor('CalleeIP', {
    header: 'Callee IP',
  }),

  columnHelper.accessor('Calleraccesse164', {
    header: 'Incoming Caller',
  }),
  columnHelper.accessor('Calleeaccesse164', {
    header: 'Incoming Callee',
  }),

  columnHelper.accessor('Callertogatewaye164', {
    header: 'Outbound Caller',
  }),
  columnHelper.accessor('Calleetogatewaye164', {
    header: 'Outbound Callee',
  }),
  columnHelper.accessor('Endreason', {
    header: 'Terminate Reason',
  }),

  // columnHelper.accessor('Starttime', {
  //   header: 'Start Time',
  //   cell: ({ getValue }) => {
  //     const ts = getValue()
  //     if (!ts) return '-'
  //     return new Date(ts).toLocaleString('en-US', { hour12: false })
  //   },
  // }),
]
