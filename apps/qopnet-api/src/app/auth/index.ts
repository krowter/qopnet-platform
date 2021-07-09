import { supabase } from '@qopnet/util-supabase'

import * as express from 'express'
const router = express.Router()

router.post('/signup', async (req, res) => {
  const { user, error } = await supabase.auth.signUp({
    email: req.body.email,
    password: req.body.password,
  })
  if (error) {
    res.status(500).json({
      message: 'Sign up error',
      error,
    })
  } else {
    res.json({
      message: 'Sign up success',
      user,
    })
  }
})

router.post('/signin', async (req, res) => {
  const { session, error } = await supabase.auth.signIn({
    email: req.body.email,
    password: req.body.password,
  })

  if (error) {
    res.status(500).json({
      message: 'Sign in error',
      error,
    })
  } else {
    res.json({
      message: 'Sign in success',
      session,
    })
  }
})

router.post('/signout', async (req, res) => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    res.status(500).json({
      message: 'Sign out error',
      error,
    })
  } else {
    res.json({
      message: 'Sign out success',
    })
  }
})

export default router
