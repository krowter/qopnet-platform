import { prisma } from '@qopnet/util-prisma'
import { Merchant } from '@prisma/client'
import slugify from 'slugify'

// Specify merchant fields for Prisma
export const merchantFields = {
  include: {
    owner: true,
    addresses: true,
    merchantProducts: true,
  },
}

// Get all merchants
export const getAllMerchants = async (req, res) => {
  try {
    const merchants: Partial<Merchant>[] = await prisma.merchant.findMany({
      ...merchantFields,
    })

    res.send({
      message: 'Get all merchants success',
      merchants,
    })
  } catch (error) {
    res.status(500).send({
      message: 'Get all merchants failed',
      error,
    })
  }
}

// Get one merchant
export const getOneMerchant = async (req, res) => {
  const { merchantParam } = req.params

  try {
    const merchant: Partial<Merchant> = await prisma.merchant.findFirst({
      where: { handle: merchantParam },
      ...merchantFields,
    })

    res.send({
      message: 'Get one merchant success',
      merchantParam,
      merchant,
    })
  } catch (error) {
    res.status(500).send({
      message: 'Get one merchants failed',
      merchantParam,
      error,
    })
  }
}

// Create one merchant
export const createOneMerchant = async (req, res) => {
  const profileId = req.profile.id
  const formData = req.body

  try {
    const payloadData = {
      name: formData?.name,
      handle:
        formData?.handle?.toLowerCase() ||
        slugify(formData?.name, { replacement: '', lower: true, strict: true }),
      avatarUrl: formData?.avatarUrl,
      phone: formData?.phone,
      email: formData?.email,
      ownerId: profileId,
      addresses: { create: [formData?.address] },
    }

    const createdMerchant: Partial<Merchant> = await prisma.merchant.create({
      data: payloadData,
      include: { owner: true, addresses: true, merchantProducts: true },
    })

    res.json({
      message: 'Create new merchant success',
      merchant: createdMerchant,
    })
  } catch (error) {
    if (error.code === 'P2002') {
      res.status(400).json({
        message:
          'Create new merchant failed because name/handle need to be unique',
        name: formData?.name,
        handle: formData?.handle,
        error,
      })
    } else if (error.code === 'P2011') {
      res.status(400).json({
        message:
          'Create new merchant failed because some fields cannot be empty',
        field: error.meta.constraint,
        error,
      })
    } else {
      res.status(500).json({
        message: 'Create new merchant failed because unknown error',
        error,
      })
    }
  }
}

// Delete all merchants
export const deleteAllMerchants = async (req, res) => {
  try {
    const result = await prisma.merchant.deleteMany()
    res.send({ message: 'Delete all merchants success', result })
  } catch (error) {
    res.status(500).send({ message: 'Delete all merchants failed', error })
  }
}

// Delete one merchant
export const deleteOneMerchant = async (req, res) => {
  const { merchantParam } = req.params
  const ownerId = req.profile.id

  try {
    const foundMerchant: Partial<Merchant> = await prisma.merchant.findFirst({
      where: { handle: merchantParam, ownerId },
    })
    if (!foundMerchant) throw 'Delete one merchant not found or not allowed'
    const deletedMerchant: Partial<Merchant> = await prisma.merchant.delete({
      where: { handle: merchantParam },
    })

    res.send({
      message: 'Delete one merchant success',
      merchantParam,
      ownerId,
      foundMerchant,
      deletedMerchant,
    })
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).send({
        message: 'Delete one merchant failed because it does not exist',
        merchantParam,
        ownerId,
        error,
      })
    } else {
      res.status(500).send({
        message: 'Delete one merchant failed',
        merchantParam,
        ownerId,
        error,
      })
    }
  }
}
