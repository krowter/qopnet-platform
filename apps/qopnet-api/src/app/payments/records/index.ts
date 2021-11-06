import * as express from 'express'

import * as root from '../../root/middleware'
import * as auth from '../../auth/middleware'
import * as paymentRecord from './middleware'

const router = express.Router()

// GET /api/payments/records
router.get(
  '/',
  auth.checkUser,
  root.paginate,
  paymentRecord.getAllPaymentRecords
)

// PATCH /api/payments/records/proof
router.patch('/proof', auth.checkUser, paymentRecord.updatePaymentProofImages)

export default router
