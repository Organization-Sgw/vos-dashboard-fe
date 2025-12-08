import type { InteruptAnalysisResponse } from '@/types/InteruptType'

export function mapInteruptToTableRows(data: InteruptAnalysisResponse[]) {
  return data
    .filter((item) => item.gateway && item.gateway.trim() !== '') 
    .map((item) => {
      const reasons = item.termination_reasons.name
      const total = Object.values(reasons).reduce((acc, v) => acc + v, 0)

      const reasonWithPercent = Object.entries(reasons)
        .map(([reason, count]) => {
          const percent = total > 0 ? ((count / total) * 100).toFixed(3) : '0.000'
          return `${reason}: ${count} (${percent}%)`
        })
        .join(', ')

      return {
        gatewayId: item.gateway,
        ip: item.ip || '-',
        terminationReason: reasonWithPercent,
        totalCall: item.total_calls.total,
      }
    })
}
