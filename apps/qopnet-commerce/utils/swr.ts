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
 * Because there is still an issue on Vercel deployment
 */
export const apiProduction = 'https://api.qopnet.id'
export const apiStaging = 'https://api-staging.qopnet.id'
export const apiDevelopment =
  process.env.NEXT_PUBLIC_NX_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:4000'

export const apiUrl =
  process.env.NEXT_PUBLIC_ENV === 'production'
    ? apiProduction
    : process.env.NEXT_PUBLIC_ENV === 'staging'
    ? apiStaging
    : apiDevelopment // development

/**
 * Set webUrl if needed
 */
export let webUrl = ''
if (process.browser) {
  webUrl = window ? String(window.location.origin) : 'http://localhost:3000'
}

console.info({
  message: 'Qopnet Commerce is ready',
  env: process.env.NEXT_PUBLIC_ENV,
  apiUrl,
  webUrl,
})

// -----------------------------------------------------------------------------

/**
 * Dynamic fetcher which use apiUrl automatically
 * Use accessToken from headers if authenticated
 */
export const fetcher = async (endpoint: string) => {
  // Be careful when dealing with localStorage
  const supabaseAuthToken = window.localStorage.getItem('supabase.auth.token')

  // Only use headers auth when have accessToken
  if (supabaseAuthToken) {
    const parsedObject = JSON.parse(supabaseAuthToken)
    const accessToken = parsedObject.currentSession.access_token || ''
    return await utilFetcher(apiUrl, endpoint, accessToken)
  } else {
    return await utilFetcher(apiUrl, endpoint)
  }
}

/**
 * Wrap original useSWR so we don't need to import fetcher manually each time
 */
export const useSWR = (endpoint: string) => {
  return useSWROriginal(endpoint, fetcher)
}

// -----------------------------------------------------------------------------

/**
 * Static fetcher for Next.js API routes
 */
export const fetcherNext = async (endpoint: string) => {
  return await utilFetcher(webUrl, endpoint)
}

/**
 * To fetch from Next.js API routes
 */
export const useSWRNext = (endpoint: string) => {
  return useSWROriginal(endpoint, fetcherNext)
}
