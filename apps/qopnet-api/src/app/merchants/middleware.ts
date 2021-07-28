import { SupplierProduct, Supplier } from '@prisma/client'
import { prisma } from '@qopnet/util-prisma'
import slugify from 'slugify'

export const getAllMerchants = (req, res) => {
  res.send({
    message: 'Get all merchants',
    merchants: [],
  })
}

export const getOneMerchant = (req, res) => {
  res.send({
    message: 'Get one merchant',
    merchantParam: req.params.merchantParam,
    merchant: {},
  })
}

export const createOneMerchant = (req, res) => {
  res.send({
    message: 'Create one merchant',
    merchant: {},
  })
}
