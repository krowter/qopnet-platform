import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()
import * as express from 'express'
const router = express.Router()

router.get('/:id/products', async (req, res, next) => {
  try {
    const { id } = req.params
    const supplierProduct = await prisma.supplier.findUnique({
      where: { id },
    })
    // if not found try to find it by product handle
    if (!supplierProduct) {
        return next()
    }
    res.json({
      message: 'Get all supplier products by supplierId',
      supplierProduct,
    })
  } catch (e) {
    next(e)
  }
})

router.get('/:handle/products', async (req, res, next) => {
    try {
      const { handle } = req.params
      console.log(handle)
      const supplierProduct = await prisma.supplier.findUnique({
        where: { handle },
      })
      res.json({
        message: 'Get all supplier products by supplier handle',
        supplierProduct,
      })
    } catch (e) {
      next(e)
    }
  })

export default router
