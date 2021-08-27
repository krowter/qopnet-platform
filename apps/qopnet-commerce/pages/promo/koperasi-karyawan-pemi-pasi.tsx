import { Layout } from '@qopnet/qopnet-ui'
import {
  Flex,
  Image,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  FormHelperText,
  Divider,
  Heading,
  Text,
  Button,
  Box,
  Center,
  Stack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import Axios from 'axios'

export const CreatePromoPanarubPage = () => {
  const iframe =
    '<script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></script><iframe class="airtable-embed airtable-dynamic-height" src="https://airtable.com/embed/shrpk4LQ10HJYuQVz?backgroundColor=yellow" frameborder="0" onmousewheel="" width="100%" height="1902" style="background: transparent; border: 1px solid #ccc;"></iframe>'
  const employerId = 'cksekdp800232qcpj03v31r2q'
  // const sampleEmployeeId = '19770900001'
  const basePrice = 84999
  const [values, setValues] = useState({
    employeeId: '',
    nationalId: '',
    name: '',
    phone: '',
    email: '',
    birthPlace: '',
    birthDate: '',
    street: '',
    streetDetails: '',
    city: '',
    state: '',
    zip: '',
    subDistrict: '',
    orderQuantity: 1,
    totalPrice: 84999,
  })

  const handleEmployeeIdChange = (event) => {
    event.persist()
    setValues((values) => ({
      ...values,
      employeeId: event.target.value,
    }))
  }

  const handleSubmitEmployeeId = async (event) => {
    event.preventDefault()
    try {
      const { data } = await Axios.get(
        // `http://localhost:4000/api/promos/employees/${employerId}/${values.employeeId}`
        `https://api-staging.qopnet.id/api/promos/employees/${employerId}/${values.employeeId}`
      )
      const { promoEmployee } = data
      setValues((values) => ({
        ...values,
        name: promoEmployee.name,
        phone: promoEmployee.phone,
        email: promoEmployee.email,
        nationalId: promoEmployee.nationalId,
        birthPlace: promoEmployee.birthPlace,
        birthDate: promoEmployee.birthDate,
        street: promoEmployee.street,
        streetDetails: promoEmployee.streetDetails,
        city: promoEmployee.city,
        zip: promoEmployee.zip,
      }))
    } catch (error) {
      console.log({
        message: 'Error getting employee detail by employeeId',
        error,
      })
    }
  }

  const handleOrderQuantityChange = (qty) => {
    // console.log('handleOrderQuantityChange', qty)
    
    setValues((values) => ({
      ...values,
      orderQuantity: qty,
      totalPrice: qty * basePrice
    }))
  }

  return (
    <Layout pt={10}>
      <Flex flexDirection="column">
        <Image src="https://rryitovbrajppywbpmit.supabase.in/storage/v1/object/public/images/promo/promo-banner-panarub.jpg" />
        {/* <div dangerouslySetInnerHTML={{ __html: iframe }}></div> */}

        <br />
        <Center>
          <Box w="80%" borderRadius="md" p={4} bg="#ffffff">
            <Heading size="xl">Lembar Pemesanan</Heading>

            <Divider orientation="horizontal" />
            <br />

            <form onSubmit={handleSubmitEmployeeId}>
              <FormControl id="employee-id" isRequired>
                <FormLabel>Nomor Induk Karyawan (NIK)</FormLabel>
                <Input
                  placeholder="197709XXXXX"
                  type="text"
                  value={values.employeeId}
                  onChange={handleEmployeeIdChange}
                />
                <FormHelperText>
                  Masukkan NIK anda dan kirim untuk mendapatkan profil dari
                  perusahaan
                </FormHelperText>
              </FormControl>

              <Button mt={4} colorScheme="orange" type="submit">
                Kirim NIK
              </Button>
            </form>

            <br />
            <br />

            <form>
              <Heading size="md">Detail Pesanan</Heading>
              <Stack spacing={4}>
              
              <FormControl id="name">
                <FormLabel>Jumlah Paket yang dipesan</FormLabel>
                <NumberInput
                  onChange={handleOrderQuantityChange}
                  defaultValue={1}
                  max={10}
                  keepWithinRange={false}
                  clampValueOnBlur={false}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <br />
                <Heading size="sm">Total: <strong>Rp.{values.totalPrice}</strong></Heading>
              </FormControl>
              
              <br />

              <Heading size="md">Data Diri</Heading>
              
              <FormControl id="name">
                <FormLabel>Nama (berdasar NIK)</FormLabel>
                <Input
                  type="text"
                  value={values.name}
                  onChange={(event) => {
                    event.persist()
                    setValues((values) => ({
                      ...values,
                      name: event.target.value,
                    }))
                  }}
                  isDisabled
                />
              </FormControl>
              
              <FormControl id="phone">
                <FormLabel>Nomor Telepon/Handphone</FormLabel>
                <Input
                  type="text"
                  value={values.phone}
                  onChange={(event) => {
                    event.persist()
                    setValues((values) => ({
                      ...values,
                      phone: event.target.value,
                    }))
                  }}
                />
              </FormControl>
              
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  type="text"
                  value={values.email}
                  onChange={(event) => {
                    event.persist()
                    setValues((values) => ({
                      ...values,
                      email: event.target.value,
                    }))
                  }}
                />
              </FormControl>
              
              <FormControl id="birthPlace">
                <FormLabel>Tempat Lahir</FormLabel>
                <Input
                  type="text"
                  value={values.birthPlace}
                  onChange={(event) => {
                    event.persist()
                    setValues((values) => ({
                      ...values,
                      birthPlace: event.target.value,
                    }))
                  }}
                />
              </FormControl>
              
              <FormControl id="birthDate">
                <FormLabel>Tanggal Lahir</FormLabel>
                <Input
                  type="text"
                  value={values.birthDate}
                  onChange={(event) => {
                    event.persist()
                    setValues((values) => ({
                      ...values,
                      birthDate: event.target.value,
                    }))
                  }}
                />
              </FormControl>
              
              <FormControl id="nationalId">
                <FormLabel>Nomor KTP</FormLabel>
                <Input
                  type="text"
                  value={values.nationalId}
                  onChange={(event) => {
                    event.persist()
                    setValues((values) => ({
                      ...values,
                      nationalId: event.target.value,
                    }))
                  }}
                />
              </FormControl>
              
              <FormControl id="street">
                <FormLabel>Alamat</FormLabel>
                <Input
                  type="text"
                  value={values.street}
                  onChange={(event) => {
                    event.persist()
                    setValues((values) => ({
                      ...values,
                      street: event.target.value,
                    }))
                  }}
                />
              </FormControl>
              
              <FormControl id="streetDetails">
                <FormLabel>Detail Alamat</FormLabel>
                <Input
                  type="text"
                  value={values.streetDetails}
                  onChange={(event) => {
                    event.persist()
                    setValues((values) => ({
                      ...values,
                      streetDetails: event.target.value,
                    }))
                  }}
                />
              </FormControl>
              
              <FormControl id="city">
                <FormLabel>Kota</FormLabel>
                <Input
                  type="text"
                  value={values.city}
                  onChange={(event) => {
                    event.persist()
                    setValues((values) => ({
                      ...values,
                      city: event.target.value,
                    }))
                  }}
                />
              </FormControl>
              
              <FormControl id="state">
                <FormLabel>Provinsi</FormLabel>
                <Input
                  type="text"
                  value={values.state}
                  onChange={(event) => {
                    event.persist()
                    setValues((values) => ({
                      ...values,
                      state: event.target.value,
                    }))
                  }}
                />
              </FormControl>

              
              <FormControl id="subDistrict">
                <FormLabel>Kecamatan</FormLabel>
                <Input
                  type="text"
                  value={values.subDistrict}
                  onChange={(event) => {
                    event.persist()
                    setValues((values) => ({
                      ...values,
                      subDistrict: event.target.value,
                    }))
                  }}
                />
              </FormControl>
              
              <FormControl id="zip">
                <FormLabel>Kodepos</FormLabel>
                <Input
                  type="text"
                  value={values.zip}
                  onChange={(event) => {
                    event.persist()
                    setValues((values) => ({
                      ...values,
                      zip: event.target.value,
                    }))
                  }}
                />
              </FormControl>
              </Stack>
              
              <Button mt={4} w="full" colorScheme="orange" type="submit">
                Pesan
              </Button>
              <Text color="gray.500">Pesanan akan dikonfirmasi terlebih dahulu dengan pihak koperasi paling lambat 1x24 jam, anda akan kami hubungi melalui nomor telepon untuk konfirmasi</Text>

            </form>
          </Box>
        </Center>
      </Flex>
    </Layout>
  )
}

export default CreatePromoPanarubPage
