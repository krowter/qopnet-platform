import * as express from 'express'

import { checkUser } from '../auth/middleware'
import { paginate } from '../root/middleware'

import {
  getAllSuppliers,
  getSupplierByHandle,
  getSupplierProductBySupplierParam,
  getSupplierProductsBySearchQuery,
  getSupplierProductsBySupplierId,
  getSupplierProductsBySupplierParam,
  createSupplier,
  createSupplierProduct,
} from './middleware'

const router = express.Router()

// GET /api/suppliers
router.get('/', paginate, getAllSuppliers)
// GET /api/suppliers/:supplierParam
router.get('/:supplierParam', getSupplierByHandle)
// GET /api/suppliers/:supplierParam/products
router.get('/:supplierParam/products', getSupplierProductsBySupplierId)
router.get('/:supplierParam/products', getSupplierProductsBySupplierParam)
// GET /api/suppliers/:supplierParam/search?q=keyword
router.get('/:supplierParam/search', paginate, getSupplierProductsBySearchQuery)
// GET /api/suppliers/:supplierParam/products/:supplierProductParam
//prettier-ignore
router.get('/:supplierParam/products/:supplierProductParam', getSupplierProductBySupplierParam)

// POST /api/suppliers
router.post('/', checkUser, createSupplier)
// POST /api/suppliers/:supplierParam/products
router.post('/:supplierParam/products', checkUser, createSupplierProduct)

export default router
