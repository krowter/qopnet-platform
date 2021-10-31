/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'

import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  Spinner,
  Stack,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

import { DefaultLayout } from '../../layouts'
import { useSWR } from '../../utils/swr'

import { BusinessOrderProductSection } from '../../components/businessOrderProductSection'
import { BusinessOrderStatusSection } from '../../components/businessOrderStatusSection'
import { BusinessOrderPaymentSection } from '../../components/businessOrderPaymentSection'

export const BusinessOrdersParamPage = () => {
  const { businessOrdersParam }: { businessOrdersParam: string } = useParams()
  const { data, error } = useSWR(`/api/business/orders/${businessOrdersParam}`)
  const { businessOrderParam, businessOrder, message } = data || {}
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
                businessOrder?.businessOrderItems?.map((item) => {
                  return <BusinessOrderProductSection item={item} />
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
