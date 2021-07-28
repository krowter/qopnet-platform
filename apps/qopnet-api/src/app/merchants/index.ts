import * as express from 'express'

import { checkUser } from '../auth/middleware'
import { paginate } from '../root/middleware'
import * as merchant from './middleware'

const router = express.Router()

// GET /api/merchants
router.get('/', paginate, merchant.getAllMerchants)
// GET /api/merchants/:merchantParam
router.get('/:merchantParam', merchant.getOneMerchant)

// POST /api/merchants
router.post('/', checkUser, merchant.createOneMerchant)

// DELETE /api/merchants
router.delete('/', checkUser, merchant.deleteAllMerchants)
// DELETE /api/merchants/:merchantParam
router.delete('/:merchantParam', checkUser, merchant.deleteOneMerchant)

export default router
