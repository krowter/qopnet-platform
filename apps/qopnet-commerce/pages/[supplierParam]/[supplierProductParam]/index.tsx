import { useRouter } from 'next/router'
import { HStack, Spinner, Text } from '@chakra-ui/react'

import { Layout, SupplierProductDetail } from '@qopnet/qopnet-ui'
import { useSWR } from '../../../utils/swr'

const SupplierParamSlashSupplierProductParamPage = () => {
  const router = useRouter()
  const { supplierParam, supplierProductParam } = router.query

  return (
    <Layout pt={5}>
      {supplierParam && supplierProductParam && (
        <SupplierProductContainer supplierProductParam={supplierProductParam} />
      )}
    </Layout>
  )
}

export const SupplierProductContainer = ({ supplierProductParam }) => {
  // Although this is GET /api/suppliers/:supplierParam/:supplierProductParam
  // We can still GET /api/suppliers/products/:supplierProductParam
  const { data, error } = useSWR(
    `/api/suppliers/products/${supplierProductParam}`
  )
  const { supplierProduct } = data || {}

  return (
    <>
      {error && <Text>Gagal memuat produk supplier</Text>}
      {!error && !data && (
        <HStack>
          <Spinner />
          <Text>Memuat produk supplier...</Text>
        </HStack>
      )}
      {!error && data && <SupplierProductDetail product={supplierProduct} />}
    </>
  )
}

export default SupplierParamSlashSupplierProductParamPage
