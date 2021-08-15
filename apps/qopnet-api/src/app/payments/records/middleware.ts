import { prisma } from '@qopnet/util-prisma'
import { Prisma, PaymentRecord } from '@prisma/client'
import slugify from 'slugify'

// Get all payment records
export const getAllPaymentRecords = async (req, res) => {
  try {
    const paymentRecords: PaymentRecord[] = await prisma.paymentRecord.findMany(
      {
        include: {
          paymentMethod: true,
        },
      }
    )

    res.send({
      message: 'Get all payment records success',
      paymentRecords,
    })
  } catch (error) {
    res.status(500).send({
      message: 'Get all payment records failed',
      error,
    })
  }
}
