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
import { Header } from '../components'
import { DefaultLayout } from '../layouts'
import { useSWR } from '../utils/swr'

export const MerchantsPage = () => {
  const { data, error } = useSWR('/api/merchants')
  const { merchants } = data || {}

  return (
    <DefaultLayout>
      <Flex alignItems="center">
        <Header width="100%">
          <Heading as="h1" size="md">
            Semua Merchant
          </Heading>

          <Text ml={5} fontWeight={500}>
            {merchants.length} merchant
          </Text>
        </Header>
      </Flex>
      {error && (
        <Box px={5} py={3}>
          Gagal memuat supplier
        </Box>
      )}
      {!merchants && !error && (
        <Box px={5} py={3}>
          <Spinner color="orange.500" />
        </Box>
      )}
      {merchants?.length && <MerchantRows merchants={merchants} />}
    </DefaultLayout>
  )
}

export const MerchantRows = ({ merchants }: { merchants: Merchant[] }) => {
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
      {merchants?.length &&
        merchants.map((merchant: Merchant, index: number) => {
          return (
            <SimpleGrid
              spacingX={3}
              columns={{ base: 1, md: 3 }}
              as={Link}
              key={`${merchant.id}`}
              to={`/merchants/${merchant.handle}`}
              w="100%"
              px={5}
              py={3}
              bg={bg}
              borderBottom="1px solid gray"
              borderColor={border}
              gridTemplateColumns="50px 100px 100px 1fr"
            >
              <Text>#{index}</Text>
              <Avatar size="xs" name={merchant.name as string} />
              <Text>{merchant.handle}</Text>
              <Text>{merchant.name}</Text>
            </SimpleGrid>
          )
        })}
    </Box>
  )
}
