import * as express from 'express'

import { paginate } from '../../root/middleware'

import {
  getSupplierProducts,
  getSupplierProductsByQuery,
  getSpecialSupplierProducts,
  getSupplierProductBySupplierProductParam,
} from './middleware'

const router = express.Router()

// GET /api/suppliers/products
router.get('/', paginate, getSupplierProducts)
// GET /api/suppliers/products/search?q=keyword
router.get('/search', paginate, getSupplierProductsByQuery)
// GET /api/suppliers/products/special
router.get('/special', paginate, getSpecialSupplierProducts)
// GET /api/suppliers/products/:supplierProductParam
router.get('/:supplierProductParam', getSupplierProductBySupplierProductParam)

export default router
