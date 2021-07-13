import { NextSeo } from 'next-seo'
import { Box } from '@chakra-ui/react'

const OfflinePage = () => {
  return (
    <>
      <NextSeo title="Offline? - M Haidar Hanif" />

      <Box>
        <h1>Looks like you're offline</h1>
        <p>Try to refresh or check your connection</p>
      </Box>
    </>
  )
}

export default OfflinePage
