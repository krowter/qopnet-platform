import { supabase } from '@qopnet/util-supabase'
import { prisma } from '@qopnet/util-prisma'

import * as express from 'express'
const router = express.Router()

import { checkUser } from './middleware'

router.post('/signup', async (req, res) => {
  try {
    const { user, error } = await supabase.auth.signUp({
      email: req.body.email,
      password: req.body.password,
    })

    if (error) throw new Error('Sign up error')

    await prisma.user.create({ data: { id: user.id, email: user.email } })

    res.status(200).json({
      message: 'Sign up success',
      user,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Sign up error',
      error,
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

router.get('/check-user', checkUser, async (req, res) => {
  res.status(200).json({
    message: 'Check user success',
    user: req.user,
  })
})

export default router
