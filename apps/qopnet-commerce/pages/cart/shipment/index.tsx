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
import { useEffect, useState } from 'react'

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
        {/* <Text as="pre">{JSON.stringify(businessOrder, null, 2)}</Text> */}
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
          <Stack justify="space-between">
            <Text>Alamat dipilih</Text>
            <Text>{businessOrder?.shipmentAddress}</Text>
          </Stack>
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
  return (
    <Stack flex={1} minW="420px" spacing={10}>
      <AddressesContainer />
      <CouriersContainer />
      <BusinessOrderItemsContainer businessOrder={businessOrder} />
    </Stack>
  )
}

export const AddressesContainer = () => {
  // Fetch multiple addresses from my profile
  const { data, error } = useSWR('/api/profiles/my')
  const { profile, suppliers, wholesalers, merchants } = data || {}

  // Display addresses
  const [availableAddresses, setAvailableAddresses] = useState([])
  const [selectedAddressId, setSelectedAddressId] = useState('')

  // Only set addresses once data has been retrieved
  useEffect(() => {
    if (data) {
      // Should concat multiple addresses
      // const mySupplierAddresses = []
      setAvailableAddresses(profile?.addresses || [])

      // Default to set the first availableAddresses
      setSelectedAddressId(availableAddresses[0]?.id || '')
    }
  }, [data, profile, availableAddresses])

  // Handle select address option with just address id
  const handleSelectAddressOption = (addressId) => {
    setSelectedAddressId(addressId)
  }

  return (
    <Stack>
      <Heading as="h3" size="md">
        Pilih alamat pengiriman:
      </Heading>
      {error && <div>Gagal memuat daftar alamat</div>}
      {!error && !data && <div>Memuat daftar alamat...</div>}
      {!error && data && availableAddresses?.length < 1 && (
        <Stack>
          <Text>
            Anda belum memiliki alamat di profil atau entitas manapun.
          </Text>
        </Stack>
      )}
      {availableAddresses?.length > 0 && (
        <Stack>
          {availableAddresses?.map((address) => {
            return (
              <OptionBox
                key={address.id}
                id={`address-${address.id}`}
                selected={selectedAddressId === address.id}
                onClick={() => handleSelectAddressOption(address.id)}
              >
                <Text>{formatAddressComplete(address)}</Text>
              </OptionBox>
            )
          })}
        </Stack>
      )}
      {/* <Text as="pre">{JSON.stringify({ data }, null, 2)}</Text> */}
    </Stack>
  )
}

export const CouriersContainer = () => {
  // Fetch couriers
  const { data, error } = useSWR('/api/couriers')
  const { couriers } = data || {}

  // Display addresses
  const [availableCouriers, setAvailableCouriers] = useState([
    { id: '1', name: 'Lalamove' },
    { id: '2', name: 'Deliveree' },
  ])
  // Should be empty array if API Courier is available
  const [selectedCourierId, setSelectedCourierId] = useState('')

  // Only set couriers once data has been retrieved
  useEffect(() => {
    if (data) {
      setAvailableCouriers(couriers || [])
      // Default to set the first available courier
      setSelectedCourierId(availableCouriers[0]?.id || '')
    }
  }, [data, couriers, availableCouriers])

  // Handle select courier option with just courier id
  const handleSelectCourierOption = (courierId) => {
    setSelectedCourierId(courierId)
  }

  return (
    <Stack>
      <Heading as="h3" size="md">
        Pilih kurir pengiriman:
      </Heading>
      <Stack>
        {error && <div>Gagal memuat daftar kurir</div>}
        {!error && !data && <div>Memuat daftar kurir...</div>}
        {!error && data && availableCouriers?.length < 1 && (
          <Stack>
            <Text>Belum ada kurir yang tersedia.</Text>
          </Stack>
        )}
        {availableCouriers?.length > 0 &&
          availableCouriers?.map((courier) => {
            return (
              <OptionBox
                key={courier.id}
                id={`courier-${courier.id}`}
                selected={selectedCourierId === courier.id}
                onClick={() => handleSelectCourierOption(courier.id)}
              >
                <Text>{courier.name}</Text>
              </OptionBox>
            )
          })}
      </Stack>
    </Stack>
  )
}

export const BusinessOrderItemsContainer = ({ businessOrder }) => {
  return (
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
          return <BusinessOrderItem key={item.supplierProduct.id} item={item} />
        })}
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
