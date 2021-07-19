import NextLink from 'next/link'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import slugify from 'slugify'
import cuid from 'cuid'
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Box,
  Image as ChakraImage,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Spinner,
  VisuallyHidden,
  Stack,
  Text,
  Link as ChakraLink,
  Divider,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

import { Icon } from '@qopnet/qopnet-ui'
import { UploadImageForm } from '../components'
import { postToAPI } from '../utils/fetch'

// SupplierProduct
export type SupplierProductData = {
  images?: string[]
  slug?: string

  name?: string
  subname?: string
  category?: string
  sku?: string
  description?: string

  price?: number
  priceMax?: number
  priceMin?: number
  minOrder?: number

  weight?: number
  weightUnit?: 'GR' | 'KG' | 'TON'
  weightDetails?: string
  dimension?: {
    length?: number
    width?: number
    height?: number
  }

  status?: 'ACTIVE' | 'INACTIVE'
  stock?: number
}

/**
 * Create new Supplier form component
 */
export const CreateSupplierProductForm = ({ supplierParam }) => {
  const router = useRouter()
  const toast = useToast()
  const [loading, setLoading] = useState(false)

  // React Hook Form
  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<SupplierProductData>({
    mode: 'onChange',
  })
  const uploadedImagesUrl = watch('images')
  console.log({ uploadedImagesUrl })

  // Append image URL from Image Form into React Hook Form field.images
  const appendImageUrl = (newUrl) => {
    console.log({ newUrl })

    const existingImages = getValues('images')
    console.log({ existingImages })

    if (existingImages) {
      setValue('images', [...existingImages, newUrl]) // ✅ performant
    } else {
      setValue('images', [newUrl]) // ✅ performant
    }
  }

  // Create supplier process and toast
  const handleSubmitCreateSupplier: SubmitHandler<SupplierProductData> = async (
    supplierProductFormData
  ) => {
    try {
      setLoading(true)

      /**
       * POST /api/suppliers/:supplierParam/products
       * Create new supplier product for one supplier
       */
      const data = await postToAPI(`/api/suppliers/${supplierParam}/products`, {
        ...supplierProductFormData,
        slug: slugify(supplierProductFormData.name.toLowerCase()),
        // Be careful, supplier product uses slug, not handle
      })
      if (!data) throw new Error('Create supplier product response error')

      toast({ title: 'Berhasil menambah produk supplier', status: 'success' })

      const redirectPath = `/${supplierParam}/${data.supplierProduct.slug}`
      router.push(redirectPath)
    } catch (error) {
      toast({ title: 'Gagal membuat supplier', status: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <VStack spacing={10}>
        <NextSeo title={`Tambah produk supplier ${supplierParam} - Qopnet`} />
        <VStack>
          <Stack align="center">
            <Heading as="h1" size="xl">
              Tambah Produk Supplier
            </Heading>
            <Text>
              Silakan lengkapi info produk untuk <b>{supplierParam}</b>
            </Text>
          </Stack>
        </VStack>

        <Stack spacing={5} w="100%" maxW="800px">
          <Heading as="h2" size="lg">
            Upload Gambar Produk
          </Heading>
          <FormControl>
            <FormLabel>Gambar produk</FormLabel>
            <UploadImageForm appendImageUrl={appendImageUrl} />
            <FormHelperText>
              <span>
                Format gambar <code>.jpg</code> <code>.jpeg</code>{' '}
                <code>.png</code>, ukuran minimum 300 x 300px, tidak lebih dari
                5 MB
              </span>
            </FormHelperText>
          </FormControl>

          {/* Preview uploaded images as boxes */}
          {uploadedImagesUrl?.length && (
            <Flex>
              {uploadedImagesUrl.map((uploadedImageUrl, index) => {
                return (
                  <Box key={cuid()} border="1px solid black" rounded="base">
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
              })}
            </Flex>
          )}
        </Stack>

        <Stack
          onSubmit={handleSubmit(handleSubmitCreateSupplier)}
          as="form"
          w="100%"
          maxW="800px"
          spacing={10}
        >
          <Divider />
          <Stack spacing={5}>
            <Heading as="h2" size="lg">
              Informasi dan Detail Produk
            </Heading>
            <FormControl>
              <FormLabel>Nama Produk</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon name="name" />
                </InputLeftElement>
                <Input
                  type="text"
                  placeholder="Telur Bebek Asin"
                  {...register('name', { required: true })}
                />
              </InputGroup>
              <FormHelperText>
                <span>Nama min. 1 kata</span>
              </FormHelperText>
              <FormHelperText color="red.500">
                {errors.name && <span>Nama produk diperlukan</span>}
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Sub Nama Produk</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon name="subname" />
                </InputLeftElement>
                <Input
                  type="text"
                  placeholder="Gurih Premium Lingkar Kuning dari Bogor"
                  {...register('subname')}
                />
              </InputGroup>
              <FormHelperText>
                <span>
                  Sub nama menjelaskan jenis produk, merek, dan keterangan
                  seperti warna, bahan, atau tipe.
                </span>
              </FormHelperText>
              <FormHelperText color="red.500">
                {errors.name && <span>Sub nama produk tidak jelas</span>}
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Kategori Produk</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon name="category" />
                </InputLeftElement>
                <Input
                  type="text"
                  placeholder="Makanan / Minuman / Bahan Baku / Pakaian / Furnitur"
                  {...register('category', { required: true })}
                />
              </InputGroup>
              <FormHelperText>
                <span>Tuliskan kategori yang paling sesuai</span>
              </FormHelperText>
              <FormHelperText color="red.500">
                {errors.category && <span>Kategori diperlukan</span>}
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>SKU (Stock Keeping Unit)</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon name="sku" />
                </InputLeftElement>
                <Input
                  type="text"
                  placeholder="SKU-1234"
                  {...register('sku')}
                />
              </InputGroup>
              <FormHelperText>
                <span>
                  Gunakan kode unik SKU jika kamu ingin menandai produkmu.
                </span>
              </FormHelperText>
              <FormHelperText color="red.500">
                {errors.sku && <span>SKU tidak jelas</span>}
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Deskripsi Produk</FormLabel>
              <Textarea
                {...register('description')}
                rows={7}
                placeholder="Telur Asin merupakan salah satu makanan yang banyak dicari karena cukup enak untuk dimakan dengan aneka makanan kering maupun berkuah. Telur Bebek Asin Matang ini sudah bisa langsung dinikmati. Telur Asin termasuk makanan tinggi kalori, mengandung vitamin A, C, Kalsium, Fosfor dan zat besi yang baik untuk perkembangan tubuh. Telur Bebek Asin Matang dapat langsung dikonsumsi dengan makanan pilihan kamu."
              />
              <FormHelperText>
                <span>
                  Detail yang lengkap terkait produk. Pastikan deskripsi produk
                  memuat spesifikasi, ukuran, bahan, masa berlaku, dan lainnya.
                  Semakin detail, semakin berguna bagi pembeli terutama
                  merchant.
                </span>
              </FormHelperText>
              <FormHelperText color="red.500">
                {errors.description && <span>Deskripsi diperlukan</span>}
              </FormHelperText>
            </FormControl>
          </Stack>

          <Divider />

          <Stack spacing={5}>
            <Heading as="h2" size="lg">
              Harga Produk
            </Heading>
            <FormControl>
              <FormLabel>Harga Satuan</FormLabel>
              <FormHelperText>Tentukan harga per satu produk.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Minimum Pemesanan</FormLabel>
              <FormHelperText>
                Atur jumlah minimum yang harus dibeli oleh merchant.
              </FormHelperText>
            </FormControl>
          </Stack>

          <Divider />

          <Stack spacing={5}>
            <Heading as="h2" size="lg">
              Berat dan Pengiriman Produk
            </Heading>
            <FormControl>
              <FormLabel>Berat Produk</FormLabel>
              <FormHelperText>
                Masukkan berat dengan menimbang produk setelah dikemas.
                Perhatikan dengan baik berat produk agar tidak terjadi selisih
                data dengan pihak kurir.
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Ukuran Produk</FormLabel>
              <FormHelperText>
                Masukkan ukuran produk setelah dikemas untuk menghitung berat
                volume
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Layanan Pengiriman Produk</FormLabel>
              <FormHelperText>
                Atur layanan pengiriman sesuai jenis produkmu.
              </FormHelperText>
            </FormControl>
          </Stack>

          <Divider />

          <Stack spacing={5}>
            <Heading as="h2" size="lg">
              Pengelolaan Produk
            </Heading>
            <FormControl>
              <FormLabel>Status Produk</FormLabel>
              <FormHelperText>
                Jika status aktif, produkmu dapat dicari oleh calon pembeli.
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Stok Produk</FormLabel>
              <FormHelperText>
                Masukkan jumlah stok yang tersedia
              </FormHelperText>
            </FormControl>
          </Stack>

          <Button
            isLoading={loading}
            loadingText="Menyimpan dan menambah produk..."
            colorScheme="orange"
            type="submit"
          >
            Simpan dan Tambah Baru
          </Button>
        </Stack>
      </VStack>
      {/* Setup React Hook Form devtool */}
      {process.env.NODE_ENV === 'development' && (
        <DevTool control={control} placement="bottom-left" />
      )}
    </>
  )
}
