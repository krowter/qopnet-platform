import { useEffect } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import {
  Box,
  Button,
  HStack,
  Heading,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useUser } from 'use-supabase'

import { Layout, Icon } from '@qopnet/qopnet-ui'
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
  const { orders } = data || {}

  return (
    <Stack>
      <NextSeo title="Daftar order saya - Qopnet" />

      {error && !data && <Text>Gagal memuat daftar order</Text>}
      {!error && !data && (
        <HStack>
          <Spinner />
          <Text>Memuat daftar order...</Text>
        </HStack>
      )}
      {!error && data && orders && <OrdersList orders={orders} />}
    </Stack>
  )
}

export const OrdersList = ({ orders }) => {
  return (
    <Stack spacing={10}>
      <Text as="pre">{JSON.stringify(orders, null, 2)}</Text>
    </Stack>
  )
}

export default DashboardOrdersPage
