import { prisma } from '@qopnet/util-prisma'
import { Prisma, PromoEmployee, PromoEmployer } from '@prisma/client'

export const promoEmployeeFields = {
  include: {},
}

export const getAllEmployeesByEmployerId = async (req, res) => {
  const employerId = req.params.employerId
  try {
    const promoEmployees: Partial<PromoEmployee>[] =
      await prisma.promoEmployee.findMany({
        where: {
          employerId,
        },
        orderBy: [{ order: 'asc' }],
        skip: req.skip,
        take: req.take,
      })

    res.send({
      message: 'Get all promo employee success',
      promoEmployees,
    })
  } catch (error) {
    res.status(500).send({
      message: 'Get all promo employee failed',
      error,
    })
  }
}

export const getEmployeeByEmployeeId = async (req, res) => {
  const employerId = req.params.employerId
  const employeeId = req.params.employeeId
  try {
    const promoEmployee: Partial<PromoEmployee> =
      await prisma.promoEmployee.findFirst({
        where: {
          employerId,
          employeeId,
        },
      })

    res.send({
      message: 'Get promo employee details success',
      promoEmployee,
    })
  } catch (error) {
    res.status(500).send({
      message: 'Get promo employee details failed',
      error,
    })
  }
}
