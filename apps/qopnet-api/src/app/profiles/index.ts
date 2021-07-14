import { PrismaClient } from '@prisma/client'
import { profile } from 'console'
const prisma = new PrismaClient()

import * as express from 'express'
const router = express.Router()

import { checkUser } from '../auth/middleware'

router.get('/', async (req, res) => {
  const profiles = await prisma.profile.findMany({})
  res.json({
    message: 'Get all profiles',
    profiles,
  })
})

router.post('/', checkUser, async (req, res, next) => {
  const userId = req.body.userId

  // check if user exist by userId
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) throw new Error('User not found')
  } catch (error) {
    res.json({
      message: error.message,
    })
    return next(error)
  }

  try {
    const profile = await prisma.profile.findUnique({ where: { handle: req.body.handle } })
    if (!profile) {
      const newProfile = await prisma.profile.create(
        {
          data: {
            name: req.body.name,
            avatarUrl: req.body.avatarUrl,
            phone: req.body.phone,
            userId: req.body.userId,
            handle: req.body.handle
          },
        }
      )

      res.json({
        message: 'Create new user profile',
        profile: newProfile,
      })
    } else {
      throw new Error('Failed to create user profile')
    }
  } catch (error) {
    res.json({
      message: error.message,
    })
    return next(error)
  }
})

router.get('/my', checkUser, async (req, res) => {
  const profile = await prisma.profile.findFirst({
    where: { userId: req.user.sub },
  })

  res.json({
    message: 'Get my profile',
    profile,
  })
})

export default router
