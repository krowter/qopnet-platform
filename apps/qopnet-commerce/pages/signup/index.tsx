import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from 'use-supabase'
import { Layout } from '@qopnet/qopnet-ui'

import { SignUpForm } from '../../components'

const SignUpPage = () => {
  const user = useUser()
  const router = useRouter()
  useEffect(() => {
    if (user) {
      router.replace('/create-profile')
    }
  }, [user, router])

  return <Layout pt={10}>{!user && <SignUpForm />}</Layout>
}

export default SignUpPage
