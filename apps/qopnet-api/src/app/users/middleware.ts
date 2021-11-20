import { prisma } from '@qopnet/util-prisma'

// Get all Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({ orderBy: { updatedAt: 'desc' } })

    res.status(200).json({
      message: 'Get all users success',
      users,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Get all users failed',
      error,
    })
  }
}

// Get user by userId
export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params
    const user = await prisma.user.findFirst({ where: { id: userId } })

    if (user) {
      res.status(200).json({
        message: 'Get user success',
        userId,
        user,
      })
    } else {
      res.status(404).json({
        message: 'User not found',
        userId,
      })
    }
  } catch (error) {
    res.status(500).json({
      message: 'Get user failed',
      error,
    })
  }
}
