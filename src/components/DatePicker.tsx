import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { type DateRange } from 'react-day-picker'

import { formatInTimeZone } from 'date-fns-tz'
const TZ = 'Asia/Jakarta'

function formatUTC7(date: Date, fmt: string) {
  return formatInTimeZone(date, TZ, fmt)
}

interface PropsRangeDate {
  date: DateRange | undefined
  setDate: (value: DateRange | undefined) => void
}

const blockDeleteInTimeInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const blockedKeys = ['Backspace', 'Delete']

  if (blockedKeys.includes(e.key)) {
    e.preventDefault()
  }
}

export function DateRangePicker({ date, setDate }: PropsRangeDate) {
  // Handle perubahan waktu (from / to)
  const handleTimeChange = (type: 'from' | 'to', time: string) => {
    if (!date || !date[type]) return

    const [h, m, s] = time.split(':').map(Number)
    const updated = new Date(date[type]!)

    updated.setHours(h)
    updated.setMinutes(m)
    updated.setSeconds(s)

    setDate({ ...date, [type]: updated })
  }

  return (
    <div className="grid gap-2 mb-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              'w-[490px] justify-start text-left font-normal  cursor-pointer',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                `${formatUTC7(date.from, 'PPP HH:mm:ss')} - ${formatUTC7(date.to, 'PPP HH:mm:ss')}`
              ) : (
                formatUTC7(date.from, 'PPP HH:mm:ss')
              )
            ) : (
              <span>Select Range Date</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-3 space-y-4 " align="start">
          {/* Calendar */}
          <Calendar
            mode="range"
            numberOfMonths={2}
            selected={date}
            onSelect={setDate}
            initialFocus
          />

          {/* Time selector */}
          {date?.from && (
            <div className="flex gap-6">
              {/* Start time */}
              <div className="flex flex-col">
                <label className="text-sm font-medium">Start Time</label>
                <input
                  type="time"
                  step={1}
                  onKeyDown={blockDeleteInTimeInput}
                  className="border rounded-md px-2 py-1"
                  value={formatUTC7(date.from, 'HH:mm:ss')}
                  onChange={(e) => handleTimeChange('from', e.target.value)}
                />
              </div>

              {/* End time */}
              {date?.to && (
                <div className="flex flex-col">
                  <label className="text-sm font-medium">End Time</label>
                  <input
                    type="time"
                    step={1}
                    onKeyDown={blockDeleteInTimeInput}
                    className="border rounded-md px-2 py-1"
                    value={formatUTC7(date.to, 'HH:mm:ss')}
                    onChange={(e) => handleTimeChange('to', e.target.value)}
                  />
                </div>
              )}
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}
