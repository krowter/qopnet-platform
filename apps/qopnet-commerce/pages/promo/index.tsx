import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { Layout } from '@qopnet/qopnet-ui'

export const CreatePromoPage = () => {
  const router = useRouter()
  useEffect(() => {
    router.replace('/')
  }, [router])

  return <Layout pt={10}><div></div></Layout>
}

export default CreatePromoPage
