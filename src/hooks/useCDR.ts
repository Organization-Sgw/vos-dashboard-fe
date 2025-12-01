import { axiosInstance } from '@/api/axios'
import type { CdrFilter } from '@/types/EcdrType'
import { TrimObject } from '@/utils/request'

// In your fetch function
export async function fetchCDR(
  start: string,
  end: string,
  page: string,
  limit: string,
  filter: CdrFilter = {}
) {
  try {
    const cleanedFilters = TrimObject(filter)

    const res = await axiosInstance.get('/cdr', {
      params: { start, end, page, limit, ...cleanedFilters },
    })

    return res.data
  } catch (error: any) {
    console.error('fetchCDR error:', error)
    throw error
  }
}
