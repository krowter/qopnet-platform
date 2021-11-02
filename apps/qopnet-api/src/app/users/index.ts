import * as express from 'express'
const router = express.Router()

import { checkUser } from '../auth/middleware'
import { getAllUsers, getUserById } from './middleware'

// GET /api/users
router.get('/', checkUser, getAllUsers)
// GET /api/users/:userId
router.get('/:userId', checkUser, getUserById)

export default router
