/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
  Wrap,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import { useParams, useHistory } from 'react-router'
import cuid from 'cuid'

import { formatRupiah } from '@qopnet/util-format'
import { DefaultLayout } from '../../layouts'
import { useSWR } from '../../utils/swr'
import { BusinessOrderPaymentSection } from '../../components/businessOrderPaymentSection'
import { BusinessOrderStatusSection } from '../../components/businessOrderStatusSection'

export const BusinessOrdersParamPage = () => {
  const { businessOrdersParam }: { businessOrdersParam: string } = useParams()
  const { data, error } = useSWR(`/api/business/orders/${businessOrdersParam}`)
  const { businessOrderParam, businessOrder, message } = data || {}

  const history = useHistory()

  return (
    <DefaultLayout>
      <Box px={7} py={7}>
        <Stack mb={5}>
          <Heading>Pesanan</Heading>
          <Breadcrumb
            separator={<ChevronRightIcon color="gray.700" />}
            spacing={2}
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
        </Stack>

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
              position={{ lg: 'sticky' }}
              top="0"
              w={{ base: '100%', lg: '40%' }}
              h="max-content"
              mb={{ base: 5, lg: 0 }}
            >
              <BusinessOrderStatusSection
                businessOrder={businessOrder}
                businessOrdersParam={businessOrdersParam}
              />
              <BusinessOrderPaymentSection
                businessOrderId={businessOrder?.id}
                businessOrdersParam={businessOrdersParam}
                businessOrderStatus={businessOrder?.status}
                paymentMethod={businessOrder?.paymentMethod?.name}
              />
            </Stack>
          </Flex>
        )}
      </Box>
    </DefaultLayout>
  )
}
