import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  VStack,
  Heading,
  Image,
  FormControl,
  FormLabel,
  Input,
  Stack,
  FormHelperText,
  InputGroup,
  InputRightElement,
  Button,
  VisuallyHidden,
} from '@chakra-ui/react'

import { BlankLayout } from '../layouts'
import QopnetIcon from '../../assets/qopnet-icon.png'

export const Login = () => {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  return (
    <BlankLayout>
      <VStack id="login-container" mt={20} spacing={10}>
        <VStack id="login-image-title">
          <Image src={QopnetIcon} alt="Qopnet Icon"></Image>
          <Heading textAlign="center" as="h1" size="md">
            Log in to Qopnet Admin
          </Heading>
        </VStack>
        <Stack as="form" id="login-form">
          <FormControl id="email">
            <VisuallyHidden>
              <FormLabel>Email address</FormLabel>
            </VisuallyHidden>
            <Input type="email" placeholder="email@example.com" />
          </FormControl>
          <FormControl>
            <VisuallyHidden>
              <FormLabel>Password</FormLabel>
            </VisuallyHidden>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? 'text' : 'password'}
                placeholder="Enter password"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button
            isLoading={false}
            loadingText="Logging in"
            colorScheme="orange"
            type="submit"
          >
            Log in
          </Button>
        </Stack>
      </VStack>
    </BlankLayout>
  )
}
