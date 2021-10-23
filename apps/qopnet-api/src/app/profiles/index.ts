import * as express from 'express'
const router = express.Router()

import { checkUser } from '../auth/middleware'
import {
  getMyProfile,
  getAllProfiles,
  createProfile,
  updateMyProfile,
} from './middleware'

// GET /api/profiles/my
router.get('/my', checkUser, getMyProfile)
// GET /api/profiles
router.get('/', getAllProfiles)

// POST /api/profiles
router.post('/', checkUser, createProfile)

// PUT /api/profiles/my
router.put('/my', checkUser, updateMyProfile)

export default router
