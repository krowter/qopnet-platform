import * as express from 'express'

import { checkUser } from '../../auth/middleware'
import { paginate } from '../../root/middleware'
import * as businessOrder from './middleware'

const router = express.Router()

// GET /api/business/orders
router.get('/', paginate, businessOrder.getAllBusinessOrders)
// GET /api/business/orders/:businessOrderParam
router.get('/:businessOrderParam', businessOrder.getOneBusinessOrder)

// POST /api/business/orders
router.post('/', checkUser, businessOrder.createOneBusinessOrder)

// PUT /api/business/orders/:businessOrderId
router.put('/', checkUser, businessOrder.updateOneBusinessOrder)

// DELETE /api/business/orders
router.delete('/', checkUser, businessOrder.deleteAllBusinessOrders)
// DELETE /api/business/orders/:businessOrderParam
router.delete(
  '/:businessOrderParam',
  checkUser,
  businessOrder.deleteOneBusinessOrder
)

export default router
