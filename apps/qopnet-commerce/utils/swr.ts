import {
  useSWR as useSWROriginal,
  fetcher as utilFetcher,
} from '@qopnet/util-swr'

// Check apiUrl in Qopnet Commerce
// On server side only
if (process.env.NODE_ENV === 'production' && typeof window === 'undefined') {
  console.info({
    apiUrl: process.env.NEXT_PUBLIC_NX_API_URL,
    env: process.env,
  })
}

export const useSWR = (endpoint: string) => {
  return useSWROriginal(endpoint, fetcher)
}

export const fetcher = async (endpoint: string) => {
  return await utilFetcher(
    process.env.NEXT_PUBLIC_NX_API_URL || process.env.NEXT_PUBLIC_API_URL,
    endpoint
  )
}
