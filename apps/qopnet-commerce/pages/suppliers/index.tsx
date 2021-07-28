import NextLink from 'next/link'
import { Supplier, Profile, Address } from '@prisma/client'
import {
  Heading,
  Stack,
  Text,
  SimpleGrid,
  HStack,
  Spinner,
  useColorModeValue,
} from '@chakra-ui/react'

import { Layout } from '@qopnet/qopnet-ui'
import { useSWR } from '../../utils/swr'

const SuppliersPage = () => {
  return (
    <Layout pt={10}>
      <SuppliersContainer />
    </Layout>
  )
}

export const SuppliersContainer = () => {
  const { data, error } = useSWR('/api/suppliers')
  const { suppliers } = data || {}

  return (
    <Stack>
      {error && <Text>Gagal memuat semua supplier</Text>}
      {!error && !suppliers && (
        <HStack>
          <Spinner />
          <Text>Memuat semua supplier...</Text>
        </HStack>
      )}
      {!error && suppliers && (
        <SimpleGrid columns={2} spacing={5} minChildWidth="500px">
          {suppliers.map((supplier, index) => {
            return <SupplierCardLink supplier={supplier} />
          })}
        </SimpleGrid>
      )}
    </Stack>
  )
}

export const SupplierCardLink = ({
  supplier,
}: {
  supplier: Supplier & {
    owner: Profile
    addresses: Address[]
  }
}) => {
  return (
    <NextLink href={`/${supplier.handle}`} passHref>
      <Stack
        id="supplier-info"
        as="a"
        p={5}
        boxShadow="xs"
        rounded="base"
        bg={useColorModeValue('gray.50', 'gray.900')}
      >
        <Heading as="h4" size="md">
          {supplier.name}
        </Heading>
        {supplier?.owner && (
          <Text>
            Dikelola oleh <b>{supplier?.owner?.name}</b>
          </Text>
        )}
        {supplier?.addresses[0]?.city && (
          <Text>
            {supplier.addresses[0].city}, {supplier.addresses[0].state}
          </Text>
        )}
      </Stack>
    </NextLink>
  )
}

export default SuppliersPage
