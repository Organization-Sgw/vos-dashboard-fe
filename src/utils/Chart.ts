import type { ASRItem } from '@/hooks/useASR'

export function getBucketInterval(startDate: string, endDate: string) {
  const start = new Date(startDate)
  const end = new Date(endDate)

  const diffMs = end.getTime() - start.getTime()
  const diffHours = diffMs / 1000 / 60 / 60
  const diffDays = diffHours / 24

  if (diffHours <= 24) return { type: 'hour', interval: 1 }
  if (diffDays <= 3) return { type: 'hour', interval: 4 }
  if (diffDays <= 5) return { type: 'hour', interval: 6 }
  return { type: 'day', interval: 1 }
}

function formatLocalDate(d: Date) {
  return d.toLocaleDateString('en-CA')
}

export function fixToWIB(dateStr: string) {
  if (!dateStr) return dateStr
  return dateStr.replace(/Z$/, '+07:00')
}

export function transformChartDataDynamic(data: ASRItem[], startDate: string, endDate: string) {
  const { type, interval } = getBucketInterval(startDate, endDate)

  const gateways = Array.from(new Set(data.map((d) => d.calling_gateway).filter(Boolean)))

  const buckets: Record<string, Record<string, number>> = {}

  const start = new Date(startDate)
  const end = new Date(endDate)

  let cursor = new Date(start)

  while (cursor <= end) {
    const d = formatLocalDate(cursor)
    let key = ''

    if (type === 'hour') {
      const h = String(cursor.getHours()).padStart(2, '0')
      key = `${d} ${h}:00`
    } else {
      key = d
    }

    buckets[key] = {}
    gateways.forEach((gw) => (buckets[key][gw] = 0))

    if (type === 'hour') cursor.setHours(cursor.getHours() + interval)
    else cursor.setDate(cursor.getDate() + 1)
  }

  // FILL DATA
  data.forEach((item) => {
    const t = new Date(fixToWIB(item.begin_time))
    const d = formatLocalDate(t)
    let bucketKey = ''

    if (type === 'hour') {
      const rounded = Math.floor(t.getHours() / interval) * interval
      bucketKey = `${d} ${String(rounded).padStart(2, '0')}:00`
    } else {
      bucketKey = d
    }

    if (buckets[bucketKey] && buckets[bucketKey][item.calling_gateway] != null) {
      buckets[bucketKey][item.calling_gateway]++
    }
  })

  const now = new Date()

  return Object.entries(buckets)
    .filter(([time]) => {
      let parsed: Date

      if (type === 'hour') {
        parsed = new Date(time.replace(' ', 'T') + ':00+07:00')
      } else {
        parsed = new Date(time + 'T00:00:00+07:00')
      }

      return parsed <= now
    })
    .map(([time, values]) => ({ time, ...values }))
}
