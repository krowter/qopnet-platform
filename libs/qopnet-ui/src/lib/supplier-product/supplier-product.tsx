/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import NextLink from 'next/link'
import NextImage from 'next/image'
import { SupplierProduct, Supplier, Profile, Address } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime'
import {
  Box,
  ButtonGroup,
  Divider,
  Flex,
  Heading,
  IconButton,
  Button,
  ListItem,
  Input,
  SimpleGrid,
  Stack,
  Text,
  Link as ChakraLink,
  UnorderedList,
  useMediaQuery,
  useNumberInput,
  VStack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'

import {
  formatDateTime,
  formatImageUrl,
  formatWeight,
} from '@qopnet/util-format'
import { Icon } from '../icon/icon'

const env =
  process.env.NEXT_PUBLIC_ENV === 'production'
    ? 'production'
    : process.env.NEXT_PUBLIC_ENV === 'staging'
    ? 'staging'
    : 'development'

export const supplierProductCategories = [
  { name: 'all', text: 'Semua Produk', color: 'orange.500' },
  { name: 'cheap', text: 'Jaminan Murah', color: 'teal.500' },
  { name: 'saving', text: 'Hemat Waktu!', color: 'purple.500' },
  { name: 'promo', text: 'Spesial Promo', color: 'cyan.500' },
  { name: 'new', text: 'Terbaru', color: 'pink.300' },
  { name: 'organic', text: 'Organik', color: 'green.500' },
  { name: 'breakfast', text: 'Sarapan', color: 'orange.500' },
  { name: 'spice', text: 'Minyak, Bumbu, Saus', color: 'red.500' },
  { name: 'fruit', text: 'Buah Segar', color: 'yellow.500' },
  { name: 'vegetable', text: 'Sayuran', color: 'orange.500' },
  { name: 'carb', text: 'Beras, Mie, Roti', color: 'gray.500' },
  { name: 'protein', text: 'Protein', color: 'orange.900' },
  { name: 'dairy', text: 'Susu, Telur, Keju', color: 'orange.400' },
  { name: 'baby', text: 'Makanan Bayi', color: 'yellow.200' },
  { name: 'snack', text: 'Makanan Ringan', color: 'blue.500' },
]

const defaultSupplierProductImages = [
  'https://rryitovbrajppywbpmit.supabase.co/storage/v1/object/public/images/telur.jpg',
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
  href?: string
  product: SupplierProduct
}

export interface SupplierProductPriceProps {
  product: SupplierProduct
  fontSize?: string // sm, md, lg
}

export interface SupplierProductDetailProps {
  product: SupplierProduct & {
    supplier: Supplier & {
      owner: Profile
      addresses: Address[]
    }
    dimension?: {
      width: number
      height: number
      length: number
    }
  }
}

export const HomeProductCategory = (props: HomeProductCategoryProps) => {
  return (
    <VStack id={props.id} py={10} spacing={10}>
      <Heading as="h2" size="lg">
        Kategori Produk
      </Heading>
      <SimpleGrid spacing={5} columns={[3, 4, 8]}>
        {supplierProductCategories.map((category) => {
          return (
            <NextLink
              key={category.name}
              href={`/products/category/${category.name}`}
              passHref
            >
              <VStack as="a">
                <Text fontSize="4xl" color={category.color}>
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
  const { supplierProducts, error } = props

  return (
    <VStack id="home-product-special" spacing={10}>
      <Heading>Produk Pilihan</Heading>

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
    <SimpleGrid spacing={5} columns={[2, 3, 4, 5]} w="100%">
      {supplierProducts?.map((product, index) => {
        return (
          <SupplierProductCardLink
            key={product?.slug || index}
            // Can fix by combining SupplierProduct and Supplier
            // @ts-ignore
            href={`/${product?.supplier?.handle}/${product.slug}`}
            product={product}
          />
        )
      })}
    </SimpleGrid>
  )
}

export const SupplierProductCardLink = ({
  href,
  product,
}: SupplierProductCardProps) => {
  const productImages = product?.images as string[]
  const productImageThumbnail = productImages?.length
    ? productImages[0]
    : defaultSupplierProductImages[0]

  return (
    <NextLink href={href || `/products/${product?.slug}`} passHref>
      <Stack as="a" spacing={3} py={5}>
        {productImageThumbnail && (
          <NextImage
            src={formatImageUrl(env, productImageThumbnail)}
            alt={product?.name || 'Product image'}
            layout="responsive"
            width={300}
            height={300}
          />
        )}
        <Heading as="h3" size={'sm'}>
          {product?.name}
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
  if (product?.price) {
    return (
      <Text fontWeight="bold" fontSize={fontSize}>
        {formatPrice(product?.price)}
      </Text>
    )
  } else if (product?.priceMin && product?.priceMax) {
    return (
      <Text fontWeight="bold" fontSize={fontSize}>
        {formatPrice(product?.priceMin)} – {formatPrice(product?.priceMax)}
      </Text>
    )
  } else if (product?.priceMin) {
    return (
      <Text fontWeight="bold" fontSize={fontSize}>
        {formatPrice(product?.priceMin)}
      </Text>
    )
  } else if (product?.priceMax) {
    return (
      <Text fontWeight="bold" fontSize={fontSize}>
        {formatPrice(product?.priceMax)}
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
export const SupplierProductDetail = ({
  product,
}: SupplierProductDetailProps) => {
  const productImages =
    (product?.images as string[]) || defaultSupplierProductImages
  const firstProductImageUrl = productImages[0] as string

  const [isDesktop] = useMediaQuery('(min-width: 60em)')

  const { width, height, length } = product?.dimension || {
    width: 0,
    heigth: 0,
    length: 0,
  }
  const hasDimension = width || height || length

  return (
    <Stack spacing={20} align={!isDesktop ? 'center' : ''}>
      <Stack direction={isDesktop ? 'row' : 'column'} spacing={10}>
        <Stack id="product-images">
          {/* The first product image */}
          <Box display="inherit">
            <ChakraLink
              isExternal
              href={formatImageUrl(env, firstProductImageUrl)}
              display="block"
              className="next-image-container"
            >
              <NextImage
                src={formatImageUrl(env, firstProductImageUrl)}
                key={product?.slug + '-first'}
                alt={product?.name || 'First product image'}
                layout="fixed"
                width={420}
                height={420}
                loading="eager"
              />
            </ChakraLink>
          </Box>
          {/* The other product image */}
          <Stack direction="row" maxW="420px" overflowX="auto">
            {productImages
              .filter((imageUrl, index) => index !== 0)
              .map((imageUrl: string, index) => {
                return (
                  <Box
                    key={`${product?.slug}-${index}-${product?.id}`}
                    display="inherit"
                  >
                    <ChakraLink
                      isExternal
                      href={formatImageUrl(env, imageUrl)}
                      display="block"
                      className="next-image-container"
                    >
                      <NextImage
                        src={formatImageUrl(env, imageUrl)}
                        alt={product?.name || 'Small product image'}
                        layout="fixed"
                        width={100}
                        height={100}
                      />
                    </ChakraLink>
                  </Box>
                )
              })}
          </Stack>
        </Stack>

        <Stack id="product-info-sections" spacing={5} w="100%" maxW="500px">
          <Stack id="product-info-name-price">
            <Heading as="h2" size="lg">
              {product?.name}
            </Heading>

            <Stack id="product-price-unit" spacing={3}>
              {product?.subname && <Text>{product?.subname}</Text>}
              <Flex alignItems="center">
                <Box color="green.500">
                  <SupplierProductPrice product={product} fontSize="3xl" />
                </Box>
                {product?.weightDetails && (
                  <Text ml={3}> untuk {product?.weightDetails}</Text>
                )}
              </Flex>
            </Stack>
          </Stack>

          <Divider variant="dashed" />

          <SupplierProductCartModifier product={product} />

          <Divider variant="dashed" />

          <Stack id="product-detail">
            <Text>
              Kode SKU: <b>{product?.sku}</b>
            </Text>
            {product?.weight && product?.weightUnit && (
              <Text>
                Berat:{' '}
                <b>{formatWeight(product?.weight, product?.weightUnit)}</b>
              </Text>
            )}
          </Stack>

          <Divider variant="dashed" />

          <Stack>
            {product?.supplier?.handle && (
              <SupplierCardForProductLink supplier={product?.supplier} />
            )}
            <Text fontSize="xs">
              Dijual sejak <b>{formatDateTime(product?.createdAt)}</b>. Diubah
              sejak <b>{formatDateTime(product?.updatedAt)}</b>
            </Text>
          </Stack>
        </Stack>
      </Stack>

      <Divider />

      <Stack id="product-more-details" spacing={5} w="100%" maxW="500px">
        <Heading as="h4" size="lg">
          Rincian Produk
        </Heading>
        <Stack>
          <Heading as="h5" size="md">
            Deskripsi
          </Heading>
          {product?.description ? (
            <Text>{product?.description}</Text>
          ) : (
            <Text>Tidak ada deskripsi.</Text>
          )}
        </Stack>
        {hasDimension && (
          <Stack>
            <Heading as="h5" size="md">
              Ukuran
            </Heading>
            <Box>
              <UnorderedList>
                {width && <ListItem>Lebar: {width} cm</ListItem>}
                {height && <ListItem>Tingi: {height} cm</ListItem>}
                {length && <ListItem>Panjang: {length} cm</ListItem>}
              </UnorderedList>
            </Box>
          </Stack>
        )}
      </Stack>
    </Stack>
  )
}

export const SupplierCardForProductLink = ({
  supplier,
}: {
  supplier: Supplier & {
    owner: Profile
    addresses: Address[]
  }
}) => {
  return (
    <NextLink href={`/${supplier.handle}`} passHref>
      <Stack
        id="supplier-info"
        as="a"
        p={5}
        boxShadow="xs"
        rounded="base"
        bg={useColorModeValue('gray.50', 'gray.900')}
      >
        <Heading as="h4" size="md">
          {supplier.name}
        </Heading>
        {supplier?.owner && (
          <Text>
            Dimiliki oleh <b>{supplier?.owner?.name}</b>
          </Text>
        )}
        {supplier?.addresses && (
          <Text>
            Dikirim dari{' '}
            <b>
              {supplier.addresses[0].city}, {supplier.addresses[0].state}
            </b>
          </Text>
        )}
      </Stack>
    </NextLink>
  )
}

export const SupplierProductCartModifier = ({
  product,
}: {
  product: SupplierProduct
}) => {
  const toast = useToast()
  const productMinOrder = product?.minOrder || 1
  const productStock = product?.stock || 100

  // https://chakra-ui.com/docs/form/number-input#create-a-mobile-spinner
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: productMinOrder,
      min: productMinOrder,
      max: productStock,
    })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()

  // @ts-ignore
  const productSubTotal = input.value
  const formattedProductSubTotal = formatPrice(
    Number(product?.price) * Number(productSubTotal)
  )

  const handleAddToCart = () => {
    console.info({ productSubTotal })
    toast({
      title: `Berhasil menambah produk`,
      description: `Subtotal: ${formattedProductSubTotal}`,
    })
  }

  return (
    <Stack id="product-cart-modifier" alignItems="flex-start">
      <Heading as="h4" size="sm">
        Atur jumlah pembelian
      </Heading>

      <ButtonGroup spacing={3} alignItems="center" variant="outline">
        <IconButton {...dec} aria-label="Kurangi produk">
          <Icon name="minus" />
        </IconButton>
        <Input maxW="100px" {...input} />
        <IconButton {...inc} aria-label="Tambah produk">
          <Icon name="plus" />
        </IconButton>
      </ButtonGroup>

      <Text fontSize="xs">
        Pembelian min. {productMinOrder} pcs, max. {productStock} pcs
      </Text>

      <Text>
        <span>Subtotal: </span>
        <b>{formattedProductSubTotal}</b>
      </Text>

      <Button
        disabled={!productSubTotal}
        colorScheme="green"
        size="sm"
        leftIcon={<Icon name="plus" />}
        onClick={handleAddToCart}
      >
        Tambah Keranjang
      </Button>
    </Stack>
  )
}
