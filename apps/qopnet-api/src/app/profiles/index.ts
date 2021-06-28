import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import * as express from 'express'
const router = express.Router()

router.get('/', async (req, res) => {
  const profiles = await prisma.profile.findMany({})
  res.json(profiles)
})

export default router
