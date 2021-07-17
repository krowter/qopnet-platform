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
import { Supplier } from '@prisma/client'

import { Layout } from '@qopnet/qopnet-ui'

/**
 * Dashboard to choose to:
 * 1. Continue shopping
 * 2. Create supplier
 * 3. Create supplier product
 * 4. Go to owned suppliers
 */
const DashboardPage = () => {
  // Placeholder data structure join of Profile, Supplier, SupplierProduct
  const profile = {
    id: 'a1b2c3',
    handle: 'namasaya',
    name: 'Nama Saya',
    phone: '+62 8 1234 5678',
    user: {
      email: 'namasaya@gmail.com',
    },
    suppliers: [
      {
        handle: 'pabrik-kasur',
        name: 'Pabrik Kasur',
        supplierProducts: [
          {
            slug: 'kasur-busa',
          },
        ],
      },
      {
        handle: 'pabrik-telur',
        name: 'Pabrik Telur',
        supplierProducts: [
          {
            slug: 'telur-ayam',
          },
        ],
      },
    ],
  }

  return (
    <Layout>
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
            <DashboardActionLink href="/shop">
              Lanjut belanja
            </DashboardActionLink>
            <DashboardActionLink href="/create-supplier">
              Membuat supplier
            </DashboardActionLink>
            <DashboardActionLink href="/create-supplier-product">
              Membuat produk supplier
            </DashboardActionLink>
          </Stack>

          {/* Only show owned suppliers list when exist */}
          {profile?.suppliers && (
            <Stack id="dashboard-suppliers">
              <Heading as="h3" size="md">
                Daftar Supplier
              </Heading>
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
            </Stack>
          )}
        </Stack>
      </Stack>
    </Layout>
  )
}

export const DashboardActionLink = ({ href, children }) => {
  return (
    <NextLink href={href} passHref>
      <Button
        as="a"
        p={3}
        colorScheme="yellow"
        // boxShadow="xs"
        // bg={useColorModeValue('gray.50', 'gray.900')}
      >
        {children}
      </Button>
    </NextLink>
  )
}

export const DashboardSupplierCardLink = ({
  supplier,
}: {
  supplier: Supplier
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
