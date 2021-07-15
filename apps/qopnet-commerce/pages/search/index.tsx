import { useRouter } from 'next/router'
import { Stack, Heading } from '@chakra-ui/react'

import { Layout } from '@qopnet/qopnet-ui'

const SearchPage = () => {
  const router = useRouter()
  const { q: keyword } = router.query

  return (
    <Layout>
      {!keyword && <SearchBegin />}
      {keyword && <SearchResults keyword={keyword} />}
    </Layout>
  )
}

export const SearchBegin = () => {
  return (
    <Stack pt={10} spacing={5}>
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
  return (
    <Stack pt={10} spacing={5}>
      <Heading as="h1" size="xl">
        Cari produk dan toko supplier
      </Heading>
      <Heading as="h2" size="md">
        Hasil pencarian untuk <b>"{keyword}"</b>
      </Heading>
    </Stack>
  )
}

export default SearchPage
