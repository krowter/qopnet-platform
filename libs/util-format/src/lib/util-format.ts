import dayjs from 'dayjs'
import 'dayjs/locale/id'
dayjs.locale('id')

/**
 * Format from string or date
 * 31 January 2021, 12:34
 */
export const formatDateTime = (text: string | Date) => {
  return dayjs(text).format('DD MMMM YYYY, HH:mm')
}

/**
 * To handle different case of image URL format
 * 1. https://domain.com/path/to/image.jpg
 * 2. image.jpg
 *
 * Expected URL:
 * https://xbsxanmbihphdwfviqmh.supabase.co/storage/v1/object/public/images/image.jpg
 */
export const formatImageUrl = (env: string, text: string) => {
  if (text.includes('http')) {
    return text
  } else {
    const IMAGE_NAME = text
    const SUPABASE_DB_URL =
      env === 'production'
        ? 'https://xbsxanmbihphdwfviqmh.supabase.co'
        : env === 'staging'
        ? 'https://jarlxxhkxbdpqngysmes.supabase.co'
        : 'https://rryitovbrajppywbpmit.supabase.co'

    const url = `${SUPABASE_DB_URL}/storage/v1/object/public/images/${IMAGE_NAME}`
    console.log({ url })

    return url
  }
}
