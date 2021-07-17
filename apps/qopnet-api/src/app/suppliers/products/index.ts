import { PrismaClient, SupplierProduct } from '@prisma/client'
const prisma = new PrismaClient()

import * as express from 'express'
const router = express.Router()

/**
 * GET /api/suppliers/products
 */
router.get('/', async (req, res) => {
  try {
    const supplierProducts: SupplierProduct[] =
      await prisma.supplierProduct.findMany({})

    res.json({
      message: 'Get all supplier products',
      supplierProducts,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Get all supplier products failed',
      error,
    })
  }
})

/**
 * GET /api/suppliers/search?q=keyword
 */
router.get('/search', async (req, res) => {
  const searchQuery: string = req.query.q as string

  try {
    const supplierProducts: SupplierProduct[] =
      await prisma.supplierProduct.findMany({
        where: {
          OR: [
            { slug: { contains: searchQuery, mode: 'insensitive' } },
            { sku: { contains: searchQuery, mode: 'insensitive' } },
            { name: { contains: searchQuery, mode: 'insensitive' } },
            { description: { contains: searchQuery, mode: 'insensitive' } },
          ],
        },
      })

    res.json({
      message: 'Get all supplier products by search query',
      count: supplierProducts.length,
      searchQuery,
      supplierProducts,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Get all supplier products by search query failed',
      searchQuery,
      error,
    })
  }
})

/**
 * GET /api/suppliers/products/:supplierProductParam
 */
router.get('/:supplierProductParam', async (req, res) => {
  const { supplierProductParam } = req.params

  try {
    const supplierProduct = await prisma.supplierProduct.findUnique({
      where: {
        slug: supplierProductParam,
      },
      include: {
        supplier: {
          include: {
            owner: true,
          },
        },
        owner: true,
      },
    })
    if (!supplierProduct) {
      throw new Error(`Failed to find supplier product with specific param`)
    }

    res.json({
      message: 'Get one supplier product by supplierProductParam',
      supplierProduct,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Get one supplier product by :supplierProductParam failed',
      supplierProductParam,
      error,
    })
  }
})

export default router
