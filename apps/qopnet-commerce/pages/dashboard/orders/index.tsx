import NextImage from 'next/image'
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
  Link as ChakraLink,
  Heading,
  Divider,
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
  formatDateTime,
  formatRupiah,
} from '@qopnet/util-format'
import { BreadcrumbOrders } from '../../../components'
import { useSWR } from '../../../utils'
import { GiMoneyStack } from 'react-icons/gi'

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
            p={3}
            rounded="md"
            bg={orderCardBackground}
          >
            <Stack
              direction={['column', 'column', 'row']}
              align={['flex-start', 'flex-start', 'center']}
            >
              <HStack>
                <Heading as="h2" size="sm">
                  #{index + 1}
                </Heading>
                <Tag size="sm" colorScheme="green">
                  {formatBusinessOrderStatus(businessOrder.status)}
                </Tag>
              </HStack>
              <HStack>
                <Code fontSize="xs">{businessOrder.id}</Code>
              </HStack>
              <HStack>
                <Text fontSize="sm">
                  {formatDateTime(businessOrder.updatedAt)}
                </Text>
              </HStack>
            </Stack>

            <Divider />

            <Stack
              pt={3}
              className="business-order"
              spacing={5}
              direction={['column', 'column', 'row']}
              justify="space-between"
            >
              <Stack className="business-order-items" spacing={3}>
                {businessOrder.businessOrderItems.map((item, index) => {
                  const { calculatedPrice, subTotalCalculatedPrice } =
                    calculateSupplierProductItem(item)

                  return (
                    <Stack direction={['column', 'column', 'row']}>
                      {item.supplierProduct?.images[0] && (
                        <NextLink
                          href={`/${item.supplier?.handle}/${item.supplierProduct?.slug}`}
                          passHref
                        >
                          <Box as="a" className="next-image-container">
                            <NextImage
                              src={item.supplierProduct?.images[0]}
                              key={item.supplierProduct?.slug}
                              alt={item.supplierProduct?.name}
                              layout="fixed"
                              width={50}
                              height={50}
                            />
                          </Box>
                        </NextLink>
                      )}

                      <Stack spacing={1}>
                        <Stack
                          align={['flex-start', 'flex-start', 'center']}
                          direction={['column', 'column', 'row']}
                          spacing={1}
                        >
                          <NextLink
                            href={`/${item.supplier?.handle}/${item.supplierProduct?.slug}`}
                            passHref
                          >
                            <ChakraLink size="sm" fontWeight="bold">
                              {item.supplierProduct?.name}
                            </ChakraLink>
                          </NextLink>
                          {item.supplier?.name && (
                            <Text fontSize="sm">
                              <chakra.span> dari </chakra.span>
                              <NextLink
                                href={`/${item.supplier?.handle}`}
                                passHref
                              >
                                <ChakraLink>{item.supplier?.name}</ChakraLink>
                              </NextLink>
                              {item.supplier?.addresses[0]?.city && (
                                <chakra.span fontSize="sm">
                                  <chakra.span> di </chakra.span>
                                  <chakra.span fontWeight="bold">
                                    {item.supplier?.addresses[0]?.city}
                                  </chakra.span>
                                </chakra.span>
                              )}
                            </Text>
                          )}
                        </Stack>
                        <Text>
                          {item.quantity} barang ×{' '}
                          {formatRupiah(calculatedPrice)} ={' '}
                          {formatRupiah(subTotalCalculatedPrice)}
                        </Text>
                      </Stack>
                    </Stack>
                  )
                })}
              </Stack>

              <Stack
                className="businessOrder-total"
                textAlign="right"
                alignSelf="flex-end"
              >
                <Divider display={['block', 'block', 'none']} />
                <Box>
                  <Heading as="h4" size="sm">
                    Total Belanja
                  </Heading>
                  <Text fontSize="xl">{formatRupiah(totalCalculatedBill)}</Text>
                </Box>
                <Button size="sm" colorScheme="orange">
                  Detail Transaksi
                </Button>
              </Stack>
            </Stack>
          </Stack>
        )
      })}
      {/* <Text as="pre">{JSON.stringify(businessOrders, null, 2)}</Text> */}
    </Stack>
  )
}

export default DashboardOrdersPage
