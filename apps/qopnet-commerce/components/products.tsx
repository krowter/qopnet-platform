/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Text, Heading, VStack } from '@chakra-ui/react'

import { SupplierProductsGrid } from '@qopnet/qopnet-ui'
import { useSWR } from '../utils/swr'

export const ShopProducts = () => {
  const { data, error } = useSWR(`/api/suppliers/products`)
  const { supplierProducts } = data || {}

  return (
    <VStack py={10} spacing={10}>
      <Heading as="h1" size="xl">
        Katalog belanja semua produk supplier
      </Heading>

      {error && <Text>Gagal mengambil semua produk</Text>}
      {!error && !supplierProducts && <Text>Memuat semua produk...</Text>}
      {!error && supplierProducts && (
        <SupplierProductsGrid supplierProducts={supplierProducts} />
      )}
    </VStack>
  )
}
