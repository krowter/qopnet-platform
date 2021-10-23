import { prisma } from '@qopnet/util-prisma'
import { SupplierProduct } from '@prisma/client'

export const allSupplierProductsFields = {
  select: {
    id: true,
    images: true,
    slug: true,
    name: true,
    subname: true,
    sku: true,
    discount: true,
    discountMaxReduction: true,
    price: true,
    priceMax: true,
    priceMin: true,
    supplier: { select: { handle: true } },
  },
}

// Get all supplier products
export const getSupplierProducts = async (req, res) => {
  try {
    const supplierProducts: Partial<SupplierProduct>[] =
      await prisma.supplierProduct.findMany({
        ...allSupplierProductsFields,
        orderBy: [{ sku: 'desc' }, { name: 'desc' }],
        skip: req.skip,
        take: req.take,
      })
    res.status(200).json({
      message: 'Get all supplier products success',
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
}

// Get all supplier products using search query
export const getSupplierProductsByQuery = async (req, res) => {
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

    res.status(200).json({
      message: 'Get all supplier products by search query success',
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
}

// Get one supplier product by supplierProductParam
export const getSupplierProductBySupplierProductParam = async (req, res) => {
  const { supplierProductParam } = req.params

  try {
    const supplierProduct = await prisma.supplierProduct.findUnique({
      where: { slug: supplierProductParam },
      include: {
        supplier: { include: { owner: true } },
        owner: true,
      },
    })

    if (!supplierProduct) {
      throw new Error(`Failed to find supplier product with specific param`)
    }

    res.json({
      message: 'Get one supplier product by supplierProductParam success',
      supplierProduct,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Get one supplier product by :supplierProductParam failed',
      supplierProductParam,
      error,
    })
  }
}

// Get special products. Take latest 10 products
export const getSpecialSupplierProducts = async (req, res) => {
  try {
    const supplierProducts: Partial<SupplierProduct>[] =
      await prisma.supplierProduct.findMany({
        ...allSupplierProductsFields,
        take: req.take || 10,
        skip: req.skip,
        orderBy: [{ sku: 'desc' }, { name: 'desc' }],
      })

    res.status(200).json({
      message: 'Get all special supplier products success',
      meta: {
        recordCount: supplierProducts.length,
        pageCount: req.page?.number,
      },
      supplierProducts,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Get all special supplier products failed',
      error,
    })
  }
}
