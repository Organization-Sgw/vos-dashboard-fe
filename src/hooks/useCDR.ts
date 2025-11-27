import { useQuery } from '@tanstack/react-query'
import type { ECdr, ECdrResponse } from '@/types/EcdrType'
import { axiosInstance } from '@/api/axios'
import { keepPreviousData } from '@tanstack/react-query'

interface UseCdrOptions {
  start: string
  end: string
  page: string
  limit: string
  filter?: CdrFilter
}

export interface CdrFilter {
  callere164?: string
  calleraccesse164?: string
  calleee164?: string
  calleeaccesse164?: string
  caller_ip?: string
  caller_gateway?: string
  caller_to_gw?: string
  callee_ip?: string
  callee_gateway?: string
  callee_to_gw?: string

  customer_account?: string
  customer_name?: string
}

export async function fetchCDR(
  start: string,
  end: string,
  page: string,
  limit: string,
  filter: CdrFilter = {}
) {
  const res = await axiosInstance.get('/cdr', {
    params: { start, end, page, limit, ...filter },
  })

  return res.data as ECdrResponse
}

export function useCdr({ start, end, page, limit, filter = {} }: UseCdrOptions) {
  const {
    data,
    isLoading: loading,
    error,
    isFetching,
    refetch,
  } = useQuery<ECdrResponse>({
    queryKey: ['cdr', start, end, page, limit, filter],
    queryFn: () => fetchCDR(start, end, page, limit),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 10,
  })

  return {
    data: data?.data ?? [],
    limit: data?.limit ?? 0,
    page: data?.page ?? 1,
    total: data?.total ?? 0,
    totalPages: data?.total_pages ?? 0,
    isFetching,
    loading,
    error: error ? (error as Error).message : null,
    refresh: refetch,
  }
}

export async function fetchGenerateCDR(
  start: string,
  end: string,
  page: string,
  limit: string,
  filter: CdrFilter = {}
) {
  const res = await axiosInstance.get('/cdr/export/dcr.csv', {
    params: { start, end, page, limit, ...filter },
    responseType: 'blob', // penting untuk download file
  })

  return res.data
}

export function useGenerateCSV({ start, end, page, limit, filter = {} }: UseCdrOptions) {
  return useQuery({
    queryKey: ['cdr-export', start, end, page, limit, filter],
    queryFn: () => fetchGenerateCDR(start, end, page, limit, filter),
    enabled: false, 
    staleTime: 0,
  })
}

// Detail Fetch
export async function fetchCDRDetail(id: number) {
  const res = await axiosInstance.get(`/cdr/${id}`)
  return res.data.data as ECdr
}

export function useCdrDetail(id: number) {
  const {
    data,
    isLoading: loading,
    error,
    refetch,
  } = useQuery<ECdr>({
    queryKey: ['cdr-detail', id],
    queryFn: () => fetchCDRDetail(id),
    staleTime: 1000 * 10,
  })

  return {
    data,
    loading,
    error: error ? (error as Error).message : null,
    refresh: refetch,
  }
}
