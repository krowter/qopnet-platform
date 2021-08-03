import * as express from 'express'

import * as root from '../../root/middleware'
import * as auth from '../../auth/middleware'
import * as businessOrder from './middleware'

const router = express.Router()

// GET /api/business/orders
router.get('/', root.paginate, businessOrder.getAllBusinessOrders)
// GET /api/business/orders/:businessOrderParam
router.get('/:businessOrderParam', businessOrder.getOneBusinessOrder)

// GET /api/business/orders/check
router.get('/', businessOrder.checkExistingBusinessOrder)

// POST /api/business/orders
router.post(
  '/',
  auth.checkUser,
  businessOrder.checkExistingBusinessOrder,
  businessOrder.createOneBusinessOrder
)

// PUT /api/business/orders/:businessOrderId
router.put('/', auth.checkUser, businessOrder.updateOneBusinessOrder)

// DELETE /api/business/orders
router.delete('/', auth.checkUser, businessOrder.deleteAllBusinessOrders)
// DELETE /api/business/orders/:businessOrderParam
router.delete(
  '/:businessOrderParam',
  auth.checkUser,
  businessOrder.deleteOneBusinessOrder
)

export default router
