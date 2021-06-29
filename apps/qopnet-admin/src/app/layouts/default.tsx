import { Header } from '../components'
import { Box } from '@chakra-ui/react'

type Props = {
  children?: JSX.Element | JSX.Element[]
}
export const DefaultLayout: React.FC<Props> = ({ children }) => {
  return (
    <Box>
      <Header />
      {children}
    </Box>
  )
}
