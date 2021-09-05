import { NextSeo } from 'next-seo'
import { Container, Box, BoxProps } from '@chakra-ui/react'

export interface LayoutProps {
  meta?: {
    title?: string
    description?: string
    updatedAt?: string
  }
  children: JSX.Element | JSX.Element[]
}

export function Layout(props: LayoutProps & BoxProps) {
  const { meta, children } = props

  return (
    <Container spacing={10} maxW={1200}>
      {meta?.title && (
        <NextSeo
          title={`${meta?.title} - Qopnet Commerce`}
          description={meta?.description}
        />
      )}

      <Box minH="80vh" {...props}>
        {children}
      </Box>
    </Container>
  )
}

export default Layout
