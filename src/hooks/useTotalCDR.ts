import { axiosInstance } from '@/api/axios'
import type { CdrFilterAsr, ECdr } from '@/types/EcdrType'
import { TrimObject } from '@/utils/request'
import { useQuery } from '@tanstack/react-query'

export interface ECdrTotalResponse {
  status: string
  message: string
  result: {
    data: ECdr[]
  }
}

export function useTotalChart(startDate: string, endDate: string, filter: CdrFilterAsr = {}) {
  const cleanedFilters = TrimObject(filter)

  return useQuery<ECdr[]>({
    queryKey: ['total-chart', startDate, endDate, cleanedFilters],

    queryFn: async () => {
      const res = await axiosInstance.get<{
        status: string
        message: string
        result: ECdr[]
      }>('/cdr/chart/total-calls', {
        params: {
          start: startDate,
          end: endDate,
          ...cleanedFilters,
        },
      })

      return res.data.result 
    },

    refetchOnWindowFocus: false,
  })
}
