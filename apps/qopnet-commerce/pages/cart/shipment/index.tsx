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
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link as ChakraLink,
  Stack,
  StackDivider,
  Tag,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import { Layout, Icon, SupplierProductPrice } from '@qopnet/qopnet-ui'
import {
  calculateEverything,
  formatRupiah,
  formatAddressComplete,
} from '@qopnet/util-format'
import { BreadcrumbCart } from '../../../components'
import { useSWRNext } from '../../../utils'

/**
 * /cart/shipment
 */
export const CartShipmentPage = () => {
  const { data, error } = useSWRNext('/api/orders/1')
  const { order } = data || {}

  return (
    <Layout pt={10} meta={{ title: 'Checkout dan pengiriman' }}>
      <BreadcrumbCart />

      <Stack spacing={10}>
        <Heading>Checkout dan pengiriman</Heading>
        {error && <Text>Gagal memuat data order</Text>}
        {!error && !data && <Text>Memuat data order...</Text>}
        {!error && data && order && (
          <Stack direction={['column', 'column', 'row']} spacing={5}>
            <ShipmentContainer order={order} />
            <ShipmentSummaryContainer order={order} />
          </Stack>
        )}
      </Stack>
    </Layout>
  )
}

export const ShipmentSummaryContainer = ({ order }) => {
  const {
    totalItems,
    totalPrice,
    totalDiscount,
    totalCalculatedPrice,
    totalShipmentCost,
    totalCalculatedBill,
  } = calculateEverything(order)

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
            <Text>{formatRupiah(totalCalculatedPrice)}</Text>
          </HStack>
          <HStack justify="space-between">
            <Text>Total Ongkos Kirim</Text>
            <Text>{formatRupiah(totalShipmentCost)}</Text>
          </HStack>
        </Stack>
        <Divider />
        <HStack justify="space-between">
          <Text>Total Tagihan</Text>
          <Text>{formatRupiah(totalCalculatedBill)}</Text>
        </HStack>
      </Stack>

      <NextLink href="/cart/payment" passHref>
        <Button as="a" colorScheme="orange">
          Pilih Pembayaran
        </Button>
      </NextLink>
    </Stack>
  )
}

export const ShipmentContainer = ({ order }) => {
  const myAddresses = [
    {
      id: 1,
      street: 'Jl. Monas No. 1',
      streetDetails: 'Tugu Emas',
      city: 'Jakarta',
      state: 'DKI Jakarta',
      zip: '12345',
      countryCode: 'ID',
    },
    {
      id: 2,
      street: 'Jl. Ancol No. 20',
      streetDetails: 'Patung Ikan',
      city: 'Jakarta',
      state: 'DKI Jakarta',
      zip: '12345',
      countryCode: 'ID',
    },
  ]

  const couriers = [
    { id: 1, name: 'Lalamove' },
    { id: 2, name: 'Deliveree' },
  ]

  const cardBackground = useColorModeValue('gray.100', 'gray.700')

  return (
    <Stack flex={1} minW="420px" spacing={10}>
      <Stack>
        <Heading as="h3" size="md">
          Pilih alamat pengiriman:
        </Heading>
        <Stack>
          {myAddresses.map((address) => {
            return (
              <Box
                key={address.id}
                id={address.id}
                p={3}
                bg={cardBackground}
                rounded="full"
              >
                <Text>{formatAddressComplete(address)}</Text>
              </Box>
            )
          })}
        </Stack>
      </Stack>

      <Stack>
        <Heading as="h3" size="md">
          Pilih kurir pengiriman:
        </Heading>
        <Stack>
          {couriers.map((courier) => {
            return (
              <Box key={courier.id} p={3} bg={cardBackground} rounded="full">
                <Text>{courier.name}</Text>
              </Box>
            )
          })}
        </Stack>
      </Stack>

      <Stack>
        <Heading as="h3" size="md">
          Ringkasan barang:
        </Heading>
        <Stack
          py={5}
          divider={<StackDivider />}
          spacing={5}
          align="stretch"
          maxW="720px"
        >
          {order?.businessOrderItems?.map((item, index) => {
            return (
              <BusinessOrderItem key={item.supplierProduct.id} item={item} />
            )
          })}
        </Stack>
      </Stack>
    </Stack>
  )
}

export const BusinessOrderItem = ({ item }) => {
  const itemDiscountedPrice =
    item.supplierProduct?.price -
    item.supplierProduct?.price * (item.supplierProduct?.discount / 100)
  const itemCalculatedPrice = item.quantity * itemDiscountedPrice

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
            <Text fontSize="xs" fontWeight="bold">
              {item.supplierProduct?.supplier?.name}
              <chakra.span opacity={0.5}>
                {' di '}
                {item.supplierProduct?.supplier?.addresses?.length &&
                  item.supplierProduct?.supplier?.addresses[0]?.city}
              </chakra.span>
            </Text>
            <Box>
              <Heading as="h2" size="md">
                {item.supplierProduct?.name}
              </Heading>
              <Heading as="h3" size="sm">
                {item.supplierProduct?.subname}
              </Heading>
            </Box>
            <SupplierProductPrice product={item.supplierProduct} />
          </Stack>
        </Stack>

        <Box>
          <Text>
            Kuantitas: <span>{item.quantity} barang</span>
          </Text>
          <Text>
            Berat: <span>{item.quantity * item.supplierProduct.weight} kg</span>
          </Text>
          <Text>
            Subtotal: <span>{formatRupiah(itemCalculatedPrice)}</span>
          </Text>
        </Box>
      </Stack>
    </Stack>
  )
}

export default CartShipmentPage
