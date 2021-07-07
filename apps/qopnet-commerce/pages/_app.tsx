import { AppProps } from 'next/app'
import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/react'

import { Header } from '@qopnet/qopnet-ui'
import './styles.css'

function QopnetCommerce({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Qopnet</title>
      </Head>

      <ChakraProvider>
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
      </ChakraProvider>
    </>
  )
}

export default QopnetCommerce
