import { useState } from 'react'

import {
  Badge,
  Button,
  chakra,
  Divider,
  Heading,
  Stack,
  Text,
  Select,
  useToast,
} from '@chakra-ui/react'

import {
  formatAddressComplete,
  formatBusinessOrderStatus,
  formatDateTime,
  formatRupiah,
  formatWeight,
} from '@qopnet/util-format'

import { requestToAPI } from '../utils'
import { mutate } from 'swr'

import businessOrderStatuses from '../pages/businessOrders/businessOrderStatuses.json'

export const BusinessOrderStatusSection = ({
  businessOrder,
  businessOrdersParam,
}) => {
  const [isChangeStatusDisabled, setIsChangeStatusDisabled] = useState(true)
  const [statusValue, setStatusValue] = useState(businessOrder?.status)
  const toast = useToast({ position: 'top' })

  const [businessOrderStatusText, statusColor] = formatBusinessOrderStatus(
    businessOrder?.status
  )

  const totalWeight = formatWeight(
    businessOrder?.totalWeight,
    businessOrder?.weightUnit
  )

  const handleChangeStatus = (event) => {
    setStatusValue(event.target.value)
    setIsChangeStatusDisabled(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const bodyData = {
        status: statusValue,
      }

      mutate(
        `/api/business/orders/${businessOrdersParam}`,
        (data) => {
          return {
            ...data,
            businessOrder: {
              ...data.businessOrder,
              status: statusValue, // from component's state
            },
          }
        },
        false
      )

      const responseBusinessOrder = await requestToAPI(
        'PATCH',
        `/api/business/orders/${businessOrder?.id}/status`,
        bodyData
      )

      mutate(`/api/business/orders/${businessOrdersParam}`)

      if (!responseBusinessOrder) {
        throw new Error('Error business order when changing status')
      } else {
        toast({
          title: 'Berhasil mengubah status pesanan',
          status: 'success',
        })
      }
    } catch (error) {
      toast({ title: 'Gagal mengubah status pesanan', status: 'error' })
    } finally {
      setIsChangeStatusDisabled(true)
    }
  }

  return (
    <Stack
      spacing={5}
      mb={5}
      p={5}
      border="1px solid"
      borderColor="gray.300"
      borderRadius="lg"
    >
      <Heading as="h3" size="md">
        Informasi Pesanan
      </Heading>
      <Badge
        w="max-content"
        p={2}
        size="sm"
        borderRadius="lg"
        colorScheme={statusColor}
      >
        {businessOrderStatusText}
      </Badge>
      <Stack spacing={0}>
        <Text>
          Pesanan Dibuat:{' '}
          <chakra.span fontWeight="bold">
            {formatDateTime(businessOrder?.updatedAt)}
          </chakra.span>
        </Text>
        <Text>
          Pemesan:{' '}
          <chakra.span fontWeight="bold">
            {businessOrder?.owner?.name}
          </chakra.span>
        </Text>
        <Text>
          Email:{' '}
          <chakra.span fontWeight="bold">
            {businessOrder?.owner?.email}
          </chakra.span>
        </Text>
        <Text>
          No Telp:{' '}
          <chakra.span fontWeight="bold">
            {businessOrder?.owner?.phone}
          </chakra.span>
        </Text>
        <Text>
          Dikirim Ke:{' '}
          <chakra.span fontWeight="bold">
            {formatAddressComplete(businessOrder?.shipmentAddress)}
          </chakra.span>
        </Text>
      </Stack>

      <Divider />

      <Stack spacing={0}>
        <Text>
          Total Barang:{' '}
          <chakra.span fontWeight="bold">
            {businessOrder?.totalItems}
          </chakra.span>
        </Text>
        <Text>
          Total Berat:{' '}
          <chakra.span fontWeight="bold">
            {' '}
            {totalWeight === 'null kg' ? '0 kg' : totalWeight}
          </chakra.span>
        </Text>
        <Text>
          Total Harga:{' '}
          <chakra.span fontWeight="bold">
            {' '}
            {formatRupiah(businessOrder?.totalPrice)}
          </chakra.span>
        </Text>
        <Text>
          Total Ongkos Kirim:{' '}
          <chakra.span fontWeight="bold">
            {formatRupiah(businessOrder?.totalShippingCost)}
          </chakra.span>
        </Text>
        <Text>
          Total Diskon Ongkos Kirim:{' '}
          <chakra.span fontWeight="bold">
            {formatRupiah(businessOrder?.totalShippingDiscount)}
          </chakra.span>
        </Text>
      </Stack>

      <Divider />

      <Text fontSize="lg" fontWeight="bold">
        Total Pembayaran:{' '}
        <chakra.span fontWeight="bold" color="orange">
          {' '}
          {formatRupiah(businessOrder?.totalBillPayment)}
        </chakra.span>
      </Text>

      <Stack as="form" onSubmit={handleSubmit}>
        <Select
          w="100%"
          border="1px solid"
          borderColor="gray.300"
          borderRadius="lg"
          textTransform="uppercase"
          size="sm"
          onChange={handleChangeStatus}
          defaultValue={businessOrder?.status}
        >
          {businessOrderStatuses.map(({ value, text }) => {
            return (
              <option key={value} value={value}>
                {text}
              </option>
            )
          })}
        </Select>

        <Button
          isDisabled={isChangeStatusDisabled}
          type="submit"
          variant="solid"
          colorScheme="orange"
          size="sm"
          alignSelf="flex-start"
        >
          Ganti Status
        </Button>
      </Stack>
    </Stack>
  )
}
