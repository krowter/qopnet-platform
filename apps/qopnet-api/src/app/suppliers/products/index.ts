import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import * as express from 'express'
const router = express.Router()

router.get('/', async (req, res) => {
  const supplierProducts = await prisma.supplierProduct.findMany({})
  res.json({
    message: 'Get all supplier products',
    supplierProducts,
  })
})

export default router
