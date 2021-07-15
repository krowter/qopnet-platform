import { useRouter } from 'next/router'
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
  IconButton,
  VisuallyHidden,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useUser, useSupabase } from 'use-supabase'

import { Icon } from '@qopnet/qopnet-ui'

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
  const router = useRouter()
  const toast = useToast()
  const user = useUser()
  const supabase = useSupabase()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) router.replace('/')
  }, [user, router])

  // Password input show and hide
  const [show, setShow] = useState(false)
  const handleShow = () => setShow(!show)

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
      router.push('/')
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
              <InputRightElement>
                <IconButton
                  onClick={handleShow}
                  size="sm"
                  h="1.75rem"
                  aria-label={show ? 'Sembunyi' : 'Muncul'}
                  icon={<Icon name={show ? 'hide' : 'show'} />}
                />
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
