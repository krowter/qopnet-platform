import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  HStack,
  Link as ChakraLink,
  Heading,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Select,
} from '@chakra-ui/react'
import { useUser } from 'use-supabase'

import { Layout, Icon, formatPrice } from '@qopnet/qopnet-ui'
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
  const { data, error } = useSWR(
    `/api/business/orders/items/paid/${supplierParam}`
  )
  const { supplier, paidBusinessOrderItems } = data || []
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

      <Stack spacing={5}>
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
        {!error && data && paidBusinessOrderItems.length !== 0 && (
          <>
            <Heading as="h2" size="md">
              {paidBusinessOrderItems.length} Pesanan
            </Heading>
            <BusinessOrderItemsList
              businessOrderItems={paidBusinessOrderItems}
            />
          </>
        )}
        {!error && data && paidBusinessOrderItems.length === 0 && (
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
  const [status, setStatus] = useState('')
  const [courier, setCourier] = useState('')
  const bg = useColorModeValue('gray.200', 'gray.900')

  console.log(`status`, status)
  console.log(`businessOrderItems`, businessOrderItems)
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>No Pesanan</Th>
          <Th>Pemesan</Th>
          <Th>Produk</Th>
          <Th>Subtotal</Th>
          <Th>Status</Th>
          <Th>Jasa Kirim</Th>
          <Th>Aksi</Th>
        </Tr>
      </Thead>
      {businessOrderItems.map((businessOrderItem) => {
        return (
          <Tbody>
            <Tr
              _hover={{
                bg: bg,
              }}
            >
              <Td>{businessOrderItem.businessOrderId}</Td>
              <Td>{businessOrderItem.businessOrder.owner.handle}</Td>
              <Td display="flex" alignItems="center">
                <Image
                  src={businessOrderItem.supplierProduct.images[0]}
                  w={20}
                  h={20}
                />
                <Text w={40} ml={2}>
                  {businessOrderItem.supplierProduct.name}
                </Text>
                <Text w={10} ml={2}>
                  x {businessOrderItem.quantity}
                </Text>
              </Td>
              <Td>
                {formatPrice(businessOrderItem.businessOrder.totalPayment)}
              </Td>
              <Td>
                <Select
                  size="sm"
                  placeholder="Select option"
                  defaultValue={businessOrderItem.businessOrder.status}
                  onChange={(event) => setStatus(event.target.value)}
                >
                  <option value="PAID">Dibayar</option>
                  <option value="pack">Dikemas</option>
                  <option value="arrived">Arrived</option>
                </Select>
              </Td>
              <Td>
                <Select
                  placeholder="Select option"
                  defaultValue="Deliveree"
                  size="sm"
                  onChange={(event) => setCourier(event.target.value)}
                >
                  <option value="Deliveree">Deliveree</option>
                  <option value="Kurir Toko">Kurir Toko</option>
                </Select>
              </Td>
              <Td>
                <Button bg="orange" size="sm">
                  Periksa Rincian
                </Button>
              </Td>
            </Tr>
          </Tbody>
        )
      })}
    </Table>
  )
}

export default SupplierOrdersPage
