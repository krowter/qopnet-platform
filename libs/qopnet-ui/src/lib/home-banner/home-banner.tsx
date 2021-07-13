import { useState } from 'react'
import NextImage from 'next/image'
import { Box } from '@chakra-ui/react'

const bannerImages = [
  'https://ik.imagekit.io/qopnetlabs/banners/qopnet-banner-1_cWUHg0qnmC.jpeg',
  'https://ik.imagekit.io/qopnetlabs/banners/qopnet-banner-2_3gw8N_LGz.jpeg',
  'https://ik.imagekit.io/qopnetlabs/banners/sayurbox-banner-1_zmuPmEIft.jpeg',
  'https://ik.imagekit.io/qopnetlabs/banners/sayurbox-banner-2_mIAiacsCXI.jpeg',
]

/* eslint-disable-next-line */
export interface HomeBannerProps {
  id?: string | ''
}

export function HomeBanner(props: HomeBannerProps) {
  const randomNumber = Math.floor(Math.random() * 3)
  const [bannerIndex, setBannerIndex] = useState(randomNumber)

  return (
    <Box id={props.id}>
      <NextImage
        alt="Banner image"
        src={bannerImages[bannerIndex]}
        layout="responsive"
        width={1280}
        height={500}
      />
    </Box>
  )
}

export default HomeBanner
