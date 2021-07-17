import { useRouter } from 'next/router'
import { Box, Heading } from '@chakra-ui/react'

import { Layout } from '@qopnet/qopnet-ui'

const SupplierParamPage = () => {
  const router = useRouter()
  const { supplierParam } = router.query

  return (
    <Layout>
      <h1>One supplier page</h1>
      {supplierParam && <SupplierDetail supplierParam={supplierParam} />}
    </Layout>
  )
}

export const SupplierDetail = ({ supplierParam }) => {
  return (
    <Box>
      <Heading>{supplierParam}</Heading>
    </Box>
  )
}

export default SupplierParamPage
