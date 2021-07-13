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

router.get('/:slug', async (req, res, next) => {
  try {
    const { slug } = req.params
    const supplierProduct = await prisma.supplierProduct.findUnique({
      where: { slug },
    })
    res.json({
      message: 'Get one supplier product by supplierProductParam',
      supplierProduct,
    })
  } catch (error) {
    next(error)
  }
})

export default router
