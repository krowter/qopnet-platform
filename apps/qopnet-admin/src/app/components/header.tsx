import { HStack } from '@chakra-ui/react'

export const Header = ({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) => {
  return (
    <HStack as="header" color="white" p={5} spacing={5}>
      {children}
    </HStack>
  )
}
