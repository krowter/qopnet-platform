import { Stack, Box } from '@chakra-ui/react'

import { HomeBanner } from '@qopnet/qopnet-ui'

export const Home = () => {
  return (
    <Stack>
      <HomeBanner id="slider-promo" />
      <Box id="product-category">Kategori produk</Box>
      <Box id="product-special">Produk pilihan</Box>
      <Box id="faq">Pertanyaan yang sering ditanya</Box>
    </Stack>
  )
}
