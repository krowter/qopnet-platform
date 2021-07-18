import { useEffect } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import {
  Box,
  Button,
  HStack,
  Heading,
  SimpleGrid,
  Spinner,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useUser } from 'use-supabase'

import { Layout, Icon } from '@qopnet/qopnet-ui'
import { useSWR } from '../../utils/swr'

/**
 * Dashboard for links and manading suppliers.
 */
const DashboardPage = () => {
  const user = useUser()
  const router = useRouter()
  useEffect(() => {
    if (!user) {
      router.replace('/signin')
    }
  }, [user, router])

  return <Layout pt={10}>{user && <DashboardContainer user={user} />}</Layout>
}

export const DashboardContainer = ({ user }) => {
  const { data, error } = useSWR('/api/profiles/my')
  const { profile } = data || {}

  return (
    <Stack>
      {error && !data && <Text>Gagal memuat profil Anda</Text>}
      {!error && !data && (
        <HStack>
          <Spinner />
          <Text>Memuat profil...</Text>
        </HStack>
      )}
      {!error && data && <DashboardContent profile={profile} />}
    </Stack>
  )
}

/**
 * Jika belum ada profil, maka hanya ada button buat profil
 */
export const DashboardContent = ({ profile }) => {
  return (
    <Stack spacing={10}>
      <NextSeo title="Dasbor saya - Qopnet" />

      <Stack id="dashboard-title">
        <Heading as="h1">Dasbor Saya</Heading>
        {profile && (
          <Text>
            <span>{profile.user.email} / </span>
            <span>@{profile.handle} / </span>
            <span>{profile.phone}</span>
          </Text>
        )}
      </Stack>

      <Stack
        id="dashboard-links"
        direction={['column', 'column', 'row']}
        spacing={10}
      >
        <Stack spacing={5} maxW="300px">
          <Heading as="h3" size="md">
            Mau apa?
          </Heading>
          {!profile && (
            <Stack>
              <DashboardActionLink name="shop" href="/shop">
                Lanjut belanja
              </DashboardActionLink>
              <DashboardActionLink name="profile" href="/create-profile">
                Buat profil saya
              </DashboardActionLink>
            </Stack>
          )}
          {profile && (
            <Stack>
              <DashboardActionLink name="shop" href="/shop">
                Lanjut belanja
              </DashboardActionLink>
              <DashboardActionLink name="profile" href="/create-profile">
                Ubah profil saya
              </DashboardActionLink>
              <DashboardActionLink name="supplier" href="/create-supplier">
                Membuat toko supplier
              </DashboardActionLink>
            </Stack>
          )}
        </Stack>

        {/* Only show owned suppliers list when exist */}
        <Stack id="dashboard-suppliers" spacing={5} maxW="500px">
          <Heading as="h3" size="md">
            List toko supplier milik saya
          </Heading>

          <Stack align="flex-start" spacing={5}>
            {!profile && (
              <Text>Buat profil dahulu jika mau membuat toko supplier</Text>
            )}
            {profile?.name && !profile?.suppliers?.length && (
              <>
                <Text>
                  Saya bukan supplier atau belum memiliki supplier. Silakan buat
                  supplier dahulu jika ingin menambahkan produk.
                </Text>
                <DashboardActionLink
                  name="plus"
                  href="/create-supplier"
                  size="xs"
                  variant="outline"
                >
                  Buat supplier pertama saya
                </DashboardActionLink>
              </>
            )}
            {profile?.name && profile?.suppliers?.length && (
              <>
                <SimpleGrid
                  columns={2}
                  spacing={5}
                  minChildWidth="280px"
                  w="100%"
                >
                  {profile.suppliers.map((supplier, index) => {
                    return (
                      <DashboardSupplierCardLink
                        key={supplier.handle}
                        supplier={supplier}
                      />
                    )
                  })}
                </SimpleGrid>{' '}
                <DashboardActionLink
                  name="plus"
                  href="/create-supplier"
                  size="xs"
                  variant="outline"
                >
                  Tambah toko supplier lagi
                </DashboardActionLink>
              </>
            )}
          </Stack>
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
