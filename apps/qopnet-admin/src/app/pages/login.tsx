import { Link } from 'react-router-dom'
import { VStack, Heading, Image } from '@chakra-ui/react'

import { BlankLayout } from '../layouts'
import QopnetIcon from '../../assets/qopnet-icon.png'

export const Login = () => {
  return (
    <BlankLayout>
      <VStack mt={20}>
        <Image src={QopnetIcon} alt="Qopnet Icon"></Image>
        <Heading>Log in to Qopnet Admin</Heading>
      </VStack>
    </BlankLayout>
  )
}
