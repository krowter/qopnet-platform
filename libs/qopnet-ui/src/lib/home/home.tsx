import NextLink from 'next/link'
import NextImage from 'next/image'
import {
  chakra,
  Box,
  Heading,
  Stack,
  VStack,
  Text,
  Image as ChakraImage,
  Flex,
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
    name: 'Adira Semesta Industry',
    imageUrl:
      'https://ik.imagekit.io/qopnetlabs/logos/adirasemestraindustry.png?updatedAt=1627850431787',
  },
  {
    name: 'Berry Kitchen',
    imageUrl:
      'https://ik.imagekit.io/qopnetlabs/logos/berrykitchen.png?updatedAt=1627850432466',
  },
  {
    name: 'Dapur Miji Catering',
    imageUrl:
      'https://ik.imagekit.io/qopnetlabs/logos/dapurmiji.png?updatedAt=1627850433416',
  },
  {
    name: 'Deliveree',
    imageUrl:
      'https://ik.imagekit.io/qopnetlabs/logos/deliveree.png?updatedAt=1627850434312',
  },
  {
    name: 'Duha Syariah',
    imageUrl:
      'https://ik.imagekit.io/qopnetlabs/logos/duhasyariah.png?updatedAt=1627850435228',
  },
  {
    name: 'Eatever',
    imageUrl:
      'https://ik.imagekit.io/qopnetlabs/logos/eatever.png?updatedAt=1627850436093',
  },
  {
    name: 'IDX Incubator',
    imageUrl:
      'https://ik.imagekit.io/qopnetlabs/logos/idxincubator.png?updatedAt=1627850437030',
  },
  {
    name: 'Koinworks',
    imageUrl:
      'https://ik.imagekit.io/qopnetlabs/logos/koinworks.png?updatedAt=1627850437885',
  },
  {
    name: 'Kredivo',
    imageUrl:
      'https://ik.imagekit.io/qopnetlabs/logos/kredivo.png?updatedAt=1627850438824',
  },
  {
    name: 'Lalamove',
    imageUrl:
      'https://ik.imagekit.io/qopnetlabs/logos/lalamove.png?updatedAt=1627850439712',
  },
  {
    name: 'Mas Kargo',
    imageUrl:
      'https://ik.imagekit.io/qopnetlabs/logos/maskargo.png?updatedAt=1627850440648',
  },
  {
    name: 'Panarub Industry',
    imageUrl:
      'https://ik.imagekit.io/qopnetlabs/logos/panarubindustry.png?updatedAt=1627850441525',
  },
  {
    name: 'Permata Bank',
    imageUrl:
      'https://ik.imagekit.io/qopnetlabs/logos/permatabank.png?updatedAt=1627850442444',
  },
  {
    name: 'Soul in a Box',
    imageUrl:
      'https://ik.imagekit.io/qopnetlabs/logos/soulinabox.png?updatedAt=1627850443285',
  },
  {
    name: 'Unilever Food Solutions',
    imageUrl:
      'https://ik.imagekit.io/qopnetlabs/logos/unileverfoodsolutions.png?updatedAt=1627850444203',
  },
  { name: 'Penggerak Oke Oce' },
  { name: 'Himpunan Pengusaha Muda Indonesia' },
  { name: 'Berrill Jaya (Beras Anak Raja Group)' },
  { name: 'Koperasi Nelayan Cilincing' },
  { name: 'Koperasi Pedagang Pasar Cipinang' },
  { name: 'Koperasi UNIKA Soegijapranata' },
  { name: 'Koperasi Karyawan PT Panarub Industry' },
  { name: 'Koperasi Karyawan PT Argha Karya Prima Tbk' },
  { name: 'Koperasi Karyawan PT Indah Jaya (Terry Palmer)' },
  {
    name: 'Koperasi Karyawan PT Trio Putera Utama (Adira Semesta Industry Group)',
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
        <Flex flexWrap="wrap" align="center" justify="center">
          {partners.map((partner, index) => {
            return (
              <Box key={index} m={2}>
                {partner?.imageUrl ? (
                  <ChakraImage
                    alt={partner?.name}
                    src={partner?.imageUrl}
                    h="50px"
                    px={3}
                    // layout="responsive"
                    // width={100}
                    // height={100}
                  />
                ) : (
                  <Text fontSize="sm" mx={5} fontWeight="bold">
                    {partner.name}
                  </Text>
                )}
              </Box>
            )
          })}
        </Flex>
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
