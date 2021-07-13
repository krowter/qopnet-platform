import {
  Box,
  Flex,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'
import useSWR from 'swr'

import { DefaultLayout } from '../layouts'
import { User } from '@qopnet/shared-types'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export const UsersPage = () => {
  const { data: users, error } = useSWR('/api/users', fetcher)

  return (
    <DefaultLayout>
      <Box p={5}>
        <Flex alignItems="center">
          <Box h={5} w={5} borderRadius={20} bg="#4C2602" />
          <Text ml={5} fontWeight={700}>
            All users
          </Text>
          <Text ml={5} fontWeight={500}>
            {users ? users.length : 0} users
          </Text>
          <Box ml="auto" h={5} w={5} borderRadius={20} bg="#4C2602" />
        </Flex>

        <VStack id="users-all" mt={5} spacing={10}>
          {error && <div>Failed to load users</div>}
          {!users && <div>Loading users...</div>}
          {users && (
            <Table variant="simple" size="sm">
              <Tbody>
                {users.map((user: User, index: number) => {
                  //generates a random color -> #56eec7
                  const randomColor =
                    '#' + Math.floor(Math.random() * 16777215).toString(16)
                  return (
                    <Tr key={`${user?.profile?.name ?? ''}-${index}`}>
                      <Td>#{index}</Td>
                      <Td>
                        <Box
                          w={5}
                          h={5}
                          bgColor={randomColor}
                          borderRadius={20}
                        />
                      </Td>
                      <Td>{user?.profile?.handle}</Td>
                      <Td>{user?.profile?.name}</Td>
                      <Td>{user?.email}</Td>
                      <Td>{user?.profile?.phone}</Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          )}
        </VStack>
      </Box>
    </DefaultLayout>
  )
}
