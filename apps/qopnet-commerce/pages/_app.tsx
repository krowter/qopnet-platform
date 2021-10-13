import NextHead from 'next/head'
import { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { ChakraProvider } from '@chakra-ui/react'
import { SWRConfig } from 'swr'

// MDX and Chakra UI
import { MDXProvider } from '@mdx-js/react'
import {
  Heading,
  Text,
  OrderedList,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react'

// Supabase
import { createClient } from '@supabase/supabase-js'
import { SupabaseContextProvider } from 'use-supabase'

// Local lib components and configs
import { Header } from '../components'
import { Layout, Footer } from '@qopnet/qopnet-ui'
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

// Chakra UI component mapping for MDX
const components = {
  h1: (props) => (
    <Heading as="h1" fontSize="2xl" mt={9} mb={6}>
      {props.children}
    </Heading>
  ),
  h2: (props) => (
    <Heading as="h2" fontSize="xl" mt={6} mb={3}>
      {props.children}
    </Heading>
  ),
  h3: (props) => (
    <Heading as="h3" fontSize="md" mt={3} mb={1}>
      {props.children}
    </Heading>
  ),
  ol: (props) => <OrderedList my={2}>{props.children}</OrderedList>,
  ul: (props) => <UnorderedList my={2}>{props.children}</UnorderedList>,
  li: (props) => <ListItem ml={2}>{props.children}</ListItem>,
  p: (props) => <Text my={2}>{props.children}</Text>,
  Header,
  Layout,
}

function QopnetCommerceApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <MDXProvider components={components}>
        <NextHead>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
          />
          <meta name="application-name" content={SEO.title} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
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
      </MDXProvider>
    </ChakraProvider>
  )
}

export default QopnetCommerceApp
