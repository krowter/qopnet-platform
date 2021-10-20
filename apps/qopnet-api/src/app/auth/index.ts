import * as express from 'express'
const router = express.Router()

import { checkUser, signIn, signOut, signUp } from './middleware'

// GET /auth/check-user
router.get('/check-user', checkUser)

// POST /auth/signup
router.post('/signup', signUp)
// POST /auth/signin
router.post('/signin', signIn)
// POST /auth/signout
router.post('/signout', signOut)

export default router
