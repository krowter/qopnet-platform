import { NextSeo } from 'next-seo'
import { Heading, Text } from '@chakra-ui/react'

import { Layout } from '@qopnet/qopnet-ui'

const OfflinePage = () => {
  return (
    <>
      <NextSeo title="Offline? - M Haidar Hanif" />

      <Layout>
        <Heading as="h1">Looks like you're offline</Heading>
        <Text>Try to refresh or check your connection</Text>
      </Layout>
    </>
  )
}

export default OfflinePage
