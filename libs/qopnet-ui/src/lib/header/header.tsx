import {
  HStack,
  Heading,
  useColorModeValue,
  Input,
  Button,
} from '@chakra-ui/react'

import { NextLinkButton } from '../next-link-button/next-link-button'

/* eslint-disable-next-line */
export interface HeaderProps {}

export const Header = (props: HeaderProps) => {
  const handleChangeColorMode = () => {
    console.log('')
  }

  return (
    <HStack
      as="header"
      p={5}
      color={useColorModeValue('orange.900', 'orange.100')}
      bg={useColorModeValue('orange.100', 'orange.900')}
    >
      <Heading as="h1" size="md">
        Belanja
      </Heading>
      <Input placeholder="Ketik kata kunci..." w="420px" />
      <Button onClick={handleChangeColorMode}>O</Button>
      <NextLinkButton href="/signin" colorScheme="yellow">
        Masuk
      </NextLinkButton>
      <NextLinkButton href="/signup" colorScheme="orange">
        Daftar
      </NextLinkButton>
    </HStack>
  )
}

export default Header
