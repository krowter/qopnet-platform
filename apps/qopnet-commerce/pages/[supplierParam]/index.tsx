import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import {
  Tag,
  Divider,
  HStack,
  Heading,
  Text,
  VStack,
  Stack,
} from '@chakra-ui/react'

import { Layout } from '@qopnet/qopnet-ui'
import { useSWR } from '../../utils/swr'

const SupplierParamPage = () => {
  const router = useRouter()
  const { supplierParam } = router.query

  return (
    <Layout>
      {supplierParam && <SupplierContainer supplierParam={supplierParam} />}
    </Layout>
  )
}

export const SupplierContainer = ({ supplierParam }) => {
  const { data, error } = useSWR(`/api/suppliers/${supplierParam}`)
  const { supplier } = data || {}

  return (
    <VStack mt={10} spacing={10}>
      {error && <Text>Gagal memuat data supplier</Text>}
      {!error && !supplier && <Text>Memuat data supplier...</Text>}
      {!error && supplier && (
        <>
          <NextSeo title={`${supplier.name} - Qopnet`} />
          <Stack spacing={10} w="100%">
            <Stack>
              <Heading as="h1" size="xl">
                {supplier.name}
              </Heading>

              <HStack>
                <Tag colorScheme="green">
                  {supplier.category === 'PRODUCER'
                    ? 'Produsen'
                    : 'Distributor'}
                </Tag>
                <span> / </span>
                {supplier.phone && <span>{supplier.phone}</span>}
              </HStack>
            </Stack>

            <Divider />

            {!supplier?.supplierProducts?.length && (
              <Text>Toko supplier belum memiliki produk.</Text>
            )}
            {supplier?.supplierProducts?.length && (
              <SupplierProducts products={supplier.supplierProducts} />
            )}
          </Stack>
        </>
      )}
    </VStack>
  )
}

export const SupplierProducts = ({ products }) => {
  return (
    <Stack>
      {products.map((product, index) => {
        return <Stack>{product.name}</Stack>
      })}
    </Stack>
  )
}

export default SupplierParamPage
