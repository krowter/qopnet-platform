import { Box, VStack } from '@chakra-ui/react'
import useSWR from 'swr'

import { DefaultLayout } from '../layouts'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

type Address = {
  city: string
  countryCode: string
  state: string
  street: string
  streetDetails: string
  zip: string
}

type Profile = {
  address: Address
  avatarUrl: string
  handle: string
  name: string
  phone: string
  userId: string
}

type Users = {
  email: string
  profile: Profile
}

export const Users = () => {
  const { data, error } = useSWR('/api/users', fetcher)
  console.log('data users:', data)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading ...</div>
  return (
    <DefaultLayout>
      <VStack id="users-all" mt={20} spacing={10}>
        <h1>Users</h1>
        {data.map((item: Users) => (
          <Box>
            <div>{item.email}</div>
            <div>{item.profile.name}</div>
            <div>{item.profile.phone}</div>
            <div>{item.profile.avatarUrl}</div>
            <div>{item.profile.handle}</div>
          </Box>
        ))}
      </VStack>
    </DefaultLayout>
  )
}
