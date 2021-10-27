/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Flex,
  HStack,
  Spinner,
  Text,
  VStack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Link as ChakraLink,
  Image as ChakraImage,
  UnorderedList,
  ListItem,
  Heading,
  Wrap,
  Stack,
  useMediaQuery,
} from '@chakra-ui/react'
import cuid from 'cuid'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import { useParams, useHistory } from 'react-router'

import { formatPrice } from '@qopnet/qopnet-ui'
import { formatDateTime } from '@qopnet/util-format'

import { DefaultLayout } from '../../layouts'
import { useSWR } from '../../utils/swr'

export const SupplierProductSlugPage = () => {
  const {
    supplierParam,
    productParam,
  }: { supplierParam: string; productParam: string } = useParams()

  const { data: { supplierProduct = {}, message } = [], error } = useSWR(
    `/api/suppliers/products/${productParam}`
  )

  // Calculate if there is a discount
  const discountValue =
    (Number(supplierProduct?.price) * Number(supplierProduct?.discount)) / 100
  const discountedPrice = Number(supplierProduct?.price) - discountValue

  const [isDesktop] = useMediaQuery('(min-width: 60em)')

  return (
    <DefaultLayout>
      <Box px={7} py={7}>
        <Heading>Semua Supplier</Heading>
        <Breadcrumb
          mb={10}
          spacing={2}
          separator={<ChevronRightIcon color="gray.500" />}
          mt={2}
        >
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/suppliers">
              Supplier
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to={`/suppliers/${supplierParam}`}>
              {supplierProduct?.supplier?.handle}
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/suppliers/products">
              Semua Produk
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>{productParam}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Flex direction={{ base: 'column-reverse', lg: 'row' }} fontSize="sm">
          {error ? (
            <Box px={5} py={3}>
              {message ? message : 'Gagal memuat produk supplier'}
            </Box>
          ) : supplierProduct.length === 0 ? (
            <Box px={5} py={3}>
              <Spinner color="orange.500" />
            </Box>
          ) : (
            <VStack
              id="suppliers-products-all"
              alignItems="flex-start"
              w={{ base: '100%', lg: '60%' }}
              mr={{ lg: 5 }}
            >
              <Wrap
                p={5}
                border="1px solid"
                borderColor="gray.300"
                borderRadius="lg"
                id="product-detail"
              >
                {supplierProduct?.images?.length && (
                  <HStack w="full" justify="center">
                    {supplierProduct.images.map(
                      (uploadedImageUrl: string, index: number) => {
                        return (
                          <Box
                            key={cuid()}
                            border="1px solid gray"
                            rounded="base"
                          >
                            <ChakraLink
                              isExternal
                              href={uploadedImageUrl}
                              passHref
                              display="block"
                            >
                              <ChakraImage
                                src={uploadedImageUrl}
                                alt={`Uploaded image ${index + 1}`}
                                width={150}
                                height={150}
                                objectFit="cover"
                              />
                            </ChakraLink>
                          </Box>
                        )
                      }
                    )}
                  </HStack>
                )}
                <VStack w="full" align="flex-start">
                  <Text fontWeight="bold">Informasi Produk</Text>
                </VStack>
                <Stack w="full" direction={isDesktop ? 'row' : 'column'}>
                  <Box
                    w={{ base: '100%', lg: '50%' }}
                    alignItems="stretch"
                    mr={5}
                  >
                    <Flex justifyContent="space-between">
                      <Box>Kode SKU</Box>
                      <Box>
                        <Text fontWeight="bold">{supplierProduct?.sku}</Text>
                      </Box>
                    </Flex>

                    <Flex justifyContent="space-between">
                      <Box>Minimum Order</Box>
                      <Box>
                        <Text fontWeight="bold">
                          {supplierProduct?.minOrder ?? '-'}
                        </Text>
                      </Box>
                    </Flex>

                    <Flex justifyContent="space-between">
                      <Box>Stok</Box>
                      <Box>
                        <Text fontWeight="bold">
                          {supplierProduct.stock} pcs
                        </Text>
                      </Box>
                    </Flex>

                    <Flex justifyContent="space-between">
                      <Box>Harga</Box>
                      <Box>
                        <Text fontWeight="bold">
                          {formatPrice(supplierProduct?.price)}
                        </Text>
                      </Box>
                    </Flex>

                    <Flex justifyContent="space-between">
                      <Box>Diskon</Box>
                      <Box>
                        <Text fontWeight="bold">
                          {supplierProduct?.discount ?? 0} %
                        </Text>
                      </Box>
                    </Flex>

                    {supplierProduct?.discount &&
                      supplierProduct?.price &&
                      discountedPrice && (
                        <Flex justifyContent="space-between">
                          <Box>Harga setelah diskon</Box>
                          <Box>
                            <Text fontWeight="bold">
                              {formatPrice(discountedPrice)}
                            </Text>
                          </Box>
                        </Flex>
                      )}
                  </Box>
                  <Box w={{ base: '100%', lg: '50%' }} alignItems="stretch">
                    <Flex justifyContent="space-between">
                      <Box>Subnama</Box>
                      <Box>
                        <Text fontWeight="bold">
                          {supplierProduct?.subname ?? '-'}
                        </Text>
                      </Box>
                    </Flex>
                    <Flex justifyContent="space-between">
                      <Box>Berat</Box>
                      <Box>
                        <Text fontWeight="bold">
                          {supplierProduct?.weight ?? '-'} kg
                        </Text>
                      </Box>
                    </Flex>

                    <Flex justifyContent="space-between">
                      <Box>Dimensi</Box>
                    </Flex>

                    <Flex justifyContent="space-between">
                      <Box pl={5}>
                        <UnorderedList>
                          <ListItem>Lebar:</ListItem>
                          <ListItem>Tinggi:</ListItem>
                          <ListItem>Panjang:</ListItem>
                        </UnorderedList>
                      </Box>
                      <Box>
                        <Text fontWeight="bold">
                          {supplierProduct?.dimension?.width ?? '-'} cm
                        </Text>
                        <Text fontWeight="bold">
                          {supplierProduct?.dimension?.height ?? '-'} cm
                        </Text>
                        <Text fontWeight="bold">
                          {supplierProduct?.dimension?.length ?? '-'} cm
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                </Stack>
                <HStack w="full">
                  <Box>
                    <Text fontWeight="bold">Deskripsi Barang:</Text>
                    <Text>{supplierProduct?.description ?? '-'}</Text>
                  </Box>
                </HStack>
              </Wrap>
            </VStack>
          )}
          <Box
            position={{ lg: 'sticky' }}
            top="0"
            w={{ base: '100%', lg: '40%' }}
            h="max-content"
            align="flex-start"
            spacing={5}
            mb={{ base: 5, lg: 0 }}
            p={5}
            border="1px solid"
            borderColor="gray.300"
            borderRadius="lg"
          >
            <Text fontWeight="bold">Informasi Toko</Text>
            <Flex pt={5} justifyContent="space-between" alignItems="center">
              <Box>Toko Supplier </Box>
              <Box>
                <Text fontWeight="bold">{supplierProduct?.supplier?.name}</Text>
              </Box>
            </Flex>

            <Flex pt={5} justifyContent="space-between" alignItems="center">
              <Box>Pemilik </Box>
              <Box>
                <Text fontWeight="bold">
                  {supplierProduct?.supplier?.owner?.name}
                </Text>
              </Box>
            </Flex>

            <Flex pt={5} justifyContent="space-between" alignItems="center">
              <Box>Dijual mulai </Box>
              <Box>
                <Text fontWeight="bold">
                  {formatDateTime(supplierProduct.createdAt)}
                </Text>
              </Box>
            </Flex>

            <Flex pt={5} justifyContent="space-between" alignItems="center">
              <Box>Terakhir diubah</Box>
              <Box>
                <Text fontWeight="bold">
                  {formatDateTime(supplierProduct.updatedAt)}
                </Text>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </DefaultLayout>
  )
}
