import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { ECdr } from '@/types/EcdrType'
import { axiosInstance } from '@/api/axios'
import { keepPreviousData } from '@tanstack/react-query'

interface UseCdrOptions {
  date: string
  limit?: number
}

// Fetch All CDR
export async function fetchCDR(date: string, page: number, limit: number) {
  const res = await axiosInstance.get('/cdr', {
    params: { date, page, limit },
  })

  return res.data.data as ECdr[]
}

export function useCdr({ date, limit = 10 }: UseCdrOptions) {
  const [page, setPage] = useState(1)

  const {
    data = [],
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['cdr', date, page, limit],
    queryFn: () => fetchCDR(date, page, limit),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 10,
  })

  return {
    data,
    loading,
    error: error ? (error as Error).message : null,
    page,
    limit,
    nextPage: () => setPage((p) => p + 1),
    prevPage: () => setPage((p) => Math.max(1, p - 1)),
    setPage,
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
