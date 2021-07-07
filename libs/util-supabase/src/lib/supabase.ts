import { createClient } from '@supabase/supabase-js'

if (!process.env.NX_SUPABASE_URL) {
  console.error(`NX_SUPABASE_URL is not defined`)
} else if (!process.env.NX_SUPABASE_ANON_KEY) {
  console.error(`NX_SUPABASE_ANON_KEY is not defined`)
}

export const supabase = createClient(
  `${process.env.NX_SUPABASE_URL}`,
  `${process.env.NX_SUPABASE_ANON_KEY}`
)
