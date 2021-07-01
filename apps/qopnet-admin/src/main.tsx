import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { createClient } from '@supabase/supabase-js'
import { SupabaseContextProvider } from 'use-supabase'

import App from './app/app'

const supabase = createClient(
  `${process.env.NX_SUPABASE_URL}`,
  `${process.env.NX_SUPABASE_ANON_KEY}`
)

ReactDOM.render(
  <StrictMode>
    <SupabaseContextProvider client={supabase}>
      <ChakraProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </SupabaseContextProvider>
  </StrictMode>,
  document.getElementById('root')
)
