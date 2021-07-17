import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import slugify from 'slugify'
import {
  Button,
  Text,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Spinner,
  InputGroup,
  InputLeftElement,
  Input,
  Stack,
  VStack,
  Select,
  Textarea,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useUser, useSupabase } from 'use-supabase'

import { Icon } from '@qopnet/qopnet-ui'

export type SupplierData = {
  // Supplier
  name?: string
  handle?: string
  phone?: string
  nationalTax?: string
  certificationFile?: string
  category?: string | 'PRODUCER'

  // Address
  address?: {
    street?: string // Jl. Street Name
    streetDetails?: string // Optional details such as floor number
    city?: string
    state?: string // Province
    zip?: string // Postal code
    countryCode?: string // Save as ID, not Indonesia
  }
}

export const CreateSupplierForm = () => {
  const router = useRouter()
  const toast = useToast()
  const user = useUser()
  const supabase = useSupabase()
  const [loading, setLoading] = useState(false)

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SupplierData>()

  // Create supplier process and toast
  const handleSubmitCreateSupplier: SubmitHandler<SupplierData> = async (
    supplierFormData
  ) => {
    try {
      setLoading(true)

      // Prepare new supplier data object first
      // Before passing it as request body
      const newSupplierData = {
        ...supplierFormData,
        handle: slugify(supplierFormData.handle.toLowerCase()),
      }

      // Mutate to create supplier via POST /api/suppliers
      console.log({ newSupplierData })

      const supplier = true
      const error = false

      if (supplier) {
        toast({ title: 'Berhasil membuat supplier', status: 'success' })
        // router.push(`/${supplier.handle}`)
      } else if (error) {
        throw new Error('Gagal membuat supplier')
      }
    } catch (error) {
      toast({ title: 'Gagal membuat supplier', status: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <VStack mt={20} spacing={10}>
      <VStack>
        <Stack align="center">
          <Heading as="h1" size="xl">
            Membuat Supplier Baru
          </Heading>
          <Text>Silakan lengkapi data supplier baru Anda.</Text>
        </Stack>
      </VStack>

      <SimpleGrid
        onSubmit={handleSubmit(handleSubmitCreateSupplier)}
        as="form"
        w="100%"
        maxW="720px"
        columns={[1, 2, 2]}
        spacing={5}
      >
        <Stack>
          <FormControl>
            <FormLabel>Nama Supplier</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon name="name" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Nama Supplier"
                {...register('name', { required: true })}
              />
            </InputGroup>
            <FormHelperText>
              <span>
                Contoh: <b>Aneka Baju (PT Aneka Baju Indonesia)</b>
              </span>
            </FormHelperText>
            <FormHelperText color="red.500">
              {errors.name && <span>Nama lengkap supplier diperlukan</span>}
            </FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>Handle</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon name="handle" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="namasupplier"
                {...register('handle', { required: true })}
              />
            </InputGroup>
            <FormHelperText>
              <span>
                Contoh:{' '}
                <b>
                  <code>anekabaju</code>
                </b>
                . Harus huruf kecil semua.
              </span>
            </FormHelperText>
            <FormHelperText color="red.500">
              {errors.handle && <span>Handle/domain supplier diperlukan</span>}
            </FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>Nomor telepon/HP/WhatsApp supplier</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon name="phone" />
              </InputLeftElement>
              <Input
                type="tel"
                placeholder="+62 1234 5678"
                {...register('phone', { required: true })}
              />
            </InputGroup>
            <FormHelperText>
              <span>
                Contoh: <b>+62 1234 5678</b>. Jika bisa bukan nomor telepon
                pribadi.
              </span>
            </FormHelperText>
            <FormHelperText color="red.500">
              {errors.phone && <span>Nomor telepon diperlukan</span>}
            </FormHelperText>
          </FormControl>
        </Stack>

        <Stack>
          <FormControl>
            <FormLabel>Alamat</FormLabel>
            <Input
              {...register('address.street', { required: true })}
              placeholder="Jl. Masukkan nama jalan No. 10"
            />
            <FormHelperText color="red.500">
              {errors.address?.street && <span>Alamat diperlukan</span>}
            </FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>Detail alamat</FormLabel>
            <Textarea
              {...register('address.streetDetails')}
              placeholder="RT/RW 01/02, Kelurahan, Kecamatan"
            />
            <FormHelperText color="red.500">
              {errors.address?.streetDetails && (
                <span>Detail alamat tidak jelas</span>
              )}
            </FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>Kode pos</FormLabel>
            <Input
              {...register('address.zip', { required: true })}
              placeholder="12345"
            />
            <FormHelperText color="red.500">
              {errors.address?.zip && <span>Kode pos diperlukan</span>}
            </FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>Kota</FormLabel>
            <Input
              {...register('address.city', { required: true })}
              placeholder="Nama kota"
            />
            <FormHelperText color="red.500">
              {errors.address?.city && <span>Kota diperlukan</span>}
            </FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>Provinsi</FormLabel>
            <Input
              {...register('address.state', { required: true })}
              placeholder="Nama provinsi"
            />
            <FormHelperText color="red.500">
              {errors.address?.state && <span>Provinsi diperlukan</span>}
            </FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>Negara</FormLabel>
            <Select
              {...register('address.countryCode', { required: true })}
              placeholder="Pilih negara"
            >
              <option value="ID">Indonesia</option>
            </Select>

            <FormHelperText color="red.500">
              {errors.address?.countryCode && <span>Negara diperlukan</span>}
            </FormHelperText>
          </FormControl>

          <Button
            isLoading={loading}
            loadingText="Membuat supplier..."
            colorScheme="orange"
            type="submit"
          >
            Buat Supplier Baru
          </Button>
        </Stack>
      </SimpleGrid>
    </VStack>
  )
}
