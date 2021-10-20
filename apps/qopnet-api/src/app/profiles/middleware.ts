import { prisma } from '@qopnet/util-prisma'

// Get my profile
export const getMyProfile = async (req, res) => {
  try {
    const profile = await prisma.profile.findFirst({
      where: { userId: req.user.sub },
      include: {
        user: true,
        addresses: true,
        suppliers: { include: { addresses: true } },
        wholesalers: { include: { addresses: true } },
        merchants: { include: { addresses: true } },
      },
    })

    res.status(200).json({
      message: 'Get my profile success',
      profile,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Get my profile failed',
      error,
    })
  }
}

// Get all profiles
export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await prisma.profile.findMany({
      include: { user: true },
    })
    res.status(200).json({
      message: 'Get all profiles success',
      profiles,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Get all profiles failed',
      error,
    })
  }
}

// Create user profile
export const createProfile = async (req, res) => {
  const userId = req.user.sub
  const profile = req.body

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
      // Just to check whether the user already had a profile too
    })

    if (!user) throw new Error('User not found')

    // Check if profile for a user already exist
    // by profile.userId, not profile.handle
    try {
      const existingProfile = await prisma.profile.findFirst({
        where: { userId },
      })

      if (existingProfile) throw new Error('Profile already exist')

      /**
       * Manually arrange the profile data,
       * Don't use ...spread because it contains address object, not array
       */
      const payloadData = {
        name: profile.name,
        handle: profile.handle,
        phone: profile.phone,
        userId,
        addresses: { create: [profile.address] },
      }

      /**
       * Continue to create profile if there is no existing profile
       * Also with address
       */
      const newProfile = await prisma.profile.create({
        data: payloadData,
        include: { addresses: true },
      })

      res.status(200).json({
        message: 'Create new user profile',
        userId,
        profile: newProfile,
      })
    } catch (error) {
      res.status(409).json({
        message: 'Create new user profile failed because profile already exist',
        user: req.user,
        error,
      })
    }
  } catch (error) {
    res.status(404).json({
      message: 'Create new user profile failed because user not found',
      userId,
      error,
    })
  }
}

// Update my profile
export const updateMyProfile = async (req, res) => {
  const userId = req.user.sub
  const newProfile = req.body

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: { include: { addresses: true } } },
    })

    if (!user) throw new Error('User not found')

    try {
      /**
       * Manually arrange the profile data,
       */
      const payloadData = {
        name: newProfile.name,
        handle: newProfile.handle,
        phone: newProfile.phone,
        userId,
        addresses: {
          update: {
            where: { id: user.profile.addresses[0].id },
            data: newProfile.address,
          },
        },
      }

      /**
       * Continue to update profile if username no changes or no existing username
       * Also with address
       */
      const updatedProfile = await prisma.profile.update({
        where: { userId },
        data: payloadData,
      })

      res.status(200).json({
        message: 'Update user profile success',
        userId,
        profile: updatedProfile,
      })
    } catch (error) {
      res.status(409).json({
        message: 'Update user profile failed because username already exist',
        user: req.user,
        error,
      })
    }
  } catch (error) {
    res.status(404).json({
      message: 'Update user profile failed because user not found',
      userId,
      error,
    })
  }
}
