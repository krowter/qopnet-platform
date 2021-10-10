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
import { Icon, ToggleColorModeButton } from '@qopnet/qopnet-ui'

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
        m={2}
        size="sm"
        position="fixed"
        top={'8px'}
        left={0}
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
            borderRight="1px solid gray"
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            height="100vh"
            justify="space-between"
            p={2}
            minWidth="250px"
          >
            <Stack as="nav" w="auto" spacing={3} mx={2} mt={6}>
              <DrawerCloseButton left={0} ml={2} />
              <SidebarUser />
              <SidebarAuth />
              <SidebarLinks />
            </Stack>
            <HStack px={5}>
              <Text as="code" fontSize="xs" color="gray.500">
                v{packageData.version}
              </Text>
              <ToggleColorModeButton size="xs" />
            </HStack>
          </Stack>
        </DrawerContent>
      </Drawer>

      <Stack
        id="sidebar-stack"
        h="100vh"
        bg={useColorModeValue('gray.100', 'gray.900')}
        borderRight="1px solid gray"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        display={{ base: 'none', md: 'flex' }}
        height="100vh"
        justify="space-between"
        py={5}
        minWidth="250px"
        position="fixed"
      >
        <Stack as="nav" w="auto" spacing={5} mx={4}>
          <SidebarUser />
          <SidebarAuth />
          <SidebarLinks />
        </Stack>
        <HStack px={5}>
          <Text as="code" fontSize="xs" color="gray.500">
            v{packageData.version}
          </Text>
          <ToggleColorModeButton size="xs" />
        </HStack>
      </Stack>
    </>
  )
}

export const SidebarUser = () => {
  return (
    <HStack spacing={10} justifyContent="space-between">
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
    <ButtonGroup id="sidebar-auth-buttons">
      <Button colorScheme="red" size="xs" onClick={handleLogout}>
        Keluar
      </Button>
    </ButtonGroup>
  )
}

export const SidebarLinks = () => {
  return (
    <Stack id="sidebar-links" fontSize="sm" fontWeight="500" spacing={0}>
      <SidebarLink name="home" to="/">
        Beranda
      </SidebarLink>
      <SidebarLink name="users" to="/users">
        Pengguna
      </SidebarLink>
      <SidebarLink name="profiles" to="/profiles">
        Profil
      </SidebarLink>

      <SidebarNestedLink name="supplier" to="/suppliers">
        Supplier
      </SidebarNestedLink>
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

      {/* <SidebarNestedLink name="merchant" to="/merchants">
        Merchant
      </SidebarNestedLink>
      <Flex flexDirection="column" alignItems="flex-start" px={4}>
        <SidebarLink name="merchants" to="/merchants">
          Semua Merchant
        </SidebarLink>
        <SidebarLink to="/merchants/products">Merchant Products</SidebarLink>
        <SidebarLink to="/merchants/orders">Merchant Orders</SidebarLink>
        <SidebarLink to="/merchants/invoices">Merchant Invoices</SidebarLink>
      </Flex> */}

      <SidebarNestedLink name="business-orders" to="/business/orders">
        Pesanan Bisnis
      </SidebarNestedLink>
      <Flex flexDirection="column" alignItems="flex-start" px={4}>
        <SidebarLink name="business-orders" to="/business/orders">
          Semua Pesanan Bisnis
        </SidebarLink>
      </Flex>

      <SidebarNestedLink name="promotions" to="/promos/submissions">
        Promo
      </SidebarNestedLink>
      <Flex flexDirection="column" alignItems="flex-start" px={4}>
        <SidebarLink name="promotions" to="/promos/submissions">
          Semua Promo
        </SidebarLink>
      </Flex>

      {/* <SidebarLink to="/logistics">Logistics</SidebarLink>
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
  to,
  children,
  isActive,
  onClick,
}: {
  name: string
  to: string
  children: ReactNode
  isActive?: boolean
  onClick?: React.MouseEventHandler
}) => {
  const bg = useColorModeValue('gray.200', 'gray.700')
  return (
    <Flex
      as={Link}
      to={to}
      align="center"
      cursor="pointer"
      onClick={onClick}
      px={2}
      py={1}
      role="group"
      transition=".15s ease"
      bg={isActive ? bg : ''}
      _hover={{ bg: bg }}
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
