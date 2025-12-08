import { axiosInstance } from '@/api/axios'
import type { CdrFilter, UseInteruptOptions } from '@/types/EcdrType'
import type { InteruptAnalysisApiResponse } from '@/types/InteruptType'
import { TrimObject } from '@/utils/request'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const cleanPayload = (obj: any) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== '' && v !== null && v !== undefined)
  )
}

export async function fetchInterupt(start: string, end: string, filter: CdrFilter = {}) {
  const cleanedFilters = TrimObject(filter)

  const payload = cleanPayload(cleanedFilters)

  const res = await axiosInstance.get('/cdr/interupt', {
    params: { start, end, ...payload },
    headers: {
      Accept: 'application/json',
    },
  })

  return res.data
}

export function useInterupt({ start, end, filter = {} }: UseInteruptOptions) {
  const query = useQuery<InteruptAnalysisApiResponse>({
    queryKey: ['cdr-interupt', start, end, filter],
    queryFn: () => fetchInterupt(start, end, filter),
    enabled: Boolean(start && end),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    staleTime: Infinity,
  })

  return query
}
