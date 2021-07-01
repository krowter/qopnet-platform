import { HStack, useColorModeValue } from '@chakra-ui/react'

export const Header = ({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) => {
  const border = useColorModeValue('gray.200', 'gray.700')

  return (
    <HStack
      as="header"
      p={5}
      spacing={5}
      borderBottom="1px solid gray"
      borderColor={border}
    >
      {children}
    </HStack>
  )
}
