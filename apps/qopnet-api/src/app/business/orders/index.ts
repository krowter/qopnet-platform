import * as express from 'express'

import * as root from '../../root/middleware'
import * as auth from '../../auth/middleware'
import * as businessOrder from './middleware'

const router = express.Router()

// -----------------------------------------------------------------------------
// User Only

// GET /api/business/orders/my
router.get('/my', auth.checkUser, businessOrder.getMyAllBusinessOrders)

// GET /api/business/orders/my/cart
router.get(
  '/my/cart',
  auth.checkUser,
  businessOrder.checkMyCart,
  businessOrder.autoCreateMyCart, // If isCartExist, just continue
  businessOrder.getMyCart
)

// GET /api/business/orders/items/paid/:supplierHandle
router.get(
  '/items/paid/:supplierHandle',
  auth.checkUser,
  businessOrder.getAllPaidBusinessOrderItems
)

// POST /api/business/orders/my/cart
router.post(
  '/my/cart',
  auth.checkUser,
  businessOrder.checkMyCart,
  businessOrder.createMyCart
)

// PUT /api/business/orders/my/cart
router.put(
  '/my/cart',
  auth.checkUser,
  businessOrder.checkMyCart,
  businessOrder.autoCreateMyCart, // If isCartExist, just continue
  businessOrder.updateMyCart
)

// PATCH /api/business/orders/my/cart/item
router.patch(
  '/my/cart/item',
  auth.checkUser,
  businessOrder.checkMyCart,
  businessOrder.patchMyCartItem
)

// PATCH /api/business/orders/my/cart/address
router.patch(
  '/my/cart/address',
  auth.checkUser,
  businessOrder.checkMyCart,
  businessOrder.patchMyCartAddress
)

// PATCH /api/business/orders/my/cart/courier
router.patch(
  '/my/cart/courier',
  auth.checkUser,
  businessOrder.checkMyCart,
  businessOrder.patchMyCartCourier
)

// PATCH /api/business/orders/my/cart/payment/method
// Only add PaymentMethod
router.patch(
  '/my/cart/payment/method',
  auth.checkUser,
  businessOrder.checkMyCart,
  businessOrder.patchMyCartPaymentMethod
)

// PUT /api/business/orders/my/cart/process
// Can add PaymentRecord
router.put(
  '/my/cart/process',
  auth.checkUser,
  businessOrder.checkMyCart,
  businessOrder.processMyOrder
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

// PATCH /api/business/orders/:businessOrderParam/status
router.patch(
  '/:businessOrderParam/status',
  auth.checkUser,
  businessOrder.checkOneBusinessOrder,
  businessOrder.patchOneBusinessOrderStatus
)

// PATCH /api/business/orders/:businessOrderParam/confirm
router.patch(
  '/:businessOrderParam/confirm',
  auth.checkUser,
  businessOrder.checkOneBusinessOrder,
  businessOrder.patchOneBusinessOrderStatusToPaid
)

// PATCH /api/business/orders/items/:businessOrderItemId
router.patch(
  '/items/:businessOrderItemId',
  auth.checkUser,
  businessOrder.patchOneBusinessOrderItemStatus
)

// PATCH /api/business/orders/items/:businessOrderItemId/courier
router.patch(
  '/items/:businessOrderItemId/courier',
  auth.checkUser,
  businessOrder.patchOneBusinessOrderItemCourier
)

// DELETE /api/business/orders
router.delete('/', auth.checkUser, businessOrder.deleteAllBusinessOrders)
// DELETE /api/business/orders/:businessOrderParam
router.delete(
  '/:businessOrderParam',
  auth.checkUser,
  businessOrder.deleteOneBusinessOrder
)

export default router
