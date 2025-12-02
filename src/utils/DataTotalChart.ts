import type { ECdr } from '@/types/EcdrType'
import { fixToWIB, getBucketInterval } from './DataASR'

export interface MultiGatewayPoint {
  time: string
  [gateway: string]: string | number
}

export function transformTotalCalls(
  data: ECdr[],
  startDate: string,
  endDate: string
): MultiGatewayPoint[] {
  const { type } = getBucketInterval(startDate, endDate)

  const buckets: Record<string, Record<string, number>> = {}
  const gatewaySet = new Set<string>() 

  data?.forEach((cdr) => {
    const gateway = cdr.CallingGateway?.trim() || ''


    if (!gateway || gateway === '' || gateway.toUpperCase() === 'UNKNOWN') return

    gatewaySet.add(gateway) 

    const begin = new Date(fixToWIB(cdr.BeginTime))
    let bucketKey = ''

    if (type === 'hour') {
      bucketKey = `${begin.getFullYear()}-${String(begin.getMonth() + 1).padStart(2, '0')}-${String(
        begin.getDate()
      ).padStart(2, '0')} ${String(begin.getHours()).padStart(2, '0')}:00`
    } else {
      bucketKey = begin.toISOString().substring(0, 10)
    }

    if (!buckets[bucketKey]) buckets[bucketKey] = {}

    buckets[bucketKey][gateway] = (buckets[bucketKey][gateway] || 0) + 1
  })

  const allGateways = Array.from(gatewaySet)

  return Object.entries(buckets).map(([time, values]) => {
    const row: MultiGatewayPoint = { time }

    allGateways.forEach((gw) => {
      row[gw] = values[gw] ?? 0
    })

    return row
  })
}
