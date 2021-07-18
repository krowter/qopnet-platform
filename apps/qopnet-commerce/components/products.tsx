/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Text, Heading, VStack, Stack, HStack, Spinner } from '@chakra-ui/react'

import { SupplierProductsGrid } from '@qopnet/qopnet-ui'
import { useSWR } from '../utils/swr'

export const ShopProducts = () => {
  const { data, error } = useSWR(`/api/suppliers/products`)
  const { supplierProducts } = data || {}

  return (
    <Stack py={10} spacing={5}>
      <Heading as="h1" size="xl">
        Katalog belanja semua produk supplier
      </Heading>
      {error && <Text>Gagal memuat semua produk supplier</Text>}
      {!error && !supplierProducts && (
        <HStack>
          <Spinner />
          <Text>Memuat semua produk supplier...</Text>
        </HStack>
      )}
      {!error && supplierProducts && (
        <Stack spacing={10}>
          <Text>Terdapat total {supplierProducts?.length} produk</Text>
          <SupplierProductsGrid supplierProducts={supplierProducts} />
        </Stack>
      )}
    </Stack>
  )
}
