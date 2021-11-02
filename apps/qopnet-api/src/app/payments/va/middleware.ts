export const getBill = async (req, res) => {
  const requestSample = {
    GetBillRq: {
      INSTCODE: '7301',
      VI_VANUMBER: '7301123456789012',
      VI_TRACENO: '000001',
      VI_TRNDATE: '2021-09-13T14:00:00+07:00',
      VI_DELCHANNEL: '099',
    },
  }

  try {
    const customerName = 'JOKO WIDODO'
    const billAmount = '10000.00'

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
  try {
    res.send({
      message: '',
    })
  } catch (error) {
    res.status(500).send({
      message: '',
      error,
    })
  }
}

export const revBill = async (req, res) => {
  try {
    res.send({
      message: '',
    })
  } catch (error) {
    res.status(500).send({
      message: '',
      error,
    })
  }
}
