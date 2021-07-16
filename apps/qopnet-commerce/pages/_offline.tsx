import { NextSeo } from 'next-seo'
import { Heading, Text, VStack } from '@chakra-ui/react'

import { Layout } from '@qopnet/qopnet-ui'

const OfflinePage = () => {
  return (
    <>
      <NextSeo title="Are you offline? - Qopnet" />

      <Layout>
        <VStack pt={10}>
          <Heading as="h1">Looks like you're offline</Heading>
          <Text>Try to refresh or check your connection</Text>
        </VStack>
      </Layout>
    </>
  )
}

export default OfflinePage
