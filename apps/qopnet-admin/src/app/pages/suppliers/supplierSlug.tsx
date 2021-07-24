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
import { Supplier } from '@prisma/client'

import { useParams, useHistory } from 'react-router'
import { DefaultLayout } from '../../layouts'
import { useSWR } from '../../utils/swr'
import { ModifierButtons } from '../../components'
import { Icon } from '@qopnet/qopnet-ui'

export const SupplierSlugPage = () => {
  const sidebar = useDisclosure()
  const { supplierParam }: { supplierParam: string } = useParams()
  const { data, error } = useSWR(
    `/api/suppliers/${supplierParam}`
  )
  const { supplier } = data || {}

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
          <CloseButton as={Link} to="/suppliers" />
          <Text ml={3} fontWeight={700}>
            {supplierParam}
          </Text>
          <ModifierButtons
            supplierParam={supplierParam}
            editRoute={`/suppliers/${supplierParam}/edit`}
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

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink>{supplierParam}</BreadcrumbLink>
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
                        {supplierParam}
                      </Box>

                      <Divider />

                      <Flex
                        pt={5}
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box>Toko Supplier </Box>
                        <Box>{supplier?.id}</Box>
                      </Flex>

                      <Flex
                        pt={5}
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box>Pemilik </Box>
                        <Box>{supplier?.ownerId}</Box>
                      </Flex>

                      <Flex
                        pt={3}
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box>Kategori </Box>
                        <Box>{supplier?.category}</Box>
                      </Flex>

                      <Divider />

                      <Flex
                        pt={5}
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box>Dibuat mulai </Box>
                        <Box>{supplier?.createdAt}</Box>
                      </Flex>

                      <Flex
                        pt={5}
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box>Terakhir diubah</Box>
                        <Box>{supplier?.updatedAt}</Box>
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
                Gagal memuat produk supplier
              </Box>
            ) : supplier?.length === 0 ? (
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
                  <Text as="h1">Nama Supplier: {supplier?.name}</Text>
                  <Text>Kontak: {supplier?.phone}</Text>
                  <Text>NPWP: {supplier?.nationalTax ?? ''}</Text>
                  <Text>
                    Sertifikat Usaha: {supplier?.certificationFile ?? ''}
                  </Text>
                  <Text>Pemilik: {supplier?.owner.name ?? ''}</Text>
                  <Text>Handle: {supplier?.owner.handle ?? ''}</Text>
                  <Text>Kontak: {supplier?.owner.phone ?? ''}</Text>
                  <Text>Email: {supplier?.owner.user.email ?? ''}</Text>
                  <Divider />
                  {supplier?.addresses.length > 0
                    ? supplier?.addresses.map((address: any, index: number) => (
                        <Box key={index}>
                          <Text as="h2" fontWeight="700">
                            Alamat {index + 1}:
                          </Text>
                          <Text>Kota: {address.city ?? ''}</Text>
                          <Text>Provinsi: {address.state ?? ''}</Text>
                          <Text>Jalan: {address.street ?? ''}</Text>
                          <Text>Kode Pos: {address.zip ?? ''}</Text>
                        </Box>
                      ))
                    : null}
                  <Divider />
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
              {supplierParam}
            </Box>

            <Divider />

            <Flex pt={5} justifyContent="space-between" alignItems="center">
              <Box>Toko Supplier </Box>
              <Box>{supplier?.id}</Box>
            </Flex>

            <Flex pt={5} justifyContent="space-between" alignItems="center">
              <Box>Pemilik </Box>
              <Box>{supplier?.ownerId}</Box>
            </Flex>

            <Flex pt={3} justifyContent="space-between" alignItems="center">
              <Box>Kategori </Box>
              <Box>{supplier?.category}</Box>
            </Flex>

            <Divider />

            <Flex pt={5} justifyContent="space-between" alignItems="center">
              <Box>Dibuat mulai </Box>
              <Box>{supplier?.createdAt}</Box>
            </Flex>

            <Flex pt={5} justifyContent="space-between" alignItems="center">
              <Box>Terakhir diubah</Box>
              <Box>{supplier?.updatedAt}</Box>
            </Flex>
            <Flex pt={5} justifyContent="space-between" alignItems="center">
              <Button
                ml="auto"
                as={Link}
                to={`/suppliers/${supplier?.slug}/products`}
                variant="outline"
                size="xs"
                colorScheme="orange.900"
              >
                Lihat Produk
              </Button>
            </Flex>
          </Box>
        </Grid>
      </Box>
    </DefaultLayout>
  )
}
