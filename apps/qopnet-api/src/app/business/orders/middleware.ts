import { prisma } from '@qopnet/util-prisma'
import { Prisma, BusinessOrder, Address } from '@prisma/client'

// Specify businessOrder fields for Prisma
export const businessOrderFields = {
  include: {
    owner: true,
    businessOrderItems: true,
    shipmentAddress: true,
    payment: true,
  },
}

// Get all business orders
export const getAllBusinessOrders = async (req, res) => {
  try {
    const businessOrders: Partial<BusinessOrder>[] =
      await prisma.businessOrder.findMany({
        ...businessOrderFields,
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
        ...businessOrderFields,
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
  const profileId = req.profile.id
  const formData = req.body

  try {
    const payloadData = {
      ownerId: profileId,
    }

    const createdBusinessOrder: Partial<BusinessOrder> =
      await prisma.businessOrder.create({
        data: payloadData,
        include: {
          owner: true,
          shipmentAddress: true,
          businessOrderItems: true,
        },
      })

    res.json({
      message: 'Create new businessOrder success',
      businessOrder: createdBusinessOrder,
    })
  } catch (error) {
    if (error.code === 'P2002') {
      res.status(400).json({
        message:
          'Create new businessOrder failed because name/handle need to be unique',
        name: formData?.name,
        handle: formData?.handle,
        error,
      })
    } else if (error.code === 'P2011') {
      res.status(400).json({
        message:
          'Create new businessOrder failed because some fields cannot be empty',
        field: error.meta.constraint,
        error,
      })
    } else {
      res.status(500).json({
        message: 'Create new businessOrder failed because unknown error',
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
