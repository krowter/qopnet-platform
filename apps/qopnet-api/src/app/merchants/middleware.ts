import { prisma } from '@qopnet/util-prisma'
import { Prisma, Merchant, MerchantProduct, Address } from '@prisma/client'
import slugify from 'slugify'

// Specify merchant fields for Prisma
export const merchantFields = {
  include: {
    owner: true,
    addresses: true,
    merchantProducts: true,
  },
}

// Delete all merchants
export const deleteAllMerchants = async (req, res) => {
  try {
    const result = await prisma.merchant.deleteMany()
    res.send({ message: 'Delete all merchants', result })
  } catch (error) {
    res.status(500).send({ message: 'Delete all merchants failed', error })
  }
}

// Get all merchants
export const getAllMerchants = async (req, res) => {
  try {
    const merchants: Partial<Merchant>[] = await prisma.merchant.findMany({
      ...merchantFields,
    })

    res.send({
      message: 'Get all merchants',
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
      message: 'Get one merchant',
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
      message: 'Create new merchant',
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
