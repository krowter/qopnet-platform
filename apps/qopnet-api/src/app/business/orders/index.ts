import * as express from 'express'

import * as root from '../../root/middleware'
import * as auth from '../../auth/middleware'
import * as businessOrder from './middleware'

const router = express.Router()

// -----------------------------------------------------------------------------
// User Only

// GET /api/business/orders/my | GET /api/profiles/my/orders
router.get('/my', auth.checkUser, businessOrder.getMyAllBusinessOrders)
// GET /api/business/orders/my/cart | GET /api/profiles/my/cart
router.get(
  '/my/cart',
  auth.checkUser,
  businessOrder.checkMyCart,
  businessOrder.getMyCart
)
// POST /api/business/orders/my
router.post(
  '/my',
  auth.checkUser,
  businessOrder.checkMyCart,
  businessOrder.createMyCart
)

// -----------------------------------------------------------------------------
// Admin Only

// GET /api/business/orders
router.get('/', root.paginate, businessOrder.getAllBusinessOrders)
// GET /api/business/orders/:businessOrderParam
router.get('/:businessOrderParam', businessOrder.getOneBusinessOrder)
// POST /api/business/orders
router.post('/', auth.checkUser, businessOrder.createOneBusinessOrder)

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
