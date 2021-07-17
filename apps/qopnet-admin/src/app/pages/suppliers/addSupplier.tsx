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

export const SupplierAddPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const onSubmit = async (data: any) => {
    console.log({ data })
    try {
      const submitData = await postToAPI(`/api/suppliers`, data)
      if (!submitData) throw new Error('Create supplier response error')

      history.push('/suppliers')
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
        height="82vh"
        overflow="scroll"
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
              Tambah Supplier
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

                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink href="#">Tambah Supplier</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
              {error ? (
                <Box px={5} py={3}>
                  {' '}
                  {'Gagal memuat supplier'}
                </Box>
              ) : !suppliers ? (
                <Box px={5} py={3}>
                  <Spinner color="orange.500" />
                </Box>
              ) : (
                <VStack
                  id="suppliers-products-all"
                  mt={5}
                  mb={5}
                  pl={14}
                  spacing={5}
                >
                  <FormControl id="name">
                    <FormLabel>Nama Supplier</FormLabel>
                    <Input
                      type="text"
                      defaultValue=""
                      {...register('name', { required: true })}
                    />
                  </FormControl>
                  <FormControl id="handle">
                    <FormLabel>Handle</FormLabel>
                    <Input
                      type="text"
                      defaultValue=""
                      {...register('handle', { required: true })}
                    />
                  </FormControl>
                  <FormControl id="phone">
                    <FormLabel>No HP</FormLabel>
                    <Input
                      type="text"
                      defaultValue=""
                      {...register('phone', { required: true })}
                    />
                  </FormControl>
                  <FormControl id="category">
                    <FormLabel>Kategori</FormLabel>
                    <Select
                      placeholder="Pilih kategori"
                      defaultValue=""
                      {...register('category', { required: true })}
                    >
                      <option value="PRODUCER">Produsen</option>
                      <option value="DISTRIBUTOR">Distributor</option>
                    </Select>
                  </FormControl>
                  <FormControl id="national-tax">
                    <FormLabel>NPWP</FormLabel>
                    <Input
                      type="text"
                      defaultValue=""
                      {...register('nationalTax')}
                    />
                  </FormControl>
                  <FormControl id="certification-file">
                    <FormLabel>Sertifikat</FormLabel>
                    <Input
                      type="text"
                      defaultValue=""
                      {...register('certificationFile')}
                    />
                  </FormControl>
                  <Divider />
                  <FormControl id="address-street">
                    <FormLabel>Jalan</FormLabel>
                    <Input
                      type="text"
                      defaultValue=""
                      {...register('address.street')}
                    />
                  </FormControl>
                  <FormControl id="address-street-details">
                    <FormLabel>Jalan 2</FormLabel>
                    <Input
                      type="text"
                      defaultValue=""
                      {...register('address.streetDetails')}
                    />
                  </FormControl>
                  <FormControl id="address-zip">
                    <FormLabel>Kode Pos</FormLabel>
                    <Input
                      type="text"
                      defaultValue=""
                      {...register('address.zip')}
                    />
                  </FormControl>
                  <FormControl id="address-state">
                    <FormLabel>Provinsi</FormLabel>
                    <Input
                      type="text"
                      defaultValue=""
                      {...register('address.state')}
                    />
                  </FormControl>
                  <FormControl id="address-city">
                    <FormLabel>Kota</FormLabel>
                    <Input
                      type="text"
                      defaultValue=""
                      {...register('address.city')}
                    />
                  </FormControl>
                  <FormControl id="address-country">
                    <FormLabel>Negara</FormLabel>
                    <Input
                      type="text"
                      defaultValue="ID"
                      readOnly
                      {...register('address.countryCode')}
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
              display={{ base: 'none', lg: 'unset' }}
            >
              <Box pb={3} justifyContent="center">
                Tambah Supplier
              </Box>

              <Divider />
            </Box>
          </Grid>
        </form>
      </Box>
    </DefaultLayout>
  )
}
