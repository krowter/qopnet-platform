/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from 'swr'
import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react'

import { DefaultLayout } from '../layouts'
import { Header } from '../components'

export const Profiles = () => {
  const fetcher = (url: string) =>
    fetch(process.env.NX_API_URL + url).then((res) => res.json())

  const { data, error } = useSWR('/api/profiles', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <DefaultLayout>
      <Header>
        <Heading as="h1" size="md">
          Profiles
        </Heading>
        <Text>{data?.length} profiles</Text>
      </Header>
      <ProfileRows data={data} />
    </DefaultLayout>
  )
}

export const ProfileRows = ({ data }: { data: any[] }) => {
  const bg = useColorModeValue('gray.100', 'gray.900')

  return (
    <>
      {data.map((profile: any) => {
        return (
          <Box
            key={profile.id}
            bg={bg}
            w="100%"
            px={5}
            py={3}
            borderBottom="1px solid gray"
            borderColor="gray.700"
          >
            <Text>{profile.name}</Text>
          </Box>
        )
      })}
    </>
  )
}
