import NextLink from 'next/link'
import NextImage from 'next/image'
import {
  chakra,
  Box,
  Heading,
  Stack,
  VStack,
  Text,
  SimpleGrid,
} from '@chakra-ui/react'

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

/* eslint-disable-next-line */
export interface HomeBannerProps {}

export function HomeBanner(props: HomeBannerProps) {
  // Can be changed to other carousel system
  return <HomeBannerCarousel />
}

export const carouselResponsive = {
  superLargeDesktop: { items: 1, breakpoint: { max: 4000, min: 3000 } },
  desktop: { items: 1, breakpoint: { max: 3000, min: 1024 } },
  tablet: { items: 1, breakpoint: { max: 1024, min: 464 } },
  mobile: { items: 1, breakpoint: { max: 464, min: 0 } },
}

// Hardcode for now
export const carouselBannerImages = [
  'https://ik.imagekit.io/qopnetlabs/banners/qopnet-25-percent-discount.jpg?updatedAt=1627324141941',
  'https://ik.imagekit.io/qopnetlabs/banners/qopnet-dream-bed.jpg?updatedAt=1627324142848',
  'https://ik.imagekit.io/qopnetlabs/banners/qopnet-eid-adha.jpg?updatedAt=1626892511418',
]

// Hardcode for now
export const testimonials = [
  {
    text: 'Qopnet sangat membantu saya dalam perdagangan yang selama ini saya jalankan menggunakan toko offline. Terima kasih Qopnet!',
    author: 'Irfan',
    affiliation: 'Pedagang Pasar Induk Beras Cipinang',
  },
  {
    text: 'Mantap beli bahan pokok di Qopnet, harganya terjangkau plus return guarantee-nya bagus. Recommended banget buat yang usaha catering. Ga bakal nyesel deh.',
    author: 'Charlie',
    affiliation: 'ex-Purchasing Manager Berry Kitchen',
  },
  {
    text: 'Harga murah dan terjangkau, kami berterima kasih karena usaha kami terbantu oleh Qopnet',
    author: 'Fauzan',
    affiliation: 'Pemilik Dapur Miji Catering, Mitra Kulina',
  },
  {
    text: 'Qopnet helps us provide our basic raw materials not only with good quality but also easiness in payment & helpful in after sales service. Thank you, Qopnet!',
    author: 'Annisa Riani',
    affiliation: 'Co-Founder Soul in a Box @soulinabox',
  },
  {
    text: 'Dengan harga terjangkau, kami berterima kasih karenanya usaha koperasi kami sangat terbantu.',
    author: 'Silfia Trisna',
    affiliation:
      'Sekretaris Koperasi Karyawan Trio Putera Utama, Kelompok Usaha Adira Semesta Industry',
  },
]

export const partners = [
  {
    name: 'Unilever',
    imageUrl:
      'https://ik.imagekit.io/qopnetlabs/logos/unilever.png?updatedAt=1626984413778',
  },
  {
    name: 'Rose Brand',
    imageUrl:
      'https://ik.imagekit.io/qopnetlabs/logos/rosebrand.png?updatedAt=1626984413779',
  },
]

export const HomeBannerCarousel = () => {
  return (
    <Carousel
      responsive={carouselResponsive}
      swipeable={true}
      draggable={true}
      showDots={true}
      infinite={true}
      ssr={true}
    >
      {carouselBannerImages.map((banner, index) => {
        return (
          <NextLink key={index} href="/shop" passHref>
            <chakra.a>
              <NextImage
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

export const HomePartners = () => {
  return (
    <Stack id="home-partners" spacing={10} textAlign="center">
      <Heading>Partner Kami</Heading>
      <VStack>
        <SimpleGrid minChildWidth="100px" gap={5} maxW="220px">
          {partners.map((partner, index) => {
            return (
              <Box key={index} maxW="100px">
                <NextImage
                  alt={partner.name}
                  src={partner.imageUrl}
                  layout="responsive"
                  width={100}
                  height={100}
                />
              </Box>
            )
          })}
        </SimpleGrid>
      </VStack>
    </Stack>
  )
}

export const HomeTestimonials = () => {
  return (
    <Stack id="home-testimonials" spacing={10} textAlign="center">
      <Heading>Testimonial</Heading>
      <Carousel
        responsive={carouselResponsive}
        swipeable={true}
        draggable={true}
        showDots={true}
        infinite={true}
        ssr={true}
      >
        {testimonials.map((testimonial, index) => {
          return (
            <Stack key={index} maxW="700px" pb={10} m="0 auto">
              <Text fontSize="lg">"{testimonial.text}"</Text>
              <Text fontWeight="bold">{testimonial.author}</Text>
              <Text fontSize="sm">{testimonial.affiliation}</Text>
            </Stack>
          )
        })}
      </Carousel>
    </Stack>
  )
}

export const HomeFaq = () => {
  return (
    <Box id="faq">
      <Heading>FAQ</Heading>
    </Box>
  )
}
