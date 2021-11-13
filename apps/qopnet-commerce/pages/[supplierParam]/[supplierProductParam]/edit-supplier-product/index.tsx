import { useRouter } from 'next/router'
import { useUser } from 'use-supabase'

import { Layout } from '@qopnet/qopnet-ui'
import { SupplierProductForm } from '../../../../components'
import { useSWR } from '../../../../utils/swr'

export const EditSupplierProductPage = () => {
  const user = useUser()
  const router = useRouter()
  const { supplierParam, supplierProductParam } = router.query
  const { data, error } = useSWR(
    `/api/suppliers/products/${supplierProductParam}`
  )
  const { supplierProduct } = data || {}

  return (
    <Layout pt={10}>
      {user && supplierParam && (
        <SupplierProductForm
          supplierParam={supplierParam}
          supplierProductParam={supplierProductParam}
          supplierProduct={supplierProduct}
          formType="edit"
        />
      )}
    </Layout>
  )
}

export default EditSupplierProductPage
