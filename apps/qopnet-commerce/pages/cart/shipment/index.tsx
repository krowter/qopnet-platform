import NextLink from 'next/link'
import NextImage from 'next/image'
import {
  Box,
  Button,
  chakra,
  Divider,
  Heading,
  HStack,
  Link as ChakraLink,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import {
  Layout,
  Icon,
  SupplierProductPrice,
  OptionBox,
} from '@qopnet/qopnet-ui'
import {
  calculateCart,
  formatRupiah,
  formatAddressComplete,
} from '@qopnet/util-format'
import { BreadcrumbCart } from '../../../components'
import { useSWR } from '../../../utils'
import { useState } from 'react'

/**
 * /cart/shipment
 */
export const CartShipmentPage = () => {
  const { data, error } = useSWR('/api/business/orders/my/cart')
  const { businessOrder } = data || {}

  return (
    <Layout pt={10} meta={{ title: 'Checkout dan pengiriman' }}>
      <BreadcrumbCart />

      <Stack spacing={10}>
        <Heading>Checkout dan pengiriman</Heading>
        {error && <Text>Gagal memuat data order</Text>}
        {!error && !data && <Text>Memuat data order...</Text>}
        {!error && data && businessOrder && (
          <Box>
            {data?.meta?.recordCount?.businessOrderItems > 0 ? (
              <Stack direction={['column', 'column', 'row']} spacing={5}>
                <ShipmentContainer businessOrder={businessOrder} />
                <ShipmentSummaryContainer businessOrder={businessOrder} />
              </Stack>
            ) : (
              <Stack align="flex-start">
                <Text>
                  Maaf Anda belum bisa checkout dan mengatur pengiriman, karena
                  keranjang belanja Anda masih kosong.
                </Text>
                <NextLink href="/shop" passHref>
                  <Button as="a" colorScheme="orange">
                    Lanjut belanja dahulu
                  </Button>
                </NextLink>
              </Stack>
            )}
          </Box>
        )}
      </Stack>
    </Layout>
  )
}

export const ShipmentSummaryContainer = ({ businessOrder }) => {
  const {
    totalItems,
    totalPrice,
    totalDiscount,
    totalCalculatedPrice,
    totalShipmentCost,
    totalCalculatedBill,
  } = calculateCart(businessOrder)

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

      <Stack id="businessOrder-calculation" spacing={5}>
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

export const ShipmentContainer = ({ businessOrder }) => {
  // Fetch multiple addresses from my profile
  const { data, error } = useSWR('/api/profiles/my')
  const { profile, suppliers } = data || {}

  // Display addresses
  const myAddresses = profile?.addresses || []
  const [selectedAddressId, setSelectedAddressId] = useState(
    myAddresses ? myAddresses[0]?.id : ''
  )

  // DIsplay couriers
  const couriers = [
    { id: 1, name: 'Lalamove' },
    { id: 2, name: 'Deliveree' },
  ]
  const selectedCourierId = 2

  return (
    <Stack flex={1} minW="420px" spacing={10}>
      <Stack>
        <Heading as="h3" size="md">
          Pilih alamat pengiriman:
        </Heading>
        <Stack>
          {myAddresses.map((address) => {
            return (
              <OptionBox
                key={address.id}
                id={`address-${address.id}`}
                selected={selectedAddressId === address.id}
              >
                <Text>{formatAddressComplete(address)}</Text>
              </OptionBox>
            )
          })}
          {/* <Text as="pre">{JSON.stringify({ data, myAddresses }, null, 2)}</Text> */}
        </Stack>
      </Stack>

      <Stack>
        <Heading as="h3" size="md">
          Pilih kurir pengiriman:
        </Heading>
        <Stack>
          {couriers.map((courier) => {
            return (
              <OptionBox
                key={courier.id}
                id={`courier-${courier.id}`}
                selected={selectedCourierId === courier.id}
              >
                <Text>{courier.name}</Text>
              </OptionBox>
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
          {businessOrder?.businessOrderItems?.map((item, index) => {
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
            {item.supplier?.name && (
              <NextLink href={`/${item.supplier?.handle}`} passHref>
                <Text as="a" fontSize="xs" fontWeight="bold">
                  {item.supplier?.name}
                  {item.supplier?.addresses?.length > 0 && (
                    <chakra.span opacity={0.5}>
                      {' di '}
                      {item.supplier?.addresses[0]?.city}
                    </chakra.span>
                  )}
                </Text>
              </NextLink>
            )}
            <NextLink
              passHref
              href={`/${item.supplier?.handle}/${item.supplierProduct?.slug}`}
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
