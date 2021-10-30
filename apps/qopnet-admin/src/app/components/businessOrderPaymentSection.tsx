import {
  Box,
  Button,
  chakra,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  Select,
  useToast,
} from '@chakra-ui/react'

import { requestToAPI } from '../utils/fetch'
import { mutate } from 'swr'

export const BusinessOrderPaymentSection = ({
  businessOrderStatus,
  paymentMethod,
}) => {
  return (
    <Stack
      spacing={5}
      p={5}
      border="1px solid"
      borderColor="gray.300"
      borderRadius="lg"
    >
      <Heading as="h3" size="md">
        Informasi Pembayaran
      </Heading>

      <Text fontSize="lg" fontWeight="bold">
        <chakra.span color="orange">{paymentMethod}</chakra.span>{' '}
      </Text>
      <Text>Belum ada bukti pembayaran</Text>
      <Box as="form">
        <Button
          isDisabled={businessOrderStatus !== 'WAITING_FOR_PAYMENT'}
          type="submit"
          variant="solid"
          colorScheme="orange"
          size="sm"
        >
          Konfirmasi Pembayaran
        </Button>
      </Box>
    </Stack>
  )
}
