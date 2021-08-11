import { prisma } from '@qopnet/util-prisma'
import { Prisma, Courier } from '@prisma/client'
import slugify from 'slugify'

// Get all couriers
export const getAllCouriers = async (req, res) => {
  try {
    const couriers: Courier[] = await prisma.courier.findMany()

    res.send({
      message: 'Get all couriers success',
      couriers,
    })
  } catch (error) {
    res.status(500).send({
      message: 'Get all couriers failed',
      error,
    })
  }
}
