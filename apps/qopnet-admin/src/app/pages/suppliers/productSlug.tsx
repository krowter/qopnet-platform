/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  CloseButton,
  Flex,
  HStack,
  Spinner,
  Text,
  VStack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  useColorModeValue,
  Divider,
  Stack,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
  IconButton,
  Link as ChakraLink,
  Image as ChakraImage,
} from '@chakra-ui/react'
import cuid from 'cuid'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import { useParams, useHistory } from 'react-router'

import { Icon, formatPrice } from '@qopnet/qopnet-ui'
import { formatDateTime } from '@qopnet/util-format'

import { DefaultLayout } from '../../layouts'
import { useSWR } from '../../utils/swr'
import { ModifierButtons } from '../../components'

export const SupplierProductSlugPage = () => {
  const {
    supplierParam,
    productParam,
  }: { supplierParam: string; productParam: string } = useParams()

  const { data: { supplierProduct = {}, message } = [], error } = useSWR(
    `/api/suppliers/products/${productParam}`
  )

  return (
    <DefaultLayout>
      <Box
        m={2}
        rounded={10}
        minHeight="98vh"
        border="1px solid gray"
        borderColor={useColorModeValue('gray.300', 'gray.600')}
      >
        <Flex
          p={3}
          alignItems="center"
          borderBottom="1px solid gray"
          borderColor={useColorModeValue('gray.100', 'gray.700')}
        >
          <CloseButton as={Link} to="/suppliers/products" />
          <Text ml={3} fontWeight={700}>
            {productParam}
          </Text>
          <ModifierButtons
            supplierParam={supplierParam}
            productParam={productParam}
            editRoute={`/suppliers/${supplierParam}/products/${productParam}/edit`}
          />
        </Flex>
        <Grid gridTemplateColumns={{ md: '1fr', lg: '2fr 1fr' }}>
          <Box mr={14}>
            <Breadcrumb
              mt={5}
              ml={14}
              spacing="8px"
              separator={<ChevronRightIcon color="gray.500" />}
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
                mt={5}
                pl={14}
                spacing={5}
                alignItems="flex-start"
              >
                <Stack id="product-detail">
                  {supplierProduct?.images?.length && (
                    <Flex>
                      {supplierProduct.images.map(
                        (uploadedImageUrl: string, index: number) => {
                          return (
                            <Box
                              key={cuid()}
                              border="1px solid gray"
                              rounded="base"
                              mr={5}
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
                                />
                              </ChakraLink>
                            </Box>
                          )
                        }
                      )}
                    </Flex>
                  )}
                  <Text>Kode SKU: {supplierProduct?.sku}</Text>
                  <Text>Harga: {formatPrice(supplierProduct?.price)}</Text>
                  <Text>Minimum Order: {supplierProduct?.minOrder ?? '-'}</Text>
                  <Text>
                    Berat: {supplierProduct?.weight ?? '-'}{' '}
                    {supplierProduct?.weightUnit}
                  </Text>
                  <Text>Detail Berat: {supplierProduct?.weightDetails}</Text>
                  <Text>Dimensi: {supplierProduct?.dimension?.width}</Text>
                  <Text>Stok: {supplierProduct.stock} pcs</Text>
                  <Text>Deskripsi:</Text>
                  <Text>{supplierProduct?.description}</Text>
                </Stack>
              </VStack>
            )}
          </Box>
          <Box
            minWidth={{ md: '300px' }}
            pl={5}
            pr={5}
            pt={5}
            borderLeft=" 1px solid gray"
            display={{ base: 'none', lg: 'unset' }}
          >
            <Box pb={3} justifyContent="center">
              {supplierProduct?.id}
            </Box>

            <Divider />

            <Flex pt={5} justifyContent="space-between" alignItems="center">
              <Box>Toko Supplier </Box>
              <Box>{supplierProduct?.supplier?.name}</Box>
            </Flex>

            <Flex pt={5} justifyContent="space-between" alignItems="center">
              <Box>Pemilik </Box>
              <Box>{supplierProduct?.supplier?.owner?.name}</Box>
            </Flex>

            <Flex pt={5} justifyContent="space-between" alignItems="center">
              <Box>Dijual mulai </Box>
              <Box>{formatDateTime(supplierProduct.createdAt)}</Box>
            </Flex>

            <Flex pt={5} justifyContent="space-between" alignItems="center">
              <Box>Terakhir diubah</Box>
              <Box>{formatDateTime(supplierProduct.updatedAt)}</Box>
            </Flex>
          </Box>
        </Grid>
      </Box>
    </DefaultLayout>
  )
}
