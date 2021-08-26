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
import { formatDateTime } from '@qopnet/util-format'

import { DefaultLayout } from '../../layouts'
import { useSWR } from '../../utils/swr'
import { ModifierButtons } from '../../components'
import { Icon, formatPrice } from '@qopnet/qopnet-ui'

export const BusinessOrdersParamPage = () => {
  const sidebar = useDisclosure()
  const { submissionsParam }: { submissionsParam: string } = useParams()
  const { data, error } = useSWR(`/api/promos/submissions/${submissionsParam}`)
  // to be decided from api return value
  const { businessOrder, message } = data || {}

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
          <CloseButton as={Link} to="/business/orders" />
          <Text ml={3} fontWeight={700}>
            {submissionsParam}
          </Text>
          <ModifierButtons
            // productParam={submissionsParam}
            editRoute={`/business/orders/${submissionsParam}/edit`}
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
                  Pesanan Bisnis
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to="/suppliers/products">
                  Daftar Pesanan
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink>{submissionsParam}</BreadcrumbLink>
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
                        {/* {supplierProduct?.supplierId} */}
                      </Box>

                      <Divider />

                      <Flex
                        pt={5}
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box>Toko Supplier </Box>
                        {/* <Box>{supplierProduct?.supplierId}</Box> */}
                      </Flex>

                      <Flex
                        pt={5}
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box>Pemilik </Box>
                        {/* <Box>{supplierProduct.ownerId}</Box> */}
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
                        {/* <Box>{supplierProduct.createdAt}</Box> */}
                      </Flex>

                      <Flex
                        pt={5}
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box>Terakhir diubah</Box>
                        {/* <Box>{supplierProduct.updatedAt}</Box> */}
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
                {message ? message : 'Gagal memuat item pesanan'}
              </Box>
            ) : !businessOrder ? (
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
                  {/* {supplierProduct?.images?.length && (
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
                  )} */}
                  {businessOrder?.businessOrderItems?.length &&
                    businessOrder?.businessOrderItems?.map((item, index) => {
                      return (
                        <>
                          {/* to be decided from api return value  */}
                          <Text> No: {index}</Text>
                          <Text> Id: {item?.id}</Text>
                          <Text> Jumlah: {item?.quantity}</Text>
                          <Text> SupplierId: {item?.supplierId}</Text>
                          <Text>
                            {' '}
                            SupplierProductId: {item?.supplierProductId}
                          </Text>
                          <Text>
                            {' '}
                            Terakhir Diubah: {formatDateTime(item?.updatedAt)}
                          </Text>
                          <Divider />
                        </>
                      )
                    })}
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
              {businessOrder?.id}
            </Box>

            <Divider />

            <Flex pt={5} justifyContent="space-between" alignItems="center">
              <Box>Id</Box>
              <Box>{businessOrder?.id}</Box>
            </Flex>

            <Flex pt={5} justifyContent="space-between" alignItems="center">
              <Box>Pemilik </Box>
              <Box>{businessOrder?.owner?.name}</Box>
            </Flex>

            <Divider />

            <Flex pt={5} justifyContent="space-between" alignItems="center">
              <Box>Dibuat mulai </Box>
              <Box>{formatDateTime(businessOrder?.createdAt)}</Box>
            </Flex>

            <Flex pt={5} justifyContent="space-between" alignItems="center">
              <Box>Terakhir diubah</Box>
              <Box>{formatDateTime(businessOrder?.updatedAt)}</Box>
            </Flex>
            <Flex pt={5} justifyContent="space-between" alignItems="center">
              <Box>Alamat Pengiriman:</Box>
              <Box>{businessOrder?.shipmentAddressId}</Box>
            </Flex>
            <Flex pt={5} justifyContent="space-between" alignItems="center">
              <Box>Jalan:</Box>
              <Box>{businessOrder?.shipmentAddress?.street}</Box>
            </Flex>
            <Flex pt={5} justifyContent="space-between" alignItems="center">
              <Box>Detail Jalan:</Box>
              <Box>{businessOrder?.shipmentAddress?.streetDetails}</Box>
            </Flex>
            <Flex pt={5} justifyContent="space-between" alignItems="center">
              <Box>Kecamatan:</Box>
              <Box>{businessOrder?.shipmentAddress?.subdistrict}</Box>
            </Flex>
            <Flex pt={5} justifyContent="space-between" alignItems="center">
              <Box>Kode Pos:</Box>
              <Box>{businessOrder?.shipmentAddress?.zip}</Box>
            </Flex>
            <Flex pt={5} justifyContent="space-between" alignItems="center">
              <Box>Kota:</Box>
              <Box>{businessOrder?.shipmentAddress?.city}</Box>
            </Flex>
            <Flex pt={5} justifyContent="space-between" alignItems="center">
              <Box>Provinsi:</Box>
              <Box>{businessOrder?.shipmentAddress?.state}</Box>
            </Flex>
            <Flex pt={5} justifyContent="space-between" alignItems="center">
              <Box> Kurir Pengiriman: {businessOrder?.shipmentCourierId}</Box>
            </Flex>
            <Flex pt={5} justifyContent="space-between" alignItems="center">
              <Box> Kendaraan Kurir Pengiriman:</Box>
              <Box>{businessOrder?.shipmentCourierVehicleId}</Box>
            </Flex>
            <Flex pt={5} justifyContent="space-between" alignItems="center">
              <Box>Metode Pembayaran:</Box>
              <Box>{businessOrder?.paymentMethodId}</Box>
            </Flex>
            <Flex pt={5} justifyContent="space-between" alignItems="center">
              <Box>Catatan Pembayaran:</Box>
              <Box>{businessOrder?.paymentRecordId}</Box>
            </Flex>
            <Flex pt={5} justifyContent="space-between" alignItems="center">
              <Box>Total Barang:</Box>
              <Box> {businessOrder?.totalItems}</Box>
            </Flex>
            <Flex pt={5} justifyContent="space-between" alignItems="center">
              <Box>Total Berat:</Box>
              <Box> {businessOrder?.totalWeight}</Box>
            </Flex>
            <Flex pt={5} justifyContent="space-between" alignItems="center">
              <Box>Total Harga Pesanan:</Box>
              <Box> {formatPrice(businessOrder?.totalWeight)}</Box>
            </Flex>
            <Flex pt={5} justifyContent="space-between" alignItems="center">
              <Box>Total Harga Pengiriman:</Box>
              <Box> {formatPrice(businessOrder?.totalShippingCost)}</Box>
            </Flex>
            <Flex pt={5} justifyContent="space-between" alignItems="center">
              <Box>Total Potongan Harga Pengiriman:</Box>
              <Box> {formatPrice(businessOrder?.totalShippingDiscount)}</Box>
            </Flex>
            <Flex pt={5} justifyContent="space-between" alignItems="center">
              <Box>Total Pembayaran:</Box>
              <Box> {formatPrice(businessOrder?.totalPayment)}</Box>
            </Flex>
            <Flex
              pt={5}
              mb={5}
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>Total Tagihan Pembayaran:</Box>
              <Box> {formatPrice(businessOrder?.totalBillPayment)}</Box>
            </Flex>
          </Box>
        </Grid>
      </Box>
    </DefaultLayout>
  )
}
