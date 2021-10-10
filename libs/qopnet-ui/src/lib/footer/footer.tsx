import NextLink from 'next/link'
import { Stack, Text, Link, SimpleGrid, Heading } from '@chakra-ui/react'

import packageData from '../../../../../package.json'

/**
 * Can be refactored later
 */
const linkToPages = [
  { href: '/about', text: 'Tentang Kami' },
  { href: '/terms', text: 'Syarat dan Ketentuan' },
  { href: '/faq', text: 'FAQ' },
]

/* eslint-disable-next-line */
export interface FooterProps {}

/**
 * Footer with sitemap
 */
export const Footer = (props: FooterProps) => {
  return (
    <Stack
      as="footer"
      spacing={10}
      p={5}
      color="orange.50"
      bg="orange.900"
      mt={40}
    >
      <Stack>
        <Heading as="h4" size="sm" textTransform="uppercase">
          Peta situs
        </Heading>
        <SimpleGrid spacing={1} columns={3} maxW={720}>
          {linkToPages.map((link) => {
            return (
              <NextLink key={link.href} href={link.href} passHref>
                <Link>{link.text}</Link>
              </NextLink>
            )
          })}
        </SimpleGrid>
      </Stack>

      <Stack>
        <Text fontSize="sm">
          Copyright <b>&copy;</b> 2015-2021 Qopnet
        </Text>
        <Text fontSize="xs">v{packageData.version}</Text>
      </Stack>
    </Stack>
  )
}

export default Footer
