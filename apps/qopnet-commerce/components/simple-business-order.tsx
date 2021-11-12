import NextLink from 'next/link'
import NextImage from 'next/image'
import { useRouter } from 'next/router'

import {
  Box,
  Button,
  chakra,
  Divider,
  Heading,
  HStack,
  Link as ChakraLink,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react'

import { formatBusinessOrderStatus } from '@qopnet/util-format'
import {
  calculateSupplierProductItem,
  formatDateTime,
  formatRupiah,
} from '@qopnet/util-format'

export const SimpleBusinessOrderCard = ({ businessOrder, index }) => {
  const [businessOrderStatusText, statusColor] = formatBusinessOrderStatus(
    businessOrder?.status
  )

  const router = useRouter()

  return (
    <Stack
      key={businessOrder.id}
      p={5}
      border="2px solid"
      borderColor="gray.200"
      borderRadius="lg"
    >
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
          <Tag size="sm">{businessOrder.id}</Tag>
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
                    {item.supplier?.name && (
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
            <Text fontSize="xl">{formatRupiah(businessOrder?.totalPrice)}</Text>
          </Box>
          <Button
            onClick={() => router.push(`/dashboard/orders/${businessOrder.id}`)}
            size="sm"
            colorScheme="orange"
          >
            Detail Pesanan
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}
