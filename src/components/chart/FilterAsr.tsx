import { cdrFilterChartASRConfig } from '@/config/filterCdr'

export default function FilterSectionASR({ filter, setFilter }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
      {cdrFilterChartASRConfig.map((item) => {
        const isHoldTime = item.field === 'holdtime'

        return (
          <div key={item.field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-neutral-200 mb-1">
              {item.label}
            </label>

            <div className="flex items-center gap-2">
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
                    let cleaned = e.target.value.replace(/\D/g, '')

                    value = cleaned === '' ? null : Number(cleaned)
                  }

                  setFilter({
                    ...filter,
                    [item.field]: value,
                  })
                }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
