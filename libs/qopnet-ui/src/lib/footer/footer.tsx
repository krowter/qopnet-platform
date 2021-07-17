import NextLink from 'next/link'
import {
  Stack,
  Text,
  Link,
  SimpleGrid,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react'

/**
 * Can be refactored later
 */
const linkToPages = [
  { href: '/', text: 'Beranda' },
  { href: '/signup', text: 'Daftar' },
  { href: '/signin', text: 'Masuk' },
  { href: '/dashboard', text: 'Dasbor' },
  { href: '/create-profile', text: 'Buat profil' },
  { href: '/create-supplier', text: 'Buat toko supplier' },
  { href: '/create-product', text: 'Buat produk supplier' },
  { href: '/suppliers', text: 'Semua supplier' },
  { href: '/anekabaju', text: 'Halaman supplier Aneka baju' },
  { href: '/products', text: 'Semua produk supplier' },
  { href: '/search', text: 'Cari produk' },
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
      mt={60}
    >
      {process.env.NODE_ENV === 'development' && (
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
      )}

      <Text fontSize="sm">Copyright &copy; 2015-2021 Qopnet</Text>
    </Stack>
  )
}

export default Footer
