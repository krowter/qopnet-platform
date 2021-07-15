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
const apiProduction = 'https://qopnet-api.catamyst.com'
const apiStaging = 'https://qopnet-api-staging.up.railway.app'
const apiDevelopment =
  process.env.NEXT_PUBLIC_NX_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NX_API_URL ||
  process.env.API_URL ||
  'http://localhost:4000'

const apiUrl =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'development'
    ? apiDevelopment
    : process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
    ? apiStaging
    : apiProduction

console.info({
  env: process.env,
  vercelEnv: process.env.NEXT_PUBLIC_VERCEL_ENV,
  apiUrl,
})

/**
 * Dynamic fetcher which use apiUrl automatically
 */
export const fetcher = async (endpoint: string) => {
  const supabaseAuthToken =
    window.localStorage.getItem('supabase.auth.token') || '{}'

  const parsedObject = JSON.parse(supabaseAuthToken) || {
    currentSession: { access_token: '' },
  }

  const accessToken = parsedObject.currentSession.access_token

  return await utilFetcher(apiUrl, endpoint, accessToken)
}

/**
 * Wrap original useSWR so we don't need to import fetcher manually each time
 */
export const useSWR = (endpoint: string) => {
  return useSWROriginal(endpoint, fetcher)
}
