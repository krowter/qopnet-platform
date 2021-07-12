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
import useSWR from 'swr'

import { DefaultLayout } from '../layouts'
import { Supplier } from '@qopnet/shared-types'
const fetcher = (url: string) => fetch(url).then((r) => r.json())

export const SuppliersPage = () => {
  const { data: suppliers, error } = useSWR('/api/suppliers', fetcher)
  return (
    <DefaultLayout>
      <Box p={5}>
        <Flex alignItems="center">
          <Box h={5} w={5} borderRadius={20} bg="#4C2602" />
          <Text ml={5} fontWeight={700}>
            All suppliers
          </Text>
          <Text ml={5} fontWeight={500}>
            {suppliers?.length ?? 0} suppliers
          </Text>
          <Box ml="auto" h={5} w={5} borderRadius={20} bg="#4C2602" />
        </Flex>
        {error ? (
          <Box px={5} py={3}>
            {' '}
            Failed to load suppliers
          </Box>
        ) : !suppliers ? (
          <Box px={5} py={3}>
            <Spinner color="orange.500" />
          </Box>
        ) : (
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
