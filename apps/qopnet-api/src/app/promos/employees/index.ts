import * as express from 'express'
import { paginate } from '../../root/middleware'
import * as promoEmployee from './middleware'

const router = express.Router()

// GET /api/promo/employee/:employerId
router.get('/:employerId', paginate, promoEmployee.getAllEmployeesByEmployerId)

// GET /api/promo/employee/:employerId/:employeeId
router.get('/:employerId/:employeeId', promoEmployee.getEmployeeByEmployeeId)

export default router