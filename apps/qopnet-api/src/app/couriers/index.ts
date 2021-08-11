import * as express from 'express'

import * as root from '../root/middleware'
import * as auth from '../auth/middleware'
import * as courier from './middleware'

const router = express.Router()

// GET /api/couriers
router.get('/', auth.checkUser, root.paginate, courier.getAllCouriers)

export default router
