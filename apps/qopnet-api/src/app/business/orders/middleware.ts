import { prisma } from '@qopnet/util-prisma'
import {
  Prisma,
  BusinessOrder,
  BusinessOrderItem,
  Address,
} from '@prisma/client'

// -----------------------------------------------------------------------------
// User Only

// Get my all business orders
export const getMyAllBusinessOrders = async (req, res) => {
  const ownerId = req.profile.id

  try {
    const businessOrders: Partial<BusinessOrder>[] =
      await prisma.businessOrder.findMany({
        where: {
          ownerId,
        },
        include: {
          businessOrderItems: true,
          shipmentAddress: true,
          payment: true,
        },
      })

    res.send({
      message: 'Get my all business orders success',
      meta: {
        recordCount: businessOrders.length,
      },
      businessOrders,
    })
  } catch (error) {
    res.status(500).send({
      message: 'Get my all business orders failed',
      error,
    })
  }
}

// Get my cart
export const getMyCart = async (req, res) => {
  const ownerId = req.profile.id

  try {
    const businessOrder: Partial<BusinessOrder> =
      await prisma.businessOrder.findFirst({
        where: { ownerId, status: 'DRAFT' },
        include: {
          businessOrderItems: true,
          shipmentAddress: true,
          payment: true,
        },
      })
    if (!businessOrder) throw 'My cart or draft business order is not found'

    res.send({
      message: 'Get my cart or draft business order draft success',
      ownerId,
      businessOrder,
    })
  } catch (error) {
    res.status(404).send({
      message: 'Get my cart or draft business order failed because not found',
      ownerId,
      error,
    })
  }
}

// Create my cart
export const createMyCart = async (req, res) => {
  const isCartExist = req.isCartExist
  const ownerId = req.profile.id
  const formData = req.body

  // Only continue if cart exist is false
  if (!isCartExist) {
    try {
      const createdCart: Partial<BusinessOrder> =
        await prisma.businessOrder.create({
          data: { ownerId, status: 'DRAFT' },
        })

      res.status(201).json({
        message: 'Create my cart or draft business order success',
        businessOrder: createdCart,
        formData,
      })
    } catch (error) {
      if (error.code === 'P2011') {
        res.status(400).json({
          message:
            'Create my cart or draft business order failed because some fields cannot be empty',
          field: error.meta.constraint,
          error,
        })
      } else {
        res.status(500).json({
          message:
            'Create my cart or draft business order failed because unknown error',
          error,
        })
      }
    }
  } else {
    res.status(400).json({
      message: 'Create my cart or draft business order failed already exist',
      formData,
    })
  }
}

// Update my cart with one business order item
// PUT /api/business/orders/my/cart
export const updateMyCart = async (req, res) => {
  const ownerId = req.profile.id
  const isCartExist = req.isCartExist
  const businessOrder = req.businessOrder
  const formData = req.body

  // Only continue if both cart exist and business order available
  if (isCartExist && businessOrder) {
    try {
      // 1. Find one supplier product by id
      const supplierProduct = await prisma.supplierProduct.findUnique({
        where: {
          id: formData.id,
        },
        select: {
          id: true,
          name: true,
          slug: true,
          price: true,
          supplier: { select: { id: true, name: true } },
        },
      })
      if (!supplierProduct) throw 'Supplier product not found'

      // 2. Find if any existing SupplierProduct in BusinessOrderItem[]
      const isExistInItems = false

      // 3. Decide to add new or increment quantity
      // Based on if SupplierProduct exist in BusinessOrderItem[]
      if (!isExistInItems) {
        // 3.A. Add new item
        console.log('Add new')
        // Only update, never upsert, as the cart already available
        const updatedCart = await prisma.businessOrder.update({
          where: {
            id: businessOrder.id,
          },
          include: {
            businessOrderItems: true,
          },
          data: {
            // Only focus on businessOrderItems, not other fields
            // This will create a new BusinessOrderItem record
            businessOrderItems: {
              create: {
                quantity: formData.quantity, // From req.body
                supplierProductId: supplierProduct.id, // From database
                supplierId: supplierProduct.supplier.id, // From database
              },
            },
          },
        })
        // Added new item, finally send the response
        res.status(200).json({
          message:
            'Added new item on update my cart or draft business order success',
          isCartExist,
          ownerId,
          formData,
          supplierProduct,
          isExistInItems,
          businessOrder: updatedCart,
        })
      } else {
        // 3.B. Increment quantity
        console.log('Increment quantity')

        // Incremented item quantity, finally send the response
        res.status(200).json({
          message:
            'Incremented item quantity on update my cart or draft business order success',
          isCartExist,
          ownerId,
          formData,
          supplierProduct,
          isExistInItems,
          // businessOrderItem,
          businessOrder,
        })
      }
    } catch (error) {
      res.status(400).json({
        message:
          'Update my cart or draft business order failed because supplier product is not found',
        error,
        isCartExist,
        ownerId,
        formData,
        businessOrder,
      })
    }
  } else {
    res.status(400).json({
      message:
        'Update my cart or draft business order failed because cart is not exist',
      isCartExist,
      ownerId,
      businessOrder,
      formData,
    })
  }
}

// -----------------------------------------------------------------------------
// Admin Only
// -----------------------------------------------------------------------------

// Get all business orders
export const getAllBusinessOrders = async (req, res) => {
  try {
    const businessOrders: Partial<BusinessOrder>[] =
      await prisma.businessOrder.findMany({
        include: {
          owner: true,
          businessOrderItems: true,
          shipmentAddress: true,
          payment: true,
        },
      })

    res.send({
      message: 'Get all business orders success',
      businessOrders,
    })
  } catch (error) {
    res.status(500).send({
      message: 'Get all business orders failed',
      error,
    })
  }
}

// Get one business order by businessOrderParam (id)
export const getOneBusinessOrder = async (req, res) => {
  const { businessOrderParam } = req.params

  try {
    const businessOrder: Partial<BusinessOrder> =
      await prisma.businessOrder.findFirst({
        where: { id: businessOrderParam },
        include: {
          owner: true,
          businessOrderItems: true,
          shipmentAddress: true,
          payment: true,
        },
      })
    if (!businessOrder) throw 'Business order by param is not found'

    res.send({
      message: 'Get one business order success',
      businessOrderParam,
      businessOrder,
    })
  } catch (error) {
    res.status(500).send({
      message: 'Get one business orders failed',
      businessOrderParam,
      error,
    })
  }
}

// Create one business order
export const createOneBusinessOrder = async (req, res) => {
  const ownerId = req.profile.id
  const formData = req.body

  try {
    const createdCart: Partial<BusinessOrder> =
      await prisma.businessOrder.create({
        data: { ownerId, status: 'DRAFT' },
        include: {
          owner: true,
        },
      })

    res.status(201).json({
      message: 'Create new cart or draft business order success',
      businessOrder: createdCart,
      formData,
    })
  } catch (error) {
    if (error.code === 'P2011') {
      res.status(400).json({
        message:
          'Create new business order failed because some fields cannot be empty',
        field: error.meta.constraint,
        error,
      })
    } else {
      res.status(500).json({
        message: 'Create new business order failed because unknown error',
        error,
      })
    }
  }
}

// Update one business order by param (id)
export const updateOneBusinessOrder = async (req, res) => {
  try {
    // const result = await prisma.businessOrder.upsert()
    res.send({
      message: 'Update one business order success',
      result: 'pending',
    })
  } catch (error) {
    res.status(500).send({
      message: 'Update one business order failed',
      error,
    })
  }
}

// Delete all business orders
export const deleteAllBusinessOrders = async (req, res) => {
  try {
    const result = await prisma.businessOrder.deleteMany()
    res.send({
      message: 'Delete all business orders success',
      result,
    })
  } catch (error) {
    res.status(500).send({
      message: 'Delete all business orders failed',
      error,
    })
  }
}

// Delete one business order
export const deleteOneBusinessOrder = async (req, res) => {
  const { businessOrderParam } = req.params
  const ownerId = req.profile.id

  try {
    const foundBusinessOrder: Partial<BusinessOrder> =
      await prisma.businessOrder.findFirst({
        where: {
          id: businessOrderParam,
          ownerId,
        },
      })
    if (!foundBusinessOrder)
      throw 'Delete one business order not found or not allowed'
    const deletedBusinessOrder: Partial<BusinessOrder> =
      await prisma.businessOrder.delete({
        where: {
          id: businessOrderParam,
        },
      })

    res.send({
      message: 'Delete one business order success',
      businessOrderParam,
      ownerId,
      foundBusinessOrder,
      deletedBusinessOrder,
    })
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).send({
        message: 'Delete one business order failed because it does not exist',
        businessOrderParam,
        ownerId,
        error,
      })
    } else {
      res.status(500).send({
        message: 'Delete one business order failed',
        businessOrderParam,
        ownerId,
        error,
      })
    }
  }
}

// -----------------------------------------------------------------------------
// Next Middlewares

// Check my cart
export const checkMyCart = async (req, res, next) => {
  const ownerId = req.profile.id

  try {
    const businessOrder: Partial<BusinessOrder> =
      await prisma.businessOrder.findFirst({
        where: { ownerId, status: 'DRAFT' },
        include: {
          businessOrderItems: true,
        },
      })

    if (businessOrder) {
      req.businessOrder = businessOrder
      req.isCartExist = true
      next()
    } else {
      req.isCartExist = false
      next()
    }
  } catch (error) {
    res.status(500).send({
      message: 'Check existing cart or business order draft failed',
      ownerId,
      error,
    })
  }
}

// Decide to automatically create my cart if request is update
export const autoCreateMyCart = async (req, res, next) => {
  const isCartExist = req.isCartExist
  const ownerId = req.profile.id

  // Automatically create if cart exist is false
  if (!isCartExist) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const businessOrder: Partial<BusinessOrder> =
        await prisma.businessOrder.create({
          data: { ownerId, status: 'DRAFT' },
        })

      // Change the flags because auto create
      req.isCartExist = true
      req.businessOrder = businessOrder

      // Don't do res.send()
      next()
    } catch (error) {
      res.status(500).json({
        message:
          'Automatically create my cart or draft business order failed because unknown error',
        isCartExist,
        ownerId,
        error,
      })
    }
  } else {
    // Continue just fine if cart is already exist
    next()
  }
}
