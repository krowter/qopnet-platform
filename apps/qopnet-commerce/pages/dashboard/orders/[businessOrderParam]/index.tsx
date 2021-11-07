import { useRouter } from 'next/router'
import { HStack, Spinner, Text, Heading } from '@chakra-ui/react'
import { Layout } from '@qopnet/qopnet-ui'
import { useSWR } from '../../../../utils'
import { BusinessOrderCard, BreadcrumbOrder } from '../../../../components'

const BusinessOrderParamPage = () => {
  const router = useRouter()
  const { businessOrderParam } = router.query

  return (
    <Layout pt={10} meta={{ title: 'Detail pesanan' }}>
      {businessOrderParam && (
        <>
          <BreadcrumbOrder businessOrderParam={businessOrderParam} />
          <Heading mt={3} mb={10}>
            Pesanan Saya
          </Heading>
          <BusinessOrderContainer businessOrderParam={businessOrderParam} />
        </>
      )}
    </Layout>
  )
}

export const BusinessOrderContainer = ({ businessOrderParam }) => {
  const { data, error } = useSWR(`/api/business/orders/${businessOrderParam}`)
  const { businessOrder } = data || {}

  return (
    <>
      {error && <Text>Gagal memuat pesanan</Text>}
      {!error && !data && (
        <HStack>
          <Spinner />
          <Text>Memuat pesanan...</Text>
        </HStack>
      )}
      {!error && data && <BusinessOrderDetail businessOrder={businessOrder} />}
    </>
  )
}

export const BusinessOrderDetail = ({ businessOrder }) => {
  return <BusinessOrderCard businessOrder={businessOrder} />
}

export default BusinessOrderParamPage
