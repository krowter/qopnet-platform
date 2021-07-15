import NextHead from 'next/head'
import { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { ChakraProvider } from '@chakra-ui/react'
import { SWRConfig } from 'swr'

// Supabase
import { createClient } from '@supabase/supabase-js'
import { SupabaseContextProvider } from 'use-supabase'

// Local lib components and configs
import { Header, Footer } from '@qopnet/qopnet-ui'
import { swrConfig } from '@qopnet/util-swr'

// Local styles and configs
import './styles.css'
import SEO from '../next-seo.config'

// Create Supabase client so it can be used via hook
// Use NEXT_PUBLIC because this is Next.js app
const supabase = createClient(
  `${process.env.NEXT_PUBLIC_SUPABASE_URL}`,
  `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
)

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

      <SupabaseContextProvider client={supabase}>
        <SWRConfig value={swrConfig}>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </SWRConfig>
      </SupabaseContextProvider>
    </ChakraProvider>
  )
}

export default QopnetCommerceApp
