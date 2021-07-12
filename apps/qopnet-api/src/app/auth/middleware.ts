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
        res.status(403).json({ message: 'Failed to check user and decode JWT' })
      } else {
        req.user = userInJWT // { sub: "a1b2c3-d4e5f6" }
        next()
      }
    } else {
      res.status(400).json({
        message: 'Failed to check user because there is no JWT',
      })
    }
  } catch (error) {
    res.status(500).json({
      message: 'Failed to check user and decode JWT',
      error,
    })
  }
}
