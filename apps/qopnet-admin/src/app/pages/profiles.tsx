/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Heading,
  Spinner,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import { DefaultLayout } from '../layouts'
import { Header } from '../components'
import { useSWR } from '../utils/swr'

export const Profiles = () => {
  const { data, error } = useSWR('/api/profiles')
  const { profiles } = data || []

  return (
    <DefaultLayout>
      <Header>
        <Heading as="h1" size="md">
          Profiles
        </Heading>
        <Text>{profiles?.length} profiles</Text>
      </Header>
      {error && <Box> Failed to load profiles</Box>}
      {!profiles && (
        <Box px={5} py={3}>
          <Spinner color="orange.500" />
        </Box>
      )}
      {profiles && (
        <Box>
          <ProfileRows profiles={profiles} />
        </Box>
      )}
    </DefaultLayout>
  )
}

export const ProfileRows = ({ profiles }: { profiles: any[] }) => {
  const bg = useColorModeValue('gray.50', 'gray.900')
  const border = useColorModeValue('gray.200', 'gray.700')

  if (!profiles) {
    return <div>No profiles</div>
  }
  return (
    <>
      {profiles.map((profile: any, index: number) => {
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
