import dayjs from 'dayjs'
import 'dayjs/locale/id'
dayjs.locale('id')

/**
 * Format from string or date
 * 31 January 2021
 */
export const formatDate = (text: string | Date) => {
  return dayjs(text).format('D MMMM YYYY')
}

/**
 * Format from string or date
 * 31 January 2021, 12:34
 */
export const formatDateTime = (text: string | Date) => {
  return dayjs(text).format('D MMMM YYYY, HH:mm')
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
    // console.info({ url })

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

export const formatAddressComplete = (address) => {
  const {
    street = '',
    streetDetails = '',
    city = '',
    state = '',
    zip = '',
    countryCode = 'ID',
  } = address || {}

  const country = countryCode === 'ID' && 'Indonesia'
  return `${street}, ${
    streetDetails ?? ''
  }, ${city}, ${state} ${zip}, ${country}`
}

export const calculateCart = (businessOrder) => {
  // Only process if there is at least one business order item
  if (businessOrder?.businessOrderItems?.length > 0) {
    // Total Items
    const totalItemArray = businessOrder?.businessOrderItems?.map(
      (item) => item.quantity || 0
    )
    const totalItems =
      businessOrder?.totalItems || totalItemArray.reduce((a, c) => a + c)

    // Total Price
    const totalPriceArray = businessOrder?.businessOrderItems?.map(
      (item) => item.supplierProduct?.price * item.quantity || 0
    )
    const totalPrice =
      businessOrder?.totalPrice || totalPriceArray.reduce((a, c) => a + c)

    // Total Discount
    const totalDiscountArray = businessOrder?.businessOrderItems?.map(
      (item) => {
        if (item.supplierProduct?.discount) {
          const totalDiscountedPrice =
            item.quantity *
            item.supplierProduct?.price *
            (item.supplierProduct?.discount / 100)
          return totalDiscountedPrice
        } else return 0
      }
    )
    const totalDiscount =
      businessOrder?.totalDiscount || totalDiscountArray.reduce((a, c) => a + c)

    // Total Calculated Price
    // Not including the Shipping Cost, before final payment
    const totalCalculatedPrice = totalPrice - totalDiscount || 0

    const totalShipmentCost = totalPrice * 0.05 || 0
    const totalCalculatedBill = totalCalculatedPrice + totalShipmentCost

    return {
      totalItems,
      totalPrice,
      totalDiscount,
      totalCalculatedPrice,
      totalShipmentCost,
      totalCalculatedBill,
    }
  } else {
    return {
      totalItems: 0,
      totalPrice: 0,
      totalDiscount: 0,
      totalCalculatedPrice: 0,
      totalShipmentCost: 0,
      totalCalculatedBill: 0,
    }
  }
}

export const calculateSupplierProductItem = (item) => {
  const calculatedDiscount =
    item.supplierProduct?.price * (item.supplierProduct?.discount / 100)
  const calculatedPrice = item.supplierProduct?.price - calculatedDiscount
  const subTotalCalculatedPrice = item.quantity * calculatedPrice

  return {
    calculatedPrice,
    subTotalCalculatedPrice,
  }
}

export const formatBusinessOrderStatus = (status: string) => {
  switch (status) {
    case 'DRAFT':
      return 'Dalam Keranjang'
    case 'WAITING_FOR_PAYMENT':
      return 'Menunggu Pembayaran'
    case 'PAID':
      return 'Telah Dibayar'
    case 'WAITING_FOR_CONFIRMATION':
      return 'Menunggu Konfirmasi Toko'
    case 'PROCESSED':
      return 'Sedang Diproses'
    case 'WAITING_FOR_PICKUP':
      return 'Menunggu Diambil'
    case 'ONDELIVERY':
      return 'Sedang Dikirim'
    case 'DELIVERED':
      return 'Telah Sampai'
    case 'CONFIRMED':
      return 'Telah Dikonfirmasi'
    case 'COMPLAINED':
      return 'Terdapat Komplain'
    case 'CANCELED':
      return 'Dibatalkan'
    case 'REFUNDED':
      return 'Di-refund'
    default:
      return 'Tidak Jelas'
      break
  }
}
