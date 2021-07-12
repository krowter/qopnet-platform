import { PrismaClient } from '@prisma/client'
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
