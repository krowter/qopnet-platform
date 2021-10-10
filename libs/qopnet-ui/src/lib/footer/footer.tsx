import NextLink from 'next/link'
import {
  chakra,
  Stack,
  Text,
  Link,
  SimpleGrid,
  Heading,
  Divider,
} from '@chakra-ui/react'

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
        <Stack spacing={1} maxW={720}>
          {linkToPages.map((link) => {
            return (
              <NextLink key={link.href} href={link.href} passHref>
                <Link>{link.text}</Link>
              </NextLink>
            )
          })}
        </Stack>
      </Stack>

      <Stack maxW="320px">
        <Heading as="h4" fontSize="sm">
          PT Teknologi Harapan Republik
        </Heading>
        <Text as="address" fontSize="sm" fontStyle="normal">
          Treasury Building Lantai 21 unit M-N
          <br />
          District 8, SCBD Lot 28
          <br />
          Jend. Sudirman Kav. 52-53, RT.8/RW.3,
          <br />
          Senayan, Kec. Kebayoran Baru,
          <br />
          DKI Jakarta, 12190, Indonesia
        </Text>
        <Divider />
        <Stack spacing={0}>
          <span>
            Phone{' '}
            <chakra.a href="tel:+622150157599" fontWeight="bold">
              +62-21-5015-7599
            </chakra.a>
          </span>
          <span>
            Fax{' '}
            <chakra.a href="tel:+622124155531" fontWeight="bold">
              +62-21-2415-5531
            </chakra.a>
          </span>
          <span>
            Email{' '}
            <chakra.a href="mailto:sales@qopnet.id" fontWeight="bold">
              sales@qopnet.id
            </chakra.a>
          </span>
        </Stack>
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
