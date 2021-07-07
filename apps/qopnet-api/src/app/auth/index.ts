import { supabase } from '@qopnet/util-supabase'

import * as express from 'express'
const router = express.Router()

router.post('/signup', async (req, res) => {
  const { user, error } = await supabase.auth.signUp({
    email: req.body.email,
    password: req.body.password,
  })
  if (error) res.status(500).json({ error })
  else res.json({ user })
})

router.post('/signin', async (req, res) => {
  const { session, error } = await supabase.auth.signIn({
    email: req.body.email,
    password: req.body.password,
  })

  if (error) res.status(500).json({ error })
  else res.json({ session })
})

router.post('/signout', async (req, res) => {
  const { error } = await supabase.auth.signOut()

  if (error) res.status(500).json({ error })
  else res.json({ message: 'User signed out' })
})

export default router
