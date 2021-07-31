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
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'

import { useParams, useHistory } from 'react-router'

import { DefaultLayout } from '../../layouts'
import { useSWR } from '../../utils/swr'
import { ModifierButtons } from '../../components'
import { Icon, formatPrice } from '@qopnet/qopnet-ui'

export const SupplierProductSlugPage = () => {
  const sidebar = useDisclosure()
  const {
    supplierParam,
    productParam,
  }: { supplierParam: string; productParam: string } = useParams()
  const { data: { supplierProduct = [], message } = [], error } = useSWR(
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
          <IconButton
            aria-label="Menu"
            bg="none"
            display={{ base: 'inline-flex', lg: 'none' }}
            icon={<Icon name="menu" />}
            onClick={sidebar.onOpen}
            m={2}
            size="sm"
            top={0}
            right={0}
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
            <Drawer
              isFullHeight
              isOpen={sidebar.isOpen}
              onClose={sidebar.onClose}
              placement="right"
              size="xs"
            >
              <DrawerOverlay />
              <DrawerContent style={{ width: 'auto' }}>
                <Stack
                  bg={useColorModeValue('gray.100', 'gray.900')}
                  borderRight="1px solid gray"
                  height="100vh"
                  justify="space-between"
                  p={2}
                  minWidth="250px"
                >
                  <Stack as="nav" w="auto" spacing={3} mx={2} mt={6}>
                    <DrawerCloseButton right={0} mr={2} />
                    <Box
                      minWidth={{ md: '300px' }}
                      pl={5}
                      pr={5}
                      pt={5}
                      borderLeft=" 1px solid gray"
                    >
                      <Box pb={3} justifyContent="center">
                        {supplierProduct?.supplierId}
                      </Box>

                      <Divider />

                      <Flex
                        pt={5}
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box>Toko Supplier </Box>
                        <Box>{supplierProduct?.supplierId}</Box>
                      </Flex>

                      <Flex
                        pt={5}
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box>Pemilik </Box>
                        <Box>{supplierProduct.ownerId}</Box>
                      </Flex>

                      <Flex
                        pt={3}
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box>Kategori </Box>
                        <Box>Keperluan rumah tangga </Box>
                      </Flex>

                      <Flex
                        pt={3}
                        pb={3}
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box>Bidang</Box>
                        <Box>Papan</Box>
                      </Flex>

                      <Divider />

                      <Flex
                        pt={5}
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box>Dijual mulai </Box>
                        <Box>{supplierProduct.createdAt}</Box>
                      </Flex>

                      <Flex
                        pt={5}
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box>Terakhir diubah</Box>
                        <Box>{supplierProduct.updatedAt}</Box>
                      </Flex>
                    </Box>
                  </Stack>
                  <HStack px={5}>
                    <Text as="code" fontSize="xs" color="gray.500"></Text>
                  </HStack>
                </Stack>
              </DrawerContent>
            </Drawer>
            {error ? (
              <Box px={5} py={3}>
                {' '}
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
                  <Text> Kode SKU: {supplierProduct?.sku}</Text>
                  <Text>Nama Produk: {supplierProduct?.name}</Text>
                  <Text> Harga: Rp. {formatPrice(supplierProduct?.price)}</Text>
                  {/* <Text>
                    {' '}
                    Harga Minimum: Rp. {supplierProduct?.priceMin ?? '-'}
                  </Text>
                  <Text>
                    {' '}
                    Harga Maximum: Rp. {supplierProduct?.priceMax ?? '-'}
                  </Text> */}
                  <Text>
                    {' '}
                    Minimum Order: {supplierProduct?.minOrder ?? '-'}
                  </Text>
                  <Text> Berat: {supplierProduct?.weight ?? '-'} Kg</Text>
                  <Text>
                    {' '}
                    Satuan Berat: {supplierProduct?.weightUnit ?? 'Kg'}
                  </Text>
                  <Text>
                    {' '}
                    Detail Berat: {supplierProduct?.weightDetails ?? ''}
                  </Text>
                  <Text>
                    {' '}
                    Dimensi: {supplierProduct?.dimension?.width ?? ''}
                  </Text>
                  <Text> Stok: {supplierProduct.stock ?? ''} pcs</Text>
                  <Text>Deskripsi: {supplierProduct?.description ?? ''}</Text>
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
            // h="92vh"
            display={{ base: 'none', lg: 'unset' }}
          >
            <Box pb={3} justifyContent="center">
              {supplierProduct?.id}
            </Box>

            <Divider />

            <Flex pt={5} justifyContent="space-between" alignItems="center">
              <Box>Toko Supplier </Box>
              <Box>{supplierProduct?.supplierId ?? ''}</Box>
            </Flex>

            <Flex pt={5} justifyContent="space-between" alignItems="center">
              <Box>Pemilik </Box>
              <Box>{supplierProduct?.ownerId ?? ''}</Box>
            </Flex>

            <Flex pt={3} justifyContent="space-between" alignItems="center">
              <Box>Kategori </Box>
              <Box>Keperluan rumah tangga </Box>
            </Flex>

            <Flex
              pt={3}
              pb={3}
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>Bidang</Box>
              <Box>Papan</Box>
            </Flex>

            <Divider />

            <Flex pt={5} justifyContent="space-between" alignItems="center">
              <Box>Dijual mulai </Box>
              <Box>{supplierProduct.createdAt}</Box>
            </Flex>

            <Flex pt={5} justifyContent="space-between" alignItems="center">
              <Box>Terakhir diubah</Box>
              <Box>{supplierProduct.updatedAt}</Box>
            </Flex>
          </Box>
        </Grid>
      </Box>
    </DefaultLayout>
  )
}
