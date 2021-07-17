import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import {
  Tag,
  Divider,
  HStack,
  Heading,
  Text,
  Spinner,
  VStack,
  Stack,
  SimpleGrid,
} from '@chakra-ui/react'
import { useUser } from 'use-supabase'

import { Layout, SupplierProductCard } from '@qopnet/qopnet-ui'
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
  const user = useUser()
  const { data, error } = useSWR(`/api/suppliers/${supplierParam}`)
  const { supplier } = data || {}

  return (
    <VStack mt={10} spacing={10}>
      {error && <Text>Gagal memuat data supplier</Text>}
      {!error && !supplier && (
        <Stack>
          <Spinner />
          <Text>Memuat data supplier...</Text>
        </Stack>
      )}
      {!error && supplier && (
        <>
          <NextSeo
            title={`${supplier.name} - ${supplier.addresses[0].city}, ${supplier.addresses[0].state} - Qopnet`}
          />
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
                {supplier.phone && <span>{supplier.phone}</span>}
              </HStack>

              <HStack>
                {supplier.addresses.map((address, index) => {
                  return (
                    <Text>
                      <span>{address.street}, </span>
                      <span>{address.streetDetails ?? ''}</span>
                      <span>{address.city}, </span>
                      <span>{address.state} </span>
                      <span>{address.zip}, </span>
                      <span>Indonesia</span>
                    </Text>
                  )
                })}
              </HStack>
            </Stack>

            <Divider />

            {!supplier?.supplierProducts?.length && (
              <Stack>
                <Heading as="h3" size="lg">
                  Toko supplier belum memiliki produk
                </Heading>
                {user && supplier.owner.user.id === user.id ? (
                  <Stack>
                    <Text>Ayo tambahkan produk untuk supplier Anda</Text>
                  </Stack>
                ) : (
                  <Text>Maaf, toko supplier ini baru mulai ternyata.</Text>
                )}
              </Stack>
            )}
            {supplier?.supplierProducts && (
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
    <SimpleGrid spacing={5} columns={[2, 2, 4]}>
      {products.map((product, index) => {
        return <SupplierProductCard product={product} />
      })}
    </SimpleGrid>
  )
}

export default SupplierParamPage
