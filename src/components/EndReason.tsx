import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { END_REASON_OPTIONS } from '@/constants/endreason'

interface EndReasonSelectProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function EndReasonSelect({
  value,
  onChange,
  placeholder = 'Select End Reason',
  className,
}: EndReasonSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={className ?? 'w-full'}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {END_REASON_OPTIONS.filter((o) => o.value !== '').map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
