import NextImage from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import {
  Avatar,
  AvatarBadge,
  Box,
  chakra,
  Heading,
  HStack,
  IconButton,
  Image as ChakraImage,
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
export interface HeaderProps {
  cart?: unknown
}

export const Header = (props: HeaderProps) => {
  const user = false
  const { cart = {} } = props
  const { colorMode, toggleColorMode } = useColorMode()
  const router = useRouter()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmitSearch = (event: any) => {
    event.preventDefault()
    const keyword = 'telur'
    router.push(`/search?q=${keyword}`)
  }

  return (
    <HStack
      as="header"
      p={5}
      color={useColorModeValue('orange.900', 'orange.100')}
      bg={useColorModeValue('orange.100', 'orange.900')}
      justify="space-between"
      spacing={5}
    >
      <HStack w={500} spacing={3}>
        <NextLink href="/" passHref>
          <chakra.a display="block" className="next-image-container">
            <NextImage
              alt="Qopnet logo"
              src={useColorModeValue(
                '/images/qopnet-logo.png',
                '/images/qopnet-logo-dark.png'
              )}
              width={161}
              height={50}
            />
          </chakra.a>
        </NextLink>
        <IconButton
          aria-label="Change color mode"
          variant="ghost"
          onClick={toggleColorMode}
        >
          {colorMode === 'light' ? <Icon name="moon" /> : <Icon name="sun" />}
        </IconButton>
        <Heading as="h1" size="md">
          <NextLink href="/shop">
            <Link>Belanja</Link>
          </NextLink>
        </Heading>
      </HStack>

      <Box as="form" w="100%" onSubmit={handleSubmitSearch}>
        <InputGroup>
          <Input
            placeholder="Cari produk..."
            bg={useColorModeValue('white', 'black')}
          />
          <InputRightElement color={useColorModeValue('black', 'white')}>
            <Icon name="search" />
          </InputRightElement>
        </InputGroup>
      </Box>

      <HStack spacing={3}>
        {user && (
          <HStack id="user-buttons">
            <Avatar
              id="user-avatar-button"
              name="User Name"
              size="sm"
              rounded="base"
            >
              <AvatarBadge boxSize="1.25em" bg="green.500" />
            </Avatar>
            <IconButton
              id="shopping-cart-button"
              aria-label="Keranjang belanja"
            >
              <Icon name="cart" />
            </IconButton>
            <IconButton id="signout-button" aria-label="Keluar">
              <Icon name="signout" />
            </IconButton>
          </HStack>
        )}

        {!user && (
          <HStack id="non-user-buttons">
            <NextLinkButton href="/signin" colorScheme="yellow">
              Masuk
            </NextLinkButton>
            <NextLinkButton href="/signup" colorScheme="orange">
              Daftar
            </NextLinkButton>
          </HStack>
        )}
      </HStack>
    </HStack>
  )
}

export default Header
