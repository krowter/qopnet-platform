import * as express from 'express'
import { paginate } from '../../root/middleware'
import * as promoSubmission from './middleware'

const router = express.Router()

// GET /api/promo/submissions
router.get('/', paginate, promoSubmission.getAllSubmissions)

export default router