import { useEffect, useState, useCallback, useRef } from 'react'
import NextLink from 'next/link'
import NextImage from 'next/image'
import { useRouter } from 'next/router'
import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react'
import { mutate } from 'swr'

import { Layout, OptionBox } from '@qopnet/qopnet-ui'
import { formatRupiah, calculateCart } from '@qopnet/util-format'
import { BreadcrumbCart } from '../../../components'
import { useSWR, requestToAPI } from '../../../utils'

/**
 * Cart select Payment Method
 *
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
  const { data, error } = useSWR('/api/payments/methods')
  const { paymentMethods } = data || {}
  const [paymentMethodId, setPaymentMethodId] = useState('')

  const handleSelectPaymentOption = (paymentMethodId) => {
    setPaymentMethodId(paymentMethodId)
    patchCartWithPaymentMethod(paymentMethodId)
  }

  const patchCartWithPaymentMethod = async (paymentMethodId) => {
    const index = paymentMethods.findIndex(
      (item) => item.id === paymentMethodId
    )
    mutate(
      '/api/business/orders/my/cart',
      (data) => {
        return {
          ...data,
          businessOrder: {
            ...data.businessOrder,
            paymentMethod: {
              id: paymentMethods[index]?.id,
              name: paymentMethods[index]?.name,
              paymentCategory: paymentMethods[index]?.category,
            },
          },
        }
      },
      false
    )
    await requestToAPI('PATCH', '/api/business/orders/my/cart/payment/method', {
      id: paymentMethodId,
    })
    mutate('/api/business/orders/my/cart')
  }

  useEffect(() => {
    if (!error && data && businessOrder && paymentMethods) {
      setPaymentMethodId(
        businessOrder?.paymentMethodId || paymentMethods[0]?.id
      )
    }
    if (!businessOrder?.paymentMethodId) {
      patchCartWithPaymentMethod(paymentMethods[0]?.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!error && data && businessOrder && paymentMethods])

  return (
    <Stack flex={1} spacing={10} maxW="420px">
      <Stack>
        <Heading as="h3" size="md">
          Pilih metode pembayaran:
        </Heading>
        <Stack>
          {error && !data && <div>Gagal memuat metode pembayaran</div>}
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
                  selected={paymentMethodId === payment.id}
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

  const {
    // totalItems,
    // totalPrice,
    // totalDiscount,
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
          <Text>{businessOrder?.paymentMethod?.name}</Text>
        </HStack>
        <HStack justify="space-between">
          <Text>Total Harga ({1} produk)</Text>
          <Text>{formatRupiah(totalCalculatedPrice)}</Text>
        </HStack>
        <HStack justify="space-between">
          <Text>Total Ongkos Kirim</Text>
          <Text>{formatRupiah(totalShipmentCost)}</Text>
        </HStack>
        <hr />
        <HStack justify="space-between" fontSize="lg" fontWeight="bold">
          <Text>Total Tagihan</Text>
          <Text>{formatRupiah(totalCalculatedBill)}</Text>
        </HStack>
      </Stack>

      <ManualTransferPaymentModalGroup
        totalCalculatedBill={totalCalculatedBill}
      />
    </Stack>
  )
}

export const ManualTransferPaymentModalGroup = ({ totalCalculatedBill }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = useRef()
  const finalRef = useRef()

  return (
    <>
      <Button colorScheme="orange" onClick={onOpen} ref={finalRef}>
        Pembayaran
      </Button>

      <Modal
        isCentered
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Detail transfer manual</ModalHeader>

          <ModalBody as={Stack}>
            <HStack justify="space-between" fontSize="lg" fontWeight="bold">
              <Text>Total Tagihan</Text>
              <Text>{formatRupiah(totalCalculatedBill)}</Text>
            </HStack>

            <FormControl>
              <FormLabel>No. rekening</FormLabel>
              <Input ref={initialRef} placeholder="Contoh: 123456789" />
            </FormControl>

            <FormControl>
              <FormLabel>Nama pemilik rekening</FormLabel>
              <Input placeholder="Contoh: Arya Aditiara" />
            </FormControl>
          </ModalBody>

          <ModalFooter as={ButtonGroup}>
            <Button colorScheme="green">Proses Bayar</Button>
            {/* <Button onClick={onClose}>Batal</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CartPaymentPage
