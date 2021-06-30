import { Avatar, Heading, HStack, IconButton, Text } from '@chakra-ui/react'
import { FaBars as MenuIcon } from 'react-icons/fa'

export const Header = () => {
  return (
    <HStack
      as="header"
      bg="orange.900"
      color="white"
      justify="space-between"
      p={3}
      spacing={3}
    >
      <HStack>
        <IconButton
          aria-label="Menu"
          bg="transparent"
          borderRadius={3}
          colorScheme="orange"
          icon={<MenuIcon />}
          size="xs"
        />
        <Heading as="h1" size="sm">
          Admin Dashboard
        </Heading>
      </HStack>
      <HStack>
        <Avatar size="xs" name="Qopnet Admin" borderRadius={3} />
        <Text as="span" fontSize="xs">
          admin@qopnet.id
        </Text>
      </HStack>
    </HStack>
  )
}
