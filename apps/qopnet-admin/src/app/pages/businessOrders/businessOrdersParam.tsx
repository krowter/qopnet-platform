/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Badge,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  chakra,
  Divider,
  Flex,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
  Wrap,
  Select,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import { useParams, useHistory } from 'react-router'
import cuid from 'cuid'

import {
  formatAddressComplete,
  formatBusinessOrderStatus,
  formatDateTime,
  formatRupiah,
  formatWeight,
} from '@qopnet/util-format'
import { DefaultLayout } from '../../layouts'
import { useSWR } from '../../utils/swr'
import { useState } from 'react'

export const BusinessOrdersParamPage = () => {
  const { businessOrdersParam }: { businessOrdersParam: string } = useParams()
  const { data, error } = useSWR(`/api/business/orders/${businessOrdersParam}`)
  const { businessOrderParam, businessOrder, message } = data || {}
  const [businessOrderStatus, statusColor] = formatBusinessOrderStatus(
    businessOrder?.status
  )
  const totalWeight = formatWeight(
    businessOrder?.totalWeight,
    businessOrder?.weightUnit
  )
  const [isChangeStatusDisabled, setIsChangeStatusDisabled] = useState(true)
  const [changeStatusValue, setChangeStatusValue] = useState('')
  const handleChangeStatus = (e: any) => {
    setChangeStatusValue(e.target.value)
    setIsChangeStatusDisabled(!isChangeStatusDisabled)
  }

  const history = useHistory()

  return (
    <DefaultLayout>
      <Box px={7} py={7}>
        <Heading mb={1}>Pesanan</Heading>
        <Breadcrumb
          separator={<ChevronRightIcon color="gray.700" />}
          spacing={2}
          mb={10}
        >
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/business/orders">
              Pesanan Bisnis
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage fontWeight="bold">
            <BreadcrumbLink>{businessOrdersParam}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        {error ? (
          <Box px={5} py={3}>
            {' '}
            {message ? message : 'Gagal memuat item pesanan'}
          </Box>
        ) : !businessOrder ? (
          <Box px={5} py={3}>
            <Spinner color="orange.500" />
          </Box>
        ) : (
          <Flex direction={{ base: 'column-reverse', lg: 'row' }} fontSize="sm">
            <Stack
              id="suppliers-products-all"
              spacing={5}
              w={{ base: '100%', lg: '60%' }}
              mr={{ lg: 5 }}
            >
              {businessOrder?.businessOrderItems?.length &&
                businessOrder?.businessOrderItems?.map((item, index) => {
                  const handleProductDetail = () => {
                    const supplierName = item?.supplier?.handle
                    const productSlug = item?.supplierProduct?.slug

                    history.push(
                      `/suppliers/${supplierName}/products/${productSlug}`
                    )
                  }

                  return (
                    <Wrap
                      key={cuid()}
                      id="product-detail"
                      w="full"
                      p={5}
                      spacing={5}
                      align="center"
                      border="1px solid"
                      borderColor="gray.300"
                      borderRadius="lg"
                    >
                      <Image
                        src={item?.supplierProduct?.images[0]}
                        boxSize="70"
                        objectFit="cover"
                      />

                      <Stack>
                        <Text fontWeight="bold">
                          SKU: {item?.supplierProduct?.sku}
                        </Text>
                        <Text fontWeight="bold">
                          {item?.supplierProduct?.name}
                        </Text>

                        {item?.supplierProduct?.subname && (
                          <Text fontSize="xs">
                            {item?.supplierProduct?.subname}
                          </Text>
                        )}
                      </Stack>

                      <Stack align="flex-end" flex="1">
                        {/* alignSelf="flex-end"{' '} */}
                        <Text>
                          {item?.quantity} x{' '}
                          {formatRupiah(item?.supplierProduct?.price)}
                        </Text>
                        <Text fontWeight="bold">
                          {formatRupiah(
                            item?.quantity * item?.supplierProduct?.price
                          )}
                        </Text>
                        <Button
                          bg="orange"
                          size="xs"
                          color="white"
                          onClick={handleProductDetail}
                          _hover={{
                            bg: 'none',
                            border: '1px solid orange',
                            color: 'orange',
                          }}
                        >
                          Detail Produk
                        </Button>
                      </Stack>
                    </Wrap>
                  )
                })}
            </Stack>

            <Stack
              spacing={5}
              position={{ lg: 'sticky' }}
              top="0"
              w={{ base: '100%', lg: '40%' }}
              h="max-content"
              mb={{ base: 5, lg: 0 }}
              p={5}
              border="1px solid"
              borderColor="gray.300"
              borderRadius="lg"
            >
              <Text fontWeight="bold">Informasi Pesanan</Text>
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

              <Badge
                w="max-content"
                p={2}
                borderRadius="lg"
                fontSize="sm"
                colorScheme={statusColor}
              >
                {businessOrderStatus}
              </Badge>

              <Stack direction={{ base: 'column', sm: 'row' }}>
                <Select
                  onChange={handleChangeStatus}
                  w="70%"
                  border="1px solid"
                  borderColor="gray.300"
                  borderRadius="lg"
                  isDisabled={isChangeStatusDisabled}
                  value={changeStatusValue}
                  textTransform="uppercase"
                >
                  <option value="WAITING_FOR_PAYMENT">
                    Menunggu Pembayaran
                  </option>
                  <option value="PAID">Telah Dibayar</option>
                  <option value="WAITING_FOR_CONFIRMATION">
                    Menunggu Konfirmasi Toko
                  </option>
                  <option value="PROCESSED">Sedang Diproses</option>
                  <option value="WAITING_FOR_PICKUP">Menunggu Diambil</option>
                  <option value="ONDELIVERY">Sedang Dikirim</option>
                  <option value="DELIVERED">Telah Sampai</option>
                  <option value="CONFIRMED">Telah Dikonfirmasi</option>
                  <option value="COMPLAINED">Terdapat Komplain</option>
                  <option value="CANCELED">Dibatalkan</option>
                  <option value="REFUNDED">Di-refund</option>
                  <option value="Tidak Jelas">Tidak Jelas</option>
                </Select>
                <Button
                  onClick={() =>
                    setIsChangeStatusDisabled(!isChangeStatusDisabled)
                  }
                  variant="link"
                  w="30%"
                  color="orange"
                >
                  Ganti Status
                </Button>
              </Stack>
            </Stack>
          </Flex>
        )}
      </Box>
    </DefaultLayout>
  )
}
