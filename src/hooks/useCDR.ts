import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/api/axios'
import { keepPreviousData } from '@tanstack/react-query'

interface UseCdrOptions {
  start: string
  end: string
  page: string
  limit: string
  filter?: CdrFilter
}

const trimObject = (obj: Record<string, any>) => {
  const newObj: Record<string, any> = {}

  for (const key in obj) {
    const val = obj[key]

    if (typeof val === 'string') {
      newObj[key] = val.trim()
    } else {
      newObj[key] = val
    }
  }

  return newObj
}

export interface CdrFilter {
  account_id?: string
  account_name?: string

  callere?: string
  calleee?: string

  callerip?: string
  calleeip?: string

  calling_gateway?: string
  called_gateway?: string

  incoming_caller?: string
  incoming_callee?: string

  outbound_caller?: string
  outbound_callee?: string

  holdtime?: string
}

export async function fetchCDR(
  start: string,
  end: string,
  page: string,
  limit: string,
  filter: CdrFilter = {}
) {
  const cleanedFilters = trimObject(filter)

  const res = await axiosInstance.get('/cdr', {
    params: { start, end, page, limit, ...cleanedFilters },
  })

  return res.data
}

export function useCdr({ start, end, page, limit, filter = {} }: UseCdrOptions) {
  const { data, isLoading, error, isFetching, refetch } = useQuery({
    queryKey: ['cdr', start, end, page, limit, filter],
    queryFn: () => fetchCDR(start, end, page, limit, filter),
    placeholderData: keepPreviousData,
    staleTime: 10000,
  })

  return {
    data: data?.data ?? [],
    limit: data?.limit ?? 0,
    page: data?.page ?? 1,
    total: data?.total_data ?? 0,
    totalPages: data?.total_pages ?? 0,
    isFetching,
    loading: isLoading,
    error: error ? (error as Error).message : null,
    refresh: refetch,
  }
}
