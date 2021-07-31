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

// From 1234567 into Rp 1.234.567
export const formatRupiah = (price: number) => {
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  })
    .format(Number(price))
    .replace(/\D00$/, '')

  return formattedPrice
}

// From 1234567 into 1.234.567
export const formatMoney = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export const formatWeight = (weight: number, weightUnit: string) => {
  if (weightUnit) {
    switch (weightUnit) {
      case 'GR':
        return `${weight} gr`
      case 'KG':
        return `${weight} kg`
      case 'TON':
        return `${weight} ton`
      default:
        return `${weight} kg`
    }
  } else {
    return `${weight} kg`
  }
}

export const formatAddressComplete = ({
  street,
  streetDetails,
  city,
  state,
  zip,
  countryCode,
}) => {
  return `${street}, ${streetDetails}, ${city}, ${state} ${zip}, Indonesia`
}

export const calculateProductPriceDiscount = (order) => {
  // Total Items
  const totalItemArray = order?.businessOrderItems?.map(
    (item) => item.quantity || 0
  )
  const totalItems = order?.totalItems || totalItemArray.reduce((a, c) => a + c)

  // Total Price
  const totalPriceArray = order?.businessOrderItems?.map(
    (item) => item.supplierProduct?.price * item.quantity || 0
  )
  const totalPrice =
    order?.totalPrice || totalPriceArray.reduce((a, c) => a + c)

  // Total Discount
  const totalDiscountArray = order?.businessOrderItems?.map((item) => {
    if (item.supplierProduct?.discount) {
      const totalDiscountedPrice =
        item.quantity *
        item.supplierProduct?.price *
        (item.supplierProduct?.discount / 100)
      return totalDiscountedPrice
    } else return 0
  })
  const totalDiscount =
    order?.totalDiscount || totalDiscountArray.reduce((a, c) => a + c)

  // Total Calculated Price
  // Not including the Shipping Cost, before final payment
  const totalCalculatedPrice = totalPrice - totalDiscount || 0

  return {
    totalItems,
    totalPrice,
    totalDiscount,
    totalCalculatedPrice,
  }
}

export const calculateBillShipment = (order) => {
  const totalShipmentCost = 100

  return {
    totalShipmentCost,
  }
}
