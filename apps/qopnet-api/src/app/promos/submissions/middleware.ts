import { prisma } from '@qopnet/util-prisma'
import { Prisma, PromoSubmission } from '@prisma/client'

export const PromoSubmissionFields = {
  include: {},
}

export const getAllSubmissions = async (req, res) => {
  const employerId = req.params.employerId
  try {
    const PromoSubmissions: Partial<PromoSubmission>[] =
      await prisma.promoSubmission.findMany({
        where: {
        },
        skip: req.skip,
        take: req.take,
      })

    res.send({
      message: 'Get all promo submission success',
      PromoSubmissions,
    })
  } catch (error) {
    res.status(500).send({
      message: 'Get all promo submission failed',
      error,
    })
  }
}

