import { Box, Heading } from '@chakra-ui/react'

import { Layout, supplierProductCategories } from '@qopnet/qopnet-ui'
import { useRouter } from 'next/router'

const SupplierProductsCategoryPage = () => {
  const router = useRouter()
  const { categoryParam } = router.query

  return (
    <Layout pt={10}>
      {categoryParam && <CategoryContainer categoryParam={categoryParam} />}
    </Layout>
  )
}

export const CategoryContainer = ({ categoryParam }) => {
  const foundCategory = supplierProductCategories.find(
    (category) => category.name === categoryParam
  )

  return (
    <Box>
      <Heading>{foundCategory?.text ?? ''}</Heading>
    </Box>
  )
}

export default SupplierProductsCategoryPage
