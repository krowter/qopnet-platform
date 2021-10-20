import * as express from 'express'
const router = express.Router()

import { checkUser, signIn, signOut, signUp } from './middleware'

// POST /auth/signup
router.post('/signup', signUp)
// POST /auth/signin
router.post('/signin', signIn)
// POST /auth/signout
router.post('/signout', signOut)

// GET /auth/check-user
router.get('/check-user', checkUser, async (req, res) => {
  res.status(200).json({
    message: 'Check user success',
    user: req.user,
  })
})

export default router
