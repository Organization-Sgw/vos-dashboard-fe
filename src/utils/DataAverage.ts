import type { ASRItem } from '@/hooks/useASR'
import { fixToWIB, getBucketInterval } from './DataASR'

export interface AverageBucketPoint {
  time: string
  [gateway: string]: string | number
}

export function transformAverageBuckets(
  data: ASRItem[],
  startDate: string,
  endDate: string
): AverageBucketPoint[] {
  const { type } = getBucketInterval(startDate, endDate)

  const buckets: Record<string, Record<string, { total: number; count: number }>> = {}
  const gatewaySet = new Set<string>()

  data.forEach((item) => {
    const gw = item.calling_gateway?.trim() || ''

    if (!gw || gw === '' || gw.toUpperCase() === 'UNKNOWN') return

    gatewaySet.add(gw)

    const conv = item.conversation_time ?? 0
    const dt = new Date(fixToWIB(item.begin_time))
    let bucketKey = ''

    bucketKey = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(
      dt.getDate()
    ).padStart(2, '0')}T${String(dt.getHours()).padStart(2, '0')}:00:00+07:00`

    if (type === 'hour') {
      bucketKey = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(
        dt.getDate()
      ).padStart(2, '0')} ${String(dt.getHours()).padStart(2, '0')}:00`
    } else {
      bucketKey = dt.toISOString().substring(0, 10)
    }

    if (!buckets[bucketKey]) buckets[bucketKey] = {}
    if (!buckets[bucketKey][gw]) buckets[bucketKey][gw] = { total: 0, count: 0 }

    buckets[bucketKey][gw].total += conv
    buckets[bucketKey][gw].count += 1
  })

  const allGateways = Array.from(gatewaySet)
  return Object.entries(buckets)
    .sort(([timeA], [timeB]) => new Date(timeA).getTime() - new Date(timeB).getTime())
    .map(([time, gateways]) => {
      const row: AverageBucketPoint = { time }

      allGateways.forEach((gw) => {
        if (!gateways[gw]) {
          row[gw] = 0
        } else {
          const { total, count } = gateways[gw]
          row[gw] = Number((total / count).toFixed(3))
        }
      })

      return row
    })
}
