import {
  Box,
  Button,
  chakra,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  Select,
  useToast,
} from '@chakra-ui/react'

import { requestToAPI } from '../utils'
import { mutate } from 'swr'

export const BusinessOrderPaymentSection = ({
  businessOrderId,
  businessOrdersParam,
  businessOrderStatus,
  paymentMethod,
}) => {
  const toast = useToast()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      mutate(
        `/api/business/orders/${businessOrdersParam}`,
        (data) => {
          return {
            ...data,
            businessOrder: {
              ...data.businessOrder,
              status: 'PAID',
              paymentRecord: {
                ...data.paymentRecord,
                status: 'PAID',
              },
            },
          }
        },
        false
      )

      const responseBusinessOrder = await requestToAPI(
        'PATCH',
        `/api/business/orders/${businessOrderId}/confirm`,
        {}
      )

      mutate(`/api/business/orders/${businessOrdersParam}`)

      if (!responseBusinessOrder) {
        throw new Error('Error business order when changing status')
      } else {
        toast({
          title: 'Berhasil mengubah status pembayaran',
          status: 'success',
        })
      }
    } catch (error) {
      toast({ title: 'Gagal mengubah status pembayaran', status: 'error' })
    }
  }
  return (
    <Stack
      spacing={5}
      p={5}
      border="1px solid"
      borderColor="gray.300"
      borderRadius="lg"
    >
      <Heading as="h3" size="md">
        Informasi Pembayaran
      </Heading>

      <Text fontSize="lg" fontWeight="bold">
        <chakra.span color="orange">{paymentMethod}</chakra.span>{' '}
      </Text>
      <Text>Belum ada bukti pembayaran</Text>

      <Box as="form" onSubmit={handleSubmit}>
        <Button
          isDisabled={businessOrderStatus !== 'WAITING_FOR_PAYMENT'}
          type="submit"
          variant="solid"
          colorScheme="orange"
          size="sm"
        >
          Konfirmasi Pembayaran
        </Button>
      </Box>
    </Stack>
  )
}
