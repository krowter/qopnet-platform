/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import NextLink from 'next/link'
import NextImage from 'next/image'
import { SupplierProduct } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime'
import {
  Box,
  ButtonGroup,
  Divider,
  Flex,
  Heading,
  IconButton,
  Image as ChakraImage,
  ListItem,
  Input,
  NumberInput,
  NumberInputField,
  SimpleGrid,
  Stack,
  Text,
  UnorderedList,
  useMediaQuery,
  useNumberInput,
  VStack,
} from '@chakra-ui/react'

import { formatDateTime } from '@qopnet/util-format'
import { Icon } from '../icon/icon'
import { useState } from 'react'

const supplierProductCategories = [
  { name: 'all', text: 'Semua Produk', color: 'orange.500' },
  { name: 'cheap', text: 'Jaminan Murah', color: 'teal.500' },
  { name: 'saving', text: 'Hemat Waktu!', color: 'purple.500' },
  { name: 'promo', text: 'Spesial Promo', color: 'cyan.500' },
  { name: 'new', text: 'Terbaru', color: 'pink.300' },
  { name: 'organic', text: 'Organik', color: 'green.500' },
  { name: 'breakfast', text: 'Sarapan', color: 'orange.500' },
  { name: 'spices', text: 'Minyak, Bumbu, Saus', color: 'red.500' },
  { name: 'fruits', text: 'Buah Segar', color: 'yellow.500' },
  { name: 'vegetable', text: 'Sayuran', color: 'orange.500' },
  { name: 'carb', text: 'Beras, Mie, Roti', color: 'gray.500' },
  { name: 'protein', text: 'Protein', color: 'orange.900' },
  { name: 'dairy', text: 'Susu, Telur, Keju', color: 'yellow.200' },
  { name: 'baby', text: 'Makanan Bayi', color: 'orange.500' },
  { name: 'snack', text: 'Makanan Ringan', color: 'blue.500' },
]

const defaultSupplierProductImages = [
  'https://rryitovbrajppywbpmit.supabase.co/storage/v1/object/public/images/telur.jpg',
  'https://rryitovbrajppywbpmit.supabase.co/storage/v1/object/public/images/kasur.jpg',
  'https://rryitovbrajppywbpmit.supabase.co/storage/v1/object/public/images/rangka-telur.jpg',
]

export interface HomeProductCategoryProps {
  id?: string
}

export interface HomeProductSpecialProps {
  id?: string
  error: any
  supplierProducts: SupplierProduct[]
}

export interface SupplierProductsGridProps {
  supplierProducts: SupplierProduct[]
}
export interface SupplierProductCardProps {
  product: SupplierProduct
}

export interface SupplierProductPriceProps {
  product: SupplierProduct
  fontSize?: string // sm, md, lg
}

export interface SupplierProductContainer {
  supplierProductParam: string
  supplierProduct: SupplierProduct
}

export const HomeProductCategory = (props: HomeProductCategoryProps) => {
  return (
    <VStack id={props.id} py={20} spacing={10}>
      <Heading as="h2" size="lg">
        Kategori Produk
      </Heading>
      <SimpleGrid spacing={5} columns={[4, 6, 8]}>
        {supplierProductCategories.map((category) => {
          return (
            <NextLink
              key={category.name}
              href={`/products/${category.name}`}
              passHref
            >
              <VStack as="a">
                <Text fontSize="5xl" color={category.color}>
                  <Icon name={category.name} />
                </Text>
                <Text textAlign="center">{category.text}</Text>
              </VStack>
            </NextLink>
          )
        })}
      </SimpleGrid>
    </VStack>
  )
}

export const HomeProductSpecial = (props: HomeProductSpecialProps) => {
  const { id, supplierProducts, error } = props

  return (
    <VStack id={id} py={20} spacing={10}>
      <Heading as="h2" size="lg">
        Produk Pilihan
      </Heading>

      {error && <Text>Gagal mengambil produk pilihan</Text>}
      {!error && !supplierProducts && <Text>Memuat produk pilihan...</Text>}
      {!error && supplierProducts && (
        <SupplierProductsGrid supplierProducts={supplierProducts} />
      )}
    </VStack>
  )
}

export const SupplierProductsGrid = ({
  supplierProducts,
}: SupplierProductsGridProps) => {
  return (
    <SimpleGrid spacing={5} columns={[2, 2, 4]}>
      {supplierProducts?.map((product, index) => {
        return (
          <SupplierProductCard key={product.slug || index} product={product} />
        )
      })}
    </SimpleGrid>
  )
}

export const SupplierProductCard = ({ product }: SupplierProductCardProps) => {
  const productImages = product.images as string[]
  const productImageThumbnail = productImages?.length
    ? productImages[0]
    : defaultSupplierProductImages[0]

  return (
    <NextLink href={`/products/${product.slug}`} passHref>
      <Stack as="a" spacing={3} py={5}>
        {productImageThumbnail && (
          <NextImage
            src={productImageThumbnail}
            alt={product.name || 'Product image'}
            layout="responsive"
            width={300}
            height={300}
          />
        )}
        <Heading as="h3" size={'md'} fontWeight="black">
          {product.name}
        </Heading>
        <SupplierProductPrice product={product} />
      </Stack>
    </NextLink>
  )
}

export const SupplierProductPrice = ({
  product,
  fontSize = 'lg',
}: SupplierProductPriceProps) => {
  /**
   * 1. Price
   * 2. Min - Max
   * 3. Min
   * 4. Max
   */
  if (product.price) {
    return (
      <Text fontWeight="bold" fontSize={fontSize}>
        {formatPrice(product.price)}
      </Text>
    )
  } else if (product.priceMin && product.priceMax) {
    return (
      <Text fontWeight="bold" fontSize={fontSize}>
        {formatPrice(product.priceMin)} – {formatPrice(product.priceMax)}
      </Text>
    )
  } else if (product.priceMin) {
    return (
      <Text fontWeight="bold" fontSize={fontSize}>
        {formatPrice(product.priceMin)}
      </Text>
    )
  } else if (product.priceMax) {
    return (
      <Text fontWeight="bold" fontSize={fontSize}>
        {formatPrice(product.priceMax)}
      </Text>
    )
  } else {
    return (
      <Text fontWeight="bold" fontSize={fontSize}>
        Rp 0
      </Text>
    )
  }
}

export const formatPrice = (price: number | Decimal) => {
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  })
    .format(Number(price))
    .replace(/\D00$/, '')

  return formattedPrice
}

/**
 * Don't request here because this is a shared lib
 */
export const SupplierProductContainer = ({
  supplierProductParam,
  supplierProduct,
}: SupplierProductContainer) => {
  const product = supplierProduct
  const productImages =
    (product?.images as string[]) || defaultSupplierProductImages
  // @ts-ignore
  const productImageFirst = productImages[0] as string

  const [isDesktop] = useMediaQuery('(min-width: 60em)')

  return (
    <Stack pt={10} spacing={20}>
      <Stack direction={isDesktop ? 'row' : 'column'} spacing={10}>
        <Stack id="product-images">
          <Box display="inherit">
            <NextImage
              key={product.slug + '-first'}
              src={productImageFirst}
              alt={product.name || 'First product image'}
              layout="fixed"
              width={420}
              height={420}
            />
          </Box>
          <Stack direction="row">
            {productImages.map((imageUrl: string, index) => {
              return (
                <Box display="inherit">
                  <NextImage
                    key={`${product.slug}-${index}-${product.id}`}
                    src={imageUrl}
                    alt={product.name || 'Small product image'}
                    layout="fixed"
                    width={100}
                    height={100}
                  />
                </Box>
              )
            })}
          </Stack>
        </Stack>

        <Stack id="product-info-sections" spacing={5} w="100%">
          <Stack id="product-info-name-price">
            <Heading as="h2" size="lg">
              {product.name}
            </Heading>

            <Stack id="product-price-unit" spacing={3}>
              <Text>Detail tidak diketahui</Text>
              <Flex alignItems="center">
                <Box color="green.500">
                  <SupplierProductPrice product={product} fontSize="3xl" />
                </Box>
                <Text ml={3}> / 1 crate / 15 kg</Text>
              </Flex>
            </Stack>
          </Stack>

          <Divider />

          <SupplierProductCartModifier product={product} />

          <Divider />

          <Stack id="product-detail">
            <Text>
              Kode SKU: <b>{product.sku}</b>
            </Text>
            <Text>
              Berat: <b>Tidak diketahui</b>
            </Text>
            <Text>{product.description}</Text>
          </Stack>

          <Divider />

          <Stack id="supplier-info">
            <Text>
              Toko Supplier: <b>{product.supplierId}</b>
            </Text>
            <Text>
              Pemilik: <b>{product.ownerId}</b>
            </Text>
            <Text>
              Dikirim dari <b>Kota tidak diketahui</b>
            </Text>
            <Text>
              Dijual mulai <b>{formatDateTime(product.createdAt)}</b>
            </Text>
            <Text>
              Terakhir diubah <b>{formatDateTime(product.updatedAt)}</b>
            </Text>
          </Stack>
        </Stack>
      </Stack>

      <Divider />

      <Stack id="product-more-details">
        <Stack spacing={5}>
          <Heading as="h4" size="lg">
            Rincian Produk
          </Heading>
          <Stack>
            <Heading as="h5" size="md">
              Deskripsi
            </Heading>
            <Text>Produk ini sangat bagus.</Text>
          </Stack>
          <Stack>
            <Heading as="h5" size="md">
              Ukuran
            </Heading>
            <Box>
              <UnorderedList>
                <ListItem>Panjang: 200 cm</ListItem>
                <ListItem>Tinggi: 78 cm</ListItem>
                <ListItem>Lebar: 120 cm</ListItem>
              </UnorderedList>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

export const SupplierProductCartModifier = ({
  product,
}: {
  product: SupplierProduct
}) => {
  const maxValue = 10

  // https://chakra-ui.com/docs/form/number-input#create-a-mobile-spinner
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 0,
      min: 0,
      max: maxValue,
    })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()

  return (
    <Stack id="product-cart-modifier">
      <Heading as="h4" size="sm">
        Atur jumlah pembelian
      </Heading>

      <ButtonGroup spacing={3} alignItems="center" variant="outline">
        <IconButton {...dec} aria-label="Kurangi produk">
          <Icon name="decrement" />
        </IconButton>
        <Input maxW="100px" {...input} />
        <IconButton {...inc} aria-label="Tambah produk">
          <Icon name="increment" />
        </IconButton>
      </ButtonGroup>
      <Text fontSize="xs">Max. pembelian {maxValue} pcs</Text>
    </Stack>
  )
}
