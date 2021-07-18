import { prisma } from '@qopnet/util-prisma'

import * as express from 'express'
const router = express.Router()

import { checkUser } from '../auth/middleware'

router.get('/', checkUser, async (req, res) => {
  const users = await prisma.user.findMany({})
  res.json({
    message: 'Get all users',
    users,
  })
})

router.get('/:userId', checkUser, async (req, res) => {
  const { userId } = req.params
  const user = await prisma.user.findFirst({ where: { id: userId } })

  res.json({
    message: 'Get all users',
    userId,
    user,
  })
})

export default router
