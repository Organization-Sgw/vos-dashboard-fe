export interface ECdrResponse {
  status: string
  message: string
  result: {
    page: number
    limit: number
    total_data: number
    total_pages: number
    data: ECdr[]
  }
}

export interface ECdr {
  AccountID: string
  AccountName: string

  Caller: string
  Callee: string

  CallerIP: string
  CalleeIP: string

  CallingGateway: string
  CalledGateway: string

  IncomingCaller: string
  IncomingCallee: string

  OutboundCaller: string
  OutboundCallee: string

  ConversationTime: number

  EndReason: number
  EndReasonText: string

  BeginTime: string
  EndTime: string
}
