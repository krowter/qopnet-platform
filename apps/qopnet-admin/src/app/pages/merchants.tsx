import {
  Box,
  Flex,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'

import { Merchant } from '@qopnet/shared-types'
import { DefaultLayout } from '../layouts'
import { useSWR } from '../utils/swr'

export const MerchantsPage = () => {
  const { data: merchants, error } = useSWR('/api/merchants')

  if (error) return <div>Gagal memuat para merchant</div>
  if (!merchants) return <div>Memuat para merchant...</div>
  return (
    <DefaultLayout>
      <Box p={5}>
        <Flex alignItems="center">
          <Box h={5} w={5} borderRadius={20} bg="#4C2602" />
          <Text ml={5} fontWeight={700}>
            All merchants
          </Text>
          <Text ml={5} fontWeight={500}>
            {merchants.length} merchants
          </Text>
          <Box ml="auto" h={5} w={5} borderRadius={20} bg="#4C2602" />
        </Flex>
        <VStack id="merchants-all" mt={5} spacing={10}>
          <Table variant="simple" size="sm">
            <Tbody>
              {merchants.map((merchant: Merchant, index: number) => {
                //generates a random color -> #56eec7
                const randomColor =
                  '#' + Math.floor(Math.random() * 16777215).toString(16)
                return (
                  <Tr key={`${merchant?.name ?? ''}-${index}`}>
                    <Td>#{index}</Td>
                    <Td>
                      <Box
                        w={5}
                        h={5}
                        bgColor={randomColor}
                        borderRadius={20}
                      />
                    </Td>
                    <Td>{merchant?.handle}</Td>
                    <Td>{merchant?.name}</Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </VStack>
      </Box>
    </DefaultLayout>
  )
}
