import { cdrFilterChartASRConfig } from '@/config/filterCdr'
import type { CdrFilterChart } from '@/types/EcdrType'

export default function FilterSectionChart({
  filter,
  setFilter,
}: {
  filter: CdrFilterChart
  setFilter: (val: CdrFilterChart) => void
}) {
  const gw = filter.gw ?? 'calling'

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
      {cdrFilterChartASRConfig.map((cfg) => {
        const value = filter[cfg.field as keyof CdrFilterChart] ?? ''

        if (cfg.field === 'calling_gateway' && gw !== 'calling') return null
        if (cfg.field === 'callee_gateway' && gw !== 'callee') return null

        if (cfg.type === 'select') {
          return (
            <div key={cfg.field}>
              <label className="block text-sm font-medium mb-1">{cfg.label}</label>
              <select
                value={gw}
                onChange={(e) => {
                  const val = e.target.value as 'calling' | 'callee'
                  setFilter({
                    ...filter,
                    gw: val,
                    calling_gateway: val === 'calling' ? filter.calling_gateway : undefined,
                    callee_gateway: val === 'callee' ? filter.callee_gateway : undefined,
                  })
                }}
                className="w-full px-3 py-2 rounded-md border bg-gray-50 dark:bg-neutral-800"
              >
                {cfg.options?.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          )
        }

        const isHoldTime = cfg.field === 'holdtime_start' || cfg.field === 'holdtime_end'

        if (isHoldTime) {
          return (
            <div key={cfg.field}>
              <label className="block text-sm font-medium mb-1">{cfg.label}</label>
              <input
                type="number"
                placeholder={cfg.placeholder}
                value={value}
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    [cfg.field]: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                className="w-full px-3 py-2 rounded-md border bg-gray-50 dark:bg-neutral-800"
              />
            </div>
          )
        }

        return (
          <div key={cfg.field}>
            <label className="block text-sm font-medium mb-1">{cfg.label}</label>
            <input
              type="text"
              placeholder={cfg.placeholder}
              value={value}
              onChange={(e) =>
                setFilter({
                  ...filter,
                  [cfg.field]: e.target.value,
                })
              }
              className="w-full px-3 py-2 rounded-md border bg-gray-50 dark:bg-neutral-800"
            />
          </div>
        )
      })}
    </div>
  )
}
