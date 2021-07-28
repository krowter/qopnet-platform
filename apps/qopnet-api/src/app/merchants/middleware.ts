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
    merchant: {},
  })
}

export const addOneMerchant = (req, res) => {
  res.send({
    message: 'Add one merchant',
    merchant: {},
  })
}
