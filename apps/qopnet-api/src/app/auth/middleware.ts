import { prisma } from '@qopnet/util-prisma'
import * as jwt from 'jsonwebtoken'

export const checkUser = async (req, res, next) => {
  /**
   * Headers
   * Authorization: Bearer eyA.B.C
   * "Bearer eyA.B.C"
   */

  try {
    if (req.headers.authorization) {
      const jwtInHeader = req.headers.authorization.split(' ')[1]
      const userInJWT = jwt.decode(jwtInHeader)

      if (!userInJWT) {
        res.status(403).json({
          message: 'Check user is failed because there is no user in JWT',
        })
      } else {
        // Get user id, but not checked yet
        req.user = userInJWT // { sub: "a1b2c3-d4e5f6" }

        // Check if user actually exist by userId from token.sub
        const user = await prisma.user.findFirst({
          where: { id: req.user.sub },
          include: { profile: true },
        })
        if (!user) throw new Error('Failed to findUnique user')

        // Assign profile once get the user
        req.profile = user.profile
        next()
      }
    } else {
      res.status(400).json({
        message: 'Check user is failed because there is no JWT',
      })
    }
  } catch (error) {
    res.status(500).json({
      message:
        'Check user is failed because request is not authorized, cannot decode JWT, or user not found',
      error,
    })
  }
}
