import { useState } from 'react'
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
import { Link } from 'react-router-dom'
import { DefaultLayout } from '../../layouts'
import { useSWR } from '../../utils/swr'
import { Header } from '../../components'

import { SearchBox, formatPrice } from '@qopnet/qopnet-ui'

export interface DataItem {
  name: string
}

export const SuppliersProductsPage = () => {
  const { data, error } = useSWR('/api/suppliers/products')
  const { supplierProducts } = data || {}
  const [filteredSupplierProducts, setFilteredSupplierProducts] = useState<
    DataItem[] | undefined
  >(undefined)

  return (
    <DefaultLayout>
      <Header>
        <Flex alignItems="center" justifyContent="space-between" width="100%">
          <Box width="100%">
            <Heading as="h1" size="md">
              Semua Produk Supplier {supplierProducts?.name ?? ''}
            </Heading>
            <Text>{supplierProducts?.length} produk</Text>
          </Box>
          <Flex width="100%" justifyContent="flex-end">
            <SearchBox
              placeholder="Cari produk supplier"
              dataToFilter={supplierProducts}
              setFilteredData={setFilteredSupplierProducts}
            />
          </Flex>
        </Flex>
      </Header>

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
      {supplierProducts && !filteredSupplierProducts && (
        <SupplierProductsGrid supplierProducts={supplierProducts} />
      )}
      {supplierProducts && filteredSupplierProducts && (
        <SupplierProductsGrid supplierProducts={filteredSupplierProducts} />
      )}
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
    <Box>
      <SimpleGrid
        spacingX={3}
        columns={{ base: 1, md: 3 }}
        w="100%"
        px={5}
        py={3}
        bg={bg}
        borderBottom="1px solid gray"
        borderColor={border}
        gridTemplateColumns="repeat(4, 1fr)"
      >
        <Text fontWeight={700}>Nama</Text>
        <Text fontWeight={700}>Slug</Text>
        <Text fontWeight={700}>SKU</Text>
        <Text fontWeight={700}>Harga</Text>
      </SimpleGrid>
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
            gridTemplateColumns="repeat(4, 1fr)"
          >
            <Text>{supplierProduct.name}</Text>
            <Text>{supplierProduct.slug}</Text>
            <Text>{supplierProduct.sku}</Text>
            <Text>{formatPrice(supplierProduct.price ?? '0')}</Text>
          </SimpleGrid>
        )
      })}
    </Box>
  )
}
