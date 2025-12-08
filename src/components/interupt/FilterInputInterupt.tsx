import { cdrFilterInteruptConfig } from '@/config/filterCdr'
import EndReasonSelect from '../EndReason'

export default function FilterSectionInterupt({ filter, setFilter }: any) {
  const gw = filter.gw ?? 'calling'

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
      {cdrFilterInteruptConfig.map((item) => {
        const isHoldTime = item.field === 'holdtime'
        const isEndReason = item.field === 'endreason'
        const isGWSelect = item.field === 'gw'

        return (
          <div key={item.field}>
            {/* Label */}
            <label className="block text-sm font-medium text-gray-700 dark:text-neutral-200 mb-1">
              {item.label}
            </label>

            {/* GW DROPDOWN */}
            {isGWSelect ? (
              <select
                value={gw}
                onChange={(e) => {
                  const val = e.target.value as 'calling' | 'callee'
                  setFilter({
                    ...filter,
                    gw: val,
                  })
                }}
                className="w-full px-3 py-2 rounded-md border bg-gray-50 dark:bg-neutral-800"
              >
                {item.options?.map((opt: string) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : isEndReason ? (
              // END REASON SELECT
              <EndReasonSelect
                value={filter[item.field] ?? ''}
                onChange={(val) =>
                  setFilter({
                    ...filter,
                    [item.field]: val || undefined,
                  })
                }
              />
            ) : (
              // NORMAL INPUT
              <input
                type={isHoldTime ? 'number' : 'text'}
                placeholder={item.placeholder}
                className="
                  w-full px-3 py-2 rounded-md border 
                  bg-gray-50 dark:bg-neutral-800 
                  border-gray-300 dark:border-neutral-700
                  text-neutral-900 dark:text-neutral-100
                  placeholder:text-gray-400 dark:placeholder:text-neutral-500
                  shadow-sm 
                  focus:border-blue-500 dark:focus:border-blue-400
                  focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900
                "
                value={filter[item.field] ?? ''}
                onChange={(e) => {
                  let value: any = e.target.value

                  if (isHoldTime) {
                    const cleaned = value.replace(/\D/g, '')
                    value = cleaned === '' ? null : Number(cleaned)
                  }

                  setFilter({
                    ...filter,
                    [item.field]: value,
                  })
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
