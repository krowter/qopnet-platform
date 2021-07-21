import NextLink from 'next/link'
import NextImage from 'next/image'
import { chakra, Box, Heading } from '@chakra-ui/react'

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

/* eslint-disable-next-line */
export interface HomeBannerProps {
  id?: string | ''
}

export function HomeBanner(props: HomeBannerProps) {
  return (
    <Box id={props.id}>
      <HomeBannerCarousel />
    </Box>
  )
}

const carouselResponsive = {
  superLargeDesktop: { items: 1, breakpoint: { max: 4000, min: 3000 } },
  desktop: { items: 1, breakpoint: { max: 3000, min: 1024 } },
  tablet: { items: 1, breakpoint: { max: 1024, min: 464 } },
  mobile: { items: 1, breakpoint: { max: 464, min: 0 } },
}

const carouselBannerImages = [
  'https://ik.imagekit.io/qopnetlabs/banners/qopnet-25-percent-discount.jpg?updatedAt=1626892509930',
  'https://ik.imagekit.io/qopnetlabs/banners/qopnet-dream-bed.jpg?updatedAt=1626892510466',
  'https://ik.imagekit.io/qopnetlabs/banners/qopnet-eid-adha.jpg?updatedAt=1626892511418',
]

export const HomeBannerCarousel = () => {
  return (
    <Carousel responsive={carouselResponsive}>
      {carouselBannerImages.map((banner, index) => {
        return (
          <NextLink href="/shop" passHref>
            <chakra.a>
              <NextImage
                key={index}
                alt="Gambar banner promosi"
                src={carouselBannerImages[index]}
                layout="responsive"
                width={1400}
                height={670}
              />
            </chakra.a>
          </NextLink>
        )
      })}
    </Carousel>
  )
}

export const HomeFaq = () => {
  return (
    <Box id="faq">
      <Heading>FAQ</Heading>
    </Box>
  )
}
