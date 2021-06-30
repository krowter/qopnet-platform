import { Sidebar } from '../components'
import { Flex, Box } from '@chakra-ui/react'

type Props = {
  children?: JSX.Element | JSX.Element[]
}

export const DefaultLayout: React.FC<Props> = ({ children }) => {
  return (
    <Flex>
      <Sidebar />
      <Box>{children}</Box>
    </Flex>
  )
}
