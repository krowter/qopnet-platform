import { SupplierProduct } from '@prisma/client'
import { Box, Text, Heading, SimpleGrid, VStack } from '@chakra-ui/react'

export interface HomeProductCategoryProps {
  id?: string | ''
  supplierProducts: SupplierProduct[]
}

export function HomeProductCategory(props: HomeProductCategoryProps) {
  return (
    <VStack id={props.id} py={20} spacing={10}>
      <Heading as="h2" size="lg">
        Kategori Produk
      </Heading>
      <SimpleGrid spacing={5} columns={4}>
        {props.supplierProducts?.map((product, index) => {
          return (
            <Box key={product.slug || index} boxShadow="md" p={5}>
              <Heading as="h3" size="md">
                {product.name}
              </Heading>
              <Text>{product.description}</Text>
              <Text fontSize="lg">{product.price}</Text>
            </Box>
          )
        })}
      </SimpleGrid>
    </VStack>
  )
}

export default HomeProductCategory
