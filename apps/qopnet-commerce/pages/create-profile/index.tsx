import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from 'use-supabase'
import { Layout } from '@qopnet/qopnet-ui'

import { CreateProfileForm } from '../../components'

export const CreateProfilePage = () => {
  const user = useUser()
  const router = useRouter()
  useEffect(() => {
    if (!user) {
      router.replace('/signin')
    }
  }, [user, router])

  return <Layout>{user && <CreateProfileForm />}</Layout>
}

export default CreateProfilePage
