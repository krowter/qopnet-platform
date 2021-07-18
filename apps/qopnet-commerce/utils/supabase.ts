/**
 * To handle different case of image URL format
 * 1. https://domain.com/path/to/image.jpg
 * 2. image.jpg
 *
 * Expected URL:
 * https://xbsxanmbihphdwfviqmh.supabase.co/storage/v1/object/public/images/image.jpg
 */
export const formatImageUrl = (text: string) => {
  if (text.includes('http')) {
    return text
  } else {
    const IMAGE_NAME = text
    const SUPABASE_ENV_ID =
      process.env.NEXT_PUBLIC_ENV === 'production'
        ? ''
        : process.env.NEXT_PUBLIC_ENV === 'staging'
        ? ''
        : 'rryitovbrajppywbpmit'

    const url = `https://${SUPABASE_ENV_ID}.supabase.co/storage/v1/object/public/images/${IMAGE_NAME}`
    console.log({ url })

    return url
  }
}
