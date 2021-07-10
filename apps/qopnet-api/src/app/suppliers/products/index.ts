import { PrismaClient, Prisma } from '@prisma/client'
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

router.post('/', async (req, res, next) => {
  try {
    const supplierProduct: Prisma.SupplierProductCreateInput = req.body.supplierProduct
    supplierProduct.createdAt = new Date()
    supplierProduct.updatedAt = new Date()

    const createSupplierProduct = await prisma.supplierProduct.create({
      data: supplierProduct,
    })

    res.json({
      message: 'Create Supplier Product',
      supplierProduct: createSupplierProduct,
    })
  } catch (e) {
    res.json(e)
    return next(e)
  }
})

router.get('/:slug', async (req, res, next) => {
  try {
    const { slug } = req.params
    const supplierProduct = await prisma.supplierProduct.findUnique({
      where: { slug },
    })
    res.json({
      message: 'Get supplier product by product slug',
      supplierProduct,
    })
  } catch (e) {
    next(e)
  }
})

export default router
