/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import NextLink from 'next/link'
import NextImage from 'next/image'
import { SupplierProduct } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime'
import {
  Text,
  Heading,
  SimpleGrid,
  VStack,
  Stack,
  Box,
  Image as ChakraImage,
  Flex,
  Divider,
  Button,
  IconButton,
  HStack,
  ButtonGroup,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react'

import { Icon } from '@qopnet/qopnet-ui'

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

const defaultProductImages = [
  'https://ik.imagekit.io/qopnetlabs/images/telur.jpg',
  'https://ik.imagekit.io/qopnetlabs/images/kasur.jpg',
  'https://ik.imagekit.io/qopnetlabs/images/rangka-kasur.jpg',
]

export interface HomeProductCategoryProps {
  id?: string
}

export interface HomeProductSpecialProps {
  id?: string
  supplierProducts: SupplierProduct[]
  error: any
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
      <SimpleGrid spacing={5} columns={8}>
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
        <SimpleGrid spacing={5} columns={4}>
          {supplierProducts?.map((product, index) => {
            return (
              <SupplierProductCard
                key={product.slug || index}
                product={product}
              />
            )
          })}
        </SimpleGrid>
      )}
    </VStack>
  )
}

export const SupplierProductCard = ({ product }: SupplierProductCardProps) => {
  const productImages = product.images as string[]
  const productImageThumbnail = productImages?.length
    ? productImages[0]
    : defaultProductImages[0]

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
        <Heading as="h3" size="md" fontWeight="black">
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
  const productImages = (product?.images as string[]) || defaultProductImages
  // @ts-ignore
  const productImageFirst = productImages[0] as string

  return (
    <Box pt={10}>
      <Stack direction="row" spacing={10}>
        <Stack id="product-images" spacing={5}>
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
                <ChakraImage
                  key={`${product.slug}-${index}-${product.id}`}
                  src={imageUrl}
                  alt={product.name || 'Small product image'}
                  layout="fixed"
                  width={100}
                  height={100}
                />
              )
            })}
          </Stack>
        </Stack>

        <Stack id="product-info-sections" spacing={5}>
          <Stack id="product-info-name-price">
            <Heading as="h2">{product.name}</Heading>

            <Stack id="product-price-unit" spacing={0}>
              <Box color="green.500">
                <SupplierProductPrice product={product} fontSize="2xl" />
              </Box>
              <Text>Harga per 1 set. 22 kg per set</Text>
            </Stack>

            <ButtonGroup
              id="product-cart-modifier"
              spacing={5}
              alignItems="center"
              variant="ghost"
            >
              <IconButton aria-label="Kurangi produk">
                <Icon name="decrement" />
              </IconButton>
              <NumberInput defaultValue={0} max={10} clampValueOnBlur={false}>
                <NumberInputField w={100} />
              </NumberInput>
              <IconButton aria-label="Tambah produk">
                <Icon name="increment" />
              </IconButton>
            </ButtonGroup>
          </Stack>

          <Divider />

          <Stack id="product-detail">
            <Text>Kode SKU: {product.sku}</Text>
            <Text>Berat: 22 Kg</Text>
            <Text>{product.description}</Text>
          </Stack>

          <Divider />

          <Stack id="supplier-info">
            <Text>Toko Supplier: {product.supplierId}</Text>
            <Text>Pemilik: {product.ownerId}</Text>
            <Text>Dijual mulai {product.createdAt}</Text>
            <Text>Terakhir diubah {product.updatedAt}</Text>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}
