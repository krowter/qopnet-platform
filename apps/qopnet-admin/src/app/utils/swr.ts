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
export const apiProduction = 'https://qopnet-api.catamyst.com'
export const apiStaging = 'https://qopnet-api-staging.up.railway.app'
export const apiDevelopment =
  process.env.NX_API_URL || process.env.API_URL || 'http://localhost:4000'

export const apiUrl =
  process.env.NODE_ENV === 'production'
    ? apiProduction
    : process.env.NODE_ENV === 'staging'
    ? apiStaging
    : apiDevelopment

/**
 * Set webUrl if needed
 */
export const webUrl = window
  ? String(window.location.origin)
  : 'http://localhost:3000'

console.info({
  message: 'Qopnet Admin is ready',
  env: process.env.NX_NODE_ENV,
  apiUrl,
  webUrl,
})

/**
 * Dynamic fetcher which use apiUrl automatically
 */
export const fetcher = async (endpoint: string) => {
  // Get from localStorage, but still string
  const supabaseAuthToken =
    window.localStorage.getItem('supabase.auth.token') || '{}'
  // Parse string into object
  const parsedObject = JSON.parse(supabaseAuthToken) || {
    currentSession: { access_token: '' },
  }
  // Get only the accessToken
  const accessToken = parsedObject.currentSession.access_token

  return await utilFetcher(apiUrl, endpoint, accessToken)
}

/**
 * Wrap original useSWR so we don't need to import fetcher manually each time
 */
export const useSWR = (endpoint: string) => {
  return useSWROriginal(endpoint, fetcher)
}
