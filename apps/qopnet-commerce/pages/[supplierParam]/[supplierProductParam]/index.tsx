import { useRouter } from 'next/router'
import { Box, Heading } from '@chakra-ui/react'

import { Layout } from '@qopnet/qopnet-ui'

const SupplierProductParamPage = () => {
  const router = useRouter()
  const { supplierProductParam } = router.query

  return (
    <Layout pt={10}>
      <Heading>One product page</Heading>
      {supplierProductParam && <Box>{supplierProductParam}</Box>}
    </Layout>
  )
}

export default SupplierProductParamPage
