import { useEffect, useState } from 'react'
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
import { useUser, useSupabase } from 'use-supabase'

import { BlankLayout } from '../layouts'
import QopnetIcon from '../../assets/qopnet-icon.png'

type LoginInputs = {
  email?: string
  password?: string
}

export const Login = () => {
  const user = useUser()
  const history = useHistory()

  useEffect(() => {
    // Redirect to home page if already authenticated
    if (user) {
      history.replace('/')
    }
  }, [user, history])

  // Login process
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const { auth } = useSupabase()

  // Password input show and hide
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  // Form submit
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>()

  const onSubmitLogin: SubmitHandler<LoginInputs> = async (data) => {
    // Login via API later
    // Login via Supabase currently
    setLoading(true)
    const { user, error } = await auth.signIn({
      email: data.email,
      password: data.password,
    })
    setLoading(false)

    if (user) {
      // If login is success
      toast({
        title: 'Login success',
        description: 'You are logged in',
        status: 'success',
      })
      history.push('/')
    } else if (error) {
      // If login is error
      toast({
        title: 'Login failed',
        description: error.message,
        status: 'error',
      })
    } else {
      // If login is failed
      toast({
        title: 'Login failed',
        description: 'Unknown reason',
        status: 'error',
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
            isLoading={loading}
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
