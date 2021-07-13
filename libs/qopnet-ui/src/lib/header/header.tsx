import NextLink from 'next/link'
import {
  HStack,
  Heading,
  useColorModeValue,
  Input,
  Button,
  Link,
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
      justify="space-between"
    >
      <HStack>
        <Heading as="h1" size="md">
          <NextLink href="/shop">
            <Link>Belanja</Link>
          </NextLink>
        </Heading>
      </HStack>

      <Input
        placeholder="Ketik kata kunci..."
        w="420px"
        bg={useColorModeValue('white', 'black')}
      />

      <HStack>
        <Button onClick={handleChangeColorMode}>O</Button>
        <NextLinkButton href="/signin" colorScheme="yellow">
          Masuk
        </NextLinkButton>
        <NextLinkButton href="/signup" colorScheme="orange">
          Daftar
        </NextLinkButton>
      </HStack>
    </HStack>
  )
}

export default Header
