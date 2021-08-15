import { prisma } from '@qopnet/util-prisma'
import { BusinessOrder, BusinessOrderItem } from '@prisma/client'

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
          businessOrderItems: {
            include: {
              supplierProduct: true,
              supplier: {
                select: {
                  id: true,
                  name: true,
                  handle: true,
                  addresses: {
                    select: {
                      city: true,
                    },
                  },
                },
              },
            },
          },
          shipmentAddress: true,
          paymentMethod: true,
        },
      })

    res.send({
      message: 'Get my all business orders success',
      meta: {
        recordCount: businessOrders?.length,
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

/**
 * Get my cart
 *
 * @param req
 * @param res
 * businessOrder
 *   businessOrderItems
 *     supplierProduct
 *       supplier
 *         addresses
 *   shipmentAddress
 *   courier
 *   payment
 */
export const getMyCart = async (req, res) => {
  const ownerId = req.profile.id

  try {
    const businessOrder: Partial<BusinessOrder> & {
      businessOrderItems: BusinessOrderItem[]
    } = await prisma.businessOrder.findFirst({
      where: { ownerId, status: 'DRAFT' },
      include: {
        businessOrderItems: {
          include: {
            supplierProduct: true,
            supplier: {
              include: {
                addresses: {
                  select: {
                    city: true,
                  },
                },
              },
            },
          },
        },
        shipmentAddress: true,
        shipmentCourier: true,
        paymentMethod: true,
        paymentRecord: true,
      },
    })
    if (!businessOrder) throw 'My cart or draft business order is not found'

    res.send({
      message: 'Get my cart or draft business order draft success',
      ownerId,
      meta: {
        recordCount: {
          businessOrderItems: businessOrder?.businessOrderItems?.length,
        },
      },
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

  // Only continue if cart exist is false
  if (!isCartExist) {
    try {
      const createdCart: Partial<BusinessOrder> =
        await prisma.businessOrder.create({
          data: {
            ownerId,
            status: 'DRAFT',
          },
          include: {
            businessOrderItems: true,
          },
        })

      res.status(201).json({
        message: 'Create my cart or draft business order success',
        businessOrder: createdCart,
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
      // Check via businessOrderItem.id by looping through the items
      const foundBusinessOrderItem = businessOrder?.businessOrderItems?.find(
        (item) => item.supplierProductId === supplierProduct.id
      )

      // 3. Decide to add new or increment quantity
      // Based on if SupplierProduct exist in BusinessOrderItem[]
      if (!foundBusinessOrderItem) {
        // 3.A. Add new item
        // Only update, never upsert, as the cart already available
        const updatedCart = await prisma.businessOrder.update({
          where: {
            id: businessOrder.id,
          },
          include: {
            businessOrderItems: {
              include: {
                supplierProduct: true,
                supplier: {
                  include: {
                    addresses: {
                      select: {
                        city: true,
                      },
                    },
                  },
                },
              },
            },
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
          ownerId,
          meta: {
            recordCount: {
              businessOrderItems: businessOrder?.businessOrderItems?.length,
            },
          },
          isCartExist,
          formData,
          supplierProduct,
          businessOrderItem: foundBusinessOrderItem,
          businessOrder: updatedCart,
        })
      } else {
        // 3.B. Increment item quantity
        // Only update via BusinessOrder, not BusinessOrderItem
        // Because need to check the final result of the update
        const updatedCart = await prisma.businessOrder.update({
          where: {
            id: businessOrder.id,
          },
          include: {
            businessOrderItems: true,
          },
          data: {
            businessOrderItems: {
              update: {
                where: {
                  id: foundBusinessOrderItem.id,
                },
                data: {
                  quantity: {
                    // Increment item quantity via Prisma
                    increment: formData.quantity, // From req.body
                  },
                },
              },
            },
          },
        })

        // Incremented item quantity, finally send the response
        res.status(200).json({
          message:
            'Incremented item quantity on update my cart or draft business order success',
          meta: {
            recordCount: {
              businessOrderItems: businessOrder?.businessOrderItems?.length,
            },
          },
          isCartExist,
          ownerId,
          formData,
          supplierProduct,
          businessOrderItem: foundBusinessOrderItem,
          businessOrder: updatedCart,
        })
      }
    } catch (error) {
      if (error.code === 'P2016') {
        res.status(400).json({
          message:
            'Update my cart or draft business order failed because BusinessOrderItem id is not valid',
          error,
          isCartExist,
          ownerId,
          formData,
          businessOrder,
        })
      } else {
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

// Patch my cart address
export const patchMyCartAddress = async (req, res) => {
  const ownerId = req.profile.id
  const isCartExist = req.isCartExist
  const businessOrder = req.businessOrder
  const formData = req.body

  if (isCartExist) {
    try {
      const updatedCart = await prisma.businessOrder.update({
        where: {
          id: businessOrder.id,
        },
        include: {
          shipmentAddress: true,
        },
        data: {
          shipmentAddressId: formData.id, // Patch
        },
      })

      res.status(200).json({
        message: 'Patch my cart address success',
        ownerId,
        isCartExist,
        formData,
        businessOrder: updatedCart,
      })
    } catch (error) {
      res.status(400).json({
        message:
          'Patch my cart courier failed, might because address id is invalid',
        error,
        ownerId,
        isCartExist,
        formData,
      })
    }
  } else {
    res.status(400).json({
      message: 'Patch my cart address failed because cart is not exist',
      ownerId,
      isCartExist,
      formData,
    })
  }
}

// Patch my cart courier
export const patchMyCartCourier = async (req, res) => {
  const ownerId = req.profile.id
  const isCartExist = req.isCartExist
  const businessOrder = req.businessOrder
  const formData = req.body

  if (isCartExist) {
    try {
      const updatedCart = await prisma.businessOrder.update({
        where: {
          id: businessOrder.id,
        },
        include: {
          shipmentAddress: true,
          shipmentCourier: true,
          paymentMethod: true,
          paymentRecord: true,
        },
        data: {
          shipmentCourierId: formData.id, // Patch
        },
      })

      res.status(200).json({
        message: 'Patch my cart courier success',
        ownerId,
        isCartExist,
        formData,
        businessOrder: updatedCart,
      })
    } catch (error) {
      res.status(400).json({
        message:
          'Patch my cart courier failed, might because courier id is invalid',
        error,
        ownerId,
        isCartExist,
        formData,
      })
    }
  } else {
    res.status(400).json({
      message: 'Patch my cart courier failed because cart is not exist',
      ownerId,
      isCartExist,
      formData,
    })
  }
}

// Patch my cart payment
export const patchMyCartPayment = async (req, res) => {
  const ownerId = req.profile.id
  const isCartExist = req.isCartExist
  const businessOrder = req.businessOrder
  const formData = req.body

  if (isCartExist) {
    try {
      const updatedCart = await prisma.businessOrder.update({
        where: {
          id: businessOrder.id,
        },
        include: {
          shipmentAddress: true,
          shipmentCourier: true,
          paymentMethod: true,
          paymentRecord: true,
        },
        data: {
          paymentMethodId: formData.id, // Patch
        },
      })

      res.status(200).json({
        message: 'Patch my cart payment method success',
        ownerId,
        isCartExist,
        formData,
        businessOrder: updatedCart,
      })
    } catch (error) {
      res.status(400).json({
        message:
          'Patch my cart payment method failed, might because payment method id is invalid',
        error,
        ownerId,
        isCartExist,
        formData,
      })
    }
  } else {
    res.status(400).json({
      message: 'Patch my cart payment method failed because cart is not exist',
      ownerId,
      isCartExist,
      formData,
    })
  }
}

// Update my cart to process my order
// The cart has become an order with default status of WAITING_FOR_PAYMENT
export const processMyOrder = async (req, res) => {
  const ownerId = req.profile.id
  const isCartExist = req.isCartExist
  const businessOrder = req.businessOrder

  if (isCartExist) {
    try {
      /**
       * This should not require any formData or req.body
       * But still need to check if these fields are available:
       * - shipmentAddress
       * - shipmentCourier
       * - paymentMethod
       * Then finally:
       * - Change the status to WAITING_FOR_PAYMENT
       * - Create a payment record to be completed later
       */
      if (
        businessOrder.shipmentAddressId &&
        businessOrder.shipmentCourierId &&
        businessOrder.paymentMethodId
      ) {
        const updatedCart = await prisma.businessOrder.update({
          where: {
            id: businessOrder.id,
          },
          data: {
            status: 'WAITING_FOR_PAYMENT',
          },
        })

        res.status(200).json({
          message: 'Process my order success',
          ownerId,
          isCartExist,
          businessOrder: updatedCart,
        })
      } else {
        res.status(400).json({
          message: 'Process my order failed because fields are missing',
          ownerId,
          isCartExist,
          fields: {
            shipmentAddressId: businessOrder.shipmentAddressId,
            shipmentCourierId: businessOrder.shipmentCourierId,
            paymentMethodId: businessOrder.paymentMethodId,
          },
          businessOrder,
        })
      }
    } catch (error) {
      res.status(400).json({
        message: 'Process my order failed',
        error,
        ownerId,
        isCartExist,
      })
    }
  } else {
    res.status(400).json({
      message: 'Process my order failed because cart is not exist',
      ownerId,
      isCartExist,
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
        orderBy: [{ updatedAt: 'desc' }],
        include: {
          owner: true,
          businessOrderItems: true,
          shipmentAddress: true,
          paymentMethod: true,
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
          owner: {
            include: {
              user: true,
              addresses: true,
            },
          },
          businessOrderItems: {
            include: {
              supplier: true,
            },
          },
          shipmentAddress: true, // One address
          paymentMethod: true, // BCA / COD
          paymentRecord: true, // Detail transfer
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

// Patch one business order status by businessOrderParam (id)
export const patchOneBusinessOrderStatus = async (req, res) => {
  const { businessOrderParam } = req.params
  const isBusinessOrderExist = req.isBusinessOrderExist
  const formData = req.body

  if (isBusinessOrderExist) {
    const updatedCart = await prisma.businessOrder.update({
      where: {
        id: businessOrderParam,
      },
      include: {
        businessOrderItems: true,
      },
      data: {
        status: formData?.status,
      },
    })

    res.status(200).json({
      message: 'Patch one business order status success',
      businessOrderParam,
      isBusinessOrderExist,
      businessOrder: updatedCart,
      formData,
    })
  } else {
    res.status(404).json({
      message:
        'Patch one business order status failed, because it is not found',
      businessOrderParam,
      isBusinessOrderExist,
      formData,
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
        where: {
          ownerId,
          status: 'DRAFT',
        },
        include: {
          shipmentAddress: true,
          shipmentCourier: true,
          shipmentCourierVehicle: true,
          paymentMethod: true,
          paymentRecord: true,
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
          data: {
            ownerId,
            status: 'DRAFT',
          },
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

// Check one business order
export const checkOneBusinessOrder = async (req, res, next) => {
  const { businessOrderParam } = req.params
  const ownerId = req.profile.id

  try {
    const businessOrder: Partial<BusinessOrder> =
      await prisma.businessOrder.findUnique({
        where: {
          id: businessOrderParam,
        },
        include: {
          businessOrderItems: true,
          paymentMethod: true,
          paymentRecord: true,
        },
      })

    if (businessOrder) {
      req.businessOrder = businessOrder
      req.isBusinessOrderExist = true
      next()
    } else {
      req.isBusinessOrderExist = false
      next()
    }
  } catch (error) {
    res.status(500).send({
      message: 'Check one business order failed',
      ownerId,
      error,
    })
  }
}
