import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Supplier } from '@prisma/client'
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import { Header } from '../components'
import { DefaultLayout } from '../layouts'
import { useSWR } from '../utils/swr'

import { SearchBox } from '@qopnet/qopnet-ui'

export const SuppliersPage = () => {
  const { data, error } = useSWR('/api/suppliers')
  const { suppliers } = data || {}
  const [filteredSuppliers, setFilteredSuppliers] = useState<
    Supplier[] | undefined
  >(undefined)

  return (
    <DefaultLayout>
      <Flex alignItems="center">
        <Header width="100%">
          <Heading as="h1" size="md">
            Semua Supplier
          </Heading>
          <Text>{suppliers?.length} supplier</Text>
          <div style={{ marginLeft: 'auto' }}>
            <Button
              as={Link}
              variant="outline"
              size="xs"
              colorScheme="orange.900"
              to="/suppliers/add"
            >
              Tambah Supplier
            </Button>
            <SearchBox
              placeholder="Cari supplier"
              dataToFilter={suppliers}
              setFilteredData={setFilteredSuppliers}
            />
          </div>
        </Header>
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
      {suppliers && !filteredSuppliers && (
        <SupplierRows suppliers={suppliers} />
      )}
      {suppliers && filteredSuppliers && (
        <SupplierRows suppliers={filteredSuppliers} />
      )}
    </DefaultLayout>
  )
}

export const SupplierRows = ({ suppliers }: { suppliers: Supplier[] }) => {
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
        gridTemplateColumns="50px 100px 100px 1fr"
      >
        <Text fontWeight={700}>No</Text>
        <Text fontWeight={700}>Avatar</Text>
        <Text fontWeight={700}>Handle</Text>
        <Text fontWeight={700}>Nama</Text>
      </SimpleGrid>
      {suppliers.map((supplier: Supplier, index: number) => {
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
            gridTemplateColumns="50px 100px 100px 1fr"
          >
            <Text>#{index}</Text>
            <Avatar size="xs" name={supplier.name as string} />
            <Text>{supplier.handle}</Text>
            <Text>{supplier.name}</Text>
          </SimpleGrid>
        )
      })}
    </Box>
  )
}
