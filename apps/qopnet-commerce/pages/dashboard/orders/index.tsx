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
import {
  calculateCart,
  calculateSupplierProductItem,
  formatDate,
  formatRupiah,
} from '@qopnet/util-format'
import { BreadcrumbOrders } from '../../../components'
import { useSWRNext } from '../../../utils'

/**
 * /dashboard/orders
 *
 * Dashboard Orders
 *
 * Manage owned business orders from my profile.
 */
const DashboardOrdersPage = () => {
  const user = useUser()
  const router = useRouter()
  useEffect(() => {
    if (!user) {
      router.replace('/signin')
    }
  }, [user, router])

  return <Layout pt={10}>{user && <OrdersContainer user={user} />}</Layout>
}

export const OrdersContainer = ({ user }) => {
  // const { data, error } = useSWR('/api/profiles/my/business/orders')
  const { data, error } = useSWRNext('/api/profiles/my-business-orders')
  const { orders } = data || []

  return (
    <Stack>
      <NextSeo title="Daftar order saya - Qopnet" />

      <BreadcrumbOrders />
      <Stack spacing={10}>
        <Heading>Daftar order saya</Heading>
        {error && !data && <Text>Gagal memuat daftar order saya</Text>}
        {!error && !data && (
          <HStack>
            <Spinner />
            <Text>Memuat daftar order saya...</Text>
          </HStack>
        )}
        {!error && data && orders && <OrdersList orders={orders} />}
      </Stack>
    </Stack>
  )
}

export const OrdersList = ({ orders }) => {
  const orderCardBackground = useColorModeValue('gray.50', 'gray.900')

  return (
    <Stack spacing={5}>
      {orders.map((order, index) => {
        const { totalCalculatedBill } = calculateCart(order)

        return (
          <Stack
            key={order.id}
            spacing={5}
            p={3}
            rounded="md"
            bg={orderCardBackground}
            direction={['column', 'column', 'row']}
            align={['flex-start', 'flex-start', 'flex-end']}
            justify="space-between"
          >
            <Box className="order-details">
              <HStack mb={3}>
                <Heading as="h2" size="sm">
                  #{index + 1}
                </Heading>
                <Tag size="sm" colorScheme="green">
                  {order.status}
                </Tag>
                <Text fontSize="sm">{formatDate(order.updatedAt)}</Text>
                <Code fontSize="xs">{order.id}</Code>
              </HStack>
              <Stack>
                {order.businessOrderItems.map((item, index) => {
                  const { calculatedPrice, subTotalCalculatedPrice } =
                    calculateSupplierProductItem(item)

                  return (
                    <Box>
                      <HStack>
                        <Heading as="h4" size="sm">
                          {item.supplierProduct?.name}
                        </Heading>
                        <Text fontSize="sm">
                          dari{' '}
                          <chakra.span fontWeight="bold">
                            {item.supplierProduct?.supplier?.name}
                          </chakra.span>
                        </Text>
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

            <Box className="order-total" textAlign={['left', 'left', 'right']}>
              <Heading as="h4" size="sm">
                Total Belanja
              </Heading>
              <Text fontSize="xl">{formatRupiah(totalCalculatedBill)}</Text>
            </Box>
          </Stack>
        )
      })}
    </Stack>
  )
}

export default DashboardOrdersPage
