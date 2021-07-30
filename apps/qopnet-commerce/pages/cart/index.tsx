import NextLink from 'next/link'
import NextImage from 'next/image'
import {
  Box,
  Button,
  chakra,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link,
  Stack,
  StackDivider,
  Tag,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import { Layout, Icon, SupplierProductPrice } from '@qopnet/qopnet-ui'
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
      <Stack spacing={10}>
        <Heading>Keranjang belanja</Heading>
        {error && <Text>Gagal memuat data order</Text>}
        {!error && !data && <Text>Memuat data order...</Text>}
        {!error && data && order && <CartContainer order={order} />}
      </Stack>
    </Layout>
  )
}

export const CartContainer = ({ order }) => {
  return (
    <Stack>
      <HStack>
        <Text>Status Pesanan:</Text>
        <Tag>{order.status}</Tag>
      </HStack>

      <Stack
        py={5}
        divider={
          <StackDivider
            borderColor={useColorModeValue('gray.100', 'gray.700')}
          />
        }
        spacing={5}
        align="stretch"
        maxW="720px"
      >
        {order?.businessOrderItems?.map((item, index) => {
          if (!item?.supplierProduct) {
            return <Box />
          }
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
        direction={['column', 'column', 'row']}
        spacing={10}
        justify="space-between"
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

        <Stack>
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
        </Stack>
      </Stack>
    </Stack>
  )
}

export default CartPage
