import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  Button,
  Text,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Spinner,
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

export type ProfileData = {
  // Profile
  name: string
  handle: string
  phone: string

  // Address
  address: {
    street: string // Jl. Street Name
    streetDetails?: string // Optional details such as floor number
    city: string
    state: string // Province
    zip: string // Postal code
    countryCode: string // Save as ID, not Indonesia
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
  } = useForm<ProfileData>()

  // Create profile process and toast
  const handleSubmitCreateProfile: SubmitHandler<ProfileData> = async (
    profileFormData
  ) => {
    try {
      setLoading(true)

      // Mutate to create profile via POST /api/profiles
      console.log({ profileFormData })

      const profile = true
      const error = false

      if (profile) {
        toast({ title: 'Berhasil membuat profil', status: 'success' })
        // router.push('/dashboard')
        /**
         * Dashboard to choose to:
         * 1. continue shopping
         * 2. create supplier
         * 3. create supplier product
         */
      } else if (error) {
        throw new Error('Gagal membuat profil')
      }
    } catch (error) {
      toast({ title: 'Gagal membuat profil', status: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <VStack mt={20} spacing={10}>
      <VStack>
        <Stack align="center">
          <Heading as="h1" size="xl">
            Buat profil dan atur alamat
          </Heading>
          <Text>Silakan lengkapi profil dan informasi alamat.</Text>
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
            <Input
              type="text"
              placeholder="Nama Lengkap"
              {...register('name', { required: true })}
            />
            <FormHelperText color="red.500">
              {errors.name && <span>Nama lengkap diperlukan</span>}
            </FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="username"
              {...register('handle', { required: true })}
            />
            <FormHelperText color="red.500">
              {errors.handle && <span>Username diperlukan</span>}
            </FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>Nomor telepon/HP/WhatsApp</FormLabel>
            <Input
              type="tel"
              placeholder="+62 1234 5678"
              {...register('phone', { required: true })}
            />
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
              {errors.address.street && <span>Alamat diperlukan</span>}
            </FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>Detail alamat</FormLabel>
            <Textarea
              {...register('address.streetDetails')}
              placeholder="RT/RW 01/02, Kelurahan, Kecamatan"
            />
            <FormHelperText color="red.500">
              {errors.address.streetDetails && (
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
              {errors.address.zip && <span>Kode pos diperlukan</span>}
            </FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>Kota</FormLabel>
            <Input
              {...register('address.city', { required: true })}
              placeholder="Nama kota"
            />
            <FormHelperText color="red.500">
              {errors.address.city && <span>Kota diperlukan</span>}
            </FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>Provinsi</FormLabel>
            <Input
              {...register('address.state', { required: true })}
              placeholder="Nama provinsi"
            />
            <FormHelperText color="red.500">
              {errors.address.state && <span>Provinsi diperlukan</span>}
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
              {errors.address.countryCode && <span>Negara diperlukan</span>}
            </FormHelperText>
          </FormControl>

          <Button
            isLoading={loading}
            loadingText="Membuat profil..."
            colorScheme="orange"
            type="submit"
          >
            Buat Profil dan Alamat
          </Button>
        </Stack>
      </SimpleGrid>
    </VStack>
  )
}
