import NextLink from 'next/link'
import NextImage from 'next/image'
import { useState } from 'react'
import { Box, chakra } from '@chakra-ui/react'

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
      <NextLink href="/shop" passHref>
        <chakra.a display="block" className="next-image-container">
          <NextImage
            alt="Banner image"
            src={bannerImages[bannerIndex]}
            layout="responsive"
            width={1280}
            height={500}
          />
        </chakra.a>
      </NextLink>
    </Box>
  )
}

export const HomeFaq = () => {
  return <Box id="faq"></Box>
}
