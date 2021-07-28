import NextImage from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import {
  Avatar,
  AvatarBadge,
  Box,
  chakra,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image as ChakraImage,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  ButtonGroup,
  useColorMode,
  useColorModeValue,
  useToast,
  useMediaQuery,
} from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useSupabase, useUser } from 'use-supabase'

import { NextLinkButton } from '../next-link-button/next-link-button'
import { Icon } from '../icon/icon'

/* eslint-disable-next-line */
export interface HeaderProps {
  cart?: unknown
}

export const Header = (props: HeaderProps) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const supabase = useSupabase()
  const user = useUser()
  const toast = useToast()

  const [isDesktop] = useMediaQuery('(min-width: 768px)')

  const qopnetLogo = useColorModeValue(
    '/images/qopnet-logo.png',
    '/images/qopnet-logo-dark.png'
  )

  // Should be passed down from props of respective app
  // Because useSWR
  const { cart = {} } = props

  // Handle sign out via Header, user action button
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) toast({ title: 'Berhasil keluar' })
    else toast({ title: 'Gagal keluar', status: 'error' })
  }

  return (
    <HStack
      as="header"
      p={2}
      color={useColorModeValue('orange.900', 'orange.100')}
      bg={useColorModeValue('orange.100', 'orange.900')}
      justify="space-between"
      spacing={3}
    >
      <HStack spacing={3}>
        <NextLink href="/" passHref>
          <chakra.a
            className="next-image-container header-logo"
            display="block"
            overflow="hidden"
          >
            <NextImage
              alt="Qopnet logo"
              src={qopnetLogo}
              width={161}
              height={50}
              layout="fixed"
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

        {isDesktop && (
          <Heading as="h1" size="md">
            <NextLink href="/shop">
              <Link>Belanja</Link>
            </NextLink>
          </Heading>
        )}
      </HStack>

      <SearchBar />

      <HStack spacing={3}>
        {user && (
          <HStack id="user-buttons" spacing={3}>
            <NextLink href="/dashboard" passHref>
              <chakra.a display="block">
                <Avatar
                  id="user-avatar-button"
                  name={user.email || 'Unknown'}
                  size="sm"
                >
                  <AvatarBadge boxSize="1.25em" bg="green.500" />
                </Avatar>
              </chakra.a>
            </NextLink>
            <ButtonGroup id="user-action-buttons" size="md" variant="ghost">
              <IconButton
                id="shopping-cart-button"
                colorScheme="green"
                aria-label="Keranjang belanja"
              >
                <Icon name="cart" />
              </IconButton>
              <IconButton
                id="signout-button"
                colorScheme="red"
                aria-label="Keluar"
                onClick={handleSignOut}
              >
                <Icon name="signout" />
              </IconButton>
            </ButtonGroup>
          </HStack>
        )}

        {!user && (
          <ButtonGroup id="non-user-buttons" spacing={3}>
            <NextLinkButton href="/signin" colorScheme="yellow">
              Masuk
            </NextLinkButton>
            {isDesktop && (
              <NextLinkButton href="/signup" colorScheme="orange">
                Daftar
              </NextLinkButton>
            )}
          </ButtonGroup>
        )}
      </HStack>
    </HStack>
  )
}

export type SearchData = {
  keyword: string
}

export const SearchBar = () => {
  const router = useRouter()

  // React Hook Form for search
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchData>()

  const handleSubmitSearch: SubmitHandler<SearchData> = async ({ keyword }) => {
    try {
      router.push(`/search?q=${keyword}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box as="form" w="100%" onSubmit={handleSubmit(handleSubmitSearch)}>
      <InputGroup>
        <InputLeftElement color={useColorModeValue('black', 'white')}>
          <Icon name="search" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Cari produk..."
          bg={useColorModeValue('white', 'black')}
          {...register('keyword', { required: true })}
        />
      </InputGroup>
    </Box>
  )
}

export default Header
