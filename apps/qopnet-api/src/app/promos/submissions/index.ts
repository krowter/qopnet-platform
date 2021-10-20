import * as express from 'express'
import { paginate } from '../../root/middleware'
import * as promoSubmission from './middleware'
import { checkUser } from '../../auth/middleware'

const router = express.Router()

// GET /api/promo/submissions
router.get('/', paginate, promoSubmission.getAllSubmissions)

// POST /api/promo/submissions
router.post('/', checkUser, promoSubmission.createOneSubmission)

export default router