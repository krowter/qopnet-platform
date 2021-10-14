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
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useUser } from 'use-supabase'

import { Layout, Icon } from '@qopnet/qopnet-ui'
import { formatAddressComplete } from '@qopnet/util-format'
import { useSWR } from '../../utils/swr'

/**
 * Dashboard for:
 * - personal links
 * - managing suppliers
 * - managing merchants
 */
const DashboardPage = () => {
  const user = useUser()
  const router = useRouter()
  // useEffect(() => {
  //   if (!user) {
  //     router.replace('/signin')
  //   }
  // }, [user, router])

  return <Layout pt={10}>{user && <DashboardContainer user={user} />}</Layout>
}

export const DashboardContainer = ({ user }) => {
  const { data, error } = useSWR('/api/profiles/my')
  const { profile } = data || {}

  return (
    <Stack>
      {/* <Text as="pre">{JSON.stringify(data, null, 2)}</Text> */}
      {error && !data && (
        <Stack align="flex-start">
          <Text>Gagal memuat profil</Text>
          <Text>Silakan buat profil terlebih dahulu sebelum melanjutkan</Text>
          <DashboardActionLink name="profile" href="/profile">
            Buat profil
          </DashboardActionLink>
        </Stack>
      )}
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
      <NextSeo title="Dasbor - Qopnet" />

      <Stack id="dashboard-title">
        <Heading as="h1">Dasbor</Heading>
        {profile && (
          <Stack>
            <Text>
              <span>{profile.user.email} / </span>
              <span>@{profile.handle} / </span>
              <span>{profile.phone}</span>
            </Text>
            {profile?.addresses[0] && (
              <Text>{formatAddressComplete(profile.addresses[0])}</Text>
            )}
          </Stack>
        )}
      </Stack>

      <Stack
        id="dashboard-links"
        direction={['column', 'column', 'row']}
        spacing={10}
      >
        <Stack spacing={5} minW="250px" maxW="300px">
          <Heading as="h3" size="md">
            Ingin melakukan apa?
          </Heading>
          {!profile && (
            <Stack>
              <Heading as="h4" size="sm">
                Fitur pribadi
              </Heading>
              <DashboardActionLink name="shop" href="/shop">
                Lanjut belanja
              </DashboardActionLink>
              <DashboardActionLink name="profile" href="/profile">
                Buat profil
              </DashboardActionLink>
            </Stack>
          )}
          {profile && (
            <>
              <Stack>
                <Heading as="h4" size="sm">
                  Fitur pribadi
                </Heading>
                <DashboardActionLink name="shop" href="/shop">
                  Lanjut belanja
                </DashboardActionLink>
                <DashboardActionLink name="profile" href="/profile">
                  Ubah profil
                </DashboardActionLink>
                <DashboardActionLink name="order" href="/dashboard/orders">
                  Cek pesanan
                </DashboardActionLink>
                {/* <DashboardActionLink name="order" href="/dashboard/paymnents">
                  Cek pembayaran
                </DashboardActionLink> */}
              </Stack>
              <Stack>
                <Heading as="h4" size="sm">
                  Fitur supplier
                </Heading>
                <DashboardActionLink name="supplier" href="/create-supplier">
                  Buat toko supplier
                </DashboardActionLink>
              </Stack>
              {/* <Stack>
                <Heading as="h4" size="sm">
                  Fitur merchant
                </Heading>
                <DashboardActionLink name="merchant" href="/create-merchant">
                  Buat toko merchant
                </DashboardActionLink>
              </Stack> */}
            </>
          )}
        </Stack>

        {/* Only show owned suppliers list when exist */}
        <Stack id="dashboard-suppliers" spacing={5} maxW="500px">
          <HStack>
            <Icon name="supplier" />
            <Heading as="h3" size="md">
              List toko supplier
            </Heading>
          </HStack>

          <Stack align="flex-start" spacing={5}>
            {!profile && (
              <Text>Buat profil dahulu jika mau membuat toko supplier</Text>
            )}
            {profile?.name && !profile?.suppliers?.length && (
              <>
                <Text>
                  Anda bukan atau belum memiliki toko supplier. Silakan buat
                  supplier dahulu jika ingin menjual produk.
                </Text>
                <DashboardActionLink
                  name="plus"
                  href="/create-supplier"
                  size="xs"
                  variant="outline"
                >
                  Buat supplier pertama
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
                </SimpleGrid>
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
      <Stack mb={5}>
        <Heading size="md">{supplier.name}</Heading>
        <Text>/{supplier.handle}</Text>
      </Stack>
      <NextLink href={supplier.handle} passHref>
        <Button as="a" size="sm" colorScheme="orange">
          Kelola
        </Button>
      </NextLink>
    </Box>
  )
}

export default DashboardPage
