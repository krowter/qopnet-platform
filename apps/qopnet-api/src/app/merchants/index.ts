import * as express from 'express'

import { checkUser } from '../auth/middleware'
import { paginate } from '../root/middleware'
import { getAllMerchants, getOneMerchant, addOneMerchant } from './middleware'

const router = express.Router()

// GET /api/merchants
router.get('/merchants', checkUser, paginate, getAllMerchants)
// GET /api/merchants/:merchantParam
router.get('/merchants/:merchantParam', checkUser, getOneMerchant)
// POST /api/merchants
router.post('/merchants', checkUser, addOneMerchant)

export default router
