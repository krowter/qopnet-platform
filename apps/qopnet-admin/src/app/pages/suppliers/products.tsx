import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  Spinner,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { DefaultLayout } from '../../layouts'
import { useSWR } from '../../utils/swr'

export const SuppliersProductsPage = () => {
  const { data, error } = useSWR('/api/suppliers/products')
  const { supplierProducts } = data || {}

  return (
    <DefaultLayout>
      <Box p={5}>
        <Flex alignItems="center">
          <Box h={5} w={5} borderRadius={20} bg="#4C2602" />
          <Text ml={5} fontWeight={700}>
            Semua Produk Supplier
          </Text>
          <Text ml={5} fontWeight={500}>
            {supplierProducts?.length ?? 0} produk
          </Text>
          <Button
            as={Link}
            ml="auto"
            variant="outline"
            size="xs"
            colorScheme="orange.900"
            to="/suppliers/products/add"
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
        {supplierProducts && (
          <SupplierProductsGrid supplierProducts={supplierProducts} />
        )}
      </Box>
    </DefaultLayout>
  )
}

export const SupplierProductsGrid = ({
  supplierProducts,
  supplierParam,
}: {
  supplierProducts: any[]
  supplierParam?: string
}) => {
  const bg = useColorModeValue('gray.50', 'gray.900')
  const border = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box mt={2}>
      {supplierProducts.map((supplierProduct: any, index: number) => {
        return (
          <SimpleGrid
            spacingX={3}
            columns={{ base: 1, md: 3 }}
            as={Link}
            key={`${supplierProduct.id}`}
            to={`/suppliers/${supplierParam}/products/${supplierProduct.slug}`}
            w="100%"
            px={5}
            py={3}
            bg={bg}
            borderBottom="1px solid gray"
            borderColor={border}
            gridTemplateColumns="repeat(6, 1fr)"
          >
            <Text>{supplierProduct.name}</Text>
            <Text>{supplierProduct.slug}</Text>
            <Text>{supplierProduct.sku}</Text>
            <Text>{supplierProduct.price ?? '0'}</Text>
            <Text>{supplierProduct.priceMin ?? '0'}</Text>
            <Text>{supplierProduct.priceMax ?? '0'}</Text>
          </SimpleGrid>
        )
      })}
    </Box>
  )
}
