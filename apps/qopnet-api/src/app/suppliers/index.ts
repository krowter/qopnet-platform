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
    res.json({
      message: 'Get all supplier products by supplierId',
      supplierProduct,
    })
  } catch (e) {
    next(e)
  }
})

export default router
