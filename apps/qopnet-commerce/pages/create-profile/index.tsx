import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from 'use-supabase'
import { Text } from '@chakra-ui/react'

import { Layout } from '@qopnet/qopnet-ui'
import { CreateProfileForm } from '../../components'
import { useSWR } from '../../utils/swr'

export const CreateProfilePage = () => {
  const user = useUser()
  const router = useRouter()
  useEffect(() => {
    if (!user) {
      router.push('/signin')
    }
  }, [user, router])

  const { data, error } = useSWR('/api/profiles/my')
  const { profile } = data || {}

  return (
    <Layout pt={10}>
      {/* {error && <Text>Gagal memuat formulir profil</Text>} */}
      {user && <CreateProfileForm user={user} profile={profile} />}
    </Layout>
  )
}

export default CreateProfilePage
