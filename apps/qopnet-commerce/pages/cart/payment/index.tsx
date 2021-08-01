import { useState } from 'react'
import NextLink from 'next/link'
import NextImage from 'next/image'
import { useRouter } from 'next/router'
import {
  Button,
  Heading,
  HStack,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import { Layout, OptionBox } from '@qopnet/qopnet-ui'
import { formatRupiah, calculateEverything } from '@qopnet/util-format'
import { BreadcrumbCart } from '../../../components'
import { useSWRNext } from '../../../utils'

const payments = [
  { id: 1, name: 'COD (Cash on Delivery)' },
  { id: 2, name: 'Transfer Manual Bank BCA' },
  { id: 3, name: 'Transfer Manual Bank Permata' },
]

/**
 * /cart/payment
 */
export const CartPaymentPage = () => {
  const { data, error } = useSWRNext('/api/orders/1')
  const { order } = data || {}

  return (
    <Layout pt={10} meta={{ title: 'Pembayaran' }}>
      <BreadcrumbCart />
      <Stack spacing={10}>
        <Heading>Pembayaran</Heading>
        {error && <Text>Gagal memuat data order</Text>}
        {!error && !data && <Text>Memuat data order...</Text>}
        {!error && data && order && (
          <Stack
            direction={['column', 'column', 'row']}
            spacing={5}
            justify="space-between"
          >
            <PaymentContainer order={order} />
            <PaymentSummaryContainer order={order} />
          </Stack>
        )}
      </Stack>
    </Layout>
  )
}

export const PaymentContainer = ({ order }) => {
  const selectedPaymentId = 2

  return (
    <Stack flex={1} spacing={10} maxW="420px">
      <Stack>
        <Heading as="h3" size="md">
          Pilih metode pembayaran:
        </Heading>
        <Stack>
          {payments.map((payment) => {
            return (
              <OptionBox
                key={payment.id}
                id={`payment-${payment.id}`}
                selected={selectedPaymentId === payment.id}
              >
                <Text>{payment?.name}</Text>
              </OptionBox>
            )
          })}
        </Stack>
      </Stack>
    </Stack>
  )
}

export const PaymentSummaryContainer = ({ order }) => {
  const router = useRouter()
  const [payment, setPaymentOption] = useState(payments[1])

  const {
    totalItems,
    totalPrice,
    totalDiscount,
    totalCalculatedPrice,
    totalShipmentCost,
    totalCalculatedBill,
  } = calculateEverything(order)

  const onClickPay = () => {
    router.push('/dashboard/orders')
  }

  return (
    <Stack
      maxW="420px"
      w="100%"
      p={3}
      spacing={5}
      rounded="md"
      height="fit-content"
      bg={useColorModeValue('gray.100', 'gray.700')}
    >
      <Heading as="h2" size="md">
        Ringkasan tagihan belanja
      </Heading>
      <Stack id="order-calculation">
        <HStack justify="space-between">
          <Text>Pilihan Pembayaran</Text>
          <Text>{payment?.name}</Text>
        </HStack>
        <HStack justify="space-between">
          <Text>Total Tagihan</Text>
          <Text>{formatRupiah(totalCalculatedBill)}</Text>
        </HStack>
      </Stack>

      <Button colorScheme="orange" onClick={onClickPay}>
        Lanjut Bayar
      </Button>
    </Stack>
  )
}

export default CartPaymentPage
