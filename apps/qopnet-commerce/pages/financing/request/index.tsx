import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from 'use-supabase'
import { Text, Stack, Heading, HStack, Spinner } from '@chakra-ui/react'

import { Layout } from '@qopnet/qopnet-ui'
import { useSWR } from '../../../utils/swr'

export const FinancingRequestPage = () => {
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
    <Layout
      pt={10}
      meta={{
        title: 'Ajukan pinjaman',
        description: 'Daftar untuk mengajukan pinjaman',
      }}
    >
      {error && <Text>Gagal memuat profil</Text>}
      {!error && !data && (
        <HStack>
          <Spinner />
          <Text>Memuat profil dan info pengajuan...</Text>
        </HStack>
      )}
      {!error && data && user && <RequestFundForm profile={profile} />}
    </Layout>
  )
}

export const RequestFundForm = ({ profile }) => {
  return (
    <Stack>
      <Heading>Daftar untuk mengajukan pinjaman</Heading>
      <Stack>
        <Text>Anda akan mengajukan dengan informasi berikut</Text>
      </Stack>
    </Stack>
  )
}

export default FinancingRequestPage
