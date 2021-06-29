import { Box } from '@chakra-ui/react'

type Props = {
  children?: JSX.Element | JSX.Element[]
}
export const BlankLayout: React.FC<Props> = ({ children }) => {
  return <Box>{children}</Box>
}
