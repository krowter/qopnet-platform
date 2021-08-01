import { Flex, Box } from '@chakra-ui/react'

import { Sidebar } from '../components'

type Props = {
  children?: JSX.Element | JSX.Element[]
}

export const DefaultLayout: React.FC<Props> = ({ children }) => {
  return (
    <Flex>
      <Sidebar />
      <Box w="100%" marginLeft={{ base: '20px', md: '250px' }}>
        {children}
      </Box>
    </Flex>
  )
}
