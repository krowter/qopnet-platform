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
  Input,
  FormControl,
  FormLabel,
  InputLeftElement,
  InputGroup,
  Textarea,
  Grid,
  useColorModeValue,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

import { useParams, useHistory } from 'react-router'

import { DefaultLayout } from '../../layouts'
import { useSWR } from '../../utils/swr'

const truncateString = (str: string, num: number) => {
  // If the length of str is less than or equal to num
  // just return str, don't truncate it.
  if (str.length <= num) {
    return str
  }
  // Return str truncated with '...' concatenated to the end of str.
  return str.slice(0, num) + '...'
}

export const SupplierProductSlugPage = () => {
  const history = useHistory()
  const {
    supplierParam,
    productParam,
  }: { supplierParam: string; productParam: string } = useParams()
  const { data: { supplierProducts = [], message } = [], error } = useSWR(
    `/api/suppliers/products/${productParam}`
  )

  let filteredSupplierProducts

  if (supplierProducts) {
    console.log('supplierProducts data: ', supplierProducts)
    filteredSupplierProducts = supplierProducts.filter(
      (supplier: any) => supplier.slug === productParam
    )[0]
  }

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
          <CloseButton onClick={() => history.goBack()} />
          <Text ml={3} fontWeight={700}>
            {productParam}
          </Text>
          <HStack ml="auto">
            <Button variant="outline" size="xs" colorScheme="orange.900">
              Simpan
            </Button>
            <Button variant="outline" size="xs" colorScheme="orange.900">
              Batal
            </Button>
            <Button variant="outline" size="xs" colorScheme="orange.900">
              Ubah
            </Button>
            <Button variant="outline" size="xs" colorScheme="orange.900">
              Hapus
            </Button>
          </HStack>
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
                <BreadcrumbLink href="#">Supplier</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <BreadcrumbLink href="#">{supplierParam}</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <BreadcrumbLink href="#">Products</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href="#">{productParam}</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            {error ? (
              <Box px={5} py={3}>
                {' '}
                {message ? message : 'Gagal memuat produk supplier'}
              </Box>
            ) : supplierProducts.length === 0 ? (
              <Box px={5} py={3}>
                <Spinner color="orange.500" />
              </Box>
            ) : (
              <VStack id="suppliers-products-all" mt={5} pl={14} spacing={5}>
                <FormControl id="name">
                  <FormLabel>Nama</FormLabel>
                  <Input
                    type="text"
                    value={filteredSupplierProducts.name}
                    readOnly
                  />
                </FormControl>
                <FormControl id="slug">
                  <FormLabel>Slug</FormLabel>
                  <Input
                    type="text"
                    value={filteredSupplierProducts.slug}
                    readOnly
                  />
                </FormControl>
                <FormControl id="sku">
                  <FormLabel>SKU</FormLabel>
                  <Input
                    type="text"
                    value={filteredSupplierProducts.sku}
                    readOnly
                  />
                </FormControl>
                <FormControl id="price">
                  <FormLabel>Harga</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="black"
                      fontWeight={300}
                      fontSize="1.2em"
                      children="Rp"
                    />
                    <Input
                      type="number"
                      value={filteredSupplierProducts.price}
                      readOnly
                    />
                  </InputGroup>
                </FormControl>
                <FormControl id="price-minimum">
                  <FormLabel>Harga Minimum</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="black"
                      fontWeight={300}
                      fontSize="1.2em"
                      children="Rp"
                    />
                    <Input
                      type="number"
                      value={filteredSupplierProducts.priceMin ?? null}
                      readOnly
                    />
                  </InputGroup>
                </FormControl>
                <FormControl id="price-maximum">
                  <FormLabel>Harga Maksimum</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="black"
                      fontWeight={300}
                      fontSize="1.2em"
                      children="Rp"
                    />
                    <Input
                      type="number"
                      value={filteredSupplierProducts.priceMax ?? null}
                      readOnly
                    />
                  </InputGroup>
                </FormControl>
                <FormControl id="description">
                  <FormLabel>Deskripsi</FormLabel>
                  <Textarea
                    value={filteredSupplierProducts.description}
                    size="lg"
                    readOnly
                    minHeight="300px"
                    mb={5}
                  />
                </FormControl>
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
            <Box pb={3} justifyContent="center" borderBottom="1px solid gray">
              {productParam}
            </Box>
            <Flex pt={5} justifyContent="space-between" alignItems="center">
              <Box>Pemilik </Box>
              <Box>{supplierParam}</Box>
            </Flex>
            <Flex pt={3} justifyContent="space-between" alignItems="center">
              <Box>Kategori </Box>
              <Box>Keperluan Rumah Tangga </Box>
              {/* <Box>{supplierParam}</Box> */}
            </Flex>
            <Flex pt={3} justifyContent="space-between" alignItems="center">
              <Box>Bidang</Box>
              <Box>Papan</Box>
              {/* <Box>{supplierParam}</Box> */}
            </Flex>
          </Box>
        </Grid>
      </Box>
    </DefaultLayout>
  )
}
