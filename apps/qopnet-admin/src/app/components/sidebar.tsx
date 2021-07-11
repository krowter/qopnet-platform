import { ReactNode } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  Avatar,
  Button,
  ButtonGroup,
  chakra,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useSupabase } from 'use-supabase'
import * as packageData from '../../../../../package.json'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { IconType } from 'react-icons/lib'
import { FiMenu } from 'react-icons/fi'

export const Sidebar = () => {
  const sidebar = useDisclosure()
  return (
    <>
      <IconButton
        aria-label="Menu"
        bg="none"
        display={{ base: 'inline-flex', md: 'none' }}
        icon={<FiMenu />}
        onClick={sidebar.onOpen}
        size="md"
      />
      <Drawer
        isFullHeight
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
        size="xs"
      >
        <DrawerOverlay />
        <DrawerContent style={{ width: 'auto' }}>
          <Stack
            bg={useColorModeValue('gray.100', 'gray.900')}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            borderRight="1px solid gray"
            height="100vh"
            justify="space-between"
            py={5}
            minWidth="250px"
          >
            <Stack as="nav" w="auto" spacing={6}>
              <DrawerCloseButton left="0px" ml={3} />
              <SidebarUser />
              <SidebarAuth />
              <SidebarLinks />
            </Stack>
            <Text as="pre" fontSize="xs" px={5} color="gray.500">
              <code>v{packageData.version}</code>
            </Text>
          </Stack>
        </DrawerContent>
      </Drawer>
      <Stack
        bg={useColorModeValue('gray.100', 'gray.900')}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        borderRight="1px solid gray"
        display={{ base: 'none', md: 'flex' }}
        height="100vh"
        justify="space-between"
        py={5}
        minWidth="250px"
      >
        <Stack as="nav" w="auto" spacing={5}>
          <SidebarUser />
          <SidebarAuth />
          <SidebarLinks />
        </Stack>
        <Text as="pre" fontSize="xs" px={5} color="gray.500">
          <code>v{packageData.version}</code>
        </Text>
      </Stack>
    </>
  )
}

export const SidebarUser = () => {
  return (
    <HStack spacing={10} px={5} justifyContent="center">
      <Link to="/">
        <Image
          src={useColorModeValue(
            '../../assets/qopnet-logo.png',
            '../../assets/qopnet-logo-dark.png'
          )}
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
  const history = useHistory()
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
      history.replace('/signin')
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
    <ButtonGroup px={5} justifyContent="center" display="flex">
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
  const suppliers = useDisclosure()
  const merchants = useDisclosure()
  return (
    <Stack fontSize="sm" fontWeight="500" spacing={0} px={3}>
      <SidebarLink to="/">Home</SidebarLink>
      <SidebarLink to="/users">Users</SidebarLink>
      <SidebarLink to="/profiles">Profiles</SidebarLink>
      <SidebarNestedLink>Suppliers</SidebarNestedLink>
      <Flex flexDirection="column" alignItems="flex-start" px={4}>
        <SidebarLink to="/suppliers">All Suppliers</SidebarLink>
        <SidebarLink to="/suppliers/products">Suppliers Products</SidebarLink>
        <SidebarLink to="/suppliers/purchase-orders">
          Purchase Orders (PO)
        </SidebarLink>
        <SidebarLink to="/suppliers/invoices">Suppliers Invoices</SidebarLink>
      </Flex>
      <SidebarNestedLink>Merchants</SidebarNestedLink>
      <Flex flexDirection="column" alignItems="flex-start" px={4}>
        <SidebarLink to="/merchants">All Merchants</SidebarLink>
        <SidebarLink to="/merchants/products">Merchant Products</SidebarLink>
        <SidebarLink to="/merchants/orders">Merchant Orders</SidebarLink>
        <SidebarLink to="/merchants/invoices">Merchant Invoices</SidebarLink>
      </Flex>
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
  children: ReactNode
  isActive?: boolean
  icon?: IconType
  onClick?: React.MouseEventHandler<HTMLButtonElement>
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

const SidebarNestedLink = ({
  children,
  isActive,
  icon,
  onClick,
}: {
  children: ReactNode
  isActive?: boolean
  icon?: IconType
  onClick?: React.MouseEventHandler
}) => {
  const bg = useColorModeValue('gray.200', 'gray.700')
  return (
    <Flex
      align="center"
      bg={isActive ? bg : ''}
      _hover={{
        bg: bg,
      }}
      cursor="pointer"
      onClick={onClick}
      px={2}
      py={1}
      role="group"
      transition=".15s ease"
    >
      {icon && (
        <Icon
          as={icon}
          boxSize="4"
          mr="2"
          _groupHover={{
            color: 'gray.600',
          }}
        />
      )}
      {children}
    </Flex>
  )
}
