import { prisma } from '@qopnet/util-prisma'
import { Prisma, PromoSubmission } from '@prisma/client'

export const PromoSubmissionFields = {
  include: {},
}

export const getAllSubmissions = async (req, res) => {
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

// Create one submission
export const createOneSubmission = async (req, res) => {
  const profileId = req.profile.id
  const formData = req.body

  try {
    const payloadData = {
      name: formData?.name,
      phone: formData?.phone,
      email: formData?.email,
      birthPlace: formData?.birthPlace,
      birthDate: formData?.birthDate,
      nationalId: formData?.nationalId,

      street: formData?.street,
      streetDetails: formData?.streetDetails,
      city: formData?.city,
      state: formData?.state,
      zip: formData?.zip,

      status: formData?.status,

      providerId: formData?.providerId
    }

    const createdPromoSubmission: Partial<PromoSubmission> = await prisma.promoSubmission.create({
      data: payloadData
    })

    res.json({
      message: 'Create new promo submission success',
      merchant: createdPromoSubmission,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Create new promo submission failed because unknown error',
      error,
    })
  }
}