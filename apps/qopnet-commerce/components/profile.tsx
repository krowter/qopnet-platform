import { useState } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
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
import { postToAPI } from '../utils/fetch'

export type ProfileData = {
  // Profile
  name?: string
  handle?: string
  phone?: string

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

export const CreateProfileForm = ({ profile }) => {
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
  } = useForm<ProfileData>({
    defaultValues: {
      ...profile,
      address: profile?.addresses[0],
    },
  })

  // Create profile process and toast
  const handleSubmitCreateProfile: SubmitHandler<ProfileData> = async (
    profileFormData
  ) => {
    try {
      setLoading(true)
      // This will use PUT instead of POST
      // Adaptive create or update
      const data = await postToAPI('/api/profiles', {
        ...profileFormData,
      })
      if (!data) throw new Error('Update profile response error')
      console.log({ data })

      toast({ title: 'Berhasil menyimpan profil', status: 'success' })
      router.push(`/dashboard`)
    } catch (error) {
      toast({ title: 'Gagal menyimpan profil', status: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <VStack spacing={10}>
      <NextSeo title="Profil dan alamat - Qopnet" />

      <VStack>
        <Stack align="center">
          <Heading as="h1" size="xl">
            Profil dan Alamat
          </Heading>
          <Text>
            Silakan lengkapi profil dan informasi alamat pribadi Anda.
          </Text>
        </Stack>
      </VStack>

      <SimpleGrid
        onSubmit={handleSubmit(handleSubmitCreateProfile)}
        as="form"
        w="100%"
        maxW="720px"
        columns={[1, 2, 2]}
        spacing={5}
      >
        <Stack>
          <FormControl>
            <FormLabel>Nama Lengkap</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon name="name" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Nama Lengkap"
                {...register('name', { required: true })}
              />
            </InputGroup>
            <FormHelperText color="red.500">
              {errors.name && <span>Nama lengkap diperlukan</span>}
            </FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>Username</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon name="handle" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="namasaya"
                {...register('handle', { required: true })}
              />
            </InputGroup>
            <FormHelperText color="red.500">
              {errors.handle && <span>Username diperlukan</span>}
            </FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>Nomor telepon/HP/WhatsApp</FormLabel>
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
            loadingText="Menyimpan profil dan alamat..."
            colorScheme="orange"
            type="submit"
          >
            Simpan Profil dan Alamat
          </Button>
        </Stack>
      </SimpleGrid>
    </VStack>
  )
}
