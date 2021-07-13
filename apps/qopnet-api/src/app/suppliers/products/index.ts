import { PrismaClient, SupplierProduct } from '@prisma/client'
const prisma = new PrismaClient()

import * as express from 'express'
const router = express.Router()

router.get('/', async (req, res) => {
  const supplierProducts: SupplierProduct[] = await prisma.supplierProduct.findMany(
    {}
  )
  console.log(supplierProducts)
  res.json({
    message: 'Get all supplier products',
    supplierProducts,
  })
})

router.get('/search', async (req, res) => {
  const searchQuery: string = req.query.q as string
  const supplierProducts: SupplierProduct[] = await prisma.supplierProduct.findMany(
    {
      where: {
        OR: [
          {
            name: {
              contains: searchQuery,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: searchQuery,
              mode: 'insensitive',
            },
          },
        ],
      },
    }
  )
  res.json({
    message: 'Get all supplier products by search query',
    searchQuery,
    resultsCount: supplierProducts.length,
    supplierProducts,
  })
})

router.get('/:supplierProductParam', async (req, res, next) => {
  const { supplierProductParam } = req.params

  try {
    const supplierProduct = await prisma.supplierProduct.findUnique({
      where: { slug: supplierProductParam },
    })
    if (!supplierProduct)
      throw new Error("Couldn't find supplier product with specific param")
    res.json({
      message: 'Get one supplier product by supplierProductParam',
      supplierProduct,
    })
  } catch (error) {
    res.json({
      message: error.message,
      supplierProductParam,
    })
    next(error)
  }
})

export default router
