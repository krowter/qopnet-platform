import { Prisma } from '@prisma/client'
import {
  Avatar,
  Box,
  Flex,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  VStack,
} from '@chakra-ui/react'
import { Link, useHistory } from 'react-router-dom'

import { DefaultLayout } from '../../layouts'
import { useSWR } from '../../utils/swr'

const truncateString = (str: string, num: number) => {
  // If the length of str is less than or equal to num
  // just return str--don't truncate it.
  if (str.length <= num) {
    return str
  }
  // Return str truncated with '...' concatenated to the end of str.
  return str.slice(0, num) + '...'
}

export const SuppliersProductsPage = () => {
  const history = useHistory()
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
          <Box ml="auto" h={5} w={5} borderRadius={20} bg="#4C2602" />
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
        {supplierProducts?.length && (
          <VStack id="suppliers-all" mt={5} spacing={10}>
            <Table variant="simple" size="sm">
              <Tbody>
                {supplierProducts.map(
                  (
                    supplierProduct: Prisma.SupplierProductCreateInput,
                    index: number
                  ) => {
                    /**
                     * Temporary until :supplierParam can be
                     * retrieved from supplierProduct.supplier.handle
                     */
                    const supplier = { handle: 'placeholder' }

                    return (
                      <Tr
                        as={Link}
                        key={`${supplierProduct.id}`}
                        to={`/suppliers/${supplier.handle}/products/${supplierProduct.slug}`}
                        display="table-row"
                      >
                        <Td>#{index}</Td>
                        <Td>
                          <Avatar
                            size="xs"
                            name={supplierProduct.name ?? 'product'}
                          />
                        </Td>
                        <Td>{supplierProduct.name}</Td>
                        <Td>{supplierProduct.slug}</Td>
                        <Td>{supplierProduct.sku}</Td>
                        <Td>{supplierProduct.images}</Td>
                        <Td>{supplierProduct.price ?? '0'}</Td>
                        <Td>{supplierProduct.priceMin ?? '0'}</Td>
                        <Td>{supplierProduct.priceMax ?? '0'}</Td>
                        <Td>
                          {supplierProduct.description
                            ? truncateString(supplierProduct.description, 20)
                            : '-'}
                          {/* <div
                            dangerouslySetInnerHTML={{
                              __html:
                                supplierProduct.description?.replace(
                                  /\n/gi,
                                  '<br>'
                                ) ?? '',
                            }}
                          /> */}
                          {/* <div>
                            {supplierProduct.description?.replace(
                              /\n/i,
                              '<br>'
                            )}
                          </div> */}
                        </Td>
                      </Tr>
                    )
                  }
                )}
              </Tbody>
            </Table>
          </VStack>
        )}
      </Box>
    </DefaultLayout>
  )
}
