import NextImage from 'next/image'
import NextLink from 'next/link'

import {
  Box,
  chakra,
  Code,
  HStack,
  Tag,
  Link as ChakraLink,
  Heading,
  Divider,
  Stack,
  Text,
  useColorModeValue,
  useToast,
  Badge,
  Flex,
  OrderedList,
  ListItem,
} from '@chakra-ui/react'

import {
  formatAddressComplete,
  formatBusinessOrderStatus,
} from '@qopnet/util-format'
import {
  calculateCart,
  calculateSupplierProductItem,
  formatDateTime,
  formatRupiah,
} from '@qopnet/util-format'
import { UploadImageForm } from '.'

import { requestToAPI } from '../utils/fetch'

export type BusinessOrderCardProps = {
  // businessOrder: BusinessOrder & {
  //   businessOrderItems: (BusinessOrderItem & {
  //     supplier: Supplier
  //     supplierProduct: SupplierProduct
  //   })[]
  // }
  businessOrder: any
  index: number
}

export const BusinessOrderCard: React.FC<BusinessOrderCardProps> = ({
  businessOrder,
  index,
}) => {
  const orderCardBackground = useColorModeValue('gray.50', 'gray.900')
  const [businessOrderStatusText, statusColor] = formatBusinessOrderStatus(
    businessOrder?.status
  )
  const uniqueDigits =
    businessOrder?.totalBillPayment - businessOrder?.totalPayment

  const toast = useToast()

  const handleReceiptUpload = async (
    imageUrl: string,
    paymentRecordId: string
  ) => {
    const formData = {
      id: paymentRecordId,
      proofImages: imageUrl,
    }

    try {
      const data = await requestToAPI(
        'PATCH',
        `/api/payments/records/proof`,
        formData
      )

      if (!data.error) {
        toast({
          title: 'Berhasil mengunggah bukti pembayaran',
          status: 'success',
        })
      }
    } catch (error) {
      toast({ title: 'Gagal mengunggah bukti pembayaran', status: 'error' })
    }
  }

  return (
    <Stack direction={{ base: 'column', lg: 'row' }}>
      <Stack
        p={5}
        border="2px solid"
        borderColor="gray.200"
        borderRadius="lg"
        spacing={8}
        w={{ lg: '70%' }}
        mr={{ lg: 5 }}
        mb={{ base: 5, lg: 0 }}
      >
        <Stack
          direction={['column', 'column', 'row']}
          align={['flex-start', 'flex-start', 'center']}
        >
          <Tag fontSize="sm" colorScheme="orange">
            {businessOrder.id}
          </Tag>
          <Text fontSize="sm">{formatDateTime(businessOrder.updatedAt)}</Text>
        </Stack>

        <Stack
          className="business-order"
          direction={['column', 'column', 'row']}
        >
          <Stack className="business-order-items" spacing={3}>
            {businessOrder.businessOrderItems.map((item, index) => {
              const { calculatedPrice, subTotalCalculatedPrice } =
                calculateSupplierProductItem(item)

              return (
                <Stack
                  key={item?.id || index}
                  direction={['column', 'column', 'row']}
                >
                  {item.supplierProduct?.images[0] && (
                    <NextLink
                      href={`/${item.supplier?.handle}/${item.supplierProduct?.slug}`}
                      passHref
                    >
                      <Box as="a" className="next-image-container">
                        <NextImage
                          src={item.supplierProduct?.images[0]}
                          key={item.supplierProduct?.slug}
                          alt={item.supplierProduct?.name}
                          layout="fixed"
                          width={100}
                          height={100}
                        />
                      </Box>
                    </NextLink>
                  )}

                  <Stack spacing={1} alignSelf="center">
                    <Stack
                      align={['flex-start', 'flex-start', 'center']}
                      direction={['column', 'column', 'row']}
                      spacing={1}
                    >
                      <NextLink
                        href={`/${item.supplier?.handle}/${item.supplierProduct?.slug}`}
                        passHref
                      >
                        <ChakraLink size="sm" fontWeight="bold">
                          {item.supplierProduct?.name}
                        </ChakraLink>
                      </NextLink>
                    </Stack>
                    <Text>
                      {item.quantity} barang × {formatRupiah(calculatedPrice)} ={' '}
                      {formatRupiah(subTotalCalculatedPrice)}
                    </Text>
                  </Stack>
                </Stack>
              )
            })}
          </Stack>
        </Stack>
        {businessOrder?.status === 'WAITING_FOR_PAYMENT' && (
          <Stack spacing={2}>
            <Heading size="md">Detail Pembayaran</Heading>
            <Box>
              <Text color="gray" fontSize="sm">
                Metode Pembayaran
              </Text>
              <Text fontSize="lg">{businessOrder?.paymentMethod?.name}</Text>
            </Box>
            {businessOrder?.paymentMethod?.paymentCategory ===
            'TRANSFER_VIRTUAL_ACCOUNT' ? (
              <Box>
                <Text color="gray" fontSize="sm">
                  Nomor Virtual Account
                </Text>
                <Text fontSize="lg">
                  {businessOrder?.virtualAccountNumber?.vaNumber}
                </Text>
              </Box>
            ) : (
              <>
                <Box>
                  <Text color="gray" fontSize="sm">
                    Nomor Rekening
                  </Text>
                  <Text fontSize="lg">
                    {businessOrder?.paymentMethod?.accountNumber}
                  </Text>
                </Box>

                <Box>
                  <Text color="gray" fontSize="sm">
                    Nama Pemilik Rekening
                  </Text>
                  <Text fontSize="lg">
                    {businessOrder?.paymentMethod?.accountHolderName}
                  </Text>
                </Box>
              </>
            )}
            <Box>
              <Text color="gray" fontSize="sm">
                Rincian Pembayaran
              </Text>
              <Flex direction="row">
                <Stack spacing={0}>
                  <Text fontSize="lg">Total Belanja</Text>
                  <Text fontSize="lg">Ongkos Kirim</Text>
                  <Text fontSize="lg">Digit unik</Text>
                  <Text fontSize="lg" fontWeight="bold">
                    Total Pembayaran
                  </Text>
                </Stack>
                <Stack alignItems="flex-end" flex={1} spacing={0}>
                  <Text fontSize="lg">
                    {formatRupiah(businessOrder?.totalPrice)}
                  </Text>
                  <Text fontSize="lg">
                    {formatRupiah(businessOrder?.totalShippingCost)}
                  </Text>
                  <Text fontSize="lg">
                    {formatRupiah(businessOrder?.paymentRecord?.uniqueDigits)}
                  </Text>
                  <Text fontSize="lg" fontWeight="bold">
                    {formatRupiah(businessOrder?.totalBillPayment)}
                  </Text>
                </Stack>
              </Flex>
            </Box>
          </Stack>
        )}
        <Badge
          fontSize="lg"
          p={3}
          w="max-content"
          colorScheme={statusColor}
          borderRadius="lg"
        >
          {businessOrderStatusText}
        </Badge>
      </Stack>
      <Stack
        w={{ lg: '30%' }}
        p={5}
        border="2px solid"
        borderColor="gray.200"
        borderRadius="lg"
        spacing={8}
        h="max-content"
      >
        <Box>
          <Heading size="md" mb={2}>
            Alamat Pengiriman
          </Heading>
          <Text>{formatAddressComplete(businessOrder?.shipmentAddress)}</Text>
        </Box>

        <Box>
          <Heading size="md" mb={2}>
            Penting:
          </Heading>
          <OrderedList>
            <ListItem>
              Transfer tepat hingga <b>3 digit terakhir</b>
            </ListItem>
            <ListItem>
              Hanya disarankan untuk transfer melalui <b>rekening langsung</b>
            </ListItem>
            <ListItem>
              Menunggu pembayaran terkonfirmasi dari kami setelah transfer dalam
              waktu <b>2×24 jam</b>
            </ListItem>
          </OrderedList>
        </Box>
        {businessOrder?.paymentMethod?.paymentCategory ===
          'TRANSFER_MANUAL' && (
          <Box>
            <Heading size="md" mb={2}>
              Upload Bukti Pembayaran
            </Heading>
            <UploadImageForm
              appendImageUrl={(imageUrl) =>
                handleReceiptUpload(imageUrl, businessOrder.paymentRecordId)
              }
            />
          </Box>
        )}
      </Stack>
    </Stack>
  )
}
