import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser, useSupabase } from 'use-supabase'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  SimpleGrid,
  Spinner,
  Stack,
  Tag,
  Text,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { FundBeneficiary } from '@prisma/client'

import { Layout, Icon } from '@qopnet/qopnet-ui'
import { useSWR } from '../../../utils/swr'
import { postToAPI } from '../../../utils/fetch'

export const FinancingRequestPage = () => {
  const user = useUser()
  const router = useRouter()
  useEffect(() => {
    if (!user) {
      router.push('/signin')
    }
  }, [user, router])

  const { data, error } = useSWR('/api/profiles/my')
  const { profile } = data || {}

  return (
    <Layout
      pt={10}
      meta={{
        title: 'Ajukan pinjaman',
        description: 'Daftar untuk mengajukan pinjaman',
      }}
    >
      {error && <Text>Gagal memuat profil</Text>}
      {!error && !data && (
        <HStack>
          <Spinner />
          <Text>Memuat profil dan info pengajuan...</Text>
        </HStack>
      )}
      {!error && data && user && <RequestFundForm profile={profile} />}
    </Layout>
  )
}

export const RequestFundForm = ({ profile }) => {
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
  } = useForm<FundBeneficiary>()

  // Create or Update fund beneficiary record
  const handleSubmitFundBeneficiary: SubmitHandler<FundBeneficiary> = async (
    formData
  ) => {
    try {
      setLoading(true)
      // const data = await postToAPI('/api/financing/duhasyariah/beneficiaries', {
      //   ...formData,
      // })
      // if (!data) throw new Error('Send request fund error')
      toast({ title: 'Berhasil mengirim pengajuan', status: 'success' })
    } catch (error) {
      toast({ title: 'Gagal mengirim pengajuan', status: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <VStack spacing={10}>
      <Stack align="center" textAlign="center">
        <Heading>Daftar untuk pengajuan pembiayaan</Heading>
        <Text>
          Anda akan mengirim atau mengubah pengajuan dengan informasi berikut
        </Text>
        <HStack>
          <Text>Status pengajuan:</Text>
          <Tag>Belum ada</Tag>
        </HStack>
      </Stack>

      <SimpleGrid
        onSubmit={handleSubmit(handleSubmitFundBeneficiary)}
        as="form"
        w="100%"
        maxW="720px"
        columns={[1, 2, 2]}
        spacing={5}
      >
        <Stack id="user-profile-address">
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              disabled
              // {...register('user.email', )}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Nama lengkap</FormLabel>
            <Input
              disabled
              // {...register('profile.name', )}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Nomor telepon/HP/WhatsApp</FormLabel>
            <Input
              disabled
              // {...register('profile.phone', )}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Alamat</FormLabel>
            <Input
              disabled
              // {...register('address.street', { required: true })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Detail alamat</FormLabel>
            <Textarea
              disabled
              // {...register('address.streetDetails')}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Kode pos</FormLabel>
            <Input
              disabled
              // {...register('address.zip', { required: true })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Kota</FormLabel>
            <Input
              disabled
              // {...register('address.city', { required: true })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Provinsi</FormLabel>
            <Input
              disabled
              // {...register('address.state', { required: true })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Negara</FormLabel>
            <Select
              disabled
              // {...register('address.countryCode', { required: true })}
            >
              <option value="ID">Indonesia</option>
            </Select>
          </FormControl>
        </Stack>

        <Stack id="fund-beneficiary">
          <FormControl>
            <FormLabel>Pilihan layanan pembiayaan</FormLabel>
            <Select
              placeholder="Pilih layanan"
              // {...register('address.countryCode', { required: true })}
            >
              <option value="duhasyariah">Duha Syariah</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Nomor KTP</FormLabel>
            <Input
              fontFamily="mono"
              letterSpacing="0.1em"
              placeholder="0011223344556677"
              // {...register('nationalId', )}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Tempat lahir</FormLabel>
            <Input
              placeholder="Nama kota"
              // {...register('birthPlace', )}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Tanggal lahir</FormLabel>
            <Input
            // {...register('birthDate', )}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Jumlah pendapatan bulanan</FormLabel>
            <Input
              type="number"
              min={0}
              max={999999999999}
              placeholder="1000000"
              // {...register('income', )}
            />
            <FormHelperText>Angka dalam rupiah</FormHelperText>
          </FormControl>
          <Button
            isLoading={loading}
            loadingText="Menyimpan dan mengirim pengajuan..."
            colorScheme="orange"
            type="submit"
          >
            Simpan dan Kirim Pengajuan
          </Button>
        </Stack>
      </SimpleGrid>
    </VStack>
  )
}

export default FinancingRequestPage
