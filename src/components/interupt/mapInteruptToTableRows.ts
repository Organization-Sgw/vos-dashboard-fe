import type { InteruptAnalysisResponse } from "@/types/InteruptType"

export function mapInteruptToTableRows(data: InteruptAnalysisResponse[]) {
  return data.map((item) => {
    const reasons = item.termination_reasons.name
    const total = Object.values(reasons).reduce((acc, v) => acc + v, 0)

    const reasonWithPercent = Object.entries(reasons)
      .map(([reason, count]) => {
        const percent = ((count / total) * 100).toFixed(1)
        return `${reason}: ${count} (${percent}%)`
      })
      .join(', ')

    return {
      gatewayId: item.caller_gateway || '-',
      ip: item.ip || '-',
      terminationReason: reasonWithPercent,
      totalCall: item.total_calls.total,
    }
  })
}
