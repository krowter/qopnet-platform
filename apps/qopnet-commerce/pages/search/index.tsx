import { useRouter } from 'next/router'
import {
  Stack,
  Heading,
  Text,
  Flex,
  Spinner,
  SimpleGrid,
} from '@chakra-ui/react'

import { Layout, SupplierProductsGrid } from '@qopnet/qopnet-ui'
import { useSWR } from '../../utils/swr'

const SearchPage = () => {
  const router = useRouter()
  const { q: keyword } = router.query

  return (
    <Layout pt={10}>
      {!keyword && <SearchBegin />}
      {keyword && <SearchResults keyword={keyword} />}
    </Layout>
  )
}

export const SearchBegin = () => {
  return (
    <Stack spacing={5}>
      <Heading as="h1" size="xl">
        Cari produk dan toko supplier
      </Heading>
      <Heading as="h2" size="md">
        Masukkan kata kunci dalam kotak pencarian di atas
      </Heading>
    </Stack>
  )
}

export const SearchResults = ({ keyword }) => {
  const { data, error } = useSWR(`/api/suppliers/products/search?q=${keyword}`)
  const { count, supplierProducts } = data || {}

  return (
    <Stack pt={10} spacing={3}>
      <Heading as="h1" size="xl">
        Cari produk dan toko supplier
      </Heading>
      <Heading as="h2" size="md">
        Hasil pencarian untuk <b>"{keyword}"</b>
      </Heading>
      {error && <Text>Gagal mencari produk dan supplier</Text>}
      {!error && !supplierProducts && (
        <Flex>
          <Spinner mr={5} />
          <Text>Mencari produk dan supplier...</Text>
        </Flex>
      )}
      {!error && supplierProducts && (
        <Stack>
          <Text>{count} produk ditemukan</Text>
          <SupplierProductsGrid supplierProducts={supplierProducts} />
        </Stack>
      )}
    </Stack>
  )
}

export default SearchPage
