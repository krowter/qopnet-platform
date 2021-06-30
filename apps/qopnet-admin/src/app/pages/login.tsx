import { useState } from 'react'
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  VisuallyHidden,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import { BlankLayout } from '../layouts'
import QopnetIcon from '../../assets/qopnet-icon.png'

type LoginInputs = {
  email?: string
  password?: string
}

export const Login = () => {
  const history = useHistory()
  const toast = useToast()

  // Password input
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  // Form submit
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>()

  const onSubmitLogin: SubmitHandler<LoginInputs> = (data) => {
    if (data) {
      toast({
        title: 'Login success',
        description: 'You are logged in',
        status: 'success',
        isClosable: true,
      })
      history.push('/')
    } else {
      toast({
        title: 'Login failed',
        description: 'Your email/password is wrong',
        status: 'error',
        isClosable: true,
      })
    }
  }

  return (
    <BlankLayout>
      <VStack id="login-container" mt={20} spacing={10}>
        <VStack id="login-image-title">
          <Image src={QopnetIcon} alt="Qopnet Icon"></Image>
          <Heading textAlign="center" as="h1" size="md">
            Log in to Qopnet Admin
          </Heading>
        </VStack>

        <Stack as="form" id="login-form" onSubmit={handleSubmit(onSubmitLogin)}>
          <FormControl id="email">
            <VisuallyHidden>
              <FormLabel>Email address</FormLabel>
            </VisuallyHidden>
            <Input
              type="email"
              placeholder="email@example.com"
              {...register('email', { required: true })}
            />
            <FormHelperText color="red.500">
              {errors.email && <span>Email is required</span>}
            </FormHelperText>
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
                {...register('password', { required: true })}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormHelperText color="red.500">
              {errors.password && <span>Password is required</span>}
            </FormHelperText>
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
