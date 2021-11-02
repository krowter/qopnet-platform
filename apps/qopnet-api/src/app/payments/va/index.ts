import * as express from 'express'
import * as virtualAccount from './middleware'

const router = express.Router()

router.post('/va/permata/getbill', virtualAccount.getBill)
router.post('/va/permata/paybill', virtualAccount.payBill)
router.post('/va/permata/revbill', virtualAccount.revBill)

export default router
