/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import useSWR, { mutate } from 'swr'

export const swrConfig = {
  // @ts-ignore
  onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
    // Never retry on 404 error.
    if (error.status === 404) return
    // Only retry several times.
    if (retryCount >= 3) return
    // Retry after 3 seconds.
    setTimeout(() => revalidate({ retryCount: retryCount + 1 }), 3000)
  },
}

export const fetcher = async (
  apiUrl: string,
  endpoint: string,
  accessToken: string
) => {
  // apiUrl need to be configured in the frontend app
  // Because process.env is not allowed here
  const fullUrl = apiUrl + endpoint
  const res = await fetch(fullUrl, {
    headers: new Headers({ Authorization: 'Bearer ' + accessToken || '' }),
  })

  // If the status code is not in the range 200-299
  if (!res.ok) {
    const error = new Error('Fetch error.')
    // @ts-ignore
    error.info = await res.json()
    // @ts-ignore
    error.status = res.status
    throw error
  }

  return res.json()
}

/**
 * Named exports
 */

export { useSWR, mutate }
