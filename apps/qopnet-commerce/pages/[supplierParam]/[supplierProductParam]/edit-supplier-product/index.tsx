import { useRouter } from 'next/router'
import { useUser } from 'use-supabase'

import { Layout } from '@qopnet/qopnet-ui'
import { SupplierProductForm } from '../../../../components'
import { useSWR } from '../../../../utils/swr'

export const EditSupplierProductPage = () => {
  const user = useUser()
  const router = useRouter()
  const { supplierParam, supplierProductParam } = router.query

  return (
    <Layout pt={10}>
      {user && supplierParam && supplierProductParam && (
        <EditSupplierProductContainer
          user={user}
          supplierParam={supplierParam}
          supplierProductParam={supplierProductParam}
        />
      )}
    </Layout>
  )
}

export const EditSupplierProductContainer = ({
  user,
  supplierParam,
  supplierProductParam,
}) => {
  const { data, error } = useSWR(
    `/api/suppliers/products/${supplierProductParam}`
  )
  const { supplierProduct } = data || {}

  return (
    <>
      {!data && error && <p>Gagal memuat data produk</p>}
      {user && data && !error && supplierParam && supplierProduct && (
        <SupplierProductForm
          // user={user}
          supplierParam={supplierParam}
          supplierProductParam={supplierProductParam}
          supplierProduct={supplierProduct}
          formType="edit"
        />
      )}
    </>
  )
}

export default EditSupplierProductPage
