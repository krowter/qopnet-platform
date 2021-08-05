import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { SupplierProduct } from '@prisma/client'
import { Link, useHistory } from 'react-router-dom'
import { useParams } from 'react-router'

import { DefaultLayout } from '../../layouts'
import { useSWR } from '../../utils/swr'
import { Header } from '../../components'

export const SupplierProductsPage = () => {
  const { supplierParam }: { supplierParam: string } = useParams()
  const { data, error } = useSWR(`/api/suppliers/${supplierParam}/products`)
  const { supplierProducts } = data || {}

  return (
    <DefaultLayout>
      <Flex alignItems="center">
        <Header width="100%">
          <Heading as="h1" size="md">
            Semua Produk Supplier {supplierProducts?.name ?? ''}
          </Heading>
          <Text>{supplierProducts?.supplierProducts?.length} produk</Text>
          <div style={{ marginLeft: 'auto' }}>
            <Button
              as={Link}
              variant="outline"
              size="xs"
              colorScheme="orange.900"
              to={`/suppliers/${supplierParam}/products/add`}
            >
              Tambah Produk
            </Button>
          </div>
        </Header>
      </Flex>
      {error && (
        <Box px={5} py={3}>
          Gagal memuat produk supplier
        </Box>
      )}
      {!supplierProducts && !error && (
        <Box px={5} py={3}>
          <Spinner color="orange.500" />
        </Box>
      )}
      {supplierProducts && (
        <SupplierProductRows
          supplierProducts={supplierProducts?.supplierProducts || []}
        />
      )}
    </DefaultLayout>
  )
}

export const SupplierProductRows = ({
  supplierProducts,
}: {
  supplierProducts: SupplierProduct[]
}) => {
  const bg = useColorModeValue('gray.50', 'gray.900')
  const border = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box mt={2}>
      {supplierProducts
        ? supplierProducts.map(
            (supplierProduct: SupplierProduct, index: number) => {
              return (
                <SimpleGrid
                  spacingX={3}
                  columns={{ base: 1, md: 3 }}
                  as={Link}
                  key={`${supplierProduct.id}`}
                  to={`/suppliers/${supplierProduct.slug}/products/${supplierProduct.slug}`}
                  w="100%"
                  px={5}
                  py={3}
                  bg={bg}
                  borderBottom="1px solid gray"
                  borderColor={border}
                  gridTemplateColumns="repeat(4, 1fr)"
                >
                  <Text>{supplierProduct.name}</Text>
                  <Text>{supplierProduct.slug}</Text>
                  <Text>{supplierProduct.sku}</Text>
                  <Text>{supplierProduct.price ?? '0'}</Text>
                </SimpleGrid>
              )
            }
          )
        : null}
    </Box>
  )
}
