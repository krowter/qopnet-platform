import * as express from 'express'

import { checkUser } from '../auth/middleware'
import { paginate } from '../root/middleware'
import {
  getAllMerchants,
  getOneMerchant,
  createOneMerchant,
} from './middleware'

const router = express.Router()

// GET /api/merchants
router.get('/', checkUser, paginate, getAllMerchants)
// GET /api/merchants/:merchantParam
router.get('/:merchantParam', checkUser, getOneMerchant)
// POST /api/merchants
router.post('/', checkUser, createOneMerchant)

export default router
