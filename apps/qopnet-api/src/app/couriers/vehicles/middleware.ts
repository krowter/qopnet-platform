import { prisma } from '@qopnet/util-prisma'
import { Prisma, CourierVehicle } from '@prisma/client'
import slugify from 'slugify'

// Get all couriers
export const getAllCourierVehicles = async (req, res) => {
  try {
    const courierVehicles: CourierVehicle[] =
      await prisma.courierVehicle.findMany({
        include: { courier: true },
        orderBy: { updatedAt: 'desc' },
      })

    res.send({
      message: 'Get all courier vehicles success',
      courierVehicles,
    })
  } catch (error) {
    res.status(500).send({
      message: 'Get all courier vehicles failed',
      error,
    })
  }
}
