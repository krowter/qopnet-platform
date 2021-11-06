import NextImage from 'next/image'
import NextLink from 'next/link'
// import {
//   BusinessOrder,
//   BusinessOrderItem,
//   SupplierProduct,
//   Supplier,
// } from '@prisma/client'

import {
  Box,
  chakra,
  Alert,
  AlertIcon,
  Code,
  OrderedList,
  ListItem,
  HStack,
  Tag,
  Link as ChakraLink,
  Heading,
  Divider,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'

import { formatBusinessOrderStatus } from '@qopnet/util-format'
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
  const { totalCalculatedBill } = calculateCart(businessOrder)

  const [businessOrderStatusText, statusColor] = formatBusinessOrderStatus(
    businessOrder?.status
  )

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
    <Stack key={businessOrder.id} p={3} rounded="md" bg={orderCardBackground}>
      <Stack
        direction={['column', 'column', 'row']}
        align={['flex-start', 'flex-start', 'center']}
      >
        <HStack>
          <Heading as="h2" size="sm">
            #{index + 1}
          </Heading>
          <Tag size="sm" colorScheme={statusColor}>
            {businessOrderStatusText}
          </Tag>
        </HStack>
        <HStack>
          <Code fontSize="xs">{businessOrder.id}</Code>
        </HStack>
        <HStack>
          <Text fontSize="sm">{formatDateTime(businessOrder.updatedAt)}</Text>
        </HStack>
      </Stack>

      <Divider />

      <Stack
        pt={3}
        className="business-order"
        spacing={5}
        direction={['column', 'column', 'row']}
        justify="space-between"
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
                        width={50}
                        height={50}
                      />
                    </Box>
                  </NextLink>
                )}

                <Stack spacing={1}>
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
                    {/* {item.supplier?.name && (
                      <Text fontSize="sm">
                        <chakra.span> dari </chakra.span>
                        <NextLink href={`/${item.supplier?.handle}`} passHref>
                          <ChakraLink>{item.supplier?.name}</ChakraLink>
                        </NextLink>
                        {item.supplier?.addresses[0]?.city && (
                          <chakra.span fontSize="sm">
                            <chakra.span> di </chakra.span>
                            <chakra.span fontWeight="bold">
                              {item.supplier?.addresses[0]?.city}
                            </chakra.span>
                          </chakra.span>
                        )}
                      </Text>
                    )} */}
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

        <Stack
          className="businessOrder-total"
          textAlign="right"
          alignSelf="flex-end"
        >
          <Divider display={['block', 'block', 'none']} />
          <Box>
            <Heading as="h4" size="sm">
              Total Belanja
            </Heading>
            <Text fontSize="xl">{formatRupiah(totalCalculatedBill)}</Text>
          </Box>
          {/* <Button size="sm" colorScheme="orange">
                    Detail Transaksi
                  </Button> */}
        </Stack>
      </Stack>
      {businessOrder?.status === 'WAITING_FOR_PAYMENT' && (
        <Stack>
          <Alert status="info">
            <AlertIcon />
            Selesaikan pembayaran dengan mentransfer ke detail berikut:
          </Alert>
          <Box>
            {businessOrder?.paymentMethod?.paymentCategory ===
            'TRANSFER_VIRTUAL_ACCOUNT' ? (
              <>
                <Text>Nomor Virtual Account:</Text>
                <Text fontSize="lg" fontWeight="bold">
                  {businessOrder?.virtualAccountNumber?.vaNumber}
                </Text>
              </>
            ) : (
              <>
                <Text>Nomor rekening dan nama pemilik rekening:</Text>
                <Text fontSize="lg" fontWeight="bold">
                  {businessOrder?.paymentMethod?.accountNumber}
                </Text>
                <Text fontSize="lg" fontWeight="bold">
                  {businessOrder?.paymentMethod?.accountHolderName}
                </Text>
              </>
            )}

            {/*  */}
          </Box>
          <Box>
            <Text>Total pembayaran:</Text>
            <Text fontSize="lg" fontWeight="bold">
              {formatRupiah(businessOrder?.paymentRecord?.amountDue)}
            </Text>
          </Box>
          <Stack
            direction={['column', null, 'row']}
            justifyContent="space-between"
          >
            <Box fontSize="xs">
              <Text>Penting untuk:</Text>
              <OrderedList>
                <ListItem>
                  Transfer tepat hingga <b>3 digit terakhir</b>
                </ListItem>
                <ListItem>
                  Hanya disarankan untuk transfer melalui rekening langsung
                </ListItem>
                <ListItem>
                  Menunggu pembayaran terkonfirmasi dari kami setelah transfer
                  dalam waktu 2×24 jam
                </ListItem>
              </OrderedList>
            </Box>
            {businessOrder?.paymentMethod?.paymentCategory ===
              'TRANSFER_MANUAL' && (
              <Box>
                <UploadImageForm
                  appendImageUrl={(imageUrl) =>
                    handleReceiptUpload(imageUrl, businessOrder.paymentRecordId)
                  }
                />
              </Box>
            )}
          </Stack>
        </Stack>
      )}
    </Stack>
  )
}
