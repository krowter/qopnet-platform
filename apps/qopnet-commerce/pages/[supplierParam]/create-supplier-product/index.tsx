import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from 'use-supabase'

import { Layout } from '@qopnet/qopnet-ui'
import { SupplierProductForm } from '../../../components'

export const CreateSupplierProductPage = () => {
  const user = useUser()
  const router = useRouter()

  // Don't redirect for now
  // useEffect(() => {
  //   if (!user) {
  //     router.replace('/signin')
  //   }
  // }, [user, router])

  const { supplierParam } = router.query

  return (
    <Layout pt={10}>
      {user && supplierParam && (
        <SupplierProductForm supplierParam={supplierParam} formType="create" />
      )}
    </Layout>
  )
}

export default CreateSupplierProductPage
