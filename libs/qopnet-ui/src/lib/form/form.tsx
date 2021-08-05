/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, useColorModeValue } from '@chakra-ui/react'

export interface OptionBoxProps {
  id?: string
  selected?: boolean
  onClick?: any
  children: JSX.Element | JSX.Element[]
}

export const OptionBox = (props: OptionBoxProps) => {
  const { selected, children } = props
  const borderColor = useColorModeValue(
    selected ? 'orange.500' : 'gray.100', // light
    selected ? 'orange.500' : 'gray.700' // dark
  )
  const boxBackground = useColorModeValue(
    selected ? 'gray.100' : 'white', // light
    selected ? 'gray.700' : 'gray.800' // dark
  )

  return (
    <Box
      {...props}
      py={3}
      px={5}
      bg={boxBackground}
      rounded="full"
      border="2px solid black"
      borderColor={borderColor}
      cursor="pointer"
    >
      {children}
    </Box>
  )
}
