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

export interface UseCdrOptions {
  start: string
  end: string
  page: string
  limit: string
  filter?: CdrFilter
}

export interface UseGenerateCSVOptions {
  start: string
  end: string

  filter?: CdrFilter
}

export interface UseInteruptOptions {
  start: string
  end: string

  filter?: CdrFilter
}

export interface CdrFilter {
  account_id?: string
  account_name?: string

  callere?: string
  calleee?: string

  callerip?: string
  calleeip?: string

  calling_gateway?: string
  called_gateway?: string

  incoming_caller?: string
  incoming_callee?: string

  outbound_caller?: string
  outbound_callee?: string

  holdtime?: string
}

export interface CdrFilterInterupt {
  account_id?: string
  account_name?: string

  callere?: string
  calleee?: string

  callerip?: string
  calleeip?: string

  calling_gateway?: string
  called_gateway?: string

  incoming_caller?: string
  incoming_callee?: string

  outbound_caller?: string
  outbound_callee?: string

  holdtime?: string
  endreason?: number
}

export interface CdrFilterAsr {
  calling_gateway?: string
}
