import { SupplierProduct } from '@prisma/client'
import { prisma } from '@qopnet/util-prisma'
import { Request, Response } from 'express'
import { paginate } from '../../root/middleware'

import * as express from 'express'
const router = express.Router()

export const allSupplierProductsFields = {
  // orderBy: [{ sku: 'desc' }, { name: 'desc' }],
  select: {
    id: true,
    images: true,
    slug: true,
    name: true,
    subname: true,
    sku: true,
    price: true,
    priceMax: true,
    priceMin: true,
    supplier: {
      select: {
        handle: true, // Only use the handle for href
      },
    },
  },
}

/**
 * GET /api/suppliers/products/special
 * Take latest 10 products
 */
router.get('/special', paginate, async (req, res) => {
  try {
    const supplierProducts: Partial<SupplierProduct>[] =
      await prisma.supplierProduct.findMany({
        ...allSupplierProductsFields,
        take: req.take || 10,
        skip: req.skip,
      })

    res.json({
      message: 'Get all supplier products',
      meta: {
        recordCount: supplierProducts.length,
        pageCount: req.page?.number,
      },
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
 * GET /api/suppliers/products
 */
router.get('/', paginate, async (req: Request, res: Response) => {
  try {
    const supplierProducts: Partial<SupplierProduct>[] =
      await prisma.supplierProduct.findMany({
        ...allSupplierProductsFields,
        skip: req.skip,
        take: req.take,
      })
    res.json({
      message: 'Get all supplier products',
      meta: {
        recordCount: supplierProducts.length,
        pageCount: req.page?.number,
      },
      supplierProducts,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Get all supplier products failed',
      error,
    })
  }
})

/**
 * GET /api/suppliers/products/search?q=keyword
 */
router.get('/search', paginate, async (req, res) => {
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
        include: { supplier: { select: { handle: true } } },
        skip: req.skip,
        take: req.take,
      })

    res.json({
      message: 'Get all supplier products by search query',
      meta: {
        recordCount: supplierProducts.length,
        pageCount: req.page?.number,
      },
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
