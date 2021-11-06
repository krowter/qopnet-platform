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
  const { supplierParam } = router.query

  useEffect(() => {
    // if (!user) {
    //   router.replace('/signin')
    // }
  }, [user, router])

  return (
    <Layout pt={10}>
      {supplierParam && user && (
        <OrdersContainer supplierParam={supplierParam} user={user} />
      )}
    </Layout>
  )
}

export const OrdersContainer = ({ supplierParam, user }) => {
  const { data, error } = useSWR(`/api/suppliers/${supplierParam}/orders`)
  const { supplier, businessOrderItems } = data || []
  const supplierName = supplier?.name || supplierParam.toUpperCase()

  return (
    <Stack>
      <NextSeo title={`Dasbor daftar ${supplierName} - Qopnet`} />

      <Breadcrumb separator={<Icon name="chevron-right" />}>
        <BreadcrumbItem>
          <BreadcrumbLink as={NextLink} href={`/${supplierParam}`} passHref>
            <ChakraLink>{supplierName}</ChakraLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink
            as={NextLink}
            href={`/${supplierParam}/orders`}
            passHref
          >
            <ChakraLink>Pesanan masuk</ChakraLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Stack spacing={10}>
        <Heading>Daftar pesanan {supplierName}</Heading>
        {error && !data && (
          <Text>Gagal memuat daftar pesanan di {supplierName}</Text>
        )}
        {!error && !data && (
          <HStack>
            <Spinner />
            <Text>Memuat daftar pesanan di {supplierName}...</Text>
          </HStack>
        )}
        {!error && data && businessOrderItems.length !== 0 && (
          <BusinessOrderItemsList businessOrderItems={businessOrderItems} />
        )}
        {!error && data && businessOrderItems.length === 0 && (
          <Stack align="flex-start" spacing={5}>
            <Text>
              Maaf belum ada pesanan yang berhasil masuk di {supplierName}.
            </Text>
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
