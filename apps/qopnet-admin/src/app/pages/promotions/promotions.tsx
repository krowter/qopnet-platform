import {
  Avatar,
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Select,
  Stack,
  Radio,
  RadioGroup,
  StatHelpText,
} from '@chakra-ui/react'

import { Merchant } from '@qopnet/shared-types'
import { Header } from '../../components'
import { DefaultLayout } from '../../layouts'
import { useSWR } from '../../utils/swr'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { PromoSubmission } from '.prisma/client'
import { useForm } from 'react-hook-form'

export const PromotionsPage = () => {
  const { data, error } = useSWR('/api/promos/submissions')
  const { PromoSubmissions } = data || {}

  return (
    <DefaultLayout>
      <Flex alignItems="center">
        <Header width="100%">
          <Heading as="h1" size="md">
            Semua Promo
          </Heading>

          <Text ml={5} fontWeight={500}>
            {PromoSubmissions?.length ?? 0} promo
          </Text>
        </Header>
      </Flex>
      {error && (
        <Box px={5} py={3}>
          Gagal memuat semua promo
        </Box>
      )}
      {!PromoSubmissions && !error && (
        <Box px={5} py={3}>
          <Spinner color="orange.500" />
        </Box>
      )}
      {PromoSubmissions && (
        <PromoSubmissionsRows promoSubmissions={PromoSubmissions} />
      )}
    </DefaultLayout>
  )
}

export const PromoSubmissionsRows = ({
  promoSubmissions,
}: {
  promoSubmissions: any
}) => {
  const bg = useColorModeValue('gray.50', 'gray.900')
  const border = useColorModeValue('gray.200', 'gray.700')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [state, setState] = useState({
    id: '',
    name: '',
    phone: '',
    email: '',
    birthPlace: '',
    birthDate: '',
    nationalId: '',
    street: '',
    streetDetails: '',
    city: '',
    state: '',
    zip: '',
    status: '',
    providerId: '',
  })

  const setModalContent = async (data) => {
    await setState(data)
    console.log({ state })
    onOpen()
  }
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()
  const onSubmit = async (data: any) => {
    // console.info({ data })
    try {
      // const submitData = await postToAPI(`/api/suppliers`, data)
      // if (!submitData) throw new Error('Create supplier response error')

      // history.push('/suppliers')
      alert(`${data.status}`)
      onClose()
      // console.log('submit data: ', data)
    } catch (error) {
      alert('Gagal memperbarui promo')
    }
  }

  useEffect(() => {
    reset({ status: state.status })
  }, [isOpen, reset, state.status])
  return (
    <Box>
      <SimpleGrid
        spacingX={3}
        columns={{ base: 1, md: 3 }}
        w="100%"
        px={5}
        py={3}
        bg={bg}
        borderBottom="1px solid gray"
        borderColor={border}
        gridTemplateColumns="50px 100px 100px 200px 200px 200px 1fr 1fr"
      >
        {/* to be decided from api return value */}
        <Text fontWeight={700}>No</Text>
        <Text fontWeight={700}>Avatar</Text>
        <Text fontWeight={700}>Nama</Text>
        <Text fontWeight={700}>No HP</Text>
        <Text fontWeight={700}>Email</Text>
        <Text fontWeight={700}>NIK</Text>
        <Text fontWeight={700}>Kota</Text>
        <Text fontWeight={700}>Status</Text>
      </SimpleGrid>
      {promoSubmissions?.length &&
        promoSubmissions.map((promoSubmission: any, index: number) => {
          return (
            <SimpleGrid
              spacingX={3}
              columns={{ base: 1, md: 3 }}
              // as={Link}
              // as={Button}
              key={`${promoSubmission?.id}`}
              // to={`/promos/submissions/${promoSubmission?.id}`}
              onClick={() => setModalContent(promoSubmission)}
              w="100%"
              px={5}
              py={3}
              bg={bg}
              borderBottom="1px solid gray"
              borderColor={border}
              gridTemplateColumns="50px 100px 100px 200px 200px 200px 1fr 1fr"
            >
              <Text>#{index}</Text>
              <Avatar size="xs" name={promoSubmission?.name as string} />
              <Text>{promoSubmission?.name}</Text>
              <Text>{promoSubmission?.phone}</Text>
              <Text>{promoSubmission?.email}</Text>
              <Text>{promoSubmission?.nationalId}</Text>
              <Text>{promoSubmission?.city}</Text>
              <Text>{promoSubmission?.status}</Text>
            </SimpleGrid>
          )
        })}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Status</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <Text>Nama: {state?.name}</Text>
              <Text>No HP: {state?.phone}</Text>
              <Text>Email: {state?.email}</Text>
              <Text>NIK: {state?.nationalId}</Text>
              <Text>Jalan: {state?.street}</Text>
              <Text>Detail Jalan: {state?.streetDetails}</Text>
              <Text>Kota: {state?.city}</Text>
              <Text>Provinsi: {state?.state}</Text>
              <Text>Kode Pos: {state?.zip}</Text>
              <Text>Tempat Lahir: {state?.birthPlace}</Text>
              <Text>Tanggal Lahir: {state?.birthDate}</Text>
              <Text>Status: {state?.status}</Text>
              <Select variant="filled" {...register('status')}>
                {['PENDING', 'APPROVED'].map((item) => {
                  console.log(
                    'selected',
                    item,
                    state.status,
                    item === state.status
                  )
                  return <option value={item}>{item}</option>
                })}
              </Select>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost" type="submit">
                Update
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  )
}
