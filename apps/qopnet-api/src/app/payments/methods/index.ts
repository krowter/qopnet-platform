import * as express from 'express'

import * as auth from '../../auth/middleware'
import * as paymentMethod from './middleware'

const router = express.Router()

// GET /api/payments/methods
router.get('/', paymentMethod.getAllPaymentMethods)

export default router
