import { Stack } from '@chakra-ui/react'

import {
  HomeBanner,
  HomeProductCategory,
  HomeProductSpecial,
  HomeFaq,
} from '@qopnet/qopnet-ui'
import { useSWR } from '../utils/swr'
import { SuppliersContainer } from '../pages/suppliers'

export const HomeContainer = () => {
  const { data, error } = useSWR(`/api/suppliers/products/special`)
  const { supplierProducts } = data || {}

  return (
    <Stack>
      <HomeBanner />
      <HomeProductSpecial supplierProducts={supplierProducts} error={error} />
    </Stack>
  )
}
