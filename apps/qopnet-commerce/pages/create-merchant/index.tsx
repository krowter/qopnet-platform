import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from 'use-supabase'

import { Layout } from '@qopnet/qopnet-ui'

export const CreateMerchantPage = () => {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.replace('/signin')
    }
  }, [user, router])

  return <Layout pt={10}>{user && <p>Create merchant page</p>}</Layout>
}

export default CreateMerchantPage
