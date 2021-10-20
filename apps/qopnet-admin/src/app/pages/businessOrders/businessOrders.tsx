import {
  Box,
  Flex,
  Heading,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react'

import { useHistory } from 'react-router'

// import { Merchant } from '@qopnet/shared-types'
// import { Header } from '../../components'
import { DefaultLayout } from '../../layouts'
import { useSWR } from '../../utils/swr'
import { formatBusinessOrderStatus, formatRupiah } from '@qopnet/util-format'

export const BusinessOrdersPage = () => {
  const { data, error } = useSWR('/api/business/orders')
  const { businessOrders } = data || {}

  return (
    <DefaultLayout>
      <Box p={5}>
        <Heading as="h1" mb={1} fontSize="3xl">
          Daftar Pesanan
        </Heading>

        <Text fontWeight={500}>
          Total {businessOrders?.length ?? 0} pesanan
        </Text>
      </Box>
      {error && (
        <Box px={5} py={3}>
          Gagal memuat semua pesanan bisnis
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
  const bg = useColorModeValue('gray.200', 'gray.900')
  const history = useHistory()
  const handleRowClick = (businessOrder) => {
    history.push(`/business/orders/${businessOrder?.id}`)
  }

  const truncateAddress = (street, city, state) => {
    return `${street}, ${city}, ${state}, Indonesia`.length > 20
      ? `${street}, ${city}, ${state}, Indonesia`.slice(0, 20) + '...'
      : `${street}, ${city}, ${state}, Indonesia`
  }

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th fontSize="md" textTransform="none">
            ID
          </Th>
          <Th fontSize="md" textTransform="none">
            Status
          </Th>
          <Th fontSize="md" textTransform="none">
            Nama
          </Th>
          <Th fontSize="md" textTransform="none">
            No Telp
          </Th>
          <Th fontSize="md" textTransform="none">
            Alamat
          </Th>
          <Th fontSize="md" textTransform="none">
            Metode Pembayaran
          </Th>
          <Th fontSize="md" textTransform="none">
            Total
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {businessOrders?.length &&
          businessOrders.map((businessOrder: any, index: number) => {
            return (
              <Tr
                key={index}
                onClick={() => handleRowClick(businessOrder)}
                _hover={{
                  bg: bg,
                }}
                cursor="pointer"
                fontSize="sm"
              >
                <Td>{businessOrder?.id}</Td>
                <Td>{formatBusinessOrderStatus(businessOrder?.status)}</Td>
                <Td>{businessOrder?.owner?.name}</Td>
                <Td>{businessOrder?.owner?.phone}</Td>

                <Td>
                  {truncateAddress(
                    businessOrder?.shipmentAddress?.street,
                    businessOrder?.shipmentAddress?.city,
                    businessOrder?.shipmentAddress?.state
                  )}
                </Td>
                <Td>{businessOrder?.paymentMethod?.name}</Td>
                <Td>{formatRupiah(businessOrder?.totalBillPayment)}</Td>
              </Tr>
            )
          })}
      </Tbody>
    </Table>
  )
}
