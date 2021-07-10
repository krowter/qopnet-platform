import slugify from 'slugify'

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
  const supplierProduct: Prisma.SupplierProductCreateInput =
    req.body.supplierProduct
  const supplierProductSlug = slugify(supplierProduct.name.toLowerCase())

  try {
    const newSupplierProduct = await prisma.supplierProduct.create({
      data: {
        ...supplierProduct,
        slug: supplierProductSlug,
      },
    })

    res.json({
      message: 'Create new supplier product',
      supplierProduct: newSupplierProduct,
    })
  } catch (error) {
    if (error.code === 'P2002') {
      res.json({
        message: `Failed to create unique slug`,
        slug: supplierProductSlug,
        error,
      })
      return next(error)
    } else {
      res.json(error)
      return next(error)
    }
  }
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
