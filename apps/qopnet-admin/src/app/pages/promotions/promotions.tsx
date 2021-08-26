import {
  Avatar,
  Box,
  Flex,
  Heading,
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
import { Link } from 'react-router-dom'

export const PromotionsPage = () => {
  const { data, error } = useSWR('/api/promos/submissions')
  const { PromoSubmissions } = data || {}

  return (
    <DefaultLayout>
      <Flex alignItems="center">
        <Header width="100%">
          <Heading as="h1" size="md">
            Semua Promo
          </Heading>

          <Text ml={5} fontWeight={500}>
            {PromoSubmissions?.length ?? 0} promo
          </Text>
        </Header>
      </Flex>
      {error && (
        <Box px={5} py={3}>
          Gagal memuat semua promo
        </Box>
      )}
      {!PromoSubmissions && !error && (
        <Box px={5} py={3}>
          <Spinner color="orange.500" />
        </Box>
      )}
      {PromoSubmissions && (
        <PromoSubmissionsRows promoSubmissions={PromoSubmissions} />
      )}
    </DefaultLayout>
  )
}

export const PromoSubmissionsRows = ({
  promoSubmissions,
}: {
  promoSubmissions: any
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
        gridTemplateColumns="50px 100px 100px 200px 200px 200px 1fr 1fr"
      >
        {/* to be decided from api return value */}
        <Text fontWeight={700}>No</Text>
        <Text fontWeight={700}>Avatar</Text>
        <Text fontWeight={700}>Nama</Text>
        <Text fontWeight={700}>No HP</Text>
        <Text fontWeight={700}>Email</Text>
        <Text fontWeight={700}>Tempat Lahir</Text>
        <Text fontWeight={700}>Tanggal Lahir</Text>
        <Text fontWeight={700}>Status</Text>
      </SimpleGrid>
      {promoSubmissions?.length &&
        promoSubmissions.map((promoSubmission: any, index: number) => {
          return (
            <SimpleGrid
              spacingX={3}
              columns={{ base: 1, md: 3 }}
              as={Link}
              key={`${promoSubmission?.id}`}
              to={`/promos/submissions/${promoSubmission?.id}`}
              w="100%"
              px={5}
              py={3}
              bg={bg}
              borderBottom="1px solid gray"
              borderColor={border}
              gridTemplateColumns="50px 100px 100px 200px 200px 200px 1fr 1fr"
            >
              <Text>#{index}</Text>
              <Avatar size="xs" name={promoSubmission?.name as string} />
              <Text>{promoSubmission?.name}</Text>
              <Text>{promoSubmission?.phone}</Text>
              <Text>{promoSubmission?.email}</Text>
              <Text>{promoSubmission?.birthPlace}</Text>
              <Text>{promoSubmission?.birthDate}</Text>
              <Text>{promoSubmission?.status}</Text>
            </SimpleGrid>
          )
        })}
    </Box>
  )
}
