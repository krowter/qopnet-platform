import { useRouter } from 'next/router'
import { Text } from '@chakra-ui/react'

import { Layout, SupplierProductDetail } from '@qopnet/qopnet-ui'
import { useSWR } from '../../../utils/swr'

const SupplierProductParamPage = () => {
  const router = useRouter()
  const { supplierProductParam } = router.query

  return (
    <Layout>
      {supplierProductParam && (
        <SupplierProductContainer supplierProductParam={supplierProductParam} />
      )}
    </Layout>
  )
}

export const SupplierProductContainer = ({ supplierProductParam }) => {
  const { data, error } = useSWR(
    `/api/suppliers/products/${supplierProductParam}`
  )
  const { supplierProduct } = data || {}

  return (
    <>
      {error && <Text>Gagal memuat produk</Text>}
      {!error && !data && <Text>Memuat produk...</Text>}
      {!error && data && <SupplierProductDetail product={supplierProduct} />}
    </>
  )
}

export default SupplierProductParamPage
