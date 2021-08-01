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

export interface OptionCardProps {
  selected: boolean
  children: JSX.Element | JSX.Element[]
}

export const OptionCard = ({ selected, children }: OptionCardProps) => {
  const borderColor = useColorModeValue('gray.700', 'gray.200')
  const cardBackground = useColorModeValue('gray.100', 'gray.700')

  return (
    <Box
      p={3}
      bg={cardBackground}
      rounded="full"
      border="2px solid black"
      borderColor={borderColor}
    >
      {children}
    </Box>
  )
}

export default Form
