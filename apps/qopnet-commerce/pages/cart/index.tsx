import NextLink from 'next/link'
import NextImage from 'next/image'
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Button,
  chakra,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link as ChakraLink,
  Stack,
  StackDivider,
  Divider,
  Tag,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import { Layout, Icon, SupplierProductPrice } from '@qopnet/qopnet-ui'
import {
  formatRupiah,
  calculateProductPriceDiscount,
} from '@qopnet/util-format'
import { BreadcrumbCart } from '../../components'
import { useSWRNext } from '../../utils'

/**
 * /cart
 *
 * Even though this is the Cart page,
 * the API is using /api/business/orders/:businessOrderId
 * Because BusinessCart is just a draft BusinessOrder.
 */
const CartPage = () => {
  const { data, error } = useSWRNext('/api/orders/1')
  const { order } = data || {}

  return (
    <Layout
      pt={10}
      meta={{
        title: 'Keranjang belanja',
        description: 'Daftar barang produk supplier yang akan dibelanjakan.',
      }}
    >
      <BreadcrumbCart />
      <Stack spacing={10}>
        <Heading>Keranjang belanja</Heading>
        {error && <Text>Gagal memuat data order</Text>}
        {!error && !data && <Text>Memuat data order...</Text>}
        {!error && data && order && (
          <Stack direction={['column', 'column', 'row']}>
            <CartContainer order={order} />
            <CartSummaryContainer order={order} />
          </Stack>
        )}
      </Stack>
    </Layout>
  )
}

/**
 * Most of them should be calculated in the backend/API
 */
export const CartSummaryContainer = ({ order }) => {
  const { totalItems, totalPrice, totalDiscount, totalCalculatedPrice } =
    calculateProductPriceDiscount(order)

  return (
    <Stack
      maxW="420px"
      w="100%"
      p={3}
      spacing={5}
      rounded="md"
      height="fit-content"
      bg={useColorModeValue('gray.100', 'gray.700')}
    >
      <Heading as="h2" size="md">
        Ringkasan belanja
      </Heading>

      <Stack id="order-calculation" spacing={5}>
        <Stack>
          <HStack justify="space-between">
            <Text>Total Harga ({totalItems} barang)</Text>
            <Text>{formatRupiah(totalPrice)}</Text>
          </HStack>
          <HStack justify="space-between">
            <Text>Total Diskon Barang</Text>
            <Text>-{formatRupiah(totalDiscount)}</Text>
          </HStack>
        </Stack>
        <Divider />
        <HStack justify="space-between">
          <Text>Total Harga</Text>
          <Text>{formatRupiah(totalCalculatedPrice)}</Text>
        </HStack>
      </Stack>

      <NextLink href="/cart/shipment" passHref>
        <Button as="a" colorScheme="orange">
          Beli ({totalItems})
        </Button>
      </NextLink>
    </Stack>
  )
}

export const CartContainer = ({ order }) => {
  return (
    <Stack flex={1} minW="420px">
      <HStack>
        <Text>Status Pesanan:</Text>
        <Tag>{order.status}</Tag>
      </HStack>

      <Stack
        py={5}
        divider={<StackDivider />}
        spacing={5}
        align="stretch"
        maxW="720px"
      >
        {order?.businessOrderItems?.map((item, index) => {
          return <BusinessOrderItem key={item.supplierProduct.id} item={item} />
        })}
      </Stack>
    </Stack>
  )
}

export const BusinessOrderItem = ({ item }) => {
  return (
    <Stack spacing={5}>
      <Stack
        spacing={10}
        direction={['column', 'column', 'row']}
        justify="space-between"
        align={['flex-start', 'flex-start', 'flex-end']}
      >
        <Stack spacing={5} direction="row">
          {item.supplierProduct?.images[0] && (
            <Box className="next-image-container">
              <NextImage
                src={item.supplierProduct?.images[0]}
                key={item.supplierProduct?.slug}
                alt={item.supplierProduct?.name}
                layout="fixed"
                width={100}
                height={100}
              />
            </Box>
          )}

          <Stack>
            <NextLink href={item.supplierProduct?.supplier?.handle} passHref>
              <Text as="a" fontSize="xs" fontWeight="bold">
                {item.supplierProduct?.supplier?.name}
                <chakra.span opacity={0.5}>
                  {' di '}
                  {item.supplierProduct?.supplier?.addresses?.length &&
                    item.supplierProduct?.supplier?.addresses[0]?.city}
                </chakra.span>
              </Text>
            </NextLink>
            <NextLink
              passHref
              href={`/${item.supplierProduct?.supplier?.handle}/${item.supplierProduct?.slug}`}
            >
              <Box as="a">
                <Heading as="h2" size="md">
                  {item.supplierProduct?.name}
                </Heading>
                <Heading as="h3" size="sm">
                  {item.supplierProduct?.subname}
                </Heading>
              </Box>
            </NextLink>
            <SupplierProductPrice product={item.supplierProduct} />
          </Stack>
        </Stack>

        <HStack>
          <Box>{item.quantity}</Box>
          <IconButton
            aria-label="Hapus barang"
            size="sm"
            variant="ghost"
            colorScheme="red"
            icon={<Icon name="delete" />}
          >
            Hapus
          </IconButton>
        </HStack>
      </Stack>
    </Stack>
  )
}

export default CartPage
