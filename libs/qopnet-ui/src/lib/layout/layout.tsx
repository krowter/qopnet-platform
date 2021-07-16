import { NextSeo } from 'next-seo'
import { Container, Box } from '@chakra-ui/react'

export interface LayoutProps {
  meta?: {
    title?: string
    updatedAt?: string
  }
  children: JSX.Element | JSX.Element[]
}

export function Layout(props: LayoutProps) {
  const { meta, children } = props

  return (
    <Container spacing={10} maxW={1200}>
      {meta && <NextSeo title={`${meta?.title} - Qopnet`} />}
      <Box minH="80vh">{children}</Box>
    </Container>
  )
}

export default Layout
