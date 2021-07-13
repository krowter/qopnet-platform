import NextImage from 'next/image'
import NextLink from 'next/link'
import {
  Image as ChakraImage,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'

import { NextLinkButton } from '../next-link-button/next-link-button'
import { Icon } from '../icon/icon'

/* eslint-disable-next-line */
export interface HeaderProps {}

export const Header = (props: HeaderProps) => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <HStack
      as="header"
      p={5}
      color={useColorModeValue('orange.900', 'orange.100')}
      bg={useColorModeValue('orange.100', 'orange.900')}
      justify="space-between"
      spacing={5}
    >
      <HStack spacing={10} w={500}>
        <NextImage
          alt="Qopnet logo"
          src={useColorModeValue(
            '/images/qopnet-logo.png',
            '/images/qopnet-logo-dark.png'
          )}
          width={161}
          height={50}
        />
        <Heading as="h1" size="md">
          <NextLink href="/shop">
            <Link>Belanja</Link>
          </NextLink>
        </Heading>
      </HStack>

      <InputGroup w="100%">
        <Input
          placeholder="Ketik kata kunci..."
          bg={useColorModeValue('white', 'black')}
        />
        <InputRightElement color="green.500">
          <Icon name="search" />
        </InputRightElement>
      </InputGroup>

      <HStack>
        <IconButton
          aria-label="Change color mode"
          variant="ghost"
          rounded="full"
          onClick={toggleColorMode}
        >
          {colorMode === 'light' ? <Icon name="moon" /> : <Icon name="sun" />}
        </IconButton>
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
