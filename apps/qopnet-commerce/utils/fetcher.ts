import { fetcher as utilFetcher } from '@qopnet/util-swr'

console.info({
  apiUrl: process.env.NEXT_PUBLIC_NX_API_URL,
})

export const fetcher = async (endpoint: string) => {
  return await utilFetcher(process.env.NEXT_PUBLIC_NX_API_URL, endpoint)
}
