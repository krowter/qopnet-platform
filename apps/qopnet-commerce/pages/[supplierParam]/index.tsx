import cuid from 'cuid'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { useUser } from 'use-supabase'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  Tag,
  Divider,
  HStack,
  Heading,
  Text,
  Flex,
  Avatar,
  Spinner,
  VStack,
  Stack,
  ButtonGroup,
  Box,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  Input,
} from '@chakra-ui/react'

import { Layout, Icon, SupplierProductsGrid } from '@qopnet/qopnet-ui'
import { NextLinkButton } from '../../components'
import { useSWR } from '../../utils'

const SupplierParamPage = () => {
  const router = useRouter()
  const { supplierParam } = router.query

  return (
    <Layout pt={10}>
      {supplierParam && <SupplierContainer supplierParam={supplierParam} />}
    </Layout>
  )
}

export const SupplierContainer = ({ supplierParam }) => {
  const user = useUser()
  const { data, error } = useSWR(`/api/suppliers/${supplierParam}`)
  const { supplier } = data || {}

  const address = supplier?.addresses[0]
    ? `${supplier?.addresses[0]?.city}, ${supplier?.addresses[0]?.state}`
    : `?`
  const title = `${supplier?.name} - ${address} - Qopnet`

  return (
    <Stack spacing={10}>
      {error && <Text>Gagal memuat data supplier</Text>}
      {!error && !supplier && (
        <HStack>
          <Spinner />
          <Text>Memuat data supplier...</Text>
        </HStack>
      )}
      {!error && supplier && (
        <>
          <NextSeo title={title} />
          <Stack spacing={10} w="100%">
            <Stack spacing={5}>
              <Flex id="supplier-brand" flexWrap="wrap">
                <Avatar mr={5} mb={5} size="xl" name={supplier?.name} />
                <Stack>
                  <Heading as="h1" size="lg">
                    {supplier?.name}
                  </Heading>
                  <HStack>
                    <Tag colorScheme="green">
                      {supplier?.category === 'PRODUCER'
                        ? 'Produsen'
                        : 'Distributor'}
                    </Tag>
                    {supplier?.phone && <span>{supplier?.phone}</span>}
                  </HStack>
                  <HStack>
                    {supplier?.addresses?.map((address, index) => {
                      return (
                        <Text key={cuid()}>
                          <span>{address?.street}, </span>
                          <span>{address?.streetDetails}, </span>
                          <span>{address?.city}, </span>
                          <span>{address?.state} </span>
                          <span>{address?.zip}, </span>
                          <span>Indonesia</span>
                        </Text>
                      )
                    })}
                  </HStack>
                </Stack>
              </Flex>
              {supplier?.supplierProducts?.length &&
                user &&
                user?.id === supplier?.owner?.user?.id && (
                  <ButtonGroup spacing={5}>
                    <NextLinkButton
                      colorScheme="green"
                      size="sm"
                      leftIcon={<Icon name="plus" />}
                      href={`/${supplier.handle}/create-supplier-product`}
                    >
                      Tambah produk lagi
                    </NextLinkButton>
                    <NextLinkButton
                      colorScheme="green"
                      variant="outline"
                      size="sm"
                      leftIcon={<Icon name="order" />}
                      href={`/${supplier.handle}/orders`}
                    >
                      Cek pesanan
                    </NextLinkButton>
                  </ButtonGroup>
                )}
            </Stack>

            {!supplier?.supplierProducts?.length && (
              <Stack>
                <Divider />
                <Heading as="h3" size="lg">
                  Toko supplier belum memiliki produk
                </Heading>
                {user && user?.id === supplier?.owner?.user?.id ? (
                  <Stack align="flex-start" spacing={5}>
                    <Text>Ayo tambahkan produk untuk supplier Anda</Text>
                    <NextLinkButton
                      colorScheme="green"
                      size="sm"
                      leftIcon={<Icon name="plus" />}
                      href={`/${supplier.handle}/create-supplier-product`}
                    >
                      Tambahkan produk
                    </NextLinkButton>
                  </Stack>
                ) : (
                  <Text>Maaf, toko supplier ini baru mulai dibuat</Text>
                )}
              </Stack>
            )}

            {/* List of all supplier's products */}
            {supplier?.supplierProducts?.length && (
              <SupplierProductsContainer supplier={supplier} />
            )}
          </Stack>
        </>
      )}
    </Stack>
  )
}

export type SupplierProductsSearchData = {
  keyword?: string | ''
}

export const SupplierProductsContainer = ({ supplier }) => {
  const router = useRouter()
  const { supplierParam, q: keyword } = router.query

  // React Hook Form for search supplier products in one supplier
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SupplierProductsSearchData>()

  const handleSubmitSearchSupplierProducts: SubmitHandler<SupplierProductsSearchData> =
    async ({ keyword }) => {
      try {
        if (keyword) {
          router.push(`/${supplierParam}?q=${keyword}`)
        } else {
          router.push(`/${supplierParam}`)
        }
      } catch (error) {
        console.error(error)
      }
    }

  return (
    <Stack spacing={5}>
      <Box
        as="form"
        w="100%"
        onSubmit={handleSubmit(handleSubmitSearchSupplierProducts)}
      >
        <InputGroup>
          <InputLeftElement color={useColorModeValue('black', 'white')}>
            <Icon name="search" />
          </InputLeftElement>
          <Input
            placeholder="Cari produk dalam supplier..."
            bg={useColorModeValue('white', 'black')}
            {...register('keyword')}
          />
        </InputGroup>
      </Box>

      {!keyword && supplier?.supplierProducts && (
        <Stack>
          <Text>
            Terdapat <b>{supplier?.supplierProducts?.length}</b> produk
          </Text>
          <SupplierProductsGrid supplierProducts={supplier?.supplierProducts} />
        </Stack>
      )}

      {keyword && (
        <SearchSupplierProductsResults supplier={supplier} keyword={keyword} />
      )}
    </Stack>
  )
}

export const SearchSupplierProductsResults = ({ supplier, keyword }) => {
  const { data, error } = useSWR(
    `/api/suppliers/${supplier.handle}/search?q=${keyword}`
  )
  const { meta, supplierProducts } = data || {}

  const address = supplier?.addresses[0]
    ? `${supplier?.addresses[0]?.city}, ${supplier?.addresses[0]?.state}`
    : `?`
  const title = `Mencari: ${keyword} di ${supplier?.name} - ${address} - Qopnet`

  return (
    <Stack>
      <NextSeo title={title} />

      <Heading as="h2" size="md">
        Hasil pencarian untuk <b>"{keyword}"</b>
      </Heading>

      {error && <Text>Gagal mencari produk</Text>}
      {!error && !supplierProducts && (
        <Flex>
          <Spinner mr={5} />
          <Text>Mencari produk...</Text>
        </Flex>
      )}
      {!error && supplierProducts && (
        <Stack>
          <Text>
            <b>{meta.recordCount}</b> produk ditemukan
          </Text>
          <SupplierProductsGrid supplierProducts={supplierProducts} />
        </Stack>
      )}
    </Stack>
  )
}

export default SupplierParamPage
