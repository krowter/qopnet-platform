import { PrismaClient, SupplierProduct, Supplier } from '@prisma/client'
import slugify from 'slugify'
import * as express from 'express'

import { checkUser } from '../auth/middleware'

const prisma = new PrismaClient()
const router = express.Router()

/**
 * GET /api/suppliers
 * Get all suppliers
 */
router.get('/', async (req, res) => {
  try {
    const supplier: Supplier[] = await prisma.supplier.findMany({})
    res.json({
      message: 'Get all suppliers',
      supplier,
    })
  } catch (error) {
    res.json({
      message: 'Failed to get all suppliers',
      error,
    })
  }
})

/**
 * GET /api/suppliers/:supplierParam
 * Get one supplier by supplierParam
 */
router.get('/:supplierParam', async (req, res) => {
  const { supplierParam } = req.params
  try {
    const supplier = await prisma.supplier.findUnique({
      where: {
        handle: supplierParam,
      },
      include: {
        owner: {
          include: {
            user: true,
          },
        },
        addresses: true,
        supplierProducts: true,
      },
    })

    if (!supplier) {
      res.status(404).json({
        message: 'Get one supplier by supplierParam not found',
        supplierParam,
      })
    }

    res.json({
      message: 'Get one supplier by supplierParam',
      supplierParam,
      supplier,
    })
  } catch (error) {
    res.json({
      message: 'Get one supplier by supplier param',
      supplierParam,
      error,
    })
  }
})

/**
 * Get supplier products by two ways:
 * 1. :id
 * 2. :supplierParam or slug
 * If not found by id, try to find by supplierParam
 */
router.get('/:id/products', async (req, res) => {
  const { id } = req.params

  try {
    const supplierProducts = await prisma.supplier.findUnique({
      where: { id },
      include: { supplierProducts: true },
    })

    res.json({
      message: 'Get all supplier products by supplierId',
      id,
      supplierProducts: supplierProducts,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Get all supplier products by supplierId failed',
      id,
    })
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

/**
 * POST /api/suppliers
 */
router.post('/', checkUser, async (req, res) => {
  /**
   * Currently omit Supplier type check because
   * the request is still using address f, not addresses
   */
  const userId = req.user.sub
  const newSupplier = req.body

  try {
    /**
     * Check if user exist by userId
     * This user findUnique can be a middleware later like in checkUser
     */
    const user = await prisma.user.findFirst({
      where: { id: userId },
      include: { profile: true },
    })
    if (!user) throw new Error('Failed to findUnique user')
    // Assign profileId once get the user
    const profileId = user.profile.id

    // After got the profile or respective owner of the supplier
    try {
      /**
       * Manually arrange the supplier data,
       * Don't use ...spread because it contains address object, not array
       */
      const payloadData = {
        name: newSupplier.name,
        handle: newSupplier.handle,
        phone: newSupplier.phone,
        category: newSupplier.category,
        nationalTax: newSupplier.nationalTax,
        certificationFile: newSupplier.certificationFile,
        ownerId: profileId,
        addresses: {
          create: [newSupplier.address],
          // Pass the address object as the first array item
        },
      }

      // Finally can create new supplier data via Prisma
      const createdSupplier = await prisma.supplier.create({
        data: payloadData,
        include: {
          owner: true,
          addresses: true,
          supplierProducts: true,
        },
      })

      // 200 OK
      res.json({
        message: 'Create new supplier success',
        supplier: createdSupplier,
      })
    } catch (error) {
      // 400 Client Error
      if (error.code === 'P2002') {
        res.status(400).json({
          message:
            'Create new supplier failed because name/handle need to be unique',
          handle: newSupplier.handle,
          error,
        })
      } else if (error.code === 'P2003') {
        res.status(400).json({
          message:
            'Create new supplier failed because ownerId value is not in CUID format',
          error,
        })
      } else if (error.code === 'P2011') {
        res.status(400).json({
          message:
            'Create new supplier failed because some fields cannot be empty',
          field: error.meta.constraint,
          error,
        })
      } else {
        // 500 Server Error
        res.status(500).json({
          message: 'Create new supplier failed because unknown reason',
          error,
        })
      }
    }
  } catch (error) {
    // 404 Client Error
    res.json({
      message: 'Create new supplier failed because user profile not found',
      error,
    })
  }
})

/**
 * POST /api/suppliers/:supplierParam/products
 * Create new supplier product
 */
router.post('/:supplierParam/products', checkUser, async (req, res) => {
  const userId = req.user.sub
  const { supplierParam } = req.params

  // Setup supplier product data
  const supplierProduct: SupplierProduct = req.body
  const supplierProductSlug = slugify(supplierProduct.name.toLowerCase())

  // Check if user exist by userId
  try {
    const user = await prisma.user.findFirst({
      where: { id: userId },
      include: { profile: true },
    })

    // Get supplier id by supplierParam
    // So later we can create the products for that supplier
    try {
      const supplier = await prisma.supplier.findFirst({
        where: { handle: { contains: supplierParam, mode: 'insensitive' } },
      })

      try {
        const data = {
          ...supplierProduct,
          slug: supplierProductSlug,
          supplierId: supplier.id,
          ownerId: user.profile.id,
        }

        const newSupplierProduct: SupplierProduct =
          await prisma.supplierProduct.create({ data })

        res.json({
          message: 'Create new supplier product success',
          supplierParam,
          supplierProduct: newSupplierProduct,
        })
      } catch (error) {
        if (error.code === 'P2002') {
          res.status(400).json({
            message:
              'Create new supplier product failed because name/slug need to be unique',
            slug: supplierProductSlug,
            error,
          })
        } else if (error.code === 'P2003') {
          res.status(400).json({
            message:
              'Create new supplier product failed because foreign key constraint failed on the field',
            field: error.meta.field_name,
            slug: supplierProductSlug,
            error,
          })
        } else if (error.code === 'P2011') {
          res.status(400).json({
            message:
              'Create new supplier product failed because some fields cannot be empty',
            field: error.meta.constraint,
            error,
          })
        } else {
          res.status(500).json({
            message:
              'Create new supplier product failed because unknown reason',
            error,
          })
        }
      }
    } catch (error) {
      res.json({
        message:
          'Create new supplierProduct failed because supplierParam not found',
        supplierParam,
        error,
      })
    }
  } catch (error) {
    res.json({
      message: 'Create new supplierProduct failed because user not found',
      supplierParam,
      error,
    })
  }
})

export default router
