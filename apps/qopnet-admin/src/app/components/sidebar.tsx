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
import { Icon } from '@qopnet/qopnet-ui'

export const Sidebar = () => {
  const sidebar = useDisclosure()
  return (
    <>
      <IconButton
        aria-label="Menu"
        bg="none"
        display={{ base: 'inline-flex', md: 'none' }}
        icon={<Icon name="menu" />}
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
        h="auto"
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
        Pengaturan
      </Button>
      <Button colorScheme="red" size="xs" onClick={handleLogout}>
        Keluar
      </Button>
    </ButtonGroup>
  )
}

export const SidebarLinks = () => {
  const suppliers = useDisclosure()
  const merchants = useDisclosure()
  return (
    <Stack fontSize="sm" fontWeight="500" spacing={0} px={3}>
      <SidebarLink name="home" to="/">
        Beranda
      </SidebarLink>
      <SidebarLink name="users" to="/users">
        Pengguna
      </SidebarLink>
      <SidebarLink name="profiles" to="/profiles">
        Profil
      </SidebarLink>
      <SidebarNestedLink name="supplier">Supplier</SidebarNestedLink>
      <Flex flexDirection="column" pl={4}>
        <SidebarLink name="suppliers" to="/suppliers">
          Semua Supplier
        </SidebarLink>
        <SidebarLink name="suppliers-products" to="/suppliers/products">
          Semua Produk Supplier
        </SidebarLink>
        {/* <SidebarLink to="/suppliers/purchase-orders">
          Purchase Orders (PO)
        </SidebarLink>
        <SidebarLink to="/suppliers/invoices">Suppliers Invoices</SidebarLink> */}
      </Flex>
      {/* <SidebarNestedLink>Merchants</SidebarNestedLink>
      <Flex flexDirection="column" alignItems="flex-start" px={4}>
        <SidebarLink to="/merchants">All Merchants</SidebarLink>
        <SidebarLink to="/merchants/products">Merchant Products</SidebarLink>
        <SidebarLink to="/merchants/orders">Merchant Orders</SidebarLink>
        <SidebarLink to="/merchants/invoices">Merchant Invoices</SidebarLink>
      </Flex>
      <SidebarLink to="/logistics">Logistics</SidebarLink>
      <SidebarLink to="/customers">Customers</SidebarLink> */}
    </Stack>
  )
}

export const SidebarLink = ({
  name,
  to,
  children,
  isActive,
}: {
  name: string
  to: string
  children: ReactNode
  isActive?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}) => {
  const bg = useColorModeValue('gray.200', 'gray.700')
  return (
    <Flex
      as={Link}
      to={to}
      px={2}
      py={1}
      rounded="base"
      align="center"
      bg={isActive ? bg : ''}
      _hover={{
        bg: bg,
      }}
    >
      {name && (
        <chakra.span mr="2" _groupHover={{ color: 'gray.600' }}>
          <Icon name={name} />
        </chakra.span>
      )}
      {children}
    </Flex>
  )
}

const SidebarNestedLink = ({
  name,
  children,
  isActive,
  onClick,
}: {
  name: string
  children: ReactNode
  isActive?: boolean
  onClick?: React.MouseEventHandler
}) => {
  const bg = useColorModeValue('gray.200', 'gray.700')
  return (
    <Flex
      align="center"
      bg={isActive ? bg : ''}
      _hover={{ bg: bg }}
      cursor="pointer"
      onClick={onClick}
      px={2}
      py={1}
      role="group"
      transition=".15s ease"
    >
      {name && (
        <chakra.span mr="2" _groupHover={{ color: 'gray.600' }}>
          <Icon name={name} />
        </chakra.span>
      )}
      {children}
    </Flex>
  )
}
