import { Container, Box, BoxProps } from '@chakra-ui/react'

export function Layout(props: BoxProps) {
  return (
    <Container spacing={10} maxW={1200}>
      <Box minH="80vh" {...props}>
        {props.children}
      </Box>
    </Container>
  )
}

export default Layout
