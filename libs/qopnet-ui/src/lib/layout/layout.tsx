import { Container, Box } from '@chakra-ui/react'

export interface LayoutProps {
  children: JSX.Element | JSX.Element[]
}

export function Layout(props: LayoutProps) {
  const { children } = props

  return (
    <Container spacing={10} maxW={1200}>
      <Box height="80vh">{children}</Box>
    </Container>
  )
}

export default Layout
