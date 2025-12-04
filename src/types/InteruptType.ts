export interface InteruptAnalysisResponse {
  callee_gateway: string
  ip: string
  termination_reasons: {
    name: Record<string, number>
  }
  total_calls: {
    total: number
  }
}

export interface InteruptAnalysisApiResponse {
  status: string
  message: string
  result: InteruptAnalysisResponse[]
}
