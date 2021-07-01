/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from 'swr'
import { Box, Heading, Text } from '@chakra-ui/react'

export const Profiles = () => {
  const fetcher = (url: string) =>
    fetch(process.env.NX_API_URL + url).then((res) => res.json())

  const { data, error } = useSWR('/api/profiles', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div>
      <Heading as="h1" size="xl">
        Profiles
      </Heading>
      {data.map((profile: any) => {
        return (
          <Box key={profile.id} bg="gray.100" w="100%" p={4}>
            <Text>{profile.name}</Text>
          </Box>
        )
      })}
    </div>
  )
}
