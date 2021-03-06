import { useRouter } from 'next/router'
import { HStack, Spinner, Text } from '@chakra-ui/react'

import { Layout, SupplierProductDetail } from '@qopnet/qopnet-ui'
import { useSWR, putToAPI } from '../../../utils'

const SupplierProductParamPage = () => {
  const router = useRouter()
  const { supplierProductParam } = router.query

  return (
    <Layout pt={10}>
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
      {error && <Text>Gagal memuat produk supplier</Text>}
      {!error && !data && (
        <HStack>
          <Spinner />
          <Text>Memuat produk supplier...</Text>
        </HStack>
      )}
      {!error && data && (
        <SupplierProductDetail
          product={supplierProduct}
          useSWR={useSWR}
          putToAPI={putToAPI}
        />
      )}
    </>
  )
}

export default SupplierProductParamPage
