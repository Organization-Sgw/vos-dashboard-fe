import { axiosInstance } from '@/api/axios'
import type { CdrFilterAsr } from '@/types/EcdrType'
import { TrimObject } from '@/utils/request'
import { useQuery } from '@tanstack/react-query'

export interface ChartRow {
  time: string
  [gateway: string]: number | string
}

export interface ChartResponse {
  data_asr: ChartRow[]
  data_total_calls: ChartRow[]
  data_avg_time: ChartRow[]
}

export function useChartData(startDate: string, endDate: string, filter: CdrFilterAsr = {}) {
  const cleanedFilters = TrimObject(filter)

  return useQuery<ChartResponse>({
    queryKey: ['cdr-chart', startDate, endDate, cleanedFilters],

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

      return res.data.result
    },

    refetchOnWindowFocus: false,
  })
}


export function extractGateways(rows: ChartRow[]): string[] {
  if (!rows || rows.length === 0) return []

  const gateways = Object.keys(rows[0]).filter((key) => key !== 'time')

  return gateways
}
