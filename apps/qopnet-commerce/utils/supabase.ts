/**
 * Hardcode Supabase env ID just for now
 */
const SUPABASE_ENV_ID =
  process.env.NEXT_PUBLIC_ENV === 'production'
    ? 'xbsxanmbihphdwfviqmh'
    : process.env.NEXT_PUBLIC_ENV === 'staging'
    ? 'jarlxxhkxbdpqngysmes'
    : 'rryitovbrajppywbpmit'

/**
 * To handle different case of image URL format
 * 1. https://domain.com/path/to/file-name.jpg
 * 2. file-name.jpg
 *
 * Expected URL:
 * https://xbsxanmbihphdwfviqmh.supabase.co/storage/v1/object/public/images/image.jpg
 */
export const formatImageUrl = (text: string) => {
  if (text.includes('http')) {
    return text
  } else {
    return `https://${SUPABASE_ENV_ID}.supabase.co/storage/v1/object/public/images/${text}`
  }
}

/**
 * Format after being uploaded
 * But without the bucket name
 * Because uploaded name contains the bucket name such as
 * images/file-name.jpg
 */

export const convertImageNameToURL = (name: string) => {
  return `https://${SUPABASE_ENV_ID}.supabase.co/storage/v1/object/public/${name}`
}
