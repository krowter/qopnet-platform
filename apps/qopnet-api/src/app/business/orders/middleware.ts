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
          NOT: {
            status: 'DRAFT',
          },
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
              courier: true,
              courierVehicle: true,
            },
          },
          shipmentAddress: true,
          paymentMethod: true,
          paymentRecord: true,
          virtualAccountNumber: true,
        },
        orderBy: { updatedAt: 'desc' },
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

// Get one paid business orders item by handle supplier and businessOrderItemId
export const getOnePaidBusinessOrderItem = async (req, res) => {
  const { supplierHandle, businessOrderItemId } = req.params

  try {
    const supplier = await prisma.supplier.findUnique({
      where: {
        handle: supplierHandle,
      },
    })

    if (!supplier) throw new Error('Supplier not found')

    const paidBusinessOrderItem = await prisma.businessOrderItem.findFirst({
      where: {
        id: businessOrderItemId,
        supplier: {
          handle: supplierHandle,
        },
        businessOrder: {
          status: 'PAID',
        },
      },
      include: {
        businessOrder: {
          include: {
            shipmentAddress: true,
          },
        },
        supplierProduct: {
          include: {
            couriers: { include: { courier: true } },
          },
        },
        supplier: true,
        courier: true,
        courierVehicle: true,
      },
    })

    res.send({
      message:
        'Get one paid business orders item by supplier handle and business order id success',
      supplier,
      paidBusinessOrderItem,
    })
  } catch (error) {
    res.status(500).send({
      message:
        'Get one paid business orders item by supplier handle business order id failed',
      error,
    })
  }
}

// Get all paid business orders items by handle supplier
export const getAllPaidBusinessOrderItems = async (req, res) => {
  const { supplierHandle } = req.params

  try {
    const supplier = await prisma.supplier.findUnique({
      where: {
        handle: supplierHandle,
      },
    })

    const paidBusinessOrderItems = await prisma.businessOrderItem.findMany({
      where: {
        supplier: {
          handle: supplierHandle,
        },
        businessOrder: {
          status: 'PAID',
        },
      },
      include: {
        businessOrder: {
          include: {
            owner: true,
            shipmentAddress: true,
          },
        },
        supplierProduct: true,
        supplier: true,
      },
      orderBy: { updatedAt: 'desc' },
    })

    res.send({
      message: 'Get all paid business orders items by supplier handle success',
      supplier,
      paidBusinessOrderItems,
    })
  } catch (error) {
    res.status(500).send({
      message: 'Get all paid business orders items by supplier handle failed',
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
      where: {
        ownerId,
        status: 'DRAFT',
      },
      include: {
        owner: true,
        businessOrderItems: {
          include: {
            supplierProduct: {
              include: {
                couriers: { include: { courier: true } },
              },
            },
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
        paymentMethod: true,
        paymentRecord: true,
        virtualAccountNumber: true,
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
                supplierProduct: {
                  include: {
                    couriers: { include: { courier: true } },
                  },
                },
                supplier: {
                  include: {
                    addresses: {
                      select: {
                        city: true,
                      },
                    },
                  },
                },
                courier: true,
                courierVehicle: true,
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

// Patch my cart item based on action:
// DELETE
// INCREMENT
// DECREMENT
//   If <1 then DELETE
export const patchMyCartItem = async (req, res) => {
  const ownerId = req.profile.id
  const isCartExist = req.isCartExist
  const formData = req.body

  if (isCartExist && formData.action) {
    try {
      if (formData.action === 'DELETE') {
        // DELETE only
        const deletedBusinessOrderItem = await prisma.businessOrderItem.delete({
          where: { id: formData.id },
        })
        res.status(200).json({
          message: 'Patch my cart DELETE item success',
          formData,
          businessOrderItem: deletedBusinessOrderItem,
        })
      } else if (formData.action === 'INCREMENT') {
        // INCREMENT with quantity
        const incrementedBusinessOrderItem =
          await prisma.businessOrderItem.update({
            where: { id: formData.id },
            data: { quantity: { increment: formData.quantity || 0 } },
          })
        res.status(200).json({
          message: 'Patch my cart INCREMENT item success',
          formData,
          businessOrderItem: incrementedBusinessOrderItem,
        })
      } else if (formData.action === 'CUSTOM_QUANTITY') {
        const incrementedBusinessOrderItem =
          await prisma.businessOrderItem.update({
            where: { id: formData.id },
            data: { quantity: formData.quantity ?? 1 },
          })
        res.status(200).json({
          message: 'Patch my cart CUSTOM_QUANTITY item success',
          formData,
          businessOrderItem: incrementedBusinessOrderItem,
        })
      } else if (formData.action === 'DECREMENT') {
        const decrementedBusinessOrderItem =
          await prisma.businessOrderItem.update({
            where: { id: formData.id },
            data: { quantity: { decrement: formData.quantity || 0 } },
          })
        // Delete if the quantity is already 0 or less than 1
        if (decrementedBusinessOrderItem.quantity < 1) {
          const deletedBusinessOrderItem =
            await prisma.businessOrderItem.delete({
              where: { id: formData.id },
            })
          res.status(200).json({
            message:
              'Patch my cart DECREMENT item success, quantity is less than 1, just DELETE',
            formData,
            businessOrderItem: deletedBusinessOrderItem,
          })
        }
        res.status(200).json({
          message: 'Patch my cart DECREMENT item success',
          formData,
          businessOrderItem: decrementedBusinessOrderItem,
        })
      } else {
        res.status(400).json({
          message: 'Patch my cart action is not available',
          formData,
        })
      }
    } catch (error) {
      res.status(400).json({
        message: 'Patch my cart item failed, might because something wrong',
        error,
        ownerId,
        isCartExist,
        formData,
      })
    }
  } else {
    res.status(400).json({
      message:
        'Patch my cart item failed because cart is not exist or action is unavailable',
      ownerId,
      isCartExist,
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
          'Patch my cart address failed, might because address id is invalid',
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

// Patch one BusinessOrderItem's Courier
export const patchOneBusinessOrderItemCourier = async (req, res) => {
  const ownerId = req.profile.id
  const businessOrderItem = req.businessOrderItem
  const formData = req.body

  try {
    const updatedCart = await prisma.businessOrderItem.update({
      where: {
        id: businessOrderItem.id,
      },
      data: {
        courierId: formData.id, // Patch
      },
    })

    res.status(200).json({
      message: 'Patch one business order item courier success',
      ownerId,
      formData,
      businessOrder: updatedCart,
    })
  } catch (error) {
    res.status(400).json({
      message:
        'Patch one business order item courier failed, might because courier id is invalid',
      error,
      ownerId,
      formData,
    })
  }
}

// Patch my cart payment method
export const patchMyCartPaymentMethod = async (req, res) => {
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
          paymentMethod: true,
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
  const formData = req.body

  if (isCartExist) {
    try {
      /**
       * This should not require any formData or req.body
       * But still need to check if these fields are available:
       * - shipmentAddress
       * - paymentMethod
       * Then finally:
       * - Change the status to WAITING_FOR_PAYMENT
       * - Create a payment record to be completed later
       */
      if (businessOrder.shipmentAddressId && businessOrder.paymentMethodId) {
        if (businessOrder.paymentMethod.paymentCategory === 'TRANSFER_MANUAL') {
          processTransferManual(req, res, formData, businessOrder)
        } else if (
          businessOrder.paymentMethod.paymentCategory ===
          'TRANSFER_VIRTUAL_ACCOUNT'
        ) {
          processTransferVirtualAccount(req, res, formData, businessOrder)
        } else if (
          businessOrder.paymentMethod.paymentCategory === 'CASH_ON_DELIVERY'
        ) {
          res.status(400).json({
            message: 'Process my order with Cash on Delivery failed',
          })
        } else {
          res.status(400).json({
            message: 'Process my order failed',
          })
        }
      } else {
        res.status(400).json({
          message: 'Process my order failed because fields are missing',
          ownerId,
          isCartExist,
          fields: {
            shipmentAddressId: businessOrder.shipmentAddressId,
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

const processTransferManual = async (req, res, formData, businessOrder) => {
  try {
    const billAmount = formData?.billAmount || formData?.totalCalculatedBill

    // Generate unique digits based on new value + random digits
    const randomDigits = Math.floor(Math.random() * (999 - 100) + 100)
    const amountDue = Number(billAmount) + randomDigits
    const amountString = amountDue.toString()
    const uniqueString = amountString.substring(amountString.length - 3)
    const uniqueDigits = Number(uniqueString)

    const updatedCart = await prisma.businessOrder.update({
      where: {
        id: businessOrder.id,
      },
      include: {
        paymentMethod: true,
        paymentRecord: true,
        virtualAccountNumber: true,
      },
      data: {
        status: 'WAITING_FOR_PAYMENT',
        totalItems: formData?.totalItems || 0,
        totalWeight: formData?.totalWeight || 0,
        totalPrice: formData?.totalPrice || 0,
        totalShippingCost:
          formData?.totalShippingCost || formData?.totalShipmentCost || 0,
        totalShippingDiscount: formData?.totalShippingDiscount || 0,
        totalPayment:
          formData?.totalPayment || formData?.totalCalculatedBill || 0,
        totalBillPayment: amountDue || 0,
        paymentRecord: {
          create: {
            status: 'PENDING',
            accountNumber: formData?.accountNumber || '0',
            accountHolderName: formData?.accountHolderName || 'Anonim',
            amountDue: amountDue || 0,
            uniqueDigits: uniqueDigits,
            amountPaid: 0,
            proofImages: [],
          },
        },
      },
    })

    res.status(200).json({
      message:
        'Process my order success, order is waiting for payment, payment record is pending',
      // ownerId,
      // isCartExist,
      businessOrder: updatedCart,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Process my order failed',
      error,
    })
  }
}

const processTransferVirtualAccount = async (
  req,
  res,
  formData,
  businessOrder
) => {
  if (!req.profile.phone) {
    res.status(404).json({
      message:
        'Process my order failed because user profile phone number is not found',
    })
  }

  const billAmount = formData?.billAmount || formData?.totalCalculatedBill

  const virtualAccountNumber =
    '7301' +
    req.profile.phone.substr(
      req.profile.phone.length - 12,
      req.profile.phone.length
    )

  try {
    const unpaidOrder = await prisma.virtualAccountNumber.findFirst({
      where: {
        vaNumber: virtualAccountNumber,
        bussinessOrder: {
          status: 'WAITING_FOR_PAYMENT',
        },
      },
    })

    if (unpaidOrder) throw new Error('Unpaid order found')

    try {
      const createdVirtualAccountNumber =
        await prisma.virtualAccountNumber.create({
          data: {
            vaNumber: virtualAccountNumber,
            instCode: '7301',
            ownerId: req.profile.id,
            bussinessOrderId: businessOrder.id,
          },
        })

      const updatedCart = await prisma.businessOrder.update({
        where: {
          id: businessOrder.id,
        },
        include: {
          paymentMethod: true,
          paymentRecord: true,
          virtualAccountNumber: true,
        },
        data: {
          status: 'WAITING_FOR_PAYMENT',
          totalItems: formData?.totalItems || 0,
          totalWeight: formData?.totalWeight || 0,
          totalPrice: formData?.totalPrice || 0,
          totalShippingCost:
            formData?.totalShippingCost || formData?.totalShipmentCost || 0,
          totalShippingDiscount: formData?.totalShippingDiscount || 0,
          totalPayment:
            formData?.totalPayment || formData?.totalCalculatedBill || 0,
          totalBillPayment: Number(billAmount) || 0,
          paymentRecord: {
            create: {
              status: 'PENDING',
              amountDue: Number(billAmount) || 0,
              amountPaid: 0,
            },
          },
        },
      })

      res.status(200).json({
        message:
          'Process my order with virtual account success, order is waiting for payment, payment record is pending',
        virtualAccountNumber: createdVirtualAccountNumber,
        businessOrder: updatedCart,
      })
    } catch (error) {
      res.status(500).json({
        message: 'Process my order with virtual account failed',
        error,
      })
    }
  } catch (error) {
    res.status(500).json({
      message:
        'Process my order with virtual account failed because you have unpaid order by virtual account',
      error,
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
        orderBy: { updatedAt: 'desc' },
        include: {
          owner: true,
          businessOrderItems: {
            include: {
              supplierProduct: true,
            },
          },
          shipmentAddress: true,
          paymentMethod: true,
          paymentRecord: true,
          virtualAccountNumber: true,
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
              supplierProduct: {
                include: {
                  couriers: { include: { courier: true } },
                },
              },
              courier: true,
              courierVehicle: true,
            },
          },
          shipmentAddress: true,
          paymentMethod: true,
          paymentRecord: true,
          virtualAccountNumber: true,
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

// Patch one business order status to PAID by businessOrderParam (id)
export const patchOneBusinessOrderStatusToPaid = async (req, res) => {
  const { businessOrderParam } = req.params
  const isBusinessOrderExist = req.isBusinessOrderExist
  const businessOrder = req.businessOrder

  if (isBusinessOrderExist) {
    const updatedCart = await prisma.businessOrder.update({
      where: { id: businessOrderParam },
      include: { businessOrderItems: true },
      data: { status: 'PAID' },
    })

    const updatedPaymentRecord = await prisma.paymentRecord.update({
      where: { id: businessOrder.paymentRecordId },
      data: { status: 'PAID' },
    })

    res.status(200).json({
      message: 'Patch one business order status to PAID success',
      businessOrderParam,
      isBusinessOrderExist,
      businessOrder: updatedCart,
      paymentRecord: updatedPaymentRecord,
    })
  } else {
    res.status(404).json({
      message:
        'Patch one business order status to PAID failed, because it is not found',
      businessOrderParam,
      isBusinessOrderExist,
    })
  }
}

// Patch one business order item status businessOrderItem (id)
export const patchOneBusinessOrderItemStatus = async (req, res) => {
  const { businessOrderItemId } = req.params
  const { status } = req.body

  try {
    const businessOrderItem = await prisma.businessOrderItem.findUnique({
      where: {
        id: businessOrderItemId,
      },
    })

    if (!businessOrderItem) throw new Error('Business order item not found')

    const updatedBusinessOrderItem = await prisma.businessOrderItem.update({
      where: {
        id: businessOrderItemId,
      },
      data: {
        status: status,
      },
      include: {
        supplierProduct: true,
        businessOrder: true,
      },
    })

    res.status(200).json({
      message: 'Patch one business order item status success',
      updatedBusinessOrderItem,
    })
  } catch (error) {
    res.status(404).json({
      message:
        'Patch one business order item status failed, because it is not found',
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
          paymentMethod: true,
          paymentRecord: true,
          virtualAccountNumber: true,
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
          virtualAccountNumber: true,
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
