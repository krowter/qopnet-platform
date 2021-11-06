import { prisma } from '@qopnet/util-prisma'
import { SupplierProduct, Supplier } from '@prisma/client'
import slugify from 'slugify'

import { allSupplierProductsFields } from './products/middleware'

// Get all suppliers
export const getAllSuppliers = async (req, res) => {
  try {
    const suppliers: Supplier[] = await prisma.supplier.findMany({
      include: {
        owner: true,
        addresses: true,
        supplierProducts: true,
      },
      skip: req.skip,
      take: req.take,
    })

    res.status(200).json({
      message: 'Get all suppliers success',
      meta: {
        recordCount: suppliers.length,
        pageCount: req.page?.number,
      },
      suppliers,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Get all suppliers failed',
      error,
    })
  }
}

// Get supplier by handle
export const getSupplierByHandle = async (req, res) => {
  const { supplierParam } = req.params

  try {
    const supplier = await prisma.supplier.findUnique({
      where: { handle: supplierParam },
      include: {
        owner: { include: { user: { select: { id: true } } } },
        addresses: true,
        supplierProducts: {
          ...allSupplierProductsFields,
          orderBy: [{ sku: 'desc' }, { name: 'desc' }],
        },
      },
    })

    if (supplier) {
      res.status(200).json({
        message: 'Get supplier success',
        supplierParam,
        supplier,
      })
    } else {
      res.status(404).json({
        message: 'Supplier not found',
        supplierParam,
      })
    }
  } catch (error) {
    res.status(500).json({
      message: 'Get supplier failed',
      supplierParam,
      error,
    })
  }
}

// Get all supplier products by supplierId
export const getSupplierProductsBySupplierId = async (req, res) => {
  const { supplierParam } = req.params

  try {
    const supplierProducts = await prisma.supplierProduct.findMany({
      ...allSupplierProductsFields,
      where: { supplier: { handle: supplierParam } },
      orderBy: [{ sku: 'desc' }, { name: 'desc' }],
    })

    res.json({
      message: 'Get all supplier products by supplierId',
      supplierParam,
      supplierProducts: supplierProducts,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Get all supplier products by supplierId failed',
      supplierParam,
    })
  }
}

// Get all supplier products by supplierParam
export const getSupplierProductsBySupplierParam = async (req, res) => {
  const { supplierParam } = req.params

  try {
    const supplierProducts = await prisma.supplier.findUnique({
      where: { handle: supplierParam },
      include: { supplierProducts: true },
    })

    if (!supplierProducts)
      throw new Error('Failed to supplierProducts by supplierParam')

    res.status(200).json({
      message: 'Get all supplierProducts by supplierParam',
      supplierParam,
      supplierProducts,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Get all supplierProducts by supplierParam failed',
      supplierParam,
      error,
    })
  }
}

// Get one supplier product by supplierParam
export const getSupplierProductBySupplierParam = async (req, res, next) => {
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
    const supplierProducts = await prisma.supplierProduct.findFirst({
      where: {
        supplierId: supplierId,
        slug: supplierProductParam,
      },
    })

    if (!supplierProductParam)
      throw new Error("Couldn't find a supplier product with specific params")

    res.status(200).json({
      message: 'Get all supplier products by supplier supplierParam',
      supplierParam,
      supplierProductParam,
      supplierProducts,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
      supplierParam,
      supplierProductParam,
      error,
    })
    next(error)
  }
}

// Get selected supplier products by search query || Search supplier products in one supplier
export const getSupplierProductsBySearchQuery = async (req, res) => {
  const supplierParam: string = req.params.supplierParam as string
  const searchQuery: string = req.query.q as string

  try {
    const supplierProducts: Partial<SupplierProduct>[] =
      await prisma.supplierProduct.findMany({
        ...allSupplierProductsFields,
        where: {
          supplier: { handle: supplierParam },
          OR: [
            { slug: { contains: searchQuery, mode: 'insensitive' } },
            { sku: { contains: searchQuery, mode: 'insensitive' } },
            { name: { contains: searchQuery, mode: 'insensitive' } },
            { description: { contains: searchQuery, mode: 'insensitive' } },
          ],
        },
        skip: req.skip,
        take: req.take,
        orderBy: [{ sku: 'desc' }, { name: 'desc' }],
      })

    res.status(200).json({
      message: 'Get selected supplier products by search query',
      meta: {
        recordCount: supplierProducts.length,
        pageCount: req.page?.number,
      },
      supplierParam,
      searchQuery,
      supplierProducts,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Get selected supplier products by search query failed',
      searchQuery,
      error,
    })
  }
}

// Create new supplier
export const createSupplier = async (req, res) => {
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
    res.status(404).json({
      message: 'Create new supplier failed because user profile not found',
      error,
    })
  }
}

// Create new supplier product for one supplier
export const createSupplierProduct = async (req, res) => {
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
    if (!user) throw new Error('User not found')

    // Get supplier handle by supplierParam
    // So we can create the products for that supplier
    try {
      const supplier = await prisma.supplier.findFirst({
        where: { handle: { contains: supplierParam, mode: 'insensitive' } },
      })
      if (!supplier) throw new Error('Supplier not found')

      try {
        const payloadData = {
          ...supplierProduct,
          slug: supplierProductSlug,
          supplierId: supplier.id,
          ownerId: user.profile.id,
        }

        const newSupplierProduct: SupplierProduct =
          await prisma.supplierProduct.create({
            data: payloadData,
          })

        res.json({
          message: 'Create new supplier product success',
          supplierParam,
          supplierProduct: newSupplierProduct,
        })
      } catch (error) {
        console.error({ error })
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
          res.status(400).json({
            message:
              'Create new supplier product failed because unknown reason',
            error,
          })
        }
      }
    } catch (error) {
      res.status(400).json({
        message:
          'Create new supplierProduct failed because supplierParam not found',
        supplierParam,
        error,
      })
    }
  } catch (error) {
    res.status(500).json({
      message: 'Create new supplierProduct failed because user not found',
      supplierParam,
      error,
    })
  }
}
