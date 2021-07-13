import { PrismaClient, Prisma, SupplierProduct } from '@prisma/client'
const prisma = new PrismaClient()
import * as express from 'express'
const router = express.Router()
import slugify from 'slugify'
import { checkUser } from '../auth/middleware'

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

router.post('/:supplierParam/products', checkUser, async (req, res, next) => {
  const userId = req.user.sub!
  let supplierId = ''
  const { supplierParam } = req.params

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

  // get supplier id
  try {
    const supplier = await prisma.supplier.findUnique({
      where: {
        handle: supplierParam,
      },
    })
    if (!supplier) throw new Error('Supplier not found')
    supplierId = supplier.id
  } catch (error) {
    res.json({
      message: error.message,
      supplierParam,
      error,
    })
    return next(error)
  }

  const supplierProduct: Prisma.SupplierProductCreateInput =
    req.body.supplierProduct
  const supplierProductSlug = slugify(supplierProduct.name.toLowerCase())

  try {
    const newSupplierProduct: SupplierProduct = await prisma.supplierProduct.create(
      {
        data: {
          ...supplierProduct,
          ownerId: userId,
          supplierId: supplierId,
          slug: supplierProductSlug,
        },
      }
    )

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

export default router
