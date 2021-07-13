/**
 * This swr utility is to configure @qopnet/util-swr
 * for specific Qopnet Commerce app because the lib cannot access process.env
 */
import {
  useSWR as useSWROriginal,
  fetcher as utilFetcher,
} from '@qopnet/util-swr'

/**
 * Set apiUrl based on variable availability
 * There is still an issue on Vercel deployment
 */

const apiUrl =
  process.env.NEXT_PUBLIC_NX_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'https://qopnet-api.catamyst.com'
console.info({ apiUrl })

/**
 * Dynamic fetcher which use apiUrl automatically
 */
export const fetcher = async (endpoint: string) => {
  return await utilFetcher(apiUrl, endpoint)
}

/**
 * Wrap original useSWR so we don't need to import fetcher manually each time
 */
export const useSWR = (endpoint: string) => {
  return useSWROriginal(endpoint, fetcher)
}
