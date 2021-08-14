import * as express from 'express'

import * as root from '../../root/middleware'
import * as auth from '../../auth/middleware'
import * as paymentMethod from './middleware'

const router = express.Router()

// GET /api/payments/methods
router.get(
  '/',
  auth.checkUser,
  root.paginate,
  paymentMethod.getAllPaymentMethods
)

export default router
