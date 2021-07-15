import { useEffect, useState } from 'react'
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
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

export type AuthData = {
  email: string
  password: string
}

/**
 * /signup
 */
export const SignUpForm = () => {
  return (
    <div>
      <h1>Daftar sekarang</h1>
    </div>
  )
}

/**
 * /signin
 */
export const SignInForm = () => {
  const history = useHistory()
  const toast = useToast()
  const user = useUser()
  const supabase = useSupabase()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) history.replace('/')
  }, [user, history])

  // Password input show and hide
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  // Sign in form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthData>()

  // Sign in process and toast
  const onSubmitLogin: SubmitHandler<AuthData> = async ({
    email,
    password,
  }) => {
    setLoading(true)
    const { user, error } = await supabase.auth.signIn({ email, password })
    setLoading(false)
    if (user) {
      toast({ title: 'Berhasil masuk', status: 'success' })
      history.push('/')
    } else if (error) {
      toast({ title: 'Gagal masuk', status: 'error' })
    } else {
      toast({ title: 'Gagal masuk', status: 'error' })
    }
  }

  return (
    <div>
      <VStack mt={20} spacing={10}>
        <Heading as="h1" size="xl">
          Masuk ke akun Qopnet
        </Heading>

        <Stack as="form" onSubmit={handleSubmit(onSubmitLogin)}>
          <FormControl id="email">
            <VisuallyHidden>
              <FormLabel>Email</FormLabel>
            </VisuallyHidden>
            <Input
              type="email"
              placeholder="email@contoh.com"
              {...register('email', { required: true })}
            />
            <FormHelperText color="red.500">
              {errors.email && <span>Email diperlukan</span>}
            </FormHelperText>
          </FormControl>

          <FormControl id="password">
            <VisuallyHidden>
              <FormLabel>Kata sandi</FormLabel>
            </VisuallyHidden>
            <InputGroup size="md">
              <Input
                pr="6.5rem"
                type={show ? 'text' : 'password'}
                placeholder="Kata sandi"
                {...register('password', { required: true })}
              />
              <InputRightElement width="6.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? 'Sembunyi' : 'Muncul'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormHelperText color="red.500">
              {errors.password && <span>Kata sandi diperlukan</span>}
            </FormHelperText>
          </FormControl>

          <Button
            isLoading={loading}
            loadingText="Sedang masuk..."
            colorScheme="orange"
            type="submit"
          >
            Masuk
          </Button>
        </Stack>
      </VStack>
    </div>
  )
}
