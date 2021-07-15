import {
  Avatar,
  Box,
  Flex,
  Spinner,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'

import { Supplier } from '@qopnet/shared-types'
import { DefaultLayout } from '../layouts'
import { useSWR } from '../utils/swr'

export const SuppliersPage = () => {
  const { data, error } = useSWR('/api/suppliers')
  /**
   * Quick fix because currently /api/suppliers returns
   * { supplier: [] } not { suppliers: [] }
   */
  const { supplier: suppliers } = data

  return (
    <DefaultLayout>
      <Box p={5}>
        <Flex alignItems="center">
          <Box h={5} w={5} borderRadius={20} bg="#4C2602" />
          <Text ml={5} fontWeight={700}>
            Semua Supplier
          </Text>
          <Text ml={5} fontWeight={500}>
            {suppliers?.length ?? 0} supplier
          </Text>
          <Box ml="auto" h={5} w={5} borderRadius={20} bg="#4C2602" />
        </Flex>

        {error && (
          <Box px={5} py={3}>
            Gagal memuat supplier
          </Box>
        )}
        {!suppliers && !error && (
          <Box px={5} py={3}>
            <Spinner color="orange.500" />
          </Box>
        )}

        {suppliers?.length && (
          <VStack id="suppliers-all" mt={5} spacing={10}>
            <Table variant="simple" size="sm">
              <Tbody>
                {suppliers.map((supplier: Supplier, index: number) => {
                  return (
                    <Tr key={`${supplier?.name ?? ''}-${index}`}>
                      <Td>#{index}</Td>
                      <Td>
                        <Avatar size="xs" name={supplier.name} />
                      </Td>
                      <Td>{supplier?.handle}</Td>
                      <Td>{supplier?.name}</Td>
                      <Td>{supplier?.nationalTax}</Td>
                      <Td>{supplier?.certificationFile}</Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </VStack>
        )}
      </Box>
    </DefaultLayout>
  )
}
