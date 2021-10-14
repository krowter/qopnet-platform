import NextLink from 'next/link'
import {
  chakra,
  Stack,
  Text,
  Link,
  Heading,
  Grid,
  GridItem,
  Center,
} from '@chakra-ui/react'
import { Icon } from '@chakra-ui/icons'
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa'

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
      px={5}
      py={10}
      color="orange.50"
      bg="orange.900"
      mt={40}
    >
      <Center>
        <Grid
          templateAreas={{
            base: `
            "sm"
            "ad"
            "co"
          `,
            sm: `
            "sm ad"
            "co co"
          `,
            md: `"sm ad co"`,
          }}
          gap={10}
        >
          <GridItem gridArea="sm">
            <Stack spacing={1}>
              <Heading as="h4" fontSize="lg">
                Peta situs
              </Heading>
              {linkToPages.map((link) => {
                return (
                  <NextLink key={link.href} href={link.href} passHref>
                    <Link>{link.text}</Link>
                  </NextLink>
                )
              })}
            </Stack>
          </GridItem>

          <GridItem gridArea="ad">
            <Stack spacing={1}>
              <Heading as="h4" fontSize="lg" fontWeight="bold">
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
            </Stack>
          </GridItem>

          <GridItem gridArea="co">
            <Stack spacing={0}>
              <span>
                Phone:{' '}
                <Link href="tel:+622150157599" fontWeight="bold">
                  +62-21-5015-7599
                </Link>
              </span>
              <span>
                Fax:{' '}
                <Link href="tel:+622124155531" fontWeight="bold">
                  +62-21-2415-5531
                </Link>
              </span>
              <span>
                Email:{' '}
                <Link href="mailto:sales@qopnet.id" fontWeight="bold">
                  sales@qopnet.id
                </Link>
              </span>
            </Stack>
          </GridItem>
        </Grid>
      </Center>

      <Center>
        <Stack direction="row">
          <Link
            href="https://instagram.com/qopnet.id"
            target="_blank"
            rel="noreferer"
          >
            <Icon as={FaInstagram} fontSize={25} />
          </Link>
          <Link
            href="https://facebook.com/qopnet"
            target="_blank"
            rel="noreferer"
          >
            <Icon as={FaFacebook} fontSize={25} />
          </Link>
          <Link
            href="https://twitter.com/qopnet"
            target="_blank"
            rel="noreferer"
          >
            <Icon as={FaTwitter} fontSize={25} />
          </Link>
        </Stack>
      </Center>

      <Stack textAlign="center">
        <Text fontSize="sm">
          Copyright <b>&copy;</b> 2015-2021 Qopnet
        </Text>
        <Text fontSize="sm" fontWeight="bold">
          v{packageData.version}
        </Text>
      </Stack>
    </Stack>
  )
}

export default Footer
