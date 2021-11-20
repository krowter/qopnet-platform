import NextLink from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import {
  HStack,
  Heading,
  Spinner,
  Stack,
  Text,
  Button,
  Link as ChakraLink,
} from '@chakra-ui/react'
import { useUser } from 'use-supabase'

import { Layout } from '@qopnet/qopnet-ui'

import { BreadcrumbOrders } from '../../../components'
import { useSWR } from '../../../utils'
import { SimpleBusinessOrderCard } from '../../../components'

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
