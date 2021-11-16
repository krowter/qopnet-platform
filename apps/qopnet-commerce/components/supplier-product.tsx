import NextLink from 'next/link'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import slugify from 'slugify'
import cuid from 'cuid'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Image as ChakraImage,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
  InputRightElement,
  Link as ChakraLink,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Select,
  Spinner,
  Stack,
  Switch,
  Text,
  Textarea,
  useToast,
  VisuallyHidden,
  chakra,
  VStack,
} from '@chakra-ui/react'

import { Icon } from '@qopnet/qopnet-ui'
import { formatMoney } from '@qopnet/util-format'
import { UploadImageForm } from '../components'
import { postToAPI, requestToAPI } from '../utils/fetch'
import { useSWR } from '../utils/swr'

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
  discount?: number
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

  couriers?: string[]

  status?: boolean // Into database, convert to 'ACTIVE' | 'INACTIVE'
  stock?: number
}

/**
 * Create new Supplier form component
 */
export const SupplierProductForm = (props) => {
  const { supplierParam, supplierProductParam, supplierProduct, formType } =
    props

  const router = useRouter()
  const toast = useToast()
  const [loading, setLoading] = useState(false)

  const { data, error } = useSWR('/api/couriers')
  const { couriers } = data || {}

  // React Hook Form
  const {
    register,
    reset,
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<SupplierProductData>({
    mode: 'onChange',
    defaultValues: {
      images: [],
      slug: '',

      name: '',
      subname: '',
      category: '',
      sku: '',
      description: '',

      price: 100,
      discount: null,
      priceMax: null,
      priceMin: null,
      minOrder: 1,

      weight: 1,
      weightUnit: 'KG',
      weightDetails: '',
      dimension: {
        length: 0,
        width: 0,
        height: 0,
      },

      couriers: [],

      status: true,
      stock: 1000,
    },
  })

  useEffect(() => {
    if (formType === 'edit' && supplierProduct) {
      if (supplierProduct === undefined) {
        return
      }

      console.log(JSON.stringify(supplierProduct, null, 2))

      reset({
        ...getValues(),
        images: supplierProduct?.images,
        slug: supplierProduct?.slug,
        name: supplierProduct?.name,
        subname: supplierProduct?.subname,
        category: supplierProduct?.category,
        sku: supplierProduct?.sku,
        description: supplierProduct?.description,

        price: supplierProduct?.price || 100,
        discount: supplierProduct?.discount,
        priceMax: supplierProduct?.priceMax,
        priceMin: supplierProduct?.priceMin,
        minOrder: supplierProduct?.minOrder || 1,

        weight: supplierProduct?.weight || 1,
        weightUnit: supplierProduct?.weightUnit,
        weightDetails: supplierProduct?.weightDetails,
        dimension: {
          length: supplierProduct?.dimension.length,
          width: supplierProduct?.dimension.width,
          height: supplierProduct?.dimension.height,
        },

        couriers: supplierProduct?.couriers?.map(
          (courier) => courier.courierId
        ),

        status: supplierProduct?.status === 'ACTIVE',
        stock: supplierProduct?.stock,
      })
    } else {
      return
    }
  }, [reset, supplierProduct, formType, getValues])

  if (formType === 'edit' && supplierProduct === undefined)
    return <Spinner color="orange" />

  const price = watch('price')
  const discount = watch('discount')
  const priceDiscounted = price - Math.ceil((discount / 100) * price) || price
  const minOrder = watch('minOrder')
  const subTotal = minOrder * price
  const subTotalDiscounted = minOrder * priceDiscounted
  const status = watch('status')
  const weightUnit = watch('weightUnit')
  const uploadedImagesUrl = watch('images')

  // Append image URL from Image Form into React Hook Form field.images
  const appendImageUrl = (newUrl) => {
    // console.info({ newUrl })
    const existingImages = getValues('images')
    // console.info({ existingImages })
    if (existingImages) {
      setValue('images', [...existingImages, newUrl]) // ✅ performant
    } else {
      setValue('images', [newUrl]) // ✅ performant
    }
  }

  const handleCheckBoxCourier = (courierId) => {
    const couriers = getValues('couriers')
    if (couriers.includes(courierId)) {
      couriers.splice(couriers.indexOf(courierId), 1)
    } else {
      couriers.push(courierId)
    }
    setValue('couriers', couriers)
  }

  // Create supplier process and toast
  const handleSubmitCreateSupplier: SubmitHandler<SupplierProductData> = async (
    formData
  ) => {
    try {
      setLoading(true)

      const preparedFormData = {
        ...formData,
        // Be careful, supplier product uses slug, not handle
        slug: slugify(formData.name.toLowerCase(), {
          remove: /[*+~.()'"!:@]/g,
        }),
        status: formData.status ? 'ACTIVE' : 'INACTIVE',
        minOrder: Number(formData.minOrder) || 1,
        price: Number(formData.price) || 100,
        discount: Number(formData.discount) || 0,
        weight: Number(formData.weight) || 1,
        stock: Number(formData.stock) || 1,
        dimension: {
          height: Number(formData?.dimension?.height) || 0,
          length: Number(formData?.dimension?.height) || 0,
          width: Number(formData?.dimension?.height) || 0,
        },
      }
      console.info({ preparedFormData })

      if (formType === 'create') {
        /**
         * POST /api/suppliers/:supplierParam/products
         * Create new supplier product for one supplier
         */
        const data = await postToAPI(
          `/api/suppliers/${supplierParam}/products`,
          preparedFormData
        )

        if (!data) throw new Error('Create supplier product response error')

        toast({ title: 'Berhasil menambah produk supplier', status: 'success' })

        const redirectPath = `/${supplierParam}/${data.supplierProduct.slug}`
        router.push(redirectPath)
      } else {
        /**
         * PUT /api/suppliers/products/:supplierProductId
         * Edit a supplier product
         */
        const data = await requestToAPI(
          'PUT',
          `/api/suppliers/products/${supplierProduct?.id}`,
          preparedFormData
        )

        if (!data) throw new Error('Edit supplier product response error')

        toast({ title: 'Berhasil mengedit produk supplier', status: 'success' })

        const redirectPath = `/${supplierParam}/${data?.updatedSupplierProduct?.slug}`
        router.push(redirectPath)
      }
    } catch (error) {
      if (formType === 'create') {
        toast({ title: 'Gagal membuat supplier', status: 'error' })
      } else {
        toast({ title: 'Gagal mengedit produk supplier', status: 'error' })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <VStack spacing={10}>
        <NextSeo
          title={`${
            formType === 'create' ? 'Tambah' : 'Edit'
          } produk supplier ${supplierParam} - Qopnet`}
        />
        <VStack>
          <Stack align="center">
            <Heading as="h1" size="xl">
              {formType === 'create' ? 'Tambah' : 'Edit'} Produk Supplier
            </Heading>
            <Text>
              Silakan lengkapi info produk untuk{' '}
              <NextLink href={`/${supplierParam}`} passHref>
                <ChakraLink fontWeight="bold" color="orange.500">
                  {supplierParam}
                </ChakraLink>
              </NextLink>
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
                Bisa unggah lebih dari satu. Format gambar <code>.jpg</code>{' '}
                <code>.jpeg</code> <code>.png</code>, ukuran minimum 300 x
                300px, tidak lebih dari 5 MB.
              </span>
            </FormHelperText>
          </FormControl>

          {/* Preview uploaded images as boxes */}
          {uploadedImagesUrl?.length && (
            <Flex>
              {uploadedImagesUrl.map((uploadedImageUrl, index) => {
                return (
                  <Box
                    key={cuid()}
                    border="1px solid gray"
                    rounded="base"
                    mr={5}
                  >
                    <ChakraLink
                      isExternal
                      href={uploadedImageUrl}
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
                <span>
                  Nama minimum 1 kata. Harus sangat unik, tidak boleh sama
                  dengan produk lain yang sudah ada.
                </span>
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
                  Sub nama adalah jenis produk, merek, tagline, atau keterangan
                  lain seperti warna, bahan, tipe.
                </span>
              </FormHelperText>
              <FormHelperText color="red.500">
                {errors.name && <span>Sub nama produk tidak sesuai</span>}
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
                {errors.sku && <span>SKU tidak sesuai</span>}
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
              Jumlah dan Harga Produk
            </Heading>
            <FormControl>
              <FormLabel>Jumlah Minimum Order</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon name="order" />
                </InputLeftElement>
                <Input
                  type="number"
                  defaultValue={1}
                  min={1}
                  max={9999}
                  {...register('minOrder', {
                    required: true,
                    min: 1,
                    max: 9999,
                  })}
                />
              </InputGroup>
              <FormHelperText>
                Atur jumlah minimum order yang harus dibeli oleh merchant.
                Mininum 1, maksimum 9.999
              </FormHelperText>
              <FormHelperText color="red.500">
                {errors.minOrder && <span>Minimum order tidak sesuai</span>}
              </FormHelperText>
            </FormControl>

            <Stack id="price-discount" direction={['column', 'column', 'row']}>
              <FormControl>
                <FormLabel>Harga Satuan</FormLabel>
                <InputGroup>
                  <InputLeftAddon children="Rp" />
                  <Input
                    type="number"
                    min={100}
                    max={999999999}
                    defaultValue={100}
                    {...register('price', {
                      required: true,
                      min: 100,
                      max: 999999999,
                    })}
                  />
                </InputGroup>
                <FormHelperText>
                  Tentukan harga per satu produk. Mininum Rp 100, maksimum Rp
                  999.999.999
                </FormHelperText>
                <FormHelperText color="red.500">
                  {errors.price && <span>Harga tidak sesuai</span>}
                </FormHelperText>
              </FormControl>

              <FormControl>
                <FormLabel>Diskon Harga dalam Persen</FormLabel>
                <InputGroup>
                  <Input
                    type="number"
                    min={0}
                    max={99}
                    {...register('discount', { min: 0, max: 99 })}
                  />
                  <InputRightAddon children="%" />
                </InputGroup>
                <FormHelperText>
                  Tentukan diskon harga dalam persentase dari 0% hingga 99%.
                </FormHelperText>
                <FormHelperText color="red.500">
                  {errors.discount && <span>Diskon harga tidak sesuai</span>}
                </FormHelperText>
              </FormControl>
            </Stack>

            <Box>
              <Text>
                Harga satuan awal: Rp{' '}
                <chakra.span color="red.500">{formatMoney(price)}</chakra.span>
              </Text>
              {discount && (
                <Text>
                  Harga satuan setelah diskon: Rp{' '}
                  <chakra.span color="green.500">
                    {formatMoney(priceDiscounted)}
                  </chakra.span>
                </Text>
              )}
              <Text>
                Subtotal awal: Rp{' '}
                <chakra.span color="blue.500">
                  {formatMoney(subTotal)}
                </chakra.span>
              </Text>
              {discount && (
                <Text>
                  Subtotal setelah diskon: Rp{' '}
                  <chakra.span color="teal.500">
                    {formatMoney(subTotalDiscounted)}
                  </chakra.span>
                </Text>
              )}
            </Box>
          </Stack>

          <Divider />

          <Stack spacing={5}>
            <Heading as="h2" size="lg">
              Berat dan Pengiriman Produk
            </Heading>

            <Stack id="weight-unit" direction={['column', 'column', 'row']}>
              <FormControl>
                <FormLabel>Berat Produk</FormLabel>
                <InputGroup>
                  <Input
                    type="number"
                    defaultValue={1}
                    min={1}
                    max={9999}
                    {...register('weight', {
                      required: true,
                      min: 1,
                      max: 9999,
                    })}
                  />
                  {weightUnit && (
                    <InputRightAddon>
                      {weightUnit.toLowerCase()}
                    </InputRightAddon>
                  )}
                </InputGroup>
                <FormHelperText>
                  Masukkan berat dengan menimbang produk setelah dikemas.
                  Perhatikan dengan baik berat produk agar tidak terjadi selisih
                  data dengan pihak kurir.
                </FormHelperText>
                <FormHelperText color="red.500">
                  {errors.weight && <span>Berat produk tidak sesuai</span>}
                </FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Unit Berat</FormLabel>
                <InputGroup maxW="100px">
                  <Select
                    placeholder="Unit berat"
                    defaultValue="KG"
                    {...register('weightUnit', { required: true })}
                  >
                    <option value="GR">gr</option>
                    <option value="KG">kg</option>
                    <option value="TON">ton</option>
                  </Select>
                </InputGroup>
                <FormHelperText>Pilih unit berat</FormHelperText>
                <FormHelperText color="red.500">
                  {errors.weightUnit && <span>Unit berat tidak sesuai</span>}
                </FormHelperText>
              </FormControl>
            </Stack>

            <FormControl>
              <FormLabel>Ukuran/Dimensi Produk</FormLabel>
              <Stack direction={['column', 'row', 'row']}>
                <InputGroup>
                  <InputLeftAddon children="P" />
                  <NumberInput min={0} max={9999}>
                    <NumberInputField
                      id="dimension-length"
                      placeholder="Panjang"
                      borderRightRadius={0}
                      min={0}
                      max={9999}
                      {...register('dimension.length', { min: 0, max: 9999 })}
                    />
                  </NumberInput>
                  <InputRightAddon children="cm" />
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon children="L" />
                  <NumberInput min={0} max={9999}>
                    <NumberInputField
                      id="dimension-width"
                      placeholder="Lebar"
                      borderRightRadius={0}
                      min={0}
                      max={9999}
                      {...register('dimension.width', { min: 0, max: 9999 })}
                    />
                  </NumberInput>
                  <InputRightAddon children="cm" />
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon children="T" />
                  <NumberInput min={0} max={9999}>
                    <NumberInputField
                      id="dimension-height"
                      placeholder="Tinggi"
                      borderRightRadius={0}
                      min={0}
                      max={9999}
                      {...register('dimension.height', { min: 0, max: 9999 })}
                    />
                  </NumberInput>
                  <InputRightAddon children="cm" />
                </InputGroup>
              </Stack>
              <FormHelperText>
                Masukkan ukuran/dimensi produk yaitu panjang, lebar, dan tinggi
                setelah dikemas untuk menghitung berat volume.
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Layanan Kurir Pengiriman Produk</FormLabel>
              <CheckboxGroup colorScheme="orange" defaultValue={['DELIVEREE']}>
                <Stack direction={['column', 'column', 'row']} spacing={3}>
                  {couriers &&
                    couriers.map((courier) => {
                      return (
                        <Controller
                          key={courier?.id}
                          name="couriers"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Checkbox
                              {...field}
                              value={courier?.id}
                              onChange={(e) =>
                                handleCheckBoxCourier(e.target.value)
                              }
                            >
                              {courier?.name}
                            </Checkbox>
                          )}
                        />
                      )
                    })}
                </Stack>
              </CheckboxGroup>
              <FormHelperText color="red.500">
                {errors.couriers && <span>Kurir pengiriman diperlukan</span>}
              </FormHelperText>
              <FormHelperText>
                Atur layanan kurir pengiriman sesuai jenis dan ukuran produkmu.
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
              <HStack alignItems="center">
                <Switch
                  size="lg"
                  id="status"
                  colorScheme="green"
                  {...register('status')}
                />
                <FormLabel htmlFor="status" userSelect="none" cursor="pointer">
                  {status ? 'Aktif' : 'Nonaktif'}
                </FormLabel>
              </HStack>
              <FormHelperText>
                Jika status aktif, produkmu dapat dicari oleh calon pembeli.
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Stok Produk</FormLabel>
              <InputGroup>
                <NumberInput defaultValue={1} min={1} max={999999999}>
                  <NumberInputField
                    {...register('stock', {
                      required: true,
                      min: 1,
                      max: 999999999,
                    })}
                  />
                </NumberInput>
              </InputGroup>
              <FormHelperText>
                Masukkan jumlah stok yang tersedia. Mininum 1, maksimum
                999.999.999
              </FormHelperText>
            </FormControl>
          </Stack>

          <Button
            isLoading={loading}
            loadingText={
              formType === 'create'
                ? 'Menyimpan dan menambah produk...'
                : 'Menyimpan perubahan produk'
            }
            colorScheme="orange"
            type="submit"
          >
            {formType === 'create'
              ? 'Simpan dan Tambah Produk Baru'
              : 'Simpan Perubahan Produk'}
          </Button>
        </Stack>
      </VStack>
      {/* Setup React Hook Form devtool */}
      {process.env.NODE_ENV === 'development' && (
        <DevTool control={control} placement="bottom-right" />
      )}
    </>
  )
}
