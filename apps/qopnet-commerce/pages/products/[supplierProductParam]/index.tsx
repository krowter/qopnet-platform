import { useRouter } from 'next/router'
import { Text } from '@chakra-ui/react'

import { Layout, SupplierProductContainer } from '@qopnet/qopnet-ui'
import { useSWR } from '../../../utils/swr'

const SupplierProductParamPage = () => {
  const router = useRouter()
  const { supplierProductParam } = router.query
  const { data, error } = useSWR(
    `/api/suppliers/products/${supplierProductParam}`
  )

  return (
    <Layout>
      {error && <Text>Gagal memuat produk</Text>}
      {!error && !data && <Text>Memuat produk...</Text>}
      {supplierProductParam && data && (
        <SupplierProductContainer
          supplierProductParam={supplierProductParam as string}
          supplierProduct={data.supplierProduct}
        />
      )}
    </Layout>
  )
}

export default SupplierProductParamPage
