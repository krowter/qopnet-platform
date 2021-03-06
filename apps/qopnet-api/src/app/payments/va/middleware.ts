import { prisma } from '@qopnet/util-prisma'

export const getBill = async (req, res) => {
  const formData = req.body.GetBillRq

  try {
    await prisma.virtualAccountPermataLog.create({
      data: {
        requestObject: {
          body: req.body,
          headers: req.headers,
        },
      },
    })

    const vaNumber = await prisma.virtualAccountNumber.findFirst({
      where: {
        vaNumber: formData['VI_VANUMBER'],
        bussinessOrder: {
          status: 'WAITING_FOR_PAYMENT',
        },
      },
      include: {
        owner: true,
        bussinessOrder: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    })

    const customerName = vaNumber.owner.name.toUpperCase()
    const billAmount = vaNumber.bussinessOrder.totalBillPayment + '.00'

    res.send({
      GetBillRs: {
        CUSTNAME: `QOPNET ${customerName}`,
        BILL_AMOUNT: billAmount,
        VI_CCY: '360',
        RefInfo: [
          { RefName: 'BillPeriod', RefValue: '02' },
          { RefName: 'BillLateCharges', RefValue: '0' },
        ],
        STATUS: '00',
      },
    })
  } catch (error) {
    res.status(500).send({
      GetBillRs: {
        CUSTNAME: '',
        BILL_AMOUNT: '',
        VI_CCY: '360',
        RefInfo: [
          { RefName: 'BillPeriod', RefValue: '' },
          { RefName: 'BillLateCharges', RefValue: '' },
        ],
        STATUS: '14',
      },
    })
  }
}

export const payBill = async (req, res) => {
  const formData = req.body.PayBillRq

  try {
    await prisma.virtualAccountPermataLog.create({
      data: {
        requestObject: {
          body: req.body,
          headers: req.headers,
        },
      },
    })

    const vaNumber = await prisma.virtualAccountNumber.findFirst({
      where: {
        vaNumber: formData['VI_VANUMBER'],
        bussinessOrder: {
          totalBillPayment: formData['BILL_AMOUNT'],
          status: 'WAITING_FOR_PAYMENT',
        },
      },
      include: {
        bussinessOrder: true,
      },
    })

    await prisma.businessOrder.update({
      where: {
        id: vaNumber.bussinessOrderId,
      },
      data: {
        status: 'PAID',
      },
    })

    await prisma.paymentRecord.update({
      where: {
        id: vaNumber.bussinessOrder.paymentRecordId,
      },
      data: {
        status: 'PAID',
      },
    })

    res.send({
      PayBillRs: {
        STATUS: '00',
      },
    })
  } catch (error) {
    res.status(500).send({
      PayBillRs: {
        STATUS: '96',
      },
    })
  }
}

export const revBill = async (req, res) => {
  const formData = req.body.RevBillRq

  try {
    await prisma.virtualAccountPermataLog.create({
      data: {
        requestObject: {
          body: req.body,
          headers: req.headers,
        },
      },
    })

    const vaNumber = await prisma.virtualAccountNumber.findFirst({
      where: {
        vaNumber: formData['VI_VANUMBER'],
        bussinessOrder: {
          totalBillPayment: formData['BILL_AMOUNT'],
          status: 'WAITING_FOR_PAYMENT',
        },
      },
      include: {
        bussinessOrder: true,
      },
    })

    await prisma.businessOrder.update({
      where: {
        id: vaNumber.bussinessOrderId,
      },
      data: {
        status: 'REFUNDED',
      },
    })

    await prisma.paymentRecord.update({
      where: {
        id: vaNumber.bussinessOrder.paymentRecordId,
      },
      data: {
        status: 'CANCELLED',
      },
    })

    res.send({
      PayBillRs: {
        STATUS: '00',
      },
    })
  } catch (error) {
    res.status(500).send({
      PayBillRs: {
        STATUS: '96',
      },
    })
  }
}
