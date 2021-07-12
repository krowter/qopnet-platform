import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import * as express from 'express'
const router = express.Router()

import { checkUser } from '../auth/middleware'

router.get('/', async (req, res) => {
  const users = await prisma.user.findMany({})
  res.json({
    message: 'Get all users',
    users,
  })
})

export default router
