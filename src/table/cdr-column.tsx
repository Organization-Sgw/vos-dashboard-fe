import { createColumnHelper } from '@tanstack/react-table'
import type { ECdr } from '@/types/EcdrType'

const columnHelper = createColumnHelper<ECdr>()

export const cdrColumns = [
  columnHelper.accessor('Caller', {
    header: 'Caller',
  }),
  columnHelper.accessor('Callee', {
    header: 'Callee',
  }),
  columnHelper.accessor('BeginTime', {
    header: 'Start Time',
  }),

  columnHelper.accessor('EndTime', {
    header: 'Stop Time',
  }),

  columnHelper.accessor('CallingGateway', {
    header: 'Calling Gateway',
  }),

  columnHelper.accessor('CalledGateway', {
    header: 'Called Gateway',
  }),
  columnHelper.accessor('EndReasonText', {
    header: 'Terminate Reason',
  }),

  columnHelper.accessor('ConversationTime', {
    header: 'Conversation Time (sec)',
  }),
  columnHelper.accessor('CallerIP', {
    header: 'Caller IP',
  }),

  columnHelper.accessor('CalleeIP', {
    header: 'Callee IP',
  }),

  columnHelper.accessor('IncomingCaller', {
    header: 'Incoming Caller',
  }),

  columnHelper.accessor('IncomingCallee', {
    header: 'Incoming Callee',
  }),

  columnHelper.accessor('OutboundCaller', {
    header: 'Outbound Caller',
  }),

  columnHelper.accessor('OutboundCallee', {
    header: 'Outbound Callee',
  }),
  columnHelper.accessor('AccountID', {
    header: 'Account ID',
  }),

  columnHelper.accessor('AccountName', {
    header: 'Account Name',
  }),
]
