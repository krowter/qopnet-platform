import { Stack, Box } from '@chakra-ui/react'

import { HomeBanner, HomeProductCategory } from '@qopnet/qopnet-ui'
import { useSWR } from '@qopnet/util-swr'
import { fetcher } from '../utils/fetcher'

export const Home = () => {
  const { data, error } = useSWR(`/api/suppliers/products`, fetcher)
  const supplierProducts = data?.supplierProducts || []

  return (
    <Stack>
      <HomeBanner id="slider-promo" />
      <HomeProductCategory
        id="product-category"
        supplierProducts={supplierProducts}
      />
      <Box id="product-special">Produk pilihan</Box>
      <Box id="faq">Pertanyaan yang sering ditanya</Box>
    </Stack>
  )
}
