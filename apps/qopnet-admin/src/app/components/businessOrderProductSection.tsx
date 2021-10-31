import { useHistory } from 'react-router'

import { Button, Image, Stack, Text, Wrap } from '@chakra-ui/react'

import cuid from 'cuid'

import { formatRupiah } from '@qopnet/util-format'

export const BusinessOrderProductSection = ({ item }) => {
  const history = useHistory()
  const handleProductDetail = () => {
    const supplierName = item?.supplier?.handle
    const productSlug = item?.supplierProduct?.slug

    history.push(`/suppliers/${supplierName}/products/${productSlug}`)
  }

  return (
    <Wrap
      key={cuid()}
      id="product-detail"
      w="full"
      p={5}
      spacing={5}
      align="center"
      border="1px solid"
      borderColor="gray.300"
      borderRadius="lg"
    >
      <Image
        src={item?.supplierProduct?.images[0]}
        boxSize="70"
        objectFit="cover"
      />

      <Stack>
        <Text fontWeight="bold">SKU: {item?.supplierProduct?.sku}</Text>
        <Text fontWeight="bold">{item?.supplierProduct?.name}</Text>

        {item?.supplierProduct?.subname && (
          <Text fontSize="xs">{item?.supplierProduct?.subname}</Text>
        )}
      </Stack>

      <Stack align="flex-end" flex="1">
        {/* alignSelf="flex-end"{' '} */}
        <Text>
          {item?.quantity} x {formatRupiah(item?.supplierProduct?.price)}
        </Text>
        <Text fontWeight="bold">
          {formatRupiah(item?.quantity * item?.supplierProduct?.price)}
        </Text>
        <Button
          bg="orange"
          size="xs"
          color="white"
          onClick={handleProductDetail}
          _hover={{
            bg: 'none',
            border: '1px solid orange',
            color: 'orange',
          }}
        >
          Detail Produk
        </Button>
      </Stack>
    </Wrap>
  )
}
