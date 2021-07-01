import { Link } from 'react-router-dom'
import {
  chakra,
  Avatar,
  Button,
  ButtonGroup,
  HStack,
  Image,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { useSupabase } from 'use-supabase'

import * as packageData from '../../../../../package.json'

export const Sidebar = () => {
  const bg = useColorModeValue('gray.100', 'gray.900')

  return (
    <Stack
      justify="space-between"
      bg={bg}
      height="100vh"
      py={5}
      borderRight="1px solid gray"
      borderColor="gray.700"
    >
      <Stack as="nav" w="max-content" spacing={5}>
        <SidebarUser />
        <SidebarAuth />
        <SidebarLinks />
      </Stack>
      <Text as="pre" fontSize="xs" px={5} color="gray.500">
        <code>v{packageData.version}</code>
      </Text>
    </Stack>
  )
}

export const SidebarUser = () => {
  const logo = useColorModeValue(
    '../../assets/qopnet-logo.png',
    '../../assets/qopnet-logo-dark.png'
  )

  return (
    <HStack spacing={10} px={5}>
      <Link to="/">
        <Image src={logo} alt="Qopnet" height="25px" width="80px" />
      </Link>
      <Avatar size="xs" name="Qopnet Admin" />
    </HStack>
  )
}

export const SidebarAuth = () => {
  const { auth } = useSupabase()
  const toast = useToast()

  const handleLogout = async () => {
    const { error } = await auth.signOut()
    if (!error) {
      // If logout is success
      toast({
        title: 'Log out success',
        description: 'You are logged out',
      })
    } else {
      // If logout is error
      toast({
        title: 'Log out error',
        description: error.message,
        status: 'error',
      })
    }
  }

  return (
    <ButtonGroup px={5}>
      <Button colorScheme="orange" size="xs">
        Settings
      </Button>
      <Button colorScheme="red" size="xs" onClick={handleLogout}>
        Log out
      </Button>
    </ButtonGroup>
  )
}

export const SidebarLinks = () => {
  return (
    <Stack fontSize="sm" fontWeight="500" spacing={0} px={3}>
      <SidebarLink to="/">Home</SidebarLink>
      <SidebarLink to="/users">Users</SidebarLink>
      <SidebarLink to="/profiles">Profiles</SidebarLink>
      <SidebarLink to="/suppliers">Suppliers</SidebarLink>
      <SidebarLink to="/merchants">Merchants</SidebarLink>
      <SidebarLink to="/logistics">Logistics</SidebarLink>
      <SidebarLink to="/customers">Customers</SidebarLink>
    </Stack>
  )
}

export const SidebarLink = ({
  to,
  children,
  isActive,
}: {
  to: string
  children: string | JSX.Element
  isActive?: boolean
}) => {
  const bg = useColorModeValue('gray.200', 'gray.700')

  return (
    <chakra.a
      as={Link}
      to={to}
      px={2}
      py={1}
      rounded="base"
      bg={isActive ? bg : ''}
      _hover={{
        bg: bg,
      }}
    >
      {children}
    </chakra.a>
  )
}
