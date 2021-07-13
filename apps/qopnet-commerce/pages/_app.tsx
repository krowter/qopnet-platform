import NextHead from 'next/head'
import { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { ChakraProvider } from '@chakra-ui/react'

import './styles.css'
import SEO from '../next-seo.config'

function QopnetCommerceApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <NextHead>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <meta name="application-name" content={SEO.title} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={SEO.title} />
        <meta name="description" content={SEO.shortDescription} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
      </NextHead>

      <DefaultSeo {...SEO} />

      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default QopnetCommerceApp
