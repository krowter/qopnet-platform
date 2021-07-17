import {
  Avatar,
  Box,
  Button,
  Flex,
  SimpleGrid,
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
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'

import { Supplier } from '@qopnet/shared-types'
import { Link } from 'react-router-dom'
import { DefaultLayout } from '../layouts'
import { useSWR } from '../utils/swr'

export const SuppliersPage = () => {
  const { data, error } = useSWR('/api/suppliers')
  /**
   * Quick fix because currently /api/suppliers returns
   * { supplier: [] } not { suppliers: [] }
   */
  const { supplier: suppliers } = data || {}

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
          <Button
            as={Link}
            ml="auto"
            variant="outline"
            size="xs"
            colorScheme="orange.900"
            to="/suppliers/add"
          >
            Tambah Supplier
          </Button>
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
        <SupplierRows suppliers={suppliers} />
      </Box>
    </DefaultLayout>
  )
}

export const SupplierRows = ({ suppliers }: { suppliers: any[] }) => {
  const bg = useColorModeValue('gray.50', 'gray.900')
  const border = useColorModeValue('gray.200', 'gray.700')

  if (!suppliers) {
    return <div>No products</div>
  }
  return (
    <Box mt={2}>
      {suppliers.map((supplier: any, index: number) => {
        const supplierHandle = { handle: 'placeholder' }
        return (
          <SimpleGrid
            spacingX={3}
            columns={{ base: 1, md: 3 }}
            as={Link}
            key={`${supplier.id}`}
            to={`/suppliers/${supplier.handle}`}
            w="100%"
            px={5}
            py={3}
            bg={bg}
            borderBottom="1px solid gray"
            borderColor={border}
            gridTemplateColumns="50px 50px repeat(5, 1fr)"
          >
            <Text>#{index}</Text>
            <Avatar size="xs" name={supplier.name} />
            <Text>{supplier.name}</Text>
            <Text>{supplier.handle}</Text>
            <Text>{supplier.sku}</Text>
            <Text>{supplier.nationalTax}</Text>
            <Text>{supplier.certificationFile}</Text>
          </SimpleGrid>
        )
      })}
    </Box>
  )
}
