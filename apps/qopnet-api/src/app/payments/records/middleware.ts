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

export const updatePaymentProofImages = async (req, res) => {
  const formData = req.body

  try {
    const payment: PaymentRecord = await prisma.paymentRecord.findUnique({
      where: {
        id: formData.id,
      },
    })

    if (!payment) throw new Error('Payment not found')

    try {
      const updatedPaymentRecord: PaymentRecord =
        await prisma.paymentRecord.update({
          where: {
            id: formData.id,
          },
          data: {
            proofImages: formData.proofImages,
          },
        })

      res.status(200).json({
        message: 'Update payment proof images success',
        formData,
        paymentRecords: updatedPaymentRecord,
      })
    } catch (error) {
      res.status(500).json({
        message: 'Update payment proof images failed',
        error,
        formData,
      })
    }
  } catch (error) {
    res.status(404).json({
      message: 'Update payment proof images failed because payment not found',
      error,
      formData,
    })
  }
}
