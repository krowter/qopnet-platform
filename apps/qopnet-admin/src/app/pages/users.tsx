import { VStack } from '@chakra-ui/react'

import { DefaultLayout } from '../layouts'

export const Users = () => {
  return (
    <DefaultLayout>
      <VStack id="users-all" mt={20} spacing={10}>
        <h1>Users</h1>
      </VStack>
    </DefaultLayout>
  )
}
