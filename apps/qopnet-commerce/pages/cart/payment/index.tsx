import { useEffect, useState } from 'react'
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
import { formatRupiah, calculateCart } from '@qopnet/util-format'
import { BreadcrumbCart } from '../../../components'
import { useSWR } from '../../../utils'

/**
 * /cart/payment
 */
export const CartPaymentPage = () => {
  const { data, error } = useSWR('/api/business/orders/my/cart')
  const { businessOrder } = data || {}

  return (
    <Layout pt={10} meta={{ title: 'Pembayaran' }}>
      <BreadcrumbCart />
      <Stack spacing={10}>
        <Heading>Pembayaran</Heading>
        {error && <Text>Gagal memuat data order untuk pembayaran</Text>}
        {!error && !data && <Text>Memuat data order untuk pembayaran...</Text>}
        {!error && data && businessOrder && (
          <Stack
            direction={['column', 'column', 'row']}
            spacing={5}
            justify="flex-start"
          >
            <PaymentContainer businessOrder={businessOrder} />
            <PaymentSummaryContainer businessOrder={businessOrder} />
          </Stack>
        )}
      </Stack>
    </Layout>
  )
}

export const PaymentContainer = ({ businessOrder }) => {
  // Fetch paymentMethods
  const { data, error } = useSWR('/api/payments/methods')
  const { paymentMethods } = data || {}

  // Should be empty array if API Payment is available
  const [selectedPaymentId, setSelectedPaymentId] = useState('')

  // Only set default payment once data has been retrieved
  useEffect(() => {
    if (!error && data && paymentMethods?.length) {
      setSelectedPaymentId(paymentMethods[0]?.id)
    }
  }, [error, data, paymentMethods])

  // Handle select payment option with just payment id
  const handleSelectPaymentOption = (paymentId) => {
    setSelectedPaymentId(paymentId)

    // Request here
  }

  return (
    <Stack flex={1} spacing={10} maxW="420px">
      <Stack>
        <Heading as="h3" size="md">
          Pilih metode pembayaran:
        </Heading>
        <Stack>
          {/* {error && <div>Gagal memuat metode pembayaran</div>} */}
          {!error && !data && <div>Memuat metode pembayaran...</div>}
          {!error && data && paymentMethods?.length < 1 && (
            <Stack>
              <Text>Belum ada metode pembayaran yang tersedia.</Text>
            </Stack>
          )}
          {!error &&
            data &&
            paymentMethods?.length > 0 &&
            paymentMethods?.map((payment) => {
              return (
                <OptionBox
                  key={payment.id}
                  id={`payment-${payment.id}`}
                  selected={selectedPaymentId === payment.id}
                  onClick={() => handleSelectPaymentOption(payment.id)}
                >
                  <Text>{payment.name}</Text>
                </OptionBox>
              )
            })}
        </Stack>
      </Stack>
    </Stack>
  )
}

export const PaymentSummaryContainer = ({ businessOrder }) => {
  const router = useRouter()
  const [payment, setPaymentOption] = useState(
    businessOrder?.payment || { id: '2', name: 'Transfer Manual Bank BCA' }
  )

  const {
    totalItems,
    totalPrice,
    totalDiscount,
    totalCalculatedPrice,
    totalShipmentCost,
    totalCalculatedBill,
  } = calculateCart(businessOrder)

  const handleClickPay = () => {
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
      <Stack id="businessOrder-calculation">
        <HStack justify="space-between">
          <Text>Metode Pembayaran</Text>
          <Text>{payment?.name}</Text>
        </HStack>
        <HStack justify="space-between">
          <Text>Total Tagihan</Text>
          <Text>{formatRupiah(totalCalculatedBill)}</Text>
        </HStack>
      </Stack>

      <Button colorScheme="orange" onClick={handleClickPay}>
        Lanjut Bayar
      </Button>
    </Stack>
  )
}

export default CartPaymentPage
