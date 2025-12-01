import { axiosInstance } from '@/api/axios'
import type { CdrFilter, UseGenerateCSVOptions } from '@/types/EcdrType'
import { TrimObject } from '@/utils/request'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'

export async function fetchCSV(start: string, end: string, filter: CdrFilter = {}) {
  const cleanedFilters = TrimObject(filter)

  const res = await axiosInstance.get('/cdr/csv', {
    params: { start, end, ...cleanedFilters },
    responseType: 'blob',
  })

  return res.data
}

export function useExportCSV() {
  return useMutation({
    mutationFn: ({ start, end, filter }: { start: string; end: string; filter?: CdrFilter }) =>
      fetchCSV(start, end, filter),
  })
}

export function useGenerateCDR({ start, end, filter = {} }: UseGenerateCSVOptions) {
  const { data, isLoading, error, isFetching, refetch } = useQuery({
    queryKey: ['cdr-generate', start, end, filter],
    queryFn: () => fetchCSV(start, end, filter),
    enabled: Boolean(start && end),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    staleTime: Infinity,
  })

  return {
    data: data ?? null,
    isFetching,
    loading: isLoading,
    error: error ? (error as Error).message : null,
    refresh: refetch,
  }
}
