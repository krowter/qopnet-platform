import { Stack, Box } from '@chakra-ui/react'

import {
  HomeBanner,
  HomeProductCategory,
  HomeProductSpecial,
  HomeFaq,
} from '@qopnet/qopnet-ui'
import { useSWR } from '../utils/swr'

export const Home = () => {
  const { data, error } = useSWR(`/api/suppliers/products`)
  const supplierProducts = data?.supplierProducts || []

  return (
    <Stack>
      <HomeBanner id="slider-promo" />
      <HomeProductCategory
        id="product-category"
        supplierProducts={supplierProducts}
      />
      <HomeProductSpecial
        id="product-special"
        supplierProducts={supplierProducts}
      />
      <HomeFaq />
    </Stack>
  )
}
