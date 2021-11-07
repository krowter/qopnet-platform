import NextLink from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import NextImage from 'next/image'
import {
  HStack,
  Heading,
  Spinner,
  Stack,
  Text,
  Button,
  Box,
  Tag,
  useColorModeValue,
  Link as ChakraLink,
  Code,
  Divider,
  chakra,
} from '@chakra-ui/react'
import { useUser } from 'use-supabase'

import { Layout } from '@qopnet/qopnet-ui'
import { formatBusinessOrderStatus } from '@qopnet/util-format'
import {
  calculateCart,
  calculateSupplierProductItem,
  formatDateTime,
  formatRupiah,
} from '@qopnet/util-format'

import { BreadcrumbOrders, BusinessOrderCard } from '../../../components'
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
        <Heading>Semua Pesanan Saya</Heading>
        {error && !data && <Text>Gagal memuat daftar pesanan saya</Text>}
        {!error && !data && (
          <HStack>
            <Spinner />
            <Text>Memuat daftar pesanan saya...</Text>
          </HStack>
        )}
        {!error && data && businessOrders.length !== 0 && (
          <BusinessOrdersList businessOrders={businessOrders} />
        )}
        {!error && data && businessOrders.length === 0 && (
          <Stack align="flex-start" spacing={5}>
            <Text>Maaf Anda tidak memiliki daftar pesanan.</Text>
            <NextLink href="/shop" passHref>
              <Button as="a" colorScheme="orange">
                Lanjut belanja dahulu
              </Button>
            </NextLink>
          </Stack>
        )}
      </Stack>
    </Stack>
  )
}

export const SimpleBusinessOrderCard = ({ businessOrder, index }) => {
  const [businessOrderStatusText, statusColor] = formatBusinessOrderStatus(
    businessOrder?.status
  )

  const router = useRouter()

  return (
    <Stack
      key={businessOrder.id}
      p={5}
      border="2px solid"
      borderColor="gray.200"
      borderRadius="lg"
    >
      <Stack
        direction={['column', 'column', 'row']}
        align={['flex-start', 'flex-start', 'center']}
      >
        <HStack>
          <Heading as="h2" size="sm">
            #{index + 1}
          </Heading>
          <Tag size="sm" colorScheme={statusColor}>
            {businessOrderStatusText}
          </Tag>
        </HStack>
        <HStack>
          <Code fontSize="xs">{businessOrder.id}</Code>
        </HStack>
        <HStack>
          <Text fontSize="sm">{formatDateTime(businessOrder.updatedAt)}</Text>
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
              <Stack
                key={item?.id || index}
                direction={['column', 'column', 'row']}
              >
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
                        width={100}
                        height={100}
                      />
                    </Box>
                  </NextLink>
                )}

                <Stack spacing={1} alignSelf="center">
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
                        <NextLink href={`/${item.supplier?.handle}`} passHref>
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
                    {item.quantity} barang × {formatRupiah(calculatedPrice)} ={' '}
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
            <Text fontSize="xl">{formatRupiah(businessOrder?.totalPrice)}</Text>
          </Box>
          <Button
            onClick={() => router.push(`/dashboard/orders/${businessOrder.id}`)}
            size="sm"
            colorScheme="orange"
          >
            Detail Pesanan
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}

export const BusinessOrdersList = ({ businessOrders }) => {
  return (
    <Stack spacing={5}>
      {businessOrders.map((businessOrder, index) => (
        <SimpleBusinessOrderCard
          businessOrder={businessOrder}
          key={businessOrder.id}
          index={index}
        />
      ))}
    </Stack>
  )
}

export default DashboardOrdersPage
