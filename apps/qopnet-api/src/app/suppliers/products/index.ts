import slugify from 'slugify'
import { checkUser } from '../../auth/middleware'

import { PrismaClient, Prisma, SupplierProduct } from '@prisma/client'
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

router.post('/', checkUser, async (req, res, next) => {
  const userId = req.user.sub!

  // check if user exist by userId
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) throw new Error('User not found')
  } catch (error) {
    res.json({
      message: error.message,
    })
    return next(error)
  }
  const supplierProduct: Prisma.SupplierProductCreateInput =
    req.body.supplierProduct
  const supplierProductSlug = slugify(supplierProduct.name.toLowerCase())

  try {
    const newSupplierProduct: SupplierProduct = await prisma.supplierProduct.create({
      data: {
        ...supplierProduct,
        ownerId: userId,
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
    } else if (error.code === 'P2011') {
      res.json({
        message: `Field cannot be empty`,
        field: error.meta.constraint,
        error,
      })
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
