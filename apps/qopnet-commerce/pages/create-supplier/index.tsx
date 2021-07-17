import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from 'use-supabase'

import { Layout } from '@qopnet/qopnet-ui'
import { CreateSupplierForm } from '../../components'

export const CreateSupplierPage = () => {
  const user = useUser()
  const router = useRouter()
  useEffect(() => {
    if (!user) {
      router.replace('/signin')
    }
  }, [user, router])

  return (
    <Layout>
      <CreateSupplierForm />
    </Layout>
  )
}

export default CreateSupplierPage
