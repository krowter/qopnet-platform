import NextLink from 'next/link'
import {
  Heading,
  Divider,
  Stack,
  Box,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'

import { Layout, Icon } from '@qopnet/qopnet-ui'
import { useSWR } from '../../utils/swr'

/**
 * Dashboard to choose to:
 * 1. Continue shopping
 * 2. Create supplier
 * 3. Create supplier product
 * 4. Go to owned suppliers
 */
const DashboardPage = () => {
  const { data, error } = useSWR('/api/profiles/my')
  const { profile } = data || {}

  return (
    <Layout>
      {error && <Text>Gagal memuat profil Anda</Text>}
      {!error && !profile && <Text>Memuat profil Anda...</Text>}
      {!error && profile && <DashboardContent profile={profile} />}
    </Layout>
  )
}

export const DashboardContent = ({ profile }) => {
  return (
    <Stack mt={10} spacing={10}>
      <Stack id="dashboard-title">
        <Heading as="h1">Dasbor</Heading>
        <Text>
          <span>{profile.user.email} / </span>
          <span>@{profile.handle} / </span>
          <span>{profile.phone}</span>
        </Text>
      </Stack>

      <Stack
        id="dashboard-links"
        direction={['column', 'column', 'row']}
        spacing={10}
      >
        <Stack>
          <Heading as="h3" size="md">
            Mau apa?
          </Heading>
          <DashboardActionLink name="shop" href="/shop">
            Lanjut belanja
          </DashboardActionLink>
          <DashboardActionLink name="profile" href="/create-profile">
            Ubah profil saya
          </DashboardActionLink>
          <DashboardActionLink name="supplier" href="/create-supplier">
            Membuat supplier baru
          </DashboardActionLink>
          <DashboardActionLink
            name="supplier-product"
            href="/create-supplier-product"
          >
            Membuat produk supplier baru
          </DashboardActionLink>
        </Stack>

        {/* Only show owned suppliers list when exist */}
        <Stack id="dashboard-suppliers">
          <Heading as="h3" size="md">
            Daftar Supplier Saya
          </Heading>
          {!profile?.suppliers?.length && (
            <Stack align="flex-start">
              <Text>Saya bukan supplier atau belum memiliki supplier</Text>
              <DashboardActionLink
                name="supplier"
                href="/create-supplier"
                size="xs"
                variant="outline"
              >
                Buat supplier pertama saya
              </DashboardActionLink>
            </Stack>
          )}
          {profile?.suppliers?.length && (
            <SimpleGrid columns={2} spacing={5} minChildWidth="350px">
              {profile.suppliers.map((supplier, index) => {
                return (
                  <DashboardSupplierCardLink
                    key={supplier.handle}
                    supplier={supplier}
                  />
                )
              })}
            </SimpleGrid>
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}

export const DashboardActionLink = ({
  name,
  href,
  size = 'md',
  variant = 'solid',
  children,
}) => {
  return (
    <NextLink href={href} passHref>
      <Button
        as="a"
        p={3}
        colorScheme="yellow"
        size={size}
        variant={variant}
        leftIcon={<Icon name={name} />}
      >
        {children}
      </Button>
    </NextLink>
  )
}

export const DashboardSupplierCardLink = ({
  supplier,
}: {
  supplier: {
    name: string
    handle: string
  }
}) => {
  return (
    <Box
      p={5}
      boxShadow="xs"
      rounded="base"
      bg={useColorModeValue('gray.50', 'gray.900')}
    >
      <Stat as={Stack} mb={5}>
        <StatLabel as={Heading} size="lg">
          {supplier.name}
        </StatLabel>
        <StatHelpText>/{supplier.handle}</StatHelpText>
      </Stat>
      <NextLink href={supplier.handle} passHref>
        <Button as="a" size="sm" colorScheme="orange">
          Kelola
        </Button>
      </NextLink>
    </Box>
  )
}

export default DashboardPage
