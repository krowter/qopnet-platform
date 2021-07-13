import NextLink from 'next/link'
import { Container, Stack, Text, Link, SimpleGrid } from '@chakra-ui/react'

const linkToPages = [
  { href: '/', text: 'Beranda' },
  { href: '/signup', text: 'Daftar' },
  { href: '/signin', text: 'Masuk' },
  { href: '/create-profile', text: 'Buat Profil' },
  { href: '/create-supplier', text: 'Buat Toko Supplier' },
  { href: '/create-product', text: 'Buat Produk Supplier' },
  { href: '/qopnet', text: 'Halaman Supplier Qopnet' },
  { href: '/qopnet/telur', text: 'Halaman produk telur' },
  { href: '/qopnet/kasur', text: 'Halaman produk kasur' },
  { href: '/products', text: 'Semua produk supplier' },
  { href: '/search', text: 'Cari produk' },
]

export function HomePage() {
  return (
    <Container spacing={10} maxW={1200}>
      <Text>This is the homepage</Text>
      <SimpleGrid spacing={1} columns={3} maxW={720}>
        {linkToPages.map((link) => {
          return (
            <NextLink key={link.href} href={link.href} passHref>
              <Link>{link.text}</Link>
            </NextLink>
          )
        })}
      </SimpleGrid>
    </Container>
  )
}

export default HomePage
