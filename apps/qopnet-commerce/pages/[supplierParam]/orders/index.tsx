import NextImage from 'next/image'
import NextLink from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import {
  Box,
  chakra,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Code,
  OrderedList,
  ListItem,
  HStack,
  Tag,
  Link as ChakraLink,
  Heading,
  Divider,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
  Button,
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

/**
 * /:supplierParam/orders
 *
 * Supplier Orders
 * BusinessOrderItem from BusinessOrder that has been paid or being processed
 */
const SupplierOrdersPage = () => {
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
  const supplierParam = 'qopnet'
  const { data, error } = useSWR(`/api/suppliers/${supplierParam}/orders`)
  const { businessOrderItems } = data || []

  return (
    <Stack>
      <NextSeo title="Dasbor daftar Toko Qopnet - Qopnet" />

      <Breadcrumb separator={<Icon name="chevron-right" />}>
        <BreadcrumbItem>
          <BreadcrumbLink as={NextLink} href="/qopnet" passHref>
            <ChakraLink>Toko Qopnet</ChakraLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={NextLink} href="/qopnet/orders" passHref>
            <ChakraLink>Pesanan</ChakraLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Stack spacing={10}>
        <Heading>Daftar pesanan Toko Qopnet</Heading>
        {error && !data && <Text>Gagal memuat daftar pesanan Toko Qopnet</Text>}
        {!error && !data && (
          <HStack>
            <Spinner />
            <Text>Memuat daftar pesanan Toko Qopnet...</Text>
          </HStack>
        )}
        {!error && data && businessOrderItems.length !== 0 && (
          <BusinessOrderItemsList businessOrderItems={businessOrderItems} />
        )}
        {!error && data && businessOrderItems.length === 0 && (
          <Stack align="flex-start" spacing={5}>
            <Text>Maaf belum ada pesanan yang berhasil masuk.</Text>
          </Stack>
        )}
      </Stack>
    </Stack>
  )
}

export const BusinessOrderItemsList = ({ businessOrderItems }) => {
  return <Stack spacing={5}>{JSON.stringify(businessOrderItems)}</Stack>
}

export default SupplierOrdersPage
