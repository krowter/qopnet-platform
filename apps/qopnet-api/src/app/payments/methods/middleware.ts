import { prisma } from '@qopnet/util-prisma'
import { Prisma, PaymentMethod } from '@prisma/client'
import slugify from 'slugify'

// Get all payment methods
export const getAllPaymentMethods = async (req, res) => {
  try {
    const paymentMethods: PaymentMethod[] = await prisma.paymentMethod.findMany(
      {
        orderBy: {
          name: 'desc',
        },
      }
    )

    res.send({
      message: 'Get all payment methods success',
      paymentMethods,
    })
  } catch (error) {
    res.status(500).send({
      message: 'Get all payment methods failed',
      error,
    })
  }
}
