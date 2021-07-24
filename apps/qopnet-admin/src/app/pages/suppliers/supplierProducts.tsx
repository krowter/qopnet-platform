import {
  Box,
  Button,
  Flex,
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

export const SupplierProductsPage = () => {
  const { supplierParam }: { supplierParam: string } = useParams()
  const { data, error } = useSWR(`/api/suppliers/${supplierParam}/products`)
  const { supplierProducts } = data || {}

  return (
    <DefaultLayout>
      <Box p={5}>
        <Flex alignItems="center">
          <Box h={5} w={5} borderRadius={20} bg="#4C2602" />
          <Text ml={5} fontWeight={700}>
            Semua Produk Supplier {supplierProducts?.name ?? ''}
          </Text>
          <Text ml={5} fontWeight={500}>
            {supplierProducts?.supplierProducts?.length ?? 0} produk
          </Text>
          <Button
            as={Link}
            ml="auto"
            variant="outline"
            size="xs"
            colorScheme="orange.900"
            to={`/suppliers/${supplierParam}/products/add`}
          >
            Tambah Produk
          </Button>
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
        {supplierProducts && 
          <SupplierProductRows
            supplierProducts={supplierProducts?.supplierProducts || []}
          />
        }
      </Box>
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
        ? supplierProducts.map((supplierProduct: SupplierProduct, index: number) => {
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
          })
        : null}
    </Box>
  )
}
