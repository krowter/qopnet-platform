import {
  Avatar,
  Box,
  Flex,
  Heading,
  Link,
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

import { Merchant } from '@qopnet/shared-types'
import { Header } from '../../components'
import { DefaultLayout } from '../../layouts'
import { useSWR } from '../../utils/swr'

export const BusinessOrdersPage = () => {
  const { data, error } = useSWR('/api/business/orders')
  const { businessOrders } = data || {}

  if (error) return <div>Gagal memuat daftar pesanan</div>
  if (!businessOrders) return <div>Memuat daftar pesanan...</div>
  return (
    <DefaultLayout>
      <Flex alignItems="center">
        <Header width="100%">
          <Heading as="h1" size="md">
            Semua Pesanan
          </Heading>

          <Text ml={5} fontWeight={500}>
            {businessOrders.length} pesanan
          </Text>
        </Header>
      </Flex>
      {error && (
        <Box px={5} py={3}>
          Gagal memuat supplier
        </Box>
      )}
      {!businessOrders && !error && (
        <Box px={5} py={3}>
          <Spinner color="orange.500" />
        </Box>
      )}
      {businessOrders && <BusinessOrdersRows businessOrders={businessOrders} />}
    </DefaultLayout>
  )
}

export const BusinessOrdersRows = ({
  businessOrders,
}: {
  businessOrders: any
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
        gridTemplateColumns="50px 100px 100px 100px 1fr"
      >
        <Text fontWeight={700}>No</Text>
        <Text fontWeight={700}>Avatar</Text>
        <Text fontWeight={700}>Handle</Text>
        <Text fontWeight={700}>Nama</Text>
        <Text fontWeight={700}>Status</Text>
      </SimpleGrid>
      {businessOrders.map((businessOrder: any, index: number) => {
        return (
          <SimpleGrid
            spacingX={3}
            columns={{ base: 1, md: 3 }}
            as={Link}
            key={`${businessOrder.id}`}
            to={`/business/order/${businessOrder.owner.handle}`}
            w="100%"
            px={5}
            py={3}
            bg={bg}
            borderBottom="1px solid gray"
            borderColor={border}
            gridTemplateColumns="50px 100px 100px 100px 1fr"
          >
            <Text>#{index}</Text>
            <Avatar size="xs" name={businessOrder.owner.name as string} />
            <Text>{businessOrder.owner.handle}</Text>
            <Text>{businessOrder.owner.name}</Text>
            <Text>{businessOrder.status}</Text>
          </SimpleGrid>
        )
      })}
    </Box>
  )
}
