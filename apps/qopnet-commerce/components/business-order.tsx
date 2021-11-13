import NextImage from 'next/image'
import NextLink from 'next/link'

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Flex,
  Heading,
  Link as ChakraLink,
  ListItem,
  OrderedList,
  Stack,
  Tag,
  Text,
  useToast,
  chakra,
  Image,
  Link,
} from '@chakra-ui/react'

import {
  formatAddressComplete,
  formatBusinessOrderStatus,
} from '@qopnet/util-format'
import {
  calculateSupplierProductItem,
  formatDateTime,
  formatRupiah,
} from '@qopnet/util-format'

import { UploadImageForm } from '.'
import { requestToAPI } from '../utils/fetch'

import parse from 'html-react-parser'

export type BusinessOrderCardProps = {
  // businessOrder: BusinessOrder & {
  //   businessOrderItems: (BusinessOrderItem & {
  //     supplier: Supplier
  //     supplierProduct: SupplierProduct
  //   })[]
  // }
  businessOrder: any
}

export const BusinessOrderCard: React.FC<BusinessOrderCardProps> = ({
  businessOrder,
}) => {
  const [businessOrderStatusText, statusColor] = formatBusinessOrderStatus(
    businessOrder?.status
  )

  const paymentInstructions = [
    {
      payment: 'ATM Permata',
      instruction: [
        'Pilih <strong>Transfer</strong>, lalu <strong>Transfer antar Rekening PermataBank</strong>',
        'Masukkan <strong>nomor Virtual Account</strong>',
        'Pilih <strong>Rekening</strong> yang akan di <strong>Debit</strong>',
        '<strong>Konfirmasi</strong> dan selesaikan pembayaran',
      ],
    },
    {
      payment: 'ATM Bank Lain (Alto, Prima, ATM Bersama)',
      instruction: [
        'Pilih <strong>Transfer</strong>, lalu  <strong>Transfer antar Rekening PermataBank</strong>',
        '(ATM Bersama Alto) Masukkan <strong>kode 013 + nomor Virtual Account</strong>',
        '(Prima) Masukkan <strong>kode 013</strong>, lalu masukkan <strong> nomor Virtual Account</strong>',
        '<strong>Konfirmasi</strong> dan selesaikan pembayaran',
      ],
    },
    {
      payment: 'Mobile Banking Permata',
      instruction: [
        'Buka  <strong>aplikasi Permata, pilih Transfer</strong>',
        'Pilih <strong>Rekening PermataBank</strong>',
        'Masukkan <strong>Rekening Asal & Virtual Account</strong>',
        'Masukkan <strong>kode SMS/Token</strong> & transaksi selesai',
      ],
    },
    {
      payment: 'Internet Banking Permata',
      instruction: [
        'Login ke <strong>iBanking Permata, pilih Transfer</strong>',
        'Pilih <strong>Rekening PermataBank</strong>',
        'Masukkan <strong>Rekening Asal & Virtual Account</strong>',
        'Masukkan <strong>kode SMS/Token</strong> & transaksi selesai',
      ],
    },
  ]

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
        h="max-content"
      >
        <Stack
          direction={['column', 'column', 'row']}
          align={['flex-start', 'flex-start', 'center']}
        >
          <Tag size="sm">{businessOrder.id}</Tag>
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
                      </NextLink>{' '}
                      {item.supplier?.name && (
                        <Text fontSize="sm">
                          <chakra.span> dari </chakra.span>
                          <NextLink href={`/${item.supplier?.handle}`} passHref>
                            <ChakraLink>{item.supplier?.name}</ChakraLink>
                          </NextLink>
                        </Text>
                      )}
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

        <Stack spacing={2}>
          <Heading size="md">Detail Pembayaran</Heading>
          <Box>
            <Text color="gray" fontSize="sm">
              Metode Pembayaran
            </Text>
            <Text fontSize="lg">{businessOrder?.paymentMethod?.name}</Text>
          </Box>

          {businessOrder?.paymentMethod?.paymentCategory ===
            'TRANSFER_VIRTUAL_ACCOUNT' && (
            <Box>
              <Text color="gray" fontSize="sm">
                Nomor Virtual Account
              </Text>
              <Text fontSize="lg">
                {businessOrder?.virtualAccountNumber?.vaNumber}
              </Text>
            </Box>
          )}

          {businessOrder?.paymentMethod?.paymentCategory ===
            'TRANSFER_MANUAL' && (
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
                <Text fontSize="lg">Biaya Pengiriman</Text>
                <Text fontSize="lg">Diskon Biaya Pengiriman</Text>
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
                  {formatRupiah(businessOrder?.totalShippingDiscount)}
                </Text>
                <Text fontSize="lg" fontWeight="bold">
                  {formatRupiah(businessOrder?.totalBillPayment)}
                </Text>
              </Stack>
            </Flex>
          </Box>
        </Stack>

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

        {businessOrder?.paymentMethod?.paymentCategory ===
          'TRANSFER_VIRTUAL_ACCOUNT' && (
          <Box>
            <Heading size="md" mb={2}>
              Petunjuk Pembayaran:
            </Heading>
            <Accordion allowToggle>
              {paymentInstructions.map(({ payment, instruction }) => {
                return (
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          {payment}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <OrderedList>
                        {instruction.map((step) => {
                          return <ListItem>{parse(step)}</ListItem>
                        })}
                      </OrderedList>
                    </AccordionPanel>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </Box>
        )}

        {businessOrder?.paymentMethod?.paymentCategory ===
          'TRANSFER_MANUAL' && (
          <>
            <Box>
              <Heading size="md" mb={2}>
                Penting:
              </Heading>

              <OrderedList>
                <ListItem>
                  Transfer tepat hingga <strong>3 digit terakhir</strong>
                </ListItem>
                <ListItem>
                  Hanya disarankan untuk transfer melalui{' '}
                  <strong>rekening langsung</strong>
                </ListItem>
                <ListItem>
                  Menunggu pembayaran terkonfirmasi dari kami setelah transfer
                  dalam waktu <strong>2×24 jam</strong>
                </ListItem>
              </OrderedList>
            </Box>

            <Stack alignItems="flex-start">
              <Heading size="md" mb={2}>
                Upload Bukti Pembayaran
              </Heading>
              {businessOrder.paymentRecord.proofImages.map(
                (imageUrl, index) => {
                  return (
                    <Link
                      target="_blank"
                      rel="noreferrer"
                      href={imageUrl}
                      key={index}
                      display="block"
                    >
                      <Image
                        border="1px solid black"
                        h={200}
                        w={200}
                        src={imageUrl}
                        alt={`Gambar bukti pembayaran ${index}`}
                      />
                    </Link>
                  )
                }
              )}
              <UploadImageForm
                appendImageUrl={(imageUrl) =>
                  handleReceiptUpload(imageUrl, businessOrder.paymentRecordId)
                }
              />
            </Stack>
          </>
        )}
      </Stack>
    </Stack>
  )
}
