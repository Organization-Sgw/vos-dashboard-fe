import type { ASRItem } from "@/hooks/useASR"

export function getBucketInterval(startDate: string, endDate: string) {
  const start = new Date(startDate)
  const end = new Date(endDate)

  const diffMs = end.getTime() - start.getTime()
  const diffHours = diffMs / 1000 / 60 / 60
  const diffDays = diffHours / 24

  if (diffHours <= 24) return { type: 'hour', interval: 1 } // ≤ 24 jam → 1 jam
  if (diffDays <= 3) return { type: 'hour', interval: 4 } // ≤ 3 hari → 4 jam
  if (diffDays <= 5) return { type: 'hour', interval: 6 } // ≤ 5 hari → 6 jam
  return { type: 'day', interval: 1 } // > 5 hari → per hari
}

export function transformChartDataDynamic(data: ASRItem[], startDate: string, endDate: string) {
  const { type, interval } = getBucketInterval(startDate, endDate)

  const gateways = Array.from(new Set(data.map((d) => d.calling_gateway).filter(Boolean)))

  const buckets: Record<string, Record<string, number>> = {}

  const start = new Date(startDate)
  const end = new Date(endDate)

  let cursor = new Date(start)

  // CREATE BUCKET
  while (cursor <= end) {
    let key = ''

    if (type === 'hour') {
      const h = String(cursor.getHours()).padStart(2, '0')
      const d = cursor.toISOString().slice(0, 10)
      key = `${d} ${h}:00`
    } else {
      key = cursor.toISOString().slice(0, 10)
    }

    buckets[key] = {}
    gateways.forEach((gw) => (buckets[key][gw] = 0))

    // increment
    if (type === 'hour') {
      cursor.setHours(cursor.getHours() + interval)
    } else {
      cursor.setDate(cursor.getDate() + 1)
    }
  }

  // FILL DATA
  data.forEach((item) => {
    const t = new Date(item.begin_time)

    let bucketKey = ''

    if (type === 'hour') {
      const rounded = Math.floor(t.getHours() / interval) * interval
      const d = t.toISOString().slice(0, 10)
      bucketKey = `${d} ${String(rounded).padStart(2, '0')}:00`
    } else {
      bucketKey = t.toISOString().slice(0, 10)
    }

    if (buckets[bucketKey] && buckets[bucketKey][item.calling_gateway] != null) {
      buckets[bucketKey][item.calling_gateway]++
    }
  })

  return Object.entries(buckets).map(([time, values]) => ({
    time,
    ...values,
  }))
}
