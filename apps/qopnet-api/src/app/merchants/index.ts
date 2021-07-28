import * as express from 'express'

import { checkUser } from '../auth/middleware'
import { paginate } from '../root/middleware'
import * as merchant from './middleware'

const router = express.Router()

// DELETE /api/merchants
router.delete('/', checkUser, merchant.deleteAllMerchants)
// GET /api/merchants
router.get('/', paginate, merchant.getAllMerchants)
// GET /api/merchants/:merchantParam
router.get('/:merchantParam', merchant.getOneMerchant)
// POST /api/merchants
router.post('/', checkUser, merchant.createOneMerchant)

export default router
