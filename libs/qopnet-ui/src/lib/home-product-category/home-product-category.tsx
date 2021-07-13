import { SupplierProduct } from '@prisma/client'
import { Box, Heading } from '@chakra-ui/react'

export interface HomeProductCategoryProps {
  id?: string | ''
  supplierProducts: SupplierProduct[]
}

export function HomeProductCategory(props: HomeProductCategoryProps) {
  return (
    <Box id={props.id}>
      <Heading as="h2" size="xl">
        Kategori Produk
      </Heading>
      {props.supplierProducts?.map((product, index) => {
        return <Box key={product.slug || index}>{product.name}</Box>
      })}
    </Box>
  )
}

export default HomeProductCategory
