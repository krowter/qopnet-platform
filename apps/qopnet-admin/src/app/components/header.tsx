import { HStack, useColorModeValue } from '@chakra-ui/react'

export const Header = ({
  children,
  width,
}: {
  children: JSX.Element | JSX.Element[]
  width?: string | number
}) => {
  const border = useColorModeValue('gray.200', 'gray.700')

  return (
    <HStack
      as="header"
      p={5}
      spacing={5}
      borderBottom="1px solid gray"
      borderColor={border}
      width={width ?? ''}
    >
      {children}
    </HStack>
  )
}
