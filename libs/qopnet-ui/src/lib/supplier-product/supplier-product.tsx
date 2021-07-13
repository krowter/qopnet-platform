import NextImage from 'next/image'
import { Prisma, SupplierProduct } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime'
import { Box, Text, Heading, SimpleGrid, VStack, Stack } from '@chakra-ui/react'

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

export const HomeProductCategory = (props: HomeProductCategoryProps) => {
  return (
    <VStack id={props.id} py={20} spacing={10}>
      <Heading as="h2" size="lg">
        Kategori Produk
      </Heading>
      <SimpleGrid spacing={5} columns={4}>
        kategori
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
  const defaultImageSrc = 'https://ik.imagekit.io/qopnetlabs/images/kasur.jpg'

  return (
    <Stack spacing={3} p={5}>
      <NextImage
        src={defaultImageSrc}
        alt={product.name || 'Product image'}
        layout="responsive"
        width={300}
        height={300}
      />
      <Heading as="h3" size="md">
        {product.name}
      </Heading>
      <SupplierProductPrice product={product} />
    </Stack>
  )
}

export const SupplierProductPrice = ({ product }: SupplierProductCardProps) => {
  /**
   * 1. Price
   * 2. Min - Max
   * 3. Min
   * 4. Max
   */
  if (product.price) {
    return <Text fontSize="lg">{formatPrice(product.price)}</Text>
  } else if (product.priceMin && product.priceMax) {
    return (
      <Text>
        {formatPrice(product.priceMin)} - {formatPrice(product.priceMax)}
      </Text>
    )
  } else if (product.priceMin) {
    return <Text>{formatPrice(product.priceMin)}</Text>
  } else if (product.priceMax) {
    return <Text>{formatPrice(product.priceMax)}</Text>
  } else {
    return <Text>0</Text>
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
