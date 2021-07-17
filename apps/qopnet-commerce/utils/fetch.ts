import { apiUrl } from './swr'

/**
 * This whole config thing replace supabase.from('table') function
 * Because Supabase automatically use the token as header
 */
export const postToAPI = async (endpoint, body) => {
  try {
    const supabaseAuthToken = window.localStorage.getItem('supabase.auth.token')
    const parsedObject = JSON.parse(supabaseAuthToken)
    const accessToken = parsedObject.currentSession.access_token || ''

    const fetchConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
      method: 'POST',
      body: JSON.stringify(body),
    }

    const response = await fetch(apiUrl + endpoint, fetchConfig)
    return await response.json()
  } catch (error) {
    console.error('postToApi failed because not authorized')
  }
}
