import NextLink from 'next/link'
import NextImage from 'next/image'
import { useState } from 'react'
import { Box, AspectRatio, chakra } from '@chakra-ui/react'

const bannerImages = [
  'https://ik.imagekit.io/qopnetlabs/banners/qopnet-25-percent-discount.jpg?updatedAt=1626892509930',
  'https://ik.imagekit.io/qopnetlabs/banners/qopnet-dream-bed.jpg?updatedAt=1626892510466',
  'https://ik.imagekit.io/qopnetlabs/banners/qopnet-eid-adha.jpg?updatedAt=1626892511418',
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
            alt="Gambar banner promosi"
            src={bannerImages[bannerIndex]}
            layout="responsive"
            width={1400}
            height={670}
          />
        </chakra.a>
      </NextLink>
    </Box>
  )
}

export const HomeFaq = () => {
  return <Box id="faq"></Box>
}
