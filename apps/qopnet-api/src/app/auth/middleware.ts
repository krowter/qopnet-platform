import { supabase } from '@qopnet/util-supabase'
import { prisma } from '@qopnet/util-prisma'
import * as jwt from 'jsonwebtoken'

export const checkUser = async (req, res) => {
  /**
   * Headers
   * Authorization: Bearer eyA.B.C
   * "Bearer eyA.B.C"
   */

  try {
    if (req.headers.authorization) {
      const jwtInHeader = req.headers.authorization.split(' ')[1]
      const userInJWT = jwt.decode(jwtInHeader)

      if (!userInJWT) {
        res.status(403).json({
          message: 'Check user is failed because there is no user in JWT',
        })
      } else {
        try {
          // Get user id, but not checked yet
          req.user = userInJWT // { sub: "a1b2c3-d4e5f6" }

          // Check if user actually exist by userId from token.sub
          const user = await prisma.user.findFirst({
            where: { id: req.user.sub },
            include: { profile: true },
          })

          if (!user) throw 'Failed to findFirst user'

          // Assign profile once get the user
          req.profile = user.profile

          res.status(200).json({
            message: 'Check user success',
            user: req.user,
          })
        } catch (error) {
          res.status(400).json({
            message: 'Check user is failed because profile not found',
            error,
          })
        }
      }
    } else {
      res.status(400).json({
        message: 'Check user is failed because there is no JWT',
      })
    }
  } catch (error) {
    res.status(500).json({
      message:
        'Check user is failed because request is not authorized, cannot decode JWT, or user not found',
      error,
    })
  }
}

export const signUp = async (req, res) => {
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
}

export const signIn = async (req, res) => {
  try {
    const { session, error } = await supabase.auth.signIn({
      email: req.body.email,
      password: req.body.password,
    })

    if (error) throw new Error('Sign in error')

    res.status(200).json({
      message: 'Sign in success',
      session,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Sign in error',
      error,
    })
  }
}

export const signOut = async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut()

    if (error) throw new Error('Sign out error')

    res.status(200).json({
      message: 'Sign out success',
    })
  } catch (error) {
    res.status(500).json({
      message: 'Sign out error',
      error,
    })
  }
}
