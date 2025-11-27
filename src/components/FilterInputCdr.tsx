import { cdrFilterConfig } from '@/config/filterCdr'

export default function FilterSection({ filter, setFilter }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
      {cdrFilterConfig.map((item) => (
        <div key={item.field}>
          <label className="block text-sm font-medium text-gray-700 mb-1">{item.label}</label>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder={item.placeholder}
              className="w-full px-3 py-2 rounded-md border bg-gray-50 shadow-sm 
              focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              value={filter[item.field] ?? ''}
              onChange={(e) =>
                setFilter({
                  ...filter,
                  [item.field]: e.target.value,
                })
              }
            />
          </div>
        </div>
      ))}
    </div>
  )
}
