import { prisma } from '@qopnet/util-prisma'
import { Merchant } from '@prisma/client'
import slugify from 'slugify'

export const merchantFields = {
  include: {
    owner: true,
    addresses: true,
    merchantProducts: true,
  },
}

export const getAllMerchants = async (req, res) => {
  try {
    const merchants = await prisma.merchant.findMany({ ...merchantFields })

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

export const getOneMerchant = async (req, res) => {
  const { merchantParam } = req.params

  try {
    const merchant = await prisma.merchant.findFirst({ ...merchantFields })
    console.log({ merchant })

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

export const createOneMerchant = async (req, res) => {
  res.send({
    message: 'Create one merchant',
    merchant: {},
  })
}
