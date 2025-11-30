import type { DateRange } from "react-day-picker"

function toRFC3339UTC7(date: Date) {
  const timezoneOffsetMinutes = 7 * 60
  const localTime = new Date(date.getTime() + timezoneOffsetMinutes * 60 * 1000)
  return localTime.toISOString().replace('Z', '+07:00')
}

export function formatForGoUTC(date?: Date): string {
  if (!date) return ''
  return toRFC3339UTC7(date)
}

const now = new Date()
const oneHourBefore = new Date(now.getTime() - 60 * 60 * 1000)

export const defaultDate: DateRange = {
  from: oneHourBefore,
  to: now,
}
