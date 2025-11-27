export function formatForGoUTC(date?: Date) {
  if (!date) return ''

  const utc = new Date(date.getTime() - 7 * 60 * 60 * 1000)

  const yyyy = utc.getFullYear()
  const mm = String(utc.getMonth() + 1).padStart(2, '0')
  const dd = String(utc.getDate()).padStart(2, '0')
  const hh = String(utc.getHours()).padStart(2, '0')
  const mi = String(utc.getMinutes()).padStart(2, '0')
  const ss = String(utc.getSeconds()).padStart(2, '0')

  return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`
}

export function toUTC7String(timestamp: number): string {
  const date = new Date(timestamp)

  const utc7 = new Date(date.getTime() + 7 * 60 * 60 * 1000)

  const yyyy = utc7.getUTCFullYear()
  const mm = String(utc7.getUTCMonth() + 1).padStart(2, '0')
  const dd = String(utc7.getUTCDate()).padStart(2, '0')
  const hh = String(utc7.getUTCHours()).padStart(2, '0')
  const mi = String(utc7.getUTCMinutes()).padStart(2, '0')
  const ss = String(utc7.getUTCSeconds()).padStart(2, '0')

  return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`
}
