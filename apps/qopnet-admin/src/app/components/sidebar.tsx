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
} from '@chakra-ui/react'
import packageData from '../../../../../package.json'

export const Sidebar = () => {
  return (
    <Stack justify="space-between">
      <Stack as="nav" bg="gray.200" height="100vh" py={5} spacing={5}>
        <SidebarUser />
        <SidebarAuth />
        <SidebarLinks />
      </Stack>
      <Text>
        <code>qopnet-admin v{packageData.version}</code>
      </Text>
    </Stack>
  )
}

export const SidebarUser = () => {
  return (
    <HStack spacing={10} px={5}>
      <Link to="/">
        <Image
          src="../../assets/qopnet-logo.png"
          alt="Qopnet"
          height="25px"
          width="80px"
        />
      </Link>
      <Avatar size="xs" name="Qopnet Admin" />
    </HStack>
  )
}

export const SidebarAuth = () => {
  return (
    <ButtonGroup px={5}>
      <Button colorScheme="orange" size="xs">
        Settings
      </Button>
      <Button colorScheme="red" size="xs">
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
  return (
    <chakra.a
      as={Link}
      to={to}
      px={2}
      py={1}
      rounded="md"
      bg={isActive ? 'gray.300' : ''}
      _hover={{
        bg: 'gray.300',
      }}
    >
      {children}
    </chakra.a>
  )
}
