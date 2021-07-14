import { PrismaClient, Prisma, SupplierProduct } from '@prisma/client'
const prisma = new PrismaClient()
import * as express from 'express'
const router = express.Router()
import slugify from 'slugify'
import { checkUser } from '../auth/middleware'

/**
 * Get supplier products by two ways:
 * 1. :id
 * 2. :supplierParam or slug
 * If not found by id, try to find by supplierParam
 */
router.get('/:id/products', async (req, res, next) => {
  const { id } = req.params

  try {
    const supplierProducts = await prisma.supplier.findUnique({
      where: { id },
      include: { supplierProducts: true },
    })
    if (!supplierProducts) return next()

    res.json({
      message: 'Get all supplier products by supplierId',
      id: supplierProducts,
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:supplierParam/products', async (req, res) => {
  const { supplierParam } = req.params

  try {
    const supplierProducts = await prisma.supplier.findUnique({
      where: { handle: supplierParam },
      include: { supplierProducts: true },
    })
    if (!supplierProducts)
      throw new Error('Failed to supplierProducts by supplierParam')

    res.json({
      message: 'Get all supplierProducts by supplierParam',
      supplierParam,
      supplierProducts,
    })
  } catch (error) {
    res.json({
      message: 'Get all supplierProducts by supplierParam failed',
      supplierParam,
      error,
    })
  }
})

router.get(
  '/:supplierParam/products/:supplierProductParam',
  async (req, res, next) => {
    const { supplierParam, supplierProductParam } = req.params

    try {
      // get supplierId
      const supplier = await prisma.supplier.findUnique({
        where: { handle: supplierParam },
      })
      if (!supplier)
        throw new Error("Couldn't find a supplier with specific supplier param")

      const supplierId = supplier.id

      // get supplier product
      const supplierProducts = await prisma.supplierProduct.findMany({
        where: {
          supplierId: supplierId,
          slug: supplierProductParam,
        },
      })
      if (!supplierProductParam)
        throw new Error("Couldn't find a supplier product with specific params")
      res.json({
        message: 'Get all supplier products by supplier supplierParam',
        supplierParam,
        supplierProductParam,
        supplierProducts,
      })
    } catch (error) {
      res.json({
        message: error.message,
        supplierParam,
        supplierProductParam,
        error,
      })
      next(error)
    }
  }
)

router.post('/:supplierParam/products', checkUser, async (req, res, next) => {
  const userId = req.user.sub
  const { supplierParam } = req.params
  let supplierId = ''

  // Check if user exist by userId
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) throw new Error('User not found')
  } catch (error) {
    res.json({
      message: 'Create supplierProducts failed because user not found',
      supplierParam,
      error,
    })
  }

  // Get supplier id by supplierParam
  // So later we can create the products for that supplier
  try {
    const supplier = await prisma.supplier.findUnique({
      where: { handle: supplierParam },
    })
    if (!supplier) throw new Error('Supplier not found')
    supplierId = supplier.id
  } catch (error) {
    res.json({
      message: 'Create supplierProducts failed because supplier not found',
      supplierParam,
      error,
    })
  }

  const supplierProduct: Prisma.SupplierProductUncheckedCreateInput =
    req.body.supplierProduct
  const supplierProductSlug = slugify(supplierProduct.name.toLowerCase())

  try {
    const newSupplierProduct: SupplierProduct =
      await prisma.supplierProduct.create({
        data: {
          ...supplierProduct,
          ownerId: userId,
          supplierId: supplierId,
          slug: supplierProductSlug,
        },
      })

    res.json({
      message: 'Create new supplier product',
      supplierParam,
      supplierProduct: newSupplierProduct,
    })
  } catch (error) {
    if (error.code === 'P2002') {
      res.json({
        message:
          'Create new supplier product failed because name/slug need to be unique',
        slug: supplierProductSlug,
        error,
      })
      return next(error)
    } else if (error.code === 'P2011') {
      res.json({
        message:
          'Create new supplier product failed because some fields cannot be empty',
        field: error.meta.constraint,
        error,
      })
    } else {
      res.json({
        message: 'Create new supplier product failed',
        error,
      })
    }
  }
})

export default router
