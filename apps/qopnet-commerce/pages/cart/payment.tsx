import NextLink from 'next/link'
import NextImage from 'next/image'
import {
  Box,
  Button,
  chakra,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link,
  Stack,
  StackDivider,
  Divider,
  Tag,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import { Layout, Icon, SupplierProductPrice } from '@qopnet/qopnet-ui'
import { formatRupiah } from '@qopnet/util-format'
import { BreadcrumbCart } from '../../components'
import { useSWRNext } from '../../utils'

/**
 * /cart/payment
 */
export const CartPaymentPage = () => {
  const { data, error } = useSWRNext('/api/orders/1')
  const { order } = data || {}

  return (
    <Layout pt={10} meta={{ title: 'Pembayaran' }}>
      <BreadcrumbCart />
      <Stack spacing={10}>
        <Heading>Pembayaran</Heading>
        {error && <Text>Gagal memuat data order</Text>}
        {!error && !data && <Text>Memuat data order...</Text>}
        {!error && data && order && (
          <Stack direction={['column', 'column', 'row']}>
            {/* <PaymentContainer order={order} />
            <PaymentSummaryContainer order={order} /> */}
          </Stack>
        )}
      </Stack>
    </Layout>
  )
}

export default CartPaymentPage
