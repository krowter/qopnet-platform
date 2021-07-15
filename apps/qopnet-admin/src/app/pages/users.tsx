import { Box, Flex, Table, Tbody, Td, Text, Tr, Stack } from '@chakra-ui/react'

import { User } from '@qopnet/shared-types'
import { DefaultLayout } from '../layouts'
import { useSWR } from '../utils/swr'

export const UsersPage = () => {
  const { data, error } = useSWR('/api/users')
  const { users } = data || []

  return (
    <DefaultLayout>
      <Box p={5}>
        <Flex alignItems="center">
          <Box h={5} w={5} borderRadius={20} bg="#4C2602" />
          <Text ml={5} fontWeight={700}>
            All users
          </Text>
          <Text ml={5} fontWeight={500}>
            {users ? users.length : 0} Users
          </Text>
          <Box ml="auto" h={5} w={5} borderRadius={20} bg="#4C2602" />
        </Flex>

        <Stack id="users-all" mt={5} spacing={10}>
          {error && <div>Gagal memuat para pengguna</div>}
          {!error && !users && <div>Memuat para pengguna...</div>}
          {users?.length && (
            <Table variant="simple" size="sm">
              <Tbody>
                {users.map((user: User, index: number) => {
                  // Generate random color with hexacode format -> #56eec7
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
        </Stack>
      </Box>
    </DefaultLayout>
  )
}
