import {
  Box,
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

import { DefaultLayout } from '../../layouts'
import { useSWR } from '../../utils/swr'
import {
  formatAddressComplete,
  formatBusinessOrderStatus,
  formatRupiah,
  truncateText,
} from '@qopnet/util-format'

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
          {
            businessOrders?.filter(
              (businessOrder) => businessOrder?.status !== 'DRAFT'
            ).length
          }{' '}
          pesanan
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
  const handleRowClick = (businessOrderId) => {
    history.push(`/business/orders/${businessOrderId}`)
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
            Pemesan
          </Th>
          <Th fontSize="md" textTransform="none">
            Email
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
              businessOrder?.status !== 'DRAFT' && (
                <Tr
                  key={index}
                  onClick={() => handleRowClick(businessOrder?.id)}
                  _hover={{
                    bg: bg,
                  }}
                  cursor="pointer"
                  fontSize="sm"
                >
                  <Td>{truncateText(businessOrder?.id, 8)}</Td>
                  <Td>{formatBusinessOrderStatus(businessOrder?.status)}</Td>
                  <Td>{businessOrder?.owner?.name}</Td>
                  <Td>{businessOrder?.owner?.email}</Td>
                  <Td>{businessOrder?.owner?.phone}</Td>

                  <Td>
                    {truncateText(
                      formatAddressComplete(businessOrder?.shipmentAddress),
                      30
                    )}
                  </Td>
                  <Td>{businessOrder?.paymentMethod?.name}</Td>
                  <Td>{formatRupiah(businessOrder?.totalBillPayment)}</Td>
                </Tr>
              )
            )
          })}
      </Tbody>
    </Table>
  )
}
