import { Stack } from '@chakra-ui/react'

import {
  HomeBanner,
  HomeProductCategory,
  HomeProductSpecial,
  HomePartners,
  HomeTestimonials,
  HomeFaq,
} from '@qopnet/qopnet-ui'
import { useSWR } from '../utils/swr'

export const HomeContainer = () => {
  const { data, error } = useSWR(`/api/suppliers/products/special`)
  const { supplierProducts } = data || {}

  return (
    <Stack spacing={20}>
      <HomeBanner />
      <HomeProductSpecial supplierProducts={supplierProducts} error={error} />
      <HomePartners />
      <HomeTestimonials />
    </Stack>
  )
}
