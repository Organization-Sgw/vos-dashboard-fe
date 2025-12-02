import { axiosInstance } from '@/api/axios'
import type { CdrFilterAsr } from '@/types/EcdrType'
import { TrimObject } from '@/utils/request'
import { useQuery } from '@tanstack/react-query'

export interface ASRItem {
  calling_gateway: string
  end_reason: number
  conversation_time: number
  end_reason_text: string
  begin_time: string
  end_time: string
}

export interface ChartResponse {
  data_asr: ASRItem[]
}

export function useASRChart(startDate: string, endDate: string, filter: CdrFilterAsr = {}) {
  const cleanedFilters = TrimObject(filter)

  return useQuery<ASRItem[]>({
    queryKey: ['asr-chart', startDate, endDate, cleanedFilters],
    queryFn: async () => {
      const res = await axiosInstance.get<{
        status: string
        message: string
        result: ChartResponse
      }>('/cdr/chart', {
        params: {
          start: startDate,
          end: endDate,
          ...cleanedFilters,
        },
      })

      return res.data.result.data_asr
    },

    refetchOnWindowFocus: false,
  })
}
