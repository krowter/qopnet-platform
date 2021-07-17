import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from 'use-supabase'
import { Layout } from '@qopnet/qopnet-ui'

import { SignInForm } from '../../components'

const SignInPage = () => {
  const user = useUser()
  const router = useRouter()
  useEffect(() => {
    if (user) {
      router.replace('/dashboard')
    }
  }, [user, router])

  return (
    <Layout>
      <SignInForm />
    </Layout>
  )
}

export default SignInPage
