import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import * as express from 'express'
const router = express.Router()

import { checkUser } from '../auth/middleware'

/**
 * GET /api/profiles
 */
router.get('/', async (req, res) => {
  try {
    const profiles = await prisma.profile.findMany({
      include: { user: true },
    })
    res.json({
      message: 'Get all profiles success',
      profiles,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Get all profiles failed',
      error,
    })
  }
})

/**
 * POST /api/profiles
 */
router.post('/', checkUser, async (req, res) => {
  const userId = req.user.sub
  const profile = req.body

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
      // Just to check whether the user already had a profile too
    })
    if (!user) throw new Error('User not found')

    // Check if profile for a user already exist
    // by profile.userId, not profile.handle
    try {
      const existingProfile = await prisma.profile.findFirst({
        where: { userId },
      })
      if (existingProfile) throw new Error('Profile already exist')

      // Continue to create if there is no existing profile
      const newProfile = await prisma.profile.create({
        data: { ...profile, userId },
      })

      res.json({
        message: 'Create new user profile',
        userId,
        profile: newProfile,
      })
    } catch (error) {
      res.json({
        message: 'Create new user profile failed because profile already exist',
        error,
      })
    }
  } catch (error) {
    res.json({
      message: 'Create new profile failed because user not found',
      userId,
      error,
    })
  }
})

/**
 * GET /api/profiles/my
 */
router.get('/my', checkUser, async (req, res) => {
  const profile = await prisma.profile.findFirst({
    where: { userId: req.user.sub },
    include: {
      user: true,
      addresses: true,
      suppliers: true,
      supplierProducts: true,
      wholesalers: true,
      merchants: true,
    },
  })

  res.json({
    message: 'Get my profile',
    profile,
  })
})

export default router
