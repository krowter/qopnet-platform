import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { createClient } from '@supabase/supabase-js'
import { SupabaseContextProvider } from 'use-supabase'

import App from './app/app'
// import './mocks'

const supabase = createClient(
  `${process.env.NX_SUPABASE_URL}`,
  `${process.env.NX_SUPABASE_ANON_KEY}`
)

ReactDOM.render(
  <StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <SupabaseContextProvider client={supabase}>
          <App />
        </SupabaseContextProvider>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('root')
)
