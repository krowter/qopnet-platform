import NextLink from 'next/link'
import NextImage from 'next/image'
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
  Tag,
  Divider,
  Box,
  Flex,
} from '@chakra-ui/react'
import { useUser } from 'use-supabase'

import {
  formatBusinessOrderStatus,
  formatDateTime,
  formatRupiah,
} from '@qopnet/util-format'
import { Layout, Icon } from '@qopnet/qopnet-ui'
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
  const supplierName = supplier?.name || supplierParam

  return (
    <Stack>
      <NextSeo title={`Daftar pesanan ${supplierName} - Qopnet`} />

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
  return (
    <>
      {businessOrderItems.map((businessOrderItem, index) => {
        const address = businessOrderItem.businessOrder.shipmentAddress
        const { city, state, street, zip, ...partialObject } = address
        const subset = { street, city, state, zip }

        const [businessOrderStatusText, statusColor] =
          formatBusinessOrderStatus(businessOrderItem?.businessOrder?.status)
        return (
          <Stack
            key={businessOrderItem.id}
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
                <Tag size="sm">{businessOrderItem.id}</Tag>
              </HStack>
              <HStack>
                <Icon name="users" />
              </HStack>
              <HStack>
                <Text fontSize="sm">
                  {businessOrderItem.businessOrder.owner.name}
                </Text>
              </HStack>
              <HStack>
                <Text fontSize="sm">
                  {formatDateTime(businessOrderItem.updatedAt)}
                </Text>
              </HStack>
            </Stack>

            <Divider />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box display="flex">
                {businessOrderItem.supplierProduct?.images[0] && (
                  <NextLink
                    href={`/${businessOrderItem.supplier?.handle}/${businessOrderItem.supplierProduct?.slug}`}
                    passHref
                  >
                    <Box as="a" className="next-image-container">
                      <NextImage
                        src={businessOrderItem.supplierProduct?.images[0]}
                        key={businessOrderItem.supplierProduct?.slug}
                        alt={businessOrderItem.supplierProduct?.name}
                        layout="fixed"
                        width={100}
                        height={100}
                      />
                    </Box>
                  </NextLink>
                )}
                <Stack justifyContent="center" ml="5">
                  <NextLink
                    href={`/${businessOrderItem.supplier?.handle}/${businessOrderItem.supplierProduct?.slug}`}
                    passHref
                  >
                    <ChakraLink size="sm" fontWeight="bold">
                      {businessOrderItem.supplierProduct?.name}
                    </ChakraLink>
                  </NextLink>
                  <Text>
                    {businessOrderItem.quantity} ×{' '}
                    {formatRupiah(businessOrderItem.supplierProduct.price)}
                  </Text>
                </Stack>
              </Box>
              <Box display="flex">
                <Box h="50px" mr={2}>
                  <Divider orientation="vertical" colorScheme="red" />
                </Box>
                <Stack>
                  <Text fontWeight="bold" size="sm">
                    Kurir
                  </Text>
                  <Text fontSize="sm">Kurir toko</Text>
                </Stack>
              </Box>
              <Box display="flex">
                <Box h="50px" mr={2}>
                  <Divider orientation="vertical" colorScheme="red" />
                </Box>
                <Stack justifyContent="center" border="medium">
                  <Text fontWeight="bold" size="sm">
                    Alamat
                  </Text>
                  <Box as="span" fontSize="sm">
                    {Object.values(subset).join(',')}
                  </Box>
                </Stack>
              </Box>
            </Box>

            <Box display="flex" justifyContent="flex-end">
              <Button
                // onClick={() =>
                //   router.push(`/dashboard/orders/${businessOrderItem.id}`)
                // }
                size="sm"
                colorScheme="orange"
              >
                Detail Pesanan
              </Button>
            </Box>
          </Stack>
        )
      })}
    </>
  )
}

export default SupplierOrdersPage
