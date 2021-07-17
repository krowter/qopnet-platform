/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  CloseButton,
  Flex,
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
  Grid,
  useColorModeValue,
  Divider,
  Select,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'

import { DefaultLayout } from '../../layouts'
import { useSWR } from '../../utils/swr'
import { postToAPI } from '../../utils/fetch'
import { ModifierButtons } from '../../components'

export const SupplierProductAddPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const onSubmit = async (data: any) => {
    console.log('data: ', data)
    console.log('suppliers', suppliers)
    const filteredSupplier = await suppliers.supplier.filter(
      (supplier: any) => supplier.id === data.supplierId
    )
    console.log(filteredSupplier)
    const { ownerId, handle } = filteredSupplier[0]
    console.log({ ownerId })
    const finalFormData = { ...data, ownerId }
    try {
      const submitData = await postToAPI(
        `/api/suppliers/${handle}/products`,
        finalFormData
      )
      if (!submitData) throw new Error('Create supplier response error')

      // router.push(`/${data.supplier.handle}`)
      history.push('/suppliers/products')
    } catch (error) {
      alert('Gagal membuat supplier')
    }
  }
  const history = useHistory()
  const { data: suppliers, error } = useSWR('/api/suppliers')
  const leftElementColor = useColorModeValue('black', 'white')

  return (
    <DefaultLayout>
      <Box
        m={2}
        rounded={10}
        minHeight="98vh"
        border="1px solid gray"
        borderColor={useColorModeValue('gray.300', 'gray.600')}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex
            p={3}
            alignItems="center"
            borderBottom="1px solid gray"
            borderColor={useColorModeValue('gray.100', 'gray.700')}
          >
            <CloseButton onClick={() => history.goBack()} />
            <Text ml={3} fontWeight={700}>
              Tambah Produk
            </Text>
            <ModifierButtons />
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
                  <BreadcrumbLink href="#">Semua Produk</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink href="#">Tambah Produk</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
              {error ? (
                <Box px={5} py={3}>
                  {' '}
                  {'Gagal memuat produk supplier'}
                </Box>
              ) : !suppliers ? (
                <Box px={5} py={3}>
                  <Spinner color="orange.500" />
                </Box>
              ) : (
                <VStack id="suppliers-products-all" mt={5} pl={14} spacing={5}>
                  <FormControl id="name">
                    <FormLabel>Supplier</FormLabel>
                    <Select
                      placeholder="Pilih Supplier"
                      defaultValue=""
                      {...register('supplierId', { required: true })}
                    >
                      {suppliers?.supplier
                        ? suppliers?.supplier?.map((supplier: any) => (
                            <option value={supplier.id} key={supplier.id}>
                              {supplier.name}
                            </option>
                          ))
                        : ''}
                    </Select>
                  </FormControl>
                  <FormControl id="name">
                    <FormLabel>Nama Produk</FormLabel>
                    <Input
                      type="text"
                      defaultValue=""
                      {...register('name', { required: true })}
                    />
                  </FormControl>
                  <FormControl id="slug">
                    <FormLabel>Slug</FormLabel>
                    <Input
                      type="text"
                      defaultValue=""
                      {...register('slug', { required: true })}
                    />
                  </FormControl>
                  <FormControl id="sku">
                    <FormLabel>SKU</FormLabel>
                    <Input
                      type="text"
                      defaultValue=""
                      {...register('sku', { required: true })}
                    />
                  </FormControl>
                  <FormControl id="price">
                    <FormLabel>Harga</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color={leftElementColor}
                        fontWeight={300}
                        fontSize="1.2em"
                        children="Rp"
                      />
                      <Input
                        type="number"
                        defaultValue=""
                        {...register('price', { required: true })}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl id="price-minimum">
                    <FormLabel>Harga Minimum</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color={leftElementColor}
                        fontWeight={300}
                        fontSize="1.2em"
                        children="Rp"
                      />
                      <Input
                        type="number"
                        defaultValue=""
                        {...register('priceMin')}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl id="price-maximum">
                    <FormLabel>Harga Maksimum</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color={leftElementColor}
                        fontWeight={300}
                        fontSize="1.2em"
                        children="Rp"
                      />
                      <Input
                        type="number"
                        defaultValue=""
                        {...register('priceMax')}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl id="description">
                    <FormLabel>Deskripsi</FormLabel>
                    <Input type="text" {...register('description')} />
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
              display={{ base: 'none', lg: 'unset' }}
            >
              <Box pb={3} justifyContent="center">
                Tambah Produk
              </Box>

              <Divider />

              <Flex pt={5} justifyContent="space-between" alignItems="center">
                <Box>Toko Supplier </Box>
                <Box>-</Box>
              </Flex>

              <Flex pt={5} justifyContent="space-between" alignItems="center">
                <Box>Pemilik </Box>
                <Box>-</Box>
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
                <Box>-</Box>
              </Flex>

              <Flex pt={5} justifyContent="space-between" alignItems="center">
                <Box>Terakhir diubah</Box>
                <Box>-</Box>
              </Flex>
            </Box>
          </Grid>
        </form>
      </Box>
    </DefaultLayout>
  )
}
