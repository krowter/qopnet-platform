import { Stack } from '@chakra-ui/react'

import {
  HomeBanner,
  HomeProductCategory,
  HomeProductSpecial,
  HomeFaq,
} from '@qopnet/qopnet-ui'
import { useSWR } from '../utils/swr'

export const Home = () => {
  const { data, error } = useSWR(`/api/suppliers/products`)
  const { supplierProducts } = data || {}

  return (
    <Stack>
      <HomeBanner id="slider-promo" />
      <HomeProductCategory id="product-category" />
      <HomeProductSpecial supplierProducts={supplierProducts} error={error} />
      <HomeFaq />
    </Stack>
  )
}
