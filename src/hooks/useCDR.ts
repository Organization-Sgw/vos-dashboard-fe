import { useQuery } from '@tanstack/react-query'
import type { ECdr, ECdrResponse } from '@/types/EcdrType'
import { axiosInstance } from '@/api/axios'
import { keepPreviousData } from '@tanstack/react-query'

interface UseCdrOptions {
  start: string
  end: string
  page: string
  limit: string
}

export async function fetchCDR(start: string, end: string, page: string, limit: string) {
  const res = await axiosInstance.get('/cdr', {
    params: { start, end, page, limit },
  })

  return res.data as ECdrResponse
}

export function useCdr({ start, end, page, limit }: UseCdrOptions) {
  const {
    data,
    isLoading: loading,
    error,
    isFetching,
    refetch,
  } = useQuery<ECdrResponse>({
    queryKey: ['cdr', start, end, page, limit], // <<< penting: fetch ulang saat param berubah
    queryFn: () => fetchCDR(start, end, page, limit),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 10,
  })

  return {
    data: data?.data ?? [], // list data cdr
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
