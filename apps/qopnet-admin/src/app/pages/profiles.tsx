/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from 'swr'
import {
  Box,
  Heading,
  Spinner,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import { DefaultLayout } from '../layouts'
import { Header } from '../components'

export const Profiles = () => {
  const fetcher = (url: string) =>
    fetch(process.env.NX_API_URL + url).then((res) => res.json())

  const { data, error } = useSWR('/api/profiles', fetcher)

  return (
    <DefaultLayout>
      <Header>
        <Heading as="h1" size="md">
          Profiles
        </Heading>
        <Text>{data?.length} profiles</Text>
      </Header>

      {error ? (
        <Box>Failed to load profiles</Box>
      ) : !data ? (
        <Box px={5} py={3}>
          <Spinner color="orange.500" />
        </Box>
      ) : (
        <Box>
          <ProfileRows data={data} />
        </Box>
      )}
    </DefaultLayout>
  )
}

export const ProfileRows = ({ data }: { data: any[] }) => {
  const bg = useColorModeValue('gray.50', 'gray.900')
  const border = useColorModeValue('gray.200', 'gray.700')

  return (
    <>
      {data.map((profile: any, index: number) => {
        return (
          <Box
            key={profile.id}
            w="100%"
            px={5}
            py={3}
            bg={bg}
            borderBottom="1px solid gray"
            borderColor={border}
          >
            <Text>{profile.name}</Text>
          </Box>
        )
      })}
    </>
  )
}
