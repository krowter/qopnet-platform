import * as express from 'express'

import * as root from '../root/middleware'
import * as auth from '../auth/middleware'
import * as address from './middleware'

const router = express.Router()

// GET /api/addresses
router.get('/', auth.checkUser, root.paginate, address.getAllAddresses)

export default router
