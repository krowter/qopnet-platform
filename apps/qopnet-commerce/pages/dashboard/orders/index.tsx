import NextLink from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import {
  Box,
  chakra,
  Button,
  Code,
  HStack,
  Tag,
  Heading,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useUser } from 'use-supabase'

import { Layout, Icon } from '@qopnet/qopnet-ui'
import { formatBusinessOrderStatus } from '@qopnet/util-format'
import {
  calculateCart,
  calculateSupplierProductItem,
  formatDate,
  formatRupiah,
} from '@qopnet/util-format'
import { BreadcrumbOrders } from '../../../components'
import { useSWR } from '../../../utils'

/**
 * /dashboard/businessOrders
 *
 * Dashboard Orders
 *
 * Manage owned business businessOrders from my profile.
 */
const DashboardOrdersPage = () => {
  const user = useUser()
  const router = useRouter()
  useEffect(() => {
    // if (!user) {
    //   router.replace('/signin')
    // }
  }, [user, router])

  return <Layout pt={10}>{user && <OrdersContainer user={user} />}</Layout>
}

export const OrdersContainer = ({ user }) => {
  const { data, error } = useSWR('/api/business/orders/my')
  const { businessOrders } = data || []

  return (
    <Stack>
      <NextSeo title="Dasbor daftar pesanan saya - Qopnet" />

      <BreadcrumbOrders />
      <Stack spacing={10}>
        <Heading>Dasbor daftar pesanan saya</Heading>
        {error && !data && <Text>Gagal memuat daftar pesanan saya</Text>}
        {!error && !data && (
          <HStack>
            <Spinner />
            <Text>Memuat daftar pesanan saya...</Text>
          </HStack>
        )}
        {!error && data && businessOrders && (
          <BusinessOrdersList businessOrders={businessOrders} />
        )}
      </Stack>
    </Stack>
  )
}

export const BusinessOrdersList = ({ businessOrders }) => {
  const orderCardBackground = useColorModeValue('gray.50', 'gray.900')

  return (
    <Stack spacing={5}>
      {businessOrders.map((businessOrder, index) => {
        const { totalCalculatedBill } = calculateCart(businessOrder)

        return (
          <Stack
            key={businessOrder.id}
            spacing={5}
            p={3}
            rounded="md"
            bg={orderCardBackground}
            direction={['column', 'column', 'row']}
            align={['flex-start', 'flex-start', 'flex-end']}
            justify="space-between"
          >
            <Box className="businessOrder-details">
              <HStack mb={3}>
                <Heading as="h2" size="sm">
                  #{index + 1}
                </Heading>
                <Tag size="sm" colorScheme="green">
                  {formatBusinessOrderStatus(businessOrder.status)}
                </Tag>
                <Text fontSize="sm">{formatDate(businessOrder.updatedAt)}</Text>
                <Code fontSize="xs">{businessOrder.id}</Code>
              </HStack>
              <Stack>
                {businessOrder.businessOrderItems.map((item, index) => {
                  const { calculatedPrice, subTotalCalculatedPrice } =
                    calculateSupplierProductItem(item)

                  return (
                    <Box>
                      <HStack>
                        <Heading as="h4" size="sm">
                          {item.supplierProduct?.name}
                        </Heading>
                        {item.supplier?.name && (
                          <Text fontSize="sm">
                            <chakra.span> dari </chakra.span>
                            <chakra.span fontWeight="bold">
                              {item.supplier?.name}
                            </chakra.span>
                          </Text>
                        )}
                        {/* {item.supplier?.addresses[0]?.city && (
                          <Text fontSize="sm">
                            <chakra.span> di </chakra.span>
                            <chakra.span fontWeight="bold">
                              {item.supplier?.addresses[0]?.city}
                            </chakra.span>
                          </Text>
                        )} */}
                      </HStack>
                      <Text>
                        {item.quantity} barang × {formatRupiah(calculatedPrice)}{' '}
                        = {formatRupiah(subTotalCalculatedPrice)}
                      </Text>
                    </Box>
                  )
                })}
              </Stack>
            </Box>

            <Box
              className="businessOrder-total"
              textAlign={['left', 'left', 'right']}
            >
              <Heading as="h4" size="sm">
                Total Belanja
              </Heading>
              <Text fontSize="xl">{formatRupiah(totalCalculatedBill)}</Text>
            </Box>
          </Stack>
        )
      })}
      {/* <Text as="pre">{JSON.stringify(businessOrders, null, 2)}</Text> */}
    </Stack>
  )
}

export default DashboardOrdersPage
