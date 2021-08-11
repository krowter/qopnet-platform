import { prisma } from '@qopnet/util-prisma'
import { Prisma, Address } from '@prisma/client'
import slugify from 'slugify'

// Get all addresss
export const getAllAddresses = async (req, res) => {
  try {
    const addresss: Address[] = await prisma.address.findMany()

    res.send({
      message: 'Get all addresses success',
      addresss,
    })
  } catch (error) {
    res.status(500).send({
      message: 'Get all addresses failed',
      error,
    })
  }
}
