import * as express from 'express'
import * as virtualAccount from './middleware'

const router = express.Router()

router.post('/permata/getbill', virtualAccount.getBill)
router.post('/permata/paybill', virtualAccount.payBill)
router.post('/permata/revbill', virtualAccount.revBill)

export default router
