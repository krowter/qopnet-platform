/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  CloseButton,
  Flex,
  HStack,
  Spinner,
  Text,
  VStack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  useColorModeValue,
  Divider,
  Stack,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
  IconButton,
  Link as RouterLink,
  Image as ChakraImage,
  Heading,
  chakra,
  Badge,
  Wrap,
} from '@chakra-ui/react'
import cuid from 'cuid'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import { useParams, useHistory } from 'react-router'
import {
  formatBusinessOrderStatus,
  formatDateTime,
  formatRupiah,
  formatWeight,
} from '@qopnet/util-format'

import { DefaultLayout } from '../../layouts'
import { useSWR } from '../../utils/swr'
// import { ModifierButtons } from '../../components'
// import { Icon, formatPrice } from '@qopnet/qopnet-ui'

export const BusinessOrdersParamPage = () => {
  const sidebar = useDisclosure()
  const { businessOrdersParam }: { businessOrdersParam: string } = useParams()
  const { data, error } = useSWR(`/api/business/orders/${businessOrdersParam}`)
  const { businessOrderParam, businessOrder, message } = data || {}

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
            <VStack
              id="suppliers-products-all"
              spacing={5}
              alignItems="flex-start"
              w={{ base: '100%', lg: '60%' }}
              mr={{ lg: 5 }}
            >
              {businessOrder?.businessOrderItems?.length &&
                businessOrder?.businessOrderItems?.map((item, index) => {
                  return (
                    <Wrap
                      id="product-detail"
                      w="full"
                      p={5}
                      spacing={5}
                      align="center"
                      border="1px solid"
                      borderColor="gray.300"
                      borderRadius="lg"
                    >
                      <ChakraImage
                        src={item?.supplierProduct?.images[0]}
                        boxSize="70"
                      ></ChakraImage>

                      <VStack align="flex-start">
                        <Text fontWeight="bold">
                          {item?.supplierProduct?.sku}
                        </Text>
                        <Text fontWeight="bold">
                          {item?.supplierProduct?.name}
                        </Text>
                        {/* <Text>Subtotal</Text> */}
                      </VStack>

                      <VStack align="flex-end" flex="1">
                        {/*alignSelf="flex-end" */}{' '}
                        <Text>
                          {item?.quantity} x{' '}
                          {formatRupiah(item?.supplierProduct?.price)}
                        </Text>
                        <Text fontWeight="bold">
                          {formatRupiah(
                            item?.quantity * item?.supplierProduct?.price
                          )}
                        </Text>
                      </VStack>
                    </Wrap>
                  )
                })}
            </VStack>

            <VStack
              position={{ lg: 'sticky' }}
              top="0"
              w={{ base: '100%', lg: '40%' }}
              h="max-content"
              align="flex-start"
              spacing={5}
              mb={{ base: 5, lg: 0 }}
              p={5}
              border="1px solid"
              borderColor="gray.300"
              borderRadius="lg"
            >
              <Text fontWeight="bold">Informasi Pesanan</Text>
              <VStack spacing={0} align="flex-start">
                <Text>
                  Pesanan Dibuat:{' '}
                  <chakra.span fontWeight="bold">
                    {formatDateTime(businessOrder?.createdAt)}
                  </chakra.span>
                </Text>
                <Text>
                  Pemesan:{' '}
                  <chakra.span fontWeight="bold">
                    {businessOrder?.owner?.name}
                  </chakra.span>
                </Text>
                <Text>
                  Dikirim Ke:{' '}
                  <chakra.span fontWeight="bold">
                    {businessOrder?.shipmentAddress?.street},{' '}
                    {businessOrder?.shipmentAddress?.city},{' '}
                    {businessOrder?.shipmentAddress?.state}, Indonesia
                  </chakra.span>
                </Text>
              </VStack>

              <Divider></Divider>

              <VStack align="flex-start" spacing={0}>
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
                    {formatWeight(
                      businessOrder?.totalWeight,
                      businessOrder?.weightUnit
                    )}
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
              </VStack>

              <Divider></Divider>

              <Text fontSize="lg" fontWeight="bold">
                Total Pembayaran:{' '}
                <chakra.span fontWeight="bold" color="orange">
                  {' '}
                  {formatRupiah(businessOrder?.totalBillPayment)}
                </chakra.span>
              </Text>

              <Badge colorScheme="red" fontSize="sm" p={2} borderRadius="lg">
                {formatBusinessOrderStatus(businessOrder?.status)}
              </Badge>
            </VStack>
          </Flex>
        )}
      </Box>
    </DefaultLayout>
  )
}
