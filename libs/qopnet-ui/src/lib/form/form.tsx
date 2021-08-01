import { Box, useColorModeValue } from '@chakra-ui/react'

/* eslint-disable-next-line */
export interface FormProps {}

export function Form(props: FormProps) {
  return (
    <form>
      <h1>Form</h1>
    </form>
  )
}

export interface OptionBoxProps {
  id?: string
  selected?: boolean
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

export default Form
