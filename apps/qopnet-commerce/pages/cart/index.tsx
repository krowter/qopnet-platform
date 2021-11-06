import { useState, useEffect } from 'react'
import NextLink from 'next/link'
import NextImage from 'next/image'
import {
  Box,
  Button,
  chakra,
  Heading,
  HStack,
  IconButton,
  Link as ChakraLink,
  Stack,
  Input,
  StackDivider,
  Divider,
  Flex,
  Tag,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { mutate } from 'swr'
import { useForm } from 'react-hook-form'
import { supabase } from '@qopnet/util-supabase'
import { useRouter } from 'next/router'

import { Layout, Icon, SupplierProductPrice } from '@qopnet/qopnet-ui'
import {
  formatBusinessOrderStatus,
  formatRupiah,
  calculateCart,
} from '@qopnet/util-format'
import { BreadcrumbCart } from '../../components'
import { useSWR, postToAPI, requestToAPI } from '../../utils'

/**
 * /cart
 *
 * Shopping Cart
 *
 * Even though this is the Cart page,
 * the API is using /api/business/orders/mycart
 * or similar with /api/business/orders/:businessOrderId
 * because BusinessCart is just a draft BusinessOrder
 */
export const CartPage = () => {
  const router = useRouter()

  const isLoggedIn = Boolean(supabase.auth.user())

  const { data, error } = useSWR(
    isLoggedIn ? '/api/business/orders/my/cart' : null
  )

  const { businessOrder } = data || {}

  // Try to create my cart if my cart does not exist yet
  // Or when there is an error
  useEffect(() => {
    if (isLoggedIn) {
      const createMyCart = async () => {
        const { businessOrder } = await postToAPI(
          '/api/business/orders/my/cart',
          {}
        )
        // console.info({ businessOrder })
      }

      if (error) {
        createMyCart()
      }
    } else {
      router.push('/')
    }
  }, [error, isLoggedIn])

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
        {error && <Text>Gagal memuat data keranjang untuk order</Text>}
        {!error && !data && <Text>Memuat data keranjang untuk order...</Text>}
        {!error && data && businessOrder && (
          <Box>
            {data?.meta?.recordCount?.businessOrderItems > 0 ? (
              <Stack direction={['column', 'column', 'row']}>
                <CartContainer businessOrder={businessOrder} />
                <CartSummaryContainer businessOrder={businessOrder} />
              </Stack>
            ) : (
              <Stack align="flex-start">
                <Text>Maaf keranjang belanja Anda masih kosong.</Text>
                <NextLink href="/shop" passHref>
                  <Button as="a" colorScheme="orange">
                    Lanjut belanja dahulu
                  </Button>
                </NextLink>
              </Stack>
            )}
          </Box>
        )}
        {/* <Text as="pre">{JSON.stringify(data, null, 2)}</Text> */}
      </Stack>
    </Layout>
  )
}

/**
 * Most of them should be calculated in the backend/API
 */
export const CartSummaryContainer = ({ businessOrder }) => {
  const { totalItems, totalPrice, totalDiscount, totalCalculatedPrice } =
    calculateCart(businessOrder)

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

      <Stack id="business-order-calculation" spacing={5}>
        <Stack>
          <HStack justify="space-between">
            <Text>Total Harga ({totalItems} barang)</Text>
            <Text>{formatRupiah(totalPrice)}</Text>
          </HStack>
          {totalDiscount > 0 && (
            <HStack justify="space-between">
              <Text>Total Diskon Barang</Text>
              <Text>-{formatRupiah(totalDiscount)}</Text>
            </HStack>
          )}
        </Stack>
        <Divider />
        <HStack justify="space-between">
          <Text>Total Harga (Setelah Diskon)</Text>
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

export const CartContainer = ({ businessOrder }) => {
  const [businessOrderStatusText, statusColor] = formatBusinessOrderStatus(
    businessOrder?.status
  )

  return (
    <Stack flex={1} minW="420px">
      <HStack>
        <Text>Status Pesanan:</Text>
        <Tag colorScheme={statusColor}>{businessOrderStatusText}</Tag>
      </HStack>

      <Stack
        py={5}
        divider={<StackDivider />}
        spacing={5}
        align="stretch"
        maxW="720px"
      >
        {businessOrder?.businessOrderItems?.map((item, index) => {
          return (
            <BusinessOrderItem key={item?.supplierProduct?.id} item={item} />
          )
        })}
      </Stack>
    </Stack>
  )
}

export const BusinessOrderItem = ({ item }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmitCustomQuantity = (data) => {
    handleCustomQuantityBusinessOrderItem(
      item.id,
      parseInt(data.customQuantity)
    )
  }

  // Optimistic UI when DELETE
  const handleDeleteBusinessOrderItem = async (itemId) => {
    try {
      mutate(
        '/api/business/orders/my/cart',
        async (data) => {
          const filtered = data?.businessOrder?.businessOrderItems?.filter(
            (item) => item.id !== itemId
          )
          return {
            ...data,
            businessOrder: {
              ...data.businessOrder,
              businessOrderItems: [...filtered],
            },
          }
        },
        false
      )
      await requestToAPI('PATCH', '/api/business/orders/my/cart/item', {
        action: 'DELETE',
        id: itemId,
      })
      mutate('/api/business/orders/my/cart')
    } catch (error) {
      console.error({ error })
    }
  }

  // Optimistic UI when INCREMENT
  const handleIncrementBusinessOrderItem = async (itemId) => {
    try {
      mutate(
        '/api/business/orders/my/cart',
        (data) => {
          const filtered = data?.businessOrder?.businessOrderItems?.map(
            (item) => {
              if (item.id === itemId) {
                item.quantity = item.quantity + 1
              }
              return item
            }
          )
          return {
            ...data,
            businessOrder: {
              ...data.businessOrder,
              businessOrderItems: [...filtered],
            },
          }
        },
        false
      )
      await requestToAPI('PATCH', '/api/business/orders/my/cart/item', {
        action: 'INCREMENT',
        id: itemId,
        quantity: 1,
      })
      mutate('/api/business/orders/my/cart')
    } catch (error) {
      console.error({ error })
    }
  }

  // Optimistic UI when DECREMENT
  const handleDecrementBusinessOrderItem = async (itemId) => {
    try {
      mutate(
        '/api/business/orders/my/cart',
        (data) => {
          const filtered = data?.businessOrder?.businessOrderItems?.map(
            (item) => {
              if (item.id === itemId) {
                item.quantity = item.quantity - 1
              }
              return item
            }
          )
          return {
            ...data,
            businessOrder: {
              ...data.businessOrder,
              businessOrderItems: [...filtered],
            },
          }
        },
        false
      )
      await requestToAPI('PATCH', '/api/business/orders/my/cart/item', {
        action: 'DECREMENT',
        id: itemId,
        quantity: 1,
      })
      mutate('/api/business/orders/my/cart')
    } catch (error) {
      console.error({ error })
    }
  }

  const handleCustomQuantityBusinessOrderItem = async (
    itemId,
    customQuantity
  ) => {
    try {
      mutate(
        '/api/business/orders/my/cart',
        (data) => {
          const filtered = data?.businessOrder?.businessOrderItems?.map(
            (item) => {
              if (item.id === itemId) {
                item.quantity = customQuantity
              }
              return item
            }
          )
          return {
            ...data,
            businessOrder: {
              ...data.businessOrder,
              businessOrderItems: [...filtered],
            },
          }
        },
        false
      )
      await requestToAPI('PATCH', '/api/business/orders/my/cart/item', {
        action: 'CUSTOM_QUANTITY',
        id: itemId,
        quantity: customQuantity,
      })
      mutate('/api/business/orders/my/cart')
    } catch (error) {
      console.error({ error })
    }
  }

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
            <NextLink
              href={`/${item.supplier?.handle}/${item.supplierProduct?.slug}`}
              passHref
            >
              <Box as="a" className="next-image-container">
                <NextImage
                  src={item.supplierProduct?.images[0]}
                  key={item.supplierProduct?.slug}
                  alt={item.supplierProduct?.name}
                  layout="fixed"
                  width={100}
                  height={100}
                />
              </Box>
            </NextLink>
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

        <HStack>
          <IconButton
            className="increment-item"
            aria-label="Tambah jumlah barang"
            variant="ghost"
            icon={<Icon name="increment" />}
            onClick={() => handleIncrementBusinessOrderItem(item.id)}
          />
          <IconButton
            className="decrement-item"
            aria-label="Kurangi jumlah barang"
            variant="ghost"
            icon={<Icon name="decrement" />}
            onClick={() => handleDecrementBusinessOrderItem(item.id)}
            disabled={item.quantity <= 1}
          />
          {/* Use form because we have input and suibmit button */}
          <form onSubmit={handleSubmit(onSubmitCustomQuantity)}>
            <Flex>
              <Input
                type="number"
                textAlign="center"
                w="100px"
                fontSize="lg"
                defaultValue={item.quantity}
                {...register('customQuantity', {
                  required: true,
                  min: 1,
                  // max: item.stock
                })}
              />
              <IconButton
                type="submit"
                aria-label="Konfirmasi jumlah barang"
                colorScheme="green"
                variant="ghost"
                icon={<Icon name="checkmark" />}
                // disabled={item.quantity <= 1}
              />
            </Flex>
          </form>

          <IconButton
            className="delete-item"
            aria-label="Hapus barang"
            variant="ghost"
            colorScheme="red"
            icon={<Icon name="delete" />}
            onClick={() => handleDeleteBusinessOrderItem(item.id)}
          />
        </HStack>
      </Stack>
    </Stack>
  )
}

export default CartPage
