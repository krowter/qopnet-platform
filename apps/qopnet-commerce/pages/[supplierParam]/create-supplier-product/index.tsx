import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from 'use-supabase'
import { VStack, Heading, Text } from '@chakra-ui/react'

import { Layout } from '@qopnet/qopnet-ui'

export const CreateSupplierProductPage = () => {
  const user = useUser()
  const router = useRouter()
  useEffect(() => {
    if (!user) {
      router.replace('/signin')
    }
  }, [user, router])

  return <Layout pt={10}>{user && <CreateSupplierProductForm />}</Layout>
}

export const CreateSupplierProductForm = () => {
  return (
    <VStack>
      <Heading>Tambah Produk Supplier</Heading>
      <Text>Silakan lengkapi info produk baru untuk supplier ini</Text>
    </VStack>
  )
}

export default CreateSupplierProductPage
