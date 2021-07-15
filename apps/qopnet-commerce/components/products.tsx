/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Text, Heading, SimpleGrid, VStack } from '@chakra-ui/react'

import { SupplierProductCard } from '@qopnet/qopnet-ui'
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
        <SimpleGrid spacing={5} columns={[1, 2, 4]}>
          {supplierProducts?.map((product, index) => {
            return (
              <SupplierProductCard
                key={product.slug || index}
                product={product}
              />
            )
          })}
        </SimpleGrid>
      )}
    </VStack>
  )
}
