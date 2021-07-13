import NextLink from 'next/link'
import NextImage from 'next/image'
import { SupplierProduct } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime'
import { Text, Heading, SimpleGrid, VStack, Stack } from '@chakra-ui/react'

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

export interface HomeProductCategoryProps {
  id?: string | ''
  supplierProducts: SupplierProduct[]
}

export interface HomeProductSpecialProps {
  id?: string | ''
  supplierProducts: SupplierProduct[]
}

export interface SupplierProductCardProps {
  product: SupplierProduct
}

export interface SupplierProductPriceProps {
  product: SupplierProduct
  fontSize?: string // sm, md, lg
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
  return (
    <VStack id={props.id} py={20} spacing={10}>
      <Heading as="h2" size="lg">
        Produk Pilihan
      </Heading>
      <SimpleGrid spacing={5} columns={4}>
        {props.supplierProducts?.map((product, index) => {
          return (
            <SupplierProductCard
              key={product.slug || index}
              product={product}
            />
          )
        })}
      </SimpleGrid>
    </VStack>
  )
}

export const SupplierProductCard = ({ product }: SupplierProductCardProps) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const productImageFirst = product.images[0]
  const defaultImages = [
    'https://ik.imagekit.io/qopnetlabs/images/kasur.jpg',
    'https://ik.imagekit.io/qopnetlabs/images/rangka-kasur.jpg',
  ]

  return (
    <NextLink href={`/products/${product.slug}`} passHref>
      <Stack as="a" spacing={3} py={5}>
        <NextImage
          src={productImageFirst || defaultImages[1]}
          alt={product.name || 'Product image'}
          layout="responsive"
          width={300}
          height={300}
        />
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
        {formatPrice(product.priceMin)} - {formatPrice(product.priceMax)}
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
